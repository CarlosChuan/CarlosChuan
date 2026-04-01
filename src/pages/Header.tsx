import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "../components/shared/Grid";
import { useTheme } from "../context/ThemeContext";
import { ROUTES_DICT, routes } from "../constants/Routes";

const HeaderBar = styled.header`
	position: sticky;
	top: 0;
	z-index: 50;
	width: 100%;
	backdrop-filter: blur(14px);
	-webkit-backdrop-filter: blur(14px);
	background: var(--header-bg);
	border-bottom: 1px solid var(--color-border);
	transition: background 200ms ease, border-color 200ms ease;
`;

const Inner = styled(Grid)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60px;
	width: 70%;
	max-width: 920px;
	margin: 0 auto;
`;

const Brand = styled.div`
	font-weight: 700;
	font-size: 1rem;
	cursor: pointer;
	user-select: none;
	color: var(--color-primary);
	font-family: "Courier New", Courier, monospace;
	letter-spacing: 0.3px;
	transition: opacity 120ms ease;

	&::before {
		content: "<";
		opacity: 0.5;
		margin-right: 1px;
	}
	&::after {
		content: " />";
		opacity: 0.5;
		margin-left: 1px;
	}

	&:hover {
		opacity: 0.8;
	}
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const NavButton = styled(Grid)<{ $active?: boolean }>`
	cursor: pointer;
	height: 28px;
	padding: 0 12px;
	border-radius: 6px;
	font-size: 0.875rem;
	transition: background 120ms ease, color 120ms ease, transform 120ms ease;
	display: inline-flex;
	align-items: center;
	font-weight: ${(p) => (p.$active ? 600 : 400)};

	${(p) =>
		p.$active
			? `
		background: var(--color-primary-dim);
		color: var(--color-primary);
		transform: translateY(-1px);
	`
			: `
		background: transparent;
		color: var(--color-text-muted);
	`}

	&:hover {
		background: var(--color-primary-dim);
		color: var(--color-primary);
	}

	&:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
`;

const GithubLink = styled.a`
	cursor: pointer;
	height: 28px;
	width: 28px;
	padding: 0;
	border-radius: 6px;
	border: 1px solid var(--color-border);
	background: transparent;
	line-height: 1;
	text-decoration: none;
	transition: background 120ms ease, border-color 120ms ease;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-left: 8px;

	img {
		display: block;
		width: 16px;
		height: 16px;
		opacity: 0.5;
		transition: opacity 120ms ease;
		filter: var(--github-icon-filter);
	}

	&:hover {
		background: var(--color-surface-2);
		border-color: var(--color-primary);
		text-decoration: none;
		img { opacity: 1; }
	}

	&:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
`;

const ThemeToggle = styled.button`
	cursor: pointer;
	height: 28px;
	padding: 0 10px;
	border-radius: 6px;
	border: 1px solid var(--color-border);
	background: transparent;
	color: var(--color-text-muted);
	font-size: 0.875rem;
	line-height: 1;
	transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-left: 8px;

	&:hover {
		background: var(--color-surface-2);
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	&:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
`;

const Sections = [
	{ label: "Home", url: routes.getRoute(ROUTES_DICT.HOME.ROOT) },
	{ label: "Projects", url: routes.getRoute(ROUTES_DICT.PROJECTS.ROOT) },
	{ label: "About me", url: routes.getRoute(ROUTES_DICT.GENERAL.BIO) },
];

export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isDark, toggle } = useTheme();

	const go = (url: string) => navigate(url);

	return (
		<HeaderBar>
			<Inner>
				<Brand
					onClick={() => go(routes.getRoute(ROUTES_DICT.HOME.ROOT))}
					role="button"
					tabIndex={0}
					onKeyDown={(e: React.KeyboardEvent) => {
						if (e.key === "Enter" || e.key === " ")
							go(routes.getRoute(ROUTES_DICT.HOME.ROOT));
					}}
				>
					Chuan
				</Brand>

				<Nav aria-label="Main navigation">
					{Sections.map((section) => {
						const active =
							location.pathname === section.url ||
							location.pathname.startsWith(section.url + "/");
						return (
							<NavButton
								key={section.label}
								$active={active}
								role="link"
								tabIndex={0}
								aria-current={active ? "page" : undefined}
								onClick={() => go(section.url)}
								onKeyDown={(e: React.KeyboardEvent) => {
									if (e.key === "Enter" || e.key === " ") go(section.url);
								}}
							>
								{section.label}
							</NavButton>
						);
					})}

					<GithubLink
						href="https://github.com/CarlosChuan/CarlosChuan"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub profile"
						title="GitHub"
					>
						<img src="/image/github.svg" alt="GitHub" />
					</GithubLink>

					<ThemeToggle
						onClick={toggle}
						aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
						title={isDark ? "Switch to light mode" : "Switch to dark mode"}
					>
						{isDark ? "☀" : "☾"}
					</ThemeToggle>
				</Nav>
			</Inner>
		</HeaderBar>
	);
};

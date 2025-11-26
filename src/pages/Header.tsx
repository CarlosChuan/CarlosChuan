import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "../components/shared/Grid";
import { ROUTE_NAME, routes } from "../constants/Routes";

const HeaderBar = styled.header`
	position: sticky;
	top: 0;
	z-index: 50;
	width: 100%;
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
	background: rgba(0, 0, 0, 0.2);
`;

const Inner = styled(Grid)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 64px;
	width: 70%;
	max-width: 920px;
	margin: 0 auto;
`;

const Brand = styled.div`
	font-weight: 700;
	letter-spacing: 0.2px;
	cursor: pointer;
	user-select: none;
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const HeaderButton = styled(Grid)<{ $active?: boolean }>`
	cursor: pointer;
	padding: 8px 10px;
	border-radius: 6px;
	transition:
		background 120ms ease,
		transform 120ms ease;
	display: inline-flex;
	align-items: center;

	${(p) =>
		p.$active
			? `background: rgba(255,255,255,0.95); color: #000; font-weight: 700; transform: translateY(-1px);`
			: `background: transparent; color: inherit;`}

	&:hover {
		${(p) =>
			p.$active
				? `background: rgba(255,255,255,0.6);`
				: `background: rgba(255, 255, 255, 0.06);`}
	}

	&:focus {
		outline: 2px solid rgba(255, 255, 255, 0.12);
		outline-offset: 2px;
	}
`;

const Sections = [
	{
		label: "Home",
		url: routes.getRoute(ROUTE_NAME.HOME.ROOT),
	},
	{
		label: "Projects",
		url: routes.getRoute(ROUTE_NAME.PROJECTS.ROOT),
	},
	{
		label: "About me",
		url: routes.getRoute(ROUTE_NAME.GENERAL.BIO),
	},
];

export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const go = (url: string) => navigate(url);

	return (
		<HeaderBar>
			<Inner>
				<Brand
					onClick={() => go(routes.getRoute(ROUTE_NAME.HOME.ROOT))}
					role="button"
					tabIndex={0}
					onKeyDown={(e: React.KeyboardEvent) => {
						if (e.key === "Enter" || e.key === " ")
							go(routes.getRoute(ROUTE_NAME.HOME.ROOT));
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
							<HeaderButton
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
							</HeaderButton>
						);
					})}
				</Nav>
			</Inner>
		</HeaderBar>
	);
};

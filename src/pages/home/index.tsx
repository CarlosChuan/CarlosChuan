import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES_DICT, routes } from "../../constants/Routes";

const PageWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 48px 24px 96px;
`;

const Constrain = styled.div`
	width: 100%;
	max-width: 920px;
`;

const HeroSection = styled.section`
	padding: 56px 0 48px;
	border-bottom: 1px solid var(--color-border);
`;

const Eyebrow = styled.span`
	font-family: "Courier New", Courier, monospace;
	font-size: 0.78rem;
	color: var(--color-primary);
	letter-spacing: 2.5px;
	text-transform: uppercase;
`;

const HeroTitle = styled.h1`
	margin: 14px 0 0;
	font-size: clamp(2.6rem, 6vw, 3.8rem);
	font-weight: 800;
	line-height: 1.08;
	letter-spacing: -0.025em;
	color: var(--color-text);
`;

const HeroSub = styled.p`
	margin: 18px 0 0;
	font-size: 1.05rem;
	color: var(--color-text-muted);
	max-width: 540px;
	line-height: 1.65;
`;

const BtnRow = styled.div`
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-top: 36px;
`;

const PrimaryBtn = styled.button`
	padding: 10px 22px;
	border-radius: 7px;
	border: none;
	background: var(--color-primary);
	color: #fff;
	cursor: pointer;
	font-weight: 600;
	font-size: 0.9rem;
	transition: opacity 130ms ease, transform 130ms ease;
	font-family: inherit;

	&:hover {
		opacity: 0.86;
		transform: translateY(-1px);
	}
	&:active {
		transform: translateY(0);
	}
`;

const SecondaryBtn = styled.button`
	padding: 10px 22px;
	border-radius: 7px;
	border: 1px solid var(--color-border);
	background: transparent;
	color: var(--color-text-muted);
	cursor: pointer;
	font-weight: 500;
	font-size: 0.9rem;
	transition: background 130ms ease, border-color 130ms ease, color 130ms ease;
	font-family: inherit;

	&:hover {
		background: var(--color-surface-2);
		border-color: var(--color-primary);
		color: var(--color-text);
	}
`;

const FeaturedSection = styled.section`
	padding: 48px 0px;
`;

const ApproachSection = styled.section`
	padding-top: 48px;
	border-top: 1px solid var(--color-border);
`;

const ApproachText = styled.p`
	margin: 0;
	font-size: 0.9rem;
	color: var(--color-text-muted);
	line-height: 1.7;
	max-width: 560px;
`;

const SectionLabel = styled.p`
	margin: 0 0 16px;
	font-family: "Courier New", Courier, monospace;
	font-size: 0.78rem;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: var(--color-primary);
`;

const CardGrid = styled.div`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
`;

const Card = styled.div`
	cursor: pointer;
	border: 1px solid var(--color-border);
	padding: 22px;
	border-radius: 10px;
	min-width: 220px;
	max-width: 320px;
	background: var(--color-surface);
	transition: border-color 160ms ease, transform 160ms ease,
		box-shadow 160ms ease;
	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			var(--color-primary-dim) 0%,
			transparent 65%
		);
		opacity: 0;
		transition: opacity 160ms ease;
	}

	&:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);

		&::before {
			opacity: 1;
		}
	}
`;

const CardTitle = styled.h3`
	margin: 0;
	font-size: 0.95rem;
	font-weight: 600;
	color: var(--color-text);
	position: relative;
`;

const CardDesc = styled.p`
	margin: 8px 0 0;
	font-size: 0.85rem;
	color: var(--color-text-muted);
	line-height: 1.6;
	position: relative;
`;

const CardArrow = styled.span<{ $external?: boolean }>`
	position: absolute;
	top: 22px;
	right: 18px;
	font-size: 0.85rem;
	color: var(--color-primary);
	opacity: 0;
	transition: opacity 160ms ease, transform 160ms ease;
	${Card}:hover & {
		opacity: 1;
		transform: ${(p) => (p.$external ? "none" : "translateX(3px)")};
	}
`;

export const Home = () => {
	const navigate = useNavigate();

	return (
		<PageWrap>
			<Constrain>
				<HeroSection>
					<Eyebrow>software engineer</Eyebrow>
					<HeroTitle>Carlos Chuan</HeroTitle>
					<HeroSub>
						Projects, experiments and interactive demos — from algorithm
						visualisers to low-level CPU simulations.
					</HeroSub>
					<BtnRow>
						<PrimaryBtn
							onClick={() =>
								navigate(routes.getRoute(ROUTES_DICT.PROJECTS.ROOT))
							}
						>
							View Projects
						</PrimaryBtn>
						<SecondaryBtn
							onClick={() =>
								navigate(routes.getRoute(ROUTES_DICT.GENERAL.BIO))
							}
						>
							About me
						</SecondaryBtn>
					</BtnRow>
				</HeroSection>

				<FeaturedSection>
					<SectionLabel>// featured</SectionLabel>
					<CardGrid>
						<Card
							onClick={() =>
								window.open("https://vicmirallas.com", "_blank", "noopener,noreferrer")
							}
						>
							<CardArrow $external>↗</CardArrow>
							<CardTitle>Vic Mirallas</CardTitle>
							<CardDesc>
								Artist portfolio and promo site for musician Vic Mirallas —
								discography, upcoming concerts, and social links.
							</CardDesc>
						</Card>

						<Card
							onClick={() =>
								navigate(routes.getRoute(ROUTES_DICT.PROJECTS.SUDOKU))
							}
						>
							<CardArrow>→</CardArrow>
							<CardTitle>Sudoku — solver &amp; player</CardTitle>
							<CardDesc>
								Interactive board with generator and real-time backtracking
								solver visualisation.
							</CardDesc>
						</Card>

						<Card
							onClick={() =>
								navigate(routes.getRoute(ROUTES_DICT.PROJECTS.ROOT))
							}
						>
							<CardArrow>→</CardArrow>
							<CardTitle>More coming soon</CardTitle>
							<CardDesc>
								Additional experiments and small tools — check the projects page
								for updates.
							</CardDesc>
						</Card>
					</CardGrid>
				</FeaturedSection>

				<ApproachSection>
					<SectionLabel>// approach</SectionLabel>
					<ApproachText>
						All logic, architecture, and algorithms are written by hand. I use AI
						as a tool for styling and layout iteration — the same way I'd use
						Figma or a design system.
					</ApproachText>
				</ApproachSection>
			</Constrain>
		</PageWrap>
	);
};

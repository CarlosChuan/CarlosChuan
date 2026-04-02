import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { VSpacer } from "../../components/shared/VSpacer";
import { ROUTES_DICT, routes } from "../../constants/Routes";

type ProjectItem = {
	id: string;
	title: string;
	description: string;
	status: "finished" | "in-progress" | "planned" | "archived";
	category: "personal" | "work";
	route?: string;
	href?: string;
};

const statusConfig: Record<
	string,
	{ label: string; color: string; bg: string }
> = {
	finished: {
		label: "finished",
		color: "#059669",
		bg: "rgba(5,150,105,0.12)",
	},
	"in-progress": {
		label: "in progress",
		color: "#d97706",
		bg: "rgba(217,119,6,0.12)",
	},
	planned: {
		label: "planned",
		color: "#3b82f6",
		bg: "rgba(59,130,246,0.12)",
	},
	archived: {
		label: "archived",
		color: "#6b7280",
		bg: "rgba(107,114,128,0.12)",
	},
};

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

const PageTitle = styled.h1`
	margin: 0 0 8px;
	font-size: 2rem;
	font-weight: 800;
	color: var(--color-text);
	letter-spacing: -0.02em;
`;

const PageSub = styled.p`
	margin: 0;
	color: var(--color-text-muted);
	font-size: 0.95rem;
	line-height: 1.6;
`;

const SectionLabel = styled.p`
	margin: 0 0 14px;
	font-family: var(--font-mono);
	font-size: 0.78rem;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: var(--color-primary);
`;

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 16px;
`;

const Card = styled.div<{ $clickable: boolean }>`
	cursor: ${(p) => (p.$clickable ? "pointer" : "default")};
	border: 1px solid var(--color-border);
	padding: 22px;
	border-radius: 10px;
	background: var(--color-surface);
	transition: border-color 160ms ease, transform 160ms ease,
		box-shadow 160ms ease;
	position: relative;

	${(p) =>
		p.$clickable &&
		`
		&:hover {
			border-color: var(--color-primary);
			transform: translateY(-2px);
			box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
		}
	`}
`;

const CardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 10px;
	margin-bottom: 10px;
`;

const CardTitle = styled.h3`
	margin: 0;
	font-size: 1rem;
	font-weight: 600;
	color: var(--color-text);
	line-height: 1.3;
`;

const CardDesc = styled.p`
	margin: 0;
	font-size: 0.875rem;
	color: var(--color-text-muted);
	line-height: 1.6;
`;

const Arrow = styled.span`
	font-size: 0.85rem;
	color: var(--color-primary);
	opacity: 0;
	flex-shrink: 0;
	margin-top: 2px;
	transition: opacity 160ms ease, transform 160ms ease;

	${Card}:hover & {
		opacity: 1;
		transform: translateX(3px);
	}
`;

const ExternalArrow = styled.span`
	font-size: 0.85rem;
	color: var(--color-primary);
	opacity: 0;
	flex-shrink: 0;
	margin-top: 2px;
	transition: opacity 160ms ease;

	${Card}:hover & {
		opacity: 1;
	}
`;

const StatusPill = styled.span<{ $status: string }>`
	display: inline-block;
	padding: 3px 9px;
	border-radius: 999px;
	font-size: 0.7rem;
	font-weight: 600;
	font-family: var(--font-mono);
	letter-spacing: 0.4px;
	margin-bottom: 10px;
	color: ${(p) => statusConfig[p.$status]?.color ?? "#6b7280"};
	background: ${(p) =>
		statusConfig[p.$status]?.bg ?? "rgba(107,114,128,0.12)"};
`;

const projects: ProjectItem[] = [
	{
		id: "vicmirallas",
		title: "Vic Mirallas",
		description:
			"Artist portfolio and promo site for musician Vic Mirallas — discography, upcoming concerts, and social links. Built with Next.js.",
		status: "finished",
		category: "work",
		href: "https://vicmirallas.com",
	},
	{
		id: "sudoku",
		title: "Sudoku",
		description:
			"Interactive Sudoku board with generator and solver. Play puzzles or step through the backtracking algorithm.",
		status: "finished",
		category: "personal",
		route: routes.getRoute(ROUTES_DICT.PROJECTS.SUDOKU),
	},
	{
		id: "cpu-sim",
		title: "Basic CPU simulator",
		description:
			"A basic CPU design. Step through instruction execution and observe register and memory state.",
		status: "in-progress",
		category: "personal",
		route: routes.getRoute(ROUTES_DICT.PROJECTS.CPU_SIM.ROOT),
	},
];

const ProjectCard = ({
	p,
	onNavigate,
}: {
	p: ProjectItem;
	onNavigate: () => void;
}) => (
	<Card $clickable={!!(p.route || p.href)} onClick={onNavigate}>
		<CardHeader>
			<CardTitle>{p.title}</CardTitle>
			{p.href ? (
				<ExternalArrow>↗</ExternalArrow>
			) : p.route ? (
				<Arrow>→</Arrow>
			) : null}
		</CardHeader>
		<StatusPill $status={p.status}>
			{statusConfig[p.status]?.label ?? p.status}
		</StatusPill>
		<CardDesc>{p.description}</CardDesc>
	</Card>
);

export const ProjectMenu = () => {
	const navigate = useNavigate();

	const workProjects = projects.filter((p) => p.category === "work");
	const personalProjects = projects.filter((p) => p.category === "personal");

	const handleClick = (p: ProjectItem) => {
		if (p.href) window.open(p.href, "_blank", "noopener,noreferrer");
		else if (p.route) navigate(p.route);
	};

	return (
		<PageWrap>
			<Constrain>
				<PageTitle>Projects</PageTitle>
				<PageSub>
					Shipped work and personal experiments. Click any card to open the
					project.
				</PageSub>

				<VSpacer large />

				<SectionLabel>// work</SectionLabel>
				<CardGrid>
					{workProjects.map((p) => (
						<ProjectCard key={p.id} p={p} onNavigate={() => handleClick(p)} />
					))}
				</CardGrid>

				<VSpacer large />

				<SectionLabel>// personal</SectionLabel>
				<CardGrid>
					{personalProjects.map((p) => (
						<ProjectCard key={p.id} p={p} onNavigate={() => handleClick(p)} />
					))}
				</CardGrid>
			</Constrain>
		</PageWrap>
	);
};

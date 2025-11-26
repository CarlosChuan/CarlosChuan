import { useNavigate } from "react-router-dom";
import { Grid } from "../../components/shared/Grid";
import { Text } from "../../components/shared/Text";
import { VSpacer } from "../../components/shared/VSpacer";
import { ROUTE_NAME, routes } from "../../constants/Routes";

type ProjectItem = {
	id: string;
	title: string;
	description: string;
	status: "finished" | "in-progress" | "planned" | "archived";
	route?: string;
};

const StatusPill = ({ status }: { status: ProjectItem["status"] }) => {
	const colors: Record<string, string> = {
		finished: "#10b981",
		"in-progress": "#f59e0b",
		planned: "#60a5fa",
		archived: "#9ca3af",
	};

	return (
		<Grid
			style={{
				padding: "4px 8px",
				borderRadius: 999,
				background: colors[status] || "#cbd5e1",
				color: "#000",
				fontSize: 12,
				display: "inline-block",
				fontWeight: 600,
			}}
		>
			{status.replace("-", " ")}
		</Grid>
	);
};

export const ProjectMenu = () => {
	const navigate = useNavigate();

	const projects: ProjectItem[] = [
		{
			id: "sudoku",
			title: "Sudoku",
			description:
				"Interactive Sudoku board with generator and solver. Play puzzles or step through the solver algorithm.",
			status: "finished",
			route: routes.getRoute(ROUTE_NAME.PROJECTS.SUDOKU),
		},
		{
			id: "computer-sim",
			title: "Computer simulator",
			description:
				"An emulator that lets the user interact with gate components to create more complex systems.",
			status: "in-progress",
			route: routes.getRoute(ROUTE_NAME.PROJECTS.COMPUTER_SIM),
		},
	];

	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: 24,
			}}
		>
			<Grid style={{ width: "100%", maxWidth: 920 }}>
				<Text type="h1" style={{ margin: 0 }}>
					Projects
				</Text>
				<VSpacer small />
				<Text type="p" style={{ margin: 0, color: "#cfcfcf" }}>
					A curated list of active projects, prototypes and small experiments.
					Click any card to open the project page or demo.
				</Text>
				<VSpacer large />

				<Grid style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
					{projects.map((p) => (
						<Grid
							key={p.id}
							onClick={() => {
								if (p.route) navigate(p.route);
							}}
							style={{
								cursor: p.route ? "pointer" : "default",
								border: "1px solid rgba(255,255,255,0.06)",
								padding: 16,
								borderRadius: 8,
								minWidth: 240,
								maxWidth: 360,
								background: "rgba(255,255,255,0.01)",
							}}
						>
							<Grid
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Text type="h3" style={{ margin: 0 }}>
									{p.title}
								</Text>
								<StatusPill status={p.status} />
							</Grid>
							<VSpacer small />
							<Text
								type="p"
								style={{ margin: 0, color: "#cfcfcf", fontSize: 14 }}
							>
								{p.description}
							</Text>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

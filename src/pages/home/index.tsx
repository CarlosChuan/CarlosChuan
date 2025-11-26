import { useNavigate } from "react-router-dom";
import { Grid } from "../../components/shared/Grid";
import { HSpacer } from "../../components/shared/HSpacer";
import { Text } from "../../components/shared/Text";
import { VSpacer } from "../../components/shared/VSpacer";
import { ROUTE_NAME, routes } from "../../constants/Routes";

const ProjectCard = ({
	title,
	description,
	onClick,
}: {
	title: string;
	description: string;
	onClick: () => void;
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				cursor: "pointer",
				border: "1px solid rgba(255,255,255,0.06)",
				padding: "16px",
				borderRadius: 8,
				minWidth: 220,
				maxWidth: 320,
				background: "rgba(255,255,255,0.02)",
			}}
		>
			<Text type="h3" style={{ margin: 0 }}>
				{title}
			</Text>
			<VSpacer small />
			<Text type="p" style={{ margin: 0, color: "#cfcfcf", fontSize: 14 }}>
				{description}
			</Text>
		</div>
	);
};

export const Home = () => {
	const navigate = useNavigate();

	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "24px",
			}}
		>
			{/* Hero */}
			<Grid style={{ maxWidth: 920, width: "100%", textAlign: "center" }}>
				<Text type="h1" style={{ fontSize: 42, margin: 0 }}>
					Carlos Chuan
				</Text>
				<VSpacer small />
				<Text type="h2" style={{ fontSize: 18, margin: 0, color: "#cfcfcf" }}>
					Software projects, experiments and tiny utilities.
				</Text>
				<VSpacer medium />

				<Text type="p" style={{ fontSize: 16, color: "#d0d0d0" }}>
					Welcome — this site collects projects I've built, notes about problems
					I enjoy solving, and playable demos. Explore the Projects section to
					try interactive examples (like a Sudoku solver) or read short
					write-ups.
				</Text>

				<VSpacer large />

				<Grid style={{ display: "flex", justifyContent: "center" }}>
					<div
						onClick={() => navigate(routes.getRoute(ROUTE_NAME.PROJECTS.ROOT))}
						style={{
							padding: "10px 16px",
							borderRadius: 6,
							background: "#ffffff",
							color: "#000",
							cursor: "pointer",
							fontWeight: 600,
						}}
					>
						View Projects
					</div>
					<HSpacer medium />
					<div
						onClick={() => navigate(routes.getRoute(ROUTE_NAME.GENERAL.BIO))}
						style={{
							padding: "10px 16px",
							borderRadius: 6,
							border: "1px solid rgba(255,255,255,0.06)",
							cursor: "pointer",
						}}
					>
						About me
					</div>
				</Grid>
			</Grid>

			<VSpacer large />

			{/* Projects preview */}
			<Grid style={{ width: "100%", maxWidth: 920 }}>
				<Text type="h2" style={{ margin: 0 }}>
					Featured projects
				</Text>
				<VSpacer medium />

				<Grid style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
					<ProjectCard
						title="Sudoku — playable & solver"
						description="Interactive sudoku board with generator and solver. Try creating puzzles or watch the solver run."
						onClick={() =>
							navigate(routes.getRoute(ROUTE_NAME.PROJECTS.SUDOKU))
						}
					/>

					<ProjectCard
						title="More coming soon"
						description="I'll add other experiments and small tools here — check back for updates."
						onClick={() => navigate(routes.getRoute(ROUTE_NAME.PROJECTS.ROOT))}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

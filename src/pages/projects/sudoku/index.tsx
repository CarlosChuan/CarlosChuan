import { useNavigate } from "react-router-dom";
import { Grid } from "../../../components/shared/Grid";
import { ROUTE_NAME, routes } from "../../../constants/Routes";
import { SudokuBoardComponent } from "./SudokuBoard";

export const SudokuProject = () => {
	const navigate = useNavigate();
	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
				flexGrow: 1,
			}}
		>
			<Grid
				onClick={() => {
					navigate(routes.getRoute(ROUTE_NAME.PROJECTS.ROOT));
				}}
				style={{
					cursor: "pointer",
					width: "fit-content",
				}}
			>
				{`<---`}
			</Grid>
			<SudokuBoardComponent />
		</Grid>
	);
};

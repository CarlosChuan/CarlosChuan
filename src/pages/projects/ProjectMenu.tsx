import { useNavigate } from "react-router-dom";
import { Grid } from "../../components/shared/Grid";
import { ROUTE_NAME, routes } from "../../constants/Routes";

export const ProjectMenu = () => {
	const navigate = useNavigate();
	return (
		<Grid
			onClick={() => {
				navigate(routes.getRoute(ROUTE_NAME.PROJECTS.SUDOKU));
			}}
			style={{
				cursor: "pointer",
				width: "fit-content",
			}}
		>
			SUDOKU
		</Grid>
	);
};

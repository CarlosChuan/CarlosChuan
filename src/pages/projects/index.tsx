import { Route, Routes } from "react-router-dom";
import { ROUTE_NAME, routes } from "../../constants/Routes";
import { ProjectMenu } from "./ProjectMenu";
import { SudokuProject } from "./sudoku";

export const ProjectRoot = () => {
	return (
		<>
			<Routes>
				<Route
					path={routes.getValue(ROUTE_NAME.PROJECTS.SUDOKU)}
					element={<SudokuProject />}
				/>
				<Route path="*" element={<ProjectMenu />} />
			</Routes>
		</>
	);
};

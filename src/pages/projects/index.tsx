import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES_DICT, routes } from "../../constants/Routes";
import { CPUProject } from "./CPU";
import { ProjectMenu } from "./ProjectMenu";
import { SudokuProject } from "./sudoku";

export const ProjectRoot = () => {
	return (
		<>
			<Routes>
				<Route index element={<ProjectMenu />} />
				<Route
					path={routes.getValue(ROUTES_DICT.PROJECTS.SUDOKU)}
					element={<SudokuProject />}
				/>
				{/* <Route
					path={routes.getValue(ROUTES_DICT.PROJECTS.COMPUTER_SIM)}
					element={<ComputerSimProject />}
				/> */}
				<Route
					path={routes.getValue(ROUTES_DICT.PROJECTS.CPU_SIM.ROOT, true)}
					element={<CPUProject />}
				/>
				<Route
					path={"*"}
					element={<Navigate to={routes.getRoute(ROUTES_DICT.PROJECTS.ROOT)} />}
				/>
			</Routes>
		</>
	);
};

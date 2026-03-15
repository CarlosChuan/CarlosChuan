import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_NAME, routes } from "../../constants/Routes";
import { ComputerSimProject } from "./computerSim";
import { ProjectMenu } from "./ProjectMenu";
import { SudokuProject } from "./sudoku";
import { CPUProject } from "./CPU";

export const ProjectRoot = () => {
	return (
		<>
			<Routes>
				<Route index element={<ProjectMenu />} />
				<Route
					path={routes.getValue(ROUTE_NAME.PROJECTS.SUDOKU)}
					element={<SudokuProject />}
				/>
				<Route
					path={routes.getValue(ROUTE_NAME.PROJECTS.COMPUTER_SIM)}
					element={<ComputerSimProject />}
				/>
				<Route
					path={routes.getValue(ROUTE_NAME.PROJECTS.CPU_SIM)}
					element={<CPUProject />}
				/>
				<Route
					path={"*"}
					element={<Navigate to={routes.getRoute(ROUTE_NAME.PROJECTS.ROOT)} />}
				/>
			</Routes>
		</>
	);
};

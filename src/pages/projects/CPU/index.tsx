import { Navigate, Route, Routes } from "react-router-dom";
import { Grid } from "../../../components/shared/Grid";
import palette from "../../../constants/Colors";
import { routes, ROUTES_DICT } from "../../../constants/Routes";
import { CPUContextProvider } from "./context";
import { CPUViewer } from "./pages/cpuViewer";
import { IDE } from "./pages/ide";

export const CPUProject = () => {
	return (
		<CPUContextProvider>
			<Grid style={{
				backgroundColor: palette.light.secondary00,
			}}>
				<Routes>
					<Route index element={<CPUViewer />} />
					<Route path={routes.getValue(ROUTES_DICT.PROJECTS.CPU_SIM.IDE)} element={<IDE />} />
					<Route path={'*'} element={<Navigate to={routes.getRoute(ROUTES_DICT.PROJECTS.CPU_SIM.ROOT)} />} />
				</Routes>
			</Grid>
		</CPUContextProvider>
	);
};

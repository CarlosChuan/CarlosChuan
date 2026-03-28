import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES_DICT, routes } from "../constants/Routes";
import { AboutMe } from "./about_me";
import { Header } from "./Header";
import { Home } from "./home";
import { ProjectRoot } from "./projects";

export const Root = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route
					path={routes.getValue(ROUTES_DICT.PROJECTS.ROOT, true)}
					element={<ProjectRoot />}
				/>
				<Route
					path={routes.getValue(ROUTES_DICT.GENERAL.BIO)}
					element={<AboutMe />}
				/>
				<Route
					path={routes.getValue(ROUTES_DICT.HOME.ROOT)}
					element={<Home />}
				/>
				<Route
					path={"*"}
					element={<Navigate to={routes.getRoute(ROUTES_DICT.HOME.ROOT)} />}
				/>
			</Routes>
		</>
	);
};

import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_NAME, routes } from "../constants/Routes";
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
					path={routes.getValue(ROUTE_NAME.PROJECTS.ROOT, true)}
					element={<ProjectRoot />}
				/>
				<Route
					path={routes.getValue(ROUTE_NAME.GENERAL.BIO)}
					element={<AboutMe />}
				/>
				<Route
					path={routes.getValue(ROUTE_NAME.HOME.ROOT)}
					element={<Home />}
				/>
				<Route
					path={"*"}
					element={<Navigate to={routes.getRoute(ROUTE_NAME.HOME.ROOT)} />}
				/>
			</Routes>
		</>
	);
};

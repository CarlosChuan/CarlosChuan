import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import palette from "./constants/Colors";
import { Home } from "./pages";
import { Grid } from "./components/shared/Grid";
import { ROUTE_NAME, routes } from "./constants/Routes";

const AppWrapper = ({ children }: React.PropsWithChildren) => {
	return (
		<Grid
			style={{
				position: "absolute",
				inset: 0,
				backgroundColor: palette.light.black,
				color: palette.light.white,
			}}
		>
			{children}
		</Grid>
	);
};

const App = () => {
	return (
		<AppWrapper>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTE_NAME.ROOT} element={<Home />} />
					<Route
						path={"*"}
						element={<Navigate to={routes.getRoute(ROUTE_NAME.ROOT)} />}
					/>
				</Routes>
			</BrowserRouter>
		</AppWrapper>
	);
};

export default App;

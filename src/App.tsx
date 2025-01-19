import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Grid } from "./components/shared/Grid";
import palette from "./constants/Colors";
import { ROUTE_NAME, routes } from "./constants/Routes";
import { Root } from "./pages/Root";

const AppWrapper = ({ children }: React.PropsWithChildren) => {
	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
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
					<Route
						path={routes.getValue(ROUTE_NAME.ROOT, true)}
						element={<Root />}
					/>
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

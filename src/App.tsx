import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Grid } from "./components/shared/Grid";
import palette from "./constants/Colors";
import { ROUTES_DICT, routes } from "./constants/Routes";
import { Root } from "./pages/Root";

const AppWrapper = ({ children }: React.PropsWithChildren) => {
	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
				position: "absolute",
				inset: 0,
				overflowY: "auto",
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
			<QueryClientProvider client={new QueryClient}>
				<BrowserRouter>
					<Routes>
						<Route
							path={routes.getValue(ROUTES_DICT.ROOT, true)}
							element={<Root />}
						/>
						<Route
							path={"*"}
							element={<Navigate to={routes.getRoute(ROUTES_DICT.ROOT)} />}
						/>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</AppWrapper>
	);
};

export default App;

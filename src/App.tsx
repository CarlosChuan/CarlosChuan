import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Grid } from "./components/shared/Grid";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ROUTES_DICT, routes } from "./constants/Routes";
import { Root } from "./pages/Root";
import { GlobalStyle } from "./styles/GlobalStyle";

const AppWrapper = ({ children }: React.PropsWithChildren) => {
	const { mounted } = useTheme();
	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
				position: "absolute",
				inset: 0,
				overflowY: "auto",
				backgroundColor: "var(--color-bg)",
				color: "var(--color-text)",
				transition: mounted
					? "background-color 200ms ease, color 200ms ease"
					: "none",
			}}
		>
			{children}
		</Grid>
	);
};

const App = () => {
	return (
		<ThemeProvider>
			<GlobalStyle />
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
		</ThemeProvider>
	);
};

export default App;

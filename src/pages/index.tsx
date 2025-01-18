import { Route } from "react-router-dom";
import { Grid } from "../components/shared/Grid";
import { Text } from "../components/shared/Text";

export const Home = () => {
	return (
		<Grid>
			<Routes>
				<Route path="" />
			</Routes>
			<Text type="h1">Web Tree</Text>
		</Grid>
	);
};

import { Grid } from "../../components/shared/Grid";
import { Text } from "../../components/shared/Text";

export const Home = () => {
	return (
		<Grid style={{ display: "flex", flexDirection: "column" }}>
			<Text type="h1" style={{ color: "red", fontSize: "15px" }}>
				Web Tree
			</Text>
		</Grid>
	);
};

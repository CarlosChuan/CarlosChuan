import { Grid } from "../../../components/shared/Grid";
import palette from "../../../constants/Colors";
import { MainBoard } from "./MainBoard";

export const ComputerSimProject = () => {
	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
				flexGrow: 1,
				backgroundColor: palette.light.secondary00,
			}}
		>
			<MainBoard />
		</Grid>
	);
};

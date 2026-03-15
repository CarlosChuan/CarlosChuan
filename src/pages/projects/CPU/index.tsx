import { Grid } from "../../../components/shared/Grid";
import palette from "../../../constants/Colors";
import { ALU } from "./components/ALU";
import { InstructionDecoder } from "./components/InstructionDecoder";
import { InstructionRegister } from "./components/InstructionRegister";
import { Memory } from "./components/Memory";
import { ProgramCounter } from "./components/ProgramCounter";
import { RegisterBank } from "./components/RegisterBank";
import { SimulationController } from "./components/SimulationController";
import { CPUContextProvider } from "./context";

export const CPUProject = () => {
	return (
		<CPUContextProvider>
			<Grid
				style={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					backgroundColor: palette.light.secondary00,
				}}
			>
				<SimulationController />
				<Grid style={{
					display: "flex",
					flexDirection: "column",
					padding: 20,
					flexFlow: "wrap",
					gap: 10
				}}>
					<Memory />
					<RegisterBank />
					<InstructionRegister />
					<ProgramCounter />
					<InstructionDecoder />
					<ALU />
				</Grid>
			</Grid>
		</CPUContextProvider>
	);
};

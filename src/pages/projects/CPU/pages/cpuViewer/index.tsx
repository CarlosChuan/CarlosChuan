import { Grid } from "../../../../../components/shared/Grid"
import { ALU } from "../../components/ALU"
import { InstructionDecoder } from "../../components/InstructionDecoder"
import { InstructionRegister } from "../../components/InstructionRegister"
import { Memory } from "../../components/Memory"
import { ProgramCounter } from "../../components/ProgramCounter"
import { RegisterBank } from "../../components/RegisterBank"
import { SimulationHeader } from "../../components/SimulationHeader"

export const CPUViewer = () => {
  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <SimulationHeader />
      <Grid style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        flexFlow: "wrap",
        gap: 10
      }}>
        <InstructionRegister />
        <Memory />
        <RegisterBank />
        <Grid style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <ProgramCounter />
          <InstructionDecoder />
          <ALU />
        </Grid>
      </Grid>
    </Grid>
  )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Grid } from "../../../../../components/shared/Grid"
import { routes, ROUTES_DICT } from "../../../../../constants/Routes"
import { IDEHeader } from "../../components/headers/IdeHeader"
import { Instruction } from "../../domains/instruction/Instruction"
import { InstructionRegister } from "../../domains/instructionRegister/InstructionRegister"
import { useRetrieveInstructionRegister } from "../../hooks/data/useRetrieveInstructionRegisters"
import { Editor } from "./Editor"
import { EditorResult } from "./EditorResult"
import { InstructionsSetArchitecture } from "./InstructionsSetArchitecture"

export const IDE = () => {
  const [instructionsText, setInstructionsText] = useState("");
  const [instructionsToLoad, setInstructionsToLoad] = useState<Instruction[]>([]);
  const { setData } = useRetrieveInstructionRegister()

  const navigate = useNavigate();

  const uploadInstructions = () => {
    setData(new InstructionRegister(instructionsToLoad));
    onNavigateToSimulator();
  }

  const onNavigateToSimulator = () => {
    navigate(routes.getRoute(ROUTES_DICT.PROJECTS.CPU_SIM.ROOT))
  }

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <IDEHeader onUploadInstructions={uploadInstructions} onNavigateToSimulator={onNavigateToSimulator} />
      <Grid style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        flexFlow: "wrap",
        gap: 10
      }}>
        <InstructionsSetArchitecture />
        <Editor onChange={(instructions, text) => {
          setInstructionsText(text);
          setInstructionsToLoad(instructions);
        }} />
        <EditorResult value={instructionsText} />
      </Grid>
    </Grid>
  )
}
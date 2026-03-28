import { useEffect } from "react";
import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { useCPUContext } from "../context/context";
import { useRetrieveInstruction } from "../hooks/useRetrieveInstruction";
import { useRetrieveInstructionRegisters } from "../hooks/useRetrieveInstructionRegisters";
import { useRetrievePC } from "../hooks/useRetrievePC";
import { useViewStyle } from "../hooks/useViewStyle";

export const SimulationController = () => {
  const { stepCoordinator } = useCPUContext();
  const { data: instructionRegisters } = useRetrieveInstructionRegisters();
  const { data: PC, setData: setPC } = useRetrievePC();
  const { data: currInstruction, setData: setInstruction } = useRetrieveInstruction();
  const { data: viewStyle, setData: setViewStyle } = useViewStyle();


  useEffect(() => {
    const instruction = instructionRegisters[parseInt(PC, 2)];
    if (!instruction || !currInstruction) return;
    if (instruction.rawInstruction !== currInstruction?.rawInstruction) {
      setInstruction(instruction);
    }
  }, [instructionRegisters, PC])


  return (
    <Grid style={{
      display: "flex", flexDirection: "row", flexBasis: "width", justifyContent: "space-between", alignItems: "center", padding: "10px 20px"
    }}>
      <Grid
        onClick={() => { setViewStyle(viewStyle === "raw" ? "readable" : "raw") }}
        style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "1em", marginBottom: "4px", cursor: "pointer" }}
      >
        <Grid style={{ width: "8px", height: "8px", border: `1px solid ${palette.light.white}`, backgroundColor: viewStyle === "raw" ? "transparent" : palette.light.primary40, marginRight: "4px" }} />
        <Text style={{ userSelect: "none", cursor: "pointer" }}>{`Readable view style`}</Text>
      </Grid>

      <Grid style={{
        display: "flex", flexDirection: "row", padding: 10, gap: 10
      }}>
        <Text>
          {"<"}
        </Text>
        <Text>
          {"PLAY"}
        </Text>

        <Grid style={{
          display: "flex", alignItems: "center", cursor: "pointer"
        }}
          onClick={async () => {
            await stepCoordinator.runAll();
            const nextPC = (parseInt(PC, 2) + 1).toString(2).padStart(8, '0');
            setPC(nextPC)
          }}
        >
          {">"}
        </Grid>
      </Grid>
    </Grid>
  )
}
import { useEffect } from "react";
import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import { useCPUContext } from "../context/context";
import { useRetrieveInstruction } from "../hooks/useRetrieveInstruction";
import { useRetrieveInstructionRegisters } from "../hooks/useRetrieveInstructionRegisters";
import { useRetrievePC } from "../hooks/useRetrievePC";

export const SimulationController = () => {
  const { stepCoordinator } = useCPUContext();
  const { data: instructionRegisters } = useRetrieveInstructionRegisters();
  const { data: PC, setData: setPC } = useRetrievePC();
  const { data: currInstruction, setData: setInstruction } = useRetrieveInstruction();

  useEffect(() => {
    const instruction = instructionRegisters[parseInt(PC, 2)];
    if (!instruction || !currInstruction) return;
    if (instruction.rawInstruction !== currInstruction?.rawInstruction) {
      setInstruction(instruction);
    }
  }, [instructionRegisters, PC])


  return (
    <Grid style={{
      display: "flex", flexDirection: "row", flexBasis: "width", justifyContent: "flex-end", padding: 10, gap: 10
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
  )
}
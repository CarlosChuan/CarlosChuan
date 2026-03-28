import { useEffect, useMemo, useState } from "react";
import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { numToHex } from "../../../../helpers/strings";
import { Instruction } from "../domains/instruction/Instruction";
import { useRetrieveInstructionRegisters } from "../hooks/useRetrieveInstructionRegisters";
import { useViewStyle } from "../hooks/useViewStyle";

export const InstructionRegister = () => {
  const [instructions, setInstructions] = useState<Instruction[]>([])

  const { data: viewStyle } = useViewStyle();
  const { data: instructionRegister, isLoading } = useRetrieveInstructionRegisters();

  useEffect(() => {
    if (instructionRegister && instructionRegister !== instructions) {
      setInstructions(instructionRegister)
    }
  }, [instructionRegister])

  const rawInstructionsComponent = useMemo(() => (
    <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
      {
        instructions.map((instruction, idx, instructions) => {
          const isLast = idx === instructions.length - 1;
          return (
            <Grid key={`ir-raw-${idx}`} style={{
              color: palette.light.black,
              ...(isLast ? {} :
                {
                  marginBottom: '2px',
                  borderBottom: '1px solid #0000005d',
                }
              ),
              textTransform: "uppercase",
              fontFamily: "monospace"
            }}>
              {`${numToHex(idx, instructions.length)}: ${instruction.rawInstruction}`}
            </Grid>
          )
        }
        )
      }
    </Grid>
  ), [instructions])

  const readableInstructionsComponent = useMemo(() => (
    <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
      {
        instructions.map((instruction, idx, instructions) => {
          const isLast = idx === instructions.length - 1;

          return (
            <Grid key={`ir-readable-${idx}`} style={{
              color: palette.light.black,
              ...(isLast ? {} :
                {
                  marginBottom: '2px',
                  borderBottom: '1px solid #0000005d',
                }
              ),
              textTransform: "uppercase",
              fontFamily: "monospace"
            }}>
              {`${numToHex(idx, instructions.length)}: ${instruction.readableInstruction}`}
            </Grid>
          )
        }
        )
      }
    </Grid>
  ), [instructions])

  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Instruction Register
      </Text>
      <Grid style={{ overflowY: "scroll" }}>
        {isLoading && "LOADING..."}
        {!isLoading && viewStyle === "raw" ? rawInstructionsComponent : readableInstructionsComponent}
      </Grid>
    </Grid >
  )
}
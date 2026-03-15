import { useEffect, useMemo, useState } from "react";
import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { numToHex } from "../../../../helpers/strings";
import { Instruction } from "../domains/instruction/Instruction";
import { useRetrieveInstructionRegisters } from "../hooks/useRetrieveInstructionRegisters";

export const InstructionRegister = () => {
  const [instructions, setInstructions] = useState<Instruction[]>([])
  const [viewStyle, setViewStyle] = useState<"raw" | "readable">("raw");

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
      <Grid
        onClick={() => { setViewStyle((value) => value === "raw" ? "readable" : "raw") }}
        style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "1em", marginBottom: "4px", cursor: "pointer" }}
      >
        <Grid style={{ width: "8px", height: "8px", border: `1px solid ${palette.light.black}`, backgroundColor: viewStyle === "raw" ? "transparent" : palette.light.secondary10, marginRight: "4px" }} />
        <Text style={{ color: palette.light.black, userSelect: "none", cursor: "pointer" }}>{`Readable view style`}</Text>
      </Grid>
      <Grid style={{ overflowY: "scroll" }}>
        {isLoading && "LOADING..."}
        {!isLoading && viewStyle === "raw" ? rawInstructionsComponent : readableInstructionsComponent}
      </Grid>
    </Grid >
  )
}
import { useEffect, useMemo, useState } from "react";
import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { ADD } from "../domains/instruction/Instruction";
import { Signed8Int } from "../domains/Signed8Int";
import { useRetrieveInstruction } from "../hooks/useRetrieveInstruction";
import { useRetrieveRegisterBank } from "../hooks/useRetrieveRegisterBank";
import { useStepHandler } from "../hooks/useStepHandler";
import { useViewStyle } from "../hooks/useViewStyle";

const getOut = (inA: string, inB: string) => (parseInt(inA, 2) + parseInt(inB, 2)).toString(2).padStart(8, '0')

export const ALU = () => {
  const [inA, setInA] = useState<Signed8Int>(Signed8Int.default())
  const [inB, setInB] = useState<Signed8Int>(Signed8Int.default())
  const [out, setOut] = useState<Signed8Int>(Signed8Int.default())

  const { data: viewStyle } = useViewStyle();
  const { data: registerBank, setData: setRegisterBank } = useRetrieveRegisterBank();
  const { data: currInstruction } = useRetrieveInstruction();

  useEffect(() => {
    if (currInstruction.operation !== "add") return;
    const { type, ...currProps } = currInstruction.instructionObject as ADD;
    const regA = registerBank[parseInt(currProps.inA, 2)]
    const regB = registerBank[parseInt(currProps.inB, 2)]
    if (regA && regA.value.rawInt !== inA.rawInt || regB && regB.value.rawInt !== inB.rawInt) {
      setInA(regA.value);
      setInB(regB.value);
    }
  }, [registerBank, currInstruction])

  const stepHandler = () => {
    return new Promise<void>((resolve) => {
      if (!currInstruction || currInstruction.operation !== "add") {
        resolve();
        return;
      };
      const { type, ...currProps } = currInstruction.instructionObject as ADD;
      const newRegisterBank = [...registerBank]
      const registerCell = newRegisterBank.find((memoryCell) => memoryCell.addr === parseInt(currProps.out, 2));
      if (registerCell) {
        registerCell.value = out;
        setRegisterBank(newRegisterBank);
      }
      resolve();
      return;
    })
  }

  useStepHandler(stepHandler);


  useEffect(() => {
    setOut(new Signed8Int(getOut(inA.rawInt, inB.rawInt)))
  }, [inA, inB])

  const rawALU = useMemo(() => (
    <Grid style={{ width: "fit-content", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: 10 }}>
      <Text style={{ color: palette.light.black, textAlign: "center", height: "1em", margin: 0, marginBottom: 4 }}>
        A input: {inA.rawInt}
      </Text>
      <Text style={{ color: palette.light.black, textAlign: "center", height: "1em", margin: 0, marginBottom: 4 }}>
        B input: {inB.rawInt}
      </Text>
      <Text style={{ color: palette.light.black, textAlign: "center", height: "1em", margin: 0, marginBottom: 4 }}>
        Output: {out.rawInt}
      </Text>
    </Grid>
  ), [inA, inB, out])

  const readableALU = useMemo(() => {
    return (
      <Grid style={{ width: "fit-content", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: 10 }}>
        <Text style={{ color: palette.light.black, textAlign: "center", height: "1em", margin: 0, marginBottom: 4 }}>
          A input: {inA.readableInt}
        </Text>
        <Text style={{ color: palette.light.black, textAlign: "center", height: "1em", margin: 0, marginBottom: 4 }}>
          B input: {inB.readableInt}
        </Text>
        <Text style={{ color: palette.light.black, textAlign: "center", height: "1em", margin: 0, marginBottom: 4 }}>
          Output: {out.readableInt}
        </Text>
      </Grid>
    )
  }, [inA, inB, out])

  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", height: "fit-content", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        ALU (adder)
      </Text>
      <Grid style={{ padding: "5px 20px" }}>
        {viewStyle === "raw" ? rawALU : readableALU}
      </Grid>
    </Grid >
  )
}
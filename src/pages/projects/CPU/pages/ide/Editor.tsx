import { useEffect } from "react";
import { Widget } from "../../../../../components/CPU/Widget";
import { TextArea } from "../../../../../components/shared/TextArea";
import { Instruction } from "../../domains/instruction/Instruction";
import { useRetrieveInstructionRegister } from "../../hooks/data/useRetrieveInstructionRegisters";

interface EditorProps {
  onChange: (instructions: Instruction[], text: string) => void;
}

export const Editor = ({ onChange }: EditorProps) => {
  const { data } = useRetrieveInstructionRegister();

  useEffect(() => {
    onChange(data.instructions, instructionsToString(data.instructions))
  }, [data])

  const onInstructionsChange = (newValue: string) => {
    const newInstructions = stringToInstructions(newValue);
    onChange(newInstructions.filter((instr) => instr instanceof Instruction), instructionsToString(newInstructions, false));
  }

  const stringToInstructions = (text: string): (Instruction | Error)[] => {
    return text.split('\n').map((textInstruction) => {
      try {
        return Instruction.createFromReadable(textInstruction)
      } catch (err) {
        return err as Error;
      }
    })
  }

  const instructionsToString = (instrOrErrors: (Instruction | Error)[], removeNops = true) => {
    let lastNop: number | undefined;
    const resultArr = instrOrErrors.map<string>((instrOrError, idx) => {
      if (instrOrError instanceof Instruction) {
        const instruction = instrOrError as Instruction;
        if (instruction.operation === "nop" && lastNop === undefined && removeNops) lastNop = idx;
        else if (instruction.operation !== "nop") lastNop = undefined;
        return instruction.readableInstruction
      } else {
        return (instrOrError as Error).message
      }
    })

    const slicedArr = lastNop !== undefined ? resultArr.slice(0, lastNop) : resultArr;
    return slicedArr.join('\n');
  };

  return (
    <Widget header={"Program instructions editor"} fullHeight>
      <TextArea
        style={{ resize: "none", border: "0", height: "99%", width: "100%" }}
        value={instructionsToString(data.instructions)}
        onChange={onInstructionsChange}
      />
    </ Widget>
  );
}
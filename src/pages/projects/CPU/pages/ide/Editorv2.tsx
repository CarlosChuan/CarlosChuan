import { useEffect, useState } from "react";
import { Widget } from "../../../../../components/CPU/Widget";
import { Instruction } from "../../domains/instruction/Instruction";
import { useRetrieveInstructionRegister } from "../../hooks/data/useRetrieveInstructionRegisters";

interface EditorProps {
  onChange: (textResult: string) => void;
}

export const Editor = ({ onChange }: EditorProps) => {
  const { data } = useRetrieveInstructionRegister();
  const [_instructions, setInstructions] = useState<(Instruction | Error)[]>([]);

  useEffect(() => {
    setInstructions(data.instructions);
    onChange(instructionsToString(data.instructions))
  }, [data])

  const instructionsToString = (instrOrErrors: (Instruction | Error)[]) => {
    let lastNop: number | undefined;
    const resultArr = instrOrErrors.map<string>((instrOrError, idx) => {
      if (typeof instrOrError === typeof Instruction.default()) {
        const instruction = instrOrError as Instruction;
        if (instruction.operation === "nop" && lastNop === undefined) lastNop = idx;
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
      {/* {innerInstructions.map((instruction, idx) => (
        <EditorLine key={`instruction-editor-line-${idx}`} value={instruction} onChange={(value) => console.log(`[${idx}] CHANGED: New value: ${value}`)} onEnter={() => {
          console.log(`[${idx}] ON ENTER`); setInnerInstructions((currentInstructions) => {
            return [...currentInstructions, '']
          })
        }} />
      ))} */}
    </ Widget>
  );
}
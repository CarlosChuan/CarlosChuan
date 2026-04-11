import { useEffect, useState } from "react";
import { Widget } from "../../../../../components/CPU/Widget";
import { TextArea } from "../../../../../components/shared/TextArea";
import { useRetrieveInstructionRegisters } from "../../hooks/useRetrieveInstructionRegisters";

export const Editor = () => {
  const { data } = useRetrieveInstructionRegisters();
  const [rawInstructions, setRawInstructions] = useState(data);

  const onInstructionsChange = (newValue: string) => {
    const currentInstructions = rawInstructions.map((instr) => instr.readableInstruction)
    setRawInstructions(newValue.split('\n'));
  }

  useEffect(() => {
    console.log(rawInstructions)
  }, [rawInstructions])

  return (
    <Widget header={"Program instructions editor"} fullHeight>
      <TextArea style={{ resize: "none", border: "0", height: "99%", width: "100%" }} onChange={onInstructionsChange} />
    </ Widget>
  );
}
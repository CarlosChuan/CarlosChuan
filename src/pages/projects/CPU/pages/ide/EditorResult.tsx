import { useEffect, useState } from "react";
import { Widget } from "../../../../../components/CPU/Widget";
import { TextArea } from "../../../../../components/shared/TextArea";

export const EditorResult = () => {
  const [rawInstructions, setRawInstructions] = useState<string[]>([]);

  const onInstructionsChange = (newValue: string) => {
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
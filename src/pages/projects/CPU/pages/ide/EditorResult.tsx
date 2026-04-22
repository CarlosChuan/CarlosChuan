import { Widget } from "../../../../../components/CPU/Widget";
import { TextArea } from "../../../../../components/shared/TextArea";

interface EditorResultProps {
  value: string;
}

export const EditorResult = ({ value }: EditorResultProps) => {

  return (
    <Widget header={"Program instructions result (errors won't be loaded)"} fullHeight fullWidth>
      <TextArea style={{ resize: "none", border: "0", height: "99%", width: "100%" }} value={value} readOnly={true} />
    </ Widget>
  );
}
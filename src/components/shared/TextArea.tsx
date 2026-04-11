import { debounce, random } from "lodash";
import { useCallback, useEffect, useState } from "react";

interface TextAreaProps {
  id?: string;
  value?: string;

  style?: React.CSSProperties;

  onChange: (newValue: string) => void;
}

export const TextArea = ({ id, value, style, onChange }: TextAreaProps) => {
  const [innerValue, setInnerValue] = useState("");

  useEffect(() => {
    if (value !== innerValue) {
      console.log("SETTING INNER VALUE")
      setInnerValue(value ?? "");
    }
  }, [value])

  const triggerOnChange = useCallback(
    debounce((newValue: string) => onChange(newValue), 500),
    [onChange]
  );

  useEffect(() => {
    console.log("INNER VALUE CHANGED, TRIGERING")
    triggerOnChange(innerValue)
  }, [innerValue])

  return (
    <textarea id={id ? id : `${random(0, 999999999)}`} style={{ ...style }} onChange={(event) => setInnerValue(event.target.value)} />
  )
}
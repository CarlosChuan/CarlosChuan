import { debounce, random } from "lodash";
import { useCallback, useEffect, useState } from "react";

interface TextAreaProps {
  id?: string;
  value?: string;

  style?: React.CSSProperties;
  readOnly?: boolean;

  onChange?: (newValue: string) => void;
}

export const TextArea = ({ id, value, style, readOnly, onChange }: TextAreaProps) => {
  const [innerValue, setInnerValue] = useState("");

  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value ?? "");
    }
  }, [value])

  const triggerOnChange = useCallback(
    debounce((newValue: string) => onChange?.(newValue), 500),
    [onChange]
  );

  const onInnerChange = (newValue: string) => {
    setInnerValue(newValue)
    triggerOnChange(newValue)
  }

  return (
    <textarea id={id ? id : `${random(0, 999999999)}`} style={{ ...style }} readOnly={readOnly ?? false} value={innerValue} onChange={(event) => onInnerChange(event.target.value)} />
  )
}
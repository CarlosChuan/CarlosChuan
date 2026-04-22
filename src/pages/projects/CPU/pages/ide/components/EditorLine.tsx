import { useEffect, useState } from "react";

interface EditorLineProps {
  key: string;
  value: string;

  onEnter: () => void;
  onChange: (newValue: string) => void;
}


/**
 * While it's not finally used, I keep it as a possible future implementation base.
 */
export const EditorLine = ({ key, value: initialValue, onEnter, onChange }: EditorLineProps) => {
  const [value, setValue] = useState("");

  const onInnerChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  }

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue])

  return (
    <div>
      <input
        key={key}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter();
          }
        }}
        onChange={(event) => onInnerChange(event.target.value)} />
    </div>
  )
}
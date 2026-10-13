import { type FC, useState, useId } from "react";

type ControlledInputProps = {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
};

const ControlledInput:FC<ControlledInputProps> = ({ defaultValue, label, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const id = useId(); 
    return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id} 
        className="x" 
        type="text" 
        defaultValue={defaultValue} 
        style={{backgroundColor: value.length > 5 ? "lightgreen" : "lightcoral"}}
        value={value} 
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }} 
      />
    </div>
  )
}

export default ControlledInput
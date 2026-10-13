import { type FC, useId, useRef } from "react";

type UncontrolledInputProps = {
  label: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
};

const UncontrolledInput:FC<UncontrolledInputProps> = ({ label, defaultValue, onChange }) => {
  const id = useId(); // generate a unique id for the input element
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id} 
        className="x" 
        type="text" 
        defaultValue={defaultValue} 
        ref={inputRef}
        />
      <button type="button" onClick={() => {
        console.log(inputRef.current);
        alert(inputRef.current?.value)
        onChange?.(inputRef.current?.value);
       }} >Click me</button>
       <span>{id}</span>
    </div>
  )
}

export default UncontrolledInput
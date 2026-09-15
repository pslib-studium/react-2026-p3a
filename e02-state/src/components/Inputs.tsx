import { useState, type FC } from "react";

type InputsProps = {
  a: number;
  b: number;
  c: number;
  actualColor: string;
  handleCC: (color: string) => void;
  handleA: (value: number) => void;
  handleB: (value: number) => void;
  handleC: (value: number) => void;
};

const Inputs: FC<InputsProps> = ({ a, b, c, actualColor, handleCC, handleA, handleB, handleC }) => {

  return (
    <div>
      <input type="number" value={a} onChange={(e) => handleA(parseInt(e.target.value))} />
      <input type="number" value={b} onChange={(e) => handleB(parseInt(e.target.value))} />
      <input type="number" value={c} onChange={(e) => handleC(parseInt(e.target.value))} />
      <input type="color" value={actualColor} onChange={(e) => handleCC(e.target.value)} />
    </div>
  );
};

export default Inputs;
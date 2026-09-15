import { useState } from 'react'
import './App.css'
import Triangle from './components/Triangle'
import Inputs from './components/Inputs'

function App() {
  const [actualColor, setActualColor] = useState<string>("orange");
  const [a, setA] = useState<number>(6);
  const [b, setB] = useState<number>(4);
  const [c, setC] = useState<number>(5);

  const handleColorChange = (color: string) => {
    setActualColor(color);
  };

  const handleAChange = (value: number) => {
    setA(value);
  };
  const handleBChange = (value: number) => {
    setB(value);
  };
  const handleCChange = (value: number) => {
    setC(value);
  };

  return (
    <>
      <Inputs handleCC={handleColorChange} handleA={handleAChange} handleB={handleBChange} handleC={handleCChange} a={a} b={b} c={c} actualColor={actualColor} />
      <div className="triangle">
        <Triangle a={a} b={b} c={c} fillColor={actualColor} />
      </div>
      <Inputs handleCC={handleColorChange} handleA={handleAChange} handleB={handleBChange} handleC={handleCChange} a={a} b={b} c={c} actualColor={actualColor} />
      
    </>
  )
}

export default App

import {type FC, type ReactNode} from 'react';

// dynamicky definovaná funkce pro komponentu Number

type NumberProps = {
    value1?: number;
    value2?: number;
};
// const Number = ({value1, value2}: {value1?: number, value2?: number}) => {
//const Number: FC<{value1: number, value2?: number}> = ({value1, value2}) => {
const Number: FC<NumberProps> = ({value1, value2}) => {
//function Number({value1}:{value1: number, value2: number}):ReactNode{ 
//function Number({value1, value2}:NumberProps):ReactNode{
console.log(value1, value2);
    // console.log(rest);
  return (
    <p style={{color: 'red', fontWeight: 'bold'}} 
    className="number">Číslo: {value1}{value2 ? "+" : null}{value2}
    </p>
  )
}

export default Number;
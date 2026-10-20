import './App.css'
import KeyReader from './components/KeyReader';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState<boolean | null>(null);
  return (
    <>
      {show && <KeyReader />}
      <button onClick={() => setShow(prev => !prev)}>Toggle KeyReader</button>
    </>
  )
}

export default App

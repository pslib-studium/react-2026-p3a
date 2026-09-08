import { useState } from 'react'
import Number from './Number';
import './App.css'

export function App() {
  return (
    <>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <main>
        <p>Text</p>
        <Number value1={3} />
        <Number value1={3 + 6} />
      </main>
    </>
  )
}

export default App

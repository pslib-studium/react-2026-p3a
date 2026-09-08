import { StrictMode } from 'react'
import { createRoot as cr } from 'react-dom/client'
import './index.css'
import Application from './App.tsx'

cr(document.getElementById('root')!).render(
  <StrictMode>
    <Application></Application>
  </StrictMode>,
)

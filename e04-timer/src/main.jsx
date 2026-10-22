import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'

// StrictMode v dev režimu spustí efekt 2× (mount → unmount → mount) – chybějící cleanup se tak projeví hned
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

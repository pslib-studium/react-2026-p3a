import { useEffect, useState } from 'react'
import { Display } from './Display.jsx'

export const BadCountdown = ({ step, setActiveTimers }) => {
  const [count, setCount] = useState(100)
  const [ticks, setTicks] = useState(0)

  useEffect(() => {
    setActiveTimers((n) => n + 1)

    setInterval(() => {
      setCount((c) => c - step)
      setTicks((t) => t + 1)
    }, 1000)

    // CHYBA: žádný return () => clearInterval(...)
    // → při změně `step` i po odpojení běží staré intervaly dál
  }, [step, setActiveTimers])

  return <Display count={count} ticks={ticks} />
}

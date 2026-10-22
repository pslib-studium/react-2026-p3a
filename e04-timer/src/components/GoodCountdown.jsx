import { useEffect, useState } from 'react'
import { Display } from './Display.jsx'

export const GoodCountdown = ({ step, setActiveTimers }) => {
  const [count, setCount] = useState(100)
  const [ticks, setTicks] = useState(0)

  useEffect(() => {
    setActiveTimers((n) => n + 1)

    const id = setInterval(() => {
      setCount((c) => c - step)
      setTicks((t) => t + 1)
    }, 1000)

    // cleanup: React ho zavolá před dalším spuštěním efektu a při odpojení
    return () => {
      clearInterval(id)
      setActiveTimers((n) => n - 1)
    }
  }, [step, setActiveTimers])

  return <Display count={count} ticks={ticks} />
}

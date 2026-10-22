import { useState } from 'react'
import { BadCountdown } from './components/BadCountdown.jsx'
import { GoodCountdown } from './components/GoodCountdown.jsx'

const Panel = ({ title, variant, Countdown }) => {
  const [visible, setVisible] = useState(true)
  const [step, setStep] = useState(1)
  const [activeTimers, setActiveTimers] = useState(0)

  return (
    <section className={`panel panel--${variant}`}>
      <h2>{title}</h2>
      <p className="panel__timers">
        Aktivní timery: <strong>{activeTimers}</strong>
      </p>

      {visible ? (
        <Countdown step={step} setActiveTimers={setActiveTimers} />
      ) : (
        <p className="panel__hidden">Komponenta je odpojená (unmounted)</p>
      )}

      <div className="panel__controls">
        <button onClick={() => setVisible((v) => !v)}>
          {visible ? 'Odpojit' : 'Připojit'}
        </button>
        <button onClick={() => setStep((s) => (s === 1 ? 2 : 1))}>
          Změnit krok (teď {step})
        </button>
      </div>
    </section>
  )
}

export const App = () => (
  <main>
    <h1>useEffect + setInterval</h1>
    <p className="intro">
      Každý timer má každou sekundu odečíst <em>krok</em> a bliknout. Zkus měnit krok a
      odpojovat/připojovat komponentu – sleduj počet aktivních timerů.
    </p>
    <div className="panels">
      <Panel title="Bez cleanup" variant="bad" Countdown={BadCountdown} />
      <Panel title="S cleanup" variant="good" Countdown={GoodCountdown} />
    </div>
  </main>
)

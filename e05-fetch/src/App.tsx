import { useState } from 'react'
import DrinkListWrapper from './components/DrinkListWrapper'
import DrinkDetail from './components/DrinkDetail'

import './App.css'

function App() {
  const [drinkId, setDrinkId] = useState<string>('');
  const handleDrinkSelect = (id: string | null) => setDrinkId(id ?? '');
  return (
    <>
    {drinkId ? <DrinkDetail id={drinkId} onBack={() => setDrinkId('')} /> : <DrinkListWrapper onDrinkSelect={handleDrinkSelect}   />}
    </>
  )
}

export default App

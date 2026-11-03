import React, { type FC, useState } from 'react';
import DrinkList from './DrinkList';

const DrinkListWrapper: FC<{ onDrinkSelect: (id: string) => void }> = ({ onDrinkSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('margarita');

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
      <DrinkList searchTerm={searchTerm} onDrinkSelect={onDrinkSelect} />
    </div>
  )
}

export default DrinkListWrapper;
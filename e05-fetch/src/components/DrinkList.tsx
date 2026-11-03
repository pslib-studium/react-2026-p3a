import React, { type FC, useState, useEffect } from 'react'
import type { DrinkListItem } from '../types/DrinkListItem';

type DrinkListProps = {
    searchTerm: string;
    onDrinkSelect: (id: string) => void;
}

const DrinkList: FC<DrinkListProps> = ({ searchTerm, onDrinkSelect }) => {
  const [result, setResult] = useState<string>();
  const [drinks, setDrinks] = useState<DrinkListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    console.log('Fetching data...');
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      //setResult(JSON.stringify(data, null, 2));
      setDrinks(data.drinks.map((drink: DrinkListItem) => drink));
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false));
  }, [searchTerm]);
  return (
    <div>
      <h1>Drink List</h1>
      <ul>
        {drinks.map((drink, index) => (
          <li key={index} onClick={() => onDrinkSelect(drink.idDrink)}>{drink.strDrink}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default DrinkList;
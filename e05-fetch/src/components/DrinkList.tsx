import React, { type FC, useState, useEffect } from 'react'
import type { DrinkListItem } from '../types/DrinkListItem';

type DrinkListProps = {}

const DrinkList: FC<DrinkListProps> = () => {
  const [result, setResult] = useState<string>();
  const [drinks, setDrinks] = useState<DrinkListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    console.log('Fetching data...');
    setLoading(true);
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
      setResult(JSON.stringify(data, null, 2));
      setDrinks(data.drinks.map((drink: DrinkListItem) => drink));
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <h1>Drink List</h1>
      <ul>
        {drinks.map((drink, index) => (
          <li key={index}>{drink.strDrink}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default DrinkList;
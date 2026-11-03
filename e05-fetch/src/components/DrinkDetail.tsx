import React, { type FC, useState, useEffect } from 'react';

const DrinkDetail: FC<{ id: string, onBack: () => void }> = ({ id, onBack }) => {
  const [drink, setDrink] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => setDrink(data.drinks[0]))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h1>Drink Detail</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {drink && (
        <div>
          <h2>{drink.strDrink}</h2>
          <p>{drink.strInstructions}</p>
        </div>
      )}
    </div>
  )
}

export default DrinkDetail;
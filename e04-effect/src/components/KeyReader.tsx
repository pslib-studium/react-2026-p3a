import React, { useEffect, useState } from 'react';

const KeyReader: React.FC = () => {
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [secondKey, setSecondKey] = useState<string | null>(null);
    useEffect(
        () => {console.log("effect");},
        [lastKey] // pole závislostí, efekt se spustí při změně lastKey
    );
    console.log("component rendered");
    return (
        <div>
            Last key pressed: {lastKey}
            <button onClick={() => setLastKey(null)}>Reset</button>
            <button onClick={() => setLastKey("X")}>Set</button>
            <br />
            Second key pressed: {secondKey}
            <button onClick={() => setSecondKey(null)}>Reset</button>
            <button onClick={() => setSecondKey("Y")}>Set</button>
        </div>
    );
};

export default KeyReader;
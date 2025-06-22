import React, { useEffect, useState } from 'react';
import BoxGrid from './Components/BoxGrid';
import './App.css';

function App() {
  const [count, setCount] = useState('');
  const [error, setError] = useState('');
  const [boxStates, setBoxStates] = useState([]);
  const [clickOrder, setClickOrder] = useState([]);
  const [isResetting, setIsResetting] = useState(false);


  useEffect(()=> {
    if(isResetting){
      startReverseReset(clickOrder);
    }
  }, [isResetting])

  const validateAndGenerate = () => {
    const num = parseInt(count);
    if (isNaN(num) || num < 5 || num > 25) {
      setError('Please enter a number between 5 and 25.');
      return;
    }
    setError('');
    setBoxStates(Array(num).fill('red'));
    setClickOrder([]);
    setIsResetting(false);
  };

  const handleBoxClick = (index) => {
    if (isResetting || boxStates[index] === 'green') return;

    const newStates = [...boxStates];
    newStates[index] = 'green';
    const newClickOrder = [...clickOrder, index];

    setBoxStates(newStates);
    setClickOrder(newClickOrder);

    if (newStates.every(color => color === 'green')) {
      setIsResetting(true);
    }
  };

  const handleBoxReset = (i, order) => {
    setBoxStates(prev => {
      const newState = [...prev];
      newState[order[i]] = 'red';
      return newState;
    });
  }

  const startReverseReset = (order) => {
    let i = order.length - 1;

    const interval = setInterval(() => {
      if (i < 0) {
        clearInterval(interval);
        setClickOrder([]);
        setIsResetting(false);
        return;
      }
      handleBoxReset(i, order);
      i--;
    }, 1000);
  };

  return (
    <div className="App">
      <h2>Interactive Boxes</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        placeholder="Enter a number (5–25)"
      />
      <button onClick={validateAndGenerate}>Generate</button>
      {error && <p className="error">{error}</p>}
      <BoxGrid boxes={boxStates} onBoxClick={handleBoxClick} />
    </div>
  );
}

export default App;

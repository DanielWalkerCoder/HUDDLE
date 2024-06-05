// style={{ display: 'inline-block', width: '50px', height: '50px', border: '1px solid black', textAlign: 'center', lineHeight: '50px', cursor: 'pointer', fontSize: '24px', fontWeight: 'bold', margin: '5px' }}
// src/WordSquares.jsx
import React from 'react';
import './styles.css';

const WordSquares = ({ word, toggleNormalMode, toggleNightMode, toggleGameBoyMode, resetGameScreenState, mode }) => {
  const handleSquareClick = (index) => {
    switch (index) {
      case 0:
        resetGameScreenState();
        break;
      case 3:
        toggleNormalMode();
        break;
      case 4:
        toggleNightMode();
        break;
      case 5:
        toggleGameBoyMode();
        break;
      default:
        break;
    }
  };

  return (
    <div className="word-squares">
      {word.split('').map((letter, index) => (
        <div
          key={index}
          className={`square ${index >= 3 ? 'clickable' : ''}`}
          onClick={() => handleSquareClick(index)}
          style={{ 
            display: 'inline-block',
            width: '50px',
            height: '50px',
            border: `1px solid ${mode === 'night-mode' ? 'blue' : mode === 'gameBoy-mode' ? '#0f380f' : 'black'}`,
            textAlign: 'center',
            lineHeight: '50px',
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '5px'}}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default WordSquares;

// src/StartScreen.jsx
import React from 'react';

const StartScreen = ({ onMiddleRowClick }) => {
  const squareStyle = {
    width: '50px',
    height: '50px',
    border: '1px solid black',
    display: 'inline-block',
    boxSizing: 'border-box',
    textAlign: 'center',
    lineHeight: '50px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const rowStyle = {
    display: 'flex'
  };

  // Define the word to be placed in the middle row
  const word = "START";

  // Create a 5x5 grid
  const grid = Array(5).fill(Array(5).fill(null));

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.map((_, colIndex) => (
            <div
              key={colIndex}
              style={squareStyle}
              onClick={rowIndex === 2 ? onMiddleRowClick : null}
            >
              {rowIndex === 2 ? word[colIndex] : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StartScreen;

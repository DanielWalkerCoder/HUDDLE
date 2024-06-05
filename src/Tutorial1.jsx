// src/Tutorial1.jsx
import React from 'react';

const Tutorial1 = ({ onSpecialSquareClick, mode }) => {
  const grid = [
    'SONXIQV',
    'CWPEUME',
    'BANSYHU',
    'OZAUKCZ',
    'NTJIRLT'
  ];

  const squareStyle = {
    width: '50px',
    height: '50px',
    border: `1px solid ${mode === 'night-mode' ? 'blue' : mode === 'gameBoy-mode' ? '#0f380f' : 'black'}`,
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

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.split('').map((char, colIndex) => (
            <div
              key={colIndex}
              style={squareStyle}
              onClick={
                rowIndex === 4 && colIndex === 6 // 5th row, 7th column
                  ? onSpecialSquareClick
                  : null
              }
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tutorial1;

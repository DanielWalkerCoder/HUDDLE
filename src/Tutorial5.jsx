// src/Tutorial5.jsx
import React from 'react';

const Tutorial5 = ({ onSpecialSquareClick }) => {
  const grid = [
    'SONXIQV',
    'CWPEUME',
    'BANSYHU',
    'OZAUKCZ',
    'NTJIRLT'
  ];

  const blankSquares = new Set([
    '0:0', '0:2', '0:3', '0:4', '0:5', '0:6',
    '1:1', '1:2', '1:3', '1:5', '1:6',
    '2:0', '2:1', '2:4', '2:5', '2:6',
    '3:0', '3:3', '3:5', '3:6',
    '4:1', '4:2', '4:3', '4:4'
  ]);

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
    display: 'flex',
    justifyContent: 'center',
    margin: '0'
  };

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.split('').map((char, colIndex) => {
            const coordinate = `${rowIndex}:${colIndex}`;
            const isSpecial = rowIndex === 4 && colIndex === 0; // 5th row, 1st column
            return (
              <div
                key={colIndex}
                style={squareStyle}
                onClick={isSpecial ? onSpecialSquareClick : undefined}
              >
                {blankSquares.has(coordinate) ? '' : char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Tutorial5;

// src/Tutorial4.jsx
import React from 'react';

const Tutorial4 = ({ onSpecialSquareClick }) => {
  const grid = [
    'SONXIQV',
    'CWPEUME',
    'BANSYHU',
    'OZAUKCZ',
    'NTJIRLT'
  ];

  const blankSquares = [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
    { row: 1, col: 6 },
    { row: 1, col: 7 },
    { row: 2, col: 6 },
    { row: 2, col: 7 },
    { row: 3, col: 1 },
    { row: 3, col: 2 },
    { row: 3, col: 5 },
    { row: 3, col: 6 },
    { row: 3, col: 7 },
    { row: 4, col: 4 },
    { row: 4, col: 6 },
    { row: 4, col: 7 },
    { row: 5, col: 2 },
    { row: 5, col: 3 }
  ];

  const isBlank = (rowIndex, colIndex) =>
    blankSquares.some(square => square.row - 1 === rowIndex && square.col - 1 === colIndex);

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

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.split('').map((char, colIndex) => (
            <div
              key={colIndex}
              style={squareStyle}
              onClick={
                char === 'S'
                  ? onSpecialSquareClick
                  : null
              }
            >
              {isBlank(rowIndex, colIndex) ? '' : char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tutorial4;

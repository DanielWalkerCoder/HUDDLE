// src/Tutorial2.jsx
import React from 'react';

const Tutorial2 = ({ onSpecialSquareClick, mode }) => {
  const grid = [
    'SONXIQV',
    'CWPEUME',
    'BANSYHU',
    'OZAUKCZ',
    'NTJIRLT'
  ];

  const blankSquares = [
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 7 },
    { row: 2, col: 6 },
    { row: 2, col: 7 },
    { row: 3, col: 1 },
    { row: 3, col: 5 },
    { row: 3, col: 7 },
    { row: 4, col: 7 },
    { row: 5, col: 2 }
  ];

  const isBlank = (rowIndex, colIndex) =>
    blankSquares.some(square => square.row - 1 === rowIndex && square.col - 1 === colIndex);

  const getColor = (rowIndex, colIndex) => {
    if (rowIndex === 4 && colIndex === 6) {
      if (mode === 'gameBoy-mode') {
        return '#0f380f';
      }
      return 'green';
    }
  };

  const squareStyle = (rowIndex, colIndex) => ({
    width: '50px',
    height: '50px',
    border: `1px solid ${mode === 'night-mode' ? 'blue' : mode === 'gameBoy-mode' ? '#0f380f' : 'black'}`,
    display: 'inline-block',
    boxSizing: 'border-box',
    textAlign: 'center',
    lineHeight: '50px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: getColor(rowIndex, colIndex)
  });

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
              style={squareStyle(rowIndex, colIndex)}
              onClick={
                rowIndex === 4 && colIndex === 5 // 5th row, 6th column
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

export default Tutorial2;

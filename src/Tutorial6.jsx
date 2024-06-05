// src/Tutorial6.jsx
import React from 'react';

const Tutorial6 = ({ onSpecialSquareClick, mode }) => {
  const grid = [
    'SONXIQV',  // Row 1
    'CWPEUME',  // Row 2
    'BANSYHU',  // Row 3
    'OZAUKCZ',  // Row 4
    'NTJIRLT'   // Row 5
  ];

  // Define blank squares using zero-based indexing for rows and columns
  const blankSquares = new Set([
    '0:0', '0:2', '0:3', '0:4', '0:5', '0:6',  // Blanks in the first row
    '1:1', '1:2', '1:3', '1:5', '1:6',         // Blanks in the second row
    '2:0', '2:1', '2:4', '2:5', '2:6',         // Blanks in the third row
    '3:0', '3:3', '3:5', '3:6',         // Blanks in the fourth row
    '4:1', '4:2', '4:3', '4:4'                        // Blanks in the fifth row
  ]);

  const getColor = (rowIndex, colIndex) => {
    if (rowIndex === 4 && colIndex === 6) {
      if (mode === 'gameBoy-mode') {
        return '#0f380f';
      }
      return 'green';
     }
    if (rowIndex === 4 && colIndex === 5) {
      if (mode === 'gameBoy-mode') {
        return '#0f380f';
      }
      return 'green';
    }
    if (rowIndex === 2 && colIndex === 3) {
      if (mode === 'gameBoy-mode') {
        return '#0f380f';
      }
      return 'green';
    }
    if (rowIndex === 4 && colIndex === 0) {
      if (mode === 'gameBoy-mode') {
        return '#0f380f';
      }
      return 'red';
    }
    if (rowIndex === 3 && colIndex === 2) {
      if (mode === 'gameBoy-mode') {
        return '#0f380f';
      }
      return 'red';
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
    display: 'flex',
    justifyContent: 'center',
    margin: '0'  // Set margin to 0 to remove space between rows
  };

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.split('').map((char, colIndex) => {
            const coordinate = `${rowIndex}:${colIndex}`;
            const isSpecial = rowIndex === 1 && colIndex === 0; // Second row, first column
            const onClickHandler = isSpecial ? onSpecialSquareClick : undefined;
            return (
              <div
                key={colIndex}
                style={squareStyle(rowIndex, colIndex)}
                onClick={onClickHandler}
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

export default Tutorial6;

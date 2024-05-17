// src/WordSquares.jsx
import React from 'react';

const WordSquares = ({ word }) => {
  const letters = word.split('');

  const squareStyle = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    border: '1px solid black',
    margin: '5px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  return (
    <div>
      {letters.map((letter, index) => (
        <div key={index} style={squareStyle}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default WordSquares;

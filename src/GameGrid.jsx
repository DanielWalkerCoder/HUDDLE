// src/GameGrid.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStrikes, incrementHits, setGood, setBad } from './store';
import './styles.css';

const GameGrid = ({ word }) => {
  const dispatch = useDispatch();
  const strikes = useSelector(state => state.strikes);
  const hits = useSelector(state => state.hits);
  const gameScreen = useSelector(state => state.gameScreen);
  const numRows = 5;
  const numCols = word.length;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Generate an empty grid
  const initialGrid = Array.from({ length: numRows }, () => Array(numCols).fill(null));

  // Place each letter of the word into a random row for each column
  for (let col = 0; col < numCols; col++) {
    const row = Math.floor(Math.random() * numRows);
    initialGrid[row][col] = word[col];
  }

  // Ensure each letter in any given column is unique
  const usedLetters = Array.from({ length: numCols }, () => new Set());

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (initialGrid[row][col] !== null) {
        usedLetters[col].add(initialGrid[row][col]);
      }
    }
  }

  // Fill the remaining squares with random capital letters ensuring uniqueness in each column
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      if (initialGrid[row][col] === null) {
        let randomLetter;
        do {
          randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        } while (usedLetters[col].has(randomLetter));
        initialGrid[row][col] = randomLetter;
        usedLetters[col].add(randomLetter);
      }
    }
  }

  const [grid, setGrid] = useState(initialGrid);
  const [correctIndexes, setCorrectIndexes] = useState([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);
  const [fadeOutIndexes, setFadeOutIndexes] = useState([]);

  const handleSquareClick = (rowIndex, colIndex) => {
    if (strikes >= 3 || hits >= 4) return;  // Prevent clicks if strikes is 3 or hits is 4

    const letter = grid[rowIndex][colIndex];
    const isCorrectLetter = word[colIndex] === letter;

    if (isCorrectLetter) {
      dispatch(incrementHits());
      if (gameScreen === 1) {
        dispatch(setGood());
      }

      setCorrectIndexes([...correctIndexes, { row: rowIndex, col: colIndex }]);
      const newGrid = grid.map(row => [...row]);

      const newFadeOutIndexes = [];

      // Collect indexes for incorrect letters in the current column to fade out
      for (let row = 0; row < numRows; row++) {
        if (newGrid[row][colIndex] !== word[colIndex] && newGrid[row][colIndex] !== null) {
          newFadeOutIndexes.push({ row, col: colIndex });
        }
      }

      // Collect indexes for a random incorrect letter from each other column to fade out
      for (let col = 0; col < numCols; col++) {
        if (col !== colIndex) {
          const incorrectLetters = [];
          for (let row = 0; row < numRows; row++) {
            if (newGrid[row][col] !== word[col] && newGrid[row][col] !== null) {
              incorrectLetters.push({ row, col });
            }
          }
          if (incorrectLetters.length > 0) {
            const randomIndex = Math.floor(Math.random() * incorrectLetters.length);
            newFadeOutIndexes.push(incorrectLetters[randomIndex]);
          }
        }
      }

      setFadeOutIndexes(newFadeOutIndexes);

      // After a short delay, set the collected indexes to null
      setTimeout(() => {
        const finalGrid = newGrid.map(row => [...row]);
        newFadeOutIndexes.forEach(({ row, col }) => {
          finalGrid[row][col] = null;
        });
        setGrid(finalGrid);
      }, 500);  // Match this duration with the CSS animation duration
    } else {
      dispatch(incrementStrikes());
      setIncorrectIndexes([...incorrectIndexes, { row: rowIndex, col: colIndex }]);
      if (gameScreen === 1) {
        dispatch(setBad());
      }
    }
  };

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
    cursor: 'pointer',
    position: 'relative' // Ensure the text is positioned relative to the square
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0'
  };

  const letterStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  return (
    <div className='game-grid'>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.map((char, colIndex) => (
            <div
              key={colIndex}
              style={squareStyle}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              <span
                className={
                  correctIndexes.some(index => index.row === rowIndex && index.col === colIndex)
                    ? 'correct-letter'
                    : incorrectIndexes.some(index => index.row === rowIndex && index.col === colIndex)
                    ? 'incorrect-letter'
                    : fadeOutIndexes.some(index => index.row === rowIndex && index.col === colIndex)
                    ? 'fade-out'
                    : ''
                }
                style={letterStyle}
              >
                {char}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;

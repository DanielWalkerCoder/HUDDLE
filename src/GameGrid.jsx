// src/GameGrid.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStrikes, incrementHits, setGood, setBad, resetAll, incrementGameScreen } from './store';

const GameGrid = ({ word, mode }) => {
  const dispatch = useDispatch();
  const strikes = useSelector(state => state.strikes);
  const hits = useSelector(state => state.hits);
  const gameScreen = useSelector(state => state.gameScreen);
  const trialWord = useSelector(state => state.trialWord);
  const gameWord = trialWord.gameWord.toUpperCase();
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
  const [clickedLetters, setClickedLetters] = useState(Array.from({ length: numRows }, () => Array(numCols).fill(null)));

  useEffect(() => {
    if (hits >= 4) {
      moveGameWordToCenterRow();
    }
  }, [hits]);

  const handleSquareClick = (rowIndex, colIndex) => {
    if (strikes >= 3 || hits >= 4) return;  // Prevent clicks if strikes is 3 or hits is 4

    const letter = grid[rowIndex][colIndex];
    const isCorrectLetter = word[colIndex] === letter;

    if (isCorrectLetter) {
      const incorrectLettersInColumn = grid.filter((row, rIdx) => row[colIndex] !== word[colIndex] && row[colIndex] !== null);
      if (incorrectLettersInColumn.length > 0) {
        dispatch(incrementHits());
        if (gameScreen === 1) {
          dispatch(setGood());
        }

        const newGrid = grid.map(row => [...row]);
        const newClickedLetters = clickedLetters.map(row => [...row]);
        newClickedLetters[rowIndex][colIndex] = 'correct';

        // Remove incorrect letters in the current column
        for (let row = 0; row < numRows; row++) {
          if (newGrid[row][colIndex] !== word[colIndex]) {
            newGrid[row][colIndex] = null;
          }
        }

        // Remove a random incorrect letter from each other column
        for (let col = 0; col < numCols; col++) {
          if (col !== colIndex) {
            const incorrectLetters = [];
            for (let row = 0; row < numRows; row++) {
              if (newGrid[row][col] !== word[col] && newGrid[row][col] !== null) {
                incorrectLetters.push([row, col]);
              }
            }
            if (incorrectLetters.length > 0) {
              const [rowToClear, colToClear] = incorrectLetters[Math.floor(Math.random() * incorrectLetters.length)];
              newGrid[rowToClear][colToClear] = null;
            }
          }
        }

        setGrid(newGrid);
        setClickedLetters(newClickedLetters);
      }
    } else {
      dispatch(incrementStrikes());
      if (gameScreen === 1) {
        dispatch(setBad());
      }
      const newClickedLetters = clickedLetters.map(row => [...row]);
      newClickedLetters[rowIndex][colIndex] = 'incorrect';
      setClickedLetters(newClickedLetters);
    }
  };

  const handleMiddleRowClick = () => {
    if (hits >= 4) {
      dispatch(resetAll());
      setTimeout(() => {
        dispatch(incrementGameScreen());
      }, 0);
    }
  };

  const moveGameWordToCenterRow = () => {
    const centerRow = Math.floor(numRows / 2);
    const newGrid = Array.from({ length: numRows }, () => Array(numCols).fill(null));
    for (let col = 0; col < numCols; col++) {
      newGrid[centerRow][col] = gameWord[col];
    }
    setGrid(newGrid);
    const newClickedLetters = Array.from({ length: numRows }, () => Array(numCols).fill(null));
    for (let col = 0; col < numCols; col++) {
      newClickedLetters[centerRow][col] = 'correct';
    }
    setClickedLetters(newClickedLetters);
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
    color: mode === 'gameBoy-mode'
      ? '#0f380f'
      : clickedLetters[rowIndex][colIndex] === 'correct'
      ? 'green'
      : clickedLetters[rowIndex][colIndex] === 'incorrect'
      ? 'red'
      : mode === 'night-mode'
      ? 'white'
      : 'black'
  });

  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0'
  };

  return (
    <div className='game-grid'>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.map((char, colIndex) => (
            <div
              key={colIndex}
              className={(mode !== 'gameBoy-mode' && clickedLetters[rowIndex][colIndex] === 'correct') ? 'correct-letter' : (mode !== 'gameBoy-mode' && clickedLetters[rowIndex][colIndex] === 'incorrect') ? 'incorrect-letter' : ''}
              style={squareStyle(rowIndex, colIndex)}
              onClick={rowIndex === Math.floor(numRows / 2) && hits >= 4 ? handleMiddleRowClick : () => handleSquareClick(rowIndex, colIndex)}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;

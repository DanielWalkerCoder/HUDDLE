// src/RandomWordSquares.jsx
import React, { useEffect, useState } from 'react';

// Helper function to generate a random capital letter
const getRandomLetter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const RandomWordSquares = ({ letter, gameScreen, onIncorrectClick, onCorrectClick }) => {
  const [shuffledString, setShuffledString] = useState([]);
  const [isClickable, setIsClickable] = useState(true);
  const [blankIndices, setBlankIndices] = useState([]);

  useEffect(() => {
    // Generate four distinct random capital letters
    const randomLetters = new Set();
    while (randomLetters.size < 4) {
      const randomLetter = getRandomLetter();
      if (randomLetter !== letter) {
        randomLetters.add(randomLetter);
      }
    }

    // Combine the given letter with the random letters
    const combinedLetters = [letter, ...randomLetters];

    // Shuffle the combined letters
    const shuffled = shuffleArray(combinedLetters);

    // Update the state with the shuffled string and enable clicking
    setShuffledString(shuffled);
    setIsClickable(true);
    setBlankIndices([]);
  }, [letter]);

  // Randomly blanks out a square that doesn't contain the given letter
  const blankRandomSquare = () => {
    const nonGivenLetterIndices = shuffledString
      .map((char, index) => (char !== letter && !blankIndices.includes(index) ? index : -1))
      .filter((index) => index >= 0);

    if (nonGivenLetterIndices.length === 0) return;

    const randomIndex = nonGivenLetterIndices[Math.floor(Math.random() * nonGivenLetterIndices.length)];
    setBlankIndices((prev) => [...prev, randomIndex]);
  };

  // Blanks a random incorrect square each time gameScreen changes
  useEffect(() => {
    blankRandomSquare();
  }, [gameScreen]);

  // Adjusted square style without margin
  const squareStyle = {
    display: 'block',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    border: '1px solid black',
    margin: '0',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  // Handle click events for each square
  const handleClick = (char, index) => {
    if (!isClickable || blankIndices.includes(index)) return;

    if (char === letter) {
      setIsClickable(false);
      setBlankIndices(shuffledString.map((_, i) => (i !== index ? i : -1)).filter((i) => i >= 0));
      if (onCorrectClick) {
        onCorrectClick();
      }
    } else if (onIncorrectClick) {
      onIncorrectClick();
    }
  };

  return (
    <div>
      {shuffledString.map((char, index) => (
        <div key={index} style={squareStyle} onClick={() => handleClick(char, index)}>
          {blankIndices.includes(index) ? '' : char}
        </div>
      ))}
    </div>
  );
};

export default RandomWordSquares;

// src/App.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementStrikes, incrementGameScreen, resetAll, loadInsults, loadPraises, decrementGameScreen, loadTrialWord, resetGameScreen, incrementCurrentWinStreak, resetCurrentWinStreak, incrementHighestWinStreak } from './store';
import WordSquares from './WordSquares';
import StartScreen from './StartScreen';
import Tutorial1 from './Tutorial1';
import Tutorial2 from './Tutorial2';
import Tutorial3 from './Tutorial3';
import Tutorial4 from './Tutorial4';
import Tutorial5 from './Tutorial5';
import Tutorial6 from './Tutorial6';
import Tutorial7 from './Tutorial7';
import GameGrid from './GameGrid';
import './styles.css';

function App() {
  const [mode, setMode] = useState('normal');
  const strikes = useSelector((state) => state.strikes);
  const gameScreen = useSelector((state) => state.gameScreen);
  const currentWinStreak = useSelector((state) => state.currentWinStreak);
  const highestWinStreak = useSelector((state) => state.highestWinStreak);
  const status = useSelector((state) => state.status);
  const hits = useSelector(state => state.hits);
  const trialWord = useSelector(state => state.trialWord);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load insults and praises JSON files when the component mounts
    dispatch(loadInsults());
    dispatch(loadPraises());
  }, [dispatch]);

  useEffect(() => {
    if (gameScreen === 0) {
      dispatch(loadTrialWord());
    }
  }, [gameScreen, dispatch]);

  useEffect(() => {
    if (hits === 4) {
      dispatch(incrementCurrentWinStreak());
    }
  }, [hits, dispatch]);

  useEffect(() => {
    if (currentWinStreak > highestWinStreak) {
      dispatch(incrementHighestWinStreak());
    }
  }, [currentWinStreak, highestWinStreak, dispatch]);

  useEffect(() => {
    if (strikes === 3) {
      dispatch(resetCurrentWinStreak());
    }
  }, [strikes, dispatch]);

  const handleIncrementGameScreen = () => {
    dispatch(incrementGameScreen());
  };

  // Increment the game screen when a middle row box is clicked
  const handleMiddleRowClick = () => {
    handleIncrementGameScreen();
  };

  // Handle button click based on gameScreen state
  const handleButtonClick = () => {
    if (hits === 4 || strikes === 3 || gameScreen === -7) {
      dispatch(resetAll());
    }
  };

  const navToTut = () => {
    if (gameScreen === 0) {
      dispatch(decrementGameScreen());
    }
  }

  // Handle special square click to decrement gameScreen without affecting strikes
  const handleSpecialSquareClick = () => {
    dispatch(decrementGameScreen());
  };

  // Handle special square click to increment strikes and decrement gameScreen
  const handleSpecialSquareClickWithStrikes = () => {
    dispatch(incrementStrikes());
    dispatch(decrementGameScreen());
  };

  // Function to reset gameScreen
  const resetGameScreenState = () => {
    dispatch(resetGameScreen());
  };

  // Determine the text of the reset button based on the current state
  const buttonText = (strikes === 0 && gameScreen === 0) ? 'How to Play' : 'Return to START';

  const toggleNormalMode = () => {
    setMode('normal');
  };

  const toggleNightMode = () => {
    setMode('night-mode');
  };

  const toggleGameBoyMode = () => {
    setMode('gameBoy-mode');
  };

  return (
    <div className={mode} style={{ textAlign: 'center', marginTop: '2%' }}>
      <WordSquares
        word="HUDDLE"
        toggleNormalMode={toggleNormalMode}
        toggleNightMode={toggleNightMode}
        toggleGameBoyMode={toggleGameBoyMode}
        resetGameScreenState={handleButtonClick}
        navToTut={navToTut}
        mode = {mode}
      />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>Current Win Streak: {currentWinStreak}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>Highest Win Streak: {highestWinStreak}</div>
      </div>
      <h3 style={{ margin: '10px 0 5px' }}>
        {gameScreen === 0 && "A game of synonyms and antonyms"}
        {gameScreen < 0 && "Synonym: HUDDLE"}
        {gameScreen === 1 && trialWord['synOrAnt'] + ': ' + trialWord['word'].toUpperCase()}
      </h3>
      <h3 style={{ margin: '5px 0' }}>Strikes: {strikes}</h3>
      <div id='screen' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='game-grid-content'>
          {gameScreen === 1 && <GameGrid word={trialWord.gameWord.toUpperCase()} mode={mode} />}
          {gameScreen === 0 && <StartScreen onMiddleRowClick={handleMiddleRowClick} mode={mode} />}
          {gameScreen === -1 && <Tutorial1 onSpecialSquareClick={handleSpecialSquareClick} mode={mode} />}
          {gameScreen === -2 && <Tutorial2 onSpecialSquareClick={handleSpecialSquareClick} mode={mode} />}
          {gameScreen === -3 && <Tutorial3 onSpecialSquareClick={handleSpecialSquareClickWithStrikes} mode={mode} />}
          {gameScreen === -4 && <Tutorial4 onSpecialSquareClick={handleSpecialSquareClick} mode={mode} />}
          {gameScreen === -5 && <Tutorial5 onSpecialSquareClick={handleSpecialSquareClickWithStrikes} mode={mode} />}
          {gameScreen === -6 && <Tutorial6 onSpecialSquareClick={handleSpecialSquareClick} mode={mode} />}
          {gameScreen === -7 && <Tutorial7 mode={mode} />}
        </div>
      </div>
      <br />
      <h3 id='gameText'>
        {strikes === 3 && "Game Over. The answer is " + trialWord['gameWord'].toUpperCase() + '. Click H at the top to return to the START screen.'}
        {hits === 4 && "You win! Click " + trialWord['gameWord'].toUpperCase() + ' to start a new game, or click H at the top to return to the START screen.'}
        {(gameScreen === 1 && hits === 0 && strikes === 0) && "Choose a letter."}
        {(gameScreen === 1 && hits !== 4 && strikes !== 3 && (hits !== 0 || strikes !== 0)) && status}
        {gameScreen === 0 && "Click START to begin, or click U at the top to learn how to play."}
        {gameScreen === -1 && `The goal of HUDDLE is to find a synonym or antonym for a given word. In this example, let's find a synonym for HUDDLE. Each column contains exactly one correct letter. Since there are seven columns, we know that the answer will have seven letters. Try clicking the "T" in the bottom-right corner.`}
        {gameScreen === -2 && `Correct! All letters in the final column except the one you clicked disappeared. We now know that the answer ends with "T". Notice that one incorrect letter from each of the other columns has also disappeared. This happens whenever you make a correct guess. Now click the "L" at the bottom of the sixth column.`}
        {gameScreen === -3 && `Another correct guess, and more letters are eliminated. We know now that the seven-letter synonym for HUDDLE we're looking for ends with "LT". Try clicking on the "A" next.`}
        {gameScreen === -4 && `Nice job, jackass. You may have been following instructions, but this is still your screwup. You can tell you made a mistake because no letters disappeared and the Strikes counter above the game grid went up by one. Three strikes means Game Over, so use your brain if you have one. Click the "S" in the middle of the game grid.`}
        {gameScreen === -5 && `Back to correct guesses. Good. The answer is becoming clearer: we know now that the first letter is either "C" or "N". Click "N" in the first column.`}
        {gameScreen === -6 && `That's two strikes. Since you know "N" isn't correct, that leaves only one other option in the first column. You know where to click. Try not to screw this up.`}
        {gameScreen === -7 && `You won! The answer is CONSULT. Now that you know how HUDDLE works, click H at the top to return to the START screen and see if you can make it through a game without me holding your hand.`}
      </h3>
      <br />
      {/* <button onClick={handleButtonClick} style={{ fontSize: '24px', padding: '10px 20px', backgroundColor: 'red', color: 'white' }}>
        {buttonText}
      </button>
      <br /> */}
    </div>
  );
}

export default App;

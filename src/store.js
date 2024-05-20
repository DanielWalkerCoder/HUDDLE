// src/store.js
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper function to check if the response is JSON
const isJSONResponse = (response) => {
  const contentType = response.headers.get('content-type');
  return contentType && contentType.includes('application/json');
};

// Asynchronous thunk to load words from words.json
export const loadTrialWord = createAsyncThunk('trialWord/loadTrialWord', async () => {

    const words = await require('./words.json');
    console.log(words)
    const randomWordObject = words[Math.floor(Math.random() * words.length)];
    const synOrAnt = Math.random() < 0.5 ? 'Synonym' : 'Antonym';
    const gameWord = synOrAnt === 'Synonym'
      ? randomWordObject.synonyms[Math.floor(Math.random() * randomWordObject.synonyms.length)]
      : randomWordObject.antonyms[Math.floor(Math.random() * randomWordObject.antonyms.length)];
    return {
      word: randomWordObject.word,
      synOrAnt,
      gameWord
    };

});

// Trial word slice
const trialWordSlice = createSlice({
  name: 'trialWord',
  initialState: {
    word: '',
    synOrAnt: '',
    gameWord: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTrialWord.fulfilled, (state, action) => action.payload);
  }
});

let insults = [];
let praises = [];

// Asynchronous thunks to load JSON data
const loadInsults = () => async (dispatch) => {
    insults = require('./insults.json');
    return insults
};

const loadPraises = () => async (dispatch) => {
  praises = require('./praises.json');
  return praises
};

// Status slice to handle message display
const statusSlice = createSlice({
  name: 'status',
  initialState: 'Click START to begin',
  reducers: {
    setBad: () => insults[Math.floor(Math.random() * insults.length)],
    setGood: () => praises[Math.floor(Math.random() * praises.length)],
    resetStatus: () => 'Click START to begin',
  },
});

const { setBad, setGood, resetStatus } = statusSlice.actions;

// Strikes slice
const strikesSlice = createSlice({
  name: 'strikes',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    resetStrikes: () => 0,
  },
});

// Game screen slice
const gameScreenSlice = createSlice({
  name: 'gameScreen',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    resetGameScreen: () => 0,
  },
});

// Hits slice
const hitsSlice = createSlice({
  name: 'hits',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    resetHits: () => 0,
  },
});

const { increment: incrementStrikes, resetStrikes } = strikesSlice.actions;
const { increment: incrementGameScreen, decrement: decrementGameScreen, resetGameScreen } = gameScreenSlice.actions;
const { increment: incrementHits, resetHits } = hitsSlice.actions;

// Combined reset action
const resetAll = () => (dispatch) => {
  dispatch(resetStrikes());
  dispatch(resetGameScreen());
  dispatch(resetStatus());
  dispatch(resetHits());
};

// Configure and export the store
export const store = configureStore({
  reducer: {
    strikes: strikesSlice.reducer,
    gameScreen: gameScreenSlice.reducer,
    status: statusSlice.reducer,
    hits: hitsSlice.reducer,
    trialWord: trialWordSlice.reducer,
  },
});

export { setBad, setGood, resetAll, loadInsults, loadPraises, incrementStrikes, incrementGameScreen, decrementGameScreen, incrementHits, resetStrikes, resetGameScreen, resetHits };

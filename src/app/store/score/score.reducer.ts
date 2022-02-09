import { Action, createReducer, on } from '@ngrx/store';
import * as ScoreActions from './score.actions';


export const scoreFeatureKey = 'score';

export interface ScoreState {
  correctGuesses: number,
  wrongGuesses: number,
  correctStreak: number,
  characterStats: {[key: string]: {correctGuesses: number, wrongGuesses: number}}
}

export const initialState: ScoreState = {
  correctGuesses: 0,
  wrongGuesses: 0,
  correctStreak: 0,
  characterStats: {}
};

export const reducer = createReducer(
  initialState,
  on(ScoreActions.clearScores, (state) => {
    const newState: ScoreState = {
      ...state,
      correctGuesses: 0,
      wrongGuesses: 0,
      correctStreak: 0
    }
    return newState;
  }),
  on(ScoreActions.clearCharacterStats, (state) => {
    const newState: ScoreState = {
      ...state,
      characterStats: {}
    }
    return newState;
  }),
  on(ScoreActions.correctGuess, (state, {query: guess}) => {
    const newState: ScoreState = {
      ...state,
      correctGuesses: state.correctGuesses + 1,
      correctStreak: state.correctStreak + 1
    };

    if (Object.keys(newState.characterStats).includes(guess.english)) {
      newState.characterStats = {
        ...newState.characterStats,
        [guess.english]: {
          ...newState.characterStats[guess.english],
          correctGuesses: newState.characterStats[guess.english].correctGuesses + 1
        }
      }
    } else {
      newState.characterStats = {
        ...newState.characterStats,
        [guess.english]: {correctGuesses: 1, wrongGuesses: 0}
      }
    }

    return newState;
  }),
  on(ScoreActions.wrongGuess, (state, {query: guess}) => {
    const newState: ScoreState = {
      ...state,
      wrongGuesses: state.wrongGuesses + 1,
      correctStreak: 0
    };

    if (guess) {      
      if (Object.keys(newState.characterStats).includes(guess.english)) {
        newState.characterStats = {
          ...newState.characterStats,
          [guess.english]: {
            ...newState.characterStats[guess.english],
            wrongGuesses: newState.characterStats[guess.english].wrongGuesses + 1
          }
        }
      } else {
        newState.characterStats = {
          ...newState.characterStats,
          [guess.english]: {correctGuesses: 0, wrongGuesses: 1}
        }
      }
    }

    return newState;
  })
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { scoreFeatureKey, ScoreState } from './score.reducer';

export const featureSettings = createFeatureSelector<ScoreState>(scoreFeatureKey);

export const selectCorrectStreak = createSelector(
    featureSettings,
    (state) => state.correctStreak
);

export const selectHighStreak = createSelector(
    featureSettings,
    (state) => state.highStreak
);

export const selectCorrectGuesses = createSelector(
    featureSettings,
    (state) => state.correctGuesses
);

export const selectWrongGuesses = createSelector(
    featureSettings,
    (state) => state.wrongGuesses
);

export const selectTotalGuesses = createSelector(
    selectCorrectGuesses,
    selectWrongGuesses,
    (correct, wrong) => correct + wrong
);

export const selectAllCharacterStats = createSelector(
    featureSettings,
    (state) => state.characterStats
);

export const selectCharacterStats = (character: string) => createSelector(
    selectAllCharacterStats,
    (state) => state[character]
);

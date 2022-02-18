import { createFeatureSelector, createSelector } from '@ngrx/store';
import { scoreFeatureKey, ScoreState } from './score.reducer';

export const selectScoreFeature = createFeatureSelector<ScoreState>(scoreFeatureKey);

export const selectCorrectStreak = createSelector(
    selectScoreFeature,
    (state) => state.correctStreak
);

export const selectHighStreak = createSelector(
    selectScoreFeature,
    (state) => state.highStreak
);

export const selectCorrectGuesses = createSelector(
    selectScoreFeature,
    (state) => state.correctGuesses
);

export const selectWrongGuesses = createSelector(
    selectScoreFeature,
    (state) => state.wrongGuesses
);

export const selectTotalGuesses = createSelector(
    selectCorrectGuesses,
    selectWrongGuesses,
    (correct, wrong) => correct + wrong
);

export const selectAllCharacterStats = createSelector(
    selectScoreFeature,
    (state) => state.characterStats
);

export const selectCharacterStats = (character: string) => createSelector(
    selectAllCharacterStats,
    (state) => state[character]
);

export const selectHiraganaFlashQuery = createSelector(
    selectScoreFeature,
    (state) => state.hiraganaFlashQuery
);

export const selectShowAnswerState = createSelector(
    selectScoreFeature,
    (state) => state.showAnswer
);

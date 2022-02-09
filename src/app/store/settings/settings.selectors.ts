import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey, SettingsState } from './settings.reducer';

export const featureSettings = createFeatureSelector<SettingsState>(settingsFeatureKey);

export const selectHiraganaFlashQuery = createSelector(
    featureSettings,
    (state) => state.hiraganaFlashQuery
);

export const selectEnabledHiragana = createSelector(
    featureSettings,
    (state) => state.enabledHiragana
);

export const selectChallengeLanguage = createSelector(
    featureSettings,
    (state) => state.challengeLanguage
);

export const selectAnswerKeyboardType = createSelector(
    featureSettings,
    (state) => state.answerKeyboardType
);

export const selectShouldFavorMistakes = createSelector(
    featureSettings,
    (state) => state.shouldFavorMistakes
);

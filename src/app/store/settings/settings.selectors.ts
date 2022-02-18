import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey, SettingsState } from './settings.reducer';

export const selectSettingsFeature = createFeatureSelector<SettingsState>(settingsFeatureKey);

export const selectEnabledHiragana = createSelector(
    selectSettingsFeature,
    (state) => state.enabledHiragana
);

export const selectChallengeLanguage = createSelector(
    selectSettingsFeature,
    (state) => state.challengeLanguage
);

export const selectAnswerKeyboardType = createSelector(
    selectSettingsFeature,
    (state) => state.answerKeyboardType
);

export const selectShouldFavorMistakes = createSelector(
    selectSettingsFeature,
    (state) => state.shouldFavorMistakes
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey, SettingsState } from './settings.reducer';

export const featureSettings = createFeatureSelector<SettingsState>(settingsFeatureKey);
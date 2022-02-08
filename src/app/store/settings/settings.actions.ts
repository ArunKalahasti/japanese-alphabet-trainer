import { createAction, props } from '@ngrx/store';
import { Character } from '../../character';
import { SettingsAnswerKeyboardTypeOptions, SettingsChallengeLanguageOptions } from './settings.reducer';

export const setSelectedCharacters = createAction(
  '[SelectedCharacter] Set SelectedCharacters',
  props<{hiragana: Character[]}>()
);

export const toggleSelectedCharacters = createAction(
  '[SelectedCharacter] Toggle SelectedCharacters',
  props<{hiragana: string[]}>()
);

export const selectCharacters = createAction(
  '[SelectedCharacter] Select Characters',
  props<{hiragana: string[]}>()
);

export const unselectCharacters = createAction(
  '[SelectedCharacter] Unselect Characters',
  props<{hiragana: string[]}>()
);

export const generateQuery = createAction(
  '[FlashTrainer] Generate Query'
);

export const testResponse = createAction(
  '[FlashTrainer] Test Response',
  props<{challenge: Character}>()
);

export const setChallengeLanguage = createAction(
  '[SettingsDialog] Set Challenge Language',
  props<{challengeLanguage: SettingsChallengeLanguageOptions}>()
);

export const setAnswerKeyboardType = createAction(
  '[SettingsDialog] Set Answer Keyboard Type',
  props<{answerKeyboardType: SettingsAnswerKeyboardTypeOptions}>()
);

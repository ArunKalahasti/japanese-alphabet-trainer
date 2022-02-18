import { createAction, props } from '@ngrx/store';
import { Character } from '../../character';
import { SettingsAnswerKeyboardTypeOptions, SettingsChallengeLanguageOptions, SettingsState } from './settings.reducer';

export const saveSettings = createAction(
  '[SettingsEffects] Save Settings'
);

export const loadSettings = createAction(
  '[SettingsEffects] Load Settings',
  props<{settings: SettingsState | null}>()
);

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

export const setQuery = createAction(
  '[FlashTrainer] Set Query',
  props<{challenge: Character | null}>()
);

export const testCharacterResponse = createAction(
  '[FlashTrainer] Test Character Response',
  props<{response: Character}>()
);

export const testHiraganaResponse = createAction(
  '[FlashTrainer] Test Hiragana Response',
  props<{response: string}>()
);

export const setChallengeLanguage = createAction(
  '[SettingsDialog] Set Challenge Language',
  props<{challengeLanguage: SettingsChallengeLanguageOptions}>()
);

export const setAnswerKeyboardType = createAction(
  '[SettingsDialog] Set Answer Keyboard Type',
  props<{answerKeyboardType: SettingsAnswerKeyboardTypeOptions}>()
);

export const setShouldFavorMistakes = createAction(
  '[SettingsDialog] Set Should Favor Mistakes',
  props<{shouldFavorMistakes: boolean}>()
);

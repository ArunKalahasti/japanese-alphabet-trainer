import { Action, createReducer, on } from '@ngrx/store';
import { Character } from '../../character';
import { hiraganaCharMap } from '../../hiragana';
import * as SettingsActions from './settings.actions';

export const settingsFeatureKey = 'settings';

export const settingsLocalStorageKey = 'AK_JAT-SETTINGS';

export type SettingsChallengeLanguageOptions = 'Hiragana' | 'English';
export type SettingsAnswerKeyboardTypeOptions = 'Structured' | 'Randomized' | 'Handwritten';

export interface SettingsState {
  enabledHiragana: Character[],
  hiraganaFlashQuery: Character | null,
  challengeLanguage: SettingsChallengeLanguageOptions,
  answerKeyboardType: SettingsAnswerKeyboardTypeOptions,
  shouldFavorMistakes: boolean
}

export const initialSettingsState: SettingsState = {
  enabledHiragana: [],
  hiraganaFlashQuery: null,
  challengeLanguage: 'English',
  answerKeyboardType: 'Handwritten',
  shouldFavorMistakes: true
};

export const reducer = createReducer(
  initialSettingsState,
  on(SettingsActions.setSelectedCharacters, (state, {hiragana}) => {
    const newState: SettingsState  = {
        ...state,
        enabledHiragana: hiragana
    };
    return newState;
  }),
  on(SettingsActions.toggleSelectedCharacters, (state, {hiragana}) => {
    const newState: SettingsState = {
      ...state
    };
    hiragana.forEach(char => {
      if (!newState.enabledHiragana.map(c => c.english).includes(char)) {
        const groupKey = Object.keys(hiraganaCharMap).find(groupKey => Object.keys(hiraganaCharMap[groupKey]).includes(char));
        if (groupKey) {
          const newChar = new Character(char, hiraganaCharMap[groupKey][char])
          newState.enabledHiragana = [ ...newState.enabledHiragana, newChar ];
        }
      } else {
        newState.enabledHiragana = newState.enabledHiragana.filter(e => e.english !== char);
      }
    });
    return newState;
  }),
  on(SettingsActions.selectCharacters, (state, {hiragana}) => {
    const newState: SettingsState = {
      ...state
    };
    hiragana.forEach(char => {
      if (!newState.enabledHiragana.map(c => c.english).includes(char)) {
        const groupKey = Object.keys(hiraganaCharMap).find(groupKey => Object.keys(hiraganaCharMap[groupKey]).includes(char));
        if (groupKey) {
          const newChar = new Character(char, hiraganaCharMap[groupKey][char])
          newState.enabledHiragana = [ ...newState.enabledHiragana, newChar ];
        }
      }
    });
    return newState;
  }),
  on(SettingsActions.unselectCharacters, (state, {hiragana}) => {
    const newState: SettingsState = {
      ...state
    };
    hiragana.forEach(char => {
      if (newState.enabledHiragana.map(c => c.english).includes(char)) {
        newState.enabledHiragana = newState.enabledHiragana.filter(e => e.english !== char);
      }
    });
    return newState;
  }),
  on(SettingsActions.setQuery, (state, {challenge}) => {
    const newState: SettingsState = {
      ...state,
      hiraganaFlashQuery: challenge
    };
    return newState;
  }),
  on(SettingsActions.setChallengeLanguage, (state, {challengeLanguage}) => {
    const newState: SettingsState = {
      ...state,
      challengeLanguage
    };
    if (challengeLanguage === 'Hiragana' && newState.answerKeyboardType === 'Handwritten') {
      newState.answerKeyboardType = 'Structured';
    }
    return newState;
  }),
  on(SettingsActions.setAnswerKeyboardType, (state, {answerKeyboardType}) => {
    const newState: SettingsState = {
      ...state,
      answerKeyboardType
    };
    return newState;
  }),
  on(SettingsActions.setShouldFavorMistakes, (state, {shouldFavorMistakes}) => {
    const newState: SettingsState = {
      ...state,
      shouldFavorMistakes
    };
    return newState;
  })
);

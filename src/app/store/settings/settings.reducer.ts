import { Action, createReducer, on } from '@ngrx/store';
import { Character } from '../../character';
import { hiraganaCharMap } from '../../hiragana';
import * as SettingsActions from './settings.actions';

export const settingsFeatureKey = 'settings';

export type SettingsChallengeLanguageOptions = 'Hiragana' | 'English';
export type SettingsAnswerKeyboardTypeOptions = 'Structured' | 'Randomized';

export interface SettingsState {
  enabledHiragana: Character[],
  hiraganaFlashQuery: Character | null,
  challengeLanguage: SettingsChallengeLanguageOptions,
  answerKeyboardType: SettingsAnswerKeyboardTypeOptions
}

export const initialState: SettingsState = {
  enabledHiragana: [],
  hiraganaFlashQuery: null,
  challengeLanguage: 'English',
  answerKeyboardType: 'Structured'
};

export const reducer = createReducer(
  initialState,
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
  on(SettingsActions.generateQuery, (state) => {
    const newState: SettingsState = {...state};
    if (state.enabledHiragana.length > 1) {
      const viableOptions = state.enabledHiragana.filter(c => c.english !== state.hiraganaFlashQuery?.english);
      newState.hiraganaFlashQuery = viableOptions[Math.floor(Math.random()*viableOptions.length)];
    } else if (state.enabledHiragana.length === 1) {
      newState.hiraganaFlashQuery = state.enabledHiragana[0];
    } else {
      newState.hiraganaFlashQuery = null;
    }
    return newState;
  }),
  on(SettingsActions.setChallengeLanguage, (state, {challengeLanguage}) => {
    const newState: SettingsState = {
      ...state,
      challengeLanguage
    };
    return newState;
  }),
  on(SettingsActions.setAnswerKeyboardType, (state, {answerKeyboardType}) => {
    const newState: SettingsState = {
      ...state,
      answerKeyboardType
    };
    return newState;
  })
);

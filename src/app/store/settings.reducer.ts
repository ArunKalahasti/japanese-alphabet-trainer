import { Action, createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  hiragana: string[]
}

export const initialState: SettingsState = {
  hiragana: []
};

export const reducer = createReducer(
  initialState,
  on(SettingsActions.setSelectedCharacters, (state, {hiragana}) => {
    const newState: SettingsState  = {
        ...state,
        hiragana
    };
    return newState;
  }),
  on(SettingsActions.toggleSelectedCharacters, (state, {hiragana}) => {
    const newState: SettingsState = {
      ...state
    };
    hiragana.forEach(char => {
      if (!newState.hiragana.includes(char)) {
        newState.hiragana = [ ...newState.hiragana, char ];
      } else {
        newState.hiragana = newState.hiragana.filter(e => e !== char);
      }
    });
    return newState;
  }),
  on(SettingsActions.selectCharacters, (state, {hiragana}) => {
    const newState: SettingsState = {
      ...state
    };
    hiragana.forEach(char => {
      if (!newState.hiragana.includes(char)) {
        newState.hiragana = [ ...newState.hiragana, char ];
      }
    });
    return newState;
  }),
  on(SettingsActions.unselectCharacters, (state, {hiragana}) => {
    const newState: SettingsState = {
      ...state
    };
    hiragana.forEach(char => {
      if (newState.hiragana.includes(char)) {
        newState.hiragana = newState.hiragana.filter(e => e !== char);
      }
    });
    return newState;
  })
);

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromSelectedCharacter from './settings/settings.reducer';


export interface State {
  [fromSelectedCharacter.settingsFeatureKey]: fromSelectedCharacter.SettingsState;
}

export const reducers: ActionReducerMap<State> = {

  [fromSelectedCharacter.settingsFeatureKey]: fromSelectedCharacter.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

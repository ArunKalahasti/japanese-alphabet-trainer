import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromSettings from './settings/settings.reducer';
import * as fromScore from './score/score.reducer';


export interface State {
  [fromSettings.settingsFeatureKey]: fromSettings.SettingsState;
  [fromScore.scoreFeatureKey]: fromScore.ScoreState;
}

export const reducers: ActionReducerMap<State> = {
  [fromSettings.settingsFeatureKey]: fromSettings.reducer,
  [fromScore.scoreFeatureKey]: fromScore.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

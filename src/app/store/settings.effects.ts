import { Injectable } from '@angular/core';
import { Actions, createEffect, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { hiragana } from '../hiragana';
import * as SettingsActions from './settings.actions';



@Injectable()
export class SettingsEffects implements OnInitEffects {



  constructor(private actions$: Actions) {}

  ngrxOnInitEffects(): Action {
    // TODO: get previous selected characters from local storage
    return SettingsActions.setSelectedCharacters({hiragana: Object.keys(hiragana['vowels'])})
  }

}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { withLatestFrom, map, filter, switchMap } from 'rxjs';
import { Character } from '../../character';
import { hiraganaCharMap } from '../../hiragana';
import * as SettingsActions from './settings.actions';
import * as ScoreActions from '../score/score.actions';
import { selectHiraganaFlashQuery } from './settings.selectors';



@Injectable()
export class SettingsEffects implements OnInitEffects {



  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  ngrxOnInitEffects(): Action {
    // TODO: get previous selected characters from local storage
    return SettingsActions.setSelectedCharacters({hiragana: Object.keys(hiraganaCharMap['vowels']).map(char => new Character(char, hiraganaCharMap['vowels'][char]))})
  }

  public testResponse$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.testResponse),
    withLatestFrom(
      this.store.select(selectHiraganaFlashQuery)
    ),
    map(([response, query]) => {
      if (response.challenge.english === query?.english) {
        return ScoreActions.correctGuess({query: query});
      } else {
        return ScoreActions.wrongGuess({query: query});
      }
    })
  ));

  public updateEnabledCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(
      SettingsActions.toggleSelectedCharacters,
      SettingsActions.selectCharacters,
      SettingsActions.unselectCharacters,
    ),
    map(() => SettingsActions.generateQuery())
  ));

}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ScoreActions from './score.actions';
import * as SettingsActions from '../settings/settings.actions';
import { map } from 'rxjs';



@Injectable()
export class ScoreEffects {

  constructor(private actions$: Actions) {}

  public testResponse$ = createEffect(() => this.actions$.pipe(
    ofType(ScoreActions.correctGuess),
    map(() => SettingsActions.generateQuery())
  ));

}

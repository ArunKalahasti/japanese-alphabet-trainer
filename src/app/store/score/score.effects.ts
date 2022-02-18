import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ScoreActions from './score.actions';
import * as SettingsActions from '../settings/settings.actions';
import { map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEnabledHiragana, selectShouldFavorMistakes } from '../settings/settings.selectors';
import { Character } from 'src/app/character';
import { selectAllCharacterStats, selectHiraganaFlashQuery } from './score.selectors';



@Injectable()
export class ScoreEffects {

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  public testResponse$ = createEffect(() => this.actions$.pipe(
    ofType(ScoreActions.correctGuess),
    map(() => ScoreActions.generateQuery())
  ));

  public testFlashTrainerResponse$ = createEffect(() => this.actions$.pipe(
    ofType(ScoreActions.testEnglishResponse),
    withLatestFrom(
      this.store.select(selectHiraganaFlashQuery)
    ),
    map(([action, challenge]) => {
      if (action.response.english === challenge?.english) {
        return ScoreActions.correctGuess({challenge});
      } else {
        return ScoreActions.wrongGuess({challenge});
      }
    })
  ));

  public testResponses$ = createEffect(() => this.actions$.pipe(
    ofType(ScoreActions.testHiraganaResponse),
    withLatestFrom(
      this.store.select(selectHiraganaFlashQuery)
    ),
    map(([action, challenge]) => {
      if (action.response === challenge?.japanese) {
        return ScoreActions.correctGuess({challenge});
      };
      return ScoreActions.wrongGuess({challenge});
    })
  ));

  public generateQuery$ = createEffect(() => this.actions$.pipe(
    ofType(
      ScoreActions.generateQuery
    ),
    withLatestFrom(
      this.store.select(selectEnabledHiragana),
      this.store.select(selectHiraganaFlashQuery),
      this.store.select(selectAllCharacterStats),
      this.store.select(selectShouldFavorMistakes)
    ),
    map(([, enabledHiragana, query, characterStats, shouldFavorMistakes]) => {
      let challenge: Character | null = null;
      if (enabledHiragana.length > 1) {
        let viableOptions = enabledHiragana.filter(c => c.english !== query?.english);

        const totalWrongGuesses = Object.keys(characterStats)
          .filter(c => c !== query?.english)
          .reduce((prev, key) => prev + (characterStats[key].wrongGuesses / (characterStats[key].wrongGuesses + characterStats[key].correctGuesses) ), 0);

        if (totalWrongGuesses === 0 || !shouldFavorMistakes) {
          challenge = viableOptions[Math.floor(Math.random()*viableOptions.length)];
        } else {
          // Remove characters with no wrong guesses
          viableOptions = viableOptions.filter(char => characterStats[char.english]?.wrongGuesses > 0);

          var cumul = totalWrongGuesses
          var random = Math.floor(Math.random() * totalWrongGuesses)
        
          for(var i = 0; i < viableOptions.length; i++) {
            if (characterStats[viableOptions[i].english]) {
              cumul -= (characterStats[viableOptions[i].english].wrongGuesses / (characterStats[viableOptions[i].english].wrongGuesses + characterStats[viableOptions[i].english].correctGuesses) )
              if (random >= cumul) {
                challenge = viableOptions[i]
              }
            }
          }
        }
      } else if (enabledHiragana.length === 1) {
        challenge = enabledHiragana[0];
      } else {
        challenge = null;
      }
      return ScoreActions.setQuery({challenge});
    })
  ));

}

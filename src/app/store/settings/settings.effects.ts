import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { withLatestFrom, map, filter, switchMap } from 'rxjs';
import { Character } from '../../character';
import { hiraganaCharMap } from '../../hiragana';
import * as SettingsActions from './settings.actions';
import * as ScoreActions from '../score/score.actions';
import { selectEnabledHiragana, selectHiraganaFlashQuery, selectShouldFavorMistakes } from './settings.selectors';
import { selectAllCharacterStats, selectCharacterStats } from '../score/score.selectors';



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
    map(([response, challenge]) => {
      if (response.response.english === challenge?.english) {
        return ScoreActions.correctGuess({challenge});
      } else {
        return ScoreActions.wrongGuess({challenge});
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

  public generateQuery$ = createEffect(() => this.actions$.pipe(
    ofType(
      SettingsActions.generateQuery
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
      return SettingsActions.setQuery({challenge});
    })
  ));

}

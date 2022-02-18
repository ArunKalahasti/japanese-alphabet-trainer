import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { withLatestFrom, map, filter, switchMap, tap } from 'rxjs';
import { Character } from '../../character';
import { hiraganaCharMap } from '../../hiragana';
import * as SettingsActions from './settings.actions';
import * as ScoreActions from '../score/score.actions';
import { selectEnabledHiragana, selectHiraganaFlashQuery, selectSettingsFeature, selectShouldFavorMistakes } from './settings.selectors';
import { selectAllCharacterStats } from '../score/score.selectors';
import { initialSettingsState, settingsLocalStorageKey } from './settings.reducer';



@Injectable()
export class SettingsEffects implements OnInitEffects {



  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  ngrxOnInitEffects(): Action {
    const settingsLocalStorageString = localStorage.getItem(settingsLocalStorageKey);
    if (settingsLocalStorageString) {
      return SettingsActions.loadSettings({settings: JSON.parse(settingsLocalStorageString)});
    } else {
      return SettingsActions.loadSettings({settings: initialSettingsState});
    }
  }

  public saveSettings$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.saveSettings),
    withLatestFrom(this.store.select(selectSettingsFeature)),
    tap(([, settingsState]) => {
      localStorage.setItem(settingsLocalStorageKey, JSON.stringify(settingsState));
    })
  ), {dispatch: false});

  public loadSettingsEnabledCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadSettings),
    map((action) => {
      const settings = action.settings;
      if (!settings?.enabledHiragana || settings.enabledHiragana.length === 0) {
        return SettingsActions.setSelectedCharacters({
          hiragana: Object.keys(hiraganaCharMap['vowels'])
          .map(char => new Character(char, hiraganaCharMap['vowels'][char]))
        });
      } else {
        return SettingsActions.setSelectedCharacters({
          hiragana: settings.enabledHiragana.map(char => new Character(char.english, char.japanese))
        });
      }
    })
  ));

  public loadSettingsChallengeLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadSettings),
    filter(action => !!action.settings?.challengeLanguage),
    map((action) => SettingsActions.setChallengeLanguage({challengeLanguage: action.settings?.challengeLanguage || initialSettingsState.challengeLanguage}))
  ));

  public loadSettingsAnswerKeyboardType$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadSettings),
    filter(action => !!action.settings?.answerKeyboardType),
    map((action) => SettingsActions.setAnswerKeyboardType({answerKeyboardType: action.settings?.answerKeyboardType || initialSettingsState.answerKeyboardType}))
  ));

  public loadSettingsFavorMistakes$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadSettings),
    filter(action => undefined !== action.settings?.shouldFavorMistakes),
    map((action) => SettingsActions.setShouldFavorMistakes({shouldFavorMistakes: action.settings?.shouldFavorMistakes || false}))
  ));

  public saveSettingsOnUpdateEnabledCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(
      SettingsActions.toggleSelectedCharacters,
      SettingsActions.selectCharacters,
      SettingsActions.unselectCharacters,
      SettingsActions.setChallengeLanguage,
      SettingsActions.setAnswerKeyboardType,
      SettingsActions.setShouldFavorMistakes,
    ),
    map(() => SettingsActions.saveSettings())
  ));

  public testResponse$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.testCharacterResponse),
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
    ofType(SettingsActions.testHiraganaResponse),
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

  public generateQueryOnUpdateEnabledCharacters$ = createEffect(() => this.actions$.pipe(
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

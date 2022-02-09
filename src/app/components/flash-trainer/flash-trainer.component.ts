import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../character';
import { hiraganaCharMap } from '../../hiragana';
import { SettingsChallengeLanguageOptions, SettingsState } from '../../store/settings/settings.reducer';
import { featureSettings, selectAnswerKeyboardType, selectChallengeLanguage, selectHiraganaFlashQuery } from '../../store/settings/settings.selectors';
import * as SettingsActions from '../../store/settings/settings.actions';
import * as ScoreActions from '../../store/score/score.actions';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { selectCorrectGuesses, selectCorrectStreak, selectHighStreak, selectTotalGuesses } from 'src/app/store/score/score.selectors';

@Component({
  selector: 'app-flash-trainer',
  templateUrl: './flash-trainer.component.html',
  styleUrls: ['./flash-trainer.component.scss']
})
export class HiraganaFlashTrainerComponent implements OnInit {

  selectedCharacters$ = this.store.select(featureSettings);
  hiraganaFlashQuery$ = this.store.select(selectHiraganaFlashQuery)
  challengeLanguage$ = this.store.select(selectChallengeLanguage);
  answerKeyboardType$ = this.store.select(selectAnswerKeyboardType);

  correctStreak$ = this.store.select(selectCorrectStreak);
  highStreak$ = this.store.select(selectHighStreak);
  correctGuesses$ = this.store.select(selectCorrectGuesses);
  totalGuesses$ = this.store.select(selectTotalGuesses);

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(SettingsActions.generateQuery());
  }

  selectChoice(char: Character | null): void {
    if (char) {
      console.log(char);
      this.store.dispatch(SettingsActions.testResponse({challenge: char}));
    }
  }

  openSettingsDialog() {
    this.dialog.open(SettingsDialogComponent);
  }

  displayChallenge(char: Character | null, challengeLanguage: SettingsChallengeLanguageOptions | null): string {
    return challengeLanguage === 'English' ? char?.english || 'ERROR' : char?.japanese || 'ERROR';
  }

  resetScore() {
    this.store.dispatch(ScoreActions.clearScores());
  }

  calcPercent(correctGuesses: number | null, totalGuesses: number | null): string {
    if (correctGuesses !==  null && correctGuesses !==  0 && totalGuesses !== null && totalGuesses !== 0) {
      return (100 * (correctGuesses / (totalGuesses))).toFixed(0);
    } else {
      return '0';
    }
    
  }
  
}

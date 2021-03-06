import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../character';
import { SettingsChallengeLanguageOptions } from '../../store/settings/settings.reducer';
import { selectSettingsFeature, selectAnswerKeyboardType, selectChallengeLanguage, selectShouldFavorMistakes } from '../../store/settings/settings.selectors';
import * as SettingsActions from '../../store/settings/settings.actions';
import * as ScoreActions from '../../store/score/score.actions';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { selectCorrectGuesses, selectCorrectStreak, selectHighStreak, selectHiraganaFlashQuery, selectShowAnswerState, selectTotalGuesses } from 'src/app/store/score/score.selectors';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { map } from 'rxjs';

@Component({
  selector: 'app-flash-trainer',
  templateUrl: './flash-trainer.component.html',
  styleUrls: ['./flash-trainer.component.scss']
})
export class HiraganaFlashTrainerComponent implements OnInit {

  selectedCharacters$ = this.store.select(selectSettingsFeature);
  hiraganaFlashQuery$ = this.store.select(selectHiraganaFlashQuery)
  challengeLanguage$ = this.store.select(selectChallengeLanguage);
  answerKeyboardType$ = this.store.select(selectAnswerKeyboardType);
  shouldFavorMistakes$ = this.store.select(selectShouldFavorMistakes);

  correctStreak$ = this.store.select(selectCorrectStreak);
  highStreak$ = this.store.select(selectHighStreak);
  correctGuesses$ = this.store.select(selectCorrectGuesses);
  totalGuesses$ = this.store.select(selectTotalGuesses);
  hideAnswer$ = this.store.select(selectShowAnswerState).pipe(map(show => !show));

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ScoreActions.generateQuery());
  }

  selectHiragana(hiragana: string) {
    this.store.dispatch(ScoreActions.testHiraganaResponse({response: hiragana}));
  }

  selectChoice(char: Character): void {
    this.store.dispatch(ScoreActions.testEnglishResponse({response: char}));
  }

  openSettingsDialog() {
    this.dialog.open(SettingsDialogComponent);
  }

  displayChallenge(char: Character | null, challengeLanguage: SettingsChallengeLanguageOptions | null): string {
    return challengeLanguage === 'English' ? char?.english || 'ERROR' : char?.japanese || 'ERROR';
  }

  displayAnswer(char: Character | null, challengeLanguage: SettingsChallengeLanguageOptions | null): string {
    return challengeLanguage === 'English' ? char?.japanese || 'ERROR' : char?.english || 'ERROR';
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

  isSelected(selection: string, selected: string | null): boolean {
    return selected === selection;
  }

  changeAnswerKeyboardType($event: MatButtonToggleChange) {
    this.store.dispatch(SettingsActions.setAnswerKeyboardType({answerKeyboardType: $event.value}));
  }

  changeLanguage($event: MatButtonToggleChange) {
    this.store.dispatch(SettingsActions.setChallengeLanguage({challengeLanguage: $event.value}));
  }

  setShouldFavorMistakes($event: MatSlideToggleChange) {
    this.store.dispatch(SettingsActions.setShouldFavorMistakes({shouldFavorMistakes: $event.checked}));
  }

  showAnswer() {
    this.store.dispatch(ScoreActions.showAnswer());
  }

  hideAnswer() {
    this.store.dispatch(ScoreActions.hideAnswer());
  }
  
}

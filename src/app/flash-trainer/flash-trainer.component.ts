import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../character';
import { hiraganaCharMap } from '../hiragana';
import { SettingsChallengeLanguageOptions, SettingsState } from '../store/settings.reducer';
import { featureSettings, selectAnswerKeyboardType, selectChallengeLanguage, selectHiraganaFlashQuery } from '../store/settings.selectors';
import { HiraganaFlashTrainerService } from './flash-trainer.service';
import * as SettingsActions from '../store/settings.actions';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

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
  
}

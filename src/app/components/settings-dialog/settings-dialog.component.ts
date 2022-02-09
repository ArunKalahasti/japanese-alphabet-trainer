import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import { selectAnswerKeyboardType, selectChallengeLanguage, selectShouldFavorMistakes } from '../../store/settings/settings.selectors';
import * as SettingsActions from '../../store/settings/settings.actions';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  challengeLanguage$ = this.store.select(selectChallengeLanguage);
  answerKeyboardType$ = this.store.select(selectAnswerKeyboardType);
  shouldFavorMistakes$ = this.store.select(selectShouldFavorMistakes);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  changeLanguage($event: MatButtonToggleChange) {
    this.store.dispatch(SettingsActions.setChallengeLanguage({challengeLanguage: $event.value}));
  }

  changeAnswerKeyboardType($event: MatButtonToggleChange) {
    this.store.dispatch(SettingsActions.setAnswerKeyboardType({answerKeyboardType: $event.value}));
  }

  setShouldFavorMistakes($event: MatSlideToggleChange) {
    this.store.dispatch(SettingsActions.setShouldFavorMistakes({shouldFavorMistakes: $event.checked}));
  }

  isSelected(selection: string, selected: string | null): boolean {
    return selected === selection;
  }

}

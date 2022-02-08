import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import { selectAnswerKeyboardType, selectChallengeLanguage } from '../../store/settings/settings.selectors';
import * as SettingsActions from '../../store/settings/settings.actions';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  challengeLanguage$ = this.store.select(selectChallengeLanguage);

  answerKeyboardType$ = this.store.select(selectAnswerKeyboardType);

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

  isSelected(selection: string, selected: string | null): boolean {
    return selected === selection;
  }

}

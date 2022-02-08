import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../character';
import { hiraganaCharMap } from '../../hiragana';
import { SettingsState } from '../../store/settings/settings.reducer';
import { featureSettings } from '../../store/settings/settings.selectors';
import * as SettingsActions from '../../store/settings/settings.actions';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrls: ['./character-selector.component.scss']
})
export class CharacterSelectorComponent implements OnInit {

  selectedCharacters$ = this.store.select(featureSettings);

  hiragana = hiraganaCharMap;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  getHiraganaColumnTitles(): string[] {
    return Object.keys(hiraganaCharMap['vowels']);
  }

  getHiraganaRowTitles(): string[] {
    return Object.keys(hiraganaCharMap);
  }

  getHiraganaRowCharacters(category: string): string[] {
    return Object.keys(hiraganaCharMap[category]);
  }

  checkHiraganaSelected(selectedCharacters: SettingsState | null, character: string): boolean {
    return !!selectedCharacters?.enabledHiragana?.map(c => c.english).includes(character);
  }

  checkHiraganaRowSelected(selectedCharacters: SettingsState | null, character: string): boolean {
    return Object.keys(hiraganaCharMap[character]).every(c => selectedCharacters?.enabledHiragana.map(c => c.english).includes(c));
  }

  checkHiraganaRowPartial(selectedCharacters: SettingsState | null, character: string): boolean {
    return !Object.keys(hiraganaCharMap[character]).every(c => selectedCharacters?.enabledHiragana.map(c => c.english).includes(c)) 
    && Object.keys(hiraganaCharMap[character]).some(c => selectedCharacters?.enabledHiragana.map(c => c.english).includes(c));
  }

  toggleHiraganaSelected(character: string): void {
    this.store.dispatch(SettingsActions.toggleSelectedCharacters({hiragana: [character]}));
  }

  toggleHiraganaRowSelected(hiraganaRow: string, $event: MatCheckboxChange): void {
    const charsToToggle = Object.keys(hiraganaCharMap[hiraganaRow]).filter(c => hiraganaCharMap[hiraganaRow][c] !== null)
    if ($event.checked) {
      this.store.dispatch(SettingsActions.selectCharacters({hiragana: charsToToggle}));
    } else {
      this.store.dispatch(SettingsActions.unselectCharacters({hiragana: charsToToggle}));
      
    }
  }

  buildCharacter(english: string, row: string): Character {
    return new Character(english, hiraganaCharMap[row][english]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../character';
import { hiragana } from '../hiragana';
import { SettingsState } from '../store/settings.reducer';
import { featureSettings } from '../store/settings.selectors';
import * as SettingsActions from '../store/settings.actions';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrls: ['./character-selector.component.scss']
})
export class CharacterSelectorComponent implements OnInit {

  selectedCharacters$ = this.store.select(featureSettings);

  hiragana = hiragana;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  getHiraganaColumnTitles(): string[] {
    return Object.keys(hiragana['vowels']);
  }

  getHiraganaRowTitles(): string[] {
    return Object.keys(hiragana);
  }

  getHiraganaRowCharacters(category: string): string[] {
    return Object.keys(hiragana[category]);
  }

  checkHiraganaSelected(selectedCharacters: SettingsState | null, character: string): boolean {
    return !!selectedCharacters?.hiragana?.includes(character);
  }

  checkHiraganaRowSelected(selectedCharacters: SettingsState | null, character: string): boolean {
    return Object.keys(hiragana[character]).every(c => selectedCharacters?.hiragana.includes(c));
  }

  checkHiraganaRowPartial(selectedCharacters: SettingsState | null, character: string): boolean {
    return !Object.keys(hiragana[character]).every(c => selectedCharacters?.hiragana.includes(c)) 
    && Object.keys(hiragana[character]).some(c => selectedCharacters?.hiragana.includes(c));
  }

  toggleHiraganaSelected(character: string): void {
    this.store.dispatch(SettingsActions.toggleSelectedCharacters({hiragana: [character]}));
  }

  toggleHiraganaRowSelected(hiraganaRow: string, $event: MatCheckboxChange): void {
    const charsToToggle = Object.keys(hiragana[hiraganaRow]).filter(c => hiragana[hiraganaRow][c] !== null)
    if ($event.checked) {
      this.store.dispatch(SettingsActions.selectCharacters({hiragana: charsToToggle}));
    } else {
      this.store.dispatch(SettingsActions.unselectCharacters({hiragana: charsToToggle}));
      
    }
  }

  buildCharacter(english: string, row: string): Character {
    return new Character(english, hiragana[row][english]);
  }

}

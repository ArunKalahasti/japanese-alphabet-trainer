import { Component, EventEmitter, OnInit, Output, TrackByFunction } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../character';
import { hiraganaCharMap } from '../hiragana';
import { SettingsChallengeLanguageOptions, SettingsState } from '../store/settings.reducer';
import { selectChallengeLanguage, selectEnabledHiragana } from '../store/settings.selectors';

@Component({
  selector: 'app-structured-keyboard',
  templateUrl: './structured-keyboard.component.html',
  styleUrls: ['./structured-keyboard.component.scss']
})
export class HiraganaKeyboardComponent implements OnInit {

  @Output() characterSelectedEvent = new EventEmitter<Character>();

  selectEnabledHiragana$ = this.store.select(selectEnabledHiragana);
  challengeLanguage$ = this.store.select(selectChallengeLanguage);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  selectChoice(char: Character | null): void {
    if (char) {
      this.characterSelectedEvent.emit(char);
    }
  }

  getHiraganaRowTitles(): string[] {
    return Object.keys(hiraganaCharMap);
  }

  getHiraganaRowCharacters(category: string): (Character | null)[] {
    return Object.keys(hiraganaCharMap[category]).map(v => hiraganaCharMap[category][v] === null ? null : new Character(v, hiraganaCharMap[category][v]));
  }

  checkHiraganaSelected(enabledHiragana: Character[] | null, character: Character | null): boolean {
    return !!character ? !enabledHiragana?.some(char => char.english === character.english) : false;
  }

  displayCharacter(char: Character | null, challengeLanguage: SettingsChallengeLanguageOptions | null): string {
    return challengeLanguage === 'Hiragana' ? char?.english || '' : char?.japanese || '';
  }

  englishCharacter: TrackByFunction<any> = (index: number, item: Character | null) => item?.english;

}

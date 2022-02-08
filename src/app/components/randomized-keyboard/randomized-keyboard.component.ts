import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Character } from '../../character';
import { SettingsChallengeLanguageOptions } from '../../store/settings/settings.reducer';
import { selectChallengeLanguage, selectEnabledHiragana } from '../../store/settings/settings.selectors';

@Component({
  selector: 'app-randomized-keyboard',
  templateUrl: './randomized-keyboard.component.html',
  styleUrls: ['./randomized-keyboard.component.scss']
})
export class RandomizedKeyboardComponent implements OnInit {

  @Output() characterSelectedEvent = new EventEmitter<Character>();

  selectEnabledHiragana$ = this.store.pipe(select(selectEnabledHiragana), map(c => this.shuffleCharacters(c)));
  challengeLanguage$ = this.store.select(selectChallengeLanguage);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  randomizeChoiceOrder() {
    this.selectEnabledHiragana$ = this.store.pipe(select(selectEnabledHiragana), map(c => this.shuffleCharacters(c)));
  }
  
  shuffleCharacters(char: Character[]): Character[] {
    let shuffled: Character[] = [];

    if (char) {
      for (let i = 0; i < char.length; i++) {
        shuffled.push(char[i]);
      }
    }

    // reversing items array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  selectChoice(char: Character | null): void {
    if (char) {
      this.characterSelectedEvent.emit(char);
    }
  }

  displayCharacter(char: Character | null, challengeLanguage: SettingsChallengeLanguageOptions | null): string {
    return challengeLanguage === 'Hiragana' ? char?.english || '' : char?.japanese || '';
  }

}

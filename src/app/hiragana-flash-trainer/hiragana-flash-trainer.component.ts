import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../character';
import { hiragana } from '../hiragana';
import { SettingsState } from '../store/settings.reducer';
import { featureSettings } from '../store/settings.selectors';

@Component({
  selector: 'app-hiragana-flash-trainer',
  templateUrl: './hiragana-flash-trainer.component.html',
  styleUrls: ['./hiragana-flash-trainer.component.scss']
})
export class HiraganaFlashTrainerComponent implements OnInit {

  selectedCharacters$ = this.store.select(featureSettings);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  getHiraganaRowTitles(): string[] {
    return Object.keys(hiragana);
  }

  getHiraganaRowCharacters(category: string): (Character | null)[] {
    return Object.keys(hiragana[category]).map(v => hiragana[category][v] === null ? null : new Character(v, hiragana[category][v]));
  }

  checkHiraganaSelected(selectedCharacters: SettingsState | null, character: string | undefined): boolean {
    return !!character ? !selectedCharacters?.hiragana?.includes(character) : false;
  }

  englishCharacter: TrackByFunction<any> = (index: number, item: Character | null) => item?.english;
}

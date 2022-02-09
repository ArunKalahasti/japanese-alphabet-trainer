import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCharacterStats } from 'src/app/store/score/score.selectors';

@Component({
  selector: 'app-character-score',
  templateUrl: './character-score.component.html',
  styleUrls: ['./character-score.component.scss']
})
export class CharacterScoreComponent implements OnInit {

  @Input() character: string = "";

  characterStats$ = this.store.select(selectCharacterStats(this.character));

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.characterStats$ = this.store.select(selectCharacterStats(this.character));
  }

  calcPercent(correctGuesses: number, wrongGuesses: number): string {
    return (100 * (correctGuesses / (correctGuesses + wrongGuesses))).toFixed(0)
  }

}

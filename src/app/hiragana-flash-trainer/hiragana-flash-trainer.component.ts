import { Component, OnInit } from '@angular/core';
import { hiragana } from '../hiragana';

@Component({
  selector: 'app-hiragana-flash-trainer',
  templateUrl: './hiragana-flash-trainer.component.html',
  styleUrls: ['./hiragana-flash-trainer.component.scss']
})
export class HiraganaFlashTrainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getHiraganaRowTitles(): string[] {
    return Object.keys(hiragana);
  }

  getHiraganaRowCharacters(category: string): string[] {
    return Object.values(hiragana[category]).map(v => v === null ? '' : v);
  }

}

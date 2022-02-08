import { Injectable } from '@angular/core';
import { Character } from '../character';

@Injectable({
  providedIn: 'root'
})
export class HiraganaFlashTrainerService {

  constructor() { }

  generateQuery(enabledCharacters: Character[]) {
    return enabledCharacters[Math.floor(Math.random()*enabledCharacters.length)];
  }
}

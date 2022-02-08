import { Component, OnInit } from '@angular/core';
import { hiragana } from './hiragana';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'japanese-alphabet-trainer';
  selectedGroup: {[key: string]: boolean} = {
    vowels: true
  };

  choiceLanguage: 'h' | 'e' = 'h';

  languageOptions = ['Hiragana', 'English'];

  choiceCount = 5;
  randomizeChoiceOrder = false;
  choices: any[] = [];
  query: any;

  ngOnInit(): void {
    this.choices = this.generateChoices();
    this.query = this.generateQuery(this.choices);
    console.log(this.choices)
  }

  shuffleChoices() {
    
    if (this.randomizeChoiceOrder) {
      this.choices.sort(function(a, b){return 0.5 - Math.random()});
    } else {
      this.choices.sort(function(a, b){return a.i - b.i});
    }
  }

  generateQuery(choices: any[]): any {
    return choices[Math.floor(Math.random()*choices.length)];
  }

  generateChoices() {
    let choices: any[] = [];
    let i = 0;
    Object.keys(this.selectedGroup).forEach(group => {
      if (this.selectedGroup[group]) {
        Object.keys(hiragana[group]).forEach(char => {
          choices.push({h: hiragana[group][char], e: char, i});
          i++;
        })
      }
    })
    if (this.randomizeChoiceOrder) {
      choices.sort(function(a, b){return 0.5 - Math.random()});
    }
    return choices;
  }

  displayChoice(choice: any): string {
    return choice[this.choiceLanguage];
  }

  displayQuery(query: any): string {
    if (this.choiceLanguage === 'h') {
      return query.e;
    } else {
      return query.h;
    }
  }

  selectChoice(choice: any) {
    const t = this.test(choice);
    console.log(t);
    if (t) {
      this.query = this.generateQuery(this.choices.filter(c => c !== choice));
    } else {
      
    }
  }

  test(choice: any): boolean {
    if (choice === this.query) {
      return true;
    } else {
      return false;
    }
  }

  changeLanguage(event: {value: string}) {
    if (event.value === 'Hiragana') {
      this.choiceLanguage = 'h';
    } else {
      this.choiceLanguage = 'e';
    }
    console.log(event);
  }
}

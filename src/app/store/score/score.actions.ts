import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/character';

export const clearScores = createAction(
  '[Score] Clear Scores'
);

export const clearCharacterStats = createAction(
  '[Score] Clear Character Stats'
);

export const correctGuess = createAction(
  '[Score] Correct Guess',
  props<{challenge: Character}>()
);

export const wrongGuess = createAction(
  '[Score] Wrong Guess',
  props<{challenge: Character | null}>()
);

export const showAnswer = createAction(
  '[FlashTrainer] Show Answer'
);

export const hideAnswer = createAction(
  '[FlashTrainer] Hide Answer'
);

export const generateQuery = createAction(
  '[FlashTrainer] Generate Query'
);

export const setQuery = createAction(
  '[FlashTrainer] Set Query',
  props<{challenge: Character | null}>()
);

export const testEnglishResponse = createAction(
  '[FlashTrainer] Test English Response',
  props<{response: Character}>()
);

export const testHiraganaResponse = createAction(
  '[FlashTrainer] Test Hiragana Response',
  props<{response: string}>()
);
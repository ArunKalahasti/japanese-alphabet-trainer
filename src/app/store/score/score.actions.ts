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
  props<{query: Character}>()
);

export const wrongGuess = createAction(
  '[Score] Wrong Guess',
  props<{query: Character | null}>()
);

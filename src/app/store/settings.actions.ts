import { createAction, props } from '@ngrx/store';

export const setSelectedCharacters = createAction(
  '[SelectedCharacter] Set SelectedCharacters',
  props<{hiragana: string[]}>()
);

export const toggleSelectedCharacters = createAction(
  '[SelectedCharacter] Toggle SelectedCharacters',
  props<{hiragana: string[]}>()
);

export const selectCharacters = createAction(
  '[SelectedCharacter] Select Characters',
  props<{hiragana: string[]}>()
);

export const unselectCharacters = createAction(
  '[SelectedCharacter] Unselect Characters',
  props<{hiragana: string[]}>()
);



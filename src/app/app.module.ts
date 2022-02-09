import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CharacterSelectorComponent } from './components/character-selector/character-selector.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './store/settings/settings.effects';
import { HiraganaFlashTrainerComponent } from './components/flash-trainer/flash-trainer.component';
import { HiraganaKeyboardComponent } from './components/structured-keyboard/structured-keyboard.component';
import { RandomizedKeyboardComponent } from './components/randomized-keyboard/randomized-keyboard.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { ScoreEffects } from './store/score/score.effects';
import { CharacterScoreComponent } from './components/character-score/character-score.component';
import { HandwritingKeyboardComponent } from './components/handwriting-keyboard/handwriting-keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectorComponent,
    HiraganaFlashTrainerComponent,
    HiraganaKeyboardComponent,
    RandomizedKeyboardComponent,
    SettingsDialogComponent,
    CharacterScoreComponent,
    HandwritingKeyboardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatGridListModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSliderModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([SettingsEffects, ScoreEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

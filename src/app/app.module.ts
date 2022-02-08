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
import { FormsModule } from '@angular/forms';
import { CharacterSelectorComponent } from './character-selector/character-selector.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './store/settings.effects';
import { HiraganaFlashTrainerComponent } from './hiragana-flash-trainer/hiragana-flash-trainer.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectorComponent,
    HiraganaFlashTrainerComponent
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
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([SettingsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from 'src/app/character';
import * as SettingsActions from '../../store/settings/settings.actions';

declare var handwriting: any;

@Component({
  selector: 'app-handwriting-keyboard',
  templateUrl: './handwriting-keyboard.component.html',
  styleUrls: ['./handwriting-keyboard.component.scss']
})
export class HandwritingKeyboardComponent implements OnInit {

  @Output() hiraganaSelectedEvent = new EventEmitter<string>();

  canvas: any;

  penSize = 3;

  result = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.canvas = new handwriting.Canvas(this.document.getElementById('canvas'), 3);
    var width = this.document.getElementById("demo")?.clientWidth
    this.canvas.cxt.canvas.width  = width && width < 300 ? width : 300;
    this.canvas.cxt.canvas.height = width && width < 300 ? width : 300;
    this.canvas.setCallBack((data: any, err: any) => {
      if (err) throw err;
      else {
        this.canvas.erase();
        this.result = data;
        this.hiraganaSelectedEvent.emit(data[0]);
      };
    });
    this.canvas.set_Undo_Redo(true, true);
  }

  changePenSize() {
    this.canvas.setLineWidth(this.penSize);
  }

  canvasErase() {
    this.canvas.erase();
  }

  canvasSend() {
    this.canvas.setOptions({language: 'ja'});
    this.canvas.recognize()
  }

  canvasUndo() {
    this.canvas.undo();
  }

  canvasRedo() {
    this.canvas.redo();
  }

}

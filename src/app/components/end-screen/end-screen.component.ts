import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss']
})
export class EndScreenComponent implements OnInit {
  @Output('restart') outRestart = new EventEmitter<void>();

  get isOverThrown() {
    return this._gameLogic.isPlayerOverThrown;
  }

  get resultPolarity() {
    return this.isOverThrown ? 'negative' : 'positive';
  }

  constructor(
    private _gameLogic: GameLogicService,
  ) { }

  ngOnInit(): void {
  }

  onRestart(): void {
    this.outRestart.emit();
  }

}

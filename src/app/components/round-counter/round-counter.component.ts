import { GameLoopService, GameLoopStates } from './../../services/engine/services/game-loop.service';
import { environment } from './../../../environments/environment';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-round-counter',
  templateUrl: './round-counter.component.html',
  styleUrls: ['./round-counter.component.scss']
})
export class RoundCounterComponent implements OnInit {

  get isInMainLoop() {
    return this._gameLoop.loopState === GameLoopStates.MAIN;
  }

  get isInEndLoop() {
    return this._gameLoop.loopState === GameLoopStates.END;
  }

  get roundNo() {
    return this._gameLogic.round;
  }

  get roundTotal() {
    return environment.countRounds;
  }

  constructor(
    private _gameLogic: GameLogicService,
    private _gameLoop: GameLoopService,
  ) { }

  ngOnInit(): void {
  }

}

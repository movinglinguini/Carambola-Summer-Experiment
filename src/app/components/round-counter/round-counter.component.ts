import { environment } from './../../../environments/environment';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-round-counter',
  templateUrl: './round-counter.component.html',
  styleUrls: ['./round-counter.component.scss']
})
export class RoundCounterComponent implements OnInit {

  get roundNo() {
    return this._gameLogic.round;
  }

  get roundTotal() {
    return environment.countRounds;
  }

  constructor(
    private _gameLogic: GameLogicService,
  ) { }

  ngOnInit(): void {
  }

}

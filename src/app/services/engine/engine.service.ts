import { GameLoopService } from './services/game-loop.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(
    private _gameLoop: GameLoopService,
  ) {}

  startUp() {
    this._gameLoop.triggerInitState();
  }
}

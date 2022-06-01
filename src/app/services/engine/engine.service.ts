import { GameLoopService } from './services/game-loop.service';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  public $update = new EventEmitter<void>();

  constructor(
    private _gameLoop: GameLoopService,
  ) {}

  startUp() {
    this._gameLoop.triggerInitState();
  }

  update() {
    this.$update.emit();
  }
}

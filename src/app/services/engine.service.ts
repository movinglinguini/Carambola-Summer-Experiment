import { GameLoopService } from './game-loop.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  constructor(
    private _gameLoop: GameLoopService,
  ) {}
}

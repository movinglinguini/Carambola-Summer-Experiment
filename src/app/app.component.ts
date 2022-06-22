import { LoggerService } from './services/logger/logger.service';
import { AutoplayerService } from './services/autoplayer/autoplayer.service';
import { environment } from './../environments/environment';
import { GameLogicService } from './services/game-logic/game-logic.service';
import { EngineService } from './services/engine/engine.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get isTestMode() {
    return environment.testMode;
  }

  constructor(
    private _engine: EngineService,
    private _gameLogic: GameLogicService,
    private _autoPlayer: AutoplayerService,
    private _logger: LoggerService,
  ) {}

  ngOnInit() {
    if (environment.testMode) {
      this._autoPlayer.run();
    } else {
      this.initGame();
    }
  }

  initGame() {
    this._gameLogic.$onNextRound.subscribe(roundNo => {
      if (this._gameLogic.isGameOver) {
        console.log('game is over');
      }
    })

    this._gameLogic.onStart();
    this._gameLogic.generateDecisionEvent();
  }
}

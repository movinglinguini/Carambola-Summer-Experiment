import { AutoplayerService } from './services/autoplayer/autoplayer.service';
import { environment } from './../environments/environment';
import { GameLogicService } from './services/game-logic/game-logic.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get doShowLog() {
    return environment.showLog;
  }

  get isTestMode() {
    return environment.testMode;
  }

  get isGameOver() {
    return this._gameLogic.isGameOver;
  }

  constructor(
    private _gameLogic: GameLogicService,
    private _autoPlayer: AutoplayerService,
  ) {}

  ngOnInit() {
    if (environment.testMode) {
      this._autoPlayer.run();
    } else {
      this.initGame();
    }
  }

  initGame() {
    this._gameLogic.onStart();
  }

  onRestart() {
    this.initGame();
  }
}

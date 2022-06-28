import { GameLoopService } from './services/engine/services/game-loop.service';
import { AutoplayerService } from './services/autoplayer/autoplayer.service';
import { environment } from './../environments/environment';
import { GameLogicService } from './services/game-logic/game-logic.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

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

  private _endGameSubscription: Subscription;

  constructor(
    private _gameLoop: GameLoopService,
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
    this._endGameSubscription = this._gameLogic.$onNextRound.subscribe(roundNo => {
      if (this._gameLogic.isGameOver) {
        this._gameLoop.triggerEndState();
      }
    });

    this._gameLoop.triggerInitState();
    this._gameLogic.onStart();
    this._gameLogic.generateDecisionEvent();
    this._gameLoop.triggerMainState();
  }

  onRestart() {
    this._endGameSubscription.unsubscribe();

    this.initGame();
  }
}

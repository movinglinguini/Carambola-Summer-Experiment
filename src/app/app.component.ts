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
  title = 'carambola';

  constructor(
    private _engine: EngineService,
    private _gameLogic: GameLogicService,
    private _autoPlayer: AutoplayerService
  ) {}

  ngOnInit() {
    this._engine.$update.subscribe(() => {
      this._gameLogic.onUpdate();
    });

    if (environment.testMode) {
      this._autoPlayer.run();
    }
  }
}

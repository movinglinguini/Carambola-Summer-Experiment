import { EventEmitter, Injectable } from '@angular/core';

export enum GameLoopStates {
  INIT,
  MAIN,
  END
};

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {
  public $stateSwitch = new EventEmitter<GameLoopStates>();

  get loopState() {
    return this._loopState;
  }

  private _loopState = GameLoopStates.INIT;

  constructor() { }

  public triggerInitState() {
    this._loopState = GameLoopStates.INIT;
    this.$stateSwitch.emit(this._loopState);
  }

  public triggerMainState() {
    this._loopState = GameLoopStates.MAIN;
    this.$stateSwitch.emit(this._loopState);
  }

  public triggerEndState() {
    this._loopState = GameLoopStates.END;
    this.$stateSwitch.emit(this._loopState);
  }
}

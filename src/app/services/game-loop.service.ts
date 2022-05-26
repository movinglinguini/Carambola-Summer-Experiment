import { Injectable } from '@angular/core';

enum GameLoopStates {
  INIT,
  MAIN,
  END
};

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {
  get loopState() {
    return this._loopState;
  }

  private _loopState = GameLoopStates.INIT;

  constructor() { }

  public triggerInitState() {
    this._loopState = GameLoopStates.INIT;
  }

  public triggerMainState() {
    this._loopState = GameLoopStates.MAIN;
  }

  public triggerEndState() {
    this._loopState = GameLoopStates.END;
  }
}

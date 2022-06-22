import { LoggerService, ILogInitData, LogDataTypes, ILogDecisionEvent } from './../logger/logger.service';
import { generateDecisionEvent, IDecisionEvent } from './modules/generate-decision-event';
import { GameResources } from './resources/resources';
import { environment } from '../../../environments/environment';
import { GameLoopService, GameLoopStates } from '../engine/services/game-loop.service';
import { Injectable, EventEmitter } from '@angular/core';
import { generateActions, IAction } from 'src/app/functions/generate-actions';
import { generateAdvisors, IAdvisor } from 'src/app/functions/generate-advisors';
import { executeActionEffects } from './modules/execute-action-effects';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  public $onNextRound = new EventEmitter<number>();

  get advisors() {
    return GameResources.advisorList;
  }

  get currentDecisionEvent() {
    return this._currentDecisionEvent;
  }

  get isGameOver() {
    return this._round > environment.countRounds;
  }

  get round() {
    return this._round;
  }

  private _round = 0;
  private _currentDecisionEvent: (IDecisionEvent | null) = null;
  private _decisionEventHistory: IDecisionEvent[] = [];

  constructor(
    private _gameLoop: GameLoopService,
    private _logger: LoggerService,
  ) {
    this._gameLoop.$stateSwitch.subscribe((newState: GameLoopStates) => {
      this.handleStateSwitch(newState);
    });
  }

  /**
   * START State change handlers
   * END State change handlers
   */
  onStart() {
    const advisors: IAdvisor[] = generateAdvisors(environment.advisorCount);
    const actions: IAction[] = generateActions();

    GameResources.advisorList = advisors;
    GameResources.actionList = actions;

    const payload: ILogInitData = {
      type: LogDataTypes.INIT,
      playthroughNo: 1,
      round: this._round,
      actions,
    };

    this._logger.logData(payload);

    this._round = 1;
  }

  onUpdate() {
    switch (this._gameLoop.loopState) {
      case GameLoopStates.MAIN:
        this.onMainStateUpdate();
        break;
    }
  }


  /** START Event listeners */
  /**
   * React to whenever the player chooses an action.
   * @param action
   */
  onChooseAction(action: IAction) {
    if (this._currentDecisionEvent) {
      this._currentDecisionEvent.chosenAction = action;
      this._decisionEventHistory.push(this._currentDecisionEvent);

      const payload: ILogDecisionEvent = {
        type: LogDataTypes.POST_DECISION,
        decisionEvent: this._currentDecisionEvent,
        playthroughNo: 1,
        round: this._round,
      };

      this._logger.logData(payload);

      // execute the effects of the action
      executeActionEffects(action);
      // go to the next decision event
      this.generateDecisionEvent();
      this._round += 1;
      this.$onNextRound.emit(this._round);

      if (this._round === 0) {
        this._gameLoop.triggerEndState();
      }
    }
  }
  /** END Event Listeners */

  /**
   * Generates an object which represents a decision event, which is a
   * point where the player picks between two alternative actions.
   *
   * @returns A decision event object, which includes two alternative actions the player may choose from
   * and a slot for the chosen action, which can be used to track the history of actions.
   * */
  generateDecisionEvent(): IDecisionEvent {
    this._currentDecisionEvent = generateDecisionEvent();

    const payload: ILogDecisionEvent = {
      type: LogDataTypes.PRE_DECISION,
      decisionEvent: this._currentDecisionEvent,
      playthroughNo: 1,
      round: this._round,
    };

    this._logger.logData(payload);

    return this._currentDecisionEvent;
  }

  private handleStateSwitch(newState: GameLoopStates) {
    switch (newState) {
      case GameLoopStates.INIT:
        this.onStart();
        break;
    }
  }

  private onMainStateUpdate() {
    // generate a decision event to be presented to the player
    this.generateDecisionEvent();
  }
}

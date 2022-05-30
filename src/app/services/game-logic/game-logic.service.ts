import { generateDecisionEvent, IDecisionEvent } from './modules/generate-decision-event';
import { GameResources} from './resources/resources';
import { environment } from '../../../environments/environment';
import { GameLoopService, GameLoopStates } from '../engine/services/game-loop.service';
import { Injectable } from '@angular/core';
import { generateActions, IAction } from 'src/app/functions/generate-actions';
import { generateAdvisors, IAdvisor } from 'src/app/functions/generate-advisors';
import { executeActionEffects } from './modules/execute-action-effects';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  get currentDecisionEvent() {
    return this._currentDecisionEvent;
  }

  private _currentDecisionEvent: (IDecisionEvent | null) = null;
  private _decisionEventHistory: IDecisionEvent[] = [];

  constructor(private _gameLoop: GameLoopService) {
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
  }

  onUpdate() {
    switch (this._gameLoop.loopState) {
      case GameLoopStates.MAIN:
        this._onMainStateUpdate();
        break;
    }
  }

  _onMainStateUpdate() {
    // generate a decision event to be presented to the player
    this.generateDecisionEvent();
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

      // execute the effects of the action
      executeActionEffects(action);
      // go to the next decision event
      this.generateDecisionEvent();
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
    return this._currentDecisionEvent;
  }

  private handleStateSwitch(newState: GameLoopStates) {
    switch (newState) {
      case GameLoopStates.INIT:
        this.onStart();
        break;
    }
  }
}

import { LoggerService, ILogInitData, LogDataTypes, ILogDecisionEvent } from './../logger/logger.service';
import { generateDecisionEvent, IDecisionEvent } from './modules/generate-decision-event';
import { GameResources } from './resources/resources';
import { environment } from '../../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { generateAdvisors, IAdvisor } from '../../shared/resources/advisors.resource';
import { executeActionEffects, generateActions, IAction } from '../../shared/resources/action.resource';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  public $onNextRound = new EventEmitter<number>();
  public $onGameOver = new EventEmitter<number>();

  get advisors() {
    return GameResources.advisorList;
  }

  get currentDecisionEvent() {
    return this._currentDecisionEvent;
  }

  get isGameOver() {
    return this._round >= (environment.countRounds - 1);
  }

  get round() {
    return this._round;
  }

  get isPlayerOverThrown() {
    const rebellious = this.advisors.filter(adv => adv.rebellious);
    const notRebellious = this.advisors.filter(adv => !adv.rebellious);

    return rebellious.length > notRebellious.length;
  }

  private _round = 0;
  private _currentDecisionEvent: (IDecisionEvent | null) = null;
  private _decisionEventHistory: IDecisionEvent[] = [];

  constructor(
    private _logger: LoggerService,
  ) {}

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

    this._round = 0;
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

      const payload: ILogDecisionEvent = {
        type: LogDataTypes.POST_DECISION,
        decisionEvent: this._currentDecisionEvent,
        playthroughNo: 1,
        round: this._round,
      };

      this._logger.logData(payload);

      // execute the effects of the action
      executeActionEffects(action, this.advisors);
      // go to the next decision event
      this.generateDecisionEvent();
      this._round += 1;

      if (this.isGameOver) {
        this.$onGameOver.emit();
      } else {
        this.$onNextRound.emit(this._round);
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

  getDecisionEventAtRound(roundNo: number): IDecisionEvent {
    return this._decisionEventHistory[roundNo];
  }
}

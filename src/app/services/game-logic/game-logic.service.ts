import { DecisionEventService } from './../decision-event.service';
import { ActionService } from './../action.service';
import { AdvisorService } from './../advisor.service';
import { LoggerService, ILogInitData, LogDataTypes, ILogDecisionEvent } from './../logger/logger.service';
import { IDecisionEvent } from './modules/generate-decision-event';
import { environment } from '../../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { calculateActionEffect, IAction } from '../../shared/resources/action.resource';
import { IAdvisor } from 'src/app/interfaces/advisor.interface';

interface IEvent {
  round: number;
  chosenAction: IAction;
  alternateAction: IAction;
  reactions: { advisor: IAdvisor, reaction: number }[]
}

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  public $beforeNextRound = new EventEmitter<IEvent>();
  public $onStart = new EventEmitter<void>();
  public $onNextRound = new EventEmitter<number>();
  public $onGameOver = new EventEmitter<number>();

  get advisors() {
    return this._advisorService.advisors;
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

  get maxRounds() {
    return environment.countRounds;
  }

  get isPlayerOverThrown() {
    return (async () => {
      const advisors = this.advisors;
      const rebellious = advisors.filter(adv => adv.rebellious);
      const notRebellious = advisors.filter(adv => !adv.rebellious);
      return rebellious.length > notRebellious.length;
    })();
  }

  private _round = 0;
  private _currentDecisionEvent: (IDecisionEvent | null) = null;
  private _decisionEventHistory: IDecisionEvent[] = [];

  constructor(
    private _logger: LoggerService,
    private _advisorService: AdvisorService,
    private _actionService: ActionService,
    private _decisionEventService: DecisionEventService,
  ) {}

  /**
   * START State change handlers
   * END State change handlers
   */
  async onStart() {
    await this._advisorService.generateAdvisors();
    const actions: IAction[] = await this._actionService.generateActions();

    const payload: ILogInitData = {
      type: LogDataTypes.INIT,
      playthroughNo: 1,
      round: this._round,
      actions,
    };

    this._logger.logData(payload);

    this._round = 0;
    await this.generateDecisionEvent();
    this.$onStart.emit();
  }


  /** START Event listeners */
  /**
   * React to whenever the player chooses an action.
   * @param action
   */
  async onChooseAction(action: IAction) {
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

      this.$beforeNextRound.emit({
        round: this._round,
        chosenAction: action,
        alternateAction: (this._currentDecisionEvent.alternatives.find(act => act.name !== action.name) as IAction),
        reactions: this.advisors.map(adv => ({
          advisor: adv,
          reaction: calculateActionEffect(action, adv),
        }))
      });

      // execute the effects of the action
      await this._advisorService.makeAllAdvisorsReactToAction(action);
      // go to the next decision event
      await this.generateDecisionEvent();
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
  async generateDecisionEvent(): Promise<IDecisionEvent> {
    const actionList = await this._actionService.getAllActions();
    this._currentDecisionEvent = await this._decisionEventService.generateDecisionEvent(actionList);

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

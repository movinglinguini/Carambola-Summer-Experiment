import { IAdvisor } from '../../shared/resources/advisors.resource-dep';
import { IDecisionEvent } from './../game-logic/modules/generate-decision-event';
import { IAction } from './../../shared/resources/action.resource';
import { Injectable, EventEmitter } from '@angular/core';

export enum LogDataTypes {
  INIT = 'init',
  END = 'end',
  PRE_DECISION = 'pre_decision',
  POST_DECISION = 'post_decision',
  ADVISOR_STATE = 'advisor_state'
}

export interface ILogData {
  playthroughNo: number,
  round: number,
  type: LogDataTypes
}

export interface ILogInitData extends ILogData {
  type: LogDataTypes.INIT,
  actions: IAction[],
}

export interface ILogAdvisorState extends ILogData {
  type: LogDataTypes.ADVISOR_STATE,
  advisors: ILogAdvisor[],
}

export interface ILogAdvisor extends IAdvisor {};

export interface ILogDecisionEvent extends ILogData {
  type: LogDataTypes.PRE_DECISION | LogDataTypes.POST_DECISION,
  decisionEvent: IDecisionEvent,
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public $gameLog = new EventEmitter<ILogData>();

  constructor() { }

  logData(data: (ILogInitData | ILogAdvisorState | ILogDecisionEvent)) {
    this.$gameLog.emit(data);
  }
}

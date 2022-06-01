import { environment } from './../../../environments/environment.prod';
import { IDecisionEvent } from './../game-logic/modules/generate-decision-event';
import { IAction } from './../../functions/generate-actions';
import { Injectable } from '@angular/core';
import { IAdvisor } from 'src/app/functions/generate-advisors';

export enum LogDataTypes {
  INIT = 'init',
  END = 'end',
  PRE_DECISION = 'pre_decision',
  POST_DECISION = 'post_decision',
  ADVISOR_STATE = 'advisor_state'
}

export interface ILogData {
  round: number,
}

export interface ILogInitData extends ILogData {
  type: LogDataTypes.INIT,
  actions: IAction[],
}

export interface ILogAdvisorState extends ILogData {
  type: LogDataTypes.ADVISOR_STATE,
  advisor: IAdvisor,
  isRebellious: boolean
}

export interface ILogDecisionEvent extends ILogData {
  type: LogDataTypes.PRE_DECISION | LogDataTypes.POST_DECISION,
  decisionEvent: IDecisionEvent,
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  logData(data: (ILogInitData | ILogAdvisorState | ILogDecisionEvent)) {
    return fetch(environment.loggerEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    });
  }
}

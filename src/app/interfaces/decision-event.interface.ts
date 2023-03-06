import { IAction } from './action.interface';

export interface IDecisionEvent {
  alternatives: [IAction, IAction];
  chosenAction: IAction | null;
}

export interface IEmptyDecisionEvent extends IDecisionEvent {
  chosenAction: null;
}

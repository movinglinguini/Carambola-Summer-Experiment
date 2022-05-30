import { getOpposingValue, VALUE_LIST } from './../../../shared/values.utility';
import { ActionValueEffects, IAction } from './../../../functions/generate-actions';
import { actionList } from './../resources/resources';

export interface IDecisionEvent {
  alternatives: [IAction, IAction];
  chosenAction: IAction | null;
}

/**
 * Selects two alternatives for a player to choose from.
 *
 * @returns A decision event object, which includes two alternative actions the player may choose from
 * and a slot for the chosen action, which can be used to track the history of actions.
 */
export function generateDecisionEvent(): IDecisionEvent {
  const getRandomEffect = () => Math.random() < 0.5 ? ActionValueEffects.HARM : ActionValueEffects.PROMOTE;

  // choose two opposing values that the player must choose between to promote or harm
  const value1Idx = Math.floor(Math.random() * VALUE_LIST.length);
  const value2Idx = getOpposingValue(value1Idx);

  const withEffect = getRandomEffect();

  const action1: IAction = getAnActionWithAttitudeOnValue(withEffect, value1Idx);
  const action2: IAction = getAnActionWithAttitudeOnValue(withEffect, value2Idx);

  return {
    alternatives: [action1, action2],
    chosenAction: null,
  }
}

/**
 * Helper function for
 */
function getAnActionWithAttitudeOnValue(effectKey: ActionValueEffects, valueIdx: number): IAction {
  return actionList.find(action => {
    return action[effectKey].includes(valueIdx);
  }) as IAction;
}

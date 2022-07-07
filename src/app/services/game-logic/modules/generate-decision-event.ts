import { selectRandom } from 'src/app/shared/random.utility';
import { getOpposingValue, VALUE_LIST, VALUE_MAP } from './../../../shared/values.utility';
import { ActionValueEffects, IAction, actionMap } from './../../../functions/generate-actions';
import { GameResources } from './../resources/resources';

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
  // choose two opposing values that the player must choose between to promote or harm
  const value1Idx = Math.floor(Math.random() * VALUE_LIST.length);
  const action1 = getAnActionWithAttitudeOnValue(ActionValueEffects.PROMOTE, value1Idx);
  const otherActions = Array.from(actionMap.values()).filter(act => act.name !== action1.name);

  const action2 = selectRandom(otherActions);

  return {
    alternatives: [(action1 as IAction), (action2 as IAction)],
    chosenAction: null,
  }
}

/**
 * Helper function for
 */
function getAnActionWithAttitudeOnValue(effectKey: ActionValueEffects, valueIdx: number): IAction {
  return GameResources.actionList.find(action => {
    return action[effectKey].includes(valueIdx);
  }) as IAction;
}

import { IEmptyDecisionEvent } from '../interfaces/decision-event.interface';
import { VALUE_LIST } from '../shared/utilities/values.utility';
import { IAction } from '../interfaces/action.interface';
import { selectRandom } from '../shared/utilities/random.utility';
import { ActionValueEffects } from '../enums/action-value-effects.enum';

export interface IDecisionEvent {
  alternatives: [IAction, IAction];
  chosenAction: IAction | null;
}

/** Tracks action pairs */
const actionPairTracker = new Set<string>();
let viableAction1s: IAction[];
/**
 * Tracks the amount of times each action has been used.
 */
const actionToUsesMap = new Map<string, number>();

/**
 * Selects two alternatives for a player to choose from.
 *
 * @returns A decision event object, which includes two alternative actions the player may choose from
 * and a slot for the chosen action, which can be used to track the history of actions.
 */
export function generateDecisionEvent(opts: { actionList: IAction[] }): IEmptyDecisionEvent {
  // choose two opposing values that the player must choose between to promote or harm
  // repeat until we find a pairing

  if (!viableAction1s) {
    viableAction1s = opts.actionList;
  }

  const value1Idx = Math.floor(Math.random() * VALUE_LIST.length);
  const action1 = getAnActionWithAttitudeOnValue(viableAction1s, ActionValueEffects.PROMOTE, value1Idx);
  const otherActions = viableAction1s
    .filter(act => {
      const noDupe = act.name !== action1.name;
      const hasNotBeenPaired = !actionPairTracker.has(getActionPairKey(action1, act));
      return noDupe && hasNotBeenPaired;
    });

  const action2 = selectRandom(otherActions);

  logActionPair(action1, action2);
  incrementActionUsage(action1);
  incrementActionUsage(action2);
  tryDisqualifyAction(action1, opts.actionList);
  tryDisqualifyAction(action2, opts.actionList);

  return {
    alternatives: [(action1 as IAction), (action2 as IAction)],
    chosenAction: null,
  }
}

/**
 * Helper function for retrieving an action that effects the given value (`valueId`) with the given polarity (`effectKey`).
 */
function getAnActionWithAttitudeOnValue(fromList: IAction[], effectKey: ActionValueEffects, valueIdx: number): IAction {
  return fromList.find(action => {
    return action[effectKey].includes(valueIdx);
  }) as IAction;
}

function logActionPair(action1: IAction, action2: IAction) {
  const actionPairKey = getActionPairKey(action1, action2);
  actionPairTracker.add(actionPairKey);
}

function getActionPairKey(action1: IAction, action2: IAction) {
  const sortedKeys = [action1.name, action2.name].sort((a, b) => a.localeCompare(b));
  const pairKey = sortedKeys.join('.');
  return pairKey;
}

function incrementActionUsage(action: IAction) {
  if(!actionToUsesMap.has(action.name)) {
    actionToUsesMap.set(action.name, 0);
  }

  const uses = actionToUsesMap.get(action.name) as number;
  actionToUsesMap.set(action.name, uses + 1);
}

/**
 * Checks if the action exceeded its usage threshold. If so, removes it from the list of
 * viable actions to choose.
 */
function tryDisqualifyAction(action: IAction, actionList: IAction[]) {
  /**
   * The amount of times an action can appear before it is disqualified as a viable action.
   */
  const actionDequalThreshold = actionList.length - 1;
  const uses = actionToUsesMap.get(action.name) as number;

  if (uses >= actionDequalThreshold) {
    const actIdx = viableAction1s.findIndex(_action => _action.name === action.name);
    viableAction1s.splice(actIdx, 1);
  }
}

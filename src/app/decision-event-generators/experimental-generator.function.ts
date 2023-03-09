import { VALUE_LIST, valueNameToIdx } from './../shared/utilities/values.utility';
import { IEmptyDecisionEvent } from './../interfaces/decision-event.interface';
import { IAction } from "../interfaces/action.interface";
import { IAdvisor } from "../interfaces/advisor.interface";
import { selectRandom } from '../shared/utilities/random.utility';

let firstCall = true;
const decisionEventProgression: [IAction, IAction][] = [];

/**
 * Generates a series of decision of events according to Aim 1 in https://docs.google.com/document/d/1FpKZaUkgPrVIyduRZyARp7zCt3CON_m_JoZZ84-Nv6E/edit.
 *
 * Seven decision events will be created in the following sequence:
 *
 * 1. C_1, A_1
 * 2. D_1, A_2
 * 3. C_1, D_1
 * 4. C_1 A_1
 * 5. C_2 A_3
 * 6. D_2 A_4
 * 7. C_3 D_3
 *
 * Where C_i is the action that promotes the ith cherished value, D_i is the same but for despised values,
 * and A_i is the same but for ambivalent values.
*/
export function generateDecisionEvent(opts: { advisor: IAdvisor, actionList: IAction[] }): IEmptyDecisionEvent {
  // generate the progression of decision events
  if (firstCall) {
    firstCall = false;
    decisionEventProgression.push(...generateAlternativesProgression(opts.advisor, opts.actionList));
  }

  console.log(decisionEventProgression);

  if (decisionEventProgression.length === 0) {
    throw Error('Error generating next decision event: There are no more decision events to show!');
  }

  const actionPair = decisionEventProgression.shift() as [IAction, IAction];
  return {
    alternatives: actionPair,
    chosenAction: null,
  };
}

/** Gene */
function generateAlternativesProgression(advisor: IAdvisor, actionList: IAction[]): [IAction, IAction][] {
  const getActionThatPromotesValue = ((value: number) => {
    return selectRandom(actionList.filter(act => act.promotes.includes(value))) as IAction;
  });

  const ambivalentValues = VALUE_LIST.map((v) => valueNameToIdx(v)).filter((vidx) => {
    return !advisor.cherishes.includes(vidx) && !advisor.despises.includes(vidx);
  });

  const cherishedActions = advisor.cherishes.map(c => getActionThatPromotesValue(c));
  const despisedActions = advisor.despises.map(d => getActionThatPromotesValue(d));
  const ambivalentActions = ambivalentValues.map(a => getActionThatPromotesValue(a));

  return [
    [ cherishedActions[0], ambivalentActions[0] ],
    [ despisedActions[0], ambivalentActions[1] ],
    [ cherishedActions[0], despisedActions[0] ],
    [ cherishedActions[0], ambivalentActions[0] ],
    [ cherishedActions[1], ambivalentActions[2] ],
    /**
     * @memo Small bit of jank here. Need to expand action list so that there is a fourth ambivalent action.
    */
    [ despisedActions[1], selectRandom(ambivalentActions) ],
    [ cherishedActions[2], despisedActions[2] ]
  ];
}

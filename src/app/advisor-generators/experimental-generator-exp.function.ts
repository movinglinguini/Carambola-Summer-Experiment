import { VALUE_LIST, getOpposingValue } from './../shared/utilities/values.utility';
import { IAdvisor } from "../interfaces/advisor.interface";
import { generateAdvisors as defaultGenerator } from './default-generator.function';
import { selectRandom } from '../shared/utilities/random.utility';


export const ADVISOR_MAP = new Map<string, IAdvisor>();


/**
 * Generates `advisorCount` advisors such that they have two values they cherish, and two they despise.
 * The advisors are also generated such that they do not overlap on values.
 * @returns
 */
export function generateAdvisors(opts: {
  playerCharacterKey: string,
  maxAffinity: number,
  minAffinity: number,
}): IAdvisor[] {
  const newAdvisor = defaultGenerator({...opts, advisorCount: 1})[0];

  const wrapArrayIndex = (idx: number, arrLen: number) => {
    if (idx < 0) { return arrLen + idx }
    if (idx >= arrLen ) { return idx - arrLen }
    return idx;
  }

  const cidx = selectRandom(VALUE_LIST.map((v, idx) => idx));
  const didx = getOpposingValue(cidx, VALUE_LIST);

  newAdvisor.cherishes = [
    cidx,
    wrapArrayIndex(cidx + 1, VALUE_LIST.length),
    wrapArrayIndex(cidx - 1, VALUE_LIST.length)
  ];

  newAdvisor.despises = [
    didx,
    wrapArrayIndex(didx + 1, VALUE_LIST.length),
    wrapArrayIndex(didx - 1, VALUE_LIST.length)
  ]

  return [newAdvisor];
}

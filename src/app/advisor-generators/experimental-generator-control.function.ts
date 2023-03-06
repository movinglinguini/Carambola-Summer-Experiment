import { IAdvisor } from "../interfaces/advisor.interface";
import { selectRandom } from '../shared/utilities/random.utility';
import { VALUE_LIST, getOpposingValue } from '../shared/utilities/values.utility';
import { generateAdvisors as defaultGenerator } from './default-generator.function';

export const ADVISOR_MAP = new Map<string, IAdvisor>();

const remainingValueIndices = VALUE_LIST.map((_, idx) => idx);
/**
 * Generates exactly one advisor with completely random attitudes towards values and starts
 * with 0 affinity toward the player.
 * @returns
 */
export function generateAdvisors(opts: {
  playerCharacterKey: string,
  maxAffinity: number,
  minAffinity: number,
}): IAdvisor[] {
  const newAdvisor = defaultGenerator({...opts, advisorCount: 1})[0];

  newAdvisor.cherishes = [
    selectValueWithoutReplacement(selectRandom(remainingValueIndices)),
    selectValueWithoutReplacement(selectRandom(remainingValueIndices)),
    selectValueWithoutReplacement(selectRandom(remainingValueIndices))
  ];

  newAdvisor.despises = [
    selectValueWithoutReplacement(selectRandom(remainingValueIndices)),
    selectValueWithoutReplacement(selectRandom(remainingValueIndices)),
    selectValueWithoutReplacement(selectRandom(remainingValueIndices))
  ]

  return [newAdvisor];
}

function selectValueWithoutReplacement(valueIdx: number) {
  remainingValueIndices.splice(remainingValueIndices.findIndex(idx => idx === valueIdx), 1);
  return valueIdx;
}


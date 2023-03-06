import { IAdvisor } from "../interfaces/advisor.interface";
import { selectRandom } from '../shared/utilities/random.utility';
import { VALUE_LIST } from '../shared/utilities/values.utility';

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
  const wrapArrayIndex = (idx: number, arrLen: number) => {
    if (idx < 0) { return arrLen + idx }
    if (idx >= arrLen ) { return idx - arrLen }
    return idx;
  }

  const possibleAdvisorNames = [
    'Dmitri',
    'Ivan',
    'Alyosha',
    'Katerina',
    'Varvara',
    'Nastasya'
  ];

  const cidx1 = selectValueWithoutReplacement(selectRandom(remainingValueIndices));
  const cidx2 = selectValueWithoutReplacement(wrapArrayIndex(cidx1 + 1, VALUE_LIST.length));
  const cidx3 = selectValueWithoutReplacement(wrapArrayIndex(cidx1 - 1, VALUE_LIST.length));

  const didx1 = selectValueWithoutReplacement(selectRandom(remainingValueIndices));
  const didx2 = selectValueWithoutReplacement(wrapArrayIndex(didx1 + 1, VALUE_LIST.length));
  const didx3 = selectValueWithoutReplacement(wrapArrayIndex(didx1 - 1, VALUE_LIST.length));

  const newAdvisor: IAdvisor = {
    name: selectRandom(possibleAdvisorNames),
    cherishes: [ cidx1, cidx2, cidx3 ],
    despises: [ didx1, didx2, didx3 ],
    affinities: [],
    rebellious: false,
    relationshipEffects: [],
    rebellionUtility: 0,
  };

  return [newAdvisor];
}

function selectValueWithoutReplacement(valueIdx: number) {
  remainingValueIndices.splice(remainingValueIndices.findIndex(idx => idx === valueIdx), 1);
  return valueIdx;
}


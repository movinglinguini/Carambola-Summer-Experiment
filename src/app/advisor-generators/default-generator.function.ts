import { IAdvisor } from "../interfaces/advisor.interface";
import { selectRandom } from '../shared/utilities/random.utility';
import { getOpposingValue, VALUE_LIST } from '../shared/utilities/values.utility';

export const ADVISOR_MAP = new Map<string, IAdvisor>();


/**
 * Generates `advisorCount` advisors such that they have two values they cherish, and two they despise.
 * The advisors are also generated such that they do not overlap on values.
 * @returns
 */
export function generateAdvisors(opts: {
  advisorCount: number,
  playerCharacterKey: string,
  maxAffinity: number,
  minAffinity: number,
}): IAdvisor[] {
  const advisors: IAdvisor[] = [];

  // helper functions
  const randomIdx = (arrLen: number) => {
    return Math.round(Math.random() * arrLen);
  }

  const valueSeparation = 0.33;
  const getPerpendicularValueIdx = (idx: number) => Math.round(idx + VALUE_LIST.length * valueSeparation);

  const wrapArrayIndex = (idx: number, arrLen: number) => {
    if (idx < 0) { return arrLen + idx }
    if (idx >= arrLen ) { return idx - arrLen }
    return idx;
  }

  const randomDirection = () => {
    return Math.random() < 0.5 ? -1 : 1;
  }

  const possibleAdvisorNames = [
    'Dmitri',
    'Ivan',
    'Alyosha',
    'Katerina',
    'Varvara',
    'Nastasya'
  ];

  for (let i = 0; i < opts.advisorCount; i += 1) {
    // index promoted values
    // for the first index, we want to make sure that subsequent advisors are not aligned too much
    // on their values.
    let cIdx1 = null;
    // if this isn't the first advisor, shift this advisor's values away from the previous
    // otherwise, just randomly select a spot on the value circle
    if (i > 0) {
      const lastAdvisorCIdx1 = advisors[i - 1].cherishes[0];
      cIdx1 = wrapArrayIndex(getPerpendicularValueIdx(lastAdvisorCIdx1), VALUE_LIST.length);
    } else {
      cIdx1 = wrapArrayIndex(randomIdx(VALUE_LIST.length), VALUE_LIST.length);
    }

    const cIdx2 = wrapArrayIndex(cIdx1 + randomDirection(), VALUE_LIST.length);

    // index despised values
    const dIdx1 = wrapArrayIndex(getOpposingValue(cIdx1), VALUE_LIST.length);
    const dIdx2 = wrapArrayIndex(dIdx1 + randomDirection(), VALUE_LIST.length);


    const advisorName = selectRandom(possibleAdvisorNames);
    const nameIdx = possibleAdvisorNames.findIndex(name => name === advisorName);
    possibleAdvisorNames.splice(nameIdx, 1);

    const newAdvisor = {
      name: advisorName,
      cherishes: [ cIdx1, cIdx2 ],
      despises: [ dIdx1, dIdx2 ],
      affinities: [],
      rebellious: false,
      relationshipEffects: [],
      rebellionUtility: 0,
    } as IAdvisor;

    advisors.push(newAdvisor);
    ADVISOR_MAP.set(newAdvisor.name, newAdvisor);
  }

  return advisors;
}

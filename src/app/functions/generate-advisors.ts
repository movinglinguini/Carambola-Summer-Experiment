import { getOpposingValue, VALUE_LIST } from '../shared/values.utility';

export interface IAdvisor {
  name: string,
  cherishes: [ number, number ],
  despises: [ number, number ]
}

/**
 * Generates `ADVISOR_COUNT` advisors such that they have two values they cherish, and two they despise.
 * The advisors are also generated such that they do not overlap on values.
 * @returns
 */
export function generateAdvisors(advisorCount: number): IAdvisor[] {
  const advisors: IAdvisor[] = [];

  // helper functions
  const randomIdx = (arrLen: number) => {
    return Math.round(Math.random() * arrLen);
  }

  const getPerpendicularValueIdx = (idx: number) => Math.round(idx + VALUE_LIST.length * 0.25);

  const wrapArrayIndex = (idx: number, arrLen: number) => {
    if (idx < 0) { return arrLen + idx }
    if (idx >= arrLen ) { return idx - arrLen }
    return idx;
  }

  const randomDirection = () => {
    return Math.random() < 0.5 ? -1 : 1;
  }

  for (let i = 0; i < advisorCount; i += 1) {
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

    advisors.push({
      name: `${i}`,
      cherishes: [ cIdx1, cIdx2 ],
      despises: [ dIdx1, dIdx2 ],
    });
  }

  return advisors;
}

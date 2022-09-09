import { selectRandom } from '../shared/random.utility';
import { environment } from './../../environments/environment.prod';
import { getOpposingValue, VALUE_LIST } from '../shared/values.utility';

interface IAdvisorAffinity {
  name: string;
  affinity: number;
}

interface IRelationshipEffects {
  name: string;
  effect: number;
}

export interface IAdvisor {
  name: string;
  cherishes: [ number, number ];
  despises: [ number, number ];
  affinities: IAdvisorAffinity[];
  relationshipEffects: IRelationshipEffects[];
  rebellious: boolean;
  rebellionUtility: number;
}

export const ADVISOR_MAP = new Map<string, IAdvisor>();


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

  // set affinities
  const playerKey = environment.playerCharacterKey;
  const getRandomAffinity = () => (Math.random() * (environment.maxAffinity - environment.minAffinity)) + environment.minAffinity

  advisors.forEach((advisor) => {
    advisor.affinities.push({ name: playerKey, affinity: Math.round(getRandomAffinity()) });
  });

  advisors.forEach((advisor1, idx) => {
    advisors.forEach((advisor2, jdx) => {
      if (idx === jdx) {
        advisor1.affinities.push({ name: advisor1.name, affinity: 0 });
        return;
      }

      const randomAffinity = getRandomAffinity();
      advisor1.affinities.push({ name: advisor2.name, affinity: Math.round(randomAffinity) });
      advisor1.relationshipEffects.push({ name: advisor2.name, effect: calculateRelationshipEffectOnRebellionUtility(advisor1, advisor2 )})
    });
  });

  advisors.forEach(adv => {
    adv.rebellionUtility = calculateRebellionUtility(adv);
    adv.rebellious = determineIfRebellious(adv);
  });

  return advisors;
}

export function determineIfRebellious(advisor: IAdvisor) {
  return advisor.rebellionUtility > 0;
}

export function calculateEmperorOpinion(advisor: IAdvisor) {
  const partnerAffinities = advisor.affinities.filter(aff => aff.name !== advisor.name);

  const pAffinityValue = (partnerAffinities.find(aff => aff.name === environment.playerCharacterKey) as IAdvisorAffinity).affinity;
  const npcAffinities = partnerAffinities.filter(aff => aff.name !== environment.playerCharacterKey) as IAdvisorAffinity[];

  const opinion = (npcAffinities.reduce((tot, aff) => {
    const partnerRelEffect = advisor.relationshipEffects.find(rel => rel.name === aff.name)?.effect || 0;
    return tot + partnerRelEffect;
  }, pAffinityValue));

  return opinion;
}

export function calculateRebellionUtility(advisor: IAdvisor) {
  return -calculateEmperorOpinion(advisor);
}

export function calculateRelationshipEffectOnRebellionUtility(advisor: IAdvisor, partner: IAdvisor) {
  const advisorToPartnerAffinity = advisor.affinities.find(a => a.name === partner.name)?.affinity as number;
  const partnerToPlayerAffinity = partner.affinities.find(a => a.name === environment.playerCharacterKey)?.affinity as number;

  return advisorToPartnerAffinity * partnerToPlayerAffinity;
}

import { environment } from '../../../environments/environment';
import {
  IAdvisor,
  determineIfRebellious,
  calculateRebellionUtility,
  calculateRelationshipEffectOnRebellionUtility
} from './advisors.resource';

import { valueNameToIdx, VALUE_MAP } from '../utilities/values.utility';

export interface IAction {
  name: string;
  description: string;
  promotes: number[];
  harms: number[];
  oppositeActionKey: string;
}

type ActionKey = string;

export enum ActionValueEffects {
  PROMOTE = 'promotes',
  HARM = 'harms'
}

export const actionMap = new Map<ActionKey, IAction>();

const compressedActionData = [{
  name: 'Maintain Barracks',
  oppositeName: 'Repurpose Barracks',
  promote: [ VALUE_MAP.power ],
  description: 'Maintain your military\'s presence in the empire.',
  oppositeDescription: 'Replace the barracks with something that the people can use.',
  harm: [ VALUE_MAP.universalism ],
},  {
  name: 'Authorize Military March',
  oppositeName: 'Prohibit Military March',
  description: "Show off the achievements and grandeur of your army before the peasants.",
  oppositeDescription: "Your subjects don't need to be reminded of what your military is capable of.",
  promote: [ VALUE_MAP.achievement ],
  harm: [ VALUE_MAP.universalism ]
}, {
  name: 'Authorize Festival',
  oppositeName: 'Prohibit Festival',
  description: "Let the people run wild!",
  oppositeDescription: "A festival will attract crowds too large for the guards to handle.",
  promote: [ VALUE_MAP.hedonism ],
  harm: [ VALUE_MAP.security ]
}, {
  name: 'Maintain Art Museum',
  oppositeName: 'Repurpose Art Museum',
  promote: [ VALUE_MAP.stimulation ],
  description: 'Art stimulates the mind.',
  oppositeDescription: 'Art museums give space to rebels and heretics. You cannot have that.',
  harm: [ VALUE_MAP.conformityTradition ],
}, {
  name: 'Pardon Criminal',
  oppositeName: 'Condemn Criminal',
  description: 'Give the criminal one more chance to do right in life.',
  oppositeDescription: 'You have no tolerance for law-breaking in your empire.',
  promote: [ VALUE_MAP.selfDirection ],
  harm: [ VALUE_MAP.conformityTradition ],
}, {
  name: 'Maintain Hospital',
  oppositeName: 'Repurpose Hospital',
  description: 'Even the sick are under your care.',
  oppositeDescription: 'Maintaining this hospital and tending to the sick shows weakness.',
  promote: [ VALUE_MAP.universalism ],
  harm: [ VALUE_MAP.power ],
}, {
  name: 'Open Food Rations',
  oppositeName: 'Restrict Food Rations',
  description: 'Bring mercy to the needy by giving them access to food.',
  oppositeDescription: 'Bringing out rations will attract crowds too large for the guards to handle.',
  promote: [ VALUE_MAP.benevolence ],
  harm: [ VALUE_MAP.security ]
}, {
  name: 'Enforce Mass',
  oppositeName: 'Relax Mass',
  description: 'Remind your subjects who they should pray to.',
  oppositeDescription: 'The faithful will come. The rest may do as they please.',
  promote: [ VALUE_MAP.conformityTradition ],
  harm: [ VALUE_MAP.stimulation ]
}, {
  name: 'Maintain Prison',
  oppositeName: 'Repurpose Prison',
  description: 'Remind would-be troublemakers what their lives can amount to.',
  oppositeDescription: 'The law can be less heavy-handed for a while.',
  promote: [ VALUE_MAP.security ],
  harm: [ VALUE_MAP.selfDirection ]
},];

export function generateActions(): IAction[] {
  const decompressedActions: IAction[] = [];

  compressedActionData.forEach(action => {
    const action1 = {
      name: action.name,
      description: action.description,
      promotes: action.promote.map(val => valueNameToIdx(val)),
      harms: action.harm.map(val => valueNameToIdx(val)),
      oppositeActionKey: action.oppositeName,
    };

    const action2 = {
      name: action.oppositeName,
      description: action.oppositeDescription,
      promotes: action.harm.map(val => valueNameToIdx(val)),
      harms: action.promote.map(val => valueNameToIdx(val)),
      oppositeActionKey: action.name,
    };

    actionMap.set(action1.name, action1);
    actionMap.set(action2.name, action2);

    decompressedActions.push(action1, action2);
  });

  return decompressedActions;
}



export function executeActionEffects(action: IAction, advisorList: IAdvisor[]) {
  const clamp = (value: number, min: number, max: number) => {
    return Math.floor(Math.max(min, Math.min(value, max)));
  }

  const maxAffinity = environment.maxAffinity;
  const minAffinity = environment.minAffinity;

  advisorList.forEach(advisor => {
    const playerAffinityIdx = advisor.affinities.findIndex(aff => aff.name === environment.playerCharacterKey) as number;
    const affinityTowardPlayer =  advisor.affinities[playerAffinityIdx];
    let affinity = affinityTowardPlayer.affinity as number;

    affinity += calculateActionEffect(action, advisor);
    affinity = clamp(affinity, minAffinity, maxAffinity);

    const newAffinity = {
      name: environment.playerCharacterKey,
      affinity,
    }

    advisor.affinities[playerAffinityIdx] = newAffinity;
  });

  advisorList.forEach(advisor => {
    const partners = advisorList.filter(partner => ![advisor.name, environment.playerCharacterKey].includes(partner.name))
    partners.forEach(partner => {
      const relEffectIdx = advisor.relationshipEffects.findIndex(p => p.name === partner.name);
      advisor.relationshipEffects[relEffectIdx].effect = calculateRelationshipEffectOnRebellionUtility(advisor, partner);
    });
  });

  advisorList.forEach(advisor => {
    advisor.rebellionUtility = calculateRebellionUtility(advisor);
    advisor.rebellious = determineIfRebellious(advisor);
  });
}

export function calculateActionEffect(action: IAction, advisor: IAdvisor) {
  const promoteEffect = [...action.promotes].reduce((acc, value) => {
    return acc + determineEffect(ActionValueEffects.PROMOTE, value, advisor);
  }, 0);

  const harmEffect = [...action.harms].reduce((acc, value) => {
    return acc + determineEffect(ActionValueEffects.HARM, value, advisor);
  }, 0);

  return promoteEffect + harmEffect;
}

function determineEffect(actionEffect: ActionValueEffects, valueIdx: number, onAdvisor: IAdvisor): number {
  const cherishesValue = onAdvisor.cherishes.includes(valueIdx);
  const despisesValue = onAdvisor.despises.includes(valueIdx);

  if (!cherishesValue && !despisesValue) {
    return 0;
  }

  if (cherishesValue) {
    return actionEffect === ActionValueEffects.HARM ? -1 : 1;
  } else {
    return actionEffect === ActionValueEffects.PROMOTE ? -1 : 1;
  }
}

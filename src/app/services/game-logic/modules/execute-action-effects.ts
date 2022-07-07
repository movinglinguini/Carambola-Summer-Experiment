import { environment } from './../../../../environments/environment';
import { IAdvisor, determineIfRebellious, calculateRebellionUtility, calculateRelationshipEffectOnRebellionUtility } from 'src/app/functions/generate-advisors';
import { GameResources } from './../resources/resources';
import { IAction, ActionValueEffects } from './../../../functions/generate-actions';

export function executeActionEffects(action: IAction) {
  const clamp = (value: number, min: number, max: number) => {
    return Math.floor(Math.max(min, Math.min(value, max)));
  }

  const maxAffinity = environment.maxAffinity;
  const minAffinity = environment.minAffinity;

  GameResources.advisorList.forEach(advisor => {
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

  GameResources.advisorList.forEach(advisor => {
    const partners = GameResources.advisorList.filter(partner => ![advisor.name, environment.playerCharacterKey].includes(partner.name))
    partners.forEach(partner => {
      const relEffectIdx = advisor.relationshipEffects.findIndex(p => p.name === partner.name);
      advisor.relationshipEffects[relEffectIdx].effect = calculateRelationshipEffectOnRebellionUtility(advisor, partner);
    });
  });

  GameResources.advisorList.forEach(advisor => {
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

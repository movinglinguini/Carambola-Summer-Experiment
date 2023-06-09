import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAdvisor, IAdvisorAffinity } from '../interfaces/advisor.interface';
import { calculateActionEffect, IAction } from '../shared/resources/action.resource';
import { advisorGenerators } from '../advisor-generators/index';
import { BasePropService } from './base-prop.service';

interface IDBAdvisor extends IAdvisor {
  _id?: string;
  _rev?: string;
}

type AdvisorGenerator = (opts?: any) => IAdvisor[];

/** Service that manages advisors, their relationships, affinities, and opinions toward the Emperor. */
@Injectable({
  providedIn: 'root'
})
export class AdvisorService extends BasePropService {

  public advisors: IDBAdvisor[] = [];


  constructor() {
    // async import and call the advisor generator from the given
    // environment file
    super('Advisor');
  }

  /**
   * Generates advisors given the generator in the module at `advisorGeneratorMeta`.
   * @sideeffect Adds the advisors to the `Advisor` database.
   * @returns List of advisors generated by file.
   */
  public async generateAdvisors(): Promise<IDBAdvisor[]> {
    await this.clearTable();
    const generator = await this.loadAdvisorGenerator(environment.advisorGeneratorMeta.name);
    const advisors: IDBAdvisor[] = generator(environment.advisorGeneratorMeta.opts);

    this.initAllAdvisors(advisors);
    // save advisors to the
    await this._db.bulkDocs(advisors);
    this.advisors = advisors;
    return advisors;
  }

  public async isAdvisorRebellious(advisorID: string) {
    const advisor: IDBAdvisor = await this._db.get(advisorID);
    return advisor.rebellious;
  }

  public async makeAllAdvisorsReactToAction(action: IAction) {
    const advisors: IDBAdvisor[] = await this.advisors;

    const playerCharacterKey = environment.advisorGeneratorMeta.opts.playerCharacterKey;
    const maxAffinity = environment.advisorGeneratorMeta.opts.maxAffinity;
    const minAffinity = environment.advisorGeneratorMeta.opts.minAffinity;

    const clamp = (value: number, min: number, max: number) => {
      return Math.floor(Math.max(min, Math.min(value, max)));
    }

    // update every advisor's affinity using actions
    advisors.forEach(adv => {
      const playerAffinityIdx = adv.affinities.findIndex(aff => aff.name === playerCharacterKey) as number;
      const affinityTowardPlayer =  adv.affinities[playerAffinityIdx];
      let affinity = affinityTowardPlayer.affinity as number;

      /** @todo Replace this with a method from an upcoming action service. */
      affinity += calculateActionEffect(action, adv);
      affinity = clamp(affinity, minAffinity, maxAffinity);

      const newAffinity = {
        name: playerCharacterKey,
        affinity,
      }

      adv.affinities[playerAffinityIdx] = newAffinity;
    });

    // update relationship effects
    this.updateAllAdvisorRelationshipEffects(advisors);

    //update relationship utilities
    this.updateAllAdvisorRebellionUtilities(advisors);

    await this._db.bulkDocs(advisors);
    this.advisors = advisors;
  }

  private updateAllAdvisorRelationshipEffects(advisors: IDBAdvisor[]) {
    const playerCharacterKey = environment.advisorGeneratorMeta.opts.playerCharacterKey;
    advisors.forEach(adv => {
      const partners = advisors.filter(partner => ![adv.name, playerCharacterKey].includes(partner.name))
      partners.forEach(partner => {
        const relEffectIdx = adv.relationshipEffects.findIndex(p => p.name === partner.name);
        adv.relationshipEffects[relEffectIdx].effect = this.calculateRelationshipEffectOnRebellionUtility(adv, partner);
      });
    });
  }

  private updateAllAdvisorRebellionUtilities(advisors: IDBAdvisor[]) {
    advisors.forEach(adv => {
      adv.rebellionUtility = this.calculateRebellionUtility(adv);
      adv.rebellious = this.determineIfRebellious(adv);
    });
  }

  private determineIfRebellious(advisor: IDBAdvisor) {
    return advisor.rebellionUtility > 0;
  }

  /**
   * Calculates this advisor's opinion on the emperor after considering
   * their relationship with the other advisors.
   * @param advisor
   * @returns
   */
  private calculateEmperorOpinion(advisor: IDBAdvisor): number {
    const playerCharacterKey: string = environment.advisorGeneratorMeta.opts.playerCharacterKey;

    const partnerAffinities = advisor.affinities.filter(aff => aff.name !== advisor.name);

    const pAffinityValue = (partnerAffinities.find(aff => aff.name === playerCharacterKey) as IAdvisorAffinity).affinity;
    const npcAffinities = partnerAffinities.filter(aff => aff.name !== environment.playerCharacterKey) as IAdvisorAffinity[];

    const opinion = (npcAffinities.reduce((tot, aff) => {
      const partnerRelEffect = advisor.relationshipEffects.find(rel => rel.name === aff.name)?.effect || 0;
      return tot + partnerRelEffect;
    }, pAffinityValue));

    return opinion;
  }

  private calculateRelationshipEffectOnRebellionUtility(advisor: IDBAdvisor, partner: IDBAdvisor) {
    const playerCharacterKey = environment.advisorGeneratorMeta.opts.playerCharacterKey;
    const advisorToPartnerAffinity = advisor.affinities.find(a => a.name === partner.name)?.affinity as number;
    const partnerToPlayerAffinity = partner.affinities.find(a => a.name === playerCharacterKey)?.affinity as number;

    return advisorToPartnerAffinity * partnerToPlayerAffinity;
  }

  private calculateRebellionUtility(advisor: IDBAdvisor) {
    return -this.calculateEmperorOpinion(advisor);
  }

  private initAllAdvisors(advisors: IDBAdvisor[]) {
    const playerKey = environment.advisorGeneratorMeta.opts.playerCharacterKey;
    const getRandomAffinity = () => (Math.random() * (environment.maxAffinity - environment.minAffinity)) + environment.minAffinity

    advisors.forEach((advisor) => {
      const initAffinity = environment.advisorGeneratorMeta.opts.initialAffinityTowardPlayer;
      const playerAffinity =  ((Boolean(initAffinity) || initAffinity === 0) ? initAffinity : Math.round(getRandomAffinity())) as number;
      advisor.affinities.push({ name: playerKey, affinity: playerAffinity });
    });

    advisors.forEach((advisor1, idx) => {
      advisors.forEach((advisor2, jdx) => {
        if (idx === jdx) {
          advisor1.affinities.push({ name: advisor1.name, affinity: 0 });
          return;
        }

        const randomAffinity = getRandomAffinity();
        advisor1.affinities.push({ name: advisor2.name, affinity: Math.round(randomAffinity) });
        advisor1.relationshipEffects.push({ name: advisor2.name, effect: this.calculateRelationshipEffectOnRebellionUtility(advisor1, advisor2 )})
      });
    });

    advisors.forEach(adv => {
      adv.rebellionUtility = this.calculateRebellionUtility(adv);
      adv.rebellious = this.determineIfRebellious(adv);
    });
  }

  /**
   * Given `advisorGeneratorMeta`, import the function that generates the advisors.
   * @param advisorGeneratorMeta
   */
  private async loadAdvisorGenerator(advisorGeneratorName: string): Promise<AdvisorGenerator> {
    return advisorGenerators.get(advisorGeneratorName) as AdvisorGenerator;
  }
}

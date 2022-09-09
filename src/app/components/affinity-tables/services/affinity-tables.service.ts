import { selectRandom } from '../../../shared/random.utility';
import { environment } from './../../../../environments/environment.prod';
import { calculateEmperorOpinion, IAdvisor, calculateRebellionUtility } from '../../../functions/generate-advisors';
import { Injectable } from '@angular/core';

export interface IAffinityTableData {
  affinity: Map<string, string>;
  rawAffinity: Map<string, number>;
  relationshipEffect: Map<string, string>;
  rawRelationshipEffect: Map<string, number>;
  rebellious: Map<string, boolean>;
  rawRebelliousness: Map<string, number>;
}

@Injectable({
  providedIn: 'root'
})
export class AffinityTablesService {
  private _affTableData = new Map<string, IAffinityTableData>();

  static genTableKey(advisor: string, roundNo: number) {
    return `${advisor}.${roundNo}`;
  }

  static genPartnerKey(advisor: string, partner: string, roundNo: number) {
    return `${advisor}.${partner}.${roundNo}`;
  }

  constructor() { }

  hasTableData(advisor: string, roundNo: number) {
    return Boolean(this.retrieveTable(advisor, roundNo));
  }

  generateAffinityDisplayData(advisor: IAdvisor, roundNo: number)  {
    if (this.hasTableData(advisor.name, roundNo)) {
      return this.retrieveTable(advisor.name, roundNo);
    }

    const advisorAffinities = advisor.affinities.filter(aff => aff.name !== environment.playerCharacterKey);
    const affinityTowardPlayer = advisor.affinities
      .find(aff => aff.name === environment.playerCharacterKey)?.affinity as number;

    const newTableDatum: IAffinityTableData = {
      affinity: new Map<string, string>(),
      rawAffinity: new Map<string, number>(),
      relationshipEffect: new Map<string, string>(),
      rawRelationshipEffect: new Map<string, number>(),
      rebellious: new Map<string, boolean>(),
      rawRebelliousness: new Map<string, number>()
    };

    const playerKey = AffinityTablesService.genPartnerKey(advisor.name, environment.playerCharacterKey, roundNo);
    newTableDatum.rawAffinity.set(playerKey, affinityTowardPlayer);
    newTableDatum.affinity.set(playerKey, this.getAffinityVerb(affinityTowardPlayer));

    advisorAffinities?.forEach(affData => {
      const isPlayer = affData.name === environment.playerCharacterKey;
      const key = AffinityTablesService.genPartnerKey(advisor.name, affData.name, roundNo);

      const affString = (
        isPlayer
          ? this.getAffinityVerb(affData.affinity)
          : this.getAffinityNoun(affData.affinity)
      );

      newTableDatum.affinity.set(key, affString);
      newTableDatum.rawAffinity.set(key, affData.affinity);

      const relEffect = advisor.relationshipEffects.find(relEff => relEff.name === affData.name)?.effect as number;
      newTableDatum.rawRelationshipEffect.set(key, relEffect);
      newTableDatum.relationshipEffect.set(key, this.getAffinityEffectString(affinityTowardPlayer, relEffect));
    });

    newTableDatum.rebellious.set(advisor.name, advisor.rebellious);
    newTableDatum.rawRebelliousness.set(advisor.name, calculateRebellionUtility(advisor));

    const tableKey = AffinityTablesService.genTableKey(advisor.name, roundNo);
    this._affTableData.set(tableKey, newTableDatum);
    return newTableDatum;
  }

  getAffinityData(advisor: string, partner: string, roundNo: number) {
    const key = AffinityTablesService.genPartnerKey(advisor, partner, roundNo);
    return this.retrieveTable(advisor, roundNo)?.affinity.get(key);
  }

  getRawAffinity(advisor: string, partner: string, roundNo: number) {
    const key = AffinityTablesService.genPartnerKey(advisor, partner, roundNo);
    return this.retrieveTable(advisor, roundNo)?.rawAffinity.get(key);
  }

  getRelEffectData(advisor: string, partner: string, roundNo: number) {
    const key = AffinityTablesService.genPartnerKey(advisor, partner, roundNo);
    return this.retrieveTable(advisor, roundNo)?.relationshipEffect.get(key);
  }

  getRawRelEffectData(advisor: string, partner: string, roundNo: number) {
    const key = AffinityTablesService.genPartnerKey(advisor, partner, roundNo);
    return this.retrieveTable(advisor, roundNo)?.rawRelationshipEffect.get(key);
  }

  getIfRebellious(advisor: string, roundNo: number) {
    return this.retrieveTable(advisor, roundNo)?.rebellious.get(advisor);
  }

  getRawRebelliousness(advisor: string, roundNo: number) {
    return this.retrieveTable(advisor, roundNo)?.rawRebelliousness.get(advisor);
  }

  private retrieveTable(advisor: string, roundNo: number) {
    const tableKey = AffinityTablesService.genTableKey(advisor, roundNo);
    return this._affTableData.get(tableKey);
  }

  private getAffinityVerb(aff: number) {
    const possibleStrings = [];

    if (aff < -3) {
      possibleStrings.push('hates', 'despises');
    } else if (aff < 0) {
      possibleStrings.push('dislikes', 'distrusts');
    } else if (aff === 0) {
      possibleStrings.push('is uncertain about');
    } else if (aff < 3) {
      possibleStrings.push('trusts', 'approves of');
    } else if (aff <= 5) {
      possibleStrings.push('adores', 'reveres');
    }

    return selectRandom(possibleStrings);
  };

  private getAffinityNoun(aff: number) {
    const possibleStrings = [];

    if (aff < -3) {
      possibleStrings.push('hatred for', 'disgust of');
    } else if (aff < 0) {
      possibleStrings.push('distrust of', 'misgivings of');
    } else if (aff == 0) {
      possibleStrings.push('ambivalence toward');
    } else if (aff < 3) {
      possibleStrings.push('confidence in', 'respect for');
    } else {
      possibleStrings.push('adoration of', 'deference for');
    }

    return selectRandom(possibleStrings);
  };

  private getAffinityEffectString(originalOpinion: number, effect: number) {
    const possibleStrings = [];
    const postEffect = originalOpinion + effect;

    if (originalOpinion < 0) {
      if (postEffect < originalOpinion) {
        possibleStrings.push('worsens their opinion.')
      } else if (postEffect > originalOpinion) {
        possibleStrings.push('improves their opinion.')
      } else {
        possibleStrings.push('makes no effect.');
      }
    } else if (originalOpinion > 0) {
      if (postEffect > originalOpinion) {
        possibleStrings.push('strengthens their opinion.');
      } else if (postEffect < originalOpinion) {
        possibleStrings.push('sours their opinion.')
      } else {
        possibleStrings.push('makes no effect.')
      }
    } else {
      if (postEffect > 0) {
        possibleStrings.push('nudges them toward a positive opinion.');
      } else if (postEffect < 0) {
        possibleStrings.push('nudges them toward a negative opinion.');
      } else {
        possibleStrings.push('makes no effect.');
      }
    }

    return selectRandom(possibleStrings);
  };
}

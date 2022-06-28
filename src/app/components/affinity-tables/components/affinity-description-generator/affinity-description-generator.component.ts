import { environment } from './../../../../../environments/environment.prod';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { IAdvisor, ADVISOR_MAP, calculateRelationshipEffectOnRebellionUtility } from './../../../../functions/generate-advisors';
import { Component, Input, OnInit } from '@angular/core';
import { selectRandom } from 'src/app/shared/random.utility';

type CharacterKey = string;

@Component({
  selector: 'app-affinity-description-generator',
  templateUrl: './affinity-description-generator.component.html',
  styleUrls: ['./affinity-description-generator.component.scss']
})
export class AffinityDescriptionGeneratorComponent implements OnInit {
  static genRelationshipKey(advisor1: IAdvisor, advisor2: IAdvisor) {
    return `${advisor1.name}.${advisor2.name}`;
  }

  @Input('advisor') inAdvisor: IAdvisor;

  public affStringMap = new Map<CharacterKey, string>();
  public relEffectStringMap = new Map<CharacterKey, string>();

  get otherAdvisorNames(): CharacterKey[] {
    const isNotPlayer = ((key: CharacterKey) => key !== this.playerKey);
    const isNotSelf = ((key: CharacterKey) => key !== this.inAdvisor.name);

    const otherNames = Array.from(this.affStringMap.keys()).filter(n => {
      return isNotPlayer(n) && isNotSelf(n);
    });
    return otherNames;
  }

  get playerKey(): CharacterKey {
    return environment.playerCharacterKey;
  }

  private _rawAffMap = new Map<CharacterKey, number>();
  private _rawRelEffectMap = new Map<string, number>();

  constructor(
    private _gameLogic: GameLogicService
  ) { }

  ngOnInit(): void {
    // on each round, update this advisor's affinities
    this._gameLogic.$onNextRound.subscribe(() => {
      this.updateAffinityDescription();
    });

    this.updateAffinityDescription();
  }

  getAffinityTowards(key: CharacterKey) {
    return this.affStringMap.get(key);
  }

  getAffinityPolarityTowards(key: CharacterKey) {
    const affinity = this._rawAffMap.get(key) || 0;

    if (affinity < 0) {
      return 'negative';
    } else if (affinity > 0) {
      return 'positive';
    }

    return '';
  }

  getEffectOnOpinion(advisor: CharacterKey, partner: CharacterKey) {
    return this.relEffectStringMap.get(
      `${advisor}.${partner}`
    )
  }

  getEffectOnOpinionPolarity(advisor: CharacterKey, partner: CharacterKey) {
    const effect = this._rawRelEffectMap.get(`${advisor}.${partner}`) || 0;

    if (effect < 0) {
      return 'negative';
    } else if (effect > 0) {
      return 'positive';
    }

    return '';
  }

  private updateAffinityDescription() {
    const advisorAffinities = this.inAdvisor.affinities;
    const affinityTowardPlayer = this.inAdvisor.affinities
      .find(aff => aff.name === this.playerKey)?.affinity as number;

    advisorAffinities?.forEach(affData => {
      const isPlayer = affData.name === this.playerKey;

      this._rawAffMap.set(affData.name, affData.affinity);

      const affString = (
        isPlayer
          ? this.getAffinityVerb(affData.affinity)
          : this.getAffinityNoun(affData.affinity)
      );

      this.affStringMap.set(affData.name, affString);

      if (!isPlayer) {
        const partnerData = ADVISOR_MAP.get(affData.name) as IAdvisor;
        const relEffect = calculateRelationshipEffectOnRebellionUtility(this.inAdvisor, partnerData);

        this._rawRelEffectMap.set(
          AffinityDescriptionGeneratorComponent.genRelationshipKey(this.inAdvisor, partnerData),
          relEffect
        );

        this.relEffectStringMap.set(
          AffinityDescriptionGeneratorComponent.genRelationshipKey(this.inAdvisor, partnerData),
          this.getAffinityEffect(affinityTowardPlayer, relEffect)
        )
      }
    });
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

  private getAffinityEffect(originalOpinion: number, effect: number) {
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

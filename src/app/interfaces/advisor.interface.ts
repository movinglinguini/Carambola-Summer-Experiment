export interface IAdvisorAffinity {
  name: string;
  affinity: number;
}

export interface IRelationshipEffects {
  name: string;
  effect: number;
}

export interface IAdvisor {
  name: string;
  cherishes: number[];
  despises: number[];
  affinities: IAdvisorAffinity[];
  relationshipEffects: IRelationshipEffects[];
  rebellious: boolean;
  rebellionUtility: number;
}

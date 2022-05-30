import { valueNameToIdx, VALUE_MAP } from '../shared/values.utility';

export interface IAction {
  name: string;
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
  harm: [ VALUE_MAP.universalism ],
}, {
  name: 'Maintain Art Museum',
  oppositeName: 'Repurpose Art Museum',
  promote: [ VALUE_MAP.stimulation ],
  harm: [ VALUE_MAP.conformity ],
}, {
  name: 'Maintain Hospital',
  oppositeName: 'Repurpose Hospital',
  promote: [ VALUE_MAP.universalism ],
  harm: [ VALUE_MAP.power ],
}, {
  name: 'Maintain Prison',
  oppositeName: 'Repurpose Prison',
  promote: [ VALUE_MAP.security ],
  harm: [ VALUE_MAP.selfDirection ]
}, {
  name: 'Authorize Festival',
  oppositeName: 'Prohibit Festival',
  promote: [ VALUE_MAP.hedonism ],
  harm: [ VALUE_MAP.security ]
}, {
  name: 'Enforce Mass',
  oppositeName: 'Relax Mass',
  promote: [ VALUE_MAP.tradition ],
  harm: [ VALUE_MAP.selfDirection ]
}, {
  name: 'Authorize Military March',
  oppositeName: 'Prohibit Military March',
  promote: [ VALUE_MAP.achievement ],
  harm: [ VALUE_MAP.universalism ]
}, {
  name: 'Condemn Criminal',
  oppositeName: 'Pardon Criminal',
  promote: [ VALUE_MAP.selfDirection ],
  harm: [ VALUE_MAP.universalism ],
}, {
  name: 'Release Patient',
  oppositeName: 'Detain Patient',
  promote: [ VALUE_MAP.benevolence ],
  harm: [ VALUE_MAP.security ]
}];

export function generateActions(): IAction[] {
  const decompressedActions: IAction[] = [];

  compressedActionData.forEach(action => {
    const action1 = {
      name: action.name,
      promotes: action.promote.map(val => valueNameToIdx(val)),
      harms: action.harm.map(val => valueNameToIdx(val)),
      oppositeActionKey: action.oppositeName,
    };

    const action2 = {
      name: action.oppositeName,
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

import { valueNameToIdx, VALUE_MAP } from '../shared/values.utility';

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
  description: '',
  oppositeDescription: '',
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
  oppositeDescription: "A festival is too much of a risk for security.",
  promote: [ VALUE_MAP.hedonism ],
  harm: [ VALUE_MAP.security ]
}, {
  name: 'Maintain Art Museum',
  oppositeName: 'Repurpose Art Museum',
  promote: [ VALUE_MAP.stimulation ],
  description: '',
  oppositeDescription: '',
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
  description: '',
  oppositeDescription: '',
  promote: [ VALUE_MAP.universalism ],
  harm: [ VALUE_MAP.power ],
}, {
  name: 'Open Food Rations',
  oppositeName: 'Restrict Food Rations',
  description: 'Bring mercy to the needy by giving them access to food.',
  oppositeDescription: '',
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
  description: '',
  oppositeDescription: '',
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

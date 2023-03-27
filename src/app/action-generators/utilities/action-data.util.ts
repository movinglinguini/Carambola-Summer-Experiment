import { VALUE_MAP } from './../../shared/utilities/values.utility';

export const compressedActionData = [{
  name: 'Use Materials for Weapon Manufacturing',
  oppositeName: 'Use Materials for Public Works',
  promote: [ VALUE_MAP.power ],
  description: 'Funnel raw resources into extra offensive power for your military.',
  oppositeDescription: 'Use raw resources to build structures for public use.',
  harm: [ VALUE_MAP.universalism ],
}, {
  name: 'Hold Parade of Victories',
  oppositeName: 'Delay Parade of Victories',
  description: "Show off the achievements and grandeur of your nation before your peasants and the world.",
  oppositeDescription: "Wait a bit longer before you show off your achievements.",
  promote: [ VALUE_MAP.achievement ],
  harm: []
}, {
  name: 'Hold a Festival for the God of Pleasure',
  oppositeName: 'Prohibit Festival for the God of Pleasure',
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
  harm: [],
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

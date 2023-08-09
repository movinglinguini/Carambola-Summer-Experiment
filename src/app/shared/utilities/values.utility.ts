export const VALUE_LIST = [ 'power', 'achievement', 'hedonism', 'stimulation', 'self-direction', 'universalism', 'benevolence', 'tradition', 'security' ];
export const VALUE_MAP = {
  power: 'power',
  security: 'security',
  tradition: 'tradition',
  benevolence: 'benevolence',
  universalism: 'universalism',
  selfDirection: 'self-direction',
  stimulation: 'stimulation',
  hedonism: 'hedonism',
  achievement: 'achievement',
};
export const VALUE_DESCRIPTION: { [key: string]: string } = {
  power: 'Social status and prestige, control or dominance over people and resources.',
  security: 'Safety, harmony, and stability of society, of relationships, and of self.',
  tradition: 'Respect, commitment, and acceptance of the customs and ideas that one\'s culture or religion provides.',
  benevolence: 'Preserving and enhancing the welfare of those with whom one is in frequent personal contact.',
  universalism: 'Understanding, appreciation, tolerance, and protection for the welfare of all people and for nature.',
  'self-direction': 'Independent thought and action--choosing, creating, exploring.',
  stimulation: 'Excitement, novelty, and challenge in life.',
  hedonism: 'Pleasure or sensuous gratification for oneself.',
  achievement: 'Personal success through demonstrating competence according to social standards.',
};

export enum ValueAttitudeKeys {
  CHERISH = 'cherishes',
  DESPISE = 'despises'
}

export function valueNameToIdx(valueName: string) {
  return VALUE_LIST.indexOf(valueName);
}

export function getOpposingValue(valueIdx: number, valueList: string[] = VALUE_LIST) {
  const newValueIdx = Math.round(valueIdx + valueList.length * 0.5);

  if (newValueIdx < 0) {
    return newValueIdx + valueList.length;
  }

  if (newValueIdx >= valueList.length) {
    return newValueIdx - valueList.length;
  }

  return newValueIdx;
}

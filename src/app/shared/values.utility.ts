export const VALUE_LIST = [ 'power', 'achievement', 'hedonism', 'stimulation', 'self-direction', 'universalism', 'benevolence', 'conformity', 'tradition', 'security' ];
export const VALUE_MAP = {
  power: 'power',
  security: 'security',
  conformity: 'conformity',
  tradition: 'tradition',
  benevolence: 'benevolence',
  universalism: 'universalism',
  selfDirection: 'self-direction',
  stimulation: 'stimulation',
  hedonism: 'hedonism',
  achievement: 'achievement',
};

export enum ValueAttitudeKeys {
  CHERISH = 'cherishes',
  DESPISE = 'despises'
}

export function valueNameToIdx(valueName: string) {
  return VALUE_LIST.indexOf(valueName);
}

export function getOpposingValue(valueIdx: number) {
  const newValueIdx = Math.round(valueIdx + VALUE_LIST.length * 0.5);

  if (newValueIdx < 0) {
    return newValueIdx + VALUE_LIST.length;
  }

  if (newValueIdx >= VALUE_LIST.length) {
    return newValueIdx - VALUE_LIST.length;
  }

  return newValueIdx;
}

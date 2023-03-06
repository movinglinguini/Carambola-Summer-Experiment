export const VALUE_LIST = [ 'power', 'achievement', 'hedonism', 'stimulation', 'self-direction', 'universalism', 'benevolence', 'conformity-tradition', 'security' ];
export const VALUE_MAP = {
  power: 'power',
  security: 'security',
  conformityTradition: 'conformity-tradition',
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

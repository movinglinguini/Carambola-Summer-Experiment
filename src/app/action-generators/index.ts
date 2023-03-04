import { IAction } from '../interfaces/action.interface';
import { generateActions as defaultGenerator } from './default-generator.function';

export const ActionGenerators = new Map<string, (opts?: any) => IAction[]>([
  ['defaultGenerator', defaultGenerator]
]);

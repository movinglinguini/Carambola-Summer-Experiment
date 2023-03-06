import { IEmptyDecisionEvent } from '../interfaces/decision-event.interface';
import { generateDecisionEvent as defaultGenerator } from './default-generator.function';

export const DecisionEventGenerators = new Map<string, ((opts?: any) => IEmptyDecisionEvent)>([
  ['defaultGenerator', defaultGenerator ]
]);

import { compressedActionData } from './utilities/action-data.util';
import { valueNameToIdx } from './../shared/utilities/values.utility';
import { IAction } from "../interfaces/action.interface";

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

    decompressedActions.push(action1, action2);
  });

  return decompressedActions;
}

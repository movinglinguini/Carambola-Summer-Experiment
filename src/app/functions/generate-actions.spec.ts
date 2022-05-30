import { generateActions, IAction, actionMap } from './generate-actions';

describe('Game Actions', () => {
  let actionList: IAction[] = [];

  beforeEach(() => {
    actionList = generateActions();
  });

  it('should have an opposite action for every action', () => {
    const testCase = actionList.every(action => {
      const hasOppositeKey = Boolean(action.oppositeActionKey);
      const oppositeIsInList = actionMap.has(action.oppositeActionKey);

      return hasOppositeKey && oppositeIsInList;
    });

    return expect(testCase).toBeTrue();
  });
});

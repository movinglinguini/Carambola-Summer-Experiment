import { IAction } from './../../../shared/resources/action.resource';
import { IAdvisor } from './../../../shared/resources/advisors.resource';

interface IGameResources {
  advisorList: IAdvisor[];
  actionList: IAction[];
}

export const GameResources: IGameResources = {
  advisorList: [],
  actionList: [],
}

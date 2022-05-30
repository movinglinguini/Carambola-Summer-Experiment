import { IAction } from './../../../functions/generate-actions';
import { IAdvisor } from './../../../functions/generate-advisors';

interface IGameResources {
  advisorList: IAdvisor[];
  actionList: IAction[];
}

export const GameResources: IGameResources = {
  advisorList: [],
  actionList: [],
}

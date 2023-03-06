import { IAdvisor } from 'src/app/interfaces/advisor.interface';
import { IAction } from './../../../shared/resources/action.resource';

interface IGameResources {
  advisorList: IAdvisor[];
  actionList: IAction[];
}

export const GameResources: IGameResources = {
  advisorList: [],
  actionList: [],
}

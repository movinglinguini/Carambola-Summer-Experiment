import { TimelineService } from './../../../services/timeline.service';
import { Injectable } from '@angular/core';
import { IAdvisor } from 'src/app/interfaces/advisor.interface';
import { IAction } from 'src/app/shared/resources/action.resource';

interface IActionMemoryUnit {
  advisor: IAdvisor;
  action: IAction;
  reaction: number;
}

/** Simple service for tracking the reactions that players have seen.
*/
@Injectable({
  providedIn: 'root'
})
export class ReactionMemoryService {
  private _actionsToReactions = new Map<string, IActionMemoryUnit[]>();

  constructor(
    private _timelineService: TimelineService,
  ) {
    // Before the next round, save reactions to the chosen action.
    this._timelineService.$addReactions.subscribe((event) => {
      const newMemoryUnits = event.reactions.map(r => {
        return ({
          advisor: r.advisor,
          reaction: r.reaction,
          action: event.chosenAction as IAction,
        });
      });

      this._actionsToReactions.set((event.chosenAction as IAction).name, newMemoryUnits);
    });
  }

  public hasReactionsToAction(action: IAction): boolean {
    return this._actionsToReactions.has(action.name);
  }

  public getReactionsToAction(action: IAction): IActionMemoryUnit[] | null {
    return this._actionsToReactions.get(action.name) ||  null;
  }
}

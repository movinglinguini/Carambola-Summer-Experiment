import { Injectable } from '@angular/core';
import { GameLogicService } from 'src/app/services/game-logic/game-logic.service';
import { IAction } from 'src/app/shared/resources/action.resource';
import { IAdvisor } from 'src/app/shared/resources/advisors.resource';

interface IActionMemoryUnit {
  advisor: IAdvisor;
  action: IAction;
  reaction: number;
}

/** Simple service for tracking the reactions that players have seen. */
@Injectable({
  providedIn: 'root'
})
export class ReactionMemoryService {
  private _actionsToReactions = new Map<string, IActionMemoryUnit[]>();

  constructor(
    private _gameLogicService: GameLogicService
  ) {
    // Before the next round, save reactions to the chosen action.
    this._gameLogicService.$beforeNextRound.subscribe((roundData) => {
      const newMemoryUnits = roundData.reactions.map(r => {
        return ({
          advisor: r.advisor,
          reaction: r.reaction,
          action: roundData.chosenAction,
        });
      });
      
      this._actionsToReactions.set(roundData.chosenAction.name, newMemoryUnits);
    });
  }

  public getReactionsToAction(action: IAction): IActionMemoryUnit[] | null {
    return this._actionsToReactions.get(action.name) ||  null;
  }
}

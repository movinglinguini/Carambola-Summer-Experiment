import { Injectable } from '@angular/core';
import { GameLogicService } from './game-logic/game-logic.service';
import { AdvisorService } from './advisor.service';
import { ActionService } from './action.service';

const playthroughKey = 'experiment_playthrough_no';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  static playthroughNo: number;

  private _mongoEndpoint = 'https://us-east-1.aws.data.mongodb-api.com/app/datastore-adksl/endpoint'

  constructor(
    private _gameLogicService: GameLogicService,
    private _advisorService: AdvisorService,
    private _actionService: ActionService,
  ) {
    if (!localStorage.getItem(playthroughKey)) {
      localStorage.setItem(playthroughKey, '1');
    }
  
    ExperimentService.playthroughNo = parseInt(localStorage.getItem(playthroughKey) as string, 10);

    this._gameLogicService.$onNextRound.subscribe((async () => {
      try {
        await this.saveRound();
      } catch (err) {}
    }));

    this._gameLogicService.$onGameOver.subscribe((async () => {
      try {
        await this.savePlaythrough();
      } catch (err) {}
      finally {
        this.incrementPlaythroughNo();
      }
    }));
  }

  private incrementPlaythroughNo(): void {
    const pNo = ExperimentService.playthroughNo;
    localStorage.setItem(playthroughKey, `${(pNo % 3) + 1}`);
  }

  private async saveRound(): Promise<void> {
    const route = '/createRound';
    const advisors = this._advisorService.advisors;
    const decisionEvent = this._gameLogicService.getDecisionEventAtRound(this._gameLogicService.round - 1);
    fetch(`${this._mongoEndpoint}${route}`, {
      method: 'post',
      body: JSON.stringify({
        userCode: parseInt(localStorage.getItem('user-code') as string),
        playthroughNo: ExperimentService.playthroughNo,
        score: -advisors.reduce((tot, adv) => tot + adv.rebellionUtility, 0),
        decisionEvent,
      })
    });
  }

  private async savePlaythrough(): Promise<void> {
    const advisors = this._advisorService.advisors;
    const actions = await this._actionService.getAllActions();
    const createPlaythroughRoute = '/createPlaythrough';
    fetch(`${this._mongoEndpoint}${createPlaythroughRoute}`, {
      method: 'post',
      body: JSON.stringify({
        userCode: parseInt(localStorage.getItem('user-code') as string),
        playthroughNo: ExperimentService.playthroughNo,
        score: -advisors.reduce((tot, adv) => tot + adv.rebellionUtility, 0),
        actions,
        advisors,
      })
    })
  }
}

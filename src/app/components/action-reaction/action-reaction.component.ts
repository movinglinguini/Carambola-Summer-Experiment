import { IAction } from './../../shared/resources/action.resource';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, Input, OnInit } from '@angular/core';
import { IAdvisor } from 'src/app/interfaces/advisor.interface';

@Component({
  selector: 'app-action-reaction',
  templateUrl: './action-reaction.component.html',
  styleUrls: ['./action-reaction.component.scss']
})
export class ActionReactionComponent implements OnInit {
  @Input('roundNo') inRoundNo: number;
  public chosenAction: IAction;

  public advisors: IAdvisor[] = [];

  constructor(
    private _gameLogicService: GameLogicService
  ) { }

  async ngOnInit(): Promise<void> {
    this.advisors = await this._gameLogicService.advisors;
    this.chosenAction = this._gameLogicService.getDecisionEventAtRound(this.inRoundNo).chosenAction as IAction;
  }

}

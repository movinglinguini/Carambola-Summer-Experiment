import { IAdvisor } from '../../shared/resources/advisors.resource-dep';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-reaction',
  templateUrl: './action-reaction.component.html',
  styleUrls: ['./action-reaction.component.scss']
})
export class ActionReactionComponent implements OnInit {
  @Input('roundNo') inRoundNo: number;

  public advisors: IAdvisor[] = [];

  constructor(
    private _gameLogicService: GameLogicService
  ) { }

  async ngOnInit(): Promise<void> {
    this.advisors = await this._gameLogicService.advisors;
  }

}

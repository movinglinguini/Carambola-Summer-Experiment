import { IAdvisor } from './../../shared/resources/advisors.resource';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-reaction',
  templateUrl: './action-reaction.component.html',
  styleUrls: ['./action-reaction.component.scss']
})
export class ActionReactionComponent implements OnInit {
  @Input('roundNo') inRoundNo: number;

  get advisors(): IAdvisor[] {
    return this._gameLogicService.advisors;
  }

  constructor(
    private _gameLogicService: GameLogicService
  ) { }

  ngOnInit(): void {
  }

}

import { actionMap } from './../../functions/generate-actions';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { IDecisionEvent } from './../../services/game-logic/modules/generate-decision-event';
import { LoggerService } from './../../services/logger/logger.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-action',
  templateUrl: './selected-action.component.html',
  styleUrls: ['./selected-action.component.scss']
})
export class SelectedActionComponent implements OnInit {
  @Input('roundNo') inRoundNo: number;

  public decisionEvent: IDecisionEvent;

  get chosenActionText(): string {
    return this.decisionEvent.chosenAction?.name as string;
  }

  get alternativeActionText(): string {
    const chosenAction = this.decisionEvent.chosenAction;
    const alternative = actionMap.get(chosenAction?.oppositeActionKey as string);

    return alternative?.name as string;
  }

  constructor(
    private _gameLogicService: GameLogicService,
  ) { }

  ngOnInit(): void {
    this.decisionEvent = this._gameLogicService.getDecisionEventAtRound(this.inRoundNo);
  }

}

import { IAction } from './../../shared/resources/action.resource';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { IDecisionEvent } from './../../services/game-logic/modules/generate-decision-event';
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
    const chosenAction = this.decisionEvent.chosenAction as IAction;
    const alternative = this.decisionEvent.alternatives.find(actions => actions.name !== chosenAction.name);

    return alternative?.name as string;
  }

  constructor(
    private _gameLogicService: GameLogicService,
  ) { }

  ngOnInit(): void {
    this.decisionEvent = this._gameLogicService.getDecisionEventAtRound(this.inRoundNo);
  }

}

import { VALUE_LIST } from './../../shared/values.utility';
import { IAction } from './../../functions/generate-actions';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-action-selection',
  templateUrl: './action-selection.component.html',
  styleUrls: ['./action-selection.component.scss']
})
export class ActionSelectionComponent{

  get currentDecisionEvent() {
    return this._gameLogic.currentDecisionEvent;
  }

  constructor(
    private _gameLogic: GameLogicService,
  ) { }

  onChooseAction(action: IAction) {
    this._gameLogic.onChooseAction(action);
  }

  getValueText(value: number): string {
    return VALUE_LIST[value];
  }
}

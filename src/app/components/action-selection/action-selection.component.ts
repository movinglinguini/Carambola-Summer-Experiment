import { VALUE_LIST } from './../../shared/utilities/values.utility';
import { IAction } from './../../shared/resources/action.resource';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, Input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ReactionMemoryService } from './services/reaction-memory.service';
import { InteractionTrackerService } from 'src/app/services/interaction-tracker.service';

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
    private _reactionMemoryService: ReactionMemoryService,
    private _interactionTrackingService: InteractionTrackerService,
  ) { }

  onChooseAction(action: IAction) {
    this._gameLogic.onChooseAction(action);
  }

  getValueText(value: number): string {
    return VALUE_LIST[value];
  }

  openActionTooltip(tooltip: NgbTooltip, action: IAction) {
    tooltip.open({ action });
    this._interactionTrackingService.$trackOnHoverAction.emit({ action, event: 'enter' });
  }

  closeActionTooltip(tooltip: NgbTooltip) {
    tooltip.close();
  }

  getReactionsToAction(action: IAction) {
    this._interactionTrackingService.$trackOnHoverAction.emit({ action, event: 'leave' });
    return this._reactionMemoryService.getReactionsToAction(action);
  }
}

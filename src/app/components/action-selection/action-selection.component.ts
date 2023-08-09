import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { VALUE_DESCRIPTION, VALUE_LIST } from './../../shared/utilities/values.utility';
import { IAction } from './../../shared/resources/action.resource';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, Input } from '@angular/core';
import { ReactionMemoryService } from './services/reaction-memory.service';
import { InteractionTrackerService } from 'src/app/services/interaction-tracker.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-action-selection',
  templateUrl: './action-selection.component.html',
  styleUrls: ['./action-selection.component.scss']
})
export class ActionSelectionComponent{
  get currentDecisionEvent() {
    return this._gameLogic.currentDecisionEvent;
  }

  get showActionDescriptions() {
    return environment.showActionDescriptions;
  }

  get showActionValues() {
    return environment.showActionValues;
  }

  get showActionPromotes() {
    return environment.showActionPromotes;
  }

  get showActionHarms() {
    return environment.showActionHarms;
  }

  constructor(
    private _gameLogic: GameLogicService,
    private _reactionMemoryService: ReactionMemoryService,
    private _interactionTrackingService: InteractionTrackerService,
  ) { }

  onChooseAction(action: IAction) {
    this._gameLogic.onChooseAction(action);
  }

  getValueText(valueIdx: number): string {
    return VALUE_LIST[valueIdx];
  }

  getValueDescription(valueIdx: number): string {
    return VALUE_DESCRIPTION[this.getValueText(valueIdx)];
  }

  onMouseOverAction(tooltip: NgbTooltip, action: IAction) {
    this._interactionTrackingService.$trackOnHoverAction.emit({ action, event: 'enter' });

    if (environment.showActionTooltips) {
      tooltip.open({ action });
    }
  }

  onMouseLeaveAction(tooltip: NgbTooltip, action: IAction) {
    this._interactionTrackingService.$trackOnHoverAction.emit({ action, event: 'leave' });
    tooltip.close();
  }

  onMouseOverValue(tooltip: NgbTooltip, valueIdx: IAction) {
    tooltip.open({ valueIdx });
  }

  onMouseLeaveValue(tooltip: NgbTooltip, action: IAction) {
    tooltip.close();
  }

  hasReactionsToAction(action: IAction): boolean {
    return this._reactionMemoryService.hasReactionsToAction(action)
  }

  getReactionsToAction(action: IAction) {
    return this._reactionMemoryService.getReactionsToAction(action);
  }
}

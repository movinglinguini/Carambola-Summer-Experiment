import { IAction } from './../../../../functions/generate-actions';
import { environment } from './../../../../../environments/environment';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { IAdvisor } from './../../../../functions/generate-advisors';
import { Component, Input, OnInit } from '@angular/core';
import { calculateActionEffect } from 'src/app/services/game-logic/modules/execute-action-effects';

@Component({
  selector: 'app-action-reaction-generator',
  templateUrl: './action-reaction-generator.component.html',
  styleUrls: ['./action-reaction-generator.component.scss']
})
export class ActionReactionGeneratorComponent implements OnInit {
  @Input('roundNo') inRoundNo: number;
  @Input('advisor') inAdvisor: IAdvisor;
  public decisionReaction: string;

  private _rawDecisionReaction: number;

  get reactionPolarity() {
    if (this._rawDecisionReaction === 0) {
      return '';
    }

    return this._rawDecisionReaction < 0 ? 'negative' : 'positive';
  }

  get showRawNumbers() {
    return environment.showRawNumbers;
  }

  get rawDecisionReaction() {
    return this._rawDecisionReaction;
  }

  constructor(
    private _gameLogicService: GameLogicService,
  ) { }

  ngOnInit(): void {
    const decisionEvent = this._gameLogicService.getDecisionEventAtRound(this.inRoundNo);
    this._rawDecisionReaction = calculateActionEffect(decisionEvent.chosenAction as IAction, this.inAdvisor);
    this.decisionReaction = this.generateReaction();
  }

  private generateReaction(): string {
    switch (this._rawDecisionReaction) {
      case -2:
        return 'abhors';
      case -1:
        return 'dislikes';
      case 0:
        return 'is unaffected by';
      case 1:
        return 'likes';
      case 2:
        return 'applauds';
      default:
        return '';
    }
  }

}

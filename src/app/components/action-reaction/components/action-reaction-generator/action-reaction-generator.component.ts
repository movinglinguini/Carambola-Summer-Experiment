import { IDecisionEvent } from './../../../../services/game-logic/modules/generate-decision-event';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { IAdvisor } from './../../../../functions/generate-advisors';
import { Component, Input, OnInit } from '@angular/core';
import { determineEffect } from 'src/app/services/game-logic/modules/execute-action-effects';
import { ActionValueEffects } from 'src/app/functions/generate-actions';

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

  constructor(
    private _gameLogicService: GameLogicService,
  ) { }

  ngOnInit(): void {
    const decisionEvent = this._gameLogicService.getDecisionEventAtRound(this.inRoundNo);
    const promotionEffect = [...(decisionEvent.chosenAction?.promotes as number[])].reduce((acc, curr) => {
      return acc + determineEffect(ActionValueEffects.PROMOTE, curr, this.inAdvisor);
    }, 0);

    const harmEffect = [...(decisionEvent.chosenAction?.harms as number[])].reduce((acc, curr) => {
      return acc + determineEffect(ActionValueEffects.HARM, curr, this.inAdvisor);
    }, 0);

    this._rawDecisionReaction = promotionEffect + harmEffect;
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

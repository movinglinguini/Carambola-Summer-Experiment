import { IAction, calculateActionEffect } from './../../../../shared/resources/action.resource';
import { environment } from './../../../../../environments/environment';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { IAdvisor } from './../../../../shared/resources/advisors.resource';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-reaction-generator',
  templateUrl: './action-reaction-generator.component.html',
  styleUrls: ['./action-reaction-generator.component.scss']
})
export class ActionReactionGeneratorComponent implements OnInit {
  @Input('roundNo') inRoundNo: number;
  @Input('advisor') inAdvisor: IAdvisor;
  @Input('action') inAction: IAction;
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

  constructor() { }

  ngOnInit(): void {
    this._rawDecisionReaction = calculateActionEffect(this.inAction, this.inAdvisor);
    this.decisionReaction = this.generateReaction();
  }

  private generateReaction(): string {
    switch (this._rawDecisionReaction) {
      case -2:
        return 'abhored';
      case -1:
        return 'disliked';
      case 0:
        return 'was unaffected by';
      case 1:
        return 'liked';
      case 2:
        return 'applauded';
      default:
        return '';
    }
  }

}

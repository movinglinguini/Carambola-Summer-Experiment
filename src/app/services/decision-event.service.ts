import { IAdvisor } from './../interfaces/advisor.interface';
import { DecisionEventGenerators } from './../decision-event-generators/index';
import { IDecisionEvent, IEmptyDecisionEvent } from '../interfaces/decision-event.interface';
import { BasePropService } from './base-prop.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAction } from '../interfaces/action.interface';

interface IDBDecisionEvent extends IDecisionEvent {
  _id: string;
}

type DecisionEventGenerator = (opts?: any) => IEmptyDecisionEvent;

@Injectable({
  providedIn: 'root'
})
export class DecisionEventService extends BasePropService {

  private _generator: DecisionEventGenerator;

  constructor() {
    super('DecisionEvents');
  }

  public async generateDecisionEvent(opts: { actionList: IAction[], advisor?: IAdvisor }): Promise<IDBDecisionEvent> {
    if (!this._generator) {
      this._generator = await this.loadDecisionEventGenerator(environment.decisionEventGeneratorMeta.name);
    }

    const decisionEvent: IDBDecisionEvent = {
      ...this._generator(opts),
      _id: '' + new Date().getTime(),
    };

    return decisionEvent;
  }

  private async loadDecisionEventGenerator(generatorName: string): Promise<DecisionEventGenerator> {
    return DecisionEventGenerators.get(generatorName) as DecisionEventGenerator;
  }
}

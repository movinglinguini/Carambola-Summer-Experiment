import { environment } from './../../../environments/environment';
import { calculateEmperorOpinion } from '../../shared/resources/advisors.resource-dep';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, Input, OnInit } from '@angular/core';
import { IAdvisor } from 'src/app/interfaces/advisor.interface';

const affinityMapKeyDelimiter = '::';

type AdvisorName = string;

@Component({
  selector: 'app-affinity-tables',
  templateUrl: './affinity-tables.component.html',
  styleUrls: ['./affinity-tables.component.scss']
})
export class AffinityTablesComponent implements OnInit {
  @Input('roundNo') inRoundNo: number;

  public advisorAffinityMap = new Map<string, number>();
  get advisors(): IAdvisor[] {
    return this._gameLogic.advisors;
  }

  get showTable() {
    return environment.showAffinityTable;
  }

  constructor(
    private _gameLogic: GameLogicService,
  ) { }

  static buildAdvisorMapKey(from: AdvisorName, to: AdvisorName) {
    return `${from}${affinityMapKeyDelimiter}${to}`;
  }

  async ngOnInit(): Promise<void> {
    this._gameLogic.$onNextRound.subscribe(async () => {
      await this.setupAffinityMap();
    });
  }

  async setupAffinityMap() {
    (await this.advisors).map(from => {
      from.affinities.map(({ name: to, affinity }) => {
        const key = AffinityTablesComponent.buildAdvisorMapKey(from.name, to);
        this.advisorAffinityMap.set(key, affinity);
      });
    });
  }

  getAffinityBetween(from: AdvisorName, to: AdvisorName) {
    const key = AffinityTablesComponent.buildAdvisorMapKey(from, to);
    return this.advisorAffinityMap.get(key);
  }

  getAffinityWithPlayer(from: AdvisorName) {
    const key = AffinityTablesComponent.buildAdvisorMapKey(from, environment.playerCharacterKey);
    return this.advisorAffinityMap.get(key);
  }

  getRebellionUtility(advisor: IAdvisor) {
    return -calculateEmperorOpinion(advisor);
  }

}

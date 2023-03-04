import { environment } from './../../../environments/environment';
import { calculateEmperorOpinion, IAdvisor } from '../../shared/resources/advisors.resource-dep';
import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, Input, OnInit } from '@angular/core';

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

  get showTable() {
    return environment.showAffinityTable;
  }

  get advisors() {
    return this._gameLogic.advisors;
  }

  constructor(
    private _gameLogic: GameLogicService,
  ) { }

  static buildAdvisorMapKey(from: AdvisorName, to: AdvisorName) {
    return `${from}${affinityMapKeyDelimiter}${to}`;
  }

  ngOnInit(): void {
    this._gameLogic.$onNextRound.subscribe(() => {
      this.setupAffinityMap();
    })
    this.setupAffinityMap();
  }

  setupAffinityMap() {
    this.advisors.map(from => {
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

import { DateCounterService } from './../../../../services/date-counter.service';
import { DateTime } from 'luxon';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';

interface IRoundDatum {}

@Component({
  selector: 'app-chronicle',
  templateUrl: './chronicle.component.html',
  styleUrls: ['./chronicle.component.scss']
})
export class ChronicleComponent implements OnInit {

  public rounds: IRoundDatum[] = [];
  public isScrolling = false;

  get currentRound() {
    return this._gameLogicService.round;
  }

  get isGameOver() {
    return this._gameLogicService.isGameOver;
  }

  get dateTimeline() {
    return this._dateCounterService.dateTimeline;
  }

  get currentDate() {
    return this._dateCounterService.currentDate;
  }

  constructor(
    private _gameLogicService: GameLogicService,
    private _dateCounterService: DateCounterService,
  ) { }

  ngOnInit(): void {
    this._gameLogicService.$onNextRound.subscribe(() => {
      this.rounds.push({});
      this.isScrolling = true;
    });
  }

  ngAfterViewChecked() {
    if (this.isScrolling) {
      document.getElementById('view-top-marker_'+this.rounds.length)?.scrollIntoView();
      this.isScrolling = false;
    }
  }

  beautifyDate(date: DateTime) {
    return date.toLocaleString(DateTime.DATE_MED);
  }

}

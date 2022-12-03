import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

interface IRoundDatum {
  date: DateTime;
}

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  public rounds: IRoundDatum[] = [];
  public currentDate: DateTime;

  get currentRound() {
    return this._gameLogicService.round;
  }

  get isGameOver() {
    return this._gameLogicService.isGameOver;
  }

  constructor(
    private _gameLogicService: GameLogicService
  ) { }

  ngOnInit(): void {
    /**
     * Setup the date counter that appears on the main screen.
     * It's just a random date that gets incremented by a random
     * amount of days each round.
    */
    const maxYear = 1800;
    const minYear = 1700;
    const randomYear = Math.floor((Math.random() * (maxYear - minYear)) + minYear);
    const randomMonth = Math.floor((Math.random() * 11)) + 1;
    const randomDay = Math.floor((Math.random() * 30)) + 1;

    const startDate = DateTime.fromObject({
      year: randomYear,
      month: randomMonth,
      day: randomDay,
    });

    this.currentDate = startDate;

    this._gameLogicService.$onNextRound.subscribe(() => {
      this.rounds.push({
        date: this.currentDate,
      });

      const randomDays = Math.floor((Math.random() * 90));
      this.currentDate = this.currentDate.plus({ days: randomDays });
    });
  }

  ngAfterViewChecked() {
    document.getElementById('view-marker')?.scrollIntoView();
  }

  beautifyDate(date: DateTime) {
    return date.toLocaleString(DateTime.DATE_MED);
  } 

}

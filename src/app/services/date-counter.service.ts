import { DateTime } from 'luxon';
import { GameLogicService } from './game-logic/game-logic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateCounterService {
  public currentDate: DateTime;
  public dateTimeline: DateTime[] = [];

  constructor(
    private _gameLogicService: GameLogicService,
  ) {
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
    this.dateTimeline.push(this.currentDate);

    this._gameLogicService.$onNextRound.subscribe(() => {
      const randomDays = Math.floor((Math.random() * 90));
      this.currentDate = this.currentDate.plus({ days: randomDays });
      this.dateTimeline.push(this.currentDate);
    });
  }
}

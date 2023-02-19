import { IAction } from './../shared/resources/action.resource';
import { IAdvisor } from './../shared/resources/advisors.resource';
import { GameLogicService } from 'src/app/services/game-logic/game-logic.service';
import { DateTime } from 'luxon';
import { Injectable, EventEmitter } from '@angular/core';
import { DateCounterService } from './date-counter.service';

export interface ITimelineEvent {
  date: DateTime;
  reactions: { advisor: IAdvisor, reaction:  number }[];
  chosenAction: IAction | null;
  alternateAction: IAction | null;
}

/** Tracks events in the game for easy access by other components. */
@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  public $addReactions = new EventEmitter<ITimelineEvent>();

  private _events: ITimelineEvent[] = [];

  get events() {
    return [...this._events];
  }

  constructor(
    private _gameLogicService: GameLogicService,
    private _dateCounterService: DateCounterService,
  ) {
    this._events.push({
      date: this._dateCounterService.currentDate,
      reactions: [],
      chosenAction: null,
      alternateAction: null,
    });

    this._gameLogicService.$onNextRound.subscribe(() => {
      this._events.push({
        date: this._dateCounterService.currentDate,
        reactions: [],
        chosenAction: null,
        alternateAction: null,
      });
    });

    this._gameLogicService.$beforeNextRound.subscribe((event) => {
      const timelineEvent = this._events[this._events.length - 1];
      timelineEvent.reactions = event.reactions;
      timelineEvent.chosenAction = event.chosenAction;
      timelineEvent.alternateAction = event.alternateAction;
      this.$addReactions.emit(timelineEvent);
    });
  }
}

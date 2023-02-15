import { DateTime } from 'luxon';
import { DateCounterService } from './../../../../services/date-counter.service';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';

interface ITimelineEvent {
  progress: number;
  date: DateTime;
  progressAsHeight: number;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  public timelineContainerHeight: number;
  public timelineContainerWidth: number;
  public svgTimelineStrokeWidth = 5;
  public svgTimelineBandHeight: number;

  public events: ITimelineEvent[] = [];

  get svgViewBox() {
    return `0 0 ${this.timelineContainerWidth} ${this.timelineContainerHeight}`;
  }

  get timelineProgress() {
    return this._gameLogicService.round / (this._gameLogicService.maxRounds - 1);
  }

  get timelineProgressAsHeight() {
    return this.timelineProgress * this.timelineContainerHeight;
  }

  constructor(
    private _gameLogicService: GameLogicService,
    private _dateCounterService: DateCounterService,
  ) { }

  ngOnInit(): void {
    this.timelineContainerHeight = window.innerHeight * 0.8;
    this.timelineContainerWidth = window.innerWidth * 0.33;
    this.svgTimelineBandHeight = (1 / (this._gameLogicService.maxRounds - 1)) * this.timelineContainerHeight;

    this.events.push({
      progress: this.timelineProgress,
      progressAsHeight: this.timelineProgressAsHeight,
      date: this._dateCounterService.currentDate,
    });

    this._gameLogicService.$onNextRound.subscribe(() => {
      this.events.push({
        progress: this.timelineProgress,
        progressAsHeight: this.timelineProgressAsHeight,
        date: this._dateCounterService.currentDate,
      });
    });
  }

  onClickTick(event: ITimelineEvent, index: number) {
    document.getElementById(`view-top-marker_${index}`)?.scrollIntoView();
  }

  beautifyDate(date: DateTime) {
    return date.toLocaleString(DateTime.DATE_MED);
  }

}

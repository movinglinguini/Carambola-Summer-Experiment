import { IAdvisor } from './../../../../shared/resources/advisors.resource';
import { DateTime } from 'luxon';
import { DateCounterService } from './../../../../services/date-counter.service';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';

interface ITimelineEvent {
  progress: number;
  date: DateTime;
  progressAsHeight: number;
  reactions: { advisor: IAdvisor, reaction:  number }[];
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

  public mouseOverTick: number | null;

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
    this.timelineContainerWidth = window.innerWidth * 0.25;
    this.svgTimelineBandHeight = (1 / (this._gameLogicService.maxRounds - 1)) * this.timelineContainerHeight;

    this.events.push({
      progress: this.timelineProgress,
      progressAsHeight: this.timelineProgressAsHeight,
      date: this._dateCounterService.currentDate,
      reactions: [],
    });

    this._gameLogicService.$onNextRound.subscribe(() => {
      this.events.push({
        progress: this.timelineProgress,
        progressAsHeight: this.timelineProgressAsHeight,
        date: this._dateCounterService.currentDate,
        reactions: [],
      });
    });

    this._gameLogicService.$beforeNextRound.subscribe((event) => {
      this.events[this.events.length - 1].reactions = event.reactions;
    });
  }

  onClickTick(event: ITimelineEvent, index: number) {
    document.getElementById(`view-top-marker_${index}`)?.scrollIntoView();
  }

  onMouseOverTick(event: ITimelineEvent, index: number) {
    this.mouseOverTick = index;
  }

  onMouseOutTick(event: ITimelineEvent, index: number) {
    this.mouseOverTick = null;

  }

  beautifyDate(date: DateTime) {
    return date.toLocaleString(DateTime.DATE_MED);
  }

  getReactionColor(reaction: number) {
    if (reaction < 0) {
      return '#ff5628';
    } else if (reaction > 0) {
      return '#5c4aee';
    } else {
      return '#37352f';
    }
  }

  getTickWrapperMask(index: number) {
    return this.mouseOverTick === index ? 'url(#opaque-mask)' : 'url(#translucent-mask)';
  }

}

import { IAdvisor } from './../../../../shared/resources/advisors.resource';
import { DateTime } from 'luxon';
import { DateCounterService } from './../../../../services/date-counter.service';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';
import { InteractionTrackerService } from 'src/app/services/interaction-tracker.service';
import { IAction } from 'src/app/shared/resources/action.resource';

interface ITimelineEvent {
  progress: number;
  date: DateTime;
  progressAsHeight: number;
  reactions: { advisor: IAdvisor, reaction:  number }[];
  action: IAction | null;
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
  public highlightTicks: number[] = [];

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
    private _interactionTrackerService: InteractionTrackerService,
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
      action: null,
    });

    this._gameLogicService.$onNextRound.subscribe(() => {
      this.events.push({
        progress: this.timelineProgress,
        progressAsHeight: this.timelineProgressAsHeight,
        date: this._dateCounterService.currentDate,
        reactions: [],
        action: null,
      });
    });

    this._gameLogicService.$beforeNextRound.subscribe((event) => {
      this.events[this.events.length - 1].reactions = event.reactions;
      this.events[this.events.length - 1].action = event.chosenAction;
    });

    this._interactionTrackerService.$trackOnHoverAction.subscribe((payload) => {
      if (payload.event === 'leave') {
        this.highlightTicks = [];
      } else if (payload.event === 'enter') {
        const highlightMask = this.events.map((evt, idx) => {
          return { display: evt.action?.name === payload.action.name, index: idx };
        });
        this.highlightTicks = highlightMask.filter(m => m.display).map(m => m.index);
      }
    })
  }

  onClickTick(event: ITimelineEvent, index: number) {
    document.getElementById(`view-top-marker_${index}`)?.scrollIntoView();
  }

  onMouseOverTick(event: ITimelineEvent, index: number) {
    this.highlightTicks = [index];
  }

  onMouseOutTick(event: ITimelineEvent, index: number) {
    this.highlightTicks = [];
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
    return this.highlightTicks.includes(index) ? 'url(#opaque-mask)' : 'url(#translucent-mask)';
  }

}

import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TimelineService, ITimelineEvent } from './../../../../services/timeline.service';
import { DateTime } from 'luxon';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';
import { InteractionTrackerService } from 'src/app/services/interaction-tracker.service';

interface IEvent extends ITimelineEvent {
  progress: number;
  progressAsHeight: number;
}

/**
 * Displays the game's events in an interactive timeline.
 * The timeline is vertical and has ticks for each event that has transpired in the game.
 * Clicking on the ticks will cause the UI to scroll to the event in the game's main screen.
*/
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

  /** List of ticks to be highlighted. */
  public highlightTicks: number[] = [];

  /** Returns the percentage of progress ([0-1]) toward the final round in the game. */
  get timelineProgress() {
    return this._gameLogicService.round / (this._gameLogicService.maxRounds - 1);
  }

  /** Maps the timeline's progress ([0-1]) to the full height of the timeline in pixels.  */
  get timelineProgressAsHeight() {
    return this.timelineProgress * this.timelineContainerHeight;
  }

  /** Timeline of events that have transpired. */
  get events() {
    return this._timelineService.events;
  }

  constructor(
    private _gameLogicService: GameLogicService,
    private _timelineService: TimelineService,
    private _interactionTrackerService: InteractionTrackerService,
  ) { }

  ngOnInit(): void {
    this.timelineContainerHeight = window.innerHeight * 0.8;
    this.timelineContainerWidth = window.innerWidth * 0.25;
    this.svgTimelineBandHeight = (1 / (this._gameLogicService.maxRounds - 1)) * this.timelineContainerHeight;

    this._interactionTrackerService.$trackOnHoverAction.subscribe((payload) => {
      if (payload.event === 'leave') {
        this.highlightTicks = [];
      } else if (payload.event === 'enter') {
        const highlightMask = this.events.map((evt, idx) => {
          return { display: evt.chosenAction?.name === payload.action.name, index: idx };
        });
        this.highlightTicks = highlightMask.filter(m => m.display).map(m => m.index);
      }
    })
  }

  onClickTick(event: ITimelineEvent, index: number) {
    document.getElementById(`view-top-marker_${index}`)?.scrollIntoView();
  }

  onMouseOverTick(tooltip: NgbTooltip, event: ITimelineEvent, index: number) {
    this.highlightTicks = [index];

    if (event.reactions.length > 0) {
      tooltip.open({ event });
    }
  }

  onMouseOutTick(tooltip: NgbTooltip, event: ITimelineEvent, index: number) {
    this.highlightTicks = [];
    tooltip.close();
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

  eventIndexToHeight(index: number) {
    const progress = (index / (this._gameLogicService.maxRounds - 1));
    return progress * this.timelineContainerHeight;
  }

}

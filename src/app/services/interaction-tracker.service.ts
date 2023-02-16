import { Injectable, EventEmitter } from '@angular/core';
import { IAction } from '../shared/resources/action.resource';

@Injectable({
  providedIn: 'root'
})
export class InteractionTrackerService {
  public $trackOnHoverAction = new EventEmitter<{ action: IAction, event: 'enter' | 'leave' }>();

  constructor() { }
}

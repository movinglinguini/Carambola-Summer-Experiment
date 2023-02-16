import { TestBed } from '@angular/core/testing';

import { InteractionTrackerService } from './interaction-tracker.service';

describe('InteractionTrackerService', () => {
  let service: InteractionTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractionTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DecisionEventService } from './decision-event.service';

describe('DecisionEventService', () => {
  let service: DecisionEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisionEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

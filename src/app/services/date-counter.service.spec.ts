import { TestBed } from '@angular/core/testing';

import { DateCounterService } from './date-counter.service';

describe('DateCounterService', () => {
  let service: DateCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

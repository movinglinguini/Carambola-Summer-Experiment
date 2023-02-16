import { TestBed } from '@angular/core/testing';

import { ReactionMemoryService } from './reaction-memory.service';

describe('ReactionMemoryService', () => {
  let service: ReactionMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactionMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

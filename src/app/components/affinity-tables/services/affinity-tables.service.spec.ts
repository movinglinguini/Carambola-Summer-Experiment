import { TestBed } from '@angular/core/testing';

import { AffinityTablesService } from './affinity-tables.service';

describe('AffinityTablesService', () => {
  let service: AffinityTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffinityTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

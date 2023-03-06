import { TestBed } from '@angular/core/testing';

import { BasePropService } from './base-prop.service';

describe('BasePropService', () => {
  let service: BasePropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasePropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

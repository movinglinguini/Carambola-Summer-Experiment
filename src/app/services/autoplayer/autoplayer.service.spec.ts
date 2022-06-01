import { TestBed } from '@angular/core/testing';

import { AutoplayerService } from './autoplayer.service';

describe('AutoplayerService', () => {
  let service: AutoplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

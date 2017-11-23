import { TestBed, inject } from '@angular/core/testing';

import { ResultStreamerService } from './result-streamer.service';

describe('ResultStreamerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultStreamerService]
    });
  });

  it('should be created', inject([ResultStreamerService], (service: ResultStreamerService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { UrlTrackerService } from './url-tracker.service';

describe('UrlTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlTrackerService]
    });
  });

  it('should be created', inject([UrlTrackerService], (service: UrlTrackerService) => {
    expect(service).toBeTruthy();
  }));
});

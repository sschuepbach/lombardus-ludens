import { TestBed, inject } from '@angular/core/testing';

import { RouteTrackingService } from './route-tracking.service';

describe('RouteTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RouteTrackingService]
    });
  });

  it('should be created', inject([ RouteTrackingService], (service: RouteTrackingService) => {
    expect(service).toBeTruthy();
  }));
});

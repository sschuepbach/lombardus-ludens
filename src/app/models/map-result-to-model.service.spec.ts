import { TestBed, inject } from '@angular/core/testing';

import { MapResultToModelService } from './map-result-to-model.service';

describe('MapResultToModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapResultToModelService]
    });
  });

  it('should be created', inject([MapResultToModelService], (service: MapResultToModelService) => {
    expect(service).toBeTruthy();
  }));
});

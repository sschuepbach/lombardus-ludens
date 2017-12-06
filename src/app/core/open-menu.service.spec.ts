import { TestBed, inject } from '@angular/core/testing';

import { OpenMenuService } from './open-menu.service';

describe('OpenMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenMenuService]
    });
  });

  it('should be created', inject([OpenMenuService], (service: OpenMenuService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CookieInterceptorService } from './cookie-interceptor.service';

describe('CookieInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieInterceptorService]
    });
  });

  it('should be created', inject([CookieInterceptorService], (service: CookieInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { HttpCacheService } from './http-cache.service';


@Injectable()
export class CachingInterceptorService implements HttpInterceptor {

  constructor(private cache: HttpCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);
    if (cachedResponse) {
      return Observable.of(cachedResponse);
    }

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse) {
        this.cache.put(req, event);
      }
    });
  }

}

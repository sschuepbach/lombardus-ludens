import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RCSCache } from './RCSCache';

@Injectable()
export class HttpCacheService {

  private rcsCache = new RCSCache();

  private static getSearchString(req: HttpRequest<any>): string {
    const urlElements = req.url.split('/');
    return urlElements[ urlElements.length - 1 ];
  }

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const searchString = HttpCacheService.getSearchString(req);
    const cacheResponse = this.rcsCache.lookup(searchString);
    return cacheResponse ? new HttpResponse({ body: cacheResponse }) : cacheResponse;
  }

  put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
    const searchString = HttpCacheService.getSearchString(req);
    this.rcsCache.put(searchString, resp.body);
  }
}

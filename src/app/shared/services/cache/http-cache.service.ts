import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { RCSCache } from './RCSCache';

@Injectable()
export class HttpCacheService {

  private rcsCache = new RCSCache();

  get(): HttpResponse<any> | null {
    const cacheResponse = this.rcsCache.lookup();
    return cacheResponse ? new HttpResponse({ body: cacheResponse }) : cacheResponse;
  }

  put(resp: HttpResponse<any>): void {
    this.rcsCache.put(resp.body);
  }
}

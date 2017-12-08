import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

interface RouteToken {
  id: number;
  route: string;
}

@Injectable()
export class RouteTrackingService {

  private searchParamStreamSource = new ReplaySubject<string>();
  private filterParamsStreamSource = new ReplaySubject<Array<string>>();
  private routeParamsStreamSource = new ReplaySubject<any>();
  private routeParams: any = {};
  private searchParam = '';
  private filterParams: string[] = [];
  private currentRouteSegments: string;
  private routesHistory: RouteToken[] = [];

  private static traverseObject(obj: any, path?: string) {
    let res: string[] = [];
    for (const k of obj instanceof Array ? obj : Object.keys(obj)) {
      if (typeof obj[ k ] === 'boolean' && !obj[ k ]) {
        res.push((path ? path + '_' : '') + k);
      } else if (obj[ k ] instanceof Array) {
        res = res.concat(RouteTrackingService.traverseObject(obj[ k ], (path ? path + '_' : '') + k));
      } else {
        res = res.concat(RouteTrackingService.traverseObject(obj[ k ], (path ? path + '_' : '') + k));
      }
    }
    return res;
  }

  private static getParamsFromUrl(url: string) {
    return url.split(';').slice(1).map(x => x.split('='));
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.searchParamStreamSource.next('');
    this.filterParamsStreamSource.next([]);

    router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.routesHistory.unshift({ id: res.id, route: res.urlAfterRedirects });
        const newRouteSegments = res.urlAfterRedirects.split(';')[ 0 ];
        if (newRouteSegments !== this.currentRouteSegments) {
          this.currentRouteSegments = newRouteSegments;
          this.updateSearchfieldFromUrlSearchParam(res.urlAfterRedirects);
          this.updateCheckboxesFromUrlFilterParams(res.urlAfterRedirects);
        }
      }
    });

    this.routeParamsStream$.subscribe(res =>
      this.router.navigate([ this.currentRouteSegments, res ])
    );

  }

  updateUrlSearchParamFromSearchfield(searchTerm: string): void {
    this.searchParam = searchTerm;
    this.updateRouteParams();
  }

  updateSearchfieldFromUrlSearchParam(url: string) {
    this.searchParam =
      RouteTrackingService.getParamsFromUrl(url)
        .filter(x => x[ 0 ] === 'search')
        .reduce((x, y) => x + y[ 1 ], '');
    this.searchParamStreamSource.next(this.searchParam);
  }

  updateUrlFilterParamsFromCheckboxes(filters: any) {
    this.filterParams = RouteTrackingService.traverseObject(filters);
    this.updateRouteParams();
  }

  updateCheckboxesFromUrlFilterParams(url: string) {
    this.filterParams =
      RouteTrackingService.getParamsFromUrl(url)
        .filter(x => x[ 0 ] !== 'search')
        .reduce((x, y) => x.concat(y[ 0 ]), []);
    this.filterParamsStreamSource.next(this.filterParams);
  }

  get routeParamsStream$(): Observable<any> {
    return this.routeParamsStreamSource.asObservable();
  }

  get searchParamStream$(): Observable<string> {
    return this.searchParamStreamSource.asObservable();
  }

  get filterParamsStream$(): Observable<Array<string>> {
    return this.filterParamsStreamSource
      .asObservable()
      .map(e => e.map(x => x.replace('_', '.')));
  }

  get currentRouteParams() {
    return this.routeParams;
  }

  getRoutesHistory(numberOfRoutes: number) {
    return this.routesHistory.slice(0, numberOfRoutes);
  }

  deleteRouteElement(id: number) {
    this.routesHistory = this.routesHistory.filter(x => x.id !== id);
  }

  private updateRouteParams(): void {
    this.routeParamsStreamSource.next(
      Object.assign({ search: this.searchParam }, this.filterParams.reduce((x, y) => {
        const obj = {};
        obj[ y ] = 'false';
        return Object.assign(x, obj);
      }, {}))
    );
  }

}

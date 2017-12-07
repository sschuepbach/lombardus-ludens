import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

interface RouteToken {
  id: number;
  route: string;
}

@Injectable()
export class RouteTrackingService {

  // TODO:
  // - Get information on fragments of url (probably only private)
  // - Set params
  // - Get params
  // - Get routesHistory

  searchTerm: any = {};
  filterParams: any = {};
  private currentRouteSegments: string;
  private routesHistory: RouteToken[] = [];

  private static traverseObject(obj: any, path?: string) {
    let res: any = {};
    for (const k of obj instanceof Array ? obj : Object.keys(obj) ) {
      if (typeof obj[ k ] === 'boolean' && !obj[ k ]) {
        res[ (path ? path + '_' : '') + k ] = obj[ k ];
      } else if (obj[ k ] instanceof Array) {
        res = Object.assign(res, RouteTrackingService.traverseObject(obj[ k ], (path ? path + '_' : '') + k));
      } else {
        res = Object.assign(res, RouteTrackingService.traverseObject(obj[ k ], (path ? path + '_' : '') + k));
      }
    }
    return res;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.routesHistory.unshift({ id: res.id, route: res.url });
        this.currentRouteSegments = res.url.split(';')[ 0 ];
      }
    });
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm = {search: searchTerm};
    this.updateRoute();
  }

  updateFilters(filters: any) {
    this.filterParams = RouteTrackingService.traverseObject(filters);
    this.updateRoute();
  }

  getRoutesHistory(numberOfRoutes: number) {
    return this.routesHistory.slice(0, numberOfRoutes);
  }

  deleteRouteElement(id: number) {
    this.routesHistory = this.routesHistory.filter(x => x.id !== id);
  }

  private updateRoute(): void {
    console.log(Object.assign(this.searchTerm, this.filterParams));
    this.router.navigate([this.currentRouteSegments, Object.assign(this.searchTerm, this.filterParams)]);
  }

}

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

  routeParams: any;
  currentRouteSegments: string;
  routesHistory: RouteToken[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.routesHistory.unshift({id: res.id, route: res.url});
        this.currentRouteSegments = res.url.split(';')[0];
      }
    });
  }

  updateSearchTerm(searchTerm: string) {
    this.router.navigate([this.currentRouteSegments, { search: searchTerm } ]);
  }

  updateFilters(filter: any) {

  }

  getRoutesHistory(numberOfRoutes: number) {
    return this.routesHistory.slice(0, numberOfRoutes);
  }

  deleteRouteElement(id: number) {
    this.routesHistory = this.routesHistory.filter(x => x.id !== id);
  }

}

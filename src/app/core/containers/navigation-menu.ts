import { Component, OnInit } from '@angular/core';
import { RouteTrackingService } from '../../shared/services/routing/route-tracking.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.html',
  styleUrls: [ './navigation-menu.scss' ]
})
export class NavigationMenuComponent implements OnInit {

  routeParams: any = {};

  constructor(rts: RouteTrackingService, route: ActivatedRoute) {
    rts.routeParamsStream$.subscribe(params =>
      this.routeParams = params
    );
  }

  ngOnInit() {
  }

  createLink(prefix: string) {
    return prefix + '/';
  }
}

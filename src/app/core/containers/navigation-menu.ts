import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.html',
  styleUrls: [ './navigation-menu.scss' ]
})
export class NavigationMenuComponent {

  routeParams$: Observable<Params>;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) {
   // store.pipe(select(fromLayout.))
    this.routeParams$ = route.params;
    route.params.subscribe(x => console.log(x));
    /*    rts.routeParamsStream$.subscribe(params =>
     this.routeParams = params
     );*/
  }

}

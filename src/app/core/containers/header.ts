import { Component } from '@angular/core';

import * as fromRoot from '../../reducers';
import * as layout from '../actions/layout';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent {
  showSidenav: boolean;

  constructor(private store: Store<fromRoot.State>) {
    this.store.pipe(select(fromRoot.getShowSidenav)).subscribe(x => this.showSidenav = x);
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }


}

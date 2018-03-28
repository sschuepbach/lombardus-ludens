import {Component} from '@angular/core';

import * as fromLayout from '../reducers';
import * as layout from '../actions/sidenav';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent {
  showSidenav: boolean;

  constructor(private store: Store<fromLayout.State>) {
    this.store.pipe(select(fromLayout.getShowSidenav)).subscribe(x => this.showSidenav = x);
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }


}

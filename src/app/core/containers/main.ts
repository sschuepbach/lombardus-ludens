import { Component } from '@angular/core';
import { ResultStreamerService } from '../../shared/services/searchutils/result-streamer.service';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-main',
  templateUrl: './main.html'
})
export class MainComponent {

  searching = true;
  private showSidenav$: Observable<any>;

  constructor(private store: Store<fromRoot.State>,
              rs: ResultStreamerService) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    rs.searchingStateStream$.subscribe(searching => this.searching = searching);
  }

}

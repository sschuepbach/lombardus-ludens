import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { RouteTrackingService } from '../../shared/services/routing/route-tracking.service';


@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.html'
})
export class SearchfieldComponent {

  searchInput: FormControl = new FormControl('');

  constructor(private rts: RouteTrackingService) {
    this.searchInput
      .valueChanges
      .debounceTime(500)
      .subscribe(newVal => {
        // TODO:  Refactor updateUrlSearchParamFromSearchfield
        rts.updateUrlSearchParamFromSearchfield(newVal);
      });
    this.rts.searchParamStream$.subscribe(
      // TODO: Refactor searchParamStream$
      // this.searchInput.setValue(x)
    );
  }
}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

@Injectable()
export class SearchfieldRouteEffects {

  constructor(private actions$: Actions) {}

  /*@Effect()
  paramsUpdate$: Observable<Action> = this.actions$.ofType('ROUTER_NAVIGATION')*/

}

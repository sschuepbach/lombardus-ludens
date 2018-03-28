import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

@Injectable()
export class FacetsRouteEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  paramsUpdate$: Observable<Action> = this.actions$.ofType('ROUTER_NAVIGATION')
    .switchMap((action: any) => {
      const rS = action.payload.routerState;
      const searchParams = rS.root.firstChild.params;
      return
    })
    .filter((x: any) => x.payload.event.urlAfterRedirects.)
}

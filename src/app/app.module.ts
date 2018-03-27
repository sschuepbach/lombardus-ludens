import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import 'hammerjs';

import { AppComponent } from './core/components/app';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CustomRouterStateSerializer } from './shared/utils';
import { metaReducers, reducers } from './reducers';


@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'lombardusLudens DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

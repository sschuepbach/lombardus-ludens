import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainViewsModule } from '../main-views/main-views.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {reducers, RouterEffects} from '../store';

import { HeaderComponent } from './containers/header';
import { FooterComponent } from './components/footer';
import { RetrieveDataService } from '../shared/services/searchutils/retrieve-data.service';
import { ResultStreamerService } from '../shared/services/searchutils/result-streamer.service';
import { CachingInterceptorService } from '../shared/services/cache/caching-interceptor.service';
import { MapResultToModelService } from '../shared/models/map-result-to-model.service';
import { HttpCacheService } from '../shared/services/cache/http-cache.service';
import { PageNotFoundComponent } from './components/page-not-found';
import { MainComponent } from './containers/main';
import { NavigationMenuComponent } from './containers/navigation-menu';
import { OpenMenuService } from './services/open-menu.service';
import { RouteTrackingService } from '../shared/services/routing/route-tracking.service';
import { FiltersModule } from '../filters/filters.module';
import { NavigationHistoryComponent } from './containers/navigation-history';
import { environment } from '../../environments/environment';
import { AppComponent } from './components/app';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MainViewsModule,
    FiltersModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '**', component: PageNotFoundComponent }
    ]),
    StoreModule.forRoot({ ...reducers, router: routerReducer }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'lombardusLudens DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([ RouterEffects ])

  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MainComponent,
    NavigationMenuComponent,
    NavigationHistoryComponent
  ],
  providers: [
    HttpCacheService,
    MapResultToModelService,
    ResultStreamerService,
    RetrieveDataService,
    OpenMenuService,
    RouteTrackingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}

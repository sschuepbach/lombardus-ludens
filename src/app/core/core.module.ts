import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewsModule } from '../main-views/main-views.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

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
import { RouteTrackingService } from '../shared/services/routing/route-tracking.service';
import { FiltersModule } from '../filters/filters.module';
import { NavigationHistoryComponent } from './containers/navigation-history';
import { AppComponent } from './components/app';
import { RouterModule } from '@angular/router';
import { NavigationMenuItemComponent } from './containers/navigation-menu-item';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MainViewsModule,
    FiltersModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MainComponent,
    NavigationMenuComponent,
    NavigationHistoryComponent,
    NavigationMenuItemComponent
  ],
  providers: [
    HttpCacheService,
    MapResultToModelService,
    ResultStreamerService,
    RetrieveDataService,
    RouteTrackingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptorService,
      multi: true
    }
  ],
  exports: [
    AppComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule {}

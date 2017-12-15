import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainViewsModule } from '../main-views/main-views.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { RetrieveDataService } from '../shared/searchutils/retrieve-data.service';
import { ResultStreamerService } from '../shared/searchutils/result-streamer.service';
import { CachingInterceptorService } from '../shared/cache/caching-interceptor.service';
import { MapResultToModelService } from '../shared/models/map-result-to-model.service';
import { HttpCacheService } from '../shared/cache/http-cache.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { OpenMenuService } from './open-menu.service';
import { RouteTrackingService } from '../shared/routing/route-tracking.service';
import { FiltersModule } from '../filters/filters.module';

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
    ])
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchfieldComponent,
    PageNotFoundComponent,
    MainComponent,
    NavigationMenuComponent
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
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MainComponent
  ]
})
export class CoreModule {}

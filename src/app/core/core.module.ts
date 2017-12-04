import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainViewsModule } from '../main-views/main-views.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { RetrieveDataService } from '../shared/searchutils/retrieve-data.service';
import { CounterService } from '../shared/aggregations/counter.service';
import { ResultStreamerService } from '../shared/searchutils/result-streamer.service';
import { CachingInterceptorService } from '../shared/cache/caching-interceptor.service';
import { MapResultToModelService } from '../shared/models/map-result-to-model.service';
import { HttpCacheService } from '../shared/cache/http-cache.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MainViewsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule.forRoot(),
    CoreRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SearchfieldComponent
  ],
  providers: [
    CounterService,
    HttpCacheService,
    MapResultToModelService,
    ResultStreamerService,
    RetrieveDataService,
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

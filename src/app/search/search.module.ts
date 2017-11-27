import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchfieldComponent } from './searchfield/searchfield.component';
import { RetrieveDataService } from './retrieve-data.service';
import { MapResultToModelService } from '../models/map-result-to-model.service';
import { CookieInterceptorService } from './cookie-interceptor.service';
import { ResultStreamerService } from './result-streamer.service';
import { CounterService } from './counter.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchfieldComponent,
  ],
  providers: [
    RetrieveDataService,
    MapResultToModelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptorService,
      multi: true
    },
    ResultStreamerService,
    CounterService
  ],
  exports: [
    SearchfieldComponent
  ]
})
export class SearchModule {}

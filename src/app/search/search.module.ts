import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchfieldComponent } from './searchfield/searchfield.component';
import { RetrieveDataService } from './retrieve-data.service';
import { MapResultToModelService } from '../models/map-result-to-model.service';
import { CookieInterceptorService } from './cookie-interceptor.service';
import { ResultStreamerService } from './result-streamer.service';
import { ResultsAsTextComponent } from './results-as-text/results-as-text.component';
import { CounterService } from './counter.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ SearchfieldComponent, ResultsAsTextComponent, FilterComponent ],
  providers: [
    RetrieveDataService,
    MapResultToModelService
    CounterService
  ],
  exports: [
    SearchfieldComponent,
    ResultsAsTextComponent
  ]
})
export class SearchModule {}

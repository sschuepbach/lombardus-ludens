import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchfieldComponent } from './searchfield/searchfield.component';
import { RetrieveDataService } from './retrieve-data.service';
import { MapResultToModelService } from '../models/map-result-to-model.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ SearchfieldComponent ],
  providers: [
    RetrieveDataService,
    MapResultToModelService
  ],
  exports: [ SearchfieldComponent ]
})
export class SearchModule {}

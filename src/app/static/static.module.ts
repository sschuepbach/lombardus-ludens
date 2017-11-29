import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultlistModule } from '../resultlist/resultlist.module';
import { FiltersModule } from '../filters/filters.module';

import { CommentatorsListComponent } from './commentators-list/commentators-list.component';
import { AggregationsComponent } from './aggregations/aggregations.component';

@NgModule({
  imports: [
    CommonModule,
    ResultlistModule,
    FiltersModule
  ],
  declarations: [
    CommentatorsListComponent,
    AggregationsComponent
  ],
  exports: [
    CommentatorsListComponent,
    AggregationsComponent
  ]
})
export class StaticModule {}

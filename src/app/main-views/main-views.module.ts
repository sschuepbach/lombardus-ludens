import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultlistModule } from '../resultlist/resultlist.module';
import { FiltersModule } from '../filters/filters.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material.module';

import { CommentatorsListComponent } from './commentators-list/commentators-list.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ResultlistModule,
    FiltersModule,
    MaterialModule,
    NgbModule,
    RouterModule.forChild([
      { path: 'aggregations', component: AggregationsComponent },
      { path: 'commentators', component: CommentatorsListComponent },
      { path: '', redirectTo: '/commentators', pathMatch: 'full' }
    ])
  ],
  declarations: [
    AggregationsComponent,
    CommentatorsListComponent
  ],
  exports: [
    AggregationsComponent,
    CommentatorsListComponent
  ]
})
export class MainViewsModule {}

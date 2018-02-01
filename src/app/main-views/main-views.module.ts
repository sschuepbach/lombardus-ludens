import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsModule } from '../results/results.module';
import { FiltersModule } from '../filters/filters.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material.module';

import { CommentatorsListComponent } from './commentators-list/commentators-list.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { RouterModule } from '@angular/router';
import { AggregationMatrixComponent } from './aggregation-matrix/aggregation-matrix.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatrixComponent } from './matrix/matrix.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

@NgModule({
  imports: [
    CommonModule,
    ResultsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([
      { path: 'aggregations', component: AggregationsComponent },
      { path: 'aggregation-matrix', component: AggregationMatrixComponent},
      { path: 'commentators', component: CommentatorsListComponent },
      { path: 'detailView/:id', component: DetailViewComponent},
      { path: '', redirectTo: '/commentators', pathMatch: 'full' }
    ])
  ],
  declarations: [
    AggregationsComponent,
    CommentatorsListComponent,
    AggregationMatrixComponent,
    MatrixComponent,
    DetailViewComponent
  ],
  exports: [
    AggregationsComponent,
    AggregationMatrixComponent,
    CommentatorsListComponent
  ]
})
export class MainViewsModule {}

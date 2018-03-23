import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsModule } from '../results/results.module';
import { FiltersModule } from '../filters/filters.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';

import { CommentatorsListComponent } from './components/commentators-list';
import { AggregationsComponent } from './containers/aggregations';
import { RouterModule } from '@angular/router';
import { AggregationMatrixComponent } from './containers/aggregation-matrix';
import { ReactiveFormsModule } from '@angular/forms';
import { MatrixComponent } from './containers/matrix';
import { DetailViewComponent } from './containers/detail-view';

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

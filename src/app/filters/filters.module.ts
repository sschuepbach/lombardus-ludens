import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

import {FilterComponent} from './containers/filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchfieldComponent} from './containers/searchfield';
import {PeriodFacetComponent} from './containers/period-facet';
import {AffiliationFacetComponent} from './containers/affiliation-facet';
import {StoreModule} from '@ngrx/store';

import * as fromFilters from './reducers';

const COMPONENTS = [
  FilterComponent,
  SearchfieldComponent,
  PeriodFacetComponent,
  AffiliationFacetComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('filters', fromFilters.reducers),
    NgbModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class FiltersModule {
}

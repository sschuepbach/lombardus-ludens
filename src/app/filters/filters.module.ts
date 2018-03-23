import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { FilterComponent } from './containers/filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchfieldComponent } from './containers/searchfield';

const COMPONENTS = [
  FilterComponent,
  SearchfieldComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class FiltersModule {}

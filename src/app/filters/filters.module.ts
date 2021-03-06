import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { FilterComponent } from './filter/filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule
  ],
  declarations: [ FilterComponent ],
  exports: [ FilterComponent ]
})
export class FiltersModule {}

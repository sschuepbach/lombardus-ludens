import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FiltersModule } from '../filters/filters.module';

import { ResultlistComponent } from './containers/resultlist';
import { ResultComponent } from './containers/result';

@NgModule({
  imports: [
    CommonModule,
    FiltersModule,
    MaterialModule
  ],
  declarations: [ ResultlistComponent, ResultComponent ],
  exports: [ ResultlistComponent ]
})
export class ResultsModule {}

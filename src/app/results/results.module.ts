import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FiltersModule } from '../filters/filters.module';

import { ResultlistComponent } from './resultlist/resultlist.component';
import { ResultComponent } from './result/result.component';

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

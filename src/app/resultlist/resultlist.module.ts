import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FiltersModule } from '../filters/filters.module';

import { ResultlistComponent } from './resultlist/resultlist.component';

@NgModule({
  imports: [
    CommonModule,
    FiltersModule,
    MaterialModule
  ],
  declarations: [ ResultlistComponent ],
  exports: [ ResultlistComponent ]
})
export class ResultlistModule {}

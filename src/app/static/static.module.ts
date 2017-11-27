import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultlistModule } from '../resultlist/resultlist.module';
import { FiltersModule } from '../filters/filters.module';

import { BasicFilterComponent } from './basic-filter/basic-filter.component';

@NgModule({
  imports: [
    CommonModule,
    ResultlistModule,
    FiltersModule
  ],
  declarations: [ BasicFilterComponent ],
  exports: [ BasicFilterComponent ]
})
export class StaticModule {}

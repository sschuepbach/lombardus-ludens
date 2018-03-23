import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import 'hammerjs';

import { AppComponent } from './core/components/app';


@NgModule({
  imports: [
    BrowserModule,
    CoreModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

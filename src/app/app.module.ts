import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { RetrieveDataService } from './retrieve-data.service';
import { MapResultToModelService } from './models/map-result-to-model.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchfieldComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    RetrieveDataService,
    MapResultToModelService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

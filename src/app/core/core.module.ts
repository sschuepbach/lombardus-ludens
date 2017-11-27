import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SearchModule } from '../search/search.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StaticModule } from '../static/static.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    SearchModule,
    StaticModule,
    NgbModule.forRoot(),
    CoreRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MainComponent
  ]
})
export class CoreModule {}

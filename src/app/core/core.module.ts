import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SearchModule} from '../search/search.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    SearchModule
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

import { Component } from '@angular/core';
import { OpenMenuService } from '../services/open-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent {

  constructor(public menuOpener: OpenMenuService) { }

}

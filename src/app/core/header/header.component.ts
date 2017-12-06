import { Component, OnInit } from '@angular/core';
import { OpenMenuService } from '../open-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public menuOpener: OpenMenuService) { }

  ngOnInit() {
  }

}

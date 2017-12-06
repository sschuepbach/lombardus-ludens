import { Component, OnInit } from '@angular/core';
import { OpenMenuService } from '../open-menu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  menuOpened = false;

  constructor(private menuOpener: OpenMenuService) {
    menuOpener.toggleMenuStream$.subscribe((x: boolean) => this.menuOpened = x);
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { OpenMenuService } from '../services/open-menu.service';
import { ResultStreamerService } from '../../shared/services/searchutils/result-streamer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.html'
})
export class MainComponent implements OnInit {

  menuOpened = false;
  searching = true;

  constructor(private menuOpener: OpenMenuService, rs: ResultStreamerService) {
    menuOpener.toggleMenuStream$.subscribe((x: boolean) => this.menuOpened = x);
    rs.searchingStateStream$.subscribe(searching => this.searching = searching);
  }

  ngOnInit() {
  }

}

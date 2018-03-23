import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OpenMenuService {

  // TODO: Convert to reducer
  constructor() { }

  private toggleMenuStreamSource = new Subject<Boolean>();

  toggleMenuStream$ = this.toggleMenuStreamSource.asObservable();
  menuOpened = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
    this.toggleMenuStreamSource.next(this.menuOpened);
  }

}

import {Component, Input, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

import {AddMenuItem, CloseMenuItem, OpenMenuItem, RemoveMenuItem} from '../actions/menu-item';
import * as fromLayout from '../reducers';
import {MenuItem} from '../models/menu-item';

@Component({
  selector: 'app-navigation-menu-item',
  templateUrl: './navigation-menu-item.html',
  styles: ['.expandable { cursor:pointer; } .small-icon { margin-right: -9px; }']
})
export class NavigationMenuItemComponent implements OnDestroy {

  @Input() id: string;
  @Input() title = this.id;

  showItem: boolean;

  constructor(private store: Store<fromLayout.State>) {
    store.dispatch(new AddMenuItem({id: this.id}));
    store.select(fromLayout.getMenuItemEntities).subscribe(x => this.showItem = this.getEntityState(x));
  }

  ngOnDestroy() {
    this.store.dispatch(new RemoveMenuItem({id: this.id}));
  }

  toggleShowItem() {
    if (this.showItem) {
      this.store.dispatch(new OpenMenuItem({id: this.id}));
    } else {
      this.store.dispatch(new CloseMenuItem({id: this.id}));
    }
  }

  private getEntityState(entities: MenuItem[]) {
    return entities.find(x => x.id === this.id).isOpen;
  }

}

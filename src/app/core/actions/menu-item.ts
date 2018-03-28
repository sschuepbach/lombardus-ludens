import {Action} from '@ngrx/store';

export enum MenuItemActionTypes {
  AddMenuItem = '[Layout] Add sidenav menu item',
  RemoveMenuItem = '[Layout] Remove sidenav menu item',
  OpenMenuItem = '[Layout] Open sidenav menu item',
  CloseMenuItem = '[Layout] Open sidenav menu item'
}

export class AddMenuItem implements Action {
  readonly type = MenuItemActionTypes.AddMenuItem;

  constructor(public payload: { id: string }) {
  }
}

export class RemoveMenuItem implements Action {
  readonly type = MenuItemActionTypes.RemoveMenuItem;

  constructor(public payload: { id: string }) {
  }
}

export class OpenMenuItem implements Action {
  readonly type = MenuItemActionTypes.OpenMenuItem;

  constructor(public payload: { id: string }) {
  }
}

export class CloseMenuItem implements Action {
  readonly type = MenuItemActionTypes.CloseMenuItem;

  constructor(public payload: { id: string }) {
  }
}

export type MenuItemActions = OpenMenuItem | CloseMenuItem | AddMenuItem | RemoveMenuItem;

import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open sidenav',
  CloseSidenav = '[Layout] Close sidenav'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
}

export type LayoutActions = OpenSidenav | CloseSidenav;

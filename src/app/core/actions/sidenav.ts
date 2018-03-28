import { Action } from '@ngrx/store';

export enum SidenavActionTypes {
  OpenSidenav = '[Layout] Open sidenav',
  CloseSidenav = '[Layout] Close sidenav'
}

export class OpenSidenav implements Action {
  readonly type = SidenavActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = SidenavActionTypes.CloseSidenav;
}

export type SidenavActions = OpenSidenav | CloseSidenav;

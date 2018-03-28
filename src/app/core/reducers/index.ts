import * as fromSidenav from './sidenav';
import * as fromMenuItem from './menu-item';
import * as fromRoot from '../../reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface LayoutState {
  menuItem: fromMenuItem.State;
  sidenav: fromSidenav.State;
}

export interface State extends fromRoot.State {
  layout: LayoutState;
}

export const getLayoutState = createFeatureSelector<LayoutState>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  (state: LayoutState) => state.sidenav.showSidenav
);

export const getMenuItemEntities = createSelector(
  getLayoutState,
  (state: LayoutState) => state.menuItem.entities
);

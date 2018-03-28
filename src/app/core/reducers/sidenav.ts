import { SidenavActions, SidenavActionTypes } from '../actions/sidenav';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false
};

export function reducer(state: State = initialState, action: SidenavActions): State {
  switch (action.type) {
    case SidenavActionTypes.CloseSidenav:
      return { showSidenav: false };

    case SidenavActionTypes.OpenSidenav:
      return { showSidenav: true };

    default:
      return state;
  }
}


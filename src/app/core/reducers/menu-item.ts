import {MenuItemActions, MenuItemActionTypes} from '../actions/menu-item';
import {MenuItem} from '../models/menu-item';

export interface State {
  entities: MenuItem[];
}

const initialState: State = {
  entities: []
};

export function reducer(state: State = initialState, action: MenuItemActions): State {
  switch (action.type) {
    case MenuItemActionTypes.CloseMenuItem: {
      return {
        ...state,
        entities: state.entities.map(x => x.id === action.payload.id ? {id: x.id, isOpen: false} : x)
      };
    }

    case MenuItemActionTypes.OpenMenuItem: {
      return {
        ...state,
        entities: state.entities.map(x => x.id === action.payload.id ? {id: x.id, isOpen: true} : x)
      };
    }

    case MenuItemActionTypes.AddMenuItem: {
      return {
        ...state,
        entities: state.entities.concat({id: action.payload.id, isOpen: true})
      };
    }

    case MenuItemActionTypes.RemoveMenuItem: {
      return {
        ...state,
        entities: state.entities.filter(x => x.id !== action.payload.id)
      };
    }

    default: {
      return state;
    }
  }

}


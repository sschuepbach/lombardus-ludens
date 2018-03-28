import {SearchTermActions, UPDATE_SEARCHTERM} from '../actions/search-term';

export interface State {
  searchTerm: string;
}

export const initialState: State = {
  searchTerm: ''
};

export function reducer(state: State = initialState, action: SearchTermActions): State {
  switch (action.type) {
    case UPDATE_SEARCHTERM: {
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      };
    }
    default: {
      return state;
    }
  }
}

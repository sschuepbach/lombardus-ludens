import * as fromFacets from './facets';
import * as fromRoot from '../../reducers';
import * as fromSearchTerm from './search-term';
import {ActionReducerMap} from '@ngrx/store';

export interface FiltersState {
  facets: fromFacets.State;
  searchTerm: fromSearchTerm.State;
}

export interface State extends fromRoot.State {
  filters: FiltersState;
}

export const reducers: ActionReducerMap<FiltersState> = {
  facets: fromFacets.reducer,
  searchTerm: fromSearchTerm.reducer
};

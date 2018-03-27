import { Action } from '@ngrx/store';

export const UPDATE_SEARCHTERM = '[Filter] Search term update';

export class SearchTermUpdateAction implements Action {
  readonly type = UPDATE_SEARCHTERM;

  constructor(public payload: { searchTerm: string }) {}
}

export type SearchTermActions = SearchTermUpdateAction;

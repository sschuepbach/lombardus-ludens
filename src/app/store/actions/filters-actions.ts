import { Action } from '@ngrx/store';

export const UPDATE_AFFILIATION = '[Filter] Affiliation update';
export const UPDATE_PERIOD = '[Filter] Period update';
export const UPDATE_SEARCHTERM = '[Filter] Searchterm update';

export class AffiliationUpdateAction implements Action {
  readonly type = UPDATE_AFFILIATION;

  constructor(public payload: { affiliation: any }) {}
}

export class PeriodUpdateAction implements Action {
  readonly type = UPDATE_PERIOD;

  constructor(public payload: { period: any }) {}
}

export class SearchTermUpdateAction implements Action {
  readonly type = UPDATE_SEARCHTERM;

  constructor(public payload: { searchTerm: string }) {}
}

export type FilterActions = AffiliationUpdateAction | PeriodUpdateAction | SearchTermUpdateAction;

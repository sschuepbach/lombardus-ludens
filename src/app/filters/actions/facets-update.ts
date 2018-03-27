import { Action } from '@ngrx/store';

export const ADD_AFFILIATION = '[Filter] Add affiliation';
export const REMOVE_AFFILIATION = '[Filter] Remove affiliation';
export const ADD_PERIOD = '[Filter] Add period';
export const REMOVE_PERIOD = '[Filter] Remove period';

export class AddAffiliationAction implements Action {
  readonly type = ADD_AFFILIATION;

  constructor(public payload: { affiliation: string }) {}
}

export class RemoveAffiliationAction implements Action {
  readonly type = REMOVE_AFFILIATION;

  constructor(public payload: { affiliation: string }) {}
}

export class AddPeriodAction implements Action {
  readonly type = ADD_PERIOD;

  constructor(public payload: { period: string }) {}
}

export class RemovePeriodAction implements Action {
  readonly type = REMOVE_PERIOD;

  constructor(public payload: { period: string }) {}
}


export type FacetsActions
  = AddAffiliationAction
  | RemoveAffiliationAction
  | AddPeriodAction
  | RemovePeriodAction;

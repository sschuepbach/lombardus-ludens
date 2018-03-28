import { Action } from '@ngrx/store';

export const SET_AFFILIATION = '[Filter] Add affiliation';
export const UNSET_AFFILIATION = '[Filter] Remove affiliation';
export const SET_PERIOD = '[Filter] Add period';
export const UNSET_PERIOD = '[Filter] Remove period';

export class AddAffiliationAction implements Action {
  readonly type = SET_AFFILIATION;

  constructor(public payload: { affiliation: string }) {}
}

export class RemoveAffiliationAction implements Action {
  readonly type = UNSET_AFFILIATION;

  constructor(public payload: { affiliation: string }) {}
}

export class AddPeriodAction implements Action {
  readonly type = SET_PERIOD;

  constructor(public payload: { period: string }) {}
}

export class RemovePeriodAction implements Action {
  readonly type = UNSET_PERIOD;

  constructor(public payload: { period: string }) {}
}


export type FacetsActions
  = AddAffiliationAction
  | RemoveAffiliationAction
  | AddPeriodAction
  | RemovePeriodAction;

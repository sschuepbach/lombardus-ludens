import { FilterActions, UPDATE_AFFILIATION, UPDATE_PERIOD, UPDATE_SEARCHTERM } from '../actions/filters-actions';

export interface PeriodFiltersState {
  f1150: boolean;
  f1250: boolean;
  f1300: boolean;
  f1330: boolean;
  f1360: boolean;
  f1400: boolean;
  f1500: boolean;
  discarded: boolean;
  uncertain: boolean;
  none: boolean;
}

export interface AffiliationFiltersState {
  Albertist: boolean;
  Humanist: boolean;
  Nominalist: boolean;
  OCarm: boolean;
  OCarth: boolean;
  OCist: boolean;
  OESA: boolean;
  OFM: boolean;
  OP: boolean;
  OSB: boolean;
  Scotist: boolean;
  Secular: boolean;
  none: boolean;
}

export interface FiltersState {
  period: PeriodFiltersState;
  affiliation: AffiliationFiltersState;
  searchTerm: string;
}

const initialFiltersState: FiltersState = {
  searchTerm: '',
  period: {
    f1150: true,
    f1250: true,
    f1300: true,
    f1330: true,
    f1360: true,
    f1400: true,
    f1500: true,
    discarded: true,
    uncertain: true,
    none: true
  },
  affiliation: {
    Albertist: true,
    Humanist: true,
    Nominalist: true,
    OCarm: true,
    OCarth: true,
    OCist: true,
    OESA: true,
    OFM: true,
    OP: true,
    OSB: true,
    Scotist: true,
    Secular: true,
    none: true
  }
};

export function filterReducer(state: FiltersState = initialFiltersState, action: FilterActions): FiltersState {
  switch (action.type) {

    case UPDATE_AFFILIATION: {
      return {
        ...state,
        period: action.payload.period
      };
    }

    case UPDATE_PERIOD: {
      return {
        ...state,
        affiliation: action.payload.affiliation
      };
    }

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

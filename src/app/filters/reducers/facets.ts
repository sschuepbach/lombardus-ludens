import {FacetsActions, SET_AFFILIATION, SET_PERIOD} from '../actions/facets';

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

export interface State {
  period: PeriodFiltersState;
  affiliation: AffiliationFiltersState;
}

const initialState: State = {
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

export function reducer(state: State = initialState, action: FacetsActions): State {
  switch (action.type) {

    case ADD_AFFILIATION: {
      // noinspection TypeScriptUnresolvedVariable
      return {
        ...state,
        affiliation: Object.keys(state.affiliation)
          .map(x => x === action.payload.affiliation ? {x: true} : {x: state.affiliation[x]})
      };
    }

    case REMOVE_AFFILIATION: {
      // noinspection TypeScriptUnresolvedVariable
      return {
        ...state,
        affiliation: Object.keys(state.affiliation)
          .map(x => x === action.payload.affiliation ? {x: false} : {x: state.affiliation[x]})
      };
    }

    case ADD_PERIOD: {
      // noinspection TypeScriptUnresolvedVariable
      return {
        ...state,
        period: Object.keys(state.period)
          .map(x => x === action.payload.period ? {x: true} : {x: state.period[x]})
      };
    }

    case REMOVE_PERIOD: {
      // noinspection TypeScriptUnresolvedVariable
      return {
        ...state,
        period: Object.keys(state.period)
          .map(x => x === action.payload.period ? {x: false} : {x: state.period[x]})
      };
    }

    default: {
      return state;
    }
  }
}

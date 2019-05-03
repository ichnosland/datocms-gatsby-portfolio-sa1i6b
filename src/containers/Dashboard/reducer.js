import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  DASHBOARD_LIVELLI_FETCH,
  DASHBOARD_LIVELLI_SET,
  DASHBOARD_UNITA_FILTRA,
  DASHBOARD_SPINNER_SET,
  DASHBOARD_LIVELLI_RESET,
  DASHBOARD_MENUEGG_SET,
  DASHBOARD_SEARCHACTIVE_SET,
  DASHBOARD_LIVELLI_ISLOADING_SET,
} from './constants';


function livelliReducer(state = fromJS([]), action) {
  switch (action.type) {
    case DASHBOARD_LIVELLI_FETCH:
      return state;

    case DASHBOARD_LIVELLI_SET:
      return action.payload;

    case DASHBOARD_LIVELLI_RESET:
      return fromJS([]);

    default:
      return state;
  }
}

function filtroUnitaReducer(state = fromJS(''), action) {
  switch (action.type) {
    case DASHBOARD_UNITA_FILTRA:
      return action.filtro;

    case DASHBOARD_LIVELLI_RESET:
      return fromJS('');

    default:
      return state;
  }
}

function spinnerReducer(state = fromJS(true), action) {
  switch (action.type) {
    case DASHBOARD_SPINNER_SET:
      return action.payload;

    case DASHBOARD_LIVELLI_RESET:
      return fromJS(true);

    default:
      return state;
  }
}

function menuEggReducer(state = fromJS(''), action) {
  switch (action.type) {
    case DASHBOARD_MENUEGG_SET:
      return action.value;

    default:
      return state;
  }
}

function searchActiveReducer(state = fromJS(false), action) {
  switch (action.type) {
    case DASHBOARD_SEARCHACTIVE_SET:
      return action.value;

    default:
      return state;
  }
}

function isLoadingReducer(state = fromJS(false), action) {
  switch (action.type) {
    case DASHBOARD_LIVELLI_ISLOADING_SET:
      return action.value;

    default:
      return state;
  }
}

const dashboardReducer = combineReducers({
  livelli: livelliReducer,
  filterUnita: filtroUnitaReducer,
  spinner: spinnerReducer,
  menuEggStatus: menuEggReducer,
  searchActive: searchActiveReducer,
  isLoading: isLoadingReducer,
});

export default dashboardReducer;

/*
 *
 * Corsi reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  CORSI_RESET,
  CORSI_ERROR_SET,
  CORSI_ERROR_RESET,
  CORSI_SPINNER_SET,
  CORSI_LIST_SET,
  CORSI_CORSO_DETAIL_DOCENTE_SET,
} from './constants';

export const defaultCorsiList = fromJS({
  items: [],
  isCorsiLoaded: false,
});

export const defaultcorsoSelezionato = fromJS({
  isCorsoLoaded: false,
  isIscrittiLoaded: false,
  pk: 0,
  nome: '',
  iscritti: [],
});

export const defaultCorsiError = fromJS({
  hasErrors: false,
  errorMessage: '',
  errorData: {},
});

function corsiSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case CORSI_RESET:
    case CORSI_ERROR_SET:
      return fromJS(false);

    case CORSI_SPINNER_SET:
      return fromJS(action.enable);
  }
}

function corsiAttiviReducer(state = defaultCorsiList, action) {
  switch (action.type) {
    case CORSI_RESET:
      return defaultCorsiList;

    case CORSI_LIST_SET:
      return state.merge(action.payload);

    default:
      return state;
  }
}

function corsoSelezionatoReducer(state = defaultcorsoSelezionato, action) {
  switch (action.type) {
    case CORSI_RESET:
      return defaultcorsoSelezionato;

    case CORSI_CORSO_DETAIL_DOCENTE_SET:
      return state.merge(action.payload);

    default:
      return state;
  }
}

function corsiErrorReducer(state = defaultCorsiError, action) {
  switch (action.type) {
    default:
      return state;

    case CORSI_ERROR_SET:
      return state.merge({
        hasErrors: action.enable,
        errorMessage: action.message,
        errorData: action.errorData,
      });

    case CORSI_ERROR_RESET:
      return defaultCorsiError;
  }
}

const corsiReducer = combineReducers({
  spinner: corsiSpinnerReducer,
  corsiAttivi: corsiAttiviReducer,
  corsoSelezionato: corsoSelezionatoReducer,
  error: corsiErrorReducer,
});

export default corsiReducer;

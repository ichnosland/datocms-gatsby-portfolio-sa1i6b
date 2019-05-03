/*
 *
 * Lezione reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  LEZIONE_DATA_SET,
  LEZIONE_DATA_RESET,
  LEZIONE_ERROR_RESET,
  LEZIONE_ERROR_SET,
  LEZIONE_SPINNER_SET,
} from './constants';

export const defaultLezioneError = fromJS({
  hasErrors: false,
  errorMessage: '',
  errorData: {},
});

export const defaultTestoAttivo = fromJS({
  titolo: '',
  contenuto: [],
  tabelle: [],
  pubblicata: false,
  unitaId: 0,
});

function lezioneSpinnerReducer(state = fromJS(true), action) {
  switch (action.type) {
    default:
      return state;

    case LEZIONE_ERROR_SET:
      return fromJS(false);

    case LEZIONE_SPINNER_SET:
      return fromJS(action.enable);
  }
}

function lezioneDataReducer(state = defaultTestoAttivo, action) {
  switch (action.type) {
    case LEZIONE_DATA_RESET:
      return defaultTestoAttivo;

    case LEZIONE_DATA_SET:
      return state.merge(action.payload);

    default:
      return state;
  }
}

function lezioneErrorReducer(state = defaultLezioneError, action) {
  switch (action.type) {
    default:
      return state;

    case LEZIONE_ERROR_SET:
      return state.merge({
        hasErrors: action.enable,
        errorMessage: action.message,
        errorData: action.errorData,
      });

    case LEZIONE_ERROR_RESET:
      return defaultLezioneError;
  }
}

const lezioneReducer = combineReducers({
  spinner: lezioneSpinnerReducer,
  testoData: lezioneDataReducer,
  error: lezioneErrorReducer,
});

export default lezioneReducer;

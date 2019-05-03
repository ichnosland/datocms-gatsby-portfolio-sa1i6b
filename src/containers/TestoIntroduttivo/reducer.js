/*
 *
 * TestoIntroduttivo reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  TESTOINTRODUTTIVO_DATA_SET,
  TESTOINTRODUTTIVO_DATA_RESET,
  TESTOINTRODUTTIVO_ERROR_RESET,
  TESTOINTRODUTTIVO_ERROR_SET,
  TESTOINTRODUTTIVO_SPINNER_SET,
} from './constants';

export const defaultTestoIntroduttivoError = fromJS({
  hasErrors: false,
  errorMessage: '',
  errorData: {},
});

export const defaultTestoAttivo = fromJS({
  titolo: '',
  testo: '',
});

function testoIntroduttivoSpinnerReducer(state = fromJS(true), action) {
  switch (action.type) {
    default:
      return state;

    case TESTOINTRODUTTIVO_ERROR_SET:
      return fromJS(false);

    case TESTOINTRODUTTIVO_SPINNER_SET:
      return fromJS(action.enable);
  }
}

function testoIntroduttivoDataReducer(state = defaultTestoAttivo, action) {
  switch (action.type) {
    case TESTOINTRODUTTIVO_DATA_RESET:
      return defaultTestoAttivo;

    case TESTOINTRODUTTIVO_DATA_SET:
      return state.merge(action.payload);

    default:
      return state;
  }
}

function testoIntroduttivoErrorReducer(state = defaultTestoIntroduttivoError, action) {
  switch (action.type) {
    default:
      return state;

    case TESTOINTRODUTTIVO_ERROR_SET:
      return state.merge({
        hasErrors: action.enable,
        errorMessage: action.message,
        errorData: action.errorData,
      });

    case TESTOINTRODUTTIVO_ERROR_RESET:
      return defaultTestoIntroduttivoError;
  }
}

const testoIntroduttivoReducer = combineReducers({
  spinner: testoIntroduttivoSpinnerReducer,
  testoData: testoIntroduttivoDataReducer,
  error: testoIntroduttivoErrorReducer,
});

export default testoIntroduttivoReducer;

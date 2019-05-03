/*
 *
 * App user reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { setAuthorizationToken } from 'common/authorization';
import { APP_AUTH_TOKEN } from 'configuration';

import {
  USER_FETCH_DATA,
  USER_SET_DATA,
  USER_SPINNER_SET,
  USER_ERROR_SET,
  USER_ERROR_CLEAN,
  USER_LOGOUT_SET,
} from './constants';

const mockToken = APP_AUTH_TOKEN ? `Token ${APP_AUTH_TOKEN}` : '';

/**
 * Accrocchio per far funzionare le app senza login, in particolar
 * modo i creaverifiche.
 * TODO: va rimossa quando tutti avranno il login attivo
 */
if (mockToken) {
  setAuthorizationToken(mockToken);
}

export const defaultAuthentication = fromJS({
  logged: !!mockToken, // TODO: false con creaverifiche login attivo per tutti
  isDataSynced: !!mockToken, // TODO: false con creaverifiche login attivo per tutti
  isUpdating: false,
  status: '',
  authorizationToken: mockToken, // TODO: vuoto con creaverifiche login attivo per tutti
  codiceSbloccato: false,
  codiceDaSbloccare: false,
});

export const defaultAppData = fromJS({
  docente: false,
  enableSuoni: false,
  hints: {},
  premiumDataScadenza: undefined,
});

export const defaultErrorSettings = fromJS({
  hasErrors: false,
  errorMessage: '',
  errorData: undefined,
  tipologia: 'error',
});

export const defaultAnagraphicsSettings = fromJS({
  email: '',
  first_name: '',
  last_name: '',
  id: 0,
  studenteAcademy: {},
});

function userAnagraphicsReducer(state = defaultAnagraphicsSettings, action) {
  switch (action.type) {
    case USER_FETCH_DATA:
      return state;

    case USER_SET_DATA:
      return state.merge(action.payload.anagraphics);

    case USER_LOGOUT_SET:
      return defaultAnagraphicsSettings;

    default:
      return state;
  }
}

function userAuthenticationReducer(state = defaultAuthentication, action) {
  switch (action.type) {
    case USER_SET_DATA:
      return state.merge(action.payload.authentication);

    case USER_LOGOUT_SET:
      return defaultAuthentication;

    default:
      return state;
  }
}

function userAppDataReducer(state = defaultAppData, action) {
  switch (action.type) {
    case USER_SET_DATA:
      return state.merge(action.payload.appData);

    case USER_LOGOUT_SET:
      return defaultAppData;

    default:
      return state;
  }
}

function userSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case USER_ERROR_SET:
      return fromJS(false);

    case USER_SPINNER_SET:
      return action.payload;
  }
}

function userErrorReducer(state = defaultErrorSettings, action) {
  switch (action.type) {
    default:
      return state;

    case USER_ERROR_SET:
      return state.merge({
        hasErrors: true,
        errorMessage: action.message,
        errorData: action.errorData,
        tipologia: action.tipologia,
      });

    case USER_ERROR_CLEAN:
      return defaultErrorSettings;
  }
}

const userReducer = combineReducers({
  anagraphics: userAnagraphicsReducer,
  authentication: userAuthenticationReducer,
  appData: userAppDataReducer,
  spinner: userSpinnerReducer,
  error: userErrorReducer,
});

export default userReducer;

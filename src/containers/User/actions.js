/*
 *
 * App user actions
 *
 */

import {
  USER_FETCH_DATA,
  USER_SET_DATA,
  USER_CODICE_SBLOCCO_FETCH,
  USER_SPINNER_SET,
  USER_ERROR_SET,
  USER_ERROR_CLEAN,
  USER_RESUME_TRIGGER,
  USER_EVALUATE_TRIGGER,
  USER_LOGOUT_SET,
  USER_LOGOUT_TRIGGER,
  USER_REGISTER_POST,
  USER_REGISTER_COMPLETE_POST,
  USER_HINT_DISPLAY,
  USER_CHANGE_PASSWORD_POST,
  USER_RESET_PASSWORD_POST,
  USER_CONFIRM_NEW_PASSWORD_POST,
  USER_NOTIFICHE_FETCH,
} from './constants';

export function userDataFetch(loginData, configuration, history, isFacebook = false, dispatch) {
  return {
    type: USER_FETCH_DATA,
    loginData,
    configuration,
    history,
    isFacebook,
    dispatch,
  };
}

export function userEvaluateTrigger(configuration, dispatch) {
  return {
    type: USER_EVALUATE_TRIGGER,
    configuration,
    dispatch,
  };
}

export function userDataSet(payload) {
  return {
    type: USER_SET_DATA,
    payload,
  };
}

export function userCodiceSbloccoFetch(disciplinaId) {
  return {
    type: USER_CODICE_SBLOCCO_FETCH,
    disciplinaId,
  };
}

export function userRegistrationPost(payload) {
  return {
    type: USER_REGISTER_POST,
    payload,
  };
}

export function userRegistrationCompletePost(payload) {
  return {
    type: USER_REGISTER_COMPLETE_POST,
    payload,
  };
}

export function userErrorSet(enable = true, message = '', errorData = {}, tipologia = 'error') {
  return {
    type: USER_ERROR_SET,
    enable,
    message,
    errorData,
    tipologia,
  };
}

export function userSpinnerSet(payload) {
  return {
    type: USER_SPINNER_SET,
    payload,
  };
}

export function userErrorClean() {
  return {
    type: USER_ERROR_CLEAN,
  };
}

export function userResumeTrigger(payload) {
  return {
    type: USER_RESUME_TRIGGER,
    payload,
  };
}

export function userLogoutTrigger(payload) {
  return {
    type: USER_LOGOUT_TRIGGER,
    payload,
  };
}

export function userLogoutSet() {
  return {
    type: USER_LOGOUT_SET,
  };
}

export function userHintDisplay(payload) {
  return {
    type: USER_HINT_DISPLAY,
    payload,
  };
}

export function userChangePassword(payload) {
  return {
    type: USER_CHANGE_PASSWORD_POST,
    payload,
  };
}

export function userResetPassword(payload) {
  return {
    type: USER_RESET_PASSWORD_POST,
    payload,
  };
}

export function userConfirmNewPasswordPost(payload) {
  return {
    type: USER_CONFIRM_NEW_PASSWORD_POST,
    payload,
  };
}

export function userNotificheFetch(payload) {
  return {
    type: USER_NOTIFICHE_FETCH,
    payload,
  };
}

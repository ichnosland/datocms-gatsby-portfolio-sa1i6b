/*
 *
 * SbloccaCodice reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  SBLOCCACODICE_SPINNER_SET,
  SBLOCCACODICE_FEEDBACK_SET,
  SBLOCCACODICE_FEEDBACK_RESET,
  SBLOCCACODICE_ACQUISTA_SET,
  SBLOCCACODICE_ACQUISTA_RESET,
} from './constants';

export const defaultSbloccaCodiceFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultSbloccaCodicePaypal = fromJS({
  prodottiDisponibili: [],
  display: false,
  isLoaded: false,
});

function sbloccaCodiceSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case SBLOCCACODICE_FEEDBACK_SET:
      return fromJS(false);

    case SBLOCCACODICE_SPINNER_SET:
      return fromJS(action.enable);
  }
}

function sbloccaCodiceFeedbackReducer(state = defaultSbloccaCodiceFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case SBLOCCACODICE_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case SBLOCCACODICE_FEEDBACK_RESET:
      return defaultSbloccaCodiceFeedback;
  }
}

function sbloccaCodicePaypalReducer(state = defaultSbloccaCodicePaypal, action) {
  switch (action.type) {
    default:
      return state;

    case SBLOCCACODICE_ACQUISTA_SET:
      return state.merge(action.payload);

    case SBLOCCACODICE_ACQUISTA_RESET:
      return defaultSbloccaCodicePaypal;
  }
}

const sbloccaCodiceReducer = combineReducers({
  spinner: sbloccaCodiceSpinnerReducer,
  feedback: sbloccaCodiceFeedbackReducer,
  paypal: sbloccaCodicePaypalReducer,
});

export default sbloccaCodiceReducer;

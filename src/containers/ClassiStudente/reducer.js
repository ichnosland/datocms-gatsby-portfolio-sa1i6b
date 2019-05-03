/*
 *
 * ClassiStudente reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  CLASSI_STUDENTE_SPINNER_SET,
  CLASSI_STUDENTE_FEEDBACK_SET,
  CLASSI_STUDENTE_FEEDBACK_RESET,
  CLASSI_STUDENTE_SET,
  CLASSI_STUDENTE_RESET,
} from './constants';

export const defaultClassiStudenteState = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

function classiStudenteSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case CLASSI_STUDENTE_FEEDBACK_SET:
      return fromJS(false);

    case CLASSI_STUDENTE_SPINNER_SET:
      return fromJS(action.enable);
  }
}

function classiStudenteFeedbackReducer(state = defaultClassiStudenteState, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSI_STUDENTE_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case CLASSI_STUDENTE_FEEDBACK_RESET:
      return defaultClassiStudenteState;
  }
}

function classiStudenteListReducer(state = fromJS([]), action) {
  switch (action.type) {
    default:
      return state;

    case CLASSI_STUDENTE_SET:
      return state.merge(action.payload);

    case CLASSI_STUDENTE_RESET:
      return fromJS([]);
  }
}

const classiStudenteReducer = combineReducers({
  spinner: classiStudenteSpinnerReducer,
  feedback: classiStudenteFeedbackReducer,
  list: classiStudenteListReducer,
});

export default classiStudenteReducer;

/*
 *
 * Classi reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  CLASSI_DATA_SET,
  CLASSI_DATA_RESET,
  CLASSI_FEEDBACK_RESET,
  CLASSI_FEEDBACK_SET,
  CLASSI_SPINNER_SET,
} from './constants';

export const defaultClassiError = fromJS({
  hasErrors: false,
  errorMessage: '',
  errorData: {},
});

function classiSpinnerReducer(state = fromJS(true), action) {
  switch (action.type) {
    default:
      return state;

    case CLASSI_FEEDBACK_SET:
      return fromJS(false);

    case CLASSI_SPINNER_SET:
      return fromJS(action.enable);
  }
}

function classiDataReducer(state = fromJS([]), action) {
  switch (action.type) {
    case CLASSI_DATA_RESET:
      return fromJS([]);

    case CLASSI_DATA_SET:
      return state.merge(action.payload);

    default:
      return state;
  }
}

function classiErrorReducer(state = defaultClassiError, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSI_FEEDBACK_SET:
      return state.merge({
        hasErrors: action.enable,
        errorMessage: action.message,
        errorData: action.errorData,
      });

    case CLASSI_FEEDBACK_RESET:
      return defaultClassiError;
  }
}

const classiReducer = combineReducers({
  spinner: classiSpinnerReducer,
  classiData: classiDataReducer,
  error: classiErrorReducer,
});

export default classiReducer;

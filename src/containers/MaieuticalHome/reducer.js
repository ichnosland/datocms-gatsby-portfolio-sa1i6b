/*
 *
 * MaieuticalHome reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SEND_TICKET_ERROR,
  SEND_TICKET_SUCCESS,
  SEND_TICKET,
} from './constants';

export const defaultState = fromJS({
  spinner: false,
  errorMessage: '',
  confirmMessage: '',
});

function homeReducer(state = defaultState, action) {
  switch (action.type) {
    case SEND_TICKET_SUCCESS:
      return state.merge({
        errorMessage: '',
        confirmMessage: action.message,
        spinner: false,
      });
    case SEND_TICKET_ERROR:
      return state.merge({
        errorMessage: action.message,
        confirmMessage: '',
        spinner: false,
      });
    case SEND_TICKET:
      return state.merge({
        errorMessage: '',
        confirmMessage: '',
        spinner: true,
      });
    default:
      return state;
  }
}

export default homeReducer;

/*
 *
 * ZendeskTicket reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  ZENDESK_TICKET_DATA_RESET,
  ZENDESK_TICKET_SPINNER_SET,
  ZENDESK_TICKET_FEEDBACK_SET,
  ZENDESK_TICKET_FEEDBACK_RESET,
} from './constants';

export const defaultZendeskFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

function zendeskTicketSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case ZENDESK_TICKET_SPINNER_SET:
      return action.enabled;

    case ZENDESK_TICKET_DATA_RESET:
      return fromJS(false);
  }
}

function zendeskTicketFeedbackReducer(state = defaultZendeskFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case ZENDESK_TICKET_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case ZENDESK_TICKET_FEEDBACK_RESET:
    case ZENDESK_TICKET_DATA_RESET:
      return defaultZendeskFeedback;
  }
}

const zendeskTicketReducer = combineReducers({
  spinner: zendeskTicketSpinnerReducer,
  feedback: zendeskTicketFeedbackReducer,
});

export default zendeskTicketReducer;

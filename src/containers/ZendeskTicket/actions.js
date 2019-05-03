/*
 *
 * ZendeskTicket actions
 *
 */

import {
  ZENDESK_TICKET_DATA_POST,
  ZENDESK_TICKET_DATA_RESET,
  ZENDESK_TICKET_SPINNER_SET,
  ZENDESK_TICKET_FEEDBACK_SET,
  ZENDESK_TICKET_FEEDBACK_RESET,
} from './constants';

export const zendeskTicketDataPost = (payload) => ({
  type: ZENDESK_TICKET_DATA_POST,
  payload,
});

export const zendeskTicketDataReset = () => ({
  type: ZENDESK_TICKET_DATA_RESET,
});

export const zendeskTicketSpinnerSet = (enabled) => ({
  type: ZENDESK_TICKET_SPINNER_SET,
  enabled,
});

export const zendeskTicketFeedbackSet = (enable, tipologia, messaggio) => ({
  type: ZENDESK_TICKET_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const zendeskTicketFeedbackReset = () => ({
  type: ZENDESK_TICKET_FEEDBACK_RESET,
});

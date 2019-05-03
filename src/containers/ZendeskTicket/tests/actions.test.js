
import {
  zendeskTicketDataPost,
  zendeskTicketDataReset,
  zendeskTicketSpinnerSet,
  zendeskTicketFeedbackSet,
  zendeskTicketFeedbackReset,
} from '../actions';
import {
  ZENDESK_TICKET_DATA_POST,
  ZENDESK_TICKET_DATA_RESET,
  ZENDESK_TICKET_SPINNER_SET,
  ZENDESK_TICKET_FEEDBACK_SET,
  ZENDESK_TICKET_FEEDBACK_RESET,
} from '../constants';

describe('ZendeskTicket actions', () => {
  it('has a type of ZENDESK_TICKET_DATA_POST', () => {
    const expected = {
      type: ZENDESK_TICKET_DATA_POST,
      payload: { data: 123 },
    };
    expect(zendeskTicketDataPost({ data: 123 })).toEqual(expected);
  });

  it('has a type of ZENDESK_TICKET_DATA_POST', () => {
    const expected = {
      type: ZENDESK_TICKET_DATA_POST,
      payload: { data: 123 },
    };
    expect(zendeskTicketDataPost({ data: 123 })).toEqual(expected);
  });

  it('has a type of ZENDESK_TICKET_DATA_RESET', () => {
    const expected = {
      type: ZENDESK_TICKET_DATA_RESET,
    };
    expect(zendeskTicketDataReset()).toEqual(expected);
  });

  it('has a type of ZENDESK_TICKET_SPINNER_SET', () => {
    const expected = {
      type: ZENDESK_TICKET_SPINNER_SET,
      enabled: true,
    };
    expect(zendeskTicketSpinnerSet(true)).toEqual(expected);
  });

  it('has a type of ZENDESK_TICKET_FEEDBACK_RESET', () => {
    const expected = {
      type: ZENDESK_TICKET_FEEDBACK_RESET,
    };
    expect(zendeskTicketFeedbackReset()).toEqual(expected);
  });

  it('has a type of ZENDESK_TICKET_FEEDBACK_SET', () => {
    const expected = {
      type: ZENDESK_TICKET_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(zendeskTicketFeedbackSet(
      true,
      'tipologia',
      'messaggio'
    )).toEqual(expected);
  });
});

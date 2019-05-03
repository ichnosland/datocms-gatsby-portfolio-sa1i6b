
import { fromJS } from 'immutable';
import zendeskTicketReducer, { defaultZendeskFeedback } from '../reducer';
import {
  zendeskTicketFeedbackSet,
  zendeskTicketSpinnerSet,
  zendeskTicketFeedbackReset,
  zendeskTicketDataReset,
} from '../actions';

describe('zendeskTicketReducer', () => {
  it('restituisce il suo stato iniziale', () => {
    expect(zendeskTicketReducer(undefined, {})).toEqual(fromJS({
      spinner: false,
      feedback: defaultZendeskFeedback,
    }));
  });

  it('controllo lo state dopo ZENDESK_TICKET_FEEDBACK_SET', () => {
    expect(zendeskTicketReducer(undefined, zendeskTicketFeedbackSet(
      true, 'tipologia', 'messaggio'
    ))).toEqual(fromJS({
      spinner: false,
      feedback: fromJS({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
    }));
  });

  it('controllo lo state dopo ZENDESK_TICKET_FEEDBACK_RESET', () => {
    expect(zendeskTicketReducer(fromJS({
      spinner: true,
      feedback: fromJS({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
    }), zendeskTicketFeedbackReset())).toEqual(fromJS({
      spinner: true,
      feedback: defaultZendeskFeedback,
    }));
  });

  it('controllo lo state dopo ZENDESK_TICKET_DATA_RESET', () => {
    expect(zendeskTicketReducer(fromJS({
      spinner: true,
      feedback: fromJS({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
    }), zendeskTicketDataReset())).toEqual(fromJS({
      spinner: false,
      feedback: defaultZendeskFeedback,
    }));
  });

  it('controllo lo state dopo ZENDESK_TICKET_SPINNER_SET', () => {
    expect(zendeskTicketReducer(fromJS({
      spinner: false,
      feedback: defaultZendeskFeedback,
    }), zendeskTicketSpinnerSet(true))).toEqual(fromJS({
      spinner: true,
      feedback: defaultZendeskFeedback,
    }));
  });
});

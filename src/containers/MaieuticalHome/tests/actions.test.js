
import {
  SEND_TICKET,
  SEND_TICKET_ERROR,
  SEND_TICKET_SUCCESS,
} from '../constants';

import {
  sendTicket,
  sendTicketSuccess,
  sendTicketError,
} from '../actions';

describe('SendTicket', () => {
  it('should return the correct payload', () => {
    const payload = {
      data: 1234,
    };
    const expectedResult = {
      type: SEND_TICKET,
      payload,
    };

    expect(sendTicket(payload)).toEqual(expectedResult);
  });
});

describe('sendTicketSuccess', () => {
  it('should return the correct message', () => {
    const message = 'feedback message';
    const expectedResult = {
      type: SEND_TICKET_SUCCESS,
      message,
    };

    expect(sendTicketSuccess(message)).toEqual(expectedResult);
  });
});

describe('SendTicketError', () => {
  it('should return the correct message', () => {
    const message = 'feedback error';
    const expectedResult = {
      type: SEND_TICKET_ERROR,
      message,
    };

    expect(sendTicketError(message)).toEqual(expectedResult);
  });
});

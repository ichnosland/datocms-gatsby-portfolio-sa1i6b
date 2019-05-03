/*
 *
 * MaieuticalHome actions
 *
 */

import {
  SEND_TICKET,
  SEND_TICKET_ERROR,
  SEND_TICKET_SUCCESS,
} from './constants';

export function sendTicket(payload) {
  return {
    type: SEND_TICKET,
    payload,
  };
}

export function sendTicketSuccess(message = 'La tua richiesta è stata inviata con successo, riceverai a breve una risposta') {
  return {
    type: SEND_TICKET_SUCCESS,
    message,
  };
}

export function sendTicketError(message = 'Impossibile inviare il ticket, riprovare più tardi') {
  return {
    type: SEND_TICKET_ERROR,
    message,
  };
}

import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import {
  SEND_TICKET,
  URI_ZENDESK,
} from './constants';
import {
  sendTicketError,
  sendTicketSuccess,
} from './actions';

export const zendeskTicketOptions = {
  tecnico: {
    agent: 767746652,
    defaultTag: 'tecnico',
  },
  contenuto: {
    agent: 781872021,
    defaultTag: 'contenuto',
  },
  comunicazione: {
    agent: 767746652,
    defaultTag: 'comunicazione',
  },
};

export function* sendZendsekTicket(data) {
  const urlZendesk = `${API_BASE_PATH}${URI_ZENDESK}`;
  let messaggioCompleto = data.payload.messaggio;


  if (data.payload.scuola) {
    messaggioCompleto += `\n\nscuola: ${data.payload.scuola}`;
  }
  if (data.payload.ruolo) {
    messaggioCompleto += `\n\nruolo: ${data.payload.ruolo}`;
  }

  const ticketOptions = zendeskTicketOptions.comunicazione;
  const response = yield call(
    axios.post,
    urlZendesk, {
      ticket: {
        subject: ticketOptions.defaultTag,
        tags: ['maieuticallabs', ticketOptions.defaultTag],
        comment: {
          body: messaggioCompleto,
        },
        requester: {
          locale_id: 22,
          name: data.payload.nome,
          email: data.payload.email,
        },
        assignee_id: ticketOptions.agent,
      },
    }
  );

  if (response.status === 201) {
    yield put(sendTicketSuccess());
  } else {
    yield put(sendTicketError());
  }
}

export function* sagasHomepage() {
  yield takeEvery(SEND_TICKET, sendZendsekTicket);
}

export default sagasHomepage;

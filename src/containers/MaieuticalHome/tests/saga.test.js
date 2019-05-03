/**
 * Test  sagas
 */

import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';
import {
  SEND_TICKET,
  URI_ZENDESK,
} from '../constants';
import {
  sendTicketError,
  sendTicketSuccess,
} from '../actions';
import {
  sendZendsekTicket,
  sagasHomepage,
  zendeskTicketOptions,
} from '../saga';
/* eslint-disable redux-saga/yield-effects */
describe('sendZendsekTicket saga', () => {
  const payloadMock = {
    nome: 'nome',
    messaggio: 'testo del messaggio',
    email: 'acme@acme.com',
    scuola: 'Scuola',
    ruolo: 'Ruolo',
  };
  const urlZendesk = `${API_BASE_PATH}${URI_ZENDESK}`;
  const ticketOptions = zendeskTicketOptions.comunicazione;
  const responseMock = {
    ticket: {
      subject: ticketOptions.defaultTag,
      tags: ['maieuticallabs', ticketOptions.defaultTag],
      comment: {
        body: `${payloadMock.messaggio}\n\nscuola: ${payloadMock.scuola}\n\nruolo: ${payloadMock.ruolo}`,
      },
      requester: {
        locale_id: 22,
        name: payloadMock.nome,
        email: payloadMock.email,
      },
      assignee_id: ticketOptions.agent,
    },
  };

  it('sendZendsekTicket saga performs call axios.post', () => {
    const gen = sendZendsekTicket({ payload: payloadMock });
    expect(gen.next().value).toEqual(call(
      axios.post,
      urlZendesk,
      responseMock
    ));
  });

  it('sendZendsekTicket saga performs call axios.post with empty school and role fields', () => {
    const gen = sendZendsekTicket({ payload: { ...payloadMock, scuola: '', ruolo: '' } });
    expect(gen.next().value).toEqual(call(
      axios.post,
      urlZendesk, {
        ticket: { ...responseMock.ticket, comment: { body: payloadMock.messaggio } },
      }
    ));
  });

  it('sendZendsekTicket saga performs sendTicketSuccess action on success', () => {
    const gen = sendZendsekTicket({ payload: payloadMock });
    expect(gen.next().value).toEqual(call(
      axios.post,
      urlZendesk,
      responseMock
    ));

    expect(
      gen.next({ status: 201 }).value
    ).toEqual(put(sendTicketSuccess()));
  });

  it('sendZendsekTicket saga performs homepageSendTicketErrorAction action on falure response', () => {
    const gen = sendZendsekTicket({ payload: payloadMock });
    expect(gen.next().value).toEqual(call(
      axios.post,
      urlZendesk,
      responseMock
    ));

    expect(
      gen.next({ status: 404 }).value
    ).toEqual(put(sendTicketError()));
  });
});

describe('sagasHomepage saga watcher', () => {
  it('on HOMEPAGE_SEND_TICKET action sendZendsekTicket function must be triggered', () => {
    const gen = sagasHomepage();

    expect(gen.next().value).toEqual(takeEvery(
      SEND_TICKET,
      sendZendsekTicket
    ));
  });
});


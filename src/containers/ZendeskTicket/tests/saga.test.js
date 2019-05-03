import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { createZendeskTicketBodyData, createZendeskTicket } from 'common/zendesk';
import {
  zendeskTicketSpinnerSet,
  zendeskTicketFeedbackSet,
} from '../actions';
import { ZENDESK_TICKET_DATA_POST, ZENDESK_URL_DATA_POST } from '../constants';
import watchZendesk, { zendeskTicketDataPost } from '../saga';


/* eslint-disable redux-saga/yield-effects */
describe('zendeskTicketDataPost saga', () => {
  const tipologiaUtente = 'docente';

  const mockData = {
    payload: {
      ticketData: {
        isUserLogged: true,
        isDocente: true,
        nome: 'Pippo Pluto',
        email: 'pippopluto@maieuticallabs.it',
        tipologia: 'tecnico',
        provenienza: 'desktop',
        descrizione: 'descrizione del ticket',
      },
      configuration: {
        disciplinaId: 33,
        product: 'lyceum',
      },
    },
  };

  const bodyTicketData = createZendeskTicketBodyData({
    ...mockData.payload.ticketData,
    tipologiaUtente,
  });

  const ticket = createZendeskTicket({
    ...mockData.payload.ticketData,
    ...bodyTicketData,
    tags: [
      tipologiaUtente,
      mockData.payload.configuration.product,
      mockData.payload.ticketData.tipologia,
      `provenienza_${mockData.payload.ticketData.provenienza}`,
      `disciplina_${mockData.payload.configuration.disciplinaId}`,
    ].filter((tag) => (tag)),
  }, mockData.payload.ticketData.tipologia);

  it('testa il corretto funzionamento quando il fetch dei dati ha successo', () => {
    const gen = zendeskTicketDataPost(mockData);

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${ZENDESK_URL_DATA_POST}`,
      ticket
    ));

    expect(gen.next({ status: 201 }).value).toEqual(put(
      zendeskTicketFeedbackSet(
        true,
        'okay',
        'Il ticket è stato inviato correttamente'
      )
    ));

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(false)
    ));
  });

  it('testa il corretto funzionamento quando i dati del ticket non sono corretti', () => {
    const gen = zendeskTicketDataPost({
      ...mockData,
      payload: {
        ...mockData.payload,
        ticketData: {
          isDocente: false,
          tipologia: 'tecnico',
          provenienza: 'desktop',
          descrizione: 'descrizione del ticket',
        },
      },
    });

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(true)
    ));

    expect(gen.next({ status: 201 }).value).toEqual(put(
      zendeskTicketFeedbackSet(
        true,
        'error',
        'Il ticket non può essere inviato. Riprovare'
      )
    ));

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(false)
    ));
  });

  it('testa il corretto funzionamento quando il fetch dei dati non ha successo', () => {
    const gen = zendeskTicketDataPost(mockData);

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${ZENDESK_URL_DATA_POST}`,
      ticket
    ));

    expect(gen.next({ status: 300 }).value).toEqual(put(
      zendeskTicketFeedbackSet(
        true,
        'error',
        'Il ticket non può essere inviato. Riprovare'
      )
    ));

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(false)
    ));
  });

  it('testa il corretto funzionamento quando il fetch dei dati dà errore', () => {
    const gen = zendeskTicketDataPost(mockData);

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${ZENDESK_URL_DATA_POST}`,
      ticket
    ));

    expect(gen.next().value).toEqual(put(
      zendeskTicketFeedbackSet(
        true,
        'error',
        'Il ticket non può essere inviato. Riprovare'
      )
    ));

    expect(gen.next().value).toEqual(put(
      zendeskTicketSpinnerSet(false)
    ));
  });
});

describe('watchZendesk saga', () => {
  it('testa il corretto funzionamento quando i valori sono vuoti', () => {
    const gen = watchZendesk();

    expect(gen.next().value).toEqual(takeEvery(
      ZENDESK_TICKET_DATA_POST, zendeskTicketDataPost
    ));
  });
});

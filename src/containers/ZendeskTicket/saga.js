import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_BASE_PATH } from 'configuration';

import { createZendeskTicketBodyData, createZendeskTicket } from 'common/zendesk';
import {
  zendeskTicketSpinnerSet,
  zendeskTicketFeedbackSet,
} from './actions';
import { ZENDESK_TICKET_DATA_POST, ZENDESK_URL_DATA_POST } from './constants';


/**
 * Crea un ticket con gli oggetti inviati
 * @param {object} data dati della chiamata
 * @param {object} data.payload parametri passati dall'action
 * @param {object} data.payload.ticketData dati del singolo ticket
 * @param {bool} data.payload.ticketData.isUserLogged indica se l'utente è loggato
 * @param {bool} data.payload.ticketData.isDocente indica se l'utente docente
 * @param {bool} data.payload.ticketData.tipologia tipologia ticket (tecnico, contenuto ecc)
 * @param {string} data.payload.ticketData.descrizione testo del ticket
 * @param {string} data.payload.ticketData.provenienza indica da dove è stato inviato il ticket
 * @param {object} data.payload.configuration dati di configurazione dell'applicazione
 * @param {number} data.payload.configuration.disciplinaId dati di configurazione dell'applicazione
 * @param {string} data.payload.configuration.product nome dell'applicazione
 */
export function* zendeskTicketDataPost(data) {
  yield put(zendeskTicketSpinnerSet(true));
  let tipologiaUtente = data.payload.ticketData.isUserLogged ? 'studente' : 'sloggato';
  if (data.payload.ticketData.isDocente) {
    tipologiaUtente = 'docente';
  }

  // creo gli oggetti per messaggio pubblico e privato
  const bodyTicketData = createZendeskTicketBodyData({
    ...data.payload.ticketData,
    tipologiaUtente,
  });

  const ticket = createZendeskTicket({
    ...data.payload.ticketData,
    ...bodyTicketData,
    tags: [
      tipologiaUtente,
      data.payload.configuration.product,
      data.payload.ticketData.tipologia,
      `provenienza_${data.payload.ticketData.provenienza}`,
      `disciplina_${data.payload.configuration.disciplinaId}`,
    ].filter((tag) => (tag)),
  }, data.payload.ticketData.tipologia);
  let responso = false;

  if (ticket) {
    try {
      const response = yield call(
        axios.post,
        `${API_BASE_PATH}${ZENDESK_URL_DATA_POST}`,
        ticket
      );

      if ([200, 201].indexOf(response.status) > -1) {
        responso = true;
      }
    } catch (error) {
      responso = false;
    }
  }
  if (!responso) {
    yield put(zendeskTicketFeedbackSet(
      true,
      'error',
      'Il ticket non può essere inviato. Riprovare'
    ));
  } else {
    yield put(zendeskTicketFeedbackSet(
      true,
      'okay',
      'Il ticket è stato inviato correttamente'
    ));
  }

  yield put(zendeskTicketSpinnerSet(false));
}

export default function* watchZendesk() {
  yield takeEvery(ZENDESK_TICKET_DATA_POST, zendeskTicketDataPost);
}

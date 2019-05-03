/*
 *
 * SbloccaCodice sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH, ACADEMY_PRODUCTS } from 'configuration';
import { userDataSet, userCodiceSbloccoFetch } from 'containers/User/actions';
import { zendeskTicketDataPost } from 'containers/ZendeskTicket/actions';
import {
  SBLOCCACODICE_URI_SBLOCCA,
  SBLOCCACODICE_URI_ACQUISTA,
  SBLOCCACODICE_SBLOCCA_POST,
  SBLOCCACODICE_ACQUISTA_FETCH,
  SBLOCCACODICE_ACQUISTA_POST,
} from './constants';
import {
  sbloccaCodiceFeedbackSet,
  sbloccaCodiceFeedbackReset,
  sbloccaCodiceSpinnerSet,
  sbloccaCodiceAcquistaSet,
} from './actions';


export function* codiceSbloccoSbloccaPost(payload) {
  yield put(sbloccaCodiceFeedbackReset());
  yield put(sbloccaCodiceSpinnerSet(true));
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${SBLOCCACODICE_URI_SBLOCCA}`, {
        codice: `${payload.codice.substring(0, 4)}-${payload.codice.substring(4, 8)}-${payload.codice.substring(8, 12)}`,
      }
    );

    if (response.data.disciplina === payload.configuration.disciplinaId) {
      yield put(userDataSet({
        authentication: {
          codiceSbloccato: true,
          codiceDaSbloccare: false,
        },
      }));
      yield call(payload.history.push, payload.configuration.homePage);
    } else {
      yield put(sbloccaCodiceFeedbackSet(
        true,
        'help',
        `Il codice inserito è stato sbloccato, ma è valido per ${ACADEMY_PRODUCTS[response.data.disciplina]}. Inserire un altro codice per sbloccare ${ACADEMY_PRODUCTS[payload.configuration.disciplinaId]}`
      ));
    }
  } catch (error) {
    yield put(sbloccaCodiceFeedbackSet(
      true,
      'error',
      'Il codice inserito non è valido'
    ));
  }
  yield put(sbloccaCodiceSpinnerSet(false));
}


export function* codiceSbloccoAcquistaFetchSaga(data) {
  yield put(sbloccaCodiceFeedbackReset());
  yield put(sbloccaCodiceSpinnerSet(true));
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${SBLOCCACODICE_URI_ACQUISTA}`, {
        params: { disciplina: data.disciplina },
      }
    );
    yield put(sbloccaCodiceAcquistaSet({
      prodottiDisponibili: response.data,
      isLoaded: true,
    }));

    if (response.data.length === 0) {
      yield put(sbloccaCodiceFeedbackSet(
        true,
        'help',
        'Non sono disponibili prodotti acquistabili'
      ));
    }
  } catch (error) {
    yield put(sbloccaCodiceFeedbackSet(
      true,
      'error',
      'Non è stato possibile scaricare i prodotti acquistabili'
    ));
  }
  yield put(sbloccaCodiceSpinnerSet(false));
}


/**
 * @param {object} data
 * @param {string} data.orderData codice del prodotto
 * @param {string} data.paypalId id pagamento paypal
 * @param {object} data.ticketData dati del singolo ticket
 * @param {bool} data.ticketData.isUserLogged indica se l'utente è loggato
 * @param {bool} data.ticketData.isDocente indica se l'utente docente
 * @param {bool} data.ticketData.tipologia tipologia ticket (tecnico, contenuto ecc)
 * @param {string} data.ticketData.descrizione testo del ticket
 * @param {string} data.ticketData.provenienza indica da dove è stato inviato il ticket
 * @param {object} data.configuration dati di configurazione dell'applicazione
 * @param {string} data.configuration.product nome dell'applicazione
 * @param {number} data.configuration.disciplinaId dati di configurazione dell'applicazione
 */
export function* codiceSbloccoAcquistaPostSaga(data) {
  yield put(sbloccaCodiceFeedbackReset());
  yield put(sbloccaCodiceSpinnerSet(true));
  try {
    yield call(
      axios.post,
      `${API_BASE_PATH}${SBLOCCACODICE_URI_ACQUISTA}`, {
        paypal_id: data.paypalId,
        order_data: data.orderData,
      }
    );
    yield put(userCodiceSbloccoFetch(data.configuration.disciplinaId));

    yield put(sbloccaCodiceFeedbackSet(
      true,
      'okay',
      'Il tuo account premium è stato attivato'
    ));
  } catch (error) {
    yield put(zendeskTicketDataPost({
      configuration: data.configuration,
      ticketData: {
        ...data.ticketData,
        isUserLogged: true,
        tipologia: 'tecnico',
        provenienza: 'paypal_errore_pagamento',
        titolo: `PAYPAL errore pagamento ${data.configuration.product}`,
        descrizione: `Non ho potuto sbloccare il codice per questo ordine:\n\norder data: ${data.orderData}\npaypal id: ${data.paypalId}`,
      },
    }));
    yield put(sbloccaCodiceFeedbackSet(
      true,
      'error',
      'In questo momento non è possibile sbloccare il codice da te acquistato; verrai aggiornato entro 48 ore dalla nostra assistenza sullo stato di attivazione della tua licenza. Conserva la ricevuta di pagamento che ti verrà inviata a breve da PayPal. Grazie!',
    ));
  }
  yield put(sbloccaCodiceSpinnerSet(false));
}


export function* watchSbloccaCodice() {
  yield takeEvery(SBLOCCACODICE_SBLOCCA_POST, codiceSbloccoSbloccaPost);
  yield takeEvery(SBLOCCACODICE_ACQUISTA_FETCH, codiceSbloccoAcquistaFetchSaga);
  yield takeEvery(SBLOCCACODICE_ACQUISTA_POST, codiceSbloccoAcquistaPostSaga);
}


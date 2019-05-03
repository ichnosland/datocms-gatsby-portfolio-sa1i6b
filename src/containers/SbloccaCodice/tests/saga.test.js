/*
 *
 * SbloccaCodice saga test
 *
 */

import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';

import { userDataSet, userCodiceSbloccoFetch } from 'containers/User/actions';
import { zendeskTicketDataPost } from 'containers/ZendeskTicket/actions';
import {
  sbloccaCodiceFeedbackSet,
  sbloccaCodiceFeedbackReset,
  sbloccaCodiceSpinnerSet,
  sbloccaCodiceAcquistaSet,
} from '../actions';
import {
  SBLOCCACODICE_URI_SBLOCCA,
  SBLOCCACODICE_URI_ACQUISTA,
  SBLOCCACODICE_SBLOCCA_POST,
  SBLOCCACODICE_ACQUISTA_FETCH,
  SBLOCCACODICE_ACQUISTA_POST,
} from '../constants';
import {
  codiceSbloccoSbloccaPost,
  watchSbloccaCodice,
  codiceSbloccoAcquistaFetchSaga,
  codiceSbloccoAcquistaPostSaga,
} from '../saga';

const responseDataSimulation = {
  codice: 'ABCD-EFGH-IJKL',
  data_sblocco: '2018-06-14T20:37:37.756855Z',
  fine_sblocco: '2018-10-16T00:00:00+02:00',
  disciplina: 21,
};

/* eslint-disable redux-saga/yield-effects */
describe('codiceSbloccoSbloccaPost', () => {
  const history = {
    push: () => { },
  };
  it('workflow di sblocco con esito positivo, se la disciplina corrente equivale a quella sbloccata', () => {
    const gen = codiceSbloccoSbloccaPost({
      codice: 'ABCDEFGHIJKL',
      configuration: {
        disciplinaId: 21,
        homePage: '/homepage',
      },
      history,
    });

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceFeedbackReset())
    );

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(
      call(
        axios.post,
        `${API_BASE_PATH}${SBLOCCACODICE_URI_SBLOCCA}`, {
          codice: 'ABCD-EFGH-IJKL',
        }
      )
    );

    expect(gen.next({ data: responseDataSimulation }).value).toEqual(
      put(userDataSet({
        authentication: {
          codiceSbloccato: true,
          codiceDaSbloccare: false,
        },
      }))
    );

    expect(gen.next().value).toEqual(call(history.push, '/homepage'));

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceSpinnerSet(false))
    );
  });

  it('workflow di sblocco con esito negativo', () => {
    const gen = codiceSbloccoSbloccaPost({
      codice: 'ABCDEFGHIJKL',
      configuration: {
        disciplinaId: 21,
        homePage: '/homepage',
      },
    });

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceFeedbackReset())
    );

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(
      call(
        axios.post,
        `${API_BASE_PATH}${SBLOCCACODICE_URI_SBLOCCA}`, {
          codice: 'ABCD-EFGH-IJKL',
        }
      )
    );

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceFeedbackSet(
        true,
        'error',
        'Il codice inserito non è valido'
      ))
    );

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceSpinnerSet(false))
    );
  });


  it('workflow di sblocco incrociato di un\'altra disciplina', () => {
    const gen = codiceSbloccoSbloccaPost({
      codice: 'ABCDEFGHIJKL',
      configuration: {
        disciplinaId: 24,
        homePage: '/homepage',
      },
    });

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceFeedbackReset())
    );

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(
      call(
        axios.post,
        `${API_BASE_PATH}${SBLOCCACODICE_URI_SBLOCCA}`, {
          codice: 'ABCD-EFGH-IJKL',
        }
      )
    );

    expect(gen.next({ data: responseDataSimulation }).value).toEqual(
      put(sbloccaCodiceFeedbackSet(
        true,
        'help',
        'Il codice inserito è stato sbloccato, ma è valido per Alatin Academy. Inserire un altro codice per sbloccare Itaca Academy'
      ))
    );

    expect(gen.next().value).toEqual(
      put(sbloccaCodiceSpinnerSet(false))
    );
  });
});


describe('codiceSbloccoAcquistaFetchSaga', () => {
  it('leggo il contenuto dei codici acquistabili se ne viene restituito almeno uno', () => {
    const gen = codiceSbloccoAcquistaFetchSaga({
      disciplina: 22,
    });

    expect(gen.next().value).toEqual(put(sbloccaCodiceFeedbackReset()));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${SBLOCCACODICE_URI_ACQUISTA}`, {
        params: { disciplina: 22 },
      }
    ));

    expect(gen.next({ data: [1, 2, 3] }).value).toEqual(put(sbloccaCodiceAcquistaSet({
      prodottiDisponibili: [1, 2, 3],
      isLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(false)));
  });

  it('leggo il contenuto dei codici acquistabili se viene restituito array vuoto', () => {
    const gen = codiceSbloccoAcquistaFetchSaga({
      disciplina: 22,
    });

    expect(gen.next().value).toEqual(put(sbloccaCodiceFeedbackReset()));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${SBLOCCACODICE_URI_ACQUISTA}`, {
        params: { disciplina: 22 },
      }
    ));

    expect(gen.next({ data: [] }).value).toEqual(put(sbloccaCodiceAcquistaSet({
      prodottiDisponibili: [],
      isLoaded: true,
    })));

    expect(gen.next({ data: [] }).value).toEqual(put(sbloccaCodiceFeedbackSet(
      true,
      'help',
      'Non sono disponibili prodotti acquistabili'
    )));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(false)));
  });

  it('leggo il contenuto dei codici acquistabili in caso di errore', () => {
    const gen = codiceSbloccoAcquistaFetchSaga({
      disciplina: 22,
    });

    expect(gen.next().value).toEqual(put(sbloccaCodiceFeedbackReset()));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${SBLOCCACODICE_URI_ACQUISTA}`, {
        params: { disciplina: 22 },
      }
    ));

    expect(gen.next().value).toEqual(put(sbloccaCodiceFeedbackSet(
      true,
      'error',
      'Non è stato possibile scaricare i prodotti acquistabili'
    )));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(false)));
  });
});


describe('codiceSbloccoAcquistaPostSaga', () => {
  it('testo il caso di attivazione con successo', () => {
    const gen = codiceSbloccoAcquistaPostSaga({
      paypalId: 'paypal_id',
      orderData: 'order_data',
      configuration: {
        disciplinaId: 33,
        product: 'prodotto',
      },
      ticketData: {
        nome: 'nome',
        email: 'email@example.com',
      },
    });

    expect(gen.next().value).toEqual(put(sbloccaCodiceFeedbackReset()));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${SBLOCCACODICE_URI_ACQUISTA}`, {
        paypal_id: 'paypal_id',
        order_data: 'order_data',
      }
    ));

    expect(
      gen.next({ data: { codice: '123' } }).value
    ).toEqual(put(userCodiceSbloccoFetch(33)));

    expect(
      gen.next({ data: { codice: '123' } }).value
    ).toEqual(put(sbloccaCodiceFeedbackSet(
      true,
      'okay',
      'Il tuo account premium è stato attivato'
    )));

    expect(gen.next().value).toEqual(put(sbloccaCodiceSpinnerSet(false)));
  });

  it('testo il caso di attivazione con insuccesso', () => {
    const gen = codiceSbloccoAcquistaPostSaga({
      paypalId: 'paypal_id',
      orderData: 'order_data',
      configuration: {
        disciplinaId: 33,
        product: 'prodotto',
      },
      ticketData: {
        nome: 'nome',
        email: 'email@example.com',
      },
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(zendeskTicketDataPost({
      configuration: {
        disciplinaId: 33,
        product: 'prodotto',
      },
      ticketData: {
        descrizione: 'Non ho potuto sbloccare il codice per questo ordine:\n\norder data: order_data\npaypal id: paypal_id',
        email: 'email@example.com',
        isUserLogged: true,
        nome: 'nome',
        provenienza: 'paypal_errore_pagamento',
        tipologia: 'tecnico',
        titolo: 'PAYPAL errore pagamento prodotto',
      },
    })));

    expect(gen.next().value).toEqual(put(sbloccaCodiceFeedbackSet(
      true,
      'error',
      'In questo momento non è possibile sbloccare il codice da te acquistato; verrai aggiornato entro 48 ore dalla nostra assistenza sullo stato di attivazione della tua licenza. Conserva la ricevuta di pagamento che ti verrà inviata a breve da PayPal. Grazie!'
    )));
  });
});


describe('watchSbloccaCodice saga', () => {
  it('watchCorsi is yielding expected actions', () => {
    const gen = watchSbloccaCodice();

    expect(gen.next().value).toEqual(takeEvery(
      SBLOCCACODICE_SBLOCCA_POST,
      codiceSbloccoSbloccaPost
    ));

    expect(gen.next().value).toEqual(takeEvery(
      SBLOCCACODICE_ACQUISTA_FETCH,
      codiceSbloccoAcquistaFetchSaga
    ));

    expect(gen.next().value).toEqual(takeEvery(
      SBLOCCACODICE_ACQUISTA_POST,
      codiceSbloccoAcquistaPostSaga
    ));
  });
});

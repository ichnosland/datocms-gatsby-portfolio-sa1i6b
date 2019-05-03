/*
 *
 * Corsi saga test
 *
 */

import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';
import { cookieSet } from 'common/cookies';
import { livelliFetch } from 'containers/Dashboard/actions';
import * as actions from '../actions';
import * as constants from '../constants';
import * as saga from '../saga';

const mockResponseData = [{
  classe: 6681,
  pk: 6985,
  applied: 2,
  nome: '3 recupero_2016',
}, {
  classe: 7059,
  pk: 7498,
  applied: 4,
  nome: '5 mmm',
}];

const mockConfiguration = {
  disciplinaId: 123,
  product: 'nomeprodotto',
};

const mockIscrittiResponse = [{
  id: 666,
  username: 'giorgio.cappone@acme.com',
  first_name: 'Giorgio',
  last_name: 'Cappone',
  studenteAcademy: 8888,
},
{
  id: 7777,
  username: 'noemi.puma@acme.com',
  first_name: 'Noemi',
  last_name: 'Puma',
  studenteAcademy: 9999,
}];

/* eslint-disable redux-saga/yield-effects */
describe('initializeCorsiList', () => {
  it('fetchCorso workflow, se docente = true, on success e la chiamata ha successo', () => {
    const gen = saga.initializeCorsiList({
      configuration: mockConfiguration,
      isDocente: true,
      userId: 111,
    });

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiErrorReset())
    );

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_LIST_DOCENTE}123`
    ));

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiListSet({
        items: mockResponseData,
        isCorsiLoaded: true,
      }))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        pk: 6985,
        nome: '3 recupero_2016',
        isCorsoLoaded: true,
      }))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoSelectedDocenteTrigger(
        6985,
        mockConfiguration,
        true,
        111
      ))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      call(cookieSet, {
        cookieKey: 'corsoDocente_111',
        payload: 6985,
      })
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(false))
    );
  });


  it('fetchCorso workflow, se utente = studente, on success e la chiamata ha successo', () => {
    const gen = saga.initializeCorsiList({
      configuration: mockConfiguration,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiErrorReset())
    );

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_LIST_STUDENTE}123`
    ));

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiListSet({
        items: mockResponseData,
        isCorsiLoaded: true,
      }))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(false))
    );
  });

  it('fetchCorso workflow, se utente = docente, disciplinaId è lyceum e response.length == 0', () => {
    const gen = saga.initializeCorsiList({
      configuration: {
        ...mockConfiguration,
        product: 'lyceum',
        disciplinaId: 33,
      },
      isDocente: true,
    });

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiErrorReset())
    );

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_LIST_DOCENTE}33`
    ));

    expect(gen.next({ data: [] }).value).toEqual(
      put(actions.corsiListSet({
        items: [],
        isCorsiLoaded: true,
      }))
    );

    expect(gen.next({ data: [] }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        isCorsoLoaded: true,
      }))
    );

    expect(gen.next({ data: [] }).value).toEqual(
      put(livelliFetch({ disciplinaId: 33, product: 'lyceum' }, true))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(false))
    );
  });

  it('fetchCorso workflow, se utente = docente, disciplinaId è alatin e response.length == 0', () => {
    const gen = saga.initializeCorsiList({
      configuration: {
        ...mockConfiguration,
        product: 'alatin',
        disciplinaId: 21,
      },
      isDocente: true,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_LIST_DOCENTE}21`
    ));

    expect(gen.next({ data: [] }).value).toEqual(
      put(actions.corsiListSet({
        items: [],
        isCorsiLoaded: true,
      }))
    );

    expect(gen.next({ data: [] }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        isCorsoLoaded: true,
      }))
    );

    expect(gen.next({ data: [] }).value).toEqual(
      put(livelliFetch({ disciplinaId: 21, product: 'alatin' }, true))
    );
  });

  it('fetchCorso workflow, se utente = docente, e ho corso preselezionato', () => {
    cookieSet({ cookieKey: 'corsoDocente_5555', payload: '7498' });
    const gen = saga.initializeCorsiList({
      configuration: mockConfiguration,
      userId: 5555,
      isDocente: true,
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: mockResponseData });

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        pk: 7498,
        nome: '5 mmm',
        isCorsoLoaded: true,
      }))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoSelectedDocenteTrigger(
        7498,
        mockConfiguration,
        true,
        5555
      ))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(false))
    );
  });

  it('fetchCorso workflow, se utente = docente, e ho corso preselezionato e pk in cookie non esistente va in fallback', () => {
    cookieSet({ cookieKey: 'corsoDocente_5555', payload: '444' });
    const gen = saga.initializeCorsiList({
      configuration: mockConfiguration,
      userId: 5555,
      isDocente: true,
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: mockResponseData });

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        pk: 6985,
        nome: '3 recupero_2016',
        isCorsoLoaded: true,
      }))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoSelectedDocenteTrigger(
        6985,
        mockConfiguration,
        true,
        5555
      ))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      call(cookieSet, {
        cookieKey: 'corsoDocente_5555',
        payload: 6985,
      })
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(false))
    );
  });

  it('fetchCorso workflow, se utente = docente, e ho cookie uguale a pk del primo elemento, non setto cookie', () => {
    cookieSet({ cookieKey: 'corsoDocente_9999', payload: '6985' });
    const gen = saga.initializeCorsiList({
      configuration: mockConfiguration,
      userId: 9999,
      isDocente: true,
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: mockResponseData });


    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        pk: 6985,
        nome: '3 recupero_2016',
        isCorsoLoaded: true,
      }))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(actions.corsiCorsoSelectedDocenteTrigger(
        6985,
        mockConfiguration,
        true,
        9999
      ))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(false))
    );
  });

  it('fetchCorso workflowon fetch error', () => {
    const gen = saga.initializeCorsiList({
      configuration: mockConfiguration,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(
      put(actions.corsiSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(
      put(actions.corsiErrorReset())
    );

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_LIST_STUDENTE}123`
    ));

    expect(gen.throw('error').value).toEqual(
      put(actions.corsiErrorSet(
        true,
        'Impossibile leggere il corso'
      ))
    );
  });
});

describe('corsoDetailDocenteSaga', () => {
  it('fetchCorso workflow, se utente = docente, on success e la chiamata ha successo ', () => {
    const gen = saga.corsoDetailDocenteSaga({
      idCorso: 123,
      userId: 4444,
    });

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_CORSO_DETAIL_DOCENTE}123`
    ));

    expect(gen.next({
      data: { pk: 123, iscritti: mockIscrittiResponse },
    }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        iscritti: mockIscrittiResponse,
        pk: 123,
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
      }))
    );
  });

  it('fetchCorso workflow, se utente = docente, on success e la chiamata ha successo ed è academy', () => {
    const gen = saga.corsoDetailDocenteSaga({
      idCorso: 123,
      userId: 444,
      configuration: { ...mockConfiguration, disciplinaId: 21 },
    });

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_CORSO_DETAIL_DOCENTE}123`
    ));

    expect(gen.next({
      data: { pk: 123, iscritti: mockIscrittiResponse },
    }).value).toEqual(
      put(actions.corsiCorsoDetailDocenteSet({
        iscritti: mockIscrittiResponse,
        pk: 123,
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
      }))
    );

    expect(gen.next().value).toEqual(
      put(livelliFetch({ disciplinaId: 21, product: 'nomeprodotto' }, false, 123))
    );

    expect(gen.next({ data: { pk: 123, iscritti: mockIscrittiResponse } }).value)
      .toEqual(
        call(cookieSet, {
          cookieKey: 'corsoDocente_444',
          payload: 123,
        })
      );
  });

  it('fetchCorso workflow, se utente = docente, on success e la chiamata ha successo ', () => {
    const gen = saga.corsoDetailDocenteSaga({
      idCorso: 123,
    });

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.CORSI_URL_CORSO_DETAIL_DOCENTE}123`
    ));

    expect(gen.next().value).toEqual(
      put(actions.corsiErrorSet(
        true,
        'Impossibile leggere il corso selezionato'
      ))
    );
  });
});

describe('watchCorsi saga', () => {
  it('watchCorsi is yielding expected actions', () => {
    const gen = saga.watchCorsi();
    expect(gen.next().value).toEqual(
      takeEvery(
        constants.CORSI_LIST_INITIALIZE,
        saga.initializeCorsiList
      )
    );

    expect(gen.next().value).toEqual(
      takeEvery(
        constants.CORSI_CORSO_DETAIL_DOCENTE_TRIGGER,
        saga.corsoDetailDocenteSaga
      )
    );
  });
});

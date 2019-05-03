/*
 *
 * CreaVerifiche sagas
 *
 */

import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { createStepFromEsercizi, buildStepRepresentationPreview } from 'common/esercizi';
import {
  creaverificheVerificaEserciziSpinnerSet,
  creaverificheVerificaEserciziSet,
  creaverificheVerificaEserciziFetchError,
  creaverificheVerificaEsercizioPreviewFetchError,
  creaverificheVerificaPostError,
  creaverificheVerificaSet,
} from '../actions';
import {
  CREA_VERIFICHE_FETCH,
  CREA_VERIFICHE_POST,
  CREA_VERIFICHE_URL_FETCH_ENDPOINT,
  CREA_VERIFICHE_URL_POST_ENDPOINT,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_URL_ENDPOINT,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH,
} from '../constants';
import { defaultMytestUnita } from '../reducer';
import watchMytestUnitaList, {
  loadUnitaList,
  postVerifica,
  loadEserciziPreview,
} from '../sagas';

/* eslint-disable redux-saga/yield-effects */
describe('loadUnitaList saga', () => {
  const payloadMock = {
    prerequisito: 123,
  };
  const mockResponseData = {
    steps: [{
      tipo: false,
      html: 'Html step 1',
      idEsercizio: 100,
      id: 1001,
    }, {
      tipo: 'O',
      titolo: 'titolo step 1',
      risposta_1: 'risposta uno',
      risposta_2: 'risposta due',
      risposta_3: 'risposta tre',
      risposta_4: 'risposta quattro | risposta cinque',
      form: [],
      idEsercizio: 100,
      id: 1002,
    }, {
      tipo: false,
      html: 'Html step 2',
      idEsercizio: 200,
      id: 2001,
    }, {
      tipo: 'N',
      titolo: 'titolo step 2',
      testo_principale: 'testo principale',
      risposta_1: 'risposta uno',
      risposta_2: 'risposta due',
      risposta_3: 'risposta tre',
      risposta_4: 'risposta quattro',
      form: [],
      idEsercizio: 200,
      id: 2002,
    }],
    titoloUnita: 'Verbi ausiliari',
    titoloMissione: 'Il verbo',
    titoloLivello: 'Morfologia',
  };
  const endpointAxiosCall = call(
    axios.get,
    `${API_BASE_PATH}${CREA_VERIFICHE_URL_FETCH_ENDPOINT}${payloadMock.prerequisito}`,
    { params: { no_shuffle: true } }
  );

  it('loadUnitaList saga must enable spinner first', () => {
    const gen = loadUnitaList(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );
  });

  it('loadUnitaList saga performs endpoint call', () => {
    const gen = loadUnitaList(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);
  });

  it('loadUnitaList saga removes spinner after successful endpoint call', () => {
    const gen = loadUnitaList(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next(payloadMock).value).toEqual(endpointAxiosCall);

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );
  });

  it('loadUnitaList should dispatch creaverificheVerificaEserciziSet action', () => {
    const gen = loadUnitaList(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );

    const rappresentaStep = buildStepRepresentationPreview(
      createStepFromEsercizi(mockResponseData.steps)
    );
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSet({
        steps: rappresentaStep,
        titoloUnita: mockResponseData.titoloUnita,
        titoloMissione: mockResponseData.titoloMissione,
        titoloLivello: mockResponseData.titoloLivello,
      }))
    );
  });

  it('loadUnitaList should dispatch creaverificheVerificaEserciziSet action when no titles are provided', () => {
    const gen = loadUnitaList(payloadMock);
    expect(gen.next({ data: mockResponseData.steps }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next({ data: mockResponseData.steps }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );

    const rappresentaStep = buildStepRepresentationPreview(
      createStepFromEsercizi(mockResponseData.steps)
    );
    expect(gen.next({ data: mockResponseData.steps }).value).toEqual(
      put(creaverificheVerificaEserciziSet({
        steps: rappresentaStep,
        titoloUnita: '',
        titoloMissione: '',
        titoloLivello: '',
      }))
    );
  });

  it('loadUnitaList saga dispatches a creaverificheVerificaEserciziFetchError action on failure', () => {
    const gen = loadUnitaList(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next().value).toEqual(
      put(creaverificheVerificaEserciziFetchError('Impossibile caricare l\'elenco degli esercizi disponibili'))
    );
  });

  it('loadUnitaList saga dispatches creaverificheVerificaEserciziSpinnerSet after creaverificheVerificaEserciziFetchError on failure', () => {
    const gen = loadUnitaList(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next().value).toEqual(
      put(creaverificheVerificaEserciziFetchError('Impossibile caricare l\'elenco degli esercizi disponibili'))
    );

    expect(gen.next().value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );
  });
});

describe('loadEserciziPreview saga', () => {
  const payloadMock = {
    esercizioId: 12345,
  };
  const mockResponseData = {
    elementi: [{
      tipo: false,
      html: 'Html step 1',
      idEsercizio: 100,
      id: 1001,
    }, {
      tipo: 'O',
      titolo: 'titolo step 1',
      risposta_1: 'risposta uno',
      risposta_2: 'risposta due',
      risposta_3: 'risposta tre',
      risposta_4: 'risposta quattro | risposta cinque',
      form: [],
      idEsercizio: 100,
      id: 1002,
    }, {
      tipo: false,
      html: 'Html step 2',
      idEsercizio: 200,
      id: 2001,
    }, {
      tipo: 'N',
      titolo: 'titolo step 2',
      testo_principale: 'testo principale',
      risposta_1: 'risposta uno',
      risposta_2: 'risposta due',
      risposta_3: 'risposta tre',
      risposta_4: 'risposta quattro',
      form: [],
      idEsercizio: 200,
      id: 2002,
    }],
    titoloUnita: 'Verbi ausiliari',
    titoloMissione: 'Il verbo',
    titoloLivello: 'Morfologia',
  };
  const endpointAxiosCall = call(
    axios.get,
    `${API_BASE_PATH}${CREA_VERIFICHE_PREVIEW_ESERCIZIO_URL_ENDPOINT}${payloadMock.esercizioId}`,
    {}
  );

  it('loadEserciziPreview operations on success case', () => {
    const gen = loadEserciziPreview(payloadMock);

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );

    const rappresentaStep = buildStepRepresentationPreview(
      createStepFromEsercizi(mockResponseData.elementi)
    );
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSet({
        steps: rappresentaStep,
        titoloUnita: '',
        titoloMissione: '',
        titoloLivello: '',
      }))
    );
  });

  it('loadEserciziPreview operations on failure case', () => {
    const gen = loadEserciziPreview(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next().value).toEqual(
      put(creaverificheVerificaEsercizioPreviewFetchError(
        'Impossibile caricare l\'elenco degli step per questo esercizio'
      ))
    );

    expect(gen.next().value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );
  });
});

describe('postVerifica saga', () => {
  const payloadMock = {
    eserciziSelezionati: [{
      idEsercizio: 100,
      idsElementi: [1001, 1002],
    }],
    titolo: 'Titolo della verifica',
    note: 'Note della verifica',
  };
  const mockResponseData = {};
  const endpointAxiosCall = call(
    axios.post,
    `${API_BASE_PATH}${CREA_VERIFICHE_URL_POST_ENDPOINT}`,
    payloadMock
  );

  it('postVerifica saga must enable spinner first', () => {
    const gen = postVerifica(payloadMock);
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );
  });

  it('postVerifica saga must post data', () => {
    const gen = postVerifica({ payload: payloadMock });
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);
  });

  it('postVerifica saga must disable spinner after data is posted', () => {
    const gen = postVerifica({ payload: payloadMock });
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );
  });

  it('postVerifica saga must empty verifica data after post is successful', () => {
    const gen = postVerifica({ payload: payloadMock });
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(endpointAxiosCall);

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaSet(defaultMytestUnita.verifica))
    );
  });

  it('postVerifica saga must trigger error on failure', () => {
    const gen = postVerifica();
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaPostError('Non è stato possibile salvare la verifica. Riprova più tardi'))
    );
  });

  it('postVerifica saga must trigger spinner after failure', () => {
    const gen = postVerifica();
    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(true))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaPostError('Non è stato possibile salvare la verifica. Riprova più tardi'))
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(creaverificheVerificaEserciziSpinnerSet(false))
    );
  });
});

describe('watchMytestUnitaList saga', () => {
  it('watchMytestUnitaList triggers loadUnitaList function when CREA_VERIFICHE_FETCH event is dispatched', () => {
    const gen = watchMytestUnitaList();
    expect(gen.next().value).toEqual(takeEvery(
      CREA_VERIFICHE_FETCH,
      loadUnitaList
    ));
  });

  it('watchMytestUnitaList triggers loadUnitaList function when CREA_VERIFICHE_POST event is dispatched', () => {
    const gen = watchMytestUnitaList();
    expect(gen.next().value).toEqual(takeEvery(
      CREA_VERIFICHE_FETCH,
      loadUnitaList
    ));

    expect(gen.next().value).toEqual(takeEvery(
      CREA_VERIFICHE_POST,
      postVerifica
    ));

    expect(gen.next().value).toEqual(takeEvery(
      CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH,
      loadEserciziPreview
    ));
  });
});

/*
 *
 * loadVerifichePronte sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { buildStepRepresentationPreview, createStepFromEsercizi } from 'common/esercizi';
import ContenutoStep from 'containers/CreaVerifiche/ContenutoStep';
import { creaverificheVerificaSet } from 'containers/CreaVerifiche/actions';
import {
  creaverificheVerifichePronteSet,
  creaverificheVerifichePronteSpinnerSet,
} from '../actions';
import {
  CREA_VERIFICHE_PRONTE_FETCH,
  CREA_VERIFICHE_PRONTE_FETCH_URL,
  CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI,
  CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI_URL_ENDPOINT,
} from '../constants';
import watchVerifichePronte, { loadVerifichePronte, loadEserciziPrerequisito } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('loadVerifichePronte saga', () => {
  const verifichePronteAxiosCall = call(
    axios.get,
    `${API_BASE_PATH}${CREA_VERIFICHE_PRONTE_FETCH_URL}`,
    { params: { disciplina: 123 } }
  );

  it('loadVerifichePronte saga must enable spinner first', () => {
    const gen = loadVerifichePronte({ disciplinaId: 123 });
    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSpinnerSet(true))
    );
  });

  it('loadVerifichePronte saga must call verifichePronteAxiosCall', () => {
    const gen = loadVerifichePronte({ disciplinaId: 123 });
    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSpinnerSet(true))
    );

    expect(gen.next({ disciplinaId: 123 }).value).toEqual(verifichePronteAxiosCall);
  });

  it('loadVerifichePronte saga must call creaverificheVerifichePronteSet', () => {
    const responseMock = [{
      numero_esercizi: 1,
      nome: 'nome verifica',
      prerequisito: 345,
      pk: 123,
    }];

    const gen = loadVerifichePronte({ disciplinaId: 123 });
    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSpinnerSet(true))
    );

    expect(gen.next({ disciplinaId: 123 }).value).toEqual(
      verifichePronteAxiosCall
    );

    expect(gen.next({ data: responseMock }).value).toEqual(
      put(creaverificheVerifichePronteSet({
        verifichePronte: [{
          eserciziSelezionati: [],
          eserciziNumero: responseMock[0].numero_esercizi,
          titolo: responseMock[0].nome,
          note: '',
          prerequisito: responseMock[0].prerequisito,
          verificheCreate: [],
          key: responseMock[0].pk,
          dataUltimaModifica: undefined,
        }],
      }))
    );

    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSpinnerSet(false))
    );
  });

  it('loadVerifichePronte saga must disable spinner afterward', () => {
    const gen = loadVerifichePronte({ disciplinaId: 123 });
    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSpinnerSet(true))
    );

    expect(gen.next().value).toEqual(verifichePronteAxiosCall);

    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSpinnerSet(false))
    );
  });
});


describe('loadEserciziPrerequisito saga', () => {
  const mockVerificaData = {
    prerequisito: 123,
    titolo: 'titolo',
  };
  const mockElementi = [{
    tipo: false,
  }, {
    tipo: 'O',
    risposta_1: 'risposta uno',
    risposta_2: 'risposta due',
    risposta_3: '',
    risposta_4: '',
  }];
  const stepParsati = buildStepRepresentationPreview(createStepFromEsercizi(mockElementi));
  const verifichePronteEserciziAxiosCall = call(
    axios.get,
    `${API_BASE_PATH}${CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI_URL_ENDPOINT}${mockVerificaData.prerequisito}`
  );

  it('loadVerifichePronte saga flow when retrival is successful', () => {
    const gen = loadEserciziPrerequisito({ payload: mockVerificaData });
    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSet({
        loadingPrerequisitoVerifica: mockVerificaData.prerequisito,
        spinnerLoadEsercizio: true,
      }))
    );

    expect(gen.next({ payload: mockVerificaData }).value).toEqual(verifichePronteEserciziAxiosCall);

    expect(
      gen.next({ data: mockElementi }).value
    ).toEqual(put(creaverificheVerificaSet({
      eserciziSelezionati: stepParsati.map((esercizio) => ({
        ...esercizio,
        consegnaHTML: ContenutoStep(esercizio),
      })),
      titolo: mockVerificaData.titolo,
      note: '',
      anteprimaStampa: false,
    })));

    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSet({
        loadingPrerequisitoVerifica: -1,
        spinnerLoadEsercizio: false,
      }))
    );
  });

  it('loadVerifichePronte saga flow when retrival is unsuccessful', () => {
    const gen = loadEserciziPrerequisito({ payload: mockVerificaData });
    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSet({
        loadingPrerequisitoVerifica: mockVerificaData.prerequisito,
        spinnerLoadEsercizio: true,
      }))
    );

    expect(gen.next().value).toEqual(verifichePronteEserciziAxiosCall);

    expect(gen.next().value).toEqual(
      put(creaverificheVerifichePronteSet({
        loadingPrerequisitoVerifica: -1,
        spinnerLoadEsercizio: false,
      }))
    );
  });
});

describe('watchVerifichePronte saga', () => {
  it('watchMytestUnitaList triggers CREA_VERIFICHE_PRONTE_FETCH and CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI actions', () => {
    const gen = watchVerifichePronte();
    expect(gen.next().value).toEqual(takeEvery(
      CREA_VERIFICHE_PRONTE_FETCH,
      loadVerifichePronte
    ));
    expect(gen.next().value).toEqual(takeEvery(
      CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI,
      loadEserciziPrerequisito
    ));
  });
});

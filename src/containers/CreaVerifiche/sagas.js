/*
 *
 * CreaVerifiche sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { createStepFromEsercizi, buildStepRepresentationPreview } from 'common/esercizi';
import {
  CREA_VERIFICHE_FETCH,
  CREA_VERIFICHE_URL_FETCH_ENDPOINT,
  CREA_VERIFICHE_POST,
  CREA_VERIFICHE_URL_POST_ENDPOINT,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_URL_ENDPOINT,
} from './constants';
import {
  creaverificheVerificaEserciziFetchError,
  creaverificheVerificaEsercizioPreviewFetchError,
  creaverificheVerificaEserciziSet,
  creaverificheVerificaEserciziSpinnerSet,
  creaverificheVerificaSet,
  creaverificheVerificaPostError,
} from './actions';
import { defaultMytestUnita } from './reducer';

export function* loadUnitaList(payload) {
  yield put(creaverificheVerificaEserciziSpinnerSet(true));
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CREA_VERIFICHE_URL_FETCH_ENDPOINT}${payload.prerequisito}`, {
        params: { no_shuffle: true },
      }
    );
    const rappresentaStep = buildStepRepresentationPreview(
      createStepFromEsercizi(response.data.steps || response.data)
    );
    yield put(creaverificheVerificaEserciziSpinnerSet(false));
    yield put(creaverificheVerificaEserciziSet({
      steps: rappresentaStep,
      titoloUnita: response.data.titoloUnita || '',
      titoloMissione: response.data.titoloMissione || '',
      titoloLivello: response.data.titoloLivello || '',
    }));
  } catch (error) {
    yield put(creaverificheVerificaEserciziFetchError());
    yield put(creaverificheVerificaEserciziSpinnerSet(false));
  }
}

export function* loadEserciziPreview(data) {
  yield put(creaverificheVerificaEserciziSpinnerSet(true));
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CREA_VERIFICHE_PREVIEW_ESERCIZIO_URL_ENDPOINT}${data.esercizioId}`,
      {}
    );
    const rappresentaStep = buildStepRepresentationPreview(
      createStepFromEsercizi(response.data.elementi)
    );
    yield put(creaverificheVerificaEserciziSpinnerSet(false));
    yield put(creaverificheVerificaEserciziSet({
      steps: rappresentaStep,
      titoloUnita: '',
      titoloMissione: '',
      titoloLivello: '',
    }));
  } catch (error) {
    yield put(creaverificheVerificaEsercizioPreviewFetchError());
    yield put(creaverificheVerificaEserciziSpinnerSet(false));
  }
}

export function* postVerifica(payload) {
  yield put(creaverificheVerificaEserciziSpinnerSet(true));
  try {
    yield call(
      axios.post,
      `${API_BASE_PATH}${CREA_VERIFICHE_URL_POST_ENDPOINT}`, {
        ...payload.payload,
      }
    );
    yield put(creaverificheVerificaEserciziSpinnerSet(false));
    yield put(creaverificheVerificaSet(defaultMytestUnita.verifica));
  } catch (error) {
    yield put(creaverificheVerificaPostError('Non è stato possibile salvare la verifica. Riprova più tardi'));
    yield put(creaverificheVerificaEserciziSpinnerSet(false));
  }
}

export default function* watchMytestUnitaList() {
  yield takeEvery(CREA_VERIFICHE_FETCH, loadUnitaList);
  yield takeEvery(CREA_VERIFICHE_POST, postVerifica);
  yield takeEvery(CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH, loadEserciziPreview);
}

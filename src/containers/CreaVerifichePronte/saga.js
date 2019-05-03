/*
 *
 * CreaVerificheSalvate sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { creaverificheVerificaSet } from 'containers/CreaVerifiche/actions';
import ContenutoStep from 'containers/CreaVerifiche/ContenutoStep';
import { buildStepRepresentationPreview, createStepFromEsercizi } from 'common/esercizi';
import {
  CREA_VERIFICHE_PRONTE_FETCH,
  CREA_VERIFICHE_PRONTE_FETCH_URL,
  CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI,
  CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI_URL_ENDPOINT,
} from './constants';
import {
  creaverificheVerifichePronteSet,
  creaverificheVerifichePronteSpinnerSet,
} from './actions';

export function* loadVerifichePronte(data) {
  yield put(creaverificheVerifichePronteSpinnerSet(true));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CREA_VERIFICHE_PRONTE_FETCH_URL}`, {
        params: { disciplina: data.disciplinaId },
      }
    );
    yield put(creaverificheVerifichePronteSet({
      verifichePronte: response.data.map((verifica) => ({
        eserciziSelezionati: [],
        eserciziNumero: verifica.numero_esercizi,
        titolo: verifica.nome,
        note: '',
        prerequisito: verifica.prerequisito,
        verificheCreate: [],
        key: verifica.pk,
        dataUltimaModifica: undefined,
      })),
    }));
    yield put(creaverificheVerifichePronteSpinnerSet(false));
  } catch (error) {
    yield put(creaverificheVerifichePronteSpinnerSet(false));
  }
}

export function* loadEserciziPrerequisito(data) {
  const datiVerifica = data.payload;
  yield put(creaverificheVerifichePronteSet({
    loadingPrerequisitoVerifica: datiVerifica.prerequisito,
    spinnerLoadEsercizio: true,
  }));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI_URL_ENDPOINT}${datiVerifica.prerequisito}`
    );
    const stepParsati = buildStepRepresentationPreview(createStepFromEsercizi(response.data));
    yield put(creaverificheVerificaSet({
      eserciziSelezionati: stepParsati.map((esercizio) => ({
        ...esercizio,
        consegnaHTML: ContenutoStep(esercizio),
      })),
      titolo: datiVerifica.titolo,
      note: '',
      anteprimaStampa: false,
    }));
    yield put(creaverificheVerifichePronteSet({
      loadingPrerequisitoVerifica: -1,
      spinnerLoadEsercizio: false,
    }));
  } catch (error) {
    yield put(creaverificheVerifichePronteSet({
      loadingPrerequisitoVerifica: -1,
      spinnerLoadEsercizio: false,
    }));
  }
}

export default function* watchVerifichePronte() {
  yield takeEvery(CREA_VERIFICHE_PRONTE_FETCH, loadVerifichePronte);
  yield takeEvery(CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI, loadEserciziPrerequisito);
}

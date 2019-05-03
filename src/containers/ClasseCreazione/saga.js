/*
 *
 * Corsi sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import {
  CLASSE_CREAZIONE_URL_FETCH_SCUOLE_DOCENTE,
  CLASSE_CREAZIONE_URL_POST,
  CLASSE_CREAZIONE_URL_GEO_PROVINCE,
  CLASSE_CREAZIONE_URL_SCUOLE_PROVINCIA,
  CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH,
  CLASSE_CREAZIONE_DATA_POST,
  CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH,
  CLASSE_CREAZIONE_GEO_COMUNI_FETCH,
} from './constants';
import {
  classeCreazioneScuoleAttiveSet,
  classeCreazioneSpinnerSet,
  classeCreazioneReset,
  classeCreazioneGeoSet,
  classeCreazioneDataSet,
  classeCreazioneGeoComuneSet,
  classeCreazioneGeoScuoleSet,
} from './actions';


/**
 * Esegue il fetch dell'elenco dei comuni data
 * la sigla della provincia
 * @param {object} data dati dell'action
 * @param {object} data.sigla sigla della provincia
 */
export function* classeCreazioneFetchComuniSaga(data) {
  yield put(classeCreazioneSpinnerSet(true));
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_SCUOLE_PROVINCIA}${data.sigla}`
    );

    const scuoleData = response.data.reduce((acc, scuola) => {
      const indirizzoDiStudio = scuola.indirizzo_di_studio.toLowerCase() || /* istanbul ignore next */ 'n/d';

      /* istanbul ignore else */
      if (acc.comuniProvincia.indexOf(scuola.comune) === -1) {
        acc.comuniProvincia.push(scuola.comune);
      }

      if (acc.indirizziDiStudio.indexOf(indirizzoDiStudio) === -1) {
        acc.indirizziDiStudio.push(indirizzoDiStudio);
      }

      /* istanbul ignore else */
      if (!acc.scuoleProvincia[scuola.comune]) {
        acc.scuoleProvincia[scuola.comune] = {};
      }

      /* istanbul ignore else */
      if (!acc.scuoleProvincia[scuola.comune][indirizzoDiStudio]) {
        acc.scuoleProvincia[scuola.comune][indirizzoDiStudio] = [];
      }

      acc.scuoleProvincia[scuola.comune][indirizzoDiStudio].push({
        nome: scuola.nome,
        pk: scuola.pk,
        classi: scuola.classi,
      });

      return acc;
    }, { scuoleProvincia: {}, comuniProvincia: [], indirizziDiStudio: [] });

    yield put(classeCreazioneGeoSet({
      indirizziDiStudio: scuoleData.indirizziDiStudio,
    }));

    yield put(classeCreazioneGeoComuneSet({
      [data.sigla]: scuoleData.comuniProvincia,
    }));

    yield put(classeCreazioneGeoScuoleSet({
      [data.sigla]: scuoleData.scuoleProvincia,
    }));
  } catch (error) {
    yield put(classeCreazioneDataSet({
      display: 'scuoleAttive',
    }));

    yield put(modalSetData({
      contenuto: 'Non ho potuto caricare l\'elenco delle province',
      show: true,
    }));
  }
  yield put(classeCreazioneSpinnerSet(false));
}


/**
 * Esegue il fetch dell'elenco delle province
 */
export function* classeCreazioneFetchProvinceSaga() {
  yield put(classeCreazioneSpinnerSet(true));
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_GEO_PROVINCE}`
    );

    yield put(classeCreazioneGeoSet({
      province: response.data.map((provincia) => ({
        pk: provincia.key,
        nome: provincia.label,
      })),
      isProvinceLoaded: true,
    }));
  } catch (error) {
    yield put(classeCreazioneDataSet({
      display: 'scuoleAttive',
    }));

    yield put(modalSetData({
      contenuto: 'Non ho potuto caricare l\'elenco delle province',
      show: true,
    }));
  }
  yield put(classeCreazioneSpinnerSet(false));
}


/**
 * Esegue la creazione di una nuova classe per la
 * disciplina data
 * @param {object} data oggetto con i dati della chiamata
 * @param {object} data.payload dati da inviare all'endpoint
 */
export function* classeCreazioneScuolePostSaga(data) {
  yield put(classeCreazioneSpinnerSet(true));
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_POST}`,
      data.payload
    );

    yield put(classeCreazioneReset());
    yield call(data.history.push, `/classe-dettaglio/${response.data.pk}`);
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Non ho potuto creare questa classe',
      show: true,
    }));
  }
  yield put(classeCreazioneSpinnerSet(false));
}


/**
 * Legge l'elenco delle scuole del docente
 */
export function* classeCreazioneScuoleAttiveFetchSaga() {
  yield put(classeCreazioneSpinnerSet(true));
  yield put(classeCreazioneReset());

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_FETCH_SCUOLE_DOCENTE}`
    );

    yield put(classeCreazioneScuoleAttiveSet({
      list: response.data,
      isLoaded: true,
    }));
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Non ho potuto leggere l\'elenco delle scuole di questo docente',
      show: true,
    }));
  }
  yield put(classeCreazioneSpinnerSet(false));
}


export function* watchClasseCreazione() {
  yield takeEvery(CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH, classeCreazioneScuoleAttiveFetchSaga);
  yield takeEvery(CLASSE_CREAZIONE_DATA_POST, classeCreazioneScuolePostSaga);
  yield takeEvery(CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH, classeCreazioneFetchProvinceSaga);
  yield takeEvery(CLASSE_CREAZIONE_GEO_COMUNI_FETCH, classeCreazioneFetchComuniSaga);
}

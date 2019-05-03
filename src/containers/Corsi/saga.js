/*
 *
 * Corsi sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH, ACADEMY_PRODUCTS } from 'configuration';
import { livelliFetch } from 'containers/Dashboard/actions';
import { getCookieName, cookieSet } from 'common/cookies';
import {
  CORSI_LIST_INITIALIZE,
  CORSI_URL_LIST_DOCENTE,
  CORSI_URL_LIST_STUDENTE,
  CORSI_URL_CORSO_DETAIL_DOCENTE,
  CORSI_CORSO_DETAIL_DOCENTE_TRIGGER,
} from './constants';
import {
  corsiSpinnerSet,
  corsiErrorReset,
  corsiErrorSet,
  corsiListSet,
  corsiCorsoSelectedDocenteTrigger,
  corsiCorsoDetailDocenteSet,
} from './actions';


/**
 * Effettua il fetch dell'elenco dei corsi associati a studente o docente
 * se studente, si limita all'elenco delle classi in cui è iscritto
 * se docente, fa il fetch del contenuto del corso e setta in un cookie
 * il valore del corso selezionato
 * @param {Object} payload dati della funzione
 * @param {Object} payload.configuration configurazione dell'app
 * @param {Boolean} payload.isDocente indica se il richiedente è un docente
 * @param {Number} payload.userId pk dello studenteAcademy dell'utente richiedente
 */
export function* initializeCorsiList(payload) {
  let url = `${API_BASE_PATH}${CORSI_URL_LIST_STUDENTE}${payload.configuration.disciplinaId}`;
  if (payload.isDocente) {
    url = `${API_BASE_PATH}${CORSI_URL_LIST_DOCENTE}${payload.configuration.disciplinaId}`;
  }
  yield put(corsiSpinnerSet(true));
  yield put(corsiErrorReset());

  try {
    const response = yield call(axios.get, url);
    yield put(corsiListSet({
      items: response.data,
      isCorsiLoaded: true,
    }));

    if (payload.isDocente && response.data.length) {
      const cookieKey = `corsoDocente_${payload.userId}`;
      const pkCorsoPreselezionato = parseInt(getCookieName(cookieKey) || 0, 10);
      const corsoSelezionatoData = response.data
        .filter((r) => (r.pk === pkCorsoPreselezionato))[0] || response.data[0];

      yield put(corsiCorsoDetailDocenteSet({
        pk: corsoSelezionatoData.pk,
        nome: corsoSelezionatoData.nome,
        isCorsoLoaded: true,
      }));

      yield put(corsiCorsoSelectedDocenteTrigger(
        corsoSelezionatoData.pk,
        payload.configuration,
        payload.isDocente,
        payload.userId
      ));

      if (pkCorsoPreselezionato !== corsoSelezionatoData.pk && payload.userId) {
        yield call(cookieSet, {
          cookieKey,
          payload: corsoSelezionatoData.pk,
        });
      }
    } else if (!response.data.length && ['alatin', 'lyceum', 'itaca', 'argonauta'].indexOf(payload.configuration.product) > -1) {
      yield put(corsiCorsoDetailDocenteSet({
        isCorsoLoaded: true,
      }));

      yield put(livelliFetch(
        payload.configuration,
        payload.isDocente,
      ));
    }
  } catch (error) {
    yield put(corsiErrorSet(
      true,
      'Impossibile leggere il corso'
    ));
  }

  yield put(corsiSpinnerSet(false));
}

export function* corsoDetailDocenteSaga(payload) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CORSI_URL_CORSO_DETAIL_DOCENTE}${payload.idCorso}`
    );
    yield put(corsiCorsoDetailDocenteSet({
      pk: response.data.pk,
      nome: response.data.nome,
      iscritti: response.data.iscritti,
      isCorsoLoaded: true,
      isIscrittiLoaded: true,
    }));
    /* istanbul ignore else */
    if (ACADEMY_PRODUCTS[payload.configuration.disciplinaId]) {
      yield put(livelliFetch(
        payload.configuration,
        payload.isDocente,
        payload.idCorso
      ));

      yield call(cookieSet, {
        cookieKey: `corsoDocente_${payload.userId}`,
        payload: payload.idCorso,
      });
    }
  } catch (error) {
    yield put(corsiErrorSet(
      true,
      'Impossibile leggere il corso selezionato'
    ));
  }
}

export function* watchCorsi() {
  yield takeEvery(CORSI_LIST_INITIALIZE, initializeCorsiList);
  yield takeEvery(CORSI_CORSO_DETAIL_DOCENTE_TRIGGER, corsoDetailDocenteSaga);
}


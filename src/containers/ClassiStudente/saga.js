import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { userEvaluateTrigger } from 'containers/User/actions';
import {
  CLASSI_STUDENTE_FETCH,
  CLASSI_STUDENTE_URI_ISCRIVITI_POST,
  CLASSI_STUDENTE_URI_FETCH,
  CLASSI_STUDENTE_ISCRIVITI_POST,
} from './constants';
import {
  classiStudenteFetch,
  classiStudenteSet,
  classiStudenteSpinnerSet,
  classiStudenteFeedbackSet,
  classiStudenteFeedbackReset,
} from './actions';


/**
 * Fa una chiamata post all'endpoint che effettua l'iscrizione
 * dello studente ad un corso
 * @param {object} data dati da inviare
 * @param {object} data.configuration configuration del progetto
 * @param {number} data.configuration.disciplinaId pk della disciplina
 * @param {string} data.codiceCorso codice del corso da inviare
 */
export function* classiStudenteIscrivitiPost(data) {
  yield put(classiStudenteSpinnerSet(true));
  yield put(classiStudenteFeedbackReset());
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${CLASSI_STUDENTE_URI_ISCRIVITI_POST}`, {
        corso: data.codiceCorso,
        disciplina: data.configuration.disciplinaId,
      }
    );

    if (response.status === 200) {
      yield put(classiStudenteFeedbackSet(
        true,
        'okay',
        'La tua iscrizione è avvenuta correttamente'
      ));
      yield put(classiStudenteFetch(data.configuration.disciplinaId));
      yield put(userEvaluateTrigger(data.configuration));
    } else {
      yield put(classiStudenteFeedbackSet(
        true,
        'error',
        'Il codice inserito non è valido'
      ));
    }
  } catch (error) {
    yield put(classiStudenteFeedbackSet(
      true,
      'error',
      'Il codice inserito non è valido'
    ));
  }
  yield put(classiStudenteSpinnerSet(false));
}


/**
 * Esegue il fetch dell'elenco delle classi in cui è
 * iscritto lo studente
 * @param {object} data dati della richiesta
 * @param {number} data.disciplinaId id della disciplina
 */
export function* fetchClassiStudente(data) {
  yield put(classiStudenteSpinnerSet(true));
  yield put(classiStudenteFeedbackReset());
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CLASSI_STUDENTE_URI_FETCH}${data.disciplinaId}`
    );
    yield put(classiStudenteSet(response.data));
  } catch (error) {
    yield put(classiStudenteFeedbackSet(
      true,
      'error',
      'Impossibile iscriversi a questa classe'
    ));
  }
  yield put(classiStudenteSpinnerSet(false));
}

export function* watchClassiStudente() {
  yield takeEvery(CLASSI_STUDENTE_ISCRIVITI_POST, classiStudenteIscrivitiPost);
  yield takeEvery(CLASSI_STUDENTE_FETCH, fetchClassiStudente);
}

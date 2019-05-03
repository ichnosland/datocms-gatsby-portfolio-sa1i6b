/*
 *
 * Classi sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { CLASSI_DATA_FETCH, CLASSI_URI_DATA_FETCH } from './constants';
import {
  classiSpinnerSet,
  classiFeedbackReset,
  classiFeedbackSet,
  classiDataSet,
} from './actions';


export function* sagaFetchClassi(payload) {
  yield put(classiSpinnerSet(true));
  yield put(classiFeedbackReset());
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CLASSI_URI_DATA_FETCH}${payload.idDisciplina}`
    );
    yield put(classiDataSet(response.data));
  } catch (error) {
    yield put(classiFeedbackSet(
      true,
      'Impossibile leggere le classi'
    ));
  }
  yield put(classiSpinnerSet(false));
}

export function* classiWatch() {
  yield takeEvery(CLASSI_DATA_FETCH, sagaFetchClassi);
}

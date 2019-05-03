/*
 *
 * TestoIntroduttivo sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { TESTOINTRODUTTIVO_DATA_FETCH, TESTOINTRODUTTIVO_URI_DATA_FETCH } from './constants';
import {
  testoIntroduttivoSpinnerSet,
  testoIntroduttivoErrorReset,
  testoIntroduttivoErrorSet,
  testoIntroduttivoDataSet,
} from './actions';


export function* sagaFetchTestoIntroduttivo(payload) {
  yield put(testoIntroduttivoSpinnerSet(true));
  yield put(testoIntroduttivoErrorReset());
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${TESTOINTRODUTTIVO_URI_DATA_FETCH}${payload.idTestoIntroduttivo}`
    );
    yield put(testoIntroduttivoDataSet(response.data));
  } catch (error) {
    yield put(testoIntroduttivoErrorSet(
      true,
      'Impossibile leggere il testo introduttivo per questa missione'
    ));
  }
  yield put(testoIntroduttivoSpinnerSet(false));
}

export function* testoIntroduttivoWatch() {
  yield takeEvery(TESTOINTRODUTTIVO_DATA_FETCH, sagaFetchTestoIntroduttivo);
}


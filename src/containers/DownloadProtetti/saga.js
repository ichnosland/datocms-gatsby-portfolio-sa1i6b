/**
 *
 * DownloadProtetti
 *
 */

import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import { DOWNLOAD_PROTETTI_URL, DOWNLOAD_PROTETTI_FETCH } from './constants';

export function* downloadProtettiFetchSaga(data) {
  const finestraEsterna = data.window;
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${DOWNLOAD_PROTETTI_URL}${data.slug}`
    );

    if (response.status === 200) {
      finestraEsterna.location = response.data.url;
    } else {
      try {
        finestraEsterna.close();
      } catch (e) /* istanbul ignore next */ { /* non faccio niente se non posso fare il close */ }
      yield put(modalSetData({
        contenuto: 'Questo documento non è disponibile',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    }
  } catch (error) {
    try {
      finestraEsterna.close();
    } catch (e) /* istanbul ignore next */ { /* non faccio niente se non posso fare il close */ }
    yield put(modalSetData({
      contenuto: 'Questo documento non è disponibile',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
}

export function* watchDownloadProtetti() {
  yield takeEvery(DOWNLOAD_PROTETTI_FETCH, downloadProtettiFetchSaga);
}

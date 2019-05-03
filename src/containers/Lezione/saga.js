/*
 *
 * Lezione sagas
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { LEZIONE_DATA_FETCH, LEZIONE_URI_DATA_FETCH } from './constants';
import {
  lezioneSpinnerSet,
  lezioneErrorReset,
  lezioneErrorSet,
  lezioneDataSet,
} from './actions';


export const calcolaCarousel = (testoDaAnalizzare) => {
  let countCarousel = 0;
  const childNodesList = [];

  const nodoAnalizzare = window.document.createElement('div');
  nodoAnalizzare.innerHTML = testoDaAnalizzare;

  try {
    [...nodoAnalizzare.childNodes].forEach((nodo, key) => {
      if ([3, 4, 7, 8, 10, 12].indexOf(nodo.nodeType) === -1) {
        const carosello = nodo.getAttribute('carousel');

        if (carosello !== null) {
          childNodesList.push({
            type: 'carosello',
            carosello: countCarousel,
            key: `carosello_${countCarousel}_${key}`,
          });
          countCarousel += 1;
        } else {
          childNodesList.push({
            type: 'html',
            content: nodo.outerHTML,
            key: `html_${key}`,
          });
        }
      } else {
        childNodesList.push({
          type: 'text',
          content: nodo.textContent,
        });
      }
    });
  } catch (error) {
    // non mi serve gestire l'errore
  }

  return childNodesList;
};


export function* sagaFetchLezione(payload) {
  yield put(lezioneSpinnerSet(true));
  yield put(lezioneErrorReset());
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${LEZIONE_URI_DATA_FETCH}${payload.idLezione}`
    );

    if (response.data.pubblicata) {
      yield put(lezioneDataSet({
        titolo: response.data.titolo,
        contenuto: calcolaCarousel(response.data.html.testo, response.data.html.tabelle),
        tabelle: response.data.html.tabelle,
        pubblicata: response.data.pubblicata,
        unitaId: response.data.unita,
      }));
    } else {
      yield put(lezioneErrorSet(
        true,
        'Per questa unità non è prevista una scheda specifica',
      ));
    }
  } catch (error) {
    yield put(lezioneErrorSet(
      true,
      'Impossibile leggere la lezione associata a questa unità'
    ));
  }
  yield put(lezioneSpinnerSet(false));
}

export function* lezioneWatch() {
  yield takeEvery(LEZIONE_DATA_FETCH, sagaFetchLezione);
}


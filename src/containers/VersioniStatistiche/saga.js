import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_BASE_PATH } from 'configuration';
import {
  calcolaDatiReportVersione,
  calculateNextPreviousIds,
  calculateSortedPks,
  calcolaReportDisponibili,
  calcolaStudenteSelezionato,
} from 'common/statistiche';

import {
  versioniStatisticheSpinnerSet,
  versioniStatisticheFeedbackReset,
  versioniStatisticheFeedbackSet,
  versioniStatisticheDataSet,
  versioniStatisticheDataSelect,
} from './actions';
import {
  VERSIONI_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  VERSIONI_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  VERSIONI_STATISTICHE_DATA_FETCH,
  VERSIONI_STATISTICHE_DATA_SELECT,
} from './constants';


/**
 *
 * @param {object} data
 * @param {object} data.payload
 * @param {object} data.payload.idAssegnazione
 * @param {object} data.payload.idMissione
 * @param {object} data.payload.idUtente
 * @param {object} data.payload.statisticheDisponibili
 * @param {object} data.payload.history
 */
export function* versioneStatisticheSelect(data) {
  yield put(versioniStatisticheSpinnerSet(true));

  const reportTrovati = calcolaReportDisponibili(data.payload.statisticheDisponibili, 'assegnazione_id');
  const prevNext = calculateNextPreviousIds(
    reportTrovati.report_disponibili,
    parseInt(data.payload.idAssegnazione, 10)
  );

  const reportSelezionato = data.payload.statisticheDisponibili.filter(
    (stat) => (stat.assegnazione_id === parseInt(data.payload.idAssegnazione, 10))
  )[0];

  if (!reportSelezionato) {
    yield put(versioniStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    ));
  } else {
    const utenteSelezionato = calcolaStudenteSelezionato(
      reportSelezionato.studenti, data.payload.idUtente
    );
    const reportData = calcolaDatiReportVersione(
      reportSelezionato.esercizi, reportSelezionato.risposte
    );

    // dato che il back-end non mi rimuove i dati degli studenti, lo devo fare io
    const statisticheData = {
      reportDisponibili: reportTrovati.report_disponibili,
      esercizi: reportData.esercizi,
      stepPks: calculateSortedPks(reportData.stepPks),
      risposte: reportData.risposte,
      studenti: reportSelezionato.studenti || [],
      media: reportSelezionato.media || {},
      scores: reportSelezionato.scores || [],
      nome: reportSelezionato.nome || '',
      grafici: reportTrovati.grafici,
      previousId: prevNext.previous,
      nextId: prevNext.next,
      idAssegnazione: reportSelezionato.assegnazione_id,
      id: reportSelezionato.versione_id,
      openedSections: {},
      utenteSelezionato,
    };

    /**
     * Se non ho studenti non devo nemmeno avere risposte, media e scores
     * devo farlo perché i dati non mi arrivano già puliti dal back-end
     * Quindi se ho rimosso io a mano gli studenti e non ho dati, devo
     * svuotare a mano questi campi
     */
    if ((reportSelezionato.studenti || []).length === 0) {
      statisticheData.risposte = {};
      statisticheData.media = {};
      statisticheData.scores = [];
    }

    yield put(versioniStatisticheDataSet(statisticheData));

    yield call(
      data.payload.history.push,
      `/versione-statistiche/${data.payload.idMissione}/${data.payload.idAssegnazione}`
    );
  }
  yield put(versioniStatisticheSpinnerSet(false));
}


/**
 * Fa il fetch dei dati delle statistiche versione dall'endpoint
 * @param {object} data
 * @param {object} data.payload
 * @param {bool} data.payload.isDocente indica se la richiesta proviene da un docente
 * @param {Number} data.payload.idAssegnazione id dell'assegnazione
 * @param {Number} data.payload.idCorso id del corso selezionato
 * @param {Number} data.payload.idMissione id della missione selezionata
 * @param {Number} data.payload.idUtente id utente da selezionare
 */
export function* versioneStatisticheFetch(data) {
  yield put(versioniStatisticheSpinnerSet(true));
  yield put(versioniStatisticheFeedbackReset());
  try {
    let response;

    if (data.payload.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_STATISTICHE_URI_DATA_FETCH_DOCENTE}${data.payload.idMissione}/${data.payload.idCorso}`
      );
    } else {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_STATISTICHE_URI_DATA_FETCH_STUDENTE}${data.payload.idMissione}`
      );
    }

    if (response.data.length) {
      yield put(versioniStatisticheDataSet({
        statisticheDisponibili: response.data,
        isLoaded: true,
        idMissione: data.payload.idMissione,
      }));

      yield put(versioniStatisticheDataSelect({

        idAssegnazione: data.payload.idAssegnazione || (response.data[0] || /* istanbul ignore next */[]).assegnazione_id || /* istanbul ignore next */ 0,
        statisticheDisponibili: response.data,
        idMissione: data.payload.idMissione,
        idUtente: data.payload.idUtente,
        history: data.payload.history,
      }));
    } else {
      yield put(versioniStatisticheFeedbackSet(
        true,
        'error',
        'Non sono presenti statistiche per questa missione'
      ));
    }
  } catch (error) {
    yield put(versioniStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    ));
  }
  yield put(versioniStatisticheSpinnerSet(false));
}

export function* watchVersioniStatistiche() {
  yield takeEvery(VERSIONI_STATISTICHE_DATA_FETCH, versioneStatisticheFetch);
  yield takeEvery(VERSIONI_STATISTICHE_DATA_SELECT, versioneStatisticheSelect);
}

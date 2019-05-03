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
  versioniLivelloStatisticheSpinnerSet,
  versioniLivelloStatisticheFeedbackReset,
  versioniLivelloStatisticheFeedbackSet,
  versioniLivelloStatisticheDataSet,
  versioniLivelloStatisticheDataSelect,
} from './actions';
import {
  VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH,
  VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT,
} from './constants';


/**
 *
 * @param {object} data
 * @param {object} data.payload
 * @param {object} data.payload.idVersione
 * @param {object} data.payload.idLivello
 * @param {object} data.payload.idUtente
 * @param {object} data.payload.statisticheDisponibili
 * @param {object} data.payload.history
 */
export function* versioneStatisticheSelect(data) {
  yield put(versioniLivelloStatisticheSpinnerSet(true));

  const reportTrovati = calcolaReportDisponibili(data.payload.statisticheDisponibili, 'versione_id');
  const prevNext = calculateNextPreviousIds(
    reportTrovati.report_disponibili,
    parseInt(data.payload.idVersione, 10)
  );

  const reportSelezionato = data.payload.statisticheDisponibili.filter(
    (stat) => (stat.versione_id === parseInt(data.payload.idVersione, 10))
  )[0];

  if (!reportSelezionato) {
    yield put(versioniLivelloStatisticheFeedbackSet(
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
      idVersione: reportSelezionato.versione_id,
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

    yield put(versioniLivelloStatisticheDataSet(statisticheData));

    yield call(
      data.payload.history.push,
      `/versione-livello-statistiche/${data.payload.idLivello}/${data.payload.idVersione}`
    );
  }

  yield put(versioniLivelloStatisticheSpinnerSet(false));
}


/**
 * Fa il fetch dei dati delle statistiche versione dall'endpoint
 * @param {object} data
 * @param {object} data.payload
 * @param {bool} data.payload.isDocente indica se la richiesta proviene da un docente
 * @param {Number} data.payload.idVersione id dell'assegnazione
 * @param {Number} data.payload.idCorso id del corso selezionato
 * @param {Number} data.payload.idLivello id del livello selezionato
 * @param {Number} data.payload.idUtente id utente da selezionare
 */
export function* versioneStatisticheFetch(data) {
  yield put(versioniLivelloStatisticheSpinnerSet(true));
  yield put(versioniLivelloStatisticheFeedbackReset());
  try {
    let response;

    if (data.payload.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE}${data.payload.idLivello}/${data.payload.idCorso}`
      );
    } else {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}${data.payload.idLivello}`
      );
    }

    if (response.data.length) {
      yield put(versioniLivelloStatisticheDataSet({
        statisticheDisponibili: response.data,
        isLoaded: true,
        idLivello: data.payload.idLivello,
      }));

      yield put(versioniLivelloStatisticheDataSelect({
        idVersione: data.payload.idVersione || (response.data[0] || {}).versione_id || 0,
        statisticheDisponibili: response.data,
        idLivello: data.payload.idLivello,
        idUtente: data.payload.idUtente,
        history: data.payload.history,
      }));
    } else {
      yield put(versioniLivelloStatisticheFeedbackSet(
        true,
        'error',
        'Non sono presenti statistiche per questo livello'
      ));
    }
  } catch (error) {
    yield put(versioniLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    ));
  }
  yield put(versioniLivelloStatisticheSpinnerSet(false));
}

export function* watchVersioniLivelloStatistiche() {
  yield takeEvery(VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH, versioneStatisticheFetch);
  yield takeEvery(VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT, versioneStatisticheSelect);
}

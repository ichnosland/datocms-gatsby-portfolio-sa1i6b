import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_BASE_PATH } from 'configuration';

import {
  calcolaDatiReportEsercitazione,
  calculateNextPreviousIds,
  calcolaReportDisponibili,
  calcolaStudenteSelezionato,
} from 'common/statistiche';

import {
  provaCompetenzaStatisticheSpinnerSet,
  provaCompetenzaStatisticheFeedbackReset,
  provaCompetenzaStatisticheFeedbackSet,
  provaCompetenzaStatisticheDataSet,
  provaCompetenzaStatisticheDataSelect,
} from './actions';
import {
  PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  PROVA_COMPETENZA_STATISTICHE_DATA_SELECT,
  PROVA_COMPETENZA_STATISTICHE_DATA_FETCH,
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
export function* provaCompetenzaStatisticheSelect(data) {
  yield put(provaCompetenzaStatisticheSpinnerSet(true));

  const reportTrovati = calcolaReportDisponibili(data.payload.statisticheDisponibili, 'assegnazione_id');
  const prevNext = calculateNextPreviousIds(
    reportTrovati.report_disponibili,
    parseInt(data.payload.idAssegnazione, 10)
  );

  const reportSelezionato = data.payload.statisticheDisponibili.filter(
    (stat) => (stat.assegnazione_id === parseInt(data.payload.idAssegnazione, 10))
  )[0];

  if (!reportSelezionato) {
    yield put(provaCompetenzaStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    ));
  } else {
    const utenteSelezionato = calcolaStudenteSelezionato(
      reportSelezionato.studenti, data.payload.idUtente
    );
    const reportData = calcolaDatiReportEsercitazione(
      reportSelezionato.esercizi, reportSelezionato.risposte
    );

    // dato che il back-end non mi rimuove i dati degli studenti, lo devo fare io
    const statisticheData = {
      reportDisponibili: reportTrovati.report_disponibili,
      esercizi: reportData.esercizi,
      stepPks: reportData.stepPks.sort((a, b) => (a - b)),
      risposte: reportData.risposte,
      studenti: reportSelezionato.studenti || [],
      media: reportSelezionato.media || {},
      scores: reportSelezionato.scores || [],
      nome: reportSelezionato.nome || '',
      grafici: reportTrovati.grafici,
      previousId: prevNext.previous,
      nextId: prevNext.next,
      idAssegnazione: reportSelezionato.assegnazione_id,
      id: reportSelezionato.prova_competenza_id,
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

    yield put(provaCompetenzaStatisticheDataSet(statisticheData));

    yield call(
      data.payload.history.push,
      `/prova-competenza-statistiche/${data.payload.idMissione}/${data.payload.idAssegnazione}`
    );
  }

  yield put(provaCompetenzaStatisticheSpinnerSet(false));
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
export function* provaCompetenzaStatisticheFetch(data) {
  yield put(provaCompetenzaStatisticheSpinnerSet(true));
  yield put(provaCompetenzaStatisticheFeedbackReset());
  try {
    let response;

    if (data.payload.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_DOCENTE}${data.payload.idMissione}/${data.payload.idCorso}`
      );
    } else {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_STUDENTE}${data.payload.idMissione}`
      );
    }
    if (response.data.length) {
      yield put(provaCompetenzaStatisticheDataSet({
        statisticheDisponibili: response.data,
        isLoaded: true,
        idMissione: data.payload.idMissione,
      }));

      yield put(provaCompetenzaStatisticheDataSelect({
        idAssegnazione: data.payload.idAssegnazione || (response.data[0] || /* istanbul ignore next */[]).assegnazione_id || /* istanbul ignore next */ 0,
        statisticheDisponibili: response.data,
        idMissione: data.payload.idMissione,
        idUtente: data.payload.idUtente,
        history: data.payload.history,
      }));
    } else {
      yield put(provaCompetenzaStatisticheFeedbackSet(
        true,
        'error',
        'Non sono presenti statistiche per questa missione'
      ));
    }
  } catch (error) {
    yield put(provaCompetenzaStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    ));
  }
  yield put(provaCompetenzaStatisticheSpinnerSet(false));
}

export function* watchProvaCompetenzaStatistiche() {
  yield takeEvery(PROVA_COMPETENZA_STATISTICHE_DATA_FETCH, provaCompetenzaStatisticheFetch);
  yield takeEvery(PROVA_COMPETENZA_STATISTICHE_DATA_SELECT, provaCompetenzaStatisticheSelect);
}

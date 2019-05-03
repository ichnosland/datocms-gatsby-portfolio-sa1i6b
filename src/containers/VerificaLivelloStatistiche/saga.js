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
  verificaLivelloStatisticheSpinnerSet,
  verificaLivelloStatisticheFeedbackReset,
  verificaLivelloStatisticheFeedbackSet,
  verificaLivelloStatisticheDataSet,
  verificaLivelloStatisticheDataSelect,
} from './actions';
import {
  VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH,
  VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT,
} from './constants';


/**
 *
 * @param {object} data
 * @param {object} data.payload
 * @param {object} data.payload.idVerifica
 * @param {object} data.payload.idLivello
 * @param {object} data.payload.idUtente
 * @param {object} data.payload.statisticheDisponibili
 * @param {object} data.payload.history
 */
export function* verificaStatisticheSelect(data) {
  yield put(verificaLivelloStatisticheSpinnerSet(true));

  const reportTrovati = calcolaReportDisponibili(data.payload.statisticheDisponibili, 'verifica_id');
  const prevNext = calculateNextPreviousIds(
    reportTrovati.report_disponibili,
    parseInt(data.payload.idVerifica, 10)
  );

  const reportSelezionato = data.payload.statisticheDisponibili.filter(
    (stat) => (stat.verifica_id === parseInt(data.payload.idVerifica, 10))
  )[0];

  if (!reportSelezionato) {
    yield put(verificaLivelloStatisticheFeedbackSet(
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
      stepPks: reportData.stepPks,
      risposte: reportData.risposte,
      studenti: reportSelezionato.studenti || [],
      media: reportSelezionato.media || {},
      scores: reportSelezionato.scores || [],
      nome: reportSelezionato.nome || '',
      grafici: reportTrovati.grafici,
      previousId: prevNext.previous,
      nextId: prevNext.next,
      idVerifica: reportSelezionato.verifica_id,
      id: reportSelezionato.verifica_id,
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

    yield put(verificaLivelloStatisticheDataSet(statisticheData));

    yield call(
      data.payload.history.push,
      `/verifiche-livello-statistiche/${data.payload.idLivello}/${data.payload.idVerifica}`
    );
  }

  yield put(verificaLivelloStatisticheSpinnerSet(false));
}


/**
 * Fa il fetch dei dati delle statistiche verifica dall'endpoint
 * @param {object} data
 * @param {object} data.payload
 * @param {bool} data.payload.isDocente indica se la richiesta proviene da un docente
 * @param {Number} data.payload.idVerifica id dell'assegnazione
 * @param {Number} data.payload.idCorso id del corso selezionato
 * @param {Number} data.payload.idLivello id del livello selezionato
 * @param {Number} data.payload.idUtente id utente da selezionare
 */
export function* verificaStatisticheFetch(data) {
  yield put(verificaLivelloStatisticheSpinnerSet(true));
  yield put(verificaLivelloStatisticheFeedbackReset());
  try {
    let response;

    if (data.payload.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE}${data.payload.idLivello}/${data.payload.idCorso}`
      );
    } else {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}${data.payload.idLivello}`
      );
    }

    if (response.data.length) {
      yield put(verificaLivelloStatisticheDataSet({
        statisticheDisponibili: response.data,
        isLoaded: true,
        idLivello: data.payload.idLivello,
      }));

      yield put(verificaLivelloStatisticheDataSelect({
        idVerifica: data.payload.idVerifica || (response.data[0] || {}).verifica_id || 0,
        statisticheDisponibili: response.data,
        idLivello: data.payload.idLivello,
        idUtente: data.payload.idUtente,
        history: data.payload.history,
      }));
    } else {
      yield put(verificaLivelloStatisticheFeedbackSet(
        true,
        'error',
        'Non sono presenti statistiche per questo livello'
      ));
    }
  } catch (error) {
    yield put(verificaLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    ));
  }
  yield put(verificaLivelloStatisticheSpinnerSet(false));
}

export function* watchVerificaLivelloStatistiche() {
  yield takeEvery(VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH, verificaStatisticheFetch);
  yield takeEvery(VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT, verificaStatisticheSelect);
}

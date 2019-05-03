/**
 * Test  sagas
 */

import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { versioniStatisticheResponse } from 'common/testing-fixtures/versioni-report';
import {
  calcolaDatiReportVersione,
  calcolaReportDisponibili,
} from 'common/statistiche';

import {
  versioneStatisticheFetch,
  watchVersioniStatistiche,
  versioneStatisticheSelect,
} from '../saga';
import {
  versioniStatisticheSpinnerSet,
  versioniStatisticheFeedbackReset,
  versioniStatisticheFeedbackSet,
  versioniStatisticheDataSet,
  versioniStatisticheDataSelect,
} from '../actions';
import {
  VERSIONI_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  VERSIONI_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  VERSIONI_STATISTICHE_DATA_SELECT,
  VERSIONI_STATISTICHE_DATA_FETCH,
} from '../constants';


/* eslint-disable redux-saga/yield-effects */
describe('versioneStatisticheFetch', () => {
  const mockHistory = {
    push: () => { },
  };

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: true,
        idAssegnazione: 123,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_STATISTICHE_URI_DATA_FETCH_DOCENTE}567/345`
    ));

    expect(gen.next({ data: versioniStatisticheResponse }).value).toEqual(put(versioniStatisticheDataSet({
      statisticheDisponibili: versioniStatisticheResponse,
      isLoaded: true,
      idMissione: 567,
    })));

    expect(gen.next({ data: versioniStatisticheResponse }).value).toEqual(put(versioniStatisticheDataSelect({
      statisticheDisponibili: versioniStatisticheResponse,
      idAssegnazione: 123,
      idUtente: 789,
      idMissione: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: 123,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({ data: versioniStatisticheResponse }).value).toEqual(put(versioniStatisticheDataSet({
      statisticheDisponibili: versioniStatisticheResponse,
      isLoaded: true,
      idMissione: 567,
    })));

    expect(gen.next({ data: versioniStatisticheResponse }).value).toEqual(put(versioniStatisticheDataSelect({
      statisticheDisponibili: versioniStatisticheResponse,
      idAssegnazione: 123,
      idUtente: 789,
      idMissione: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è negativo', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: 123,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next().value).toEqual(put(versioniStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando idAssegnazion non è settato (viene presa la prima pk disponibile)', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: undefined,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));


    expect(gen.next({ data: versioniStatisticheResponse }).value).toEqual(put(versioniStatisticheDataSet({
      statisticheDisponibili: versioniStatisticheResponse,
      isLoaded: true,
      idMissione: 567,
    })));

    expect(gen.next({ data: versioniStatisticheResponse }).value).toEqual(put(versioniStatisticheDataSelect({
      statisticheDisponibili: versioniStatisticheResponse,
      idAssegnazione: 126,
      idUtente: 789,
      idMissione: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando restituisce un array vuoto', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: undefined,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({ data: [] }).value).toEqual(put(versioniStatisticheFeedbackSet(
      true,
      'error',
      'Non sono presenti statistiche per questa missione'
    )));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });
});

describe('versioneStatisticheSelect', () => {
  const mockHistory = {
    push: () => { },
  };
  const idAssegnazione = 126;
  const reportTrovati = calcolaReportDisponibili(versioniStatisticheResponse, 'assegnazione_id');
  const reportSelezionato = versioniStatisticheResponse[0];
  const reportData = calcolaDatiReportVersione(reportSelezionato.esercizi, reportSelezionato.risposte);
  const stepPksFound = [
    '1.0-0', '1.0-1', '1.0-2', '2.0-0', '2.0-1', '2.0-2', '2.0-3',
    '2.0-4', '3.0-0', '3.0-1', '3.0-2', '3.0-3', '3.0-4', '3.0-5',
    '4.0-0', '4.0-1', '4.0-2', '4.0-3', '4.0-4', '5.0-0', '5.0-1',
    '5.0-2', '6.0-0', '6.0-1', '6.0-2', '6.0-3',
  ];

  it('testo che funzioni come atteso quando l\'esito è positivo e idUtente > 0', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idAssegnazione,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: versioniStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idAssegnazione: 126,
      id: 621,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: stepPksFound,
      nome: versioniStatisticheResponse[0].nome,
      studenti: versioniStatisticheResponse[0].studenti,
      media: versioniStatisticheResponse[0].media,
      scores: versioniStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 103,
      utenteSelezionato: {
        id: 455024,
        key: 0,
        nome: 'Rosa Coccodrillo',
        voto: 0.384615384615385,
      },
      openedSections: {},
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/versione-statistiche/567/126'));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando idAssegnazione non esiste', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idAssegnazione: 999999,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: versioniStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando idAssegnazione esiste ma è vuota', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idAssegnazione: 126,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: [{
          ...versioniStatisticheResponse[0],
          studenti: undefined,
          titolo: undefined,
          esercizi: undefined,
          media: undefined,
          nome: undefined,
          scores: undefined,
          media_nazionale: undefined,
          media_nazionale_campioni: undefined,
        }, versioniStatisticheResponse[1]],
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(put(versioniStatisticheDataSet({
      reportDisponibili: [126, 103],
      idAssegnazione: 126,
      id: 621,
      esercizi: {},
      risposte: {},
      stepPks: [],
      nome: '',
      studenti: [],
      media: {},
      scores: [],
      grafici: [{
        id: 126,
        media: 0,
        media_nazionale: 0,
        media_nazionale_campioni: 0,
        scores: [],
        titolo: '',
      }, {
        id: 103,
        media: 1.05263157894737,
        media_nazionale: 6.32071061576366,
        media_nazionale_campioni: 6,
        scores: [{
          id: 455024,
          voto: 1.05263157894737,
        }],
        titolo: 'La morte di Clito',
      }],
      previousId: -1,
      nextId: 103,
      utenteSelezionato: {
        id: -1,
        key: -1,
      },
      openedSections: {},
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/versione-statistiche/567/126'));
    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e idUtente > 0 ma non è presente tra gli studenti', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idAssegnazione,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: [{
          ...versioniStatisticheResponse[0],
          studenti: [],
        }],
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(put(versioniStatisticheDataSet({
      reportDisponibili: [126],
      idAssegnazione: 126,
      id: 621,
      esercizi: reportData.esercizi,
      risposte: {},
      stepPks: stepPksFound,
      nome: versioniStatisticheResponse[0].nome,
      studenti: [],
      media: {},
      scores: [],
      grafici: [{
        id: 126,
        media: 5.077307692307692,
        media_nazionale: 0.384615384615385,
        media_nazionale_campioni: 1,
        scores: [],
        titolo: 'La mia casa',
      }],
      previousId: -1,
      nextId: -1,
      utenteSelezionato: {
        id: -1,
        key: -1,
      },
      openedSections: {},
    })));

    gen.next();
    gen.next();
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e idUtente == undefined', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idAssegnazione,
        idMissione: 567,
        idUtente: undefined,
        history: mockHistory,
        statisticheDisponibili: versioniStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(true)));

    expect(gen.next().value).toEqual(put(versioniStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idAssegnazione: 126,
      id: 621,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: stepPksFound,
      nome: versioniStatisticheResponse[0].nome,
      studenti: versioniStatisticheResponse[0].studenti,
      media: versioniStatisticheResponse[0].media,
      scores: versioniStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 103,
      utenteSelezionato: undefined,
      openedSections: {},
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/versione-statistiche/567/126'));

    expect(gen.next().value).toEqual(put(versioniStatisticheSpinnerSet(false)));
  });
});

describe('watchVersioniStatistiche', () => {
  it('testo che funzioni come atteso', () => {
    const gen = watchVersioniStatistiche();

    expect(gen.next().value).toEqual(takeEvery(
      VERSIONI_STATISTICHE_DATA_FETCH, versioneStatisticheFetch
    ));

    expect(gen.next().value).toEqual(takeEvery(
      VERSIONI_STATISTICHE_DATA_SELECT, versioneStatisticheSelect
    ));
  });
});

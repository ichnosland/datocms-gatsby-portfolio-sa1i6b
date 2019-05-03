import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import {
  calcolaDatiReportEsercitazione,
  calcolaReportDisponibili,
} from 'common/statistiche';
import { provaCompetenzaStatisticheResponse } from 'common/testing-fixtures/prova-competenza-report';

import {
  provaCompetenzaStatisticheFetch,
  watchProvaCompetenzaStatistiche,
  provaCompetenzaStatisticheSelect,
} from '../saga';
import {
  provaCompetenzaStatisticheSpinnerSet,
  provaCompetenzaStatisticheFeedbackReset,
  provaCompetenzaStatisticheFeedbackSet,
  provaCompetenzaStatisticheDataSet,
  provaCompetenzaStatisticheDataSelect,
} from '../actions';
import {
  PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  PROVA_COMPETENZA_STATISTICHE_DATA_SELECT,
  PROVA_COMPETENZA_STATISTICHE_DATA_FETCH,
} from '../constants';


/* eslint-disable redux-saga/yield-effects */
describe('provaCompetenzaStatisticheFetch', () => {
  const mockHistory = {
    push: () => { },
  };

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true', () => {
    const gen = provaCompetenzaStatisticheFetch({
      payload: {
        isDocente: true,
        idAssegnazione: 123,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_DOCENTE}567/345`
    ));

    expect(gen.next({ data: provaCompetenzaStatisticheResponse }).value).toEqual(put(provaCompetenzaStatisticheDataSet({
      statisticheDisponibili: provaCompetenzaStatisticheResponse,
      isLoaded: true,
      idMissione: 567,
    })));

    expect(gen.next({ data: provaCompetenzaStatisticheResponse }).value).toEqual(put(provaCompetenzaStatisticheDataSelect({
      statisticheDisponibili: provaCompetenzaStatisticheResponse,
      idAssegnazione: 123,
      idUtente: 789,
      idMissione: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false', () => {
    const gen = provaCompetenzaStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: 123,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({ data: provaCompetenzaStatisticheResponse }).value).toEqual(put(provaCompetenzaStatisticheDataSet({
      statisticheDisponibili: provaCompetenzaStatisticheResponse,
      isLoaded: true,
      idMissione: 567,
    })));

    expect(gen.next({ data: provaCompetenzaStatisticheResponse }).value).toEqual(put(provaCompetenzaStatisticheDataSelect({
      statisticheDisponibili: provaCompetenzaStatisticheResponse,
      idAssegnazione: 123,
      idUtente: 789,
      idMissione: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });


  it('testo che funzioni come atteso quando l\'esito è negativo', () => {
    const gen = provaCompetenzaStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: 123,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando idAssegnazion non è settato (viene presa la prima pk disponibile)', () => {
    const gen = provaCompetenzaStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: undefined,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));


    expect(gen.next({ data: provaCompetenzaStatisticheResponse }).value).toEqual(put(provaCompetenzaStatisticheDataSet({
      statisticheDisponibili: provaCompetenzaStatisticheResponse,
      isLoaded: true,
      idMissione: 567,
    })));

    expect(gen.next({ data: provaCompetenzaStatisticheResponse }).value).toEqual(put(provaCompetenzaStatisticheDataSelect({
      statisticheDisponibili: provaCompetenzaStatisticheResponse,
      idAssegnazione: 1,
      idUtente: 789,
      idMissione: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });

  it('testo che imposti un messaggio di errore quando ho un array vuoto da CS', () => {
    const gen = provaCompetenzaStatisticheFetch({
      payload: {
        isDocente: false,
        idAssegnazione: undefined,
        idCorso: 345,
        idMissione: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_COMPETENZA_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({ data: [] }).value).toEqual(put(provaCompetenzaStatisticheFeedbackSet(
      true,
      'error',
      'Non sono presenti statistiche per questa missione'
    )));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });
});

describe('provaCompetenzaStatisticheSelect', () => {
  const mockHistory = {
    push: () => { },
  };
  const idAssegnazione = 1;

  const reportTrovati = calcolaReportDisponibili(provaCompetenzaStatisticheResponse, 'assegnazione_id');
  const reportSelezionato = provaCompetenzaStatisticheResponse[0];
  const reportData = calcolaDatiReportEsercitazione(
    reportSelezionato.esercizi, reportSelezionato.risposte
  );

  it('testo che funzioni come atteso quando l\'esito è positivo e idUtente > 0', () => {
    const gen = provaCompetenzaStatisticheSelect({
      payload: {
        idAssegnazione,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: provaCompetenzaStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idAssegnazione: 1,
      id: 10,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: [0, 1, 2, 3, 4, 5, 6, 7],
      nome: provaCompetenzaStatisticheResponse[0].nome,
      studenti: provaCompetenzaStatisticheResponse[0].studenti,
      media: provaCompetenzaStatisticheResponse[0].media,
      scores: provaCompetenzaStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 5,
      utenteSelezionato: {
        id: 455024,
        key: 0,
        nome: 'Rosa Coccodrillo',
        voto: 10,
      },
      openedSections: {},
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/prova-competenza-statistiche/567/1'));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando idAssegnazione esiste ma è vuota', () => {
    const gen = provaCompetenzaStatisticheSelect({
      payload: {
        idAssegnazione,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: [{
          ...provaCompetenzaStatisticheResponse[0],
          studenti: undefined,
          titolo: undefined,
          esercizi: undefined,
          media: undefined,
          nome: undefined,
          scores: undefined,
          media_nazionale: undefined,
          media_nazionale_campioni: undefined,
        }, provaCompetenzaStatisticheResponse[1]],
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idAssegnazione: 1,
      id: 10,
      esercizi: {},
      risposte: {},
      stepPks: [],
      nome: '',
      studenti: [],
      media: {},
      scores: [],
      grafici: [{
        id: 1,
        media: 0,
        media_nazionale: 0,
        media_nazionale_campioni: 0,
        scores: [],
        titolo: '',
      }, {
        id: 5,
        media: 4.95,
        media_nazionale: 7.5,
        media_nazionale_campioni: 1,
        scores: [{
          id: 455024,
          voto: 7.5,
        }],
        titolo: 'Titolo prova per competenza',
      }],
      previousId: -1,
      nextId: 5,
      utenteSelezionato: {
        id: -1,
        key: -1,
      },
      openedSections: {},
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/prova-competenza-statistiche/567/1'));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando idAssegnazione non esiste', () => {
    const gen = provaCompetenzaStatisticheSelect({
      payload: {
        idAssegnazione: 999999,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: provaCompetenzaStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e idUtente > 0 ma studenti.length === 0', () => {
    const gen = provaCompetenzaStatisticheSelect({
      payload: {
        idAssegnazione,
        idMissione: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: [{
          ...provaCompetenzaStatisticheResponse[0],
          studenti: [],
        }],
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheDataSet({
      reportDisponibili: [1],
      idAssegnazione: 1,
      id: 10,
      esercizi: reportData.esercizi,
      risposte: {},
      stepPks: [0, 1, 2, 3, 4, 5, 6, 7],
      nome: provaCompetenzaStatisticheResponse[0].nome,
      studenti: [],
      media: {},
      scores: [],
      grafici: [{
        id: 1,
        media: 10,
        media_nazionale: 10,
        media_nazionale_campioni: 1,
        scores: [],
        titolo: 'La mia casa - prova per competenza',
      }],
      previousId: -1,
      nextId: -1,
      utenteSelezionato: {
        key: -1,
        id: -1,
      },
      openedSections: {},
    })));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e idUtente == undefined', () => {
    const gen = provaCompetenzaStatisticheSelect({
      payload: {
        idAssegnazione,
        idMissione: 567,
        idUtente: undefined,
        history: mockHistory,
        statisticheDisponibili: provaCompetenzaStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(true)));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idAssegnazione: 1,
      id: 10,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: [0, 1, 2, 3, 4, 5, 6, 7],
      nome: provaCompetenzaStatisticheResponse[0].nome,
      studenti: provaCompetenzaStatisticheResponse[0].studenti,
      media: provaCompetenzaStatisticheResponse[0].media,
      scores: provaCompetenzaStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 5,
      utenteSelezionato: undefined,
      openedSections: {},
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/prova-competenza-statistiche/567/1'));

    expect(gen.next().value).toEqual(put(provaCompetenzaStatisticheSpinnerSet(false)));
  });
});


describe('watchProvaCompetenzaStatistiche', () => {
  it('testo che funzioni come atteso', () => {
    const gen = watchProvaCompetenzaStatistiche();
    expect(gen.next().value).toEqual(takeEvery(
      PROVA_COMPETENZA_STATISTICHE_DATA_FETCH, provaCompetenzaStatisticheFetch
    ));

    expect(gen.next().value).toEqual(takeEvery(
      PROVA_COMPETENZA_STATISTICHE_DATA_SELECT, provaCompetenzaStatisticheSelect
    ));
  });
});

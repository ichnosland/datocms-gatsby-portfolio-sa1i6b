import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { versioniLivelloStatisticheResponse } from 'common/testing-fixtures/versioni-report';
import {
  calcolaDatiReportVersione,
  calcolaReportDisponibili,
} from 'common/statistiche';
import {
  versioneStatisticheFetch,
  watchVersioniLivelloStatistiche,
  versioneStatisticheSelect,
} from '../saga';
import {
  versioniLivelloStatisticheSpinnerSet,
  versioniLivelloStatisticheFeedbackReset,
  versioniLivelloStatisticheFeedbackSet,
  versioniLivelloStatisticheDataSet,
  versioniLivelloStatisticheDataSelect,
} from '../actions';
import {
  VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT,
  VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH,
} from '../constants';


/* eslint-disable redux-saga/yield-effects */
describe('versioneStatisticheFetch', () => {
  const mockHistory = {
    push: () => { },
  };

  it('esito positivo and isDocente = true', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: true,
        idVersione: 321,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE}567/345`
    ));

    expect(gen.next({
      data: versioniLivelloStatisticheResponse,
    }).value).toEqual(put(versioniLivelloStatisticheDataSet({
      statisticheDisponibili: versioniLivelloStatisticheResponse,
      isLoaded: true,
      idLivello: 567,
    })));

    expect(gen.next({
      data: versioniLivelloStatisticheResponse,
    }).value).toEqual(put(versioniLivelloStatisticheDataSelect({
      statisticheDisponibili: versioniLivelloStatisticheResponse,
      idVersione: 321,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo and isDocente = false', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idVersione: 321,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({
      data: versioniLivelloStatisticheResponse,
    }).value).toEqual(put(versioniLivelloStatisticheDataSet({
      statisticheDisponibili: versioniLivelloStatisticheResponse,
      isLoaded: true,
      idLivello: 567,
    })));

    expect(gen.next({
      data: versioniLivelloStatisticheResponse,
    }).value).toEqual(put(versioniLivelloStatisticheDataSelect({
      statisticheDisponibili: versioniLivelloStatisticheResponse,
      idVersione: 321,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo and isDocente = false usando versione_id del respose.data[0]', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idVersione: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: versioniLivelloStatisticheResponse });

    expect(gen.next({
      data: versioniLivelloStatisticheResponse,
    }).value).toEqual(put(versioniLivelloStatisticheDataSelect({
      statisticheDisponibili: versioniLivelloStatisticheResponse,
      idVersione: 621,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));
  });

  it('esito positivo and isDocente = false usando idVersione = se respose.data[0].versione_id === undefined', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idVersione: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: [{ versione_id: undefined }] });

    expect(gen.next({
      data: [{ versione_id: undefined }],
    }).value).toEqual(put(versioniLivelloStatisticheDataSelect({
      statisticheDisponibili: [{ versione_id: undefined }],
      idVersione: 0,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));
  });

  it('esito positivo and isDocente = false usando idVersione = se respose.data[0] === undefined', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idVersione: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: [undefined] });

    expect(gen.next({
      data: [undefined],
    }).value).toEqual(put(versioniLivelloStatisticheDataSelect({
      statisticheDisponibili: [undefined],
      idVersione: 0,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));
  });

  it('esito negativo', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idVersione: 321,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(versioniLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });

  it('idAssegnazion non è settato (viene presa la prima pk disponibile)', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idVersione: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));


    expect(gen.next({
      data: versioniLivelloStatisticheResponse,
    }).value).toEqual(put(versioniLivelloStatisticheDataSet({
      statisticheDisponibili: versioniLivelloStatisticheResponse,
      isLoaded: true,
      idLivello: 567,
    })));

    expect(gen.next({
      data: versioniLivelloStatisticheResponse,
    }).value).toEqual(put(versioniLivelloStatisticheDataSelect({
      statisticheDisponibili: versioniLivelloStatisticheResponse,
      idVersione: 621,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });

  it('restituisce un array vuoto', () => {
    const gen = versioneStatisticheFetch({
      payload: {
        isDocente: false,
        idVersione: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERSIONI_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({ data: [] }).value).toEqual(put(versioniLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Non sono presenti statistiche per questo livello'
    )));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });
});

describe('versioneStatisticheSelect', () => {
  const mockHistory = {
    push: () => { },
  };
  const idVersione = 621;
  const reportTrovati = calcolaReportDisponibili(versioniLivelloStatisticheResponse, 'versione_id');
  const reportSelezionato = versioniLivelloStatisticheResponse[0];
  const reportData = calcolaDatiReportVersione(reportSelezionato.esercizi, reportSelezionato.risposte);

  const stepPksFound = [
    '1.0-0', '1.0-1', '1.0-2', '2.0-0', '2.0-1', '2.0-2', '2.0-3',
    '2.0-4', '3.0-0', '3.0-1', '3.0-2', '3.0-3', '3.0-4', '3.0-5',
    '4.0-0', '4.0-1', '4.0-2', '4.0-3', '4.0-4', '5.0-0', '5.0-1',
    '5.0-2', '6.0-0', '6.0-1', '6.0-2', '6.0-3',
  ];

  it('esito positivo e idUtente > 0', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idVersione,
        idLivello: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: versioniLivelloStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idVersione: 621,
      id: 621,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: stepPksFound,
      nome: versioniLivelloStatisticheResponse[0].nome,
      studenti: versioniLivelloStatisticheResponse[0].studenti,
      media: versioniLivelloStatisticheResponse[0].media,
      scores: versioniLivelloStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 301,
      openedSections: {},
      utenteSelezionato: {
        id: 455024,
        key: 0,
        nome: 'Rosa Coccodrillo',
        voto: 0.384615384615385,
      },
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/versione-livello-statistiche/567/621'));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo ma reportSelezionato senza default (studenti, esercizi ecc)', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idVersione,
        idLivello: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: [{
          ...versioniLivelloStatisticheResponse[0],
          studenti: undefined,
          titolo: undefined,
          esercizi: undefined,
          media: undefined,
          nome: undefined,
          scores: undefined,
        }, versioniLivelloStatisticheResponse[1]],
      },
    });

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idVersione: 621,
      id: 621,
      esercizi: {},
      risposte: {},
      stepPks: [],
      nome: '',
      studenti: [],
      media: {},
      scores: [],
      grafici: [{
        id: 621,
        media: 0,
        media_nazionale: 0.384615384615385,
        media_nazionale_campioni: 1,
        scores: [],
        titolo: '',
      }, {
        id: 301,
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
      nextId: 301,
      openedSections: {},
      utenteSelezionato: {
        id: -1,
        key: -1,
      },
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/versione-livello-statistiche/567/621'));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo e not idVersione in statisticheDisponibili', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idVersione: 999999,
        idLivello: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: versioniLivelloStatisticheResponse,
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo e idUtente > 0 ma non è presente tra gli studenti', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idVersione,
        idLivello: 567,
        idUtente: 455024,
        history: mockHistory,
        statisticheDisponibili: [{
          ...versioniLivelloStatisticheResponse[0],
          studenti: [],
        }],
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheDataSet({
      reportDisponibili: [621],
      idVersione: 621,
      id: 621,
      esercizi: reportData.esercizi,
      risposte: {},
      stepPks: stepPksFound,
      nome: versioniLivelloStatisticheResponse[0].nome,
      studenti: [],
      media: {},
      scores: [],
      openedSections: {},
      grafici: [{
        id: 621,
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
    })));

    gen.next();
    gen.next();
  });

  it('esito positivo e idUtente == undefined', () => {
    const gen = versioneStatisticheSelect({
      payload: {
        idVersione,
        idLivello: 567,
        idUtente: undefined,
        history: mockHistory,
        statisticheDisponibili: versioniLivelloStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(true)));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idVersione: 621,
      id: 621,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: stepPksFound,
      nome: versioniLivelloStatisticheResponse[0].nome,
      studenti: versioniLivelloStatisticheResponse[0].studenti,
      media: versioniLivelloStatisticheResponse[0].media,
      scores: versioniLivelloStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 301,
      openedSections: {},
      utenteSelezionato: undefined,
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/versione-livello-statistiche/567/621'));

    expect(gen.next().value).toEqual(put(versioniLivelloStatisticheSpinnerSet(false)));
  });
});

describe('watchVersioniLivelloStatistiche', () => {
  it('testo che funzioni come atteso', () => {
    const gen = watchVersioniLivelloStatistiche();

    expect(gen.next().value).toEqual(takeEvery(
      VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH, versioneStatisticheFetch
    ));

    expect(gen.next().value).toEqual(takeEvery(
      VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT, versioneStatisticheSelect
    ));
  });
});

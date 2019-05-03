import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { verificheLivelloStatisticheResponse } from 'common/testing-fixtures/verifiche-report';
import {
  calcolaDatiReportEsercitazione,
  calcolaReportDisponibili,
} from 'common/statistiche';
import {
  verificaStatisticheFetch,
  watchVerificaLivelloStatistiche,
  verificaStatisticheSelect,
} from '../saga';
import {
  verificaLivelloStatisticheSpinnerSet,
  verificaLivelloStatisticheFeedbackReset,
  verificaLivelloStatisticheFeedbackSet,
  verificaLivelloStatisticheDataSet,
  verificaLivelloStatisticheDataSelect,
} from '../actions';
import {
  VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE,
  VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE,
  VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT,
  VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH,
} from '../constants';


/* eslint-disable redux-saga/yield-effects */
describe('verificaStatisticheFetch', () => {
  const mockHistory = {
    push: () => { },
  };

  it('esito positivo and isDocente = true', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: true,
        idVerifica: 198,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_DOCENTE}567/345`
    ));

    expect(gen.next({
      data: verificheLivelloStatisticheResponse,
    }).value).toEqual(put(verificaLivelloStatisticheDataSet({
      statisticheDisponibili: verificheLivelloStatisticheResponse,
      isLoaded: true,
      idLivello: 567,
    })));

    expect(gen.next({
      data: verificheLivelloStatisticheResponse,
    }).value).toEqual(put(verificaLivelloStatisticheDataSelect({
      statisticheDisponibili: verificheLivelloStatisticheResponse,
      idVerifica: 198,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo and isDocente = false', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: false,
        idVerifica: 198,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({
      data: verificheLivelloStatisticheResponse,
    }).value).toEqual(put(verificaLivelloStatisticheDataSet({
      statisticheDisponibili: verificheLivelloStatisticheResponse,
      isLoaded: true,
      idLivello: 567,
    })));

    expect(gen.next({
      data: verificheLivelloStatisticheResponse,
    }).value).toEqual(put(verificaLivelloStatisticheDataSelect({
      statisticheDisponibili: verificheLivelloStatisticheResponse,
      idVerifica: 198,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo and isDocente = false usando verifica_id del respose.data[0]', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: false,
        idVerifica: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: verificheLivelloStatisticheResponse });

    expect(gen.next({
      data: verificheLivelloStatisticheResponse,
    }).value).toEqual(put(verificaLivelloStatisticheDataSelect({
      statisticheDisponibili: verificheLivelloStatisticheResponse,
      idVerifica: 198,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));
  });

  it('esito positivo and isDocente = false usando idVerifica = se respose.data[0].verifica_id === undefined', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: false,
        idVerifica: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next({ data: [{ verifica_id: undefined }] });

    expect(gen.next({
      data: [{ verifica_id: undefined }],
    }).value).toEqual(put(verificaLivelloStatisticheDataSelect({
      statisticheDisponibili: [{ verifica_id: undefined }],
      idVerifica: 0,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));
  });

  it('esito positivo and isDocente = false usando idVerifica = se respose.data[0] === undefined', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: false,
        idVerifica: undefined,
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
    }).value).toEqual(put(verificaLivelloStatisticheDataSelect({
      statisticheDisponibili: [undefined],
      idVerifica: 0,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));
  });

  it('esito negativo', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: false,
        idVerifica: 198,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(verificaLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });

  it('idAssegnazion non è settato (viene presa la prima pk disponibile)', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: false,
        idVerifica: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));


    expect(gen.next({
      data: verificheLivelloStatisticheResponse,
    }).value).toEqual(put(verificaLivelloStatisticheDataSet({
      statisticheDisponibili: verificheLivelloStatisticheResponse,
      isLoaded: true,
      idLivello: 567,
    })));

    expect(gen.next({
      data: verificheLivelloStatisticheResponse,
    }).value).toEqual(put(verificaLivelloStatisticheDataSelect({
      statisticheDisponibili: verificheLivelloStatisticheResponse,
      idVerifica: 198,
      idUtente: 789,
      idLivello: 567,
      history: mockHistory,
    })));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });

  it('restituisce un array vuoto', () => {
    const gen = verificaStatisticheFetch({
      payload: {
        isDocente: false,
        idVerifica: undefined,
        idCorso: 345,
        idLivello: 567,
        idUtente: 789,
        history: mockHistory,
      },
    });

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${VERIFICA_LIVELLO_STATISTICHE_URI_DATA_FETCH_STUDENTE}567`
    ));

    expect(gen.next({ data: [] }).value).toEqual(put(verificaLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Non sono presenti statistiche per questo livello'
    )));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });
});

describe('verificaStatisticheSelect', () => {
  const mockHistory = {
    push: () => { },
  };
  const idVerifica = 198;
  const reportTrovati = calcolaReportDisponibili(verificheLivelloStatisticheResponse, 'verifica_id');
  const reportSelezionato = verificheLivelloStatisticheResponse[0];
  const reportData = calcolaDatiReportEsercitazione(reportSelezionato.esercizi, reportSelezionato.risposte);
  const stepPksFound = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27,
  ];

  it('esito positivo e idUtente > 0', () => {
    const gen = verificaStatisticheSelect({
      payload: {
        idVerifica,
        idLivello: 567,
        idUtente: 277641,
        history: mockHistory,
        statisticheDisponibili: verificheLivelloStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idVerifica,
      id: 198,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: stepPksFound,
      nome: verificheLivelloStatisticheResponse[0].nome,
      studenti: verificheLivelloStatisticheResponse[0].studenti,
      media: verificheLivelloStatisticheResponse[0].media,
      scores: verificheLivelloStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 214,
      openedSections: {},
      utenteSelezionato: {
        id: 277641,
        key: 0,
        nome: 'Mario Barbagianni',
        voto: 1.78571428571429,
      },
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/verifiche-livello-statistiche/567/198'));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo ma reportSelezionato senza default (studenti, esercizi ecc)', () => {
    const gen = verificaStatisticheSelect({
      payload: {
        idVerifica,
        idLivello: 567,
        idUtente: 277641,
        history: mockHistory,
        statisticheDisponibili: [{
          ...verificheLivelloStatisticheResponse[0],
          studenti: undefined,
          titolo: undefined,
          esercizi: undefined,
          media: undefined,
          nome: undefined,
          scores: undefined,
        }, verificheLivelloStatisticheResponse[1]],
      },
    });

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idVerifica: 198,
      id: 198,
      esercizi: {},
      risposte: {},
      stepPks: [],
      nome: '',
      studenti: [],
      media: {},
      scores: [],
      grafici: [{
        id: 198,
        media: 0,
        media_nazionale: 3.76838235294118,
        media_nazionale_campioni: 4,
        scores: [],
        titolo: '',
      }, {
        id: 214,
        media: 2.5,
        media_nazionale: 4.0625,
        media_nazionale_campioni: 2,
        scores: [{
          id: 277641,
          voto: 2.5,
        }],
        titolo: 'Test di ingresso - 26/01/17',
      }],
      previousId: -1,
      nextId: 214,
      openedSections: {},
      utenteSelezionato: {
        id: -1,
        key: -1,
      },
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/verifiche-livello-statistiche/567/198'));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo e not idVerifica in statisticheDisponibili', () => {
    const gen = verificaStatisticheSelect({
      payload: {
        idVerifica: 999999,
        idLivello: 567,
        idUtente: 277641,
        history: mockHistory,
        statisticheDisponibili: verificheLivelloStatisticheResponse,
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheFeedbackSet(
      true,
      'error',
      'Questo report non può essere visualizzato'
    )));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });

  it('esito positivo e idUtente > 0 ma non è presente tra gli studenti', () => {
    const gen = verificaStatisticheSelect({
      payload: {
        idVerifica,
        idLivello: 567,
        idUtente: 277641,
        history: mockHistory,
        statisticheDisponibili: [{
          ...verificheLivelloStatisticheResponse[0],
          studenti: [],
        }],
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheDataSet({
      reportDisponibili: [198],
      idVerifica: 198,
      id: 198,
      esercizi: reportData.esercizi,
      risposte: {},
      stepPks: stepPksFound,
      nome: verificheLivelloStatisticheResponse[0].nome,
      studenti: [],
      media: {},
      scores: [],
      openedSections: {},
      grafici: [{
        id: 198,
        media: 1.78571428571429,
        media_nazionale: 3.76838235294118,
        media_nazionale_campioni: 4,
        scores: [],
        titolo: 'Test di ingresso - 17/01/17',
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
    const gen = verificaStatisticheSelect({
      payload: {
        idVerifica,
        idLivello: 567,
        idUtente: undefined,
        history: mockHistory,
        statisticheDisponibili: verificheLivelloStatisticheResponse,
      },
    });

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(true)));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheDataSet({
      reportDisponibili: reportTrovati.report_disponibili,
      idVerifica: 198,
      id: 198,
      esercizi: reportData.esercizi,
      risposte: reportData.risposte,
      stepPks: stepPksFound,
      nome: verificheLivelloStatisticheResponse[0].nome,
      studenti: verificheLivelloStatisticheResponse[0].studenti,
      media: verificheLivelloStatisticheResponse[0].media,
      scores: verificheLivelloStatisticheResponse[0].scores,
      grafici: reportTrovati.grafici,
      previousId: -1,
      nextId: 214,
      openedSections: {},
      utenteSelezionato: undefined,
    })));

    expect(gen.next().value).toEqual(call(mockHistory.push, '/verifiche-livello-statistiche/567/198'));

    expect(gen.next().value).toEqual(put(verificaLivelloStatisticheSpinnerSet(false)));
  });
});

describe('watchVerificaLivelloStatistiche', () => {
  it('testo che funzioni come atteso', () => {
    const gen = watchVerificaLivelloStatistiche();

    expect(gen.next().value).toEqual(takeEvery(
      VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH, verificaStatisticheFetch
    ));

    expect(gen.next().value).toEqual(takeEvery(
      VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT, verificaStatisticheSelect
    ));
  });
});

import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import { googleAnalyticsWrapper } from 'common/utils';

import { mockElementiN, mockElementiM } from 'common/testing-mocks';
import {
  createStepFromEsercizi,
  calcolaChildrenTesto,
} from 'common/esercizi';

import {
  provaParallelOverviewSet,
  provaParallelPreviewSet,
  provaParallelPreviewReset,
  provaParallelEsecuzioneSet,
  provaParallelEsecuzioneReset,
  provaParallelSpinnerSet,
  provaParallelReset,
  provaParallelFeedbackSet,
  provaParallelFeedbackReset,
  provaParallelStepSet,
  provaParallelRispostaReset,
  provaParallelInviaReport,
} from '../actions';
import {
  PROVA_PARALLEL_OVERVIEW_FETCH,
  PROVA_PARALLEL_PREVIEW_FETCH,
  PROVA_PARALLEL_ESECUZIONE_FETCH,
  PROVA_PARALLEL_RISPOSTA_POST,
  PROVA_PARALLEL_INVIA_REPORT,

  PROVA_PARALLEL_URL_OVERVIEW_FETCH,
  PROVA_PARALLEL_URL_PREVIEW_FETCH,
  PROVA_PARALLEL_URL_ESECUZIONE_FETCH,
} from '../constants';
import provaParallelSaga, {
  provaParallelOverviewFetchSaga,
  provaParallelPreviewFetchSaga,
  provaParallelEsecuzioneFetchSaga,
  provaParallelRispostaPost,
  provaParallelInviaReportProvaSaga,
} from '../saga';



/* eslint-disable redux-saga/yield-effects */
describe('provaParallelOverviewFetchSaga', () => {
  const mockDataResponse = {
    titolo: 'titolo',
    autore: 'autore',
    fonte: 'fonte',
    testo: 'testo',
    totale_domande: 12,
    id: 13,
  };

  it('esito positivo', () => {
    const gen = provaParallelOverviewFetchSaga({
      id: 123,
    });

    expect(gen.next().value).toEqual(put(provaParallelReset()));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_PARALLEL_URL_OVERVIEW_FETCH}123`
    ));

    expect(gen.next({ data: mockDataResponse }).value).toEqual(put(provaParallelOverviewSet({
      titolo: 'titolo',
      autore: 'autore',
      fonte: 'fonte',
      testo: 'testo',
      totaleDomande: 12,
      id: 13,
      isLoaded: true,
    })));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });

  it('caso di errore', () => {
    const gen = provaParallelOverviewFetchSaga({
      id: 123,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('errore').value).toEqual(put(provaParallelFeedbackSet(
      true,
      'error',
      'Impossibile scaricare questa prova per Parallel',
    )));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });
});


describe('provaParallelPreviewFetchSaga', () => {
  const mockDataResponse = {
    steps: [{
      id: 0,
      elementi: mockElementiN,
    }],
    titolo: 'titolo',
    id: 4444,
  };

  it('esito positivo', () => {
    const gen = provaParallelPreviewFetchSaga({
      id: 123,
    });

    expect(gen.next().value).toEqual(put(provaParallelPreviewReset()));
    expect(gen.next().value).toEqual(put(provaParallelFeedbackReset()));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_PARALLEL_URL_PREVIEW_FETCH}123`
    ));

    expect(gen.next({ data: mockDataResponse }).value).toEqual(put(provaParallelPreviewSet({
      titolo: 'titolo',
      id: 4444,
      steps: [{
        consegna: 'Luna <span class="contesto">splendet</span>, stellae fulgent.',
        idEsercizio: 97552,
        idsElementi: [
          94634,
          94635,
        ],
        key: '97552_94634.94635',
        opzioni: [
          'imperfetto',
          'passivo',
          'attivo',
          'presente',
        ],
        soluzioneTestuale: 'attivo<br />presente',
        soluzioni: [
          [
            'attivo',
            'presente',
          ],
        ],
        tipo: 'N',
        titolo: 'Analizza il tempo e la diatesi',
      }],
      isLoaded: true,
    })));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });

  it('caso di errore', () => {
    const gen = provaParallelPreviewFetchSaga({ id: 123 });
    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('errore').value).toEqual(put(provaParallelFeedbackSet(
      true,
      'error',
      'Impossibile eseguire la preview di questa prova Parallel',
    )));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });
});


describe('provaParallelEsecuzioneFetchSaga', () => {
  const mockDataResponse = {
    steps: [{
      id: 0,
      elementi: mockElementiN,
    }],
    titolo: 'titolo',
    id: 4444,
    testo: 'testo',
  };

  const payload = {
    id: 4444,
    disciplinaId: 333,
    product: 'product',
  };

  const parsedStep0 = {
    id: 0,
    numeroProgressivoStep: 0,
    ...createStepFromEsercizi(mockElementiN)[0],
  };
  parsedStep0.testi[0].testoConsegna = calcolaChildrenTesto(
    parsedStep0.testi[0].testo_principale, []
  );

  const parsedStep1 = {
    id: 1,
    numeroProgressivoStep: 1,
    ...createStepFromEsercizi(mockElementiM)[0],
  };
  parsedStep1.testi[0].testoConsegna = calcolaChildrenTesto(
    parsedStep1.testi[0].testo_principale, []
  );

  it('esito positivo', () => {
    const gen = provaParallelEsecuzioneFetchSaga({ payload });

    expect(gen.next().value).toEqual(put(provaParallelEsecuzioneReset()));
    expect(gen.next().value).toEqual(put(provaParallelFeedbackReset()));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${PROVA_PARALLEL_URL_ESECUZIONE_FETCH}4444`
    ));

    expect(gen.next({ data: mockDataResponse }).value).toEqual(put(provaParallelEsecuzioneSet({
      titolo: 'titolo',
      id: 4444,
      risposteFornite: {},
      stepCaricato: 0,
      testo: 'testo',
      steps: [parsedStep0],
      isLoaded: true,
    })));

    expect(gen.next({ data: mockDataResponse }).value).toEqual(put(provaParallelStepSet({
      testi: [{
        ...mockElementiN[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(mockElementiN[0].testo_principale, []),
      }],
      esercizi: [mockElementiN[1]],
      numeroProgressivoStep: 0,
      id: 0,
    })));

    expect(gen.next().value).toEqual(call(googleAnalyticsWrapper, 'event', {
      category: 'Prova Parallel',
      action: 'Preview',
    }));

    expect(gen.next().value).toEqual(put(modalSetData({
      titolo: 'Esecuzione prova parallel',
      contenuto: expect.any(String),
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });

  it('esito positivo con dati esecuzione pregressi', () => {
    const gen = provaParallelEsecuzioneFetchSaga({ payload });
    localStorage.setItem('provaparallel_product_333_4444', JSON.stringify({ 0: { data: 123 } }));
    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        ...mockDataResponse,
        steps: [{
          id: 0,
          elementi: mockElementiN,
        }, {
          id: 1,
          elementi: mockElementiM,
        }],
      },
    }).value).toEqual(put(provaParallelEsecuzioneSet({
      titolo: 'titolo',
      id: 4444,
      risposteFornite: { 0: { data: 123 } },
      stepCaricato: 1,
      testo: 'testo',
      steps: [parsedStep0, parsedStep1],
      isLoaded: true,
    })));

    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
    localStorage.removeItem('provaparallel_product_333_4444', JSON.stringify({ 0: { data: 123 } }));
  });

  it('esito positivo con dati esecuzione pregressi errati ricomincio da 0', () => {
    const gen = provaParallelEsecuzioneFetchSaga({ payload });
    localStorage.setItem('provaparallel_product_333_4444', JSON.stringify({
      0: { data: 123 },
      1: { data: 123 },
      2: { data: 123 },
    }));
    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: mockDataResponse }).value).toEqual(put(provaParallelEsecuzioneSet({
      titolo: 'titolo',
      id: 4444,
      risposteFornite: {},
      stepCaricato: 0,
      testo: 'testo',
      steps: [parsedStep0],
      isLoaded: true,
    })));

    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
    localStorage.removeItem('provaparallel_product_333_4444', JSON.stringify({ 0: { data: 123 } }));
  });

  it('esito positivo con dati esecuzione pregressi interrotta con ultimo step ma non consegnata, rimostro ultimo', () => {
    const gen = provaParallelEsecuzioneFetchSaga({ payload });
    localStorage.setItem('provaparallel_product_333_4444', JSON.stringify({
      0: { data: 123 },
      1: { data: 123 },
    }));
    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        ...mockDataResponse,
        steps: [{
          id: 0,
          elementi: mockElementiN,
        }, {
          id: 1,
          elementi: mockElementiM,
        }],
      },
    }).value).toEqual(put(provaParallelEsecuzioneSet({
      titolo: 'titolo',
      id: 4444,
      risposteFornite: {
        0: { data: 123 },
      },
      stepCaricato: 1,
      testo: 'testo',
      steps: [parsedStep0, parsedStep1],
      isLoaded: true,
    })));

    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
    localStorage.removeItem('provaparallel_product_333_4444', JSON.stringify({ 0: { data: 123 } }));
  });

  it('caso di errore', () => {
    const gen = provaParallelEsecuzioneFetchSaga({ payload });
    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('errore').value).toEqual(put(provaParallelFeedbackSet(
      true,
      'error',
      'Impossibile eseguire questa prova Parallel',
    )));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });
});


describe('provaParallelRispostaPost', () => {
  const payload = {
    steps: [{
      id: 0,
      numeroProgressivoStep: 0,
      ...createStepFromEsercizi(mockElementiN)[0],
    }, {
      id: 1,
      numeroProgressivoStep: 1,
      ...createStepFromEsercizi(mockElementiM)[0],
    }],
    step: {
      testi: [mockElementiN[0]],
      esercizi: [mockElementiN[1]],
      numeroProgressivoStep: 0,
      id: 0,
    },
    rispostaSelezionata: ['risposta selezionata'],
    skipRequest: true,
    risposteFornite: {},
    historyPush: () => { },
    disciplinaId: 4,
    product: 'product',
    idProvaParallel: 3,
    stepCaricato: 0,
  };

  it('esito positivo', () => {
    const gen = provaParallelRispostaPost({ payload });
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(true)));

    expect(gen.next().value).toEqual(put(provaParallelStepSet({
      testi: [{ ...mockElementiM[0], testoConsegna: expect.any(Object), html: undefined }],
      esercizi: [mockElementiM[1]],
      numeroProgressivoStep: 1,
      id: 1,
    })));

    expect(gen.next().value).toEqual(put(provaParallelEsecuzioneSet({
      stepCaricato: 1,
      risposteFornite: {
        0: {
          corretta: false,
          elementi: [94634, 94635],
          esercizio: 97552,
          readable: 'Saltata',
          risposta: [],
          skip: true,
          stato: 'S',
          step: 0,
          tipo: 'N',
        },
      },
    })));

    expect(gen.next().value).toEqual(put(provaParallelRispostaReset()));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });

  it('esito positivo senza skip', () => {
    const gen = provaParallelRispostaPost({
      payload: {
        ...payload,
        skipRequest: false,
      },
    });
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(put(provaParallelEsecuzioneSet({
      stepCaricato: 1,
      risposteFornite: {
        0: {
          corretta: false,
          elementi: [94634, 94635],
          esercizio: 97552,
          readable: 'risposta selezionata',
          risposta: ['risposta selezionata'],
          skip: false,
          stato: 'S',
          step: 0,
          tipo: 'N',
        },
      },
    })));
  });

  it('esito positivo risposta corretta', () => {
    const gen = provaParallelRispostaPost({
      payload: {
        ...payload,
        skipRequest: false,
        rispostaSelezionata: ['presente', 'attivo'],
      },
    });
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(put(provaParallelEsecuzioneSet({
      stepCaricato: 1,
      risposteFornite: {
        0: {
          corretta: true,
          elementi: [94634, 94635],
          esercizio: 97552,
          readable: 'presente attivo',
          risposta: ['presente', 'attivo'],
          skip: false,
          stato: 'C',
          step: 0,
          tipo: 'N',
        },
      },
    })));
  });

  it('esito positivo con step finale', () => {
    const gen = provaParallelRispostaPost({
      payload: {
        ...payload,
        stepCaricato: 1,
        step: {
          ...payload.step,
          numeroProgressivoStep: 1,
        },
        risposteFornite: {
          0: {
            corretta: true,
            elementi: [1, 2],
            esercizio: 3,
            readable: 'altra risposta',
            risposta: ['altra risposta'],
            skip: false,
            stato: 'C',
            step: 0,
            tipo: 'M',
          },
        },
      },
    });

    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(true)));

    expect(gen.next().value).toEqual(put(provaParallelInviaReport({
      historyPush: payload.historyPush,
      idProvaParallel: 3,
      product: 'product',
      disciplinaId: 4,
      risposteFornite: {
        0: {
          corretta: true,
          elementi: [1, 2],
          esercizio: 3,
          readable: 'altra risposta',
          risposta: ['altra risposta'],
          skip: false,
          stato: 'C',
          step: 0,
          tipo: 'M',
        },
        1: {
          corretta: false,
          elementi: [94634, 94635],
          esercizio: 97552,
          readable: 'Saltata',
          risposta: [],
          skip: true,
          stato: 'S',
          step: 1,
          tipo: 'N',
        },
      },
    })));

    expect(gen.next().value).toEqual(put(provaParallelRispostaReset()));
    expect(gen.next().value).toEqual(put(provaParallelSpinnerSet(false)));
  });
});


describe('provaParallelInviaReportProvaSaga', () => {
  const payload = {
    idProvaParallel: 4444,
    risposteFornite: {
      0: { data: 777 },
      1: { data: 123 },
      2: { data: 666 },
    },
    historyPush: () => { },
    disciplinaId: 3,
    product: 'product',
  };

  it('esito positivo', () => {
    const gen = provaParallelInviaReportProvaSaga({ payload });
    const spy = jest.spyOn(localStorage, 'removeItem');

    expect(gen.next().value).toEqual(call(googleAnalyticsWrapper, 'event', {
      category: 'Esecuzione parallel',
      action: 'Consegna',
    }));
    expect(gen.next().value).toEqual(put(provaParallelEsecuzioneSet({
      consegnata: true,
      risposteFornite: payload.risposteFornite,
    })));
    expect(gen.next().value).toEqual(call(payload.historyPush, '/prova-parallel-response'));


    // devo aver fatto una chiamata a localStorage.removeItem
    expect(spy).toHaveBeenCalledWith('provaparallel_product_3_4444');
  });
});


describe('provaParallelSaga', () => {
  it('testo che funzioni come atteso', () => {
    const gen = provaParallelSaga();

    expect(gen.next().value).toEqual(takeEvery(
      PROVA_PARALLEL_OVERVIEW_FETCH,
      provaParallelOverviewFetchSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      PROVA_PARALLEL_PREVIEW_FETCH,
      provaParallelPreviewFetchSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      PROVA_PARALLEL_ESECUZIONE_FETCH,
      provaParallelEsecuzioneFetchSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      PROVA_PARALLEL_RISPOSTA_POST,
      provaParallelRispostaPost
    ));
    expect(gen.next().value).toEqual(takeEvery(
      PROVA_PARALLEL_INVIA_REPORT,
      provaParallelInviaReportProvaSaga
    ));
  });
});

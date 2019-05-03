import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { mockElementiN, mockElementiM, mockElementiG } from 'common/testing-mocks';
import { calcolaChildrenTesto } from 'common/esercizi';
import { playSound } from 'common/suoni';
import {
  ESERCIZIO_PREVIEW_URL_FETCH,
  ESERCIZIO_PREVIEW_STEP_INITIALIZE,
  ESERCIZIO_PREVIEW_STEP_NEXT,
  ESERCIZIO_PREVIEW_RISPOSTA_POST,
} from '../constants';
import {
  esercizioPreviewContenutoSet,
  esercizioPreviewSpinnerSet,
  esercizioPreviewReset,
  esercizioPreviewStepSet,
  esercizioPreviewRispostaReset,
  esercizioPreviewRispostaSet,
  esercizioPreviewFeedbackSet,
} from '../actions';
import watchEsercizioPreview, {
  esercizioPreviewStepInitialize,
  esercizioPreviewRispostaPost,
  esercizioPreviewStepNext,
} from '../saga';


const mockForniteN = {
  tipo: 'N',
  step: 0,
  corretta: false,
  stato: 'S',
  help_request: false,
  risposta: ['risposta selezionata'],
  readable: 'risposta selezionata',
  elementi: [94634, 94635],
  esercizio: 97552,
};

const mockForniteM = {
  tipo: 'M',
  step: 1,
  corretta: true,
  stato: 'C',
  help_request: false,
  risposta: ['nominativo'],
  readable: 'nominativo',
  elementi: [94636, 94637],
  esercizio: 97552,
};


/* eslint-disable redux-saga/yield-effects */
describe('esercizioPreviewStepInitialize', () => {
  const mockResponse = {
    elementi: [
      ...mockElementiN,
      ...mockElementiG,
    ],
  };

  it('fetch dei dati con esito positivo con parseMultimedia = false', () => {
    const gen = esercizioPreviewStepInitialize({ id: 333, parseMultimedia: false });
    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(esercizioPreviewReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${ESERCIZIO_PREVIEW_URL_FETCH}333`
    ));

    const mockTestoElaborato = [{
      esercizi: [mockElementiN[1]],
      testi: [{
        ...mockElementiN[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(mockElementiN[0].html, mockElementiM[0].inputLessicale),
      }],
      id: 0,
    }, {
      esercizi: [mockElementiG[1]],
      testi: [{
        ...mockElementiG[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(mockElementiG[0].html, mockElementiG[0].inputLessicale),
      }],
      id: 1,
    }];

    expect(gen.next({ data: mockResponse }).value).toEqual(put(esercizioPreviewContenutoSet({
      steps: mockTestoElaborato,
      risposteFornite: {},
      stepCaricato: 0,
      titolo: 'Preview esercizio',
      isLoaded: true,
      totaleDomande: 2,
      id: 333,
    })));

    expect(gen.next({ data: mockResponse }).value).toEqual(put(esercizioPreviewStepSet({
      testi: mockTestoElaborato[0].testi,
      esercizi: mockTestoElaborato[0].esercizi,
      numeroProgressivoStep: mockTestoElaborato[0].id,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(false)));
  });

  it('fetch dei dati con esito positivo con parseMultimedia = true', () => {
    const gen = esercizioPreviewStepInitialize({ id: 333, parseMultimedia: true });
    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(esercizioPreviewReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${ESERCIZIO_PREVIEW_URL_FETCH}333`
    ));

    const mockTestoElaborato = [{
      esercizi: [mockElementiN[1]],
      testi: [{
        ...mockElementiN[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(mockElementiN[0].testo_principale),
      }],
      id: 0,
    }, {
      esercizi: [mockElementiG[1]],
      testi: [{
        ...mockElementiG[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(mockElementiG[0].testo_principale),
      }],
      id: 1,
    }];

    expect(gen.next({ data: mockResponse }).value).toEqual(put(esercizioPreviewContenutoSet({
      steps: mockTestoElaborato,
      risposteFornite: {},
      stepCaricato: 0,
      titolo: 'Preview esercizio',
      isLoaded: true,
      totaleDomande: 2,
      id: 333,
    })));

    expect(gen.next({ data: mockResponse }).value).toEqual(put(esercizioPreviewStepSet({
      testi: mockTestoElaborato[0].testi,
      esercizi: mockTestoElaborato[0].esercizi,
      numeroProgressivoStep: mockTestoElaborato[0].id,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(false)));
  });

  it('fetch dei dati con esito negativo', () => {
    const gen = esercizioPreviewStepInitialize({ id: 333 });
    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(esercizioPreviewReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${ESERCIZIO_PREVIEW_URL_FETCH}333`
    ));

    expect(gen.throw('error').value).toEqual(put(esercizioPreviewFeedbackSet(
      true,
      'error',
      'Impossibile caricare questa esecuzione'
    )));

    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(false)));
  });
});

describe('esercizioPreviewRispostaPost', () => {
  const mockDataPost = {
    payload: {
      step: {
        esercizi: [mockElementiN[1]],
        testi: [mockElementiN[0]],
        numeroProgressivoStep: 0,
      },
      risposta: {
        rispostaSelezionata: ['risposta selezionata'],
      },
      helpRequest: false,
      enableSuoni: true,
      contenutoEsercizio: {
        id: 123,
        steps: [{
          esercizi: [mockElementiN[1]],
          testi: [mockElementiN[0]],
          id: 0,
        }, {
          esercizi: [mockElementiM[1]],
          testi: [mockElementiM[0]],
          id: 1,
        }],
        risposteFornite: {},
        stepCaricato: 0,
      },
    },
  };

  it('esito è positivo e non conclusa con enableSuoni', () => {
    const gen = esercizioPreviewRispostaPost(mockDataPost);
    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', false));

    expect(gen.next().value).toEqual(put(esercizioPreviewStepSet({
      nextStep: {
        esercizi: [mockElementiM[1]],
        testi: [mockElementiM[0]],
        numeroProgressivoStep: 1,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewContenutoSet({
      risposteFornite: { 0: mockForniteN },
      stepCaricato: 1,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewRispostaSet({
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [['attivo', 'presente']],
      },
      isChecked: true,
      isCorrect: false,
      isInterfaceLocked: true,
      isPristine: false,
      mostraCorrezione: true,
      mostraSoluzione: true,
      isHelpEnabled: false,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(false)));
  });


  it('esito è positivo e non conclusa con helpRequest', () => {
    const gen = esercizioPreviewRispostaPost({
      payload: {
        ...mockDataPost.payload,
        helpRequest: true,
      },
    });
    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(playSound, 'step_aiuto', false));

    expect(gen.next().value).toEqual(put(esercizioPreviewStepSet({
      nextStep: {
        esercizi: [mockElementiM[1]],
        testi: [mockElementiM[0]],
        numeroProgressivoStep: 1,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewContenutoSet({
      risposteFornite: {
        0: {
          ...mockForniteN,
          help_request: true,
          readable: 'Saltata',
          risposta: [],
        },
      },
      stepCaricato: 1,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewRispostaSet({
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [['attivo', 'presente']],
      },
      isChecked: true,
      isCorrect: false,
      isInterfaceLocked: true,
      isPristine: false,
      mostraCorrezione: false,
      mostraSoluzione: true,
      isHelpEnabled: true,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(false)));
  });

  it('esito è positivo e conclusa con enableSuoni', () => {
    const gen = esercizioPreviewRispostaPost({
      payload: {
        ...mockDataPost.payload,
        step: {
          esercizi: [mockElementiM[1]],
          testi: [mockElementiM[0]],
          numeroProgressivoStep: 1,
        },
        risposta: {
          rispostaSelezionata: ['nominativo'],
        },
        contenutoEsercizio: {
          id: 123,
          steps: [{
            esercizi: [mockElementiN[1]],
            testi: [mockElementiN[0]],
            id: 0,
          }, {
            esercizi: [mockElementiM[1]],
            testi: [mockElementiM[0]],
            id: 1,
          }],
          risposteFornite: { 0: mockForniteN },
          stepCaricato: 1,
        },
      },
    });
    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(playSound, 'step_corretto', false));

    expect(gen.next().value).toEqual(put(esercizioPreviewStepSet({
      nextStep: null,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewContenutoSet({
      risposteFornite: { 0: mockForniteN, 1: mockForniteM },
      stepCaricato: 2,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewRispostaSet({
      correzioneStep: {
        corrette: ['nominativo'],
        sbagliate: [],
        soluzione: undefined,
      },
      isChecked: true,
      isCorrect: true,
      isHelpEnabled: false,
      isInterfaceLocked: true,
      isPristine: false,
      mostraCorrezione: true,
      mostraSoluzione: false,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewSpinnerSet(false)));
  });
});

describe('esercizioPreviewStepNext', () => {
  const mockPayload = {
    payload: {
      step: {
        esercizi: [mockElementiM[1]],
        testi: [mockElementiM[0]],
        numeroProgressivoStep: 9,
        nextStep: {
          esercizi: [mockElementiN[1]],
          testi: [{
            ...mockElementiN[0],
            testoConsegna: calcolaChildrenTesto(mockElementiN[0].testo_pricipale),
          }],
          numeroProgressivoStep: 10,
        },
      },
    },
  };

  it('deve caricare lo step successivo se non consegnata', () => {
    const gen = esercizioPreviewStepNext(mockPayload);

    expect(gen.next().value).toEqual(put(esercizioPreviewStepSet({
      ...mockPayload.payload.step.nextStep,
      numeroProgressivoStep: 10,
      nextStep: undefined,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewRispostaReset()));
  });

  it('deve caricare lo step successivo se consegnata', () => {
    const gen = esercizioPreviewStepNext({
      payload: {
        ...mockPayload.payload,
        step: {
          ...mockPayload.step,
          nextStep: null,
        },
      },
    });

    expect(gen.next().value).toEqual(put(esercizioPreviewContenutoSet({
      consegnata: true,
    })));

    expect(gen.next().value).toEqual(put(esercizioPreviewRispostaReset()));
  });
});


describe('watchEsercizioPreview', () => {
  it('testo che funzioni come atteso', () => {
    const gen = watchEsercizioPreview();

    expect(gen.next().value).toEqual(takeEvery(
      ESERCIZIO_PREVIEW_STEP_INITIALIZE,
      esercizioPreviewStepInitialize
    ));
    expect(gen.next().value).toEqual(takeEvery(
      ESERCIZIO_PREVIEW_RISPOSTA_POST,
      esercizioPreviewRispostaPost
    ));
    expect(gen.next().value).toEqual(takeEvery(
      ESERCIZIO_PREVIEW_STEP_NEXT,
      esercizioPreviewStepNext
    ));
  });
});

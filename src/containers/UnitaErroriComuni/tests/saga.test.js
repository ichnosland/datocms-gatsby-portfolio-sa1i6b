import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { mockElementiN, mockElementiM, mockElementiG } from 'common/testing-mocks';
import { calcolaChildrenTesto } from 'common/esercizi';
import { playSound } from 'common/suoni';
import { modalSetData } from 'containers/ModalBox/actions';

import {
  UNITA_ERRORI_COMUNI_URL_FETCH,
  UNITA_ERRORI_COMUNI_STEP_INITIALIZE,
  UNITA_ERRORI_COMUNI_STEP_NEXT,
  UNITA_ERRORI_COMUNI_RISPOSTA_POST,
} from '../constants';
import {
  unitaErroriComuniContenutoSet,
  unitaErroriComuniReset,
  unitaErroriComuniStepSet,
  unitaErroriComuniRispostaReset,
  unitaErroriComuniRispostaSet,
} from '../actions';
import watchUnitaErroriComuni, {
  unitaErroriComuniStepInitialize,
  unitaErroriComuniRispostaPost,
  unitaErroriComuniStepNext,
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
describe('unitaErroriComuniStepInitialize', () => {
  const mockResponse = [
    ...mockElementiN,
    ...mockElementiG,
  ];

  const payload = {
    corsoId: 111,
    prerequisitoId: 222,
    unitaId: 333,
    historyPush: () => { },
  };

  it('fetch dei dati con esito positivo', () => {
    const gen = unitaErroriComuniStepInitialize({ payload });
    expect(gen.next().value).toEqual(put(unitaErroriComuniReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${UNITA_ERRORI_COMUNI_URL_FETCH}222/111`
    ));

    const mockTestoElaborato = [{
      esercizi: [mockElementiN[1]],
      testi: [{
        ...mockElementiN[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(
          mockElementiN[0].html,
          mockElementiN[0].inputLessicale
        ),
      }],
      id: 0,
    }, {
      esercizi: [mockElementiG[1]],
      testi: [{
        ...mockElementiG[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(
          mockElementiG[0].html,
          mockElementiG[0].inputLessicale
        ),
      }],
      id: 1,
    }];

    expect(gen.next({ data: mockResponse }).value).toEqual(put(unitaErroriComuniContenutoSet({
      steps: mockTestoElaborato,
      risposteFornite: {},
      stepCaricato: 0,
      titolo: 'Errori frequenti',
      isLoaded: true,
      totaleDomande: 2,
      unitaId: 333,
    })));

    expect(gen.next({ data: mockResponse }).value).toEqual(put(unitaErroriComuniStepSet({
      testi: mockTestoElaborato[0].testi,
      esercizi: mockTestoElaborato[0].esercizi,
      numeroProgressivoStep: mockTestoElaborato[0].id,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(call(
      payload.historyPush,
      '/errori-frequenti/333'
    ));
  });

  it('fetch dei dati con esito positivo response.data = []', () => {
    const gen = unitaErroriComuniStepInitialize({ payload });

    gen.next();
    gen.next();

    expect(gen.next({ data: [] }).value).toEqual(put(modalSetData({
      contenuto: 'Non sono disponibili errori frequenti per questa unità',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('fetch dei dati con esito negativo', () => {
    const gen = unitaErroriComuniStepInitialize({ payload });
    expect(gen.next().value).toEqual(put(unitaErroriComuniReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${UNITA_ERRORI_COMUNI_URL_FETCH}222/111`
    ));

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Impossibile caricare gli errori frequenti per questa unità',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });
});


describe('unitaErroriComuniRispostaPost', () => {
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
    const gen = unitaErroriComuniRispostaPost(mockDataPost);
    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', false));

    expect(gen.next().value).toEqual(put(unitaErroriComuniStepSet({
      nextStep: {
        esercizi: [mockElementiM[1]],
        testi: [mockElementiM[0]],
        numeroProgressivoStep: 1,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(put(unitaErroriComuniContenutoSet({
      risposteFornite: { 0: mockForniteN },
      stepCaricato: 1,
    })));

    expect(gen.next().value).toEqual(put(unitaErroriComuniRispostaSet({
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
  });


  it('esito è positivo e non conclusa con helpRequest', () => {
    const gen = unitaErroriComuniRispostaPost({
      payload: {
        ...mockDataPost.payload,
        helpRequest: true,
      },
    });
    expect(gen.next().value).toEqual(call(playSound, 'step_aiuto', false));

    expect(gen.next().value).toEqual(put(unitaErroriComuniStepSet({
      nextStep: {
        esercizi: [mockElementiM[1]],
        testi: [mockElementiM[0]],
        numeroProgressivoStep: 1,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(put(unitaErroriComuniContenutoSet({
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

    expect(gen.next().value).toEqual(put(unitaErroriComuniRispostaSet({
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
  });

  it('esito è positivo e conclusa con enableSuoni', () => {
    const gen = unitaErroriComuniRispostaPost({
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
    expect(gen.next().value).toEqual(call(playSound, 'step_corretto', false));

    expect(gen.next().value).toEqual(put(unitaErroriComuniStepSet({
      nextStep: null,
    })));

    expect(gen.next().value).toEqual(put(unitaErroriComuniContenutoSet({
      risposteFornite: { 0: mockForniteN, 1: mockForniteM },
      stepCaricato: 2,
    })));

    expect(gen.next().value).toEqual(put(unitaErroriComuniRispostaSet({
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
  });
});

describe('unitaErroriComuniStepNext', () => {
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
            testoConsegna: calcolaChildrenTesto(
              mockElementiN[0].html, mockElementiN[0].inputLessicale
            ),
          }],
          numeroProgressivoStep: 10,
        },
      },
    },
  };

  it('deve caricare lo step successivo', () => {
    const gen = unitaErroriComuniStepNext(mockPayload);

    expect(gen.next().value).toEqual(put(unitaErroriComuniStepSet({
      ...mockPayload.payload.step.nextStep,
      numeroProgressivoStep: 10,
      nextStep: undefined,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(unitaErroriComuniRispostaReset()));
  });

  it('deve caricare lo step conclusivo', () => {
    const gen = unitaErroriComuniStepNext({
      payload: {
        ...mockPayload.payload,
        step: {
          ...mockPayload.payload.step,
          nextStep: null,
        },
      },
    });

    expect(gen.next().value).toEqual(put(unitaErroriComuniContenutoSet({
      consegnata: true,
    })));

    expect(gen.next().value).toEqual(call(
      playSound, 'vinto', true
    ));

    expect(gen.next().value).toEqual(put(unitaErroriComuniRispostaReset()));
  });
});


describe('watchUnitaErroriComuni', () => {
  it('testo che funzioni come atteso', () => {
    const gen = watchUnitaErroriComuni();

    expect(gen.next().value).toEqual(takeEvery(
      UNITA_ERRORI_COMUNI_STEP_INITIALIZE,
      unitaErroriComuniStepInitialize
    ));
    expect(gen.next().value).toEqual(takeEvery(
      UNITA_ERRORI_COMUNI_RISPOSTA_POST,
      unitaErroriComuniRispostaPost
    ));
    expect(gen.next().value).toEqual(takeEvery(
      UNITA_ERRORI_COMUNI_STEP_NEXT,
      unitaErroriComuniStepNext
    ));
  });
});

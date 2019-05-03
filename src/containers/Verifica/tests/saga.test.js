import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import checkmark from 'images/infocard-icn_checkmark.png';
import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import { userHintDisplay } from 'containers/User/actions';

import { mockElementiN, mockElementiG, mockElementiO } from 'common/testing-mocks';
import { verificheEsecuzioneLivelloDocenteData } from 'common/testing-fixtures/verifica';
import { createStepFromEsercizi, calcolaChildrenTesto } from 'common/esercizi';
import { playSound } from 'common/suoni';
import * as actions from '../actions';
import * as constants from '../constants';
import * as sagas from '../saga';


/* eslint-disable redux-saga/yield-effects */

describe('verificaLivelloFetchSaga', () => {
  const mockVerificheAssegnate = [{
    unita: [{ id: 1 }, { id: 4 }],
  }];
  const mockResponseData = {
    label_verifica: 'titolo verifica 1',
    enable_unit_selection: true,
    verifiche_assegnate: mockVerificheAssegnate,
    unita: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  };

  it('esito positivo per docente', () => {
    const gen = sagas.verificaLivelloFetchSaga({
      livelloId: 123,
      isDocente: true,
      corsoId: 567,
      idsUnita: [2, 4],
      soloLatino: true,
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.verificaReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERIFICA_URL_LIVELLO_DOCENTE_FETCH}123/567`
    ));

    expect(gen.next({
      data: mockResponseData,
    }).value).toEqual(put(actions.verificaLivelloSet({
      titolo: 'titolo verifica 1',
      isLoaded: true,
      unita: [{
        id: 1, inVerifica: true,
      }, {
        id: 2, inVerifica: false,
      }, {
        id: 3, inVerifica: false,
      }, {
        id: 4, inVerifica: true,
      }],
      unitSelectionEnabled: true,
      verificheAssegnate: [{
        unita: [{ id: 1 }, { id: 4 }],
      }],
      datiVerifica: {
        soloLatino: true,
        unitaSelezionate: [2],
      },
    })));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('esito positivo per studente', () => {
    const gen = sagas.verificaLivelloFetchSaga({
      livelloId: 123,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.verificaReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERIFICA_URL_LIVELLO_STUDENTE_FETCH}123`
    ));

    expect(gen.next({
      data: mockVerificheAssegnate,
    }).value).toEqual(put(actions.verificaLivelloSet({
      isLoaded: true,
      verificheAssegnate: [{
        unita: [{ id: 1 }, { id: 4 }],
      }],
    })));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('esito negativo in caso di errore', () => {
    const gen = sagas.verificaLivelloFetchSaga({
      livelloId: 123,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.verificaReset()));
    gen.next();
    expect(gen.throw('error').value).toEqual(put(actions.verificaFeedbackSet(
      true,
      'error',
      'Impossibile scaricare le verifiche di questo livello',
    )));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });
});


describe('verificaLivelloProvaTriggerSaga', () => {
  const mockPayload = {
    history: {
      push: () => { },
    },
    userHints: {},
    userId: 123,
    unitaSelezionate: [1, 2],
    product: 'prodotto',
    livelloId: 13,
    titolo: 'titolo',
    soloLatino: false,
    dispatch: () => { },
  };

  const mockSteps = [{
    id: 0,
    elementi: mockElementiN,
  }, {
    id: 1,
    elementi: mockElementiG,
  }];

  const loadedSteps = mockSteps.map((step) => ({
    id: step.id,
    ...createStepFromEsercizi(step.elementi)[0],
  }));

  it('esito positivo', () => {
    const gen = sagas.verificaLivelloProvaTriggerSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_LIVELLO_PROVA}`, {
        livello: 13,
        solo_latino: false,
        unita: [1, 2],
      }
    ));

    expect(gen.next({
      data: mockSteps,
    }).value).toEqual(put(actions.verificaContenutoSet({
      steps: loadedSteps,
      totaleStep: 2,
      unitaSelezionate: [1, 2],
      titolo: 'titolo',
      isLoaded: true,
      livelloId: 13,
      risposteFornite: {},
      soloLatino: false,
      stepCaricato: 0,
    })));

    expect(gen.next({
      data: mockSteps,
    }).value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      userHints: {},
      userId: 123,
      product: 'prodotto',
      dispatch: expect.any(Function),
    })));

    expect(gen.next({
      data: mockSteps,
    }).value).toEqual(put(actions.verificaStepSet({
      testi: loadedSteps[0].testi,
      esercizi: loadedSteps[0].esercizi,
      numeroProgressivoStep: 0,
      isStepLoaded: true,
    })));

    expect(gen.next({
      data: mockSteps,
    }).value).toEqual(call(
      mockPayload.history.push, '/verifica-esecuzione'
    ));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('errore', () => {
    const gen = sagas.verificaLivelloProvaTriggerSaga({ payload: mockPayload });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Questa verifica non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });
});


describe('verificaStepInitializeSaga', () => {
  const mockPayload = {
    historyPush: () => { },
    userHints: {},
    id: 123,
    livelloId: 456,
    productName: 'prodotto',
    userId: 567,
    dispatchFunction: () => { },
    backUrl: '/backurl',
  };

  const mockSteps = [{
    id: 0,
    elementi: mockElementiN,
  }, {
    id: 1,
    elementi: mockElementiG,
  }];

  const mockResponse = {
    step_index: 0,
    num_steps: 15,
    step: {
      id: 0,
      elementi: mockElementiN,
    },
  };

  const loadedSteps = mockSteps.map((step) => ({
    id: step.id,
    ...createStepFromEsercizi(step.elementi)[0],
  }));

  it('esito positivo se presente uno step', () => {
    const gen = sagas.verificaStepInitializeSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.verificaStepReset()));
    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_FETCH}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next({ data: mockResponse }).value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      userHints: {},
      userId: 567,
      product: 'prodotto',
      dispatch: mockPayload.dispatchFunction,
    })));

    expect(gen.next({ data: mockResponse }).value).toEqual(put(actions.verificaContenutoSet({
      id: 123,
      isLoaded: true,
      totaleStep: 15,
      livelloId: 456,
      stepCaricato: 0,
      backUrl: '/backurl',
    })));

    expect(gen.next({ data: mockResponse }).value).toEqual(put(actions.verificaStepSet({
      testi: loadedSteps[0].testi,
      esercizi: loadedSteps[0].esercizi,
      numeroProgressivoStep: 0,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(call(
      mockPayload.historyPush, '/verifica-esecuzione'
    ));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('esito positivo se step ==  null', () => {
    const gen = sagas.verificaStepInitializeSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.verificaStepReset()));
    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_FETCH}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next({
      data: {
        step_index: 0,
        step: null,
      },
    }).value).toEqual(put(actions.verificaConsegna({
      id: 123,
      forceEnd: true,
      historyPush: mockPayload.historyPush,
      isDocente: false,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('esito positivo se ho un errore', () => {
    const gen = sagas.verificaStepInitializeSaga({ payload: mockPayload });

    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_FETCH}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Questa prova non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });
});


describe('verificaRispostaPostSaga', () => {
  const mockPayload = {
    step: verificheEsecuzioneLivelloDocenteData.step,
    risposta: verificheEsecuzioneLivelloDocenteData.risposta,
    isDocente: true,
    isSaltata: false,
    contenutoVerifica: verificheEsecuzioneLivelloDocenteData.contenuto,
    enableSuoni: false,
    productName: 'prodotto',
    historyPush: () => { },
    dispatch: () => { },
    userId: 666,
  };

  it('A) docente B) !isSaltata C) non terminata', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    // mi prendo lo step successivo
    const nextStep = mockPayload.contenutoVerifica.steps[1];
    expect(gen.next().value).toEqual(put(actions.verificaStepSet({
      testi: nextStep.testi,
      esercizi: nextStep.esercizi,
      numeroProgressivoStep: nextStep.id,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      dispatch: mockPayload.dispatch,
      product: 'prodotto',
      userHints: undefined,
      userId: 666,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaContenutoSet({
      risposteFornite: {
        0: {
          corretta: false,
          elementi: [94634, 94635],
          esercizio: 97552,
          help_request: false,
          readable: 'risposta selezionata',
          risposta: ['risposta selezionata'],
          saltata: false,
          skipped: [],
          stato: 'S',
          step: 0,
          tipo: 'N',
        },
      },
      stepCaricato: 1,
      stepRiaccodati: [],
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) docente B) isSaltata C) non terminata', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isSaltata: true,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          //  non importa se non sono veritieri
          stepRiaccodati: [{ id: 0 }, { id: 1 }],
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    // mi prendo lo step successivo
    const nextStep = mockPayload.contenutoVerifica.steps[1];
    expect(gen.next().value).toEqual(put(actions.verificaStepSet({
      testi: nextStep.testi,
      esercizi: nextStep.esercizi,
      numeroProgressivoStep: nextStep.id,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      dispatch: mockPayload.dispatch,
      product: 'prodotto',
      userHints: undefined,
      userId: 666,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaContenutoSet({
      risposteFornite: {
        0: {
          corretta: false,
          elementi: [94634, 94635],
          esercizio: 97552,
          help_request: false,
          readable: 'Saltata',
          risposta: [],
          saltata: true,
          skipped: [],
          stato: 'X',
          step: 0,
          tipo: 'N',
        },
      },
      // lo step riaccodato viene messo sempre in fondo
      stepRiaccodati: [{ id: 1 }, mockPayload.contenutoVerifica.steps[0]],
      stepCaricato: 1,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) docente B) !isSaltata C) terminata senza step saltati', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          stepCaricato: 1,
        },
        step: {
          ...mockPayload.step,
          testi: mockPayload.contenutoVerifica.steps[1].testi,
          esercizi: mockPayload.contenutoVerifica.steps[1].esercizi,
          numeroProgressivoStep: 1,
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    const risposteFornite = {
      1: {
        corretta: false,
        elementi: [94636, 94637],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        saltata: false,
        skipped: [],
        stato: 'S',
        step: 1,
        tipo: 'M',
      },
    };
    expect(gen.next().value).toEqual(put(actions.verificaConsegna({
      risposteFornite,
      unitaSelezionate: [],
      livelloId: 10,
      soloLatino: false,
      historyPush: mockPayload.historyPush,
      forceEnd: true,
      isDocente: true,
      enableSuoni: false,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaContenutoSet({
      risposteFornite,
      stepCaricato: 2,
      stepRiaccodati: [],
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) docente B) !isSaltata C) terminata senza step saltati D) risposta corretta', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        risposta: {
          ...mockPayload.risposta,
          rispostaSelezionata: ['presente', 'attivo'],
        },
      },
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(put(actions.verificaContenutoSet({
      risposteFornite: {
        0: {
          corretta: true,
          elementi: [94634, 94635],
          esercizio: 97552,
          help_request: false,
          readable: 'presente attivo',
          risposta: ['presente', 'attivo'],
          saltata: false,
          skipped: [],
          stato: 'C',
          step: 0,
          tipo: 'N',
        },
      },
      stepCaricato: 1,
      stepRiaccodati: [],
    })));
  });

  it('A) docente B) !isSaltata C) terminata con step saltati', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          stepCaricato: 1,
          stepRiaccodati: [{ id: 0 }],
        },
        step: {
          ...mockPayload.step,
          testi: mockPayload.contenutoVerifica.steps[1].testi,
          esercizi: mockPayload.contenutoVerifica.steps[1].esercizi,
          numeroProgressivoStep: 1,
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    const risposteFornite = {
      1: {
        corretta: false,
        elementi: [94636, 94637],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        saltata: false,
        skipped: [],
        stato: 'S',
        step: 1,
        tipo: 'M',
      },
    };

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Stai per terminare la verifica. Desideri consegnare o riprendere le domande saltate?',
      closeButton: {
        text: 'Consegna',
        onClick: expect.any(Function),
      },
      acceptButton: {
        text: 'Riprendi',
        onClick: expect.any(Function),
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaContenutoSet({
      risposteFornite,
      stepCaricato: 2,
      stepRiaccodati: [{ id: 0 }],
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) studente B) !isSaltata C) non terminata D) non ho step saltati pregressi', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          id: 444,
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 444,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        saltata: false,
        skipped: [],
        step: 0,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step_index: 2,
        step_risposta: 2,
        skipped: [],
        step: {
          elementi: mockElementiO,
          id: 0,
        },
      },
    }).value).toEqual(put(actions.verificaStepSet({
      testi: [{
        ...mockElementiO[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(
          mockElementiO[0].html, mockElementiO[0].inputLessicale
        ),
      }],
      esercizi: [mockElementiO[1]],
      isStepLoaded: true,
      skipped: [],
      numeroProgressivoStep: 2,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) studente B) !isSaltata C) non terminata D) ho ultimo step già saltato', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          id: 444,
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 444,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        saltata: false,
        skipped: [],
        step: 0,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step_index: 2,
        step_risposta: 2,
        skipped: [2],
        step: {
          elementi: mockElementiO,
          id: 0,
        },
      },
    }).value).toEqual(put(modalSetData({
      contenuto: 'Stai per terminare la verifica. Desideri consegnare o riprendere le domande saltate?',
      closeButton: {
        onClick: expect.any(Function), // TODO: testare contenuto onClick
        text: 'Consegna',
      },
      acceptButton: {
        onClick: expect.any(Function), // TODO: testare contenuto onClick
        text: 'Riprendi',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) studente B) isSaltata C) non terminata D) skipped da riaccodare', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
        isSaltata: true,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          id: 444,
        },
        step: {
          ...mockPayload.step,
          numeroProgressivoStep: 0,
          skipped: [0, 4, 5, 6],
        },
      },
    });

    gen.next();
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 444,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'Saltata',
        risposta: [],
        saltata: true,
        // lo step saltato viene portato in coda
        skipped: [4, 5, 6, 0],
        step: 0,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step_index: 1,
        step_risposta: 2,
        skipped: [0, 3, 4, 5],
        step: {
          elementi: mockElementiO,
          id: 4,
        },
      },
    }).value).toEqual(put(modalSetData({
      contenuto: 'Stai per terminare la verifica. Desideri consegnare o riprendere le domande saltate?',
      closeButton: {
        onClick: expect.any(Function), // TODO: testare contenuto onClick
        text: 'Consegna',
      },
      acceptButton: {
        onClick: expect.any(Function), // TODO: testare contenuto onClick
        text: 'Riprendi',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) studente B) !isSaltata C) terminata con step saltati', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          id: 444,
        },
        step: {
          ...mockPayload.step,
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 444,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        saltata: false,
        skipped: [],
        step: 0,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step_index: 1,
        step_risposta: 3,
        step: {
          elementi: mockElementiO,
          id: 0,
        },
      },
    }).value).toEqual(put(modalSetData({
      contenuto: 'Stai per terminare la verifica. Desideri consegnare o riprendere le domande saltate?',
      closeButton: {
        onClick: expect.any(Function), // TODO: testare contenuto onClick
        text: 'Consegna',
      },
      acceptButton: {
        onClick: expect.any(Function), // TODO: testare contenuto onClick
        text: 'Riprendi',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) studente B) !isSaltata C) terminata con consegna', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
        contenutoVerifica: {
          ...mockPayload.contenutoVerifica,
          id: 444,
        },
        step: {
          ...mockPayload.step,
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 444,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        saltata: false,
        skipped: [],
        step: 0,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step_index: 1,
        step_risposta: 2,
        step: null,
      },
    }).value).toEqual(put(actions.verificaConsegna({
      forceEnd: true,
      id: 444,
      isDocente: false,
      historyPush: mockPayload.historyPush,
      enableSuoni: false,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaRispostaReset()));
    expect(gen.next().value).toEqual(put(actions.verificaSpinnerSet(false)));
  });

  it('A) studente B) !isSaltata C) errore generico in consegna', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
      },
    });

    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      titolo: 'Impossibile inviare i dati',
      contenuto: 'Assicurarsi di avere una connessione',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('A) studente B) !isSaltata C) errore generico con response code in consegna', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
      },
    });

    gen.next();
    gen.next();

    expect(gen.throw({ response: { status: 400 } }).value).toEqual(put(modalSetData({
      titolo: 'Impossibile inviare i dati',
      contenuto: 'Assicurarsi di avere una connessione',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('A) studente B) !isSaltata C) errore generico con response code per duplicato', () => {
    const gen = sagas.verificaRispostaPostSaga({
      payload: {
        ...mockPayload,
        isDocente: false,
      },
    });

    gen.next();
    gen.next();

    expect(gen.throw({ response: { status: 409 } }).value).toEqual(put(modalSetData({
      titolo: 'Impossibile inviare i dati',
      contenuto: 'Hai già risposto a questa domanda, assicurati di non aver già eseguito questa domanda',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });
});


describe('verificaAssegnaSaga', () => {
  const mockVerificheAssegnate = [{
    unita: [{ id: 1 }, { id: 4 }],
  }];
  const mockResponseData = {
    label_verifica: 'titolo verifica 1',
    enable_unit_selection: true,
    verifiche_assegnate: mockVerificheAssegnate,
    unita: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  };

  it('esito positivo per assegnazione', () => {
    const gen = sagas.verificaAssegnaSaga({
      payload: {
        livelloId: 123,
        unita: [1, 2],
        corsoId: 567,
        soloLatino: true,
      },
    });

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      assegna: true,
    })));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_ASSEGNA}`, {
        corso: 567,
        livello: 123,
        solo_latino: true,
        unita: [1, 2],
      }
    ));

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(actions.verificaLivelloSet({
      isLoaded: true,
      titolo: 'titolo verifica 1',
      unitSelectionEnabled: true,
      unita: [{
        id: 1,
        inVerifica: true,
      }, {
        id: 2,
        inVerifica: false,
      }, {
        id: 3,
        inVerifica: false,
      }, {
        id: 4,
        inVerifica: true,
      }],
      verificheAssegnate: mockVerificheAssegnate,
      datiVerifica: {
        soloLatino: false,
        unitaSelezionate: [],
      },
    })));

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(modalSetData({
      contenuto: 'L\'assegnazione è avvenuta con successo',
      image: {
        src: checkmark,
        width: '180px',
        height: '130px',
        alt: 'Assegnata',
      },
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      assegna: false,
    })));
  });

  it('errore per assegnazione', () => {
    const gen = sagas.verificaAssegnaSaga({
      payload: {
        livelloId: 123,
        unita: [1, 2],
        corsoId: 567,
        soloLatino: true,
      },
    });

    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Questa verifica non può essere assegnata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      assegna: false,
    })));
  });
});


describe('verificaRitiraSaga', () => {
  it('esito positivo per ritiro con esito positivo', () => {
    const gen = sagas.verificaRitiraSaga({
      idVerifica: 1,
      verificheAssegnate: [{ id: 1, ritirata: false }, { id: 2, ritirata: false }],
    });

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      ritira_1: true,
      ritira: true,
    })));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_RITIRA}`, {
        verifica: 1,
      }
    ));

    expect(gen.next({ data: { ritirata: true } }).value).toEqual(put(actions.verificaLivelloSet({
      verificheAssegnate: [
        { id: 1, ritirata: true },
        { id: 2, ritirata: false },
      ],
    })));

    expect(gen.next({ data: { ritirata: true } }).value).toEqual(put(modalSetData({
      contenuto: 'Il ritiro è avvenuto con successo',
      image: {
        src: checkmark,
        width: '180px',
        height: '130px',
        alt: 'Ritirata',
      },
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      ritira_1: false,
      ritira: false,
    })));
  });

  it('esito positivo per ritiro con esito negativo', () => {
    const gen = sagas.verificaRitiraSaga({
      idVerifica: 1,
      verificheAssegnate: [{ id: 1, ritirata: false }, { id: 2, ritirata: false }],
    });

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      ritira_1: true,
      ritira: true,
    })));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_RITIRA}`, {
        verifica: 1,
      }
    ));

    expect(gen.next({ data: { ritirata: false } }).value).toEqual(put(modalSetData({
      contenuto: 'Questa verifica non può essere ritirata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      ritira_1: false,
      ritira: false,
    })));
  });

  it('errore per assegnazione', () => {
    const gen = sagas.verificaRitiraSaga({
      idVerifica: 1,
      verificheAssegnate: [{ id: 1, ritirata: false }, { id: 2, ritirata: false }],
    });

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      ritira_1: true,
      ritira: true,
    })));

    gen.next();

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Questa verifica non può essere ritirata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.verificaLivelloSpinnerSet({
      ritira_1: false,
      ritira: false,
    })));
  });
});


describe('verificaConsegnaSaga', () => {
  const mockPayload = {
    isDocente: true,
    risposteFornite: {
      1: {
        corretta: false,
        elementi: [94636, 94637],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        saltata: false,
        skipped: [],
        stato: 'S',
        step: 1,
        tipo: 'M',
      },
    },
    soloLatino: true,
    unitaSelezionate: [1, 2],
    forceEnd: true,
    historyPush: () => { },
    livelloId: 555,
    enableSuoni: true,
    id: 555,
  };

  it('esito positivo per docente con voto positivo', () => {
    const gen = sagas.verificaConsegnaSaga({
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_CONSEGNA_DOCENTE}`, {
        solo_latino: true,
        unita: [1, 2],
        livello: 555,
        risposte: mockPayload.risposteFornite,
      }
    ));

    expect(gen.next({ data: { voto: 7 } }).value).toEqual(put(actions.verificaContenutoSet({
      consegnata: true,
      voto: 7,
    })));

    expect(gen.next({ data: { voto: 7 } }).value).toEqual(call(
      playSound,
      'vinto',
      false
    ));

    expect(gen.next({ data: { voto: 7 } }).value).toEqual(call(
      mockPayload.historyPush,
      '/verifica-response',
    ));
  });

  it('esito positivo per docente con voto negativo', () => {
    const gen = sagas.verificaConsegnaSaga({
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_CONSEGNA_DOCENTE}`, {
        solo_latino: true,
        unita: [1, 2],
        livello: 555,
        risposte: mockPayload.risposteFornite,
      }
    ));

    expect(gen.next({ data: { voto: 4 } }).value).toEqual(put(actions.verificaContenutoSet({
      consegnata: true,
      voto: 4,
    })));

    expect(gen.next({ data: { voto: 4 } }).value).toEqual(call(
      playSound,
      'perso',
      false
    ));

    expect(gen.next({ data: { voto: 4 } }).value).toEqual(call(
      mockPayload.historyPush,
      '/verifica-response',
    ));
  });

  it('esito positivo per docente senza consegna forzata', () => {
    const gen = sagas.verificaConsegnaSaga({
      payload: {
        ...mockPayload,
        forceEnd: false,
      },
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_CONSEGNA_DOCENTE}`, {
        solo_latino: true,
        unita: [1, 2],
        livello: 555,
        risposte: mockPayload.risposteFornite,
      }
    ));

    expect(gen.next({ data: { voto: 4 } }).value).toEqual(put(actions.verificaContenutoSet({
      consegnata: true,
      voto: 4,
    })));

    expect(gen.next().value).toEqual(undefined);
  });

  it('exception per docente senza consegna forzata', () => {
    const gen = sagas.verificaConsegnaSaga({
      payload: mockPayload,
    });

    gen.next();

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Non ho potuto leggere il voto della consegna, riprovare',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('esito positivo per studente senza consegna forzata', () => {
    const gen = sagas.verificaConsegnaSaga({
      payload: {
        ...mockPayload,
        forceEnd: false,
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERIFICA_URL_CONSEGNA_STUDENTE}`, {
        assegnazione: 555,
      }
    ));

    expect(gen.next({ data: { voto: 4 } }).value).toEqual(put(actions.verificaContenutoSet({
      consegnata: true,
      voto: 4,
    })));

    expect(gen.next().value).toEqual(undefined);
  });
});


describe('watchVerifica', () => {
  it('testo che funzioni come atteso', () => {
    const gen = sagas.watchVerifica();

    expect(gen.next().value).toEqual(takeEvery(
      constants.VERIFICA_LIVELLO_FETCH,
      sagas.verificaLivelloFetchSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERIFICA_LIVELLO_PROVA_TRIGGER,
      sagas.verificaLivelloProvaTriggerSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERIFICA_STEP_INITIALIZE,
      sagas.verificaStepInitializeSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERIFICA_RISPOSTA_POST,
      sagas.verificaRispostaPostSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERIFICA_ASSEGNA_TRIGGER,
      sagas.verificaAssegnaSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERIFICA_RITIRA_TRIGGER,
      sagas.verificaRitiraSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERIFICA_CONSEGNA,
      sagas.verificaConsegnaSaga
    ));
  });
});

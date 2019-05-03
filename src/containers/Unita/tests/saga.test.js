import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import checkmark from 'images/infocard-icn_checkmark.png';
import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import { userHintDisplay, userDataSet } from 'containers/User/actions';

import { mockElementiN, mockElementiG } from 'common/testing-mocks';
import { createStepFromEsercizi, calcolaChildrenTesto } from 'common/esercizi';
import { playSound } from 'common/suoni';
import { googleAnalyticsWrapper } from 'common/utils';
import * as actions from '../actions';
import * as constants from '../constants';
import * as sagas from '../saga';


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


/* eslint-disable redux-saga/yield-effects */
describe('unitaContenutoFetch', () => {
  const mockResponseData = {
    nome: 'titolo',
    prerequisito: '1234',
    lezione: 34,
    assegnazione: true,
    cards: ['ACA01', 'ACA02', 'ACA03', 'ACA04', 'ACA05'],
    id: 333,
    livello: 111,
    stato_esecuzioni: {
      '01': {
        completata: true,
        in_corso: false,
      },
      '02': {
        completata: true,
        in_corso: true,
      },
      '03': {
        completata: true,
        in_corso: false,
      },
      '04': {
        completata: false,
        in_corso: false,
      },
    },
  };

  it('quando l\'esito è positivo', () => {
    const gen = sagas.unitaContenutoFetch({
      id: 123,
      isDocente: true,
      corsoId: 567,
    });

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.unitaReset()));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${constants.UNITA_URL_FETCH}123`, {
          params: { corso: 567 },
        }
      )
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(actions.unitaContenutoSet({
      titolo: 'titolo',
      prerequisito: 1234,
      lezione: 34,
      assegnata: true,
      lezioni: {
        totali: 5,
        completate: 3,
        andamento: {
          0: {
            completata: true,
            difficolta: '01',
            inCorso: false,
            sbloccata: true,
          },
          1: {
            completata: true,
            difficolta: '02',
            inCorso: true,
            sbloccata: true,
          },
          2: {
            completata: true,
            difficolta: '03',
            inCorso: false,
            sbloccata: true,
          },
          3: {
            completata: false,
            difficolta: '04',
            inCorso: false,
            sbloccata: true,
          },
          4: {
            completata: false,
            difficolta: '05',
            inCorso: false,
            sbloccata: false,
          },
        },
      },
      id: 333,
      isLoaded: true,
      livelloId: 111,
    })));
    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });

  it('in caso di errore', () => {
    const gen = sagas.unitaContenutoFetch({
      id: 123,
      isDocente: true,
      corsoId: 567,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(put(actions.unitaFeedbackSet(
      true,
      'error',
      'Impossibile caricare il contenuto di questa unità',
    )));

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });

  it('testo che setti i valori di default quando l\'esito è positivo', () => {
    const gen = sagas.unitaContenutoFetch({
      id: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        ...mockResponseData,
        nome: undefined,
        prerequisito: undefined,
        assegnazione: undefined,
        stato_esecuzioni: {},
      },
    }).value).toEqual(put(actions.unitaContenutoSet({
      titolo: '',
      prerequisito: 0,
      lezione: 34,
      assegnata: false,
      lezioni: {
        totali: 5,
        completate: 0,
        andamento: {
          0: {
            completata: false,
            difficolta: '01',
            inCorso: false,
            sbloccata: true,
          },
          1: {
            completata: false,
            difficolta: '02',
            inCorso: false,
            sbloccata: false,
          },
          2: {
            completata: false,
            difficolta: '03',
            inCorso: false,
            sbloccata: false,
          },
          3: {
            completata: false,
            difficolta: '04',
            inCorso: false,
            sbloccata: false,
          },
          4: {
            completata: false,
            difficolta: '05',
            inCorso: false,
            sbloccata: false,
          },
        },
      },
      id: 333,
      isLoaded: true,
      livelloId: 111,
    })));
  });

  it('testo che setti i valori di default quando stato_esecuzioni non è settato', () => {
    const gen = sagas.unitaContenutoFetch({
      id: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        ...mockResponseData,
        nome: undefined,
        prerequisito: undefined,
        assegnazione: undefined,
        stato_esecuzioni: undefined,
      },
    }).value).toEqual(put(actions.unitaContenutoSet({
      titolo: '',
      prerequisito: 0,
      lezione: 34,
      assegnata: false,
      lezioni: {
        totali: 5,
        completate: 0,
        andamento: {
          0: {
            completata: false,
            difficolta: '01',
            inCorso: false,
            sbloccata: true,
          },
          1: {
            completata: false,
            difficolta: '02',
            inCorso: false,
            sbloccata: false,
          },
          2: {
            completata: false,
            difficolta: '03',
            inCorso: false,
            sbloccata: false,
          },
          3: {
            completata: false,
            difficolta: '04',
            inCorso: false,
            sbloccata: false,
          },
          4: {
            completata: false,
            difficolta: '05',
            inCorso: false,
            sbloccata: false,
          },
        },
      },
      id: 333,
      isLoaded: true,
      livelloId: 111,
    })));
  });

  it('testo che setti i valori di default quando stato_esecuzioni non è settato e contiene automatici', () => {
    const gen = sagas.unitaContenutoFetch({
      id: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        ...mockResponseData,
        nome: undefined,
        prerequisito: undefined,
        assegnazione: undefined,
        stato_esecuzioni: undefined,
        cards: ['ACA00', 'ACA01', 'ACA02', 'ACA03', 'ACA04'],
      },
    }).value).toEqual(put(actions.unitaContenutoSet({
      titolo: '',
      prerequisito: 0,
      lezione: 34,
      assegnata: false,
      lezioni: {
        totali: 5,
        completate: 0,
        andamento: {
          0: {
            completata: false,
            difficolta: '00',
            inCorso: false,
            sbloccata: true,
          },
          1: {
            completata: false,
            difficolta: '01',
            inCorso: false,
            sbloccata: false,
          },
          2: {
            completata: false,
            difficolta: '02',
            inCorso: false,
            sbloccata: false,
          },
          3: {
            completata: false,
            difficolta: '03',
            inCorso: false,
            sbloccata: false,
          },
          4: {
            completata: false,
            difficolta: '04',
            inCorso: false,
            sbloccata: false,
          },
        },
      },
      id: 333,
      isLoaded: true,
      livelloId: 111,
    })));
  });

  it('testo che setti i valori di default se la card non ha ACA00 o ACA01', () => {
    const gen = sagas.unitaContenutoFetch({
      id: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        ...mockResponseData,
        cards: ['ACA03', 'ACA04'],
        stato_esecuzioni: {},
      },
    }).value).toEqual(put(actions.unitaContenutoSet({
      titolo: 'titolo',
      prerequisito: 1234,
      lezione: 34,
      assegnata: true,
      lezioni: {
        totali: 2,
        completate: 0,
        andamento: {
          0: {
            completata: false,
            difficolta: '03',
            inCorso: false,
            sbloccata: false,
          },
          1: {
            completata: false,
            difficolta: '04',
            inCorso: false,
            sbloccata: false,
          },
        },
      },
      id: 333,
      isLoaded: true,
      livelloId: 111,
    })));
  });
});


describe('unitaStepInitialize', () => {
  const mockPayload = {
    userId: 999,
    disciplina: 888,
    prerequisito: 3333,
    historyPush: () => { },
    productName: 'nome',
    userHints: { hint1: true },
    livelloId: 111,
    unitaId: 222,
    difficolta: 'ACA02',
    dispatch: () => { },
  };

  const mockStepResponse = {
    step: {
      elementi: mockElementiN,
      id: 2,
    },
    num_required_steps: 13,
    num_wrong_steps: 2,
    num_correct_steps: 2,
  };

  it('quando l\'esito è positivo', () => {
    const gen = sagas.unitaStepInitialize({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.unitaRispostaReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_STEP_FETCH}`, {
        unita: 222,
        prerequisito: 3333,
        difficolta: 'ACA02',
        disciplina: 888,
      }
    ));

    expect(gen.next({ data: mockStepResponse }).value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      dispatch: mockPayload.dispatch,
      userHints: { hint1: true },
      userId: 999,
      product: 'nome',
    })));

    expect(gen.next({ data: mockStepResponse }).value).toEqual(put(actions.unitaStepSet({
      testi: loadedSteps[0].testi,
      esercizi: loadedSteps[0].esercizi,
      isStepLoaded: true,
      numeroStepCompletati: 2,
      stepId: 2,
    })));

    expect(gen.next({ data: mockStepResponse }).value).toEqual(put(actions.unitaContenutoSet({
      difficolta: 'ACA02',
      totaleDomande: 15,
    })));

    expect(gen.next({ data: mockStepResponse }).value).toEqual(call(
      mockPayload.historyPush, '/unita-esecuzione'
    ));

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });

  it('quando non viene restituito lo step e ho un errore generico', () => {
    const gen = sagas.unitaStepInitialize({ payload: mockPayload });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: { ...mockStepResponse, step: null },
    }).value).toEqual(put(modalSetData({
      contenuto: 'Questa prova non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('testo che venga mostrato il messaggio di errore', () => {
    const gen = sagas.unitaStepInitialize({
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.unitaRispostaReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_STEP_FETCH}`, {
        unita: 222,
        prerequisito: 3333,
        difficolta: 'ACA02',
        disciplina: 888,
      }
    ));

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Questa prova non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });

  it('quando l\'esito è positivo e step == null', () => {
    const gen = sagas.unitaStepInitialize({
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.unitaRispostaReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_STEP_FETCH}`, {
        unita: 222,
        prerequisito: 3333,
        difficolta: 'ACA02',
        disciplina: 888,
      }
    ));

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Questa prova non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });
});


describe('unitaRispostaPost', () => {
  const mockDataPost = {
    payload: {
      step: {
        esercizi: loadedSteps[0].esercizi,
        testi: loadedSteps[0].testi,
        stepId: 3,
      },
      risposta: {
        rispostaSelezionata: ['risposta selezionata'],
        isPristine: true,
      },
      isDocente: false,
      helpRequest: false,
      disciplinaId: 333,
      contenutoUnita: {
        id: 123,
        steps: loadedSteps,
        stepCaricato: 0,
        difficolta: 'ACA02',
        livelloId: 444,
      },
    },
  };

  const mockResponseData = {
    complete: false,
    correct: false,
    num_required_steps: 3,
    num_wrong_steps: 2,
    step: {
      elementi: mockElementiN,
      id: 3,
      num_correct_steps: 2,
    },
    xp: 4,
  };

  it('quando l\'esito è positivo and isDocente = false and is not conclusa', () => {
    const gen = sagas.unitaRispostaPost(mockDataPost);

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_STEP_POST}`, {
        unita: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 3,
        tipo: 'N',
        difficolta: 'ACA02',
        livello: 444,
        disciplina: 333,
      }
    ));

    expect(gen.next({
      data: mockResponseData,
    }).value).toEqual(put(actions.unitaStepSet({
      nextStep: {
        testi: [{
          ...mockElementiN[0],
          html: undefined,
          testoConsegna: calcolaChildrenTesto(
            mockElementiN[0].html, mockElementiN[0].inputLessicale
          ),
        }],
        esercizi: [mockElementiN[1]],
        stepId: 3,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(put(userDataSet({
      anagraphics: {
        studenteAcademy: {
          punti: 4,
        },
      },
    })));

    expect(gen.next().value).toEqual(put(actions.unitaContenutoSet({
      totaleDomande: 5,
    })));

    expect(gen.next().value).toEqual(call(
      playSound, 'step_sbagliato', true
    ));

    expect(gen.next().value).toEqual(put(actions.unitaRispostaSet({
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [[
          'attivo',
          'presente',
        ]],
      },
      isChecked: true,
      isCorrect: false,
      isHelpEnabled: false,
      isInterfaceLocked: true,
      isPristine: false,
      mostraCorrezione: true,
      mostraSoluzione: true,
    })));
  });

  it('quando l\'esito è positivo and isDocente = true and is not conclusa', () => {
    const gen = sagas.unitaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        isDocente: true,
      },
    });

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_STEP_POST}`, {
        unita: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 3,
        tipo: 'N',
        difficolta: 'ACA02',
        livello: 444,
        disciplina: 333,
      }
    ));

    expect(gen.next({
      data: { ...mockResponseData },
    }).value).toEqual(put(actions.unitaStepSet({
      nextStep: {
        testi: [{
          ...mockElementiN[0],
          html: undefined,
          testoConsegna: calcolaChildrenTesto(
            mockElementiN[0].html, mockElementiN[0].inputLessicale
          ),
        }],
        esercizi: [mockElementiN[1]],
        stepId: 3,
        isStepLoaded: true,
      },
    })));
  });

  it('quando l\'esito è positivo and isDocente = false and is conclusa', () => {
    const gen = sagas.unitaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        isDocente: false,
      },
    });
    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_STEP_POST}`, {
        unita: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 3,
        tipo: 'N',
        difficolta: 'ACA02',
        livello: 444,
        disciplina: 333,
      }
    ));

    expect(gen.next({
      data: { ...mockResponseData, correct: true, complete: true },
    }).value).toEqual(put(actions.unitaContenutoSet({
      consegnata: true,
    })));

    expect(gen.next().value).toEqual(call(
      playSound, 'step_corretto', true
    ));

    expect(gen.next().value).toEqual(put(actions.unitaRispostaSet({
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
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

  it('quando l\'esito è positivo and isDocente = false and is not conclusa', () => {
    const gen = sagas.unitaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        isDocente: true,
      },
    });
    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_STEP_POST}`, {
        unita: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 3,
        tipo: 'N',
        difficolta: 'ACA02',
        livello: 444,
        disciplina: 333,
      }
    ));

    expect(gen.next({
      data: { ...mockResponseData },
    }).value).toEqual(put(actions.unitaStepSet({
      nextStep: {
        testi: [{
          ...mockElementiN[0],
          html: undefined,
          testoConsegna: calcolaChildrenTesto(
            mockElementiN[0].html, mockElementiN[0].inputLessicale
          ),
        }],
        esercizi: [mockElementiN[1]],
        stepId: 3,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(put(actions.unitaContenutoSet({
      totaleDomande: 5,
    })));

    expect(gen.next().value).toEqual(call(
      playSound, 'step_sbagliato', true
    ));

    expect(gen.next().value).toEqual(put(actions.unitaRispostaSet({
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [['attivo', 'presente']],
      },
      isChecked: true,
      isCorrect: false,
      isHelpEnabled: false,
      isInterfaceLocked: true,
      isPristine: false,
      mostraCorrezione: true,
      mostraSoluzione: true,
    })));
  });

  it('quando ho errore', () => {
    const gen = sagas.unitaRispostaPost(mockDataPost);

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

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });

  it('quando ho errore con 409', () => {
    const gen = sagas.unitaRispostaPost(mockDataPost);

    gen.next();
    gen.next();

    expect(gen.throw({ response: { status: 409 } }).value).toEqual(put(modalSetData({
      titolo: 'Impossibile inviare i dati',
      contenuto: 'Hai già risposto a questa domanda, assicurati di non averla già eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });
});


describe('unitaStepNext', () => {
  const mockPayload = {
    payload: {
      productName: 'nomeprodotto',
      userId: 555,
      isDocente: false,
      userHints: {
        stepG: true,
      },
      nextStep: {
        esercizi: [mockElementiN[1]],
        testi: [mockElementiN[0]],
        stepId: 10,
      },
      isConsegnata: false,
      historyPush: () => { },
      difficolta: '02',
      lezioni: {
        totali: 2,
        completate: 0,
        andamento: {
          0: {
            completata: true,
            difficolta: '01',
            inCorso: false,
            sbloccata: false,
          },
          1: {
            completata: false,
            difficolta: '02',
            inCorso: false,
            sbloccata: false,
          },
          2: {
            completata: false,
            difficolta: '03',
            inCorso: false,
            sbloccata: false,
          },
        },
      },
    },
  };

  it('se non è consegnata', () => {
    const gen = sagas.unitaStepNext({
      ...mockPayload,
      payload: {
        ...mockPayload.payload,
        isConsegnata: false,
        step: {
          nextStep: {
            esercizi: [mockElementiN[1]],
            testi: [mockElementiN[0]],
            stepId: 9,
          },
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.unitaStepSet({
      ...mockPayload.payload.nextStep,
      stepId: 10,
      nextStep: undefined,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(actions.unitaRispostaReset()));

    expect(gen.next().value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      dispatch: mockPayload.payload.dispatch,
      userHints: mockPayload.payload.userHints,
      userId: mockPayload.payload.userId,
      product: mockPayload.payload.productName,
    })));

    expect(gen.next().value).toEqual(undefined);
  });

  it('se è consegnata e studente', () => {
    const gen = sagas.unitaStepNext({
      ...mockPayload,
      payload: {
        ...mockPayload.payload,
        isConsegnata: true,
        step: {
          ...mockPayload.payload.step,
          nextStep: {
            esercizi: [mockElementiN[1]],
            testi: [mockElementiN[0]],
            stepId: 9,
          },
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.unitaStepSet({
      ...mockPayload.payload.nextStep,
      stepId: 10,
      nextStep: undefined,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(actions.unitaRispostaReset()));

    expect(gen.next().value).toEqual(put(actions.unitaContenutoSet({
      lezioni: {
        ...mockPayload.payload.lezioni,
        completate: 2,
      },
    })));

    expect(gen.next().value).toEqual(call(googleAnalyticsWrapper, 'event', {
      category: 'Unità',
      action: 'Consegna studente',
    }));
    expect(gen.next().value).toEqual(call(playSound, 'vinto', true));
    expect(gen.next().value).toEqual(call(mockPayload.payload.historyPush, '/unita-response'));
  });

  it('se è consegnata e docente', () => {
    const gen = sagas.unitaStepNext({
      ...mockPayload,
      payload: {
        ...mockPayload.payload,
        isConsegnata: true,
        isDocente: true,
        step: {
          ...mockPayload.payload.step,
          nextStep: {
            esercizi: [mockElementiN[1]],
            testi: [mockElementiN[0]],
            stepId: 9,
          },
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.unitaStepSet({
      ...mockPayload.payload.nextStep,
      stepId: 10,
      nextStep: undefined,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(actions.unitaRispostaReset()));

    expect(gen.next().value).toEqual(put(actions.unitaContenutoSet({
      lezioni: {
        ...mockPayload.payload.lezioni,
        completate: 2,
      },
    })));

    expect(gen.next().value).toEqual(call(googleAnalyticsWrapper, 'event', {
      category: 'Unità',
      action: 'Consegna docente',
    }));

    expect(gen.next().value).toEqual(call(playSound, 'vinto', true));
    expect(gen.next().value).toEqual(call(mockPayload.payload.historyPush, '/unita-response'));
  });
});


describe('unitaAssegna', () => {
  it('con esito positivo', () => {
    const gen = sagas.unitaAssegna({
      id: 123,
      idCorso: 345,
      idDisciplina: 555,
    });

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_ASSEGNA}`, {
        unita: 123,
        corso: 345,
        disciplina: 555,
      }
    ));

    expect(gen.next({
      data: {},
    }).value).toEqual(put(actions.unitaContenutoSet({
      assegnata: true,
    })));

    expect(gen.next({
      data: {},
    }).value).toEqual(put(
      modalSetData({
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
      })
    ));

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });

  it('con esito negativo', () => {
    const gen = sagas.unitaAssegna({
      id: 123,
      idCorso: 345,
      idDisciplina: 333,
    });

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.UNITA_URL_ASSEGNA}`, {
        unita: 123,
        corso: 345,
        disciplina: 333,
      }
    ));

    expect(gen.throw('error').value).toEqual(put(
      modalSetData({
        contenuto: 'Quest\'unità non può essere assegnata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      })
    ));

    expect(gen.next().value).toEqual(put(actions.unitaSpinnerSet(false)));
  });
});


describe('watchUnita', () => {
  it('testo che funzioni come atteso', () => {
    const gen = sagas.watchUnita();

    expect(gen.next().value).toEqual(takeEvery(
      constants.UNITA_CONTENUTO_FETCH,
      sagas.unitaContenutoFetch
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.UNITA_STEP_INITIALIZE,
      sagas.unitaStepInitialize
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.UNITA_RISPOSTA_POST,
      sagas.unitaRispostaPost
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.UNITA_STEP_NEXT,
      sagas.unitaStepNext
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.UNITA_ASSEGNA_TRIGGER,
      sagas.unitaAssegna
    ));
  });
});

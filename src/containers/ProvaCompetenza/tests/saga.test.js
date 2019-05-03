import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import checkmark from 'images/infocard-icn_checkmark.png';
import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import { userHintDisplay } from 'containers/User/actions';

import { mockElementiN, mockElementiM, mockElementiG } from 'common/testing-mocks';
import { createStepFromEsercizi, calcolaChildrenTesto } from 'common/esercizi';
import { playSound } from 'common/suoni';
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

describe('provaCompetenzaContenutoFetch', () => {
  const mockResponseDataStudente = {
    titolo: 'titolo',
    in_corso: false,
    assegnata: true,
    consegnata: true,
    prerequisito: 'prerequisito',
    sottotitolo: 'sottotitolo',
    missione: 888,
    autore: 'autore',
    fonte: 'fonte',
    difficolta: 'difficolta',
    testo: 'testo preview',
    ritirata: true,
    totale_domande: 12,
    data_assegnazione: '10/10/2018',
    id: 123,
  };

  const mockResponseDataDocente = {
    titolo: 'titolo',
    prerequisito: 'prerequisito',
    sottotitolo: 'sottotitolo',
    missione: 888,
    autore: 'autore',
    fonte: 'fonte',
    difficolta: 'difficolta',
    testo: 'testo preview',
    totale_domande: 12,
    assegnazione: {
      data_assegnazione: '10/10/2018',
      ritirata: true,
      id: 555,
    },
    id: 123,
  };

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true', () => {
    const gen = sagas.provaCompetenzaContenutoFetch({
      id: 123,
      isDocente: true,
      corsoId: 567,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaReset()));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_DOCENTE_FETCH}567/123`
      )
    );

    expect(gen.next({ data: mockResponseDataDocente }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      assegnata: true,
      dataAssegnazione: '10/10/2018',
      id: 123,
      inCorso: false,
      isLoaded: true,
      consegnata: false,
      idAssegnazione: 555,
      prerequisito: 'prerequisito',
      sottotitolo: 'sottotitolo',
      missione: 888,
      autore: 'autore',
      fonte: 'fonte',
      difficolta: 'difficolta',
      ritirata: true,
      testo: 'testo preview',
      titolo: 'titolo',
      totaleDomande: 12,
    })));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso in caso di errore', () => {
    const gen = sagas.provaCompetenzaContenutoFetch({
      id: 123,
      isDocente: true,
      corsoId: 567,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaReset()));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_DOCENTE_FETCH}567/123`
      )
    );

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaFeedbackSet(
      true,
      'error',
      'Impossibile scaricare questa prova per competenza',
    )));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false', () => {
    const gen = sagas.provaCompetenzaContenutoFetch({
      id: 123,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaReset()));
    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STUDENTE_FETCH}123`
      )
    );

    expect(gen.next({ data: mockResponseDataStudente }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      assegnata: false,
      dataAssegnazione: undefined,
      id: 123,
      inCorso: false,
      isLoaded: true,
      consegnata: true,
      idAssegnazione: 0,
      prerequisito: 'prerequisito',
      sottotitolo: 'sottotitolo',
      missione: 888,
      autore: 'autore',
      fonte: 'fonte',
      difficolta: 'difficolta',
      ritirata: true,
      testo: 'testo preview',
      titolo: 'titolo',
      totaleDomande: 12,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che setti i valori di default quando l\'esito è positivo', () => {
    const gen = sagas.provaCompetenzaContenutoFetch({
      id: 123,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaReset()));
    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STUDENTE_FETCH}123`
      )
    );

    expect(gen.next({
      data: {
        ...mockResponseDataStudente,
        titolo: undefined,
        in_corso: undefined,
        assegnata: undefined,
        consegnata: undefined,
        prerequisito: undefined,
        sottotitolo: undefined,
        testo: undefined,
        autore: undefined,
        missione: undefined,
        fonte: undefined,
        difficolta: undefined,
        data_assegnazione: undefined,
        totale_domande: undefined,
      },
    }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      assegnata: false,
      dataAssegnazione: undefined,
      id: 123,
      inCorso: false,
      isLoaded: true,
      prerequisito: '',
      sottotitolo: '',
      idAssegnazione: 0,
      ritirata: true,
      consegnata: false,
      missione: 0,
      testo: '',
      autore: '',
      fonte: '',
      difficolta: '',
      titolo: '',
      totaleDomande: -1,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });
});

describe('provaCompetenzaStepInitialize', () => {
  const history = {
    push: () => { },
  };
  const mockPayload = {
    id: 123,
    isDocente: true,
    history,
    configuration: {
      product: 'lyceum',
    },
    userAnagraphics: {
      id: 444,
    },
    userAppData: {
      hints: {
        stepG: true,
        stepUP: true,
      },
    },
    dispatch: () => { },
  };

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true', () => {
    const gen = sagas.provaCompetenzaStepInitialize({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_DOCENTE_FETCH}123`
    ));

    expect(gen.next({ data: { steps: mockSteps } }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      steps: loadedSteps,
      risposteFornite: {},
      stepCaricato: 0,
    })));

    expect(gen.next({ data: { steps: mockSteps } }).value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      dispatch: mockPayload.dispatch,
      userHints: mockPayload.userAppData.hints,
      userId: mockPayload.userAnagraphics.id,
      product: mockPayload.configuration.product,
    })));

    expect(gen.next({ data: { steps: mockSteps } }).value).toEqual(put(actions.provaCompetenzaStepSet({
      testi: loadedSteps[0].testi,
      esercizi: loadedSteps[0].esercizi,
      numeroProgressivoStep: 0,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(call(history.push, '/prova-competenza-esecuzione'));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che venga mostrato il messaggio di errore', () => {
    const gen = sagas.provaCompetenzaStepInitialize({
      payload: {
        ...mockPayload,
        isDocente: true,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_DOCENTE_FETCH}123`
    ));

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Questa prova non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false', () => {
    const gen = sagas.provaCompetenzaStepInitialize({
      payload: {
        ...mockPayload,
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_STUDENTE_FETCH}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next({
      data: {
        step_index: 1,
        step: {
          elementi: mockElementiN,
        },
      },
    }).value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      dispatch: mockPayload.dispatch,
      userHints: mockPayload.userAppData.hints,
      userId: mockPayload.userAnagraphics.id,
      product: mockPayload.configuration.product,
    })));

    expect(gen.next({
      data: {
        step_index: 1,
        step: {
          elementi: mockElementiN,
        },
      },
    }).value).toEqual(put(actions.provaCompetenzaStepSet({
      testi: [{
        ...mockElementiN[0],
        html: undefined,
        testoConsegna: calcolaChildrenTesto(
          mockElementiN[0].html, mockElementiN[0].inputLessicale
        ),
      }],
      esercizi: [mockElementiN[1]],
      numeroProgressivoStep: 1,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(call(history.push, '/prova-competenza-esecuzione'));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false e deve consegnare', () => {
    const gen = sagas.provaCompetenzaStepInitialize({
      payload: {
        ...mockPayload,
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_STUDENTE_FETCH}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next({
      data: {
        step_index: 1,
        step: null,
      },
    }).value).toEqual(put(actions.provaCompetenzaConsegna({
      id: 123,
      forceEnd: true,
      history,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });
});

describe('provaCompetenzaRispostaPost', () => {
  const mockDataPost = {
    payload: {
      history: {
        push: () => { },
      },
      step: {
        esercizi: loadedSteps[0].esercizi,
        testi: loadedSteps[0].testi,
        numeroProgressivoStep: 0,
      },
      risposta: {
        rispostaSelezionata: ['risposta selezionata'],
        isPristine: true,
      },
      isDocente: true,
      helpRequest: false,
      contenutoProva: {
        id: 123,
        steps: loadedSteps,
        risposteFornite: {},
        stepCaricato: 0,
      },
    },
  };

  const mockRisposteFornite = {
    tipo: 'N',
    step: 0,
    corretta: false,
    stato: 'S',
    help_request: mockDataPost.payload.helpRequest,
    risposta: ['risposta selezionata'],
    readable: 'risposta selezionata',
    elementi: [94634, 94635],
    esercizio: 97552,
  };

  const mockSoluzioneG = [[{
    daAnalizzare: true,
    parola: 'Agnas',
    rispostaCorretta: 'compl. oggetto',
    rispostaCorrettaIndice: 1,
  }, {
    daAnalizzare: false,
    parola: 'et',
    rispostaCorretta: '',
    rispostaCorrettaIndice: undefined,
  }, {
    daAnalizzare: true,
    parola: 'gallinas',
    rispostaCorretta: 'compl. oggetto',
    rispostaCorrettaIndice: 1,
  }, {
    daAnalizzare: true,
    parola: 'agricola',
    rispostaCorretta: 'soggetto',
    rispostaCorrettaIndice: 2,
  }, {
    daAnalizzare: true,
    parola: 'numerat,',
    rispostaCorretta: 'pred. verbale',
    rispostaCorrettaIndice: 3,
  }, {
    daAnalizzare: false,
    parola: 'postea',
    rispostaCorretta: '',
    rispostaCorrettaIndice: undefined,
  }, {
    daAnalizzare: false,
    parola: '(poi,',
    rispostaCorretta: '',
    rispostaCorrettaIndice: undefined,
  }, {
    daAnalizzare: false,
    parola: 'avv.)',
    rispostaCorretta: '',
    rispostaCorrettaIndice: undefined,
  }, {
    daAnalizzare: false,
    parola: 'virga',
    rispostaCorretta: '',
    rispostaCorrettaIndice: undefined,
  }, {
    daAnalizzare: true,
    parola: 'capras',
    rispostaCorretta: 'compl. oggetto',
    rispostaCorrettaIndice: 1,
  }, {
    daAnalizzare: false,
    parola: 'et',
    rispostaCorretta: '',
    rispostaCorrettaIndice: undefined,
  }, {
    daAnalizzare: true,
    parola: 'capellas',
    rispostaCorretta: 'compl. oggetto',
    rispostaCorrettaIndice: 1,
  }, {
    daAnalizzare: true,
    parola: 'congregat.',
    rispostaCorretta: 'pred. verbale',
    rispostaCorrettaIndice: 3,
  }]];

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true and isPristine = true', () => {
    const gen = sagas.provaCompetenzaRispostaPost(mockDataPost);

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', true));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaStepSet({
      nextStep: {
        testi: loadedSteps[1].testi,
        esercizi: loadedSteps[1].esercizi,
        numeroProgressivoStep: 1,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaContenutoSet({
      risposteFornite: { 0: mockRisposteFornite },
      stepCaricato: 1,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaSet({
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

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true and isPristine = true e sono nell ultimo step con risposta corretta e lettura voto ha successo', () => {
    const mockRispostaCorretta = {
      0: { indiceLabel: 1 },
      2: { indiceLabel: 1 },
      3: { indiceLabel: 2 },
      4: { indiceLabel: 3 },
      9: { indiceLabel: 1 },
      11: { indiceLabel: 1 },
      12: { indiceLabel: 3 },
    };

    const gen = sagas.provaCompetenzaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        step: {
          esercizi: loadedSteps[1].esercizi,
          testi: loadedSteps[1].testi,
          numeroProgressivoStep: 1,
        },
        contenutoProva: {
          ...mockDataPost.payload.contenutoProva,
          stepCaricato: 1,
        },
        risposta: {
          rispostaSelezionata: mockRispostaCorretta,
          isPristine: true,
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    const rispFornite = {
      1: {
        corretta: true,
        elementi: [95523, 95524],
        esercizio: 97913,
        help_request: false,
        risposta: mockRispostaCorretta,
        readable: 'Agnas - compl. oggetto<br />gallinas - compl. oggetto<br />agricola - soggetto<br />numerat, - pred. verbale<br />capras - compl. oggetto<br />capellas - compl. oggetto<br />congregat. - pred. verbale',
        stato: 'C',
        step: 1,
        tipo: 'G',
      },
    };

    expect(gen.next().value).toEqual(call(playSound, 'step_corretto', true));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaConsegna({
      id: 123,
      isDocente: true,
      risposteFornite: rispFornite,
    })));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      risposteFornite: rispFornite,
      stepCaricato: 2,
    })));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(put(actions.provaCompetenzaRispostaSet({
      correzioneStep: {
        corrette: [0, 2, 3, 4, 9, 11, 12],
        sbagliate: [],
        soluzione: undefined,
      },
      isChecked: true,
      isCorrect: true,
      isInterfaceLocked: true,
      isPristine: false,
      mostraCorrezione: true,
      mostraSoluzione: false,
      isHelpEnabled: false,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true and isPristine = false and helpRequest = true', () => {
    const gen = sagas.provaCompetenzaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        risposta: {
          ...mockDataPost.payload.risposta,
          isPristine: false,
        },
        helpRequest: true,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(playSound, 'step_aiuto', true));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaSet({
      isChecked: true,
      isPristine: false,
      isCorrect: false,
      mostraSoluzione: true,
      mostraCorrezione: false,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [['attivo', 'presente']],
      },
      isHelpEnabled: true,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false and isPristine = true and is not conclusa', () => {
    const gen = sagas.provaCompetenzaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        step: {
          esercizi: [mockElementiN[1]],
          testi: [{
            ...mockElementiN[0],
            testoConsegna: calcolaChildrenTesto(
              mockElementiN[0].html, mockElementiN[0].inputLessicale
            ),
          }],
          numeroProgressivoStep: 10,
        },
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 10,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step: { elementi: mockElementiG },
        step_index: 11,
        corretta: false,
      },
    }).value).toEqual(put(actions.provaCompetenzaStepSet({
      nextStep: {
        testi: [{
          ...mockElementiG[0],
          html: undefined,
          testoConsegna: calcolaChildrenTesto(
            mockElementiG[0].html, mockElementiG[0].inputLessicale
          ),
        }],
        esercizi: [mockElementiG[1]],
        numeroProgressivoStep: 11,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', true));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaSet({
      isChecked: true,
      isPristine: false,
      isCorrect: false,
      mostraSoluzione: true,
      mostraCorrezione: true,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [['attivo', 'presente']],
      },
      isHelpEnabled: false,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e helpRequest = false and isDocente = false and isPristine = true and is not conclusa', () => {
    const gen = sagas.provaCompetenzaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        helpRequest: false,
        step: {
          esercizi: [mockElementiN[1]],
          testi: [{
            ...mockElementiN[0],
            html: undefined,
            testoConsegna: calcolaChildrenTesto(
              mockElementiN[0].html, mockElementiN[0].inputLessicale
            ),
          }],
          numeroProgressivoStep: 10,
        },
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 10,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step: { elementi: mockElementiG },
        step_index: 11,
      },
    }).value).toEqual(put(actions.provaCompetenzaStepSet({
      nextStep: {
        testi: [{
          ...mockElementiG[0],
          html: undefined,
          testoConsegna: calcolaChildrenTesto(
            mockElementiG[0].html, mockElementiG[0].inputLessicale
          ),
        }],
        esercizi: [mockElementiG[1]],
        numeroProgressivoStep: 11,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', true));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: true,
      mostraCorrezione: true,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [['attivo', 'presente']],
      },
      isHelpEnabled: false,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e helpRequest = true and isDocente = false and isPristine = true rispostaSelezionata = undefined', () => {
    const gen = sagas.provaCompetenzaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        helpRequest: true,
        step: {
          esercizi: [mockElementiG[1]],
          testi: [{
            ...mockElementiG[0],
            html: undefined,
            testoConsegna: calcolaChildrenTesto(
              mockElementiG[0].html, mockElementiG[0].inputLessicale
            ),
          }],
          numeroProgressivoStep: 10,
        },
        risposta: {
          ...mockDataPost.payload.risposta,
          rispostaSelezionata: undefined,
        },
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 123,
        elementi: [95523, 95524],
        esercizio: 97913,
        help_request: true,
        readable: 'Saltata',
        risposta: {},
        step: 10,
        tipo: 'G',
      }
    ));

    expect(gen.next({
      data: {
        step: { elementi: mockElementiN },
        step_index: 11,
      },
    }).value).toEqual(put(actions.provaCompetenzaStepSet({
      nextStep: {
        testi: [{
          ...mockElementiN[0],
          html: undefined,
          testoConsegna: calcolaChildrenTesto(
            mockElementiN[0].html, mockElementiN[0].inputLessicale
          ),
        }],
        esercizi: [mockElementiN[1]],
        numeroProgressivoStep: 11,
        isStepLoaded: true,
      },
    })));

    expect(gen.next().value).toEqual(call(playSound, 'step_aiuto', true));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: true,
      mostraCorrezione: false,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: [],
        sbagliate: [0, 2, 3, 4, 9, 11, 12],
        soluzione: mockSoluzioneG,
      },
      isHelpEnabled: true,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false and isPristine = true and is conclusa', () => {
    const gen = sagas.provaCompetenzaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        step: {
          esercizi: [mockElementiN[1]],
          testi: [{
            ...mockElementiN[0],
            html: undefined,
            testoConsegna: calcolaChildrenTesto(
              mockElementiN[0].html, mockElementiN[0].inputLessicale
            ),
          }],
          numeroProgressivoStep: 10,
        },
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 10,
        tipo: 'N',
      }
    ));

    expect(gen.next({
      data: {
        step: null,
        step_index: 11,
      },
    }).value).toEqual(put(actions.provaCompetenzaConsegna({
      id: 123,
    })));

    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', true));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaSet({
      isChecked: true,
      isPristine: false,
      isCorrect: false,
      mostraSoluzione: true,
      mostraCorrezione: !mockDataPost.payload.helpRequest,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: [],
        sbagliate: ['risposta selezionata'],
        soluzione: [['attivo', 'presente']],
      },
      isHelpEnabled: false,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni il messaggio di errore', () => {
    const gen = sagas.provaCompetenzaRispostaPost({
      ...mockDataPost,
      payload: {
        ...mockDataPost.payload,
        step: {
          esercizi: [mockElementiN[1]],
          testi: [{
            ...mockElementiN[0],
            testoConsegna: calcolaChildrenTesto(
              mockElementiN[0].html, mockElementiN[0].inputLessicale
            ),
          }],
          numeroProgressivoStep: 10,
        },
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_STEP_STUDENTE_POST}`, {
        assegnazione: 123,
        elementi: [94634, 94635],
        esercizio: 97552,
        help_request: false,
        readable: 'risposta selezionata',
        risposta: ['risposta selezionata'],
        step: 10,
        tipo: 'N',
      }
    ));

    expect(gen.next().value).toEqual(put(modalSetData({
      titolo: 'Impossibile inviare i dati',
      contenuto: 'Assicurarsi di avere una connessione',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });
});

describe('provaCompetenzaStepNext', () => {
  const mockPayload = {
    payload: {
      configuration: {
        product: 'lyceum',
      },
      userAnagraphics: {
        id: 555,
      },
      userAppData: {
        hints: {
          stepG: true,
        },
      },
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
      contenutoProva: {
        consegnata: true,
      },
      isDocente: true,
      history: {
        push: () => { },
      },
    },
  };

  it('testo che funzioni come atteso se isDocente = faose e non è consegnata', () => {
    const gen = sagas.provaCompetenzaStepNext({
      ...mockPayload,
      payload: {
        ...mockPayload.payload,
        isDocente: false,
        contenutoProva: {
          ...mockPayload.contenutoProva,
          consegnata: false,
        },
        step: {
          ...mockPayload.payload.step,
          nextStep: {
            esercizi: [mockElementiN[1]],
            testi: [{
              ...mockElementiN[0],
              testoConsegna: calcolaChildrenTesto(
                mockElementiN[0].html, mockElementiN[0].inputLessicale
              ),
            }],
            numeroProgressivoStep: 9,
          },
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaStepSet({
      ...mockPayload.payload.step.nextStep,
      numeroProgressivoStep: 9,
      nextStep: undefined,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaReset()));

    expect(gen.next().value).toEqual(put(userHintDisplay({
      hintToDisplay: undefined,
      dispatch: mockPayload.payload.dispatch,
      userHints: mockPayload.payload.userAppData.hints,
      userId: mockPayload.payload.userAnagraphics.id,
      product: mockPayload.payload.configuration.product,
    })));

    expect(gen.next().value).toEqual(undefined);
  });

  it('testo che funzioni come atteso se isDocente = faose ed è consegnata', () => {
    const history = {
      push: jest.fn(),
    };
    const gen = sagas.provaCompetenzaStepNext({
      ...mockPayload,
      payload: {
        ...mockPayload.payload,
        isDocente: false,
        contenutoProva: {
          ...mockPayload.contenutoProva,
          consegnata: true,
        },
        history,
        step: {
          ...mockPayload.payload.step,
          nextStep: {
            esercizi: [mockElementiN[1]],
            testi: [{
              ...mockElementiN[0],
              testoConsegna: calcolaChildrenTesto(
                mockElementiN[0].html, mockElementiN[0].inputLessicale
              ),
            }],
            numeroProgressivoStep: 9,
          },
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaStepSet({
      ...mockPayload.payload.step.nextStep,
      numeroProgressivoStep: 9,
      nextStep: undefined,
      isStepLoaded: true,
    })));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaRispostaReset()));

    expect(gen.next().value).toEqual(call(playSound, 'perso', true));

    expect(gen.next().value).toEqual(call(history.push, '/prova-competenza-response'));
  });
});


describe('provaCompetenzaAssegna', () => {
  it('testo che funzioni come atteso con esito positivo', () => {
    const gen = sagas.provaCompetenzaAssegna({
      id: 123,
      idCorso: 345,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_ASSEGNA}`, {
        prova_competenza: 123,
        corso: 345,
      }
    ));

    expect(gen.next({
      data: { data_creazione: '12/12/2018' },
    }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      assegnata: true,
      dataAssegnazione: '12/12/2018',
    })));

    expect(gen.next({
      data: { data_creazione: '12/12/2018' },
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

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso con esito negativo', () => {
    const gen = sagas.provaCompetenzaAssegna({
      id: 123,
      idCorso: 345,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_ASSEGNA}`, {
        prova_competenza: 123,
        corso: 345,
      }
    ));

    expect(gen.next().value).toEqual(put(
      modalSetData({
        contenuto: 'Questa prova per competenza non può essere assegnata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      })
    ));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });
});


describe('provaCompetenzaRitira', () => {
  it('testo che funzioni come atteso con esito positivo', () => {
    const gen = sagas.provaCompetenzaRitira({
      idAssegnazione: 123,
      idCorso: 345,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_RITIRA}`, {
        prova_competenza: 123,
        corso: 345,
      }
    ));

    expect(gen.next({
      data: { ritirata: true },
    }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      ritirata: true,
    })));

    expect(gen.next().value).toEqual(put(
      modalSetData({
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
      })
    ));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso con esito positivo se response.data.ritirata == false', () => {
    const gen = sagas.provaCompetenzaRitira({
      idAssegnazione: 123,
      idCorso: 345,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_RITIRA}`, {
        prova_competenza: 123,
        corso: 345,
      }
    ));

    expect(gen.next().value).toEqual(put(
      modalSetData({
        contenuto: 'Questa prova per competenza non può essere ritirata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      })
    ));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso con esito positivo se response.data.ritirata == false', () => {
    const gen = sagas.provaCompetenzaRitira({
      idAssegnazione: 123,
      idCorso: 345,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_RITIRA}`, {
        prova_competenza: 123,
        corso: 345,
      }
    ));

    expect(gen.next({ data: { ritirata: false } }).value).toEqual(put(
      modalSetData({
        contenuto: 'Questa prova per competenza non può essere ritirata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      })
    ));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });

  it('testo che funzioni come atteso con esito positivo se response.data.ritirata == false', () => {
    const gen = sagas.provaCompetenzaRitira({
      idAssegnazione: 123,
      idCorso: 345,
      forceEnd: false,
    });

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_RITIRA}`, {
        prova_competenza: 123,
        corso: 345,
      }
    ));

    expect(gen.next().value).toEqual(put(
      modalSetData({
        contenuto: 'Questa prova per competenza non può essere ritirata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      })
    ));

    expect(gen.next().value).toEqual(put(actions.provaCompetenzaSpinnerSet(false)));
  });
});


describe('provaCompetenzaConsegnaProva', () => {
  it('testo che funzioni come atteso con esito positivo per studente', () => {
    const gen = sagas.provaCompetenzaConsegnaProva({
      payload: {
        id: 123,
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_CONSEGNA_STUDENTE}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      consegnata: true,
      voto: 8,
    })));

    expect(gen.next().value).toEqual(undefined);
  });

  it('testo che funzioni come atteso con esito positivo per studente quando forceEnd == true', () => {
    const mockHistory = {
      push: jest.fn(),
    };

    const gen = sagas.provaCompetenzaConsegnaProva({
      payload: {
        id: 123,
        isDocente: false,
        history: mockHistory,
        forceEnd: true,
      },
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_CONSEGNA_STUDENTE}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      consegnata: true,
      voto: 8,
    })));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(call(playSound, 'vinto', true));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(
      call(mockHistory.push, '/prova-competenza-response')
    );

    expect(gen.next().value).toEqual(undefined);
  });

  it('testo che funzioni come atteso in caso di errore', () => {
    const gen = sagas.provaCompetenzaConsegnaProva({
      payload: {
        id: 123,
        isDocente: false,
      },
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_CONSEGNA_STUDENTE}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Non ho potuto leggere il voto della consegna, riprovare',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('testo che funzioni come atteso con esito positivo per docente', () => {
    const gen = sagas.provaCompetenzaConsegnaProva({
      payload: {
        id: 123,
        isDocente: true,
        risposteFornite: {},
      },
    });

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.PROVA_COMPETENZA_URL_CONSEGNA_DOCENTE}`, {
        prova_competenza: 123,
        risposte: {},
      }
    ));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(put(actions.provaCompetenzaContenutoSet({
      consegnata: true,
      voto: 8,
    })));

    expect(gen.next().value).toEqual(undefined);
  });
});


describe('watchProvaCompetenza', () => {
  it('testo che funzioni come atteso', () => {
    const gen = sagas.watchProvaCompetenza();

    expect(gen.next().value).toEqual(takeEvery(
      constants.PROVA_COMPETENZA_CONTENUTO_FETCH,
      sagas.provaCompetenzaContenutoFetch
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.PROVA_COMPETENZA_STEP_INITIALIZE,
      sagas.provaCompetenzaStepInitialize
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.PROVA_COMPETENZA_RISPOSTA_POST,
      sagas.provaCompetenzaRispostaPost
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.PROVA_COMPETENZA_STEP_NEXT,
      sagas.provaCompetenzaStepNext
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.PROVA_COMPETENZA_ASSEGNA_TRIGGER,
      sagas.provaCompetenzaAssegna
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.PROVA_COMPETENZA_RITIRA_TRIGGER,
      sagas.provaCompetenzaRitira
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.PROVA_COMPETENZA_CONSEGNA,
      sagas.provaCompetenzaConsegnaProva
    ));
  });
});

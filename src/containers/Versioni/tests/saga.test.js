/**
 * Versioni  sagas
 */

import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import checkmark from 'images/infocard-icn_checkmark.png';
import { API_BASE_PATH } from 'configuration';
import {
  mockElementiG,
  mockElementiI,
  mockElementiU,
  mockElementiO,
} from 'common/testing-mocks';
import {
  calcolaSoluzioni,
  correggiRisposta,
} from 'common/esercizi';
import { modalSetData } from 'containers/ModalBox/actions';
import { userHintDisplay } from 'containers/User/actions';
import { playSound } from 'common/suoni';
import scrivi from 'images/infocard-icn_scrivi.png';
import { calcolaTestoIntroduttivoPeriodi, versionePeriodoToSteps, calcolaPeriodiDaEseguire } from '../utils';
import * as actions from '../actions';
import * as constants from '../constants';
import * as sagas from '../saga';

const mockDataResponseStudente = {
  titolo: 'titolo',
  sottotitolo: 'sottotitolo',
  in_corso: true,
  fonte: 'fonte',
  autore: 'autore',
  testi: ['testo', 'prova'],
  periodi: [1, 2, 3],
  assegnata: false,
  consegnata: false,
  ritirata: false,
  missione: 789,
  totale_domande: 12,
  id: 456,
  isLoaded: true,
};

const mockDataResponseDocente = {
  titolo: 'titolo',
  sottotitolo: 'sottotitolo',
  prerequisito: 'prerequisito',
  in_corso: true,
  fonte: 'fonte',
  autore: 'autore',
  testi: ['testo', 'prova'],
  periodi: [1, 2, 3],
  missione: 789,
  totale_domande: 12,
  assegnazione: {
    id: 678,
    ritirata: true,
    data_assegnazione: '2018-05-01',
  },
  id: 456,
  isLoaded: true,
};

const mockPeriodiVersione = [{
  periodo: [{
    elementi: mockElementiG,
    id: 0,
  }],
  periodo_id: '1.0',
}, {
  periodo: [{
    elementi: mockElementiI,
    id: 0,
  }, {
    elementi: mockElementiU,
    id: 1,
  }, {
    elementi: mockElementiO,
    id: 2,
  }],
  periodo_id: '2.0',
}];

const mockContenutoVersioneEsecuzione = {
  titolo: 'titolo',
  sottotitolo: 'sottotitolo',
  fonte: 'fonte',
  autore: 'autore',
  testo: 'testo prova',
  periodi: mockPeriodiVersione,
  id: 123,
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

const mockVersioneRisposteFornite = {
  terminata: false,
  risposte_fornite: {
    2: {
      0: {
        id: 0,
        corretta: true,
        elementi: [61254, 61255],
        stato: 'C',
        esercizio: 79236,
        answer: [8],
        completata: true,
        utente: 468902,
        readable: 'petiverunt',
      },
      1: {
        id: 1,
        corretta: false,
        elementi: [61256, 61257],
        stato: 'S',
        esercizio: 79236,
        answer: [
          'accusativo',
          'nominativo',
          'accusativo',
          'ablativo',
          'ablativo',
          'ablativo',
        ],
        completata: true,
        utente: 468902,
        readable: 'Contra - ∗∗∗∗,<br>Romanos - accusativo,<br>Tarentini - nominativo,<br>auxilium - accusativo,<br>a - ∗∗∗∗,<br>Pyrrho - ablativo,<br>Epiri - ablativo,<br>rege - ablativo,<br>petiverunt - ∗∗∗∗',
      },
    },
  },
};

/* eslint-disable redux-saga/yield-effects */

describe('versioniPreviewFetch', () => {
  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true', () => {
    const gen = sagas.versioniPreviewFetch({
      id: 123,
      isDocente: true,
      idCorso: 567,
    });

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));
    expect(gen.next().value).toEqual(put(actions.versioniVersioneReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_FETCH_DOCENTE}567/123`
    ));
    expect(gen.next({
      data: mockDataResponseDocente,
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: 'titolo',
      sottotitolo: 'sottotitolo',
      prerequisito: 'prerequisito',
      inCorso: true,
      fonte: 'fonte',
      autore: 'autore',
      testo: 'testo prova',
      periodi: [1, 2, 3],
      missione: 789,
      consegnata: undefined,
      assegnata: true,
      ritirata: true,
      totaleDomande: 12,
      idAssegnazione: 678,
      dataAssegnazione: '2018-05-01',
      id: 456,
      isLoaded: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = true e testi == undefined', () => {
    const gen = sagas.versioniPreviewFetch({
      id: 123,
      isDocente: true,
      idCorso: 567,
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: { ...mockDataResponseDocente, testi: undefined },
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: 'titolo',
      sottotitolo: 'sottotitolo',
      prerequisito: 'prerequisito',
      inCorso: true,
      consegnata: undefined,
      fonte: 'fonte',
      autore: 'autore',
      testo: '',
      periodi: [1, 2, 3],
      assegnata: true,
      missione: 789,
      ritirata: true,
      totaleDomande: 12,
      idAssegnazione: 678,
      dataAssegnazione: '2018-05-01',
      id: 456,
      isLoaded: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false e non è prevista data di assegnazione', () => {
    const gen = sagas.versioniPreviewFetch({
      id: 123,
      isDocente: true,
      idCorso: 567,
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        ...mockDataResponseDocente,
        assegnazione: {
          ...mockDataResponseDocente.assegnazione,
          data_assegnazione: undefined,
        },
      },
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: 'titolo',
      sottotitolo: 'sottotitolo',
      prerequisito: 'prerequisito',
      inCorso: true,
      consegnata: undefined,
      fonte: 'fonte',
      autore: 'autore',
      testo: 'testo prova',
      periodi: [1, 2, 3],
      assegnata: true,
      ritirata: true,
      missione: 789,
      totaleDomande: 12,
      idAssegnazione: 678,
      dataAssegnazione: undefined,
      id: 456,
      isLoaded: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and isDocente = false', () => {
    const gen = sagas.versioniPreviewFetch({
      id: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_FETCH_STUDENTE}123`
    ));
    expect(gen.next({
      data: mockDataResponseStudente,
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: 'titolo',
      sottotitolo: 'sottotitolo',
      inCorso: true,
      consegnata: false,
      fonte: 'fonte',
      autore: 'autore',
      testo: 'testo prova',
      periodi: [1, 2, 3],
      assegnata: false,
      ritirata: false,
      totaleDomande: 12,
      missione: 789,
      idAssegnazione: 0,
      dataAssegnazione: undefined,
      id: 456,
      isLoaded: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo and in_corso è undefined', () => {
    const gen = sagas.versioniPreviewFetch({
      id: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_FETCH_STUDENTE}123`
    ));
    expect(gen.next({
      data: { ...mockDataResponseStudente, in_corso: undefined },
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: 'titolo',
      sottotitolo: 'sottotitolo',
      inCorso: false,
      consegnata: false,
      fonte: 'fonte',
      autore: 'autore',
      testo: 'testo prova',
      periodi: [1, 2, 3],
      assegnata: false,
      ritirata: false,
      totaleDomande: 12,
      missione: 789,
      idAssegnazione: 0,
      dataAssegnazione: undefined,
      id: 456,
      isLoaded: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è negativo', () => {
    const gen = sagas.versioniPreviewFetch({
      id: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_FETCH_STUDENTE}123`
    ));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackSet(
      true,
      'error',
      'Impossibile scaricare questa versione'
    )));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });
});


describe('versioneAssegnaSaga', () => {
  it('se response è assegnata = true e non è settato versioniLivelloData', () => {
    const gen = sagas.versioneAssegnaSaga({
      idVersione: 123,
      idCorso: 456,
    });

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_ASSEGNA}`, {
        versione: 123,
        corso: 456,
      }
    ));
    expect(gen.next({
      data: {
        assegnata: true,
        data_creazione: '2018-02-03',
      },
    }).value).toEqual(put(actions.versioniVersioneSet({
      assegnata: true,
      dataAssegnazione: '2018-02-03',
    })));

    expect(gen.next().value).toEqual(put(modalSetData({
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
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('se response è assegnata = true ed è settato versioniLivelloData', () => {
    const gen = sagas.versioneAssegnaSaga({
      idVersione: 200,
      idCorso: 456,
      versioniLivelloData: {
        versioniAssegnate: [{
          assegnata: true,
          id: 100,
          missione: 'missione 1',
          titolo: 'titolo versione 1',
          totale_domande: 12,
        }],
        versioniMissione: {
          'missione 1': [{
            assegnata: true,
            id: 100,
            titolo: 'titolo versione 1',
            totaleDomande: 12,
          }],
          'missione 2': [{
            assegnata: false,
            id: 200,
            titolo: 'titolo versione 2',
            totaleDomande: 22,
          }, {
            assegnata: false,
            id: 300,
            titolo: 'titolo versione 3',
            totaleDomande: 32,
          }],
        },
      },
    });

    expect(gen.next().value).toEqual(put(actions.versioniLivelloSpinnerSet({ assegna: true })));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_ASSEGNA}`, {
        versione: 200,
        corso: 456,
      }
    ));

    expect(gen.next({
      data: { assegnata: true, data_creazione: '2018-02-03' },
    }).value).toEqual(put(actions.versioniLivelloSet({
      versioniAssegnate: [{
        assegnata: true,
        id: 100,
        missione: 'missione 1',
        titolo: 'titolo versione 1',
        totale_domande: 12,
      }, {
        assegnata: true,
        assegnata_data: '2018-02-03',
        id: 200,
        ritirata: false,
        titolo: 'titolo versione 2',
        totaleDomande: 22,
      }],
      versioniMissione: {
        'missione 1': [{
          assegnata: true,
          id: 100,
          titolo: 'titolo versione 1',
          totaleDomande: 12,
        }],
        'missione 2': [{
          assegnata: true,
          id: 200,
          titolo: 'titolo versione 2',
          totaleDomande: 22,
        }, {
          assegnata: false,
          id: 300,
          titolo: 'titolo versione 3',
          totaleDomande: 32,
        }],
      },
    })));

    expect(gen.next().value).toEqual(put(modalSetData({
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

    expect(gen.next().value).toEqual(put(actions.versioniLivelloSpinnerSet({ assegna: false })));
  });

  it('testo che funzioni come atteso quando la response è response.data.assegnata = false', () => {
    const gen = sagas.versioneAssegnaSaga({
      idVersione: 123,
      idCorso: 456,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Questa versione non può essere assegnata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando la response è response.data.assegnata = false', () => {
    const gen = sagas.versioneAssegnaSaga({
      idVersione: 123,
      idCorso: 456,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: { assegnata: false } }).value).toEqual(put(modalSetData({
      contenuto: 'Questa versione non può essere assegnata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });
});

describe('versioneRitiraSaga', () => {
  it('testo che funzioni come atteso quando l\'esito è positivo e response.data.ritirata = true e non è settato versioniAssegnate', () => {
    const gen = sagas.versioneRitiraSaga({
      idVersione: 100,
      idCorso: 456,
      versioniAssegnateData: [{
        assegnata: true,
        id: 100,
        missione: 'missione 1',
        titolo: 'titolo versione 1',
        totale_domande: 12,
      }, {
        assegnata: true,
        assegnata_data: '2018-02-03',
        id: 200,
        ritirata: false,
        titolo: 'titolo versione 2',
        totaleDomande: 22,
      }],
    });

    expect(gen.next().value).toEqual(put(actions.versioniLivelloSpinnerSet({
      ritira: true,
      ritira_100: true,
    })));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_RITIRA}`, {
        versione: 100,
        corso: 456,
      }
    ));
    expect(gen.next({ data: { ritirata: true } }).value).toEqual(
      put(actions.versioniLivelloSet({
        versioniAssegnate: [{
          assegnata: true,
          ritirata: true,
          id: 100,
          missione: 'missione 1',
          titolo: 'titolo versione 1',
          totale_domande: 12,
        }, {
          assegnata: true,
          assegnata_data: '2018-02-03',
          id: 200,
          ritirata: false,
          titolo: 'titolo versione 2',
          totaleDomande: 22,
        }],
      }))
    );

    expect(gen.next().value).toEqual(put(modalSetData({
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

    expect(gen.next().value).toEqual(put(actions.versioniLivelloSpinnerSet({
      ritira: false,
      ritira_100: false,
    })));
  });

  it('l\'esito positivo e response.data.ritirata = true e settato versioniAssegnate', () => {
    const gen = sagas.versioneRitiraSaga({
      idVersione: 123,
      idCorso: 456,
    });

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_RITIRA}`, {
        versione: 123,
        corso: 456,
      }
    ));
    expect(gen.next({ data: { ritirata: true } }).value).toEqual(
      put(actions.versioniVersioneSet({
        ritirata: true,
      }))
    );

    expect(gen.next().value).toEqual(put(modalSetData({
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
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è negativo con response.data.ritirata = false', () => {
    const gen = sagas.versioneRitiraSaga({
      idVersione: 123,
      idCorso: 456,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: { ritirata: false } }).value).toEqual(put(modalSetData({
      contenuto: 'Questa versione non può essere ritirata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è negativo', () => {
    const gen = sagas.versioneRitiraSaga({
      idVersione: 123,
      idCorso: 456,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Questa versione non può essere ritirata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });
});

describe('versioneEseguiInizializza', () => {
  it('testo che funzioni come atteso quando l\'esito è positivo e isDocente == true and inCorso = false', () => {
    const mockData = {
      payload: {
        isDocente: true,
        inCorso: false,
        id: 456,
        backUrl: '/back-url',
        history: {
          push: () => { },
        },
      },
    };
    const gen = sagas.versioneEseguiInizializza(mockData);

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));
    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteReset()));
    expect(gen.next().value).toEqual(put(actions.versioniVersioneEsecuzionePeriodoCaricatoReset()));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_DOCENTE_INIZIALIZZA}456`
    ));

    const periodi = mockContenutoVersioneEsecuzione.periodi.map((singoloPeriodo) => ({
      periodo_id: singoloPeriodo.periodo_id,
      periodo: versionePeriodoToSteps(singoloPeriodo),
    }));
    expect(gen.next({
      data: mockContenutoVersioneEsecuzione,
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: mockContenutoVersioneEsecuzione.titolo,
      sottotitolo: mockContenutoVersioneEsecuzione.sottotitolo,
      fonte: mockContenutoVersioneEsecuzione.fonte,
      autore: mockContenutoVersioneEsecuzione.autore,
      periodi,
      id: mockContenutoVersioneEsecuzione.id,
      isEsecuzioneLoaded: true,
      previewPeriodi: calcolaTestoIntroduttivoPeriodi(mockPeriodiVersione),
      backUrl: '/back-url',
      isLoaded: true,
    })));

    expect(gen.next({
      data: mockContenutoVersioneEsecuzione,
    }).value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      risposteFornite: {},
      periodiDaEseguire: calcolaPeriodiDaEseguire(mockContenutoVersioneEsecuzione.periodi, {}),
    })));

    expect(gen.next().value).toEqual(call(mockData.payload.history.push, '/versione-periodi'));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che venga rispettato l\'ordine dei periodi indicato da periodo_id', () => {
    const mockData = {
      payload: {
        isDocente: true,
        inCorso: false,
        id: 456,
        history: {
          push: () => { },
        },
      },
    };

    const mockResponsePeriodiNonOrdinati = {
      ...mockContenutoVersioneEsecuzione,
      periodi: [{
        periodo: [{
          elementi: mockElementiI,
          id: 0,
        }, {
          elementi: mockElementiU,
          id: 1,
        }],
        periodo_id: '2.0',
      }, {
        periodo: [{
          elementi: mockElementiG,
          id: 0,
        }],
        periodo_id: '1.0',
      }],
    };

    const periodiVersioneOrdinati = [{
      periodo: versionePeriodoToSteps({
        periodo: [{
          elementi: mockElementiG,
          id: 0,
        }],
        periodo_id: '1.0',
      }),
      periodo_id: '1.0',
    }, {
      periodo: versionePeriodoToSteps({
        periodo: [{
          elementi: mockElementiI,
          id: 0,
        }, {
          elementi: mockElementiU,
          id: 1,
        }],
        periodo_id: '2.0',
      }),
      periodo_id: '2.0',
    }];

    const gen = sagas.versioneEseguiInizializza(mockData);
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: mockResponsePeriodiNonOrdinati,
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: mockResponsePeriodiNonOrdinati.titolo,
      sottotitolo: mockResponsePeriodiNonOrdinati.sottotitolo,
      fonte: mockResponsePeriodiNonOrdinati.fonte,
      autore: mockResponsePeriodiNonOrdinati.autore,
      periodi: periodiVersioneOrdinati,
      id: mockResponsePeriodiNonOrdinati.id,
      isEsecuzioneLoaded: true,
      previewPeriodi: calcolaTestoIntroduttivoPeriodi(mockPeriodiVersione),
      isLoaded: true,
      backUrl: '',
    })));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e isDocente == false and inCorso = true', () => {
    const mockData = {
      payload: {
        isDocente: false,
        inCorso: true,
        id: 456,
        history: {
          push: () => { },
        },
      },
    };
    const gen = sagas.versioneEseguiInizializza(mockData);

    gen.next();
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_STUDENTE_INIZIALIZZA}`, {
        assegnazione: 456,
      }
    ));

    const periodi = mockContenutoVersioneEsecuzione.periodi.map((singoloPeriodo) => ({
      periodo_id: singoloPeriodo.periodo_id,
      periodo: versionePeriodoToSteps(singoloPeriodo),
    }));
    expect(gen.next({
      data: mockContenutoVersioneEsecuzione,
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: mockContenutoVersioneEsecuzione.titolo,
      sottotitolo: mockContenutoVersioneEsecuzione.sottotitolo,
      fonte: mockContenutoVersioneEsecuzione.fonte,
      autore: mockContenutoVersioneEsecuzione.autore,
      periodi,
      id: mockContenutoVersioneEsecuzione.id,
      isEsecuzioneLoaded: true,
      previewPeriodi: calcolaTestoIntroduttivoPeriodi(mockPeriodiVersione),
      isLoaded: true,
      backUrl: '',
    })));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_STUDENTE_RIPRENDI}456`
    ));

    expect(gen.next({
      data: mockVersioneRisposteFornite,
    }).value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      risposteFornite: mockVersioneRisposteFornite,
      periodiDaEseguire: calcolaPeriodiDaEseguire(
        mockContenutoVersioneEsecuzione.periodi, mockVersioneRisposteFornite
      ),
    })));

    expect(gen.next().value).toEqual(call(mockData.payload.history.push, '/versione-periodi'));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è positivo e isDocente == false', () => {
    const mockData = {
      payload: {
        isDocente: false,
        id: 456,
        history: {
          push: () => { },
        },
      },
    };
    const gen = sagas.versioneEseguiInizializza(mockData);

    gen.next();
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_STUDENTE_INIZIALIZZA}`, {
        assegnazione: 456,
      }
    ));

    const periodi = mockContenutoVersioneEsecuzione.periodi.map((singoloPeriodo) => ({
      periodo_id: singoloPeriodo.periodo_id,
      periodo: versionePeriodoToSteps(singoloPeriodo),
    }));
    expect(gen.next({
      data: mockContenutoVersioneEsecuzione,
    }).value).toEqual(put(actions.versioniVersioneSet({
      titolo: mockContenutoVersioneEsecuzione.titolo,
      sottotitolo: mockContenutoVersioneEsecuzione.sottotitolo,
      fonte: mockContenutoVersioneEsecuzione.fonte,
      autore: mockContenutoVersioneEsecuzione.autore,
      periodi,
      id: mockContenutoVersioneEsecuzione.id,
      isEsecuzioneLoaded: true,
      previewPeriodi: calcolaTestoIntroduttivoPeriodi(mockPeriodiVersione),
      isLoaded: true,
      backUrl: '',
    })));

    expect(gen.next({
      data: mockContenutoVersioneEsecuzione,
    }).value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      risposteFornite: {},
      periodiDaEseguire: calcolaPeriodiDaEseguire(mockContenutoVersioneEsecuzione.periodi, {}),
    })));

    expect(gen.next().value).toEqual(call(mockData.payload.history.push, '/versione-periodi'));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni come atteso quando l\'esito è  negativo', () => {
    const gen = sagas.versioneEseguiInizializza({
      payload: {
        isDocente: false,
        id: 456,
      },
    });

    gen.next();
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_STUDENTE_INIZIALIZZA}`, {
        assegnazione: 456,
      }
    ));

    expect(gen.next().value).toEqual(put(actions.versioniFeedbackSet(
      true,
      'error',
      'Questa versione non può essere eseguita'
    )));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });
});

describe('versioneAvanzamentoRisposteFornitePost', () => {
  const mockPayload = {
    isDocente: true,
    helpRequest: false,
    versioneAvanzamento: {
      isPristine: true,
      risposteFornite: {},
    },
    versioneEsecuzione: {
      stepCaricatoKey: 0,
      periodoCaricatoId: '1.0',
      periodoCaricato: versionePeriodoToSteps(mockPeriodiVersione[0]),
    },
    versioneCaricata: {
      id: 456,
      periodi: mockPeriodiVersione,
    },
    risposta: {},
  };

  const correzioneRisposta = {
    isCorrect: false,
    corrette: [],
    sbagliate: [],
    soluzione: undefined,
    ...correggiRisposta(
      versionePeriodoToSteps(mockPeriodiVersione[0])[0], {
        rispostaSelezionata: {},
        rispostaNormalizzata: undefined,
        fallbackRisposta: {},
      }
    ),
  };

  const soluzioni = calcolaSoluzioni(
    mockPayload.versioneEsecuzione.periodoCaricato[0].testi,
    mockPayload.versioneEsecuzione.periodoCaricato[0].esercizi
  );

  it('funzionamento con successo per isDocente = true; helpRequest = false; isPristine = true', () => {
    const gen = sagas.versioneAvanzamentoRisposteFornitePost({
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));
    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', true));

    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: false,
      mostraCorrezione: true,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: correzioneRisposta.corrette,
        sbagliate: correzioneRisposta.sbagliate,
        soluzione: correzioneRisposta.soluzione,
      },
      isHelpEnabled: false,
      periodiDaEseguire: {
        periodiIncompletiPks: ['2.0'],
        stepDaEseguire: {
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {
        '1.0': {
          0: {
            answer: {},
            corretta: false,
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
            readable: 'Agnas - <br />gallinas - <br />agricola - <br />numerat, - <br />capras - <br />capellas - <br />congregat. - ',
          },
        },
      },
    })));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('funzionamento con successo per isDocente = true; helpRequest = false; isPristine = true and step type !== G', () => {
    const payload = {
      ...mockPayload,
      versioneEsecuzione: {
        ...mockPayload.versioneEsecuzione,
        periodoCaricatoId: '2.0',
        periodoCaricato: versionePeriodoToSteps(mockPeriodiVersione[1]),
      },
      risposta: undefined,
    };

    const gen = sagas.versioneAvanzamentoRisposteFornitePost({ payload });

    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', true));

    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: false,
      mostraCorrezione: true,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: [],
        sbagliate: [],
        soluzione: undefined,
      },
      isHelpEnabled: false,
      periodiDaEseguire: {
        periodiIncompletiPks: ['1.0', '2.0'],
        stepDaEseguire: {
          '1.0': [0],
          '2.0': [1, 2],
        },
      },
      risposteFornite: {
        '2.0': {
          0: {
            answer: [],
            corretta: false,
            elementi: [95549, 95548],
            esercizio: 97917,
            id: 95548,
            stato: 'S',
            readable: '',
          },
        },
      },
    })));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('funzionamento con successo per isDocente = true; helpRequest = true; isPristine = true', () => {
    const gen = sagas.versioneAvanzamentoRisposteFornitePost({
      payload: {
        ...mockPayload,
        helpRequest: true,
        versioneAvanzamento: {
          ...mockPayload.versioneAvanzamento,
          isPristine: true,
        },
      },
    });

    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(call(playSound, 'step_aiuto', true));

    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: true,
      mostraCorrezione: false,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: correzioneRisposta.corrette,
        sbagliate: correzioneRisposta.sbagliate,
        soluzione: soluzioni,
      },
      isHelpEnabled: true,
      periodiDaEseguire: {
        periodiIncompletiPks: ['2.0'],
        stepDaEseguire: {
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {
        '1.0': {
          0: {
            answer: {},
            corretta: false,
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
            readable: 'Saltata',
          },
        },
      },
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('funzionamento con successo per isDocente = true; helpRequest = false; isPristine = false', () => {
    const gen = sagas.versioneAvanzamentoRisposteFornitePost({
      payload: {
        ...mockPayload,
        isDocente: true,
        versioneAvanzamento: {
          ...mockPayload.versioneAvanzamento,
          isPristine: false,
        },
      },
    });

    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(call(playSound, 'step_sbagliato', true));

    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: false,
      mostraCorrezione: true,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: correzioneRisposta.corrette,
        sbagliate: correzioneRisposta.sbagliate,
        soluzione: correzioneRisposta.soluzione,
      },
      isHelpEnabled: false,
    })));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('funzionamento con successo per isDocente = false; helpRequest = false; isPristine = true', () => {
    const gen = sagas.versioneAvanzamentoRisposteFornitePost({
      payload: {
        ...mockPayload,
        isDocente: false,
        isPristine: true,
      },
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_ESECUZIONE_RISPOSTE_FORNITE_POST}`, {
        assegnazione: 456,
        tipo: 'G',
        periodo: '1.0',
        step: 0,
        help_request: false,
        risposta: {},
        readable: 'Agnas - <br />gallinas - <br />agricola - <br />numerat, - <br />capras - <br />capellas - <br />congregat. - ',
        elementi: [95523, 95524],
        esercizio: 97913,
      }
    ));

    const mockNext = {
      data: {
        '1.0': {
          0: {
            answer: {},
            corretta: true,
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
          },
        },
      },
    };

    expect(gen.next(mockNext).value).toEqual(call(playSound, 'step_corretto', true));

    expect(gen.next(mockNext).value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      isChecked: true,
      isCorrect: true,
      isPristine: false,
      mostraSoluzione: false,
      mostraCorrezione: true,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: correzioneRisposta.corrette,
        sbagliate: correzioneRisposta.sbagliate,
        soluzione: correzioneRisposta.soluzione,
      },
      isHelpEnabled: false,
      periodiDaEseguire: {
        periodiIncompletiPks: ['2.0'],
        stepDaEseguire: {
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {
        '1.0': {
          0: {
            corretta: true,
            answer: {},
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
          },
        },
      },
    })));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('funzionamento con successo per isDocente = false; helpRequest = true; isPristine = true', () => {
    const gen = sagas.versioneAvanzamentoRisposteFornitePost({
      payload: {
        ...mockPayload,
        isDocente: false,
        helpRequest: true,
        isPristine: true,
      },
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_ESECUZIONE_RISPOSTE_FORNITE_POST}`, {
        assegnazione: 456,
        tipo: 'G',
        periodo: '1.0',
        step: 0,
        help_request: true,
        risposta: {},
        readable: 'Saltata',
        elementi: [95523, 95524],
        esercizio: 97913,
      }
    ));

    const mockNext = {
      data: {
        '1.0': {
          0: {
            answer: {},
            corretta: true,
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
          },
        },
      },
    };

    expect(gen.next(mockNext).value).toEqual(call(playSound, 'step_aiuto', true));

    expect(gen.next(mockNext).value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: true,
      mostraCorrezione: false,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: correzioneRisposta.corrette,
        sbagliate: correzioneRisposta.sbagliate,
        soluzione: mockSoluzioneG,
      },
      isHelpEnabled: true,
      periodiDaEseguire: {
        periodiIncompletiPks: ['2.0'],
        stepDaEseguire: {
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {
        '1.0': {
          0: {
            corretta: true,
            answer: {},
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
          },
        },
      },
    })));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('!isDocente, isPristinee e controllo che venga usato step id e non key per leggere il responso ricevuto da server', () => {
    const versioneEsecuzione = mockPayload.versioneEsecuzione;
    versioneEsecuzione.periodoCaricato[0].id = 1;
    const gen = sagas.versioneAvanzamentoRisposteFornitePost({
      payload: {
        ...mockPayload,
        isDocente: false,
        helpRequest: true,
        isPristine: true,
        versioneEsecuzione,
      },
    });

    gen.next();
    gen.next();

    const mockNext = {
      data: {
        '1.0': {
          1: {
            answer: {},
            corretta: false,
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
          },
        },
      },
    };

    gen.next(mockNext);
    gen.next(mockNext);

    expect(gen.next(mockNext).value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      isChecked: true,
      isCorrect: false,
      isPristine: false,
      mostraSoluzione: true,
      mostraCorrezione: false,
      isInterfaceLocked: true,
      correzioneStep: {
        corrette: correzioneRisposta.corrette,
        sbagliate: correzioneRisposta.sbagliate,
        soluzione: mockSoluzioneG,
      },
      isHelpEnabled: true,
      periodiDaEseguire: {
        periodiIncompletiPks: ['1.0', '2.0'],
        stepDaEseguire: {
          '1.0': [0],
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {
        '1.0': {
          1: {
            corretta: false,
            answer: {},
            elementi: [95523, 95524],
            esercizio: 97913,
            id: 95524,
            stato: 'S',
          },
        },
      },
    })));
  });
});

describe('versioneAvanzamentoNext', () => {
  it('testo che funzioni se periodoCaricatoId != undefined', () => {
    const payload = {
      periodi: mockPeriodiVersione,
      stepCaricatoKey: 0,
      periodoCaricatoId: '1.0',
      stepEseguiti: 0,
      risposteFornite: {},
      periodoCaricato: [{
        esercizi: [{
          tipo: 'G',
        }],
      }, {
        esercizi: [{
          tipo: 'G',
        }],
      }, {
        esercizi: [{
          tipo: 'G',
        }],
      }],
      configuration: {
        product: 'lyceum',
      },
      userAppData: {
        hints: {
          stepG: true,
        },
      },
      userAnagraphics: {
        id: 444,
      },
    };
    const gen = sagas.versioneAvanzamentoNext({ payload });

    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteReset()));
    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      periodiDaEseguire: {
        periodiIncompletiPks: ['1.0', '2.0'],
        stepDaEseguire: {
          '1.0': [0],
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {},
    })));

    expect(gen.next().value).toEqual(put(actions.versioniVersioneEsecuzionePeriodoCaricatoSet({
      stepCaricatoKey: 1,
      stepEseguiti: 1,
    })));

    expect(gen.next().value).toEqual(put(userHintDisplay({
      hintToDisplay: {
        contenuto: 'Clicca sulla parola<br>e associala all\'etichetta corretta',
        nome: 'stepG',
        image: {
          src: scrivi,
          width: '180px',
          height: '130px',
          alt: 'Associa',
        },
      },
      dispatch: payload.dispatch,
      userHints: payload.userAppData.hints,
      userId: payload.userAnagraphics.id,
      product: payload.configuration.product,
    })));
  });

  it('testo che funzioni se periodoCaricato.length == 0', () => {
    const payload = {
      periodi: mockPeriodiVersione,
      stepCaricatoKey: 0,
      periodoCaricatoId: '1.0',
      stepEseguiti: 0,
      risposteFornite: {},
      periodoCaricato: [],
      history: {
        push: () => { },
      },
      configuration: {
        product: 'lyceum',
      },
      userAppData: {
        hints: {
          stepG: true,
        },
      },
      userAnagraphics: {
        id: 444,
      },
    };
    const gen = sagas.versioneAvanzamentoNext({
      payload,
    });

    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteReset()));
    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      periodiDaEseguire: {
        periodiIncompletiPks: ['1.0', '2.0'],
        stepDaEseguire: {
          '1.0': [0],
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {},
    })));

    expect(gen.next().value).toEqual(put(actions.versioniVersioneEsecuzionePeriodoCaricatoReset()));
    expect(gen.next().value).toEqual(call(payload.history.push, '/versione-periodi'));
  });

  it('testo che funzioni se periodoCaricatoId = undefined', () => {
    const payload = {
      periodi: mockPeriodiVersione,
      stepCaricatoKey: 0,
      periodoCaricatoId: '',
      stepEseguiti: 0,
      risposteFornite: {},
      periodoCaricato: [1, 2, 3],
      history: {
        push: () => { },
      },
      configuration: {
        product: 'lyceum',
      },
      userAppData: {
        hints: {
          stepG: true,
        },
      },
      userAnagraphics: {
        id: 444,
      },
    };
    const gen = sagas.versioneAvanzamentoNext({ payload });

    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteReset()));
    expect(gen.next().value).toEqual(put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
      periodiDaEseguire: {
        periodiIncompletiPks: ['1.0', '2.0'],
        stepDaEseguire: {
          '1.0': [0],
          '2.0': [0, 1, 2],
        },
      },
      risposteFornite: {},
    })));

    expect(gen.next().value).toEqual(undefined);
  });
});

describe('versioneEsecuzioneConsegna', () => {
  it('testo che funzioni se isDocente == true', () => {
    const mockData = {
      payload: {
        isDocente: true,
        risposteFornite: {},
        id: 123,
        history: {
          push: () => { },
        },
      },
    };
    const gen = sagas.versioneEsecuzioneConsegna(mockData);

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_CONSEGNA_DOCENTE}`, {
        versione: 123,
        risposte: {},
      }
    ));

    expect(gen.next({ data: { voto: 5 } }).value).toEqual(put(actions.versioniVersioneSet({
      isConsegnata: true,
    })));

    expect(gen.next({ data: { voto: 5 } }).value).toEqual(
      put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
        votoFinale: 5,
      }))
    );

    expect(gen.next().value).toEqual(call(playSound, 'perso', true));

    expect(gen.next().value).toEqual(call(mockData.payload.history.push, '/versione-response'));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni se isDocente == false', () => {
    const mockData = {
      payload: {
        isDocente: false,
        risposteFornite: {},
        id: 123,
        history: {
          push: () => { },
        },
      },
    };
    const gen = sagas.versioneEsecuzioneConsegna(mockData);

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_CONSEGNA_STUDENTE}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(put(actions.versioniVersioneSet({
      isConsegnata: true,
    })));

    expect(gen.next({ data: { voto: 8 } }).value).toEqual(
      put(actions.versioniVersioneAvanzamentoRisposteUtenteSet({
        votoFinale: 8,
      }))
    );

    expect(gen.next().value).toEqual(call(playSound, 'vinto', true));

    expect(gen.next().value).toEqual(call(mockData.payload.history.push, '/versione-response'));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('testo che funzioni in caso di fail', () => {
    const gen = sagas.versioneEsecuzioneConsegna({
      payload: {
        isDocente: false,
        risposteFornite: {},
        id: 123,
      },
    });

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.VERSIONI_URL_VERSIONE_CONSEGNA_STUDENTE}`, {
        assegnazione: 123,
      }
    ));

    expect(gen.next().value).toEqual(put(actions.versioniVersioneSet({
      isConsegnata: true,
    })));

    expect(gen.next().value).toEqual(put(actions.versioniFeedbackSet(
      true,
      'error',
      'Non ho potuto consegnare questa versione',
    )));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });
});

describe('versioneEsecuzioneSvuota', () => {
  const payload = {
    periodi: [],
    risposteFornite: {},
    history: {
      push: () => { },
    },
  };

  it('testo che funzioni come atteso', () => {
    const gen = sagas.versioneEsecuzioneSvuota({
      payload,
    });

    expect(gen.next().value).toEqual(put(
      actions.versioniVersioneAvanzamentoRisposteUtenteReset()
    ));

    expect(gen.next().value).toEqual(put(
      actions.versioniVersioneAvanzamentoRisposteUtenteSet({
        risposteFornite: {},
        periodiDaEseguire: {
          periodiIncompletiPks: [],
          stepDaEseguire: {},
        },
      })
    ));

    expect(gen.next().value).toEqual(put(
      actions.versioniVersioneEsecuzionePeriodoCaricatoReset()
    ));

    expect(gen.next().value).toEqual(call(payload.history.push, '/versione-periodi'));
  });
});


describe('versioniLivelloFetchSaga', () => {
  const mockResponseDataDocente = {
    versioni: [{
      missione: 'missione 1',
      titolo: 'titolo versione 1',
      id: 100,
      assegnata: true,
      totale_domande: 12,
    }, {
      missione: 'missione 2',
      missione_ordine: 2,
      titolo: 'titolo versione 2',
      id: 200,
      assegnata: false,
      totale_domande: 22,
    }, {
      missione: 'missione 2',
      missione_ordine: 2,
      titolo: 'titolo versione 3',
      id: 300,
      assegnata: false,
      totale_domande: 32,
    }],
    livello_label: 'label livello',
  };

  const mockResponseDataStudente = {
    livello_label: 'label livello1',
    versioni: [{
      titolo: 'titolo versione 1',
      id: 100,
      totale_domande: 12,
      consegnata: false,
      in_corso: false,
      ritirata: false,
    }, {
      titolo: 'titolo versione 2',
      id: 200,
      totale_domande: 22,
      consegnata: false,
      in_corso: true,
      ritirata: true,
    }, {
      titolo: 'titolo versione 3',
      id: 300,
      totale_domande: 32,
      consegnata: true,
      in_corso: false,
      ritirata: false,
    }, {
      titolo: 'titolo versione 4',
      id: 400,
      totale_domande: 42,
      consegnata: true,
      in_corso: false,
      ritirata: true,
    }, {
      titolo: 'titolo versione 5',
      id: 500,
      totale_domande: 52,
      consegnata: false,
      in_corso: true,
      ritirata: false,
    }, {
      titolo: 'titolo versione 6',
      id: 600,
      totale_domande: 62,
      consegnata: false,
      in_corso: false,
      ritirata: false,
    }],
  };


  it('successo per isDocente == true', () => {
    const mockData = {
      livelloId: 3,
      isDocente: true,
      corsoId: 4,
      idSelezionato: 200,
    };
    const gen = sagas.versioniLivelloFetchSaga(mockData);

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniLivelloReset()));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_LIVELLO_DOCENTE_FETCH}3/4`
    ));

    expect(gen.next({ data: mockResponseDataDocente }).value).toEqual(put(
      actions.versioniLivelloSet({
        titolo: 'label livello',
        isLoaded: true,
        missioni: [{
          id: 'missione 1',
          ordine: 0,
          titolo: 'missione 1',
        }, {
          id: 'missione 2',
          ordine: 2,
          titolo: 'missione 2',
        }],
        versioneSelezionata: {
          assegnata: false,
          id: 200,
          missione: 'missione 2',
          missione_ordine: 2,
          titolo: 'titolo versione 2',
          totale_domande: 22,
        },
        versioniAssegnate: [{
          assegnata: true,
          id: 100,
          missione: 'missione 1',
          titolo: 'titolo versione 1',
          totale_domande: 12,
        }],
        versioniMissione: {
          'missione 1': [{
            assegnata: true,
            id: 100,
            titolo: 'titolo versione 1',
            totaleDomande: 12,
          }],
          'missione 2': [{
            assegnata: false,
            id: 200,
            titolo: 'titolo versione 2',
            totaleDomande: 22,
          }, {
            assegnata: false,
            id: 300,
            titolo: 'titolo versione 3',
            totaleDomande: 32,
          }],
        },
      })
    ));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('successo per isDocente == false', () => {
    const mockData = {
      livelloId: 3,
      isDocente: false,
    };
    const gen = sagas.versioniLivelloFetchSaga(mockData);

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniLivelloReset()));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_LIVELLO_STUDENTE_FETCH}3`
    ));

    expect(gen.next({ data: mockResponseDataStudente }).value).toEqual(put(
      actions.versioniLivelloSet({
        titolo: 'label livello1',
        isLoaded: true,
        versioniAssegnate: [
          {
            consegnata: true,
            id: 400,
            in_corso: false,
            ritirata: true,
            titolo: 'titolo versione 4',
            totale_domande: 42,
          }, {
            consegnata: true,
            id: 300,
            in_corso: false,
            ritirata: false,
            titolo: 'titolo versione 3',
            totale_domande: 32,
          }, {
            consegnata: false,
            id: 200,
            in_corso: true,
            ritirata: true,
            titolo: 'titolo versione 2',
            totale_domande: 22,
          }, {
            consegnata: false,
            id: 500,
            in_corso: true,
            ritirata: false,
            titolo: 'titolo versione 5',
            totale_domande: 52,
          }, {
            consegnata: false,
            id: 100,
            in_corso: false,
            ritirata: false,
            titolo: 'titolo versione 1',
            totale_domande: 12,
          }, {
            consegnata: false,
            id: 600,
            in_corso: false,
            ritirata: false,
            titolo: 'titolo versione 6',
            totale_domande: 62,
          },
        ],
      })
    ));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('successo per isDocente == false ma non ho versioni', () => {
    const mockData = {
      livelloId: 3,
      isDocente: false,
    };
    const gen = sagas.versioniLivelloFetchSaga(mockData);

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniLivelloReset()));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_LIVELLO_STUDENTE_FETCH}3`
    ));

    expect(gen.next({ data: { ...mockResponseDataStudente, versioni: [] } }).value).toEqual(put(
      actions.versioniLivelloSet({
        titolo: 'label livello1',
        isLoaded: true,
        versioniAssegnate: [],
      })
    ));

    expect(gen.next({ data: { ...mockResponseDataStudente, versioni: [] } }).value).toEqual(put(
      actions.versioniFeedbackSet(
        true,
        'error',
        'Non sono state assegnate versioni per questo livello',
      )
    ));
    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });

  it('errore', () => {
    const mockData = {
      livelloId: 3,
      isDocente: false,
    };
    const gen = sagas.versioniLivelloFetchSaga(mockData);

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(actions.versioniLivelloReset()));
    expect(gen.next().value).toEqual(put(actions.versioniFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${constants.VERSIONI_URL_LIVELLO_STUDENTE_FETCH}3`
    ));

    expect(gen.throw('error').value).toEqual(put(
      actions.versioniFeedbackSet(
        true,
        'error',
        'Impossibile scaricare le verifiche di questo livello',
      )
    ));

    expect(gen.next().value).toEqual(put(actions.versioniSpinnerSet(false)));
  });
});


describe('watchVersioni', () => {
  it('testo che funzioni come atteso', () => {
    const gen = sagas.watchVersioni();

    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_LIVELLO_FETCH,
      sagas.versioniLivelloFetchSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_FETCH_TRIGGER,
      sagas.versioniPreviewFetch
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_ASSEGNA,
      sagas.versioneAssegnaSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_RITIRA,
      sagas.versioneRitiraSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_ESECUZIONE_INIZIALIZZA,
      sagas.versioneEseguiInizializza
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_POST,
      sagas.versioneAvanzamentoRisposteFornitePost
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_AVANZAMENTO_NEXT_TRIGGER,
      sagas.versioneAvanzamentoNext
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_ESECUZIONE_CONSEGNA,
      sagas.versioneEsecuzioneConsegna
    ));
    expect(gen.next().value).toEqual(takeEvery(
      constants.VERSIONI_VERSIONE_ESECUZIONE_SVUOTA_TRIGGER,
      sagas.versioneEsecuzioneSvuota
    ));
  });
});

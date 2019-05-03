import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';
import { configurationSet } from 'common/applications/actions';
import { defaultMytestUnita } from 'containers/CreaVerifiche/reducer';
import { creaverificheVerificaEserciziSet } from 'containers/CreaVerifiche/actions';
import { CONFIGURATION_CHANGE } from 'common/applications/constants';

import {
  livelliSet,
  spinnerSet,
  livelliFetch,
  livelliFetchError,
  livelliIsLoadingSet,
} from '../actions';
import {
  DASHBOARD_LIVELLI_URL_ENDPOINT,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ACADEMY,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ALATIN,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ARGONAUTA,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ITACA,
  DASHBOARD_LIVELLI_URL_ENDPOINT_PARALLEL,
  DASHBOARD_LIVELLI_FETCH,
} from '../constants';
import { loadLivelli, updateConfiguration, watchDashboard, montaAlberoDashboard } from '../sagas';

const mockUnitaPerMissione = [{
  id: 10,
  tipo: 'unita',
  lessico: true,
  sbloccata: true,
  titolo: 'Unita 1',
  ordine: 14,
  assegnata: false,
  lezioni: 7,
  esecuzioni: 1,
  missione: 43,
  locked: false,
}, {
  id: 11,
  tipo: 'unita',
  lessico: true,
  sbloccata: true,
  titolo: 'Unita 2',
  ordine: 16,
  assegnata: true,
  lezioni: 5,
  esecuzioni: 0,
  missione: 43,
  locked: false,
}];

const mockVersioniPerMissione = [{
  id: 10,
  tipo: 'VersioneAcademy',
  assegnabile: false,
  missione: 43,
  titolo: 'Non assegnabile',
  assegnazione: {
    id: 1666,
    ritirata: false,
  },
  completata: false,
  in_corso: false,
  ordine: 2,
}, {
  id: 18,
  tipo: 'VersioneAcademy',
  assegnabile: true,
  missione: 43,
  fonte: 'fonte',
  autore: 'autore',
  titolo: 'Gli antichi abitanti del Lazio due',
  ordine: 6,
  assegnazione: {
    id: 1234,
    ritirata: false,
  },
  completata: false,
  in_corso: false,
}];

const mockProveCompetenzaPerMissione = [{
  id: 17,
  tipo: 'ProvaCompetenzaAcademy',
  assegnabile: true,
  missione: 43,
  ordine: 3,
  fonte: 'fonte',
  autore: 'autore',
  difficolta: 'difficolta',
  titolo: 'Prova competenza #17',
  assegnazione: {
    id: 0,
    ritirata: false,
  },
  completata: false,
  in_corso: false,
}, {
  id: 16,
  tipo: 'ProvaCompetenzaAcademy',
  assegnabile: true,
  missione: 43,
  titolo: 'Prova competenza #16',
  assegnazione: {
    id: 444,
    ritirata: false,
  },
  completata: false,
  in_corso: false,
}, {
  id: 19,
  tipo: 'ProvaCompetenzaAcademy',
  assegnabile: false,
  missione: 44,
  titolo: 'Non assegnabile',
  assegnazione: {
    id: 111,
    ritirata: false,
  },
  completata: false,
  in_corso: false,
}];

const mockLivelli = [{
  id: 14,
  titolo: 'Livello 1',
  missioni: [{
    con_testo: true,
    id: 43,
    titolo: 'Missione 1',
  }],
}, {
  id: 1,
  titolo: 'Livello 2',
  missioni: [{
    con_testo: false,
    id: 44,
    titolo: 'Missione 2',
  }, {
    con_testo: true,
    id: 45,
    titolo: 'Missione 3',
  }],
},
{
  id: 12,
  titolo: 'Livello 14',
  missioni: [{
    id: 81,
    con_testo: false,
    titolo: 'Missione 39',
  }, {
    id: 82,
    con_testo: false,
    titolo: 'Missione 40',
  }],
}];

const mockVerifichePerLivello = [{
  livello: 14,
  assegnate: 1,
  da_ritirare: 2,
  da_consegnare: 3,
}, {
  livello: 12,
  assegnate: 2,
  da_ritirare: 0,
  da_consegnare: 2,
}, {
  livello: 17,
  assegnate: 3,
  da_ritirare: 3,
  da_consegnare: 1,
}];

const mockVersioniPerLivello = [{
  livello: 14,
  assegnate: 4,
  da_ritirare: 2,
  da_consegnare: 1,
}, {
  livello: 12,
  assegnate: 1,
  da_ritirare: 1,
  da_consegnare: 2,
}, {
  livello: 17,
  assegnate: 2,
  da_ritirare: 3,
  da_consegnare: 1,
}];

const configuration = {
  disciplinaId: 123,
  product: 'nomeprodotto',
  hasPremium: false,
  titoloApplicazione: 'Titolo prodotto',
};


/* eslint-disable redux-saga/yield-effects */
describe('montaAlberoDashboard', () => {
  it('versioniPerLivello lyceum', () => {
    expect(montaAlberoDashboard({
      versioni: mockVersioniPerLivello,
      verifiche: mockVerifichePerLivello,
      livelli: [{
        id: 14,
        titolo: 'Livello 1',
        missioni: [{
          con_testo: true,
          id: 43,
          titolo: 'Missione 1',
        }],
      }, {
        id: 12,
        titolo: 'Livello 2',
        missioni: [{
          con_testo: false,
          id: 44,
          titolo: 'Missione 2',
        }],
      }],
    }, 'lyceum')).toEqual([
      {
        id: 14,
        missioni: [{
          contenuti: [],
          displayTitolo: true,
          hasTesto: true,
          id: 43,
          titolo: 'Missione 1',
        }],
        titolo: 'Livello 1',
      }, {
        id: 12,
        missioni: [{
          contenuti: [],
          displayTitolo: true,
          hasTesto: false,
          id: 44,
          titolo: 'Missione 2',
        }],
        titolo: 'Livello 2',
      }]);
  });

  it('versioniPerLivello parallel', () => {
    expect(montaAlberoDashboard({
      prove_competenza: mockProveCompetenzaPerMissione,
      livelli: [{
        id: 14,
        titolo: 'Livello 1',
        missioni: [{
          con_testo: true,
          id: 43,
          titolo: 'Missione 1',
        }],
      }, {
        id: 12,
        titolo: 'Livello 2',
        missioni: [{
          con_testo: false,
          id: 44,
          titolo: 'Missione 2',
        }],
      }],
    }, 'parallel')).toEqual([
      {
        id: 14,
        missioni: [{
          contenuti: [{
            assegnazione: {
              id: 0,
              ritirata: false,
            },
            inCorso: false,
            completata: false,
            id: 17,
            ordine: 3,
            tipo: 'provaparallel',
            titolo: 'Prova competenza #17 (autore, fonte) - parallel',
          }, {
            assegnazione: {
              id: 444,
              ritirata: false,
            },
            inCorso: false,
            completata: false,
            id: 16,
            ordine: undefined,
            tipo: 'provaparallel',
            titolo: 'Prova competenza #16 - parallel',
          }],
          displayTitolo: false,
          hasTesto: true,
          id: 43,
          titolo: 'Missione 1',
        }],
        titolo: 'Livello 1',
      }, {
        id: 12,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: false,
          id: 44,
          titolo: 'Missione 2',
        }],
        titolo: 'Livello 2',
      }]);
  });

  it('versioniPerLivello parallel se non ho prove', () => {
    expect(montaAlberoDashboard({
      livelli: [{
        id: 14,
        titolo: 'Livello 1',
        missioni: [{
          con_testo: true,
          id: 43,
          titolo: 'Missione 1',
        }],
      }, {
        id: 12,
        titolo: 'Livello 2',
        missioni: [{
          con_testo: false,
          id: 44,
          titolo: 'Missione 2',
        }],
      }],
    }, 'parallel')).toEqual([
      {
        id: 14,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: true,
          id: 43,
          titolo: 'Missione 1',
        }],
        titolo: 'Livello 1',
      }, {
        id: 12,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: false,
          id: 44,
          titolo: 'Missione 2',
        }],
        titolo: 'Livello 2',
      }]);
  });

  it('versioniPerLivello alatin', () => {
    expect(montaAlberoDashboard({
      versioni: mockVersioniPerLivello,
      verifiche: mockVerifichePerLivello,
      livelli: [{
        id: 14,
        titolo: 'Livello 1',
        missioni: [{
          con_testo: true,
          id: 43,
          titolo: 'Missione 1',
        }],
      }, {
        id: 12,
        titolo: 'Livello 2',
        missioni: [{
          con_testo: false,
          id: 44,
          titolo: 'Missione 2',
        }],
      }],
    }, 'alatin')).toEqual([
      {
        id: 14,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: true,
          id: 43,
          titolo: 'Missione 1',
        }],
        titolo: 'Livello 1',
        verifiche: {
          assegnate: 1,
          daConsegnare: 3,
          daRitirare: 2,
        },
        versioni: {
          assegnate: 4,
          daConsegnare: 1,
          daRitirare: 2,
        },
      }, {
        id: 12,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: false,
          id: 44,
          titolo: 'Missione 2',
        }],
        titolo: 'Livello 2',
        verifiche: {
          assegnate: 2,
          daConsegnare: 2,
          daRitirare: 0,
        },
        versioni: {
          assegnate: 1,
          daConsegnare: 2,
          daRitirare: 1,
        },
      }]);
  });

  it('versioniPerLivello itaca', () => {
    expect(montaAlberoDashboard({
      verifiche: mockVerifichePerLivello,
      livelli: [{
        id: 14,
        titolo: 'Livello 1',
        missioni: [{
          con_testo: true,
          id: 43,
          titolo: 'Missione 1',
        }],
      }, {
        id: 12,
        titolo: 'Livello 2',
        missioni: [{
          con_testo: false,
          id: 44,
          titolo: 'Missione 2',
        }],
      }],
    }, 'itaca')).toEqual([
      {
        id: 14,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: true,
          id: 43,
          titolo: 'Missione 1',
        }],
        titolo: 'Livello 1',
        verifiche: {
          assegnate: 1,
          daConsegnare: 3,
          daRitirare: 2,
        },
      }, {
        id: 12,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: false,
          id: 44,
          titolo: 'Missione 2',
        }],
        titolo: 'Livello 2',
        verifiche: {
          assegnate: 2,
          daConsegnare: 2,
          daRitirare: 0,
        },
      }]);
  });

  it('versioniPerLivello itaca con verifiche undefined', () => {
    expect(montaAlberoDashboard({
      verifiche: undefined,
      livelli: [{
        id: 14,
        titolo: 'Livello 1',
        missioni: [{
          con_testo: true,
          id: 43,
          titolo: 'Missione 1',
        }],
      }, {
        id: 12,
        titolo: 'Livello 2',
        missioni: [{
          con_testo: false,
          id: 44,
          titolo: 'Missione 2',
        }],
      }],
    }, 'itaca')).toEqual([
      {
        id: 14,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: true,
          id: 43,
          titolo: 'Missione 1',
        }],
        titolo: 'Livello 1',
        verifiche: undefined,
      }, {
        id: 12,
        missioni: [{
          contenuti: [],
          displayTitolo: false,
          hasTesto: false,
          id: 44,
          titolo: 'Missione 2',
        }],
        titolo: 'Livello 2',
        verifiche: undefined,
      }]);
  });
});


describe('loadLivelli saga', () => {
  const livelliMock = [{
    id: 1,
    titolo: 'Livello 1',
    missioni: [{
      titolo: 'Missione 1',
      id: 10,
      unita: [{
        id: 1001,
        locked: false,
        nome: 'Unita 1',
      }, {
        id: 1002,
        locked: false,
        nome: 'Unita 2 - filtrami',
      }],
    }],
  }];


  it('loadLivelli saga on success for prodotto is not academy', () => {
    const gen = loadLivelli({ configuration });
    expect(gen.next().value).toEqual(put(spinnerSet(true)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(true)));

    expect(gen.next({ configuration }).value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT}`,
      { params: { disciplina: 123 } }
    ));

    expect(gen.next({ data: livelliMock }).value).toEqual(
      put(livelliSet(livelliMock))
    );

    expect(gen.next().value).toEqual(put(spinnerSet(false)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(false)));
  });

  it('loadLivelli saga performs set spinner action on success when product is parallel and docente = false', () => {
    const mockDashboardLyceum = {
      livelli: [mockLivelli[0]],
      versioni: mockVersioniPerMissione,
      prove_competenza: mockProveCompetenzaPerMissione,
    };

    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 33,
        product: 'parallel',
      },
      corsoId: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT_PARALLEL}`, {
        params: {
          disciplina: 33,
          corso: undefined,
        },
      }
    ));

    expect(gen.next({ data: mockDashboardLyceum }).value).toEqual(
      put(livelliSet([{
        ...mockLivelli[0],
        missioni: [{
          ...mockLivelli[0].missioni[0],
          con_testo: undefined, // annulla valore contenuto nel mock
          contenuti: [{
            assegnazione: {
              id: 0,
              ritirata: false,
            },
            inCorso: false,
            completata: false,
            id: 17,
            ordine: 3,
            tipo: 'provaparallel',
            titolo: 'Prova competenza #17 (autore, fonte) - parallel',
          }, {
            assegnazione: {
              id: 444,
              ritirata: false,
            },
            inCorso: false,
            completata: false,
            id: 16,
            ordine: undefined,
            tipo: 'provaparallel',
            titolo: 'Prova competenza #16 - parallel',
          }],
          displayTitolo: false,
          hasTesto: true,
          verifiche: undefined,
          versioni: undefined,
        }],
        titolo: 'Livello 1',
      }]))
    );

    gen.next();
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(false)));
  });

  it('loadLivelli saga performs set spinner action on success when product is lyceum and docente = false', () => {
    const mockDashboardLyceum = {
      livelli: [mockLivelli[0]],
      versioni: mockVersioniPerMissione,
      prove_competenza: mockProveCompetenzaPerMissione,
    };

    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 33,
        product: 'lyceum',
      },
      corsoId: 123,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(put(spinnerSet(true)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT_ACADEMY}`, {
        params: {
          disciplina: 33,
          corso: undefined,
        },
      }
    ));

    expect(gen.next({ data: mockDashboardLyceum }).value).toEqual(
      put(livelliSet([{
        ...mockLivelli[0],
        missioni: [{
          ...mockLivelli[0].missioni[0],
          con_testo: undefined, // annulla valore contenuto nel mock
          contenuti: [{
            assegnazione: {
              id: 0,
              ritirata: false,
            },
            inCorso: false,
            completata: false,
            id: 17,
            ordine: 3,
            tipo: 'provacompetenzaacademy',
            titolo: 'Prova competenza #17 (autore, fonte) - comprensione difficolta',
          }, {
            assegnazione: {
              id: 1234,
              ritirata: false,
            },
            inCorso: false,
            completata: false,
            id: 18,
            ordine: 6,
            tipo: 'versioneacademy',
            titolo: 'Gli antichi abitanti del Lazio due (autore, fonte) - versione',
          }, {
            assegnazione: {
              id: 444,
              ritirata: false,
            },
            inCorso: false,
            completata: false,
            id: 16,
            ordine: undefined,
            tipo: 'provacompetenzaacademy',
            titolo: 'Prova competenza #16 - comprensione',
          }],
          displayTitolo: true,
          hasTesto: true,
          verifiche: undefined,
          versioni: undefined,
        }],
        titolo: 'Livello 1',
      }]))
    );

    expect(gen.next().value).toEqual(put(spinnerSet(false)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(false)));
  });

  it('loadLivelli saga performs set spinner action on success when product is lyceum and prove_competenza = undefined and versioni == undefined', () => {
    const mockDashboardLyceum = {
      livelli: [mockLivelli[0], mockLivelli[1]],
      versioni: undefined,
      prove_competenza: undefined,
    };

    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 33,
        product: 'lyceum',
      },
      corsoId: 123,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: mockDashboardLyceum }).value).toEqual(
      put(livelliSet([{
        ...mockLivelli[0],
        missioni: [{
          ...mockLivelli[0].missioni[0],
          con_testo: undefined, // annulla valore contenuto nel mock
          contenuti: [],
          displayTitolo: true,
          hasTesto: true,
          verifiche: undefined,
          versioni: undefined,
        }],
        titolo: 'Livello 1',
      }, {
        ...mockLivelli[1],
        missioni: [{
          ...mockLivelli[1].missioni[0],
          con_testo: undefined, // annulla valore contenuto nel mock
          contenuti: [],
          displayTitolo: true,
          hasTesto: false,
          verifiche: undefined,
          versioni: undefined,
        }, {
          ...mockLivelli[1].missioni[1],
          con_testo: undefined, // annulla valore contenuto nel mock
          contenuti: [],
          displayTitolo: true,
          hasTesto: true,
          verifiche: undefined,
          versioni: undefined,
        }],
        titolo: 'Livello 2',
      }]))
    );
  });

  it('loadLivelli saga performs set spinner action on success when product is alatin and docente = false', () => {
    const mockDashboardAlatin = {
      livelli: [mockLivelli[0]],
      unita: mockUnitaPerMissione,
      verifiche: mockVerifichePerLivello,
      versioni: mockVersioniPerLivello,
    };

    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 21,
        product: 'alatin',
      },
      corsoId: 123,
      isDocente: false,
    });

    expect(gen.next().value).toEqual(put(spinnerSet(true)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT_ALATIN}`, {
        params: {
          disciplina: 21,
          corso: undefined,
        },
      }
    ));

    expect(gen.next({ data: mockDashboardAlatin }).value).toEqual(
      put(livelliSet([{
        ...mockLivelli[0],
        missioni: [{
          ...mockLivelli[0].missioni[0],
          con_testo: undefined, // annulla valore contenuto nel mock
          contenuti: [{
            assegnazione: undefined,
            lessico: true,
            lezioniEseguite: 1,
            lezioniTotali: 7,
            ordine: 14,
            sbloccata: true,
            id: 10,
            tipo: 'unita',
            titolo: 'Unita 1',
            locked: false,
          }, {
            assegnazione: {
              id: 11,
            },
            lessico: true,
            lezioniEseguite: 0,
            lezioniTotali: 5,
            ordine: 16,
            sbloccata: true,
            id: 11,
            tipo: 'unita',
            titolo: 'Unita 2',
            locked: false,
          }],
          displayTitolo: false,
          hasTesto: true,
        }],
        titolo: 'Livello 1',
        verifiche: {
          assegnate: 1,
          daConsegnare: 3,
          daRitirare: 2,
        },
        versioni: {
          assegnate: 4,
          daConsegnare: 1,
          daRitirare: 2,
        },
      }]))
    );

    expect(gen.next().value).toEqual(put(spinnerSet(false)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(false)));
  });

  it('loadLivelli saga performs set spinner action on success when product is argonauta and docente = false', () => {
    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 25,
        product: 'argonauta',
      },
      corsoId: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT_ARGONAUTA}`, {
        params: {
          disciplina: 25,
          corso: undefined,
        },
      }
    ));
  });

  it('loadLivelli saga performs set spinner action on success when product is itaca and docente = false', () => {
    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 24,
        product: 'itaca',
      },
      corsoId: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT_ITACA}`, {
        params: {
          disciplina: 24,
          corso: undefined,
        },
      }
    ));
  });

  it('loadLivelli saga performs set spinner action on success when product is alatin verifiche / versioni / unita are undefined', () => {
    const mockDashboardAlatin = {
      livelli: [mockLivelli[0]],
      unita: undefined,
      verifiche: undefined,
      versioni: undefined,
    };

    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 21,
        product: 'alatin',
      },
      corsoId: 123,
      isDocente: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: mockDashboardAlatin }).value).toEqual(
      put(livelliSet([{
        ...mockLivelli[0],
        missioni: [{
          ...mockLivelli[0].missioni[0],
          con_testo: undefined, // annulla valore contenuto nel mock
          contenuti: [],
          displayTitolo: false,
          hasTesto: true,
        }],
        titolo: 'Livello 1',
        verifiche: undefined,
        versioni: undefined,
      }]))
    );
  });

  it('loadLivelli saga performs set spinner action on success when product is lyceum and docente = true', () => {
    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 33,
        product: 'lyceum',
      },
      corsoId: 123,
      isDocente: true,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT_ACADEMY}`, {
        params: {
          disciplina: 33,
          corso: 123,
        },
      }
    ));
  });

  it('loadLivelli saga performs set spinner action on success when product is alatin and docente = true', () => {
    const gen = loadLivelli({
      configuration: {
        ...configuration,
        disciplinaId: 21,
        product: 'alatin',
      },
      corsoId: 123,
      isDocente: true,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT_ALATIN}`, {
        params: {
          disciplina: 21,
          corso: 123,
        },
      }
    ));
  });

  it('loadLivelli saga performs call axios.get action on error', () => {
    const gen = loadLivelli({ configuration });
    expect(gen.next().value).toEqual(put(spinnerSet(true)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(true)));

    expect(gen.next({ configuration }).value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${DASHBOARD_LIVELLI_URL_ENDPOINT}`,
      { params: { disciplina: 123 } }
    ));

    expect(gen.next().value).toEqual(
      put(livelliFetchError(
        'Errore caricamento'
      ))
    );

    expect(gen.next().value).toEqual(put(spinnerSet(true)));
    expect(gen.next().value).toEqual(put(livelliIsLoadingSet(false)));
  });
});


describe('updateConfiguration saga', () => {
  const mockConfiguration = {
    payload: {
      key: '1',
      name: 'Nome 1',
      disciplinaId: 12,
    },
    oldConfiguration: {
      key_due: 1,
      key2: 'ciao',
      disciplinaId: 4,
    },
  };

  it('updateConfiguration saga puts creaverificheVerificaEserciziSet action to reset data', () => {
    const gen = updateConfiguration(mockConfiguration);
    expect(gen.next(mockConfiguration).value).toEqual(
      put(creaverificheVerificaEserciziSet(defaultMytestUnita))
    );

    expect(gen.next(mockConfiguration).value).toEqual(
      put(configurationSet(mockConfiguration.payload))
    );

    expect(gen.next(mockConfiguration).value).toEqual(
      put(livelliFetch({
        key_due: 1,
        key2: 'ciao',
        key: '1',
        name: 'Nome 1',
        disciplinaId: 12,
      }))
    );
  });
});

describe('watchDashboard saga', () => {
  it('check default export', () => {
    const gen = watchDashboard();
    expect(gen.next().value).toEqual(takeEvery(
      DASHBOARD_LIVELLI_FETCH,
      loadLivelli
    ));

    expect(gen.next().value).toEqual(takeEvery(
      CONFIGURATION_CHANGE,
      updateConfiguration
    ));
  });
});

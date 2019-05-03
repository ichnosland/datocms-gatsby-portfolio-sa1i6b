import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';

import { modalSetData } from 'containers/ModalBox/actions';
import { classeDettaglioDataFetch, classeDettaglioFeedbackSet } from 'containers/ClasseDettaglio/actions';

import watchValutazione, {
  valutabiliFetchSaga,
  valutazioneCreaSaga,
  grigliaValutazioneSortSaga,
  grigliaValutazioniBloccoSetSaga,
  grigliaValutazioneDettaglioSaga,
  grigliaValutazioneDetailSortSaga,
  grigliaValutazioneDettaglioStudenteSaga,
  grigliaValutazioniEliminaSaga,
  approssimaVotoValutazioni,
} from '../saga';
import {
  grigliaValutazioneSpinnerSet,
  grigliaValutazioneFeedbackSet,
  grigliaValutazioneFeedbackReset,
  grigliaValutazioneDisplaySet,
  grigliaValutazioneValutabiliSet,
  grigliaValutazioneContenutoSet,
  grigliaValutazioneDettaglioReset,
  grigliaValutazioneDettaglioSet,
  grigliaValutazioneValutabiliReset,
  grigliaValutazioneReset,
  grigliaValutazioneDettaglioStudenteSet,
  grigliaValutazioneDettaglioStudenteReset,
} from '../actions';
import {
  GRIGLIA_VALUTAZIONI_URI_DETTAGLIO,
  GRIGLIA_VALUTAZIONI_URI_FETCH,
  GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH,
  GRIGLIA_VALUTAZIONI_VALUTABILI_SORT,
  GRIGLIA_VALUTAZIONI_CREA,
  GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH,
  CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA,
} from '../constants';


/* eslint-disable redux-saga/yield-effects */
describe('approssimaVotoValutazioni', () => {
  it('flusso principale', () => {
    expect(approssimaVotoValutazioni([{
      voto: 1,
    }, {
      voto: 1.333333,
    }, {
      voto: 1.66666,
    }])).toEqual([{
      voto: 1,
      votoApprossimato: 1,
    }, {
      voto: 1.333333,
      votoApprossimato: 1.33,
    }, {
      voto: 1.66666,
      votoApprossimato: 1.67,
    }]);
  });

  it('voto non settato', () => {
    expect(approssimaVotoValutazioni([{
      voto: undefined,
    }])).toEqual([{
      voto: undefined,
    }]);
  });
});


describe('grigliaValutazioneSortSaga', () => {
  it('flusso principale', () => {
    const gen = grigliaValutazioneSortSaga({
      payloadData: [{
        titolo: 'Le dee di Roma',
        voto: 2.92,
      }, {
        titolo: 'La Sicilia',
        voto: 0.63,
      }],
      sortingData: {
        field: 'titolo',
        sort: 'asc',
        type: 'string',
      },
    });

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      put(grigliaValutazioneContenutoSet({
        sortedData: [{
          titolo: 'La Sicilia',
          voto: 0.63,
        }, {
          titolo: 'Le dee di Roma',
          voto: 2.92,
        }],
      }))
    );

    expect(gen.next().value).toEqual(
      put(grigliaValutazioneDisplaySet({
        field: 'titolo',
        sort: 'asc',
        type: 'string',
      }))
    );

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });
});


describe('valutabiliFetchSaga', () => {
  const mockResponseData = {
    prove_competenza: [{
      id: 2905,
      data_creazione: '2014-08-10',
      titolo: 'Titolo prova competenza 1',
    }],
    verifiche: [{
      id: 3905,
      data_creazione: '2017-05-13',
      titolo: 'Titolo verifica 1',
    }],
    nome_classe: '4 Maieutical',
    versioni: [{
      id: 1905,
      data_creazione: '2017-08-10',
      titolo: 'Titolo versione 1',
    }],
    unita: [{
      id: 4905,
      data_creazione: '2017-08-10',
      titolo: 'Indicativo presente e infinito attivo e passivo 4ª coniugazione',
    }, {
      id: 4904,
      data_creazione: '2015-10-20',
      titolo: 'Indicativo presente e infinito attivo e passivo 3ª coniugazione',
    }],
  };

  it('flusso principale', () => {
    const gen = valutabiliFetchSaga({
      corsoId: 444,
      progett: 'progetto',
      payload: {
        blocchiAttivi: ['versioniLivello', 'verificheLivello', 'proveCompetenza', 'obiettivi'],
      },
    });

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(grigliaValutazioneReset()));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${GRIGLIA_VALUTAZIONI_URI_FETCH}444`
      )
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(
      put(grigliaValutazioneValutabiliSet({
        obiettivi: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '10/08/2017',
          dataSortable: '2017-08-10',
          id: 4905,
          titolo: 'Indicativo presente e infinito attivo e passivo 4ª coniugazione',
        }, {
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '20/10/2015',
          dataSortable: '2015-10-20',
          id: 4904,
          titolo: 'Indicativo presente e infinito attivo e passivo 3ª coniugazione',
        }],
        proveCompetenza: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '10/08/2014',
          dataSortable: '2014-08-10',
          id: 2905,
          titolo: 'Titolo prova competenza 1',
        }],
        verificheLivello: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '13/05/2017',
          dataSortable: '2017-05-13',
          id: 3905,
          titolo: 'Titolo verifica 1',
        }],
        versioniLivello: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '10/08/2017',
          dataSortable: '2017-08-10',
          id: 1905,
          titolo: 'Titolo versione 1',
        }],
      }))
    );

    expect(gen.next().value).toEqual(put(grigliaValutazioneContenutoSet({
      isDataLoaded: true,
      nomeCorso: '4 Maieutical',
      sortedData: [{
        checkbox: undefined,
        checkboxSortable: 0,
        dataCreazione: '10/08/2017',
        dataSortable: '2017-08-10',
        id: 1905,
        titolo: 'Titolo versione 1',
      }],
    })));

    expect(gen.next().value).toEqual(put(grigliaValutazioneDisplaySet({
      field: 'titolo',
      block: 'versioniLivello',
      type: 'string',
      sort: 'asc',
    })));

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });

  it('flusso principale senza un blocco richiesto', () => {
    const gen = valutabiliFetchSaga({
      corsoId: 444,
      progett: 'progetto',
      payload: {
        blocchiAttivi: ['versioniLivello', 'verificheLivello', 'proveCompetenza', 'obiettivi'],
      },
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: { ...mockResponseData, unita: undefined } }).value).toEqual(
      put(grigliaValutazioneValutabiliSet({
        proveCompetenza: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '10/08/2014',
          dataSortable: '2014-08-10',
          id: 2905,
          titolo: 'Titolo prova competenza 1',
        }],
        verificheLivello: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '13/05/2017',
          dataSortable: '2017-05-13',
          id: 3905,
          titolo: 'Titolo verifica 1',
        }],
        versioniLivello: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '10/08/2017',
          dataSortable: '2017-08-10',
          id: 1905,
          titolo: 'Titolo versione 1',
        }],
      }))
    );

    expect(gen.next().value).toEqual(put(grigliaValutazioneContenutoSet({
      isDataLoaded: true,
      nomeCorso: '4 Maieutical',
      sortedData: [{
        checkbox: undefined,
        checkboxSortable: 0,
        dataCreazione: '10/08/2017',
        dataSortable: '2017-08-10',
        id: 1905,
        titolo: 'Titolo versione 1',
      }],
    })));

    expect(gen.next().value).toEqual(put(grigliaValutazioneDisplaySet({
      field: 'titolo',
      block: 'versioniLivello',
      type: 'string',
      sort: 'asc',
    })));

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });

  it('errore', () => {
    const gen = valutabiliFetchSaga({
      corsoId: 444,
      progett: 'progetto',
      payload: {
        blocchiAttivi: ['versioniLivello', 'verificheLivello', 'proveCompetenza', 'obiettivi'],
      },
    });

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(grigliaValutazioneReset()));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${GRIGLIA_VALUTAZIONI_URI_FETCH}444`
      )
    );

    expect(gen.throw('error').value).toEqual(
      put(grigliaValutazioneFeedbackSet(
        true,
        'error',
        'I dati di questa valutazione non possono essere caricati'
      ))
    );

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });
});


describe('grigliaValutazioniBloccoSetSaga', () => {
  it('flusso principale', () => {
    const gen = grigliaValutazioniBloccoSetSaga({
      blocco: 'verificheLivello',
      valutabili: {
        verificheLivello: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '13/05/2017',
          dataSortable: '2017-05-13',
          id: 3905,
          titolo: 'Titolo verifica 1',
        }],
        versioniLivello: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '10/08/2017',
          dataSortable: '2017-08-10',
          id: 1905,
          titolo: 'Titolo versione 1',
        }],
      },
    });

    expect(gen.next().value).toEqual(put(grigliaValutazioneFeedbackReset()));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      put(grigliaValutazioneContenutoSet({
        isDataLoaded: true,
        sortedData: [{
          checkbox: undefined,
          checkboxSortable: 0,
          dataCreazione: '13/05/2017',
          dataSortable: '2017-05-13',
          id: 3905,
          titolo: 'Titolo verifica 1',
        }],
      }))
    );

    expect(gen.next().value).toEqual(
      put(grigliaValutazioneDisplaySet({
        field: 'titolo',
        sort: 'asc',
        block: 'verificheLivello',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
      }))
    );

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });
});


describe('valutazioneCreaSaga', () => {
  const mockPayload = {
    blocchiAttivi: ['obiettivi', 'verificheLivello'],
    corsoId: 444,
    historyPush: () => { },
    selection: {
      titolo: 'titolo',
      obiettivi: [1, 2, 3, 4, 5],
      proveCompetenza: [11, 12, 13],
      versioniLivello: [21, 22],
    },
  };

  it('flusso principale con 201', () => {
    const gen = valutazioneCreaSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(grigliaValutazioneFeedbackReset()));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      call(
        axios.post,
        `${API_BASE_PATH}${GRIGLIA_VALUTAZIONI_URI_FETCH}444`, {
          titolo: 'titolo',
          unita: [1, 2, 3, 4, 5],
          verifiche: [],
          versioni: [],
          prove_competenza: [],
        }
      )
    );

    expect(gen.next({ status: 201 }).value).toEqual(
      call(mockPayload.historyPush, '/classe-dettaglio/444/grigliavalutazione')
    );

    expect(gen.next().value).toEqual(put(grigliaValutazioneValutabiliReset(false)));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });

  it('flusso principale con !201', () => {
    const gen = valutazioneCreaSaga({ payload: mockPayload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ status: 301 }).value).toEqual(put(modalSetData({
      contenuto: 'Non è stato possibile salvare la tua valutazione',
      show: true,
      closeButton: {
        text: 'Ok',
      },
      image: expect.any(Object),
    })));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });

  it('flusso principale con no status', () => {
    const gen = valutazioneCreaSaga({ payload: mockPayload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(put(modalSetData({
      contenuto: 'Non è stato possibile salvare la tua valutazione',
      show: true,
      closeButton: {
        text: 'Ok',
      },
      image: expect.any(Object),
    })));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });

  it('flusso principale con errore', () => {
    const gen = valutazioneCreaSaga({ payload: mockPayload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Non è stato possibile salvare la tua valutazione',
      show: true,
      closeButton: {
        text: 'Ok',
      },
      image: expect.any(Object),
    })));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });
});


describe('grigliaValutazioneDettaglioSaga', () => {
  const mockPayload = {
    valutazioneId: 434,
    data: {
      dataCreazione: '12/10/2019',
      titolo: 'titolo valutazione',
      corsoId: 111,
      tipologia: 'mista',
      corsoNome: 'nome corso',
    },
    theme: {
      brand: '#4aa',
    },
  };

  const mockResponseData = [{
    voto: 8,
    nome: 'nome_3',
  }, {
    voto: 1.2222222,
    nome: 'nome_1',
  }, {
    voto: 5.6,
    nome: 'nome_2',
  }];

  it('flusso principale', () => {
    const gen = grigliaValutazioneDettaglioSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(grigliaValutazioneDettaglioReset()));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${GRIGLIA_VALUTAZIONI_URI_DETTAGLIO}434`
      )
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(grigliaValutazioneDisplaySet({
      field: 'nome',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(grigliaValutazioneDettaglioSet({
      valutazioneId: 434,
      dataCreazione: '12/10/2019',
      titolo: 'titolo valutazione',
      corsoId: 111,
      corsoNome: 'nome corso',
      tipologia: 'mista',
      sortedData: [{
        voto: 1.22,
        nome: 'nome_1',
      }, {
        voto: 5.6,
        nome: 'nome_2',
      }, {
        voto: 8,
        nome: 'nome_3',
      }],
      intestazioniColonna: [{
        label: 'Studente',
        field: 'nome',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
        styleCell: {
          primo: true,
        },
        fieldsDisplay: [{
          field: 'nome',
          function: 'studenteDetailFunction',
        }],
      }, {
        label: 'Punteggio',
        field: 'voto',
        type: 'number',
        styleRiga: {
          color: '#4aa',
        },
        fieldsDisplay: [{ field: 'voto' }],
      }],
    })));

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });

  it('flusso principale con errore', () => {
    const gen = grigliaValutazioneDettaglioSaga({ payload: mockPayload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(grigliaValutazioneFeedbackSet(
      true,
      'error',
      'Il dettaglio di questa valutazione non è disponibile',
    )));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });
});


describe('grigliaValutazioneDetailSortSaga', () => {
  it('flusso principale', () => {
    const gen = grigliaValutazioneDetailSortSaga({
      payloadData: [{
        titolo: 'Le dee di Roma',
        voto: 2.92,
      }, {
        titolo: 'La Sicilia',
        voto: 0.63,
      }],
      sortingData: {
        field: 'titolo',
        sort: 'asc',
        type: 'string',
      },
    });

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      put(grigliaValutazioneDettaglioSet({
        sortedData: [{
          titolo: 'La Sicilia',
          voto: 0.63,
        }, {
          titolo: 'Le dee di Roma',
          voto: 2.92,
        }],
      }))
    );

    expect(gen.next().value).toEqual(
      put(grigliaValutazioneDisplaySet({
        field: 'titolo',
        sort: 'asc',
        type: 'string',
      }))
    );

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false)));
  });
});


describe('grigliaValutazioneDettaglioStudenteSaga', () => {
  const mockPayload = {
    studenteAcademyId: 1001,
    valutazioneId: 8000,
    nomeStudente: 'nome studente',
    dataCreazioneValutazione: '11/02/2019',
    voto: 7,
    corsoId: 111,
    corsoNome: 'nome corso',
    valutazioneTitolo: 'titolo valutazione',
    valutazioneTipologia: 'mista',
    historyPush: () => { },
  };

  const mockResponseData = {
    unita: [{
      titolo: 'unità titolo 1',
      voto: 5,
      id: 1,
    }, {
      titolo: 'unità titolo 2',
      voto: 6,
      id: 2,
    }],
    versioni: [{
      titolo: 'versioni titolo 1',
      voto: 1,
      id: 3,
    }],
    verifiche: [{
      titolo: 'verifiche titolo 1',
      voto: 5.4342423423423,
      id: 4,
    }, {
      titolo: 'verifiche titolo 2',
      voto: 6,
      id: 5,
    }],
    prove_competenza: [{
      titolo: 'prova competenza titolo 3',
      voto: 4,
      id: 6,
    }, {
      titolo: 'prova competenza titolo 1',
      voto: 7.7765,
      id: 8,
    }, {
      titolo: 'prova competenza titolo 2',
      voto: 8.543543,
      id: 7,
    }, {
      titolo: 'prova competenza titolo 2',
      voto: 10,
      id: 9,
    }],
  };

  it('flusso principale', () => {
    const gen = grigliaValutazioneDettaglioStudenteSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(put(grigliaValutazioneDettaglioStudenteReset()));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true, 'dettaglioStudente')));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(true, 'dettaglioStudente_1001')));

    expect(gen.next().value).toEqual(
      call(
        axios.post,
        `${API_BASE_PATH}cicero_academy/api/valutazioni/explode/8000/studente`, {
          id_studente: 1001,
        }
      )
    );

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(grigliaValutazioneDettaglioStudenteSet({
      isLoaded: true,
      corsoId: 111,
      dataCreazioneValutazione: '11/02/2019',
      corsoNome: 'nome corso',
      nome: 'nome studente',
      proveCompetenza: [{
        ...mockResponseData.prove_competenza[0],
        votoApprossimato: 4,
      }, {
        ...mockResponseData.prove_competenza[1],
        votoApprossimato: 7.78,
      }, {
        ...mockResponseData.prove_competenza[2],
        votoApprossimato: 8.54,
      }, {
        ...mockResponseData.prove_competenza[3],
        votoApprossimato: 10,
      }],
      unita: [{
        ...mockResponseData.unita[0],
        votoApprossimato: 5,
      }, {
        ...mockResponseData.unita[1],
        votoApprossimato: 6,
      }],
      versioni: [{
        ...mockResponseData.versioni[0],
        votoApprossimato: 1,
      }],
      verifiche: [{
        ...mockResponseData.verifiche[0],
        votoApprossimato: 5.43,
      }, {
        ...mockResponseData.verifiche[1],
        votoApprossimato: 6,
      }],
      valutazioneId: 8000,
      valutazioneTipologia: 'mista',
      valutazioneTitolo: 'titolo valutazione',
      votoMedia: 7,
    })));

    expect(gen.next().value).toEqual(call(
      mockPayload.historyPush,
      '/griglia-valutazione-dettaglio-studente'
    ));

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false, 'dettaglioStudente')));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false, 'dettaglioStudente_1001')));
  });

  it('flusso principale con valori di default', () => {
    const gen = grigliaValutazioneDettaglioStudenteSaga({ payload: {
      ...mockPayload,
      proveCompetenza: undefined,
      unita: undefined,
      versioni: undefined,
      verifiche: undefined,
    } });

    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: {
      ...mockResponseData,
      verifiche: undefined,
      versioni: undefined,
      unita: undefined,
      prove_competenza: undefined,
    } }).value).toEqual(put(grigliaValutazioneDettaglioStudenteSet({
      isLoaded: true,
      corsoId: 111,
      dataCreazioneValutazione: '11/02/2019',
      corsoNome: 'nome corso',
      nome: 'nome studente',
      proveCompetenza: [],
      unita: [],
      versioni: [],
      verifiche: [],
      valutazioneId: 8000,
      valutazioneTipologia: 'mista',
      valutazioneTitolo: 'titolo valutazione',
      votoMedia: 7,
    })));

    gen.next();

    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false, 'dettaglioStudente')));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false, 'dettaglioStudente_1001')));
  });

  it('flusso principale con errore', () => {
    const gen = grigliaValutazioneDettaglioStudenteSaga({ payload: mockPayload });
    gen.next();
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      contenuto: 'Il dettaglio di questo studente non è disponibile',
      show: true,
      closeButton: {
        text: 'Ok',
      },
      image: {
        src: 'IMAGE_MOCK',
        width: '180px',
        height: '130px',
        alt: 'Errore',
      },
    })));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false, 'dettaglioStudente')));
    expect(gen.next().value).toEqual(put(grigliaValutazioneSpinnerSet(false, 'dettaglioStudente_1001')));
  });
});

describe('grigliaValutazioniEliminaSaga', () => {
  const mockPayload = {
    id: 1234,
    block: 'grigliaValutazione',
    corsoId: 4321,
    historyPush: () => { },
    corsoIscritti: {},
    data: {},
  };

  it('flusso principale', () => {
    const gen = grigliaValutazioniEliminaSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(
      call(
        axios.delete,
        `${API_BASE_PATH}cicero_academy/api/valutazioni/delete/1234`,
      ),
    );
    expect(gen.next({ status: 204 }).value).toEqual(
      put(
        classeDettaglioDataFetch({
          block: 'grigliaValutazione',
          corsoId: 4321,
          historyPush: mockPayload.historyPush,
          corsoIscritti: {},
          data: {},
        })
      ),
    );
  });

  it('eliminazione di una valutazione non presente', () => {
    mockPayload.id = 1111;
    const gen = grigliaValutazioniEliminaSaga({ payload: mockPayload });

    expect(gen.next().value).toEqual(
      call(
        axios.delete,
        `${API_BASE_PATH}cicero_academy/api/valutazioni/delete/1111`,
      ),
    );
    expect(gen.throw('error').value).toEqual(
      put(classeDettaglioFeedbackSet(
        true,
        'error',
        "Impossibile cancellare la valutazione, ricarica la pagina o contatta l'assistenza",
      ))
    );
  });
});


describe('watchValutazione saga', () => {
  it('procedura in caso di successo', () => {
    const gen = watchValutazione();

    expect(gen.next().value).toEqual(
      takeEvery(GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH, valutabiliFetchSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(GRIGLIA_VALUTAZIONI_CREA, valutazioneCreaSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(GRIGLIA_VALUTAZIONI_VALUTABILI_SORT, grigliaValutazioneSortSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET, grigliaValutazioniBloccoSetSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH, grigliaValutazioneDettaglioSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA, grigliaValutazioniEliminaSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT, grigliaValutazioneDetailSortSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH, grigliaValutazioneDettaglioStudenteSaga)
    );
  });
});

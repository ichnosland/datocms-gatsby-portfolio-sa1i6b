import React from 'react';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';

import { modalSetData } from 'containers/ModalBox/actions';
import { Icon } from 'components/Button';
import buttonicon from 'icons/buttons';
import { colore } from 'style/color';

import {
  classeDettaglioEspelliStudente,
  watchClasseDettaglio,
  calcolaDatiStudente,
  calcolaDataStudente,
  classeDettaglioSortSaga,
  classeDettaglioDataFetchSaga,
  classeDettaglioCorsoFetchSaga,
} from '../saga';
import {
  classeDettaglioDisplaySet,
  classeDettaglioReset,
  classeDettaglioContenutoSet,
  classeDettaglioSpinnerSet,
  classeDettaglioFeedbackReset,
  classeDettaglioFeedbackSet,
  classeDettaglioDataFetch,
  classeDettaglioCorsoFetch,
} from '../actions';
import {
  CLASSE_DETTAGLIO_URL_OBIETTIVI_FETCH,
  CLASSE_DETTAGLIO_URL_CORSO_FETCH,
  CLASSE_DETTAGLIO_URL_VERSIONI_MISSIONE_FETCH,
  CLASSE_DETTAGLIO_URL_VERIFICHE_LIVELLO_FETCH,
  CLASSE_DETTAGLIO_URL_VERSIONI_LIVELLO_FETCH,
  CLASSE_DETTAGLIO_URL_PROVE_COMPETENZA_FETCH,
  CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_FETCH,
  CLASSE_DETTAGLIO_URL_ESPELLI,
  CLASSE_DETTAGLIO_CORSO_FETCH,
  CLASSE_DETTAGLIO_DATA_FETCH,
  CLASSE_DETTAGLIO_DISPLAY_SORT,
  CLASSE_DETTAGLIO_ESPELLI,
} from '../constants';


/* eslint-disable redux-saga/yield-effects */
describe('calcolaDatiStudente', () => {
  const mockCorsoIscritti = [{
    name: 'nome utente 1',
    email: 'email.utente1@acme.com',
    studenteAcademyId: 1,
    punti: 100,
  }, {
    name: 'nome utente 2',
    email: 'email.utente2@acme.com',
    studenteAcademyId: 2,
    punti: 200,
  }, {
    name: 'nome utente 3',
    studenteAcademyId: 3,
    punti: 300,
  }];
  const mockDataContenuto = {
    1: {
      media: 5.33333,
      detailData: { key: 'detail data utente 1' },
    },
    2: {
      media: undefined,
      detailData: { key: 'detail data utente 2' },
    },
    3: {
      media: 0,
      detailData: { key: 'detail data utente 3' },
    },
  };

  it('testo output della funzione quando ho i dati studente', () => {
    expect(calcolaDatiStudente(mockCorsoIscritti, mockDataContenuto)).toEqual([{
      name: 'nome utente 1',
      email: 'email.utente1@acme.com',
      studenteAcademyId: 1,
      punti: 100,
      media: 5.33,
      detailData: {
        key: 'detail data utente 1',
        titolo: 'nome utente 1',
        sottoTitolo: 'email.utente1@acme.com',
      },
      key: 1,
    }, {
      name: 'nome utente 2',
      email: 'email.utente2@acme.com',
      studenteAcademyId: 2,
      punti: 200,
      media: undefined,
      detailData: {
        key: 'detail data utente 2',
        titolo: 'nome utente 2',
        sottoTitolo: 'email.utente2@acme.com',
      },
      key: 2,
    }, {
      name: 'nome utente 3',
      studenteAcademyId: 3,
      punti: 300,
      media: 0,
      detailData: {
        key: 'detail data utente 3',
        titolo: 'nome utente 3',
      },
      key: 3,
    }]);
  });

  it('testo output della funzione quando ho tutti i dati studente', () => {
    expect(calcolaDatiStudente(mockCorsoIscritti, { ...mockDataContenuto, 2: undefined })).toEqual([{
      name: 'nome utente 1',
      studenteAcademyId: 1,
      email: 'email.utente1@acme.com',
      punti: 100,
      media: 5.33,
      detailData: {
        key: 'detail data utente 1',
        titolo: 'nome utente 1',
        sottoTitolo: 'email.utente1@acme.com',
      },
      key: 1,
    }, {
      name: 'nome utente 2',
      email: 'email.utente2@acme.com',
      studenteAcademyId: 2,
      punti: 200,
      media: undefined,
      detailData: {
        sortedData: [],
        sottoTitolo: 'email.utente2@acme.com',
        titolo: 'nome utente 2',
      },
      key: 2,
    }, {
      name: 'nome utente 3',
      studenteAcademyId: 3,
      punti: 300,
      media: 0,
      detailData: {
        key: 'detail data utente 3',
        titolo: 'nome utente 3',
      },
      key: 3,
    }]);
  });

  it('testo output della funzione quando mockDataContenuto è vuoto', () => {
    expect(calcolaDatiStudente(mockCorsoIscritti, undefined)).toEqual([{
      name: 'nome utente 1',
      email: 'email.utente1@acme.com',
      studenteAcademyId: 1,
      punti: 100,
      media: undefined,
      detailData: {
        sortedData: [],
        sottoTitolo: 'email.utente1@acme.com',
        titolo: 'nome utente 1',
      },
      key: 1,
    }, {
      name: 'nome utente 2',
      email: 'email.utente2@acme.com',
      studenteAcademyId: 2,
      punti: 200,
      media: undefined,
      detailData: {
        sortedData: [],
        sottoTitolo: 'email.utente2@acme.com',
        titolo: 'nome utente 2',
      },
      key: 2,
    }, {
      name: 'nome utente 3',
      studenteAcademyId: 3,
      punti: 300,
      media: undefined,
      detailData: {
        sortedData: [],
        titolo: 'nome utente 3',
      },
      key: 3,
    }]);
  });
});


describe('calcolaDataStudente', () => {
  const mockDataStudente = [
    {
      titolo: 'Le dee di Roma',
      assegnazione: 4788,
      studente: 1,
      voto: 2.91666666666667,
    },
    {
      titolo: 'La Sicilia',
      assegnazione: 4763,
      studente: 1,
      voto: 0.625,
    },
    {
      titolo: 'La cornacchia e il merlo',
      assegnazione: 277,
      studente: 2,
      voto: 0.666666666666667,
    },
  ];

  it('testo output della funzione quando ho i dati studente con colore brand', () => {
    expect(calcolaDataStudente(mockDataStudente, { brand: 'red' })).toEqual(({
      1: {
        media: 1.770833333333335,
        detailData: {
          sortedData: [{
            titolo: 'Le dee di Roma',
            votoReale: 2.91666666666667,
            voto: 2.92,
          }, {
            titolo: 'La Sicilia',
            votoReale: 0.625,
            voto: 0.63,
          }],
          field: 'titolo',
          sort: 'asc',
          type: 'string',
          intestazioniColonna: [{
            label: 'Titolo',
            field: 'titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
            fieldsDisplay: [{ field: 'titolo' }],
          }, {
            label: 'Voto',
            field: 'voto',
            type: 'number',
            styleRiga: {
              color: 'red',
            },
            fieldsDisplay: [{ field: 'voto' }],
          }],
        },
      },
      2: {
        media: 0.666666666666667,
        detailData: {
          sortedData: [{
            titolo: 'La cornacchia e il merlo',
            votoReale: 0.666666666666667,
            voto: 0.67,
          }],
          field: 'titolo',
          sort: 'asc',
          type: 'string',
          intestazioniColonna: [{
            label: 'Titolo',
            field: 'titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
            fieldsDisplay: [{ field: 'titolo' }],
          }, {
            label: 'Voto',
            field: 'voto',
            type: 'number',
            styleRiga: {
              color: 'red',
            },
            fieldsDisplay: [{ field: 'voto' }],
          }],
        },
      },
    }));
  });

  it('testo output della funzione quando ho i dati studente senza brand', () => {
    expect(calcolaDataStudente(mockDataStudente)).toEqual(({
      1: {
        media: 1.770833333333335,
        detailData: {
          sortedData: [{
            titolo: 'Le dee di Roma',
            votoReale: 2.91666666666667,
            voto: 2.92,
          }, {
            titolo: 'La Sicilia',
            votoReale: 0.625,
            voto: 0.63,
          }],
          field: 'titolo',
          sort: 'asc',
          type: 'string',
          intestazioniColonna: [{
            label: 'Titolo',
            field: 'titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
            fieldsDisplay: [{ field: 'titolo' }],
          }, {
            label: 'Voto',
            field: 'voto',
            type: 'number',
            styleRiga: {},
            fieldsDisplay: [{ field: 'voto' }],
          }],
        },
      },
      2: {
        media: 0.666666666666667,
        detailData: {
          sortedData: [{
            titolo: 'La cornacchia e il merlo',
            votoReale: 0.666666666666667,
            voto: 0.67,
          }],
          field: 'titolo',
          sort: 'asc',
          type: 'string',
          intestazioniColonna: [{
            label: 'Titolo',
            field: 'titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
            fieldsDisplay: [{ field: 'titolo' }],
          }, {
            label: 'Voto',
            field: 'voto',
            type: 'number',
            styleRiga: {},
            fieldsDisplay: [{ field: 'voto' }],
          }],
        },
      },
    }));
  });
});


describe('classeDettaglioSortSaga', () => {
  it('richiedo la visualizzazione delle versioni', () => {
    const gen = classeDettaglioSortSaga({
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

    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classeDettaglioContenutoSet({
      sortedData: [{
        titolo: 'La Sicilia',
        voto: 0.63,
      }, {
        titolo: 'Le dee di Roma',
        voto: 2.92,
      }],
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      field: 'titolo',
      sort: 'asc',
      type: 'string',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });
});


describe('classeDettaglioCorsoFetchSaga', () => {
  const mockData = {
    payload: {
      theme: {
        brand: 'rgb(20,203,200)',
      },
      disciplinaId: 33,
      corsoId: 123,
      block: 'blocco1',
      enabledBlocks: ['blocco1', 'blocco2'],
    },
  };

  const mockResponseCorso = {
    nome: 'nome corso',
    pk: 4444,
    iscritti: [{
      email: 'giorgio.cappone@acme.com',
      first_name: 'Giorgio',
      last_name: 'Cappone',
      studenteAcademy: 6000,
      punti: 456,
      percentualeErrate: 1.222444,
    },
    {
      email: 'noemi.puma@acme.com',
      first_name: 'Noemi',
      last_name: 'Puma',
      studenteAcademy: 5000,
      punti: 678,
      percentualeErrate: 0,
    }],
  };

  const mockIntestazioniColonna = [{
    blocchi: ['obiettivi', 'versioniMissione'],
    label: 'Studente',
    field: 'nameSortable',
    type: 'string',
    style: {
      justifyContent: 'space-between',
    },
    styleCell: {
      primo: true,
    },
    fieldsDisplay: [{
      field: 'name',
      function: 'detailDataFunction',
    }],
  }, {
    blocchi: ['verificheLivello', 'versioniLivello', 'proveCompetenza'],
    label: 'Studente',
    field: 'nameSortable',
    type: 'string',
    style: {
      justifyContent: 'space-between',
    },
    styleCell: {
      primo: true,
    },
    fieldsDisplay: [{ field: 'name', function: 'detailDataFunction' }],
  }, {
    blocchi: ['obiettivi'],
    label: 'Completate',
    field: 'completate',
    type: 'number',
    styleRiga: {
      color: colore.ui.okTxt,
    },
    fieldsDisplay: [{ field: 'completate' }],
  }, {
    blocchi: ['obiettivi'],
    label: 'In corso',
    field: 'inCorso',
    type: 'number',
    styleRiga: {
      color: colore.actions.help,
    },
    fieldsDisplay: [{ field: 'inCorso' }],
  }, {
    blocchi: ['obiettivi'],
    label: 'Non iniziate',
    field: 'nonIniziate',
    type: 'number',
    styleRiga: {
      color: colore.ui.lightTxt,
    },
    fieldsDisplay: [{ field: 'nonIniziate' }],
  }, {
    blocchi: ['obiettivi'],
    label: '%',
    field: 'percentualeErrate',
    type: 'number',
    styleRiga: {
      color: colore.actions.error,
    },
    fieldsDisplay: [{ field: 'percentualeErrate' }],
  }, {
    blocchi: ['obiettivi'],
    label: 'XP',
    field: 'xp',
    type: 'number',
    styleRiga: {
      color: 'rgb(20,203,200)',
    },
    fieldsDisplay: [{ field: 'xp' }],
  }, {
    blocchi: ['versioniLivello', 'verificheLivello', 'versioniMissione', 'proveCompetenza'],
    label: 'Media',
    field: 'media',
    type: 'number',
    styleRiga: {
      color: 'rgb(20,203,200)',
    },
    fieldsDisplay: [{ field: 'media' }],
  }, {
    blocchi: ['grigliaValutazione'],
    label: 'Titolo',
    field: 'titolo',
    type: 'string',
    style: {
      justifyContent: 'space-between',
    },
    styleCell: {
      primo: true,
    },
    fieldsDisplay: [{
      field: 'titolo',
      function: 'apriValutazioneFunction',
    }, {
      field: 'eliminaValutazione',
      function: 'eliminaValutazioneFunction',
    }],
  }, {
    blocchi: ['grigliaValutazione'],
    label: 'Tipologia',
    field: 'tipo',
    type: 'string',
    styleRiga: {
      textTransform: 'lowercase',
    },
    fieldsDisplay: [{ field: 'tipo' }],
  }, {
    blocchi: ['grigliaValutazione'],
    label: 'Creata il',
    field: 'dataCreazioneSortable',
    type: 'string',
    fieldsDisplay: [{ field: 'dataCreazione' }],
  }];

  it('successo con blocco != obiettivi && !grigliaValutazione', () => {
    const gen = classeDettaglioCorsoFetchSaga(mockData);

    expect(gen.next().value).toEqual(put(classeDettaglioReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_CORSO_FETCH}123`, {
        params: { disciplina: 33 },
      },
    ));

    expect(gen.next({ data: mockResponseCorso }).value).toEqual(put(classeDettaglioContenutoSet({
      corsoId: 4444,
      corsoIscritti: [{
        name: 'Giorgio Cappone',
        email: 'giorgio.cappone@acme.com',
        nameSortable: 'Cappone Giorgio',
        studenteAcademyId: 6000,
        xp: 456,
      }, {
        name: 'Noemi Puma',
        email: 'noemi.puma@acme.com',
        nameSortable: 'Puma Noemi',
        studenteAcademyId: 5000,
        xp: 678,
      }],
      corsoNome: 'nome corso',
      intestazioniColonna: mockIntestazioniColonna,
      isCorsoLoaded: true,
    })));

    expect(gen.next({ data: mockResponseCorso }).value).toEqual(put(classeDettaglioDataFetch({
      block: 'blocco1',
      corsoId: 123,
      corsoIscritti: [{
        name: 'Giorgio Cappone',
        nameSortable: 'Cappone Giorgio',
        email: 'giorgio.cappone@acme.com',
        studenteAcademyId: 6000,
        xp: 456,
      }, {
        name: 'Noemi Puma',
        nameSortable: 'Puma Noemi',
        email: 'noemi.puma@acme.com',
        studenteAcademyId: 5000,
        xp: 678,
      }],
      data: {
        grigliaValutazione: undefined,
        obiettivi: undefined,
        proveCompetenza: undefined,
        verificheLivello: undefined,
        versioniLivello: undefined,
      },
      theme: {
        brand: 'rgb(20,203,200)',
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con blocco == obiettivi', () => {
    const gen = classeDettaglioCorsoFetchSaga({
      ...mockData,
      payload: {
        ...mockData.payload,
        block: 'obiettivi',
        enabledBlocks: ['obiettivi'],
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_CORSO_FETCH}123`, {
        params: { disciplina: 33 },
      },
    ));

    expect(gen.next({ data: mockResponseCorso }).value).toEqual(put(classeDettaglioContenutoSet({
      corsoId: 4444,
      corsoIscritti: [{
        name: 'Giorgio Cappone',
        nameSortable: 'Cappone Giorgio',
        email: 'giorgio.cappone@acme.com',
        studenteAcademyId: 6000,
        xp: 456,
      }, {
        name: 'Noemi Puma',
        nameSortable: 'Puma Noemi',
        email: 'noemi.puma@acme.com',
        studenteAcademyId: 5000,
        xp: 678,
      }],
      corsoNome: 'nome corso',
      isCorsoLoaded: true,
      intestazioniColonna: mockIntestazioniColonna,
    })));

    expect(gen.next({ data: mockResponseCorso }).value).toEqual(put(classeDettaglioDataFetch({
      block: 'obiettivi',
      corsoId: 123,
      corsoIscritti: [{
        name: 'Giorgio Cappone',
        nameSortable: 'Cappone Giorgio',
        email: 'giorgio.cappone@acme.com',
        studenteAcademyId: 6000,
        xp: 456,
      }, {
        name: 'Noemi Puma',
        nameSortable: 'Puma Noemi',
        email: 'noemi.puma@acme.com',
        studenteAcademyId: 5000,
        xp: 678,
      }],
      data: {
        grigliaValutazione: undefined,
        obiettivi: undefined,
        proveCompetenza: undefined,
        verificheLivello: undefined,
        versioniLivello: undefined,
      },
      theme: {
        brand: 'rgb(20,203,200)',
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con blocco == obiettivi', () => {
    const gen = classeDettaglioCorsoFetchSaga({
      ...mockData,
      payload: {
        ...mockData.payload,
        block: 'grigliaValutazione',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_CORSO_FETCH}123`, {
        params: { disciplina: 33 },
      },
    ));

    expect(gen.next({ data: mockResponseCorso }).value).toEqual(put(classeDettaglioContenutoSet({
      corsoId: 4444,
      corsoIscritti: [{
        name: 'Giorgio Cappone',
        nameSortable: 'Cappone Giorgio',
        email: 'giorgio.cappone@acme.com',
        studenteAcademyId: 6000,
        xp: 456,
      }, {
        name: 'Noemi Puma',
        nameSortable: 'Puma Noemi',
        email: 'noemi.puma@acme.com',
        studenteAcademyId: 5000,
        xp: 678,
      }],
      corsoNome: 'nome corso',
      isCorsoLoaded: true,
      intestazioniColonna: mockIntestazioniColonna,
    })));

    expect(gen.next({ data: mockResponseCorso }).value).toEqual(put(classeDettaglioDataFetch({
      block: 'grigliaValutazione',
      corsoId: 123,
      corsoIscritti: [{
        name: 'Giorgio Cappone',
        nameSortable: 'Cappone Giorgio',
        email: 'giorgio.cappone@acme.com',
        studenteAcademyId: 6000,
        xp: 456,
      }, {
        name: 'Noemi Puma',
        nameSortable: 'Puma Noemi',
        email: 'noemi.puma@acme.com',
        studenteAcademyId: 5000,
        xp: 678,
      }],
      data: {
        grigliaValutazione: undefined,
        obiettivi: undefined,
        proveCompetenza: undefined,
        verificheLivello: undefined,
        versioniLivello: undefined,
      },
      theme: {
        brand: 'rgb(20,203,200)',
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });


  it('errore', () => {
    const gen = classeDettaglioCorsoFetchSaga({
      ...mockData,
      payload: {
        ...mockData.payload,
        block: 'grigliaValutazione',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_CORSO_FETCH}123`, {
        params: { disciplina: 33 },
      },
    ));

    expect(gen.throw('error').value).toEqual(put(classeDettaglioFeedbackSet(
      true,
      'error',
      'I dati non possono essere caricati',
    )));

    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });
});


describe('classeDettaglioDataFetchSaga saga', () => {
  const mockData = {
    payload: {
      data: {},
      theme: {
        brand: 'rgb(20,203,200)',
      },
      corsoId: 4000,
      block: 'versioniLivello',
      corsoIscritti: [{
        email: 'giorgio.cappone@acme.com',
        first_name: 'Giorgio',
        last_name: 'Cappone',
        nameSortable: 'Cappone Giorgio',
        name: 'Giorgio Cappone',
        studenteAcademyId: 1002,
      },
      {
        email: 'noemi.puma@acme.com',
        first_name: 'Noemi',
        last_name: 'Puma',
        nameSortable: 'Puma Noemi',
        name: 'Noemi Puma',
        studenteAcademyId: 1003,
      },
      {
        email: 'sara.giraffa@acme.com',
        first_name: 'Sara',
        last_name: 'Giraffa',
        nameSortable: 'Giraffa Sara',
        name: 'Sara Giraffa',
        studenteAcademyId: 1005,
      }],
    },
  };

  const mockResponseData = [{
    studente: 1002,
    titolo: 'titolo 1',
    voto: 1.2223323,
  }, {
    studente: 1003,
    titolo: 'titolo 2',
    voto: 2,
  }, {
    studente: 1002,
    titolo: 'titolo 3',
    voto: 7,
  }];

  const detailIntestazioni = [{
    field: 'titolo',
    fieldsDisplay: [{ field: 'titolo' }],
    label: 'Titolo',
    type: 'string',
    style: {
      justifyContent: 'space-between',
    },
  }, {
    field: 'voto',
    fieldsDisplay: [{ field: 'voto' }],
    label: 'Voto',
    type: 'number',
    styleRiga: {
      color: 'rgb(20,203,200)',
    },
  }];

  const mockDataVersioniVerificheProve = {
    1002: {
      detailData: {
        field: 'titolo',
        intestazioniColonna: detailIntestazioni,
        sort: 'asc',
        sortedData: [{
          titolo: 'titolo 1',
          voto: 1.22,
          votoReale: 1.2223323,
        }, {
          titolo: 'titolo 3',
          voto: 7,
          votoReale: 7,
        }],
        type: 'string',
      },
      media: 4.11116615,
    },
    1003: {
      detailData: {
        field: 'titolo',
        intestazioniColonna: detailIntestazioni,
        sort: 'asc',
        sortedData: [{
          titolo: 'titolo 2',
          voto: 2,
          votoReale: 2,
        }],
        type: 'string',
      },
      media: 2,
    },
  };

  const mockResponseParsed = {
    sortedData: [{
      detailData: {
        field: 'titolo',
        intestazioniColonna: detailIntestazioni,
        sort: 'asc',
        sortedData: [{
          titolo: 'titolo 1',
          voto: 1.22,
          votoReale: 1.2223323,
        }, {
          titolo: 'titolo 3',
          voto: 7,
          votoReale: 7,
        }],
        titolo: 'Giorgio Cappone',
        sottoTitolo: 'giorgio.cappone@acme.com',
        type: 'string',
      },
      first_name: 'Giorgio',
      key: 1002,
      last_name: 'Cappone',
      media: 4.11,
      studenteAcademyId: 1002,
      email: 'giorgio.cappone@acme.com',
      name: 'Giorgio Cappone',
      nameSortable: 'Cappone Giorgio',
    }, {
      detailData: {
        sortedData: [],
        sottoTitolo: 'sara.giraffa@acme.com',
        titolo: 'Sara Giraffa',
      },
      first_name: 'Sara',
      key: 1005,
      last_name: 'Giraffa',
      media: undefined,
      studenteAcademyId: 1005,
      email: 'sara.giraffa@acme.com',
      nameSortable: 'Giraffa Sara',
      name: 'Sara Giraffa',
    }, {
      detailData: {
        titolo: 'Noemi Puma',
        sottoTitolo: 'noemi.puma@acme.com',
        field: 'titolo',
        intestazioniColonna: detailIntestazioni,
        sort: 'asc',
        sortedData: [{
          titolo: 'titolo 2',
          voto: 2,
          votoReale: 2,
        }],
        type: 'string',
      },
      first_name: 'Noemi',
      key: 1003,
      last_name: 'Puma',
      media: 2,
      studenteAcademyId: 1003,
      email: 'noemi.puma@acme.com',
      nameSortable: 'Puma Noemi',
      name: 'Noemi Puma',
    }],
  };

  const mockResponseObiettivi = {
    esecuzioni: {
      1002: [
        [19, false],
        [24, true],
      ],
    },
    assegnazioni: [
      {
        id: 19,
        nome: 'Indicativo presente e infinito attivo e passivo 3ª coniugazione',
      },
      {
        id: 24,
        nome: 'Complemento di vantaggio e di svantaggio',
      },
      {
        id: 13,
        nome: 'Indicativo presente e imperfetto, infinito di sum',
      },
    ],
    percentuali_errate: {
      1002: 13.333333333333334,
    },
  };

  const { actions: { help, okay }, ui: { darkBg } } = colore;
  const { check, crono, minus } = buttonicon;

  it('successo con dati già caricati (versioniLivello)', () => {
    const gen = classeDettaglioDataFetchSaga({
      ...mockData,
      payload: {
        ...mockData.payload,
        block: 'versioniLivello',
        data: {
          versioniLivello: {
            data: {
              1002: {
                studente: 1002,
                media: 8.777777,
              },
            },
            isLoaded: true,
          },
        },
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(
      gen.next().value
    ).toEqual(put(classeDettaglioContenutoSet({
      sortedData: [{
        detailData: {
          sortedData: [],
          titolo: 'Giorgio Cappone',
          sottoTitolo: 'giorgio.cappone@acme.com',
        },
        first_name: 'Giorgio',
        key: 1002,
        media: 8.78,
        last_name: 'Cappone',
        studenteAcademyId: 1002,
        email: 'giorgio.cappone@acme.com',
        name: 'Giorgio Cappone',
        nameSortable: 'Cappone Giorgio',
      }, {
        detailData: {
          sortedData: [],
          sottoTitolo: 'sara.giraffa@acme.com',
          titolo: 'Sara Giraffa',
        },
        first_name: 'Sara',
        key: 1005,
        last_name: 'Giraffa',
        studenteAcademyId: 1005,
        email: 'sara.giraffa@acme.com',
        nameSortable: 'Giraffa Sara',
        name: 'Sara Giraffa',
      }, {
        detailData: {
          titolo: 'Noemi Puma',
          sottoTitolo: 'noemi.puma@acme.com',
          sortedData: [],
        },
        first_name: 'Noemi',
        key: 1003,
        last_name: 'Puma',
        studenteAcademyId: 1003,
        email: 'noemi.puma@acme.com',
        nameSortable: 'Puma Noemi',
        name: 'Noemi Puma',
      }],
      versioniLivello: {
        isLoaded: true,
        data: {
          1002: {
            studente: 1002,
            media: 8.777777,
          },
        },
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      block: 'versioniLivello',
      field: 'nameSortable',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con versioniLivello', () => {
    const gen = classeDettaglioDataFetchSaga(mockData);

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_VERSIONI_LIVELLO_FETCH}4000`
    ));

    expect(
      gen.next({ data: mockResponseData }).value
    ).toEqual(put(classeDettaglioContenutoSet({
      ...mockResponseParsed,
      versioniLivello: {
        isLoaded: true,
        data: mockDataVersioniVerificheProve,
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      block: 'versioniLivello',
      field: 'nameSortable',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con versioniMissione', () => {
    const gen = classeDettaglioDataFetchSaga({
      payload: {
        ...mockData.payload,
        block: 'versioniMissione',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_VERSIONI_MISSIONE_FETCH}4000`
    ));

    expect(
      gen.next({ data: mockResponseData }).value
    ).toEqual(put(classeDettaglioContenutoSet({
      ...mockResponseParsed,
      versioniMissione: {
        isLoaded: true,
        data: mockDataVersioniVerificheProve,
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      block: 'versioniMissione',
      field: 'nameSortable',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con verificheLivello', () => {
    const gen = classeDettaglioDataFetchSaga({
      payload: {
        ...mockData.payload,
        block: 'verificheLivello',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_VERIFICHE_LIVELLO_FETCH}4000`
    ));

    expect(
      gen.next({ data: mockResponseData }).value
    ).toEqual(put(classeDettaglioContenutoSet({
      ...mockResponseParsed,
      verificheLivello: {
        isLoaded: true,
        data: mockDataVersioniVerificheProve,
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      block: 'verificheLivello',
      field: 'nameSortable',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con proveCompetenza', () => {
    const gen = classeDettaglioDataFetchSaga({
      payload: {
        ...mockData.payload,
        block: 'proveCompetenza',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_PROVE_COMPETENZA_FETCH}4000`
    ));

    expect(
      gen.next({ data: mockResponseData }).value
    ).toEqual(put(classeDettaglioContenutoSet({
      ...mockResponseParsed,
      proveCompetenza: {
        isLoaded: true,
        data: mockDataVersioniVerificheProve,
      },
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      block: 'proveCompetenza',
      field: 'nameSortable',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con grigliaValutazione', () => {
    const historyPush = () => { };

    const mockResponseDataGriglia = [{
      id: 1001,
      titolo: 'titolo 1',
      data_creazione: '2019-01-20',
      tipo: 'unita',
    }, {
      id: 1003,
      titolo: 'titolo 2',
      data_creazione: '2019-01-22',
      tipo: 'versioni',
    }, {
      id: 1002,
      titolo: 'titolo 3',
      data_creazione: '2019-01-23',
      tipo: 'mista',
    }];

    const gen = classeDettaglioDataFetchSaga({
      payload: {
        ...mockData.payload,
        block: 'grigliaValutazione',
        historyPush,
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_FETCH}4000`
    ));

    expect(gen.next({ data: mockResponseDataGriglia }).value).toEqual(put(classeDettaglioContenutoSet({
      grigliaValutazione: {
        data: [{
          eliminaValutazione: ' ',
          id: 1001,
          titolo: 'titolo 1',
          dataCreazione: '20/01/2019',
          dataCreazioneSortable: '2019-01-20',
          tipo: 'unita',
          key: 1001,
        }, {
          eliminaValutazione: ' ',
          id: 1003,
          titolo: 'titolo 2',
          dataCreazione: '22/01/2019',
          dataCreazioneSortable: '2019-01-22',
          tipo: 'versioni',
          key: 1003,
        }, {
          eliminaValutazione: ' ',
          id: 1002,
          titolo: 'titolo 3',
          dataCreazione: '23/01/2019',
          dataCreazioneSortable: '2019-01-23',
          tipo: 'mista',
          key: 1002,
        }],
        isLoaded: true,
      },
      sortedData: [{
        eliminaValutazione: ' ',
        id: 1001,
        titolo: 'titolo 1',
        dataCreazione: '20/01/2019',
        dataCreazioneSortable: '2019-01-20',
        tipo: 'unita',
        key: 1001,
      }, {
        eliminaValutazione: ' ',
        id: 1003,
        titolo: 'titolo 2',
        dataCreazione: '22/01/2019',
        dataCreazioneSortable: '2019-01-22',
        tipo: 'versioni',
        key: 1003,
      }, {
        eliminaValutazione: ' ',
        id: 1002,
        titolo: 'titolo 3',
        dataCreazione: '23/01/2019',
        dataCreazioneSortable: '2019-01-23',
        tipo: 'mista',
        key: 1002,
      }],
    })));

    expect(gen.next({ data: mockResponseDataGriglia }).value).toEqual(put(classeDettaglioDisplaySet({
      block: 'grigliaValutazione',
      field: 'titolo',
      type: 'string',
      sort: 'asc',
    })));

    expect(gen.next().value).toEqual(call(
      historyPush,
      '/classe-dettaglio/4000/grigliavalutazione'
    ));

    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con obiettivi', () => {
    const gen = classeDettaglioDataFetchSaga({
      payload: {
        ...mockData.payload,
        corsoIscritti: [{
          email: 'giorgio.cappone@acme.com',
          first_name: 'Giorgio',
          last_name: 'Cappone',
          nameSortable: 'Cappone Giorgio',
          name: 'Giorgio Cappone',
          studenteAcademyId: 1002,
        },
        {
          email: 'noemi.puma@acme.com',
          first_name: 'Noemi',
          last_name: 'Puma',
          nameSortable: 'Puma Noemi',
          name: 'Noemi Puma',
          studenteAcademyId: 1003,
        },
        {
          email: 'sara.gatto@acme.com',
          first_name: 'Sara',
          last_name: 'Gatto',
          nameSortable: 'Gatto Sara',
          name: 'Sara Gatto',
          studenteAcademyId: 1005,
        }],
        block: 'obiettivi',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_OBIETTIVI_FETCH}4000`
    ));

    expect(gen.next({ data: mockResponseObiettivi }).value).toEqual(put(classeDettaglioContenutoSet({
      obiettivi: {
        data: {
          iscrittiData: {
            1002: {
              completate: [24],
              inCorso: [19],
              nonIniziate: [13],
              percentualeErrate: 13,
            },
            1003: {
              completate: [],
              inCorso: [],
              nonIniziate: [19, 24, 13],
              percentualeErrate: 0,
            },
            1005: {
              completate: [],
              inCorso: [],
              nonIniziate: [19, 24, 13],
              percentualeErrate: 0,
            },
          },
          unita: {
            assegnate: {
              13: {
                nome: 'Indicativo presente e imperfetto, infinito di sum',
              },
              19: {
                nome: 'Indicativo presente e infinito attivo e passivo 3ª coniugazione',
              },
              24: {
                nome: 'Complemento di vantaggio e di svantaggio',
              },
            },
            pks: [19, 24, 13],
          },
        },
        isLoaded: true,
      },
      sortedData: [{
        completate: 1,
        detailData: {
          titolo: 'Giorgio Cappone',
          sottoTitolo: 'giorgio.cappone@acme.com',
          field: 'titolo',
          intestazioniColonna: [{
            field: 'titolo',
            fieldsDisplay: [{ field: 'titolo' }],
            label: 'Titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
          }, {
            field: 'stato',
            fieldsDisplay: [{ field: 'statoDisplay' }],
            label: 'Stato',
            type: 'string',
          }],
          sort: 'asc',
          sortedData: [{
            stato: 'inCorso',
            statoDisplay: <Icon {...crono} fill={help} />,
            titolo: 'Indicativo presente e infinito attivo e passivo 3ª coniugazione',
          }, {
            stato: 'completata',
            statoDisplay: <Icon {...check} fill={okay} />,
            titolo: 'Complemento di vantaggio e di svantaggio',
          }, {
            stato: 'nonIniziata',
            statoDisplay: <Icon {...minus} fill={darkBg} />,
            titolo: 'Indicativo presente e imperfetto, infinito di sum',
          }],
          type: 'string',
        },
        first_name: 'Giorgio',
        nameSortable: 'Cappone Giorgio',
        name: 'Giorgio Cappone',
        inCorso: 1,
        key: 1002,
        last_name: 'Cappone',
        nonIniziate: 1,
        percentualeErrate: 13,
        studenteAcademyId: 1002,
        email: 'giorgio.cappone@acme.com',
      }, {
        completate: 0,
        detailData: {
          titolo: 'Sara Gatto',
          sottoTitolo: 'sara.gatto@acme.com',
          field: 'titolo',
          intestazioniColonna: [{
            field: 'titolo',
            fieldsDisplay: [{ field: 'titolo' }],
            label: 'Titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
          }, {
            field: 'stato',
            fieldsDisplay: [{ field: 'statoDisplay' },
            ],
            label: 'Stato',
            type: 'string',
          }],
          sort: 'asc',
          sortedData: [{
            stato: 'nonIniziata',
            statoDisplay: <Icon {...minus} fill={darkBg} />,
            titolo: 'Indicativo presente e infinito attivo e passivo 3ª coniugazione',
          }, {
            stato: 'nonIniziata',
            statoDisplay: <Icon {...minus} fill={darkBg} />,
            titolo: 'Complemento di vantaggio e di svantaggio',
          }, {
            stato: 'nonIniziata',
            statoDisplay: <Icon {...minus} fill={darkBg} />,
            titolo: 'Indicativo presente e imperfetto, infinito di sum',
          }],
          type: 'string',
        },
        first_name: 'Sara',
        nameSortable: 'Gatto Sara',
        name: 'Sara Gatto',
        inCorso: 0,
        key: 1005,
        last_name: 'Gatto',
        nonIniziate: 3,
        percentualeErrate: 0,
        studenteAcademyId: 1005,
        email: 'sara.gatto@acme.com',
      }, {
        completate: 0,
        detailData: {
          titolo: 'Noemi Puma',
          sottoTitolo: 'noemi.puma@acme.com',
          field: 'titolo',
          intestazioniColonna: [{
            field: 'titolo',
            fieldsDisplay: [{ field: 'titolo' }],
            label: 'Titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
          }, {
            field: 'stato',
            fieldsDisplay: [{ field: 'statoDisplay' },
            ],
            label: 'Stato',
            type: 'string',
          }],
          sort: 'asc',
          sortedData: [{
            stato: 'nonIniziata',
            statoDisplay: <Icon {...minus} fill={darkBg} />,
            titolo: 'Indicativo presente e infinito attivo e passivo 3ª coniugazione',
          }, {
            stato: 'nonIniziata',
            statoDisplay: <Icon {...minus} fill={darkBg} />,
            titolo: 'Complemento di vantaggio e di svantaggio',
          }, {
            stato: 'nonIniziata',
            statoDisplay: <Icon {...minus} fill={darkBg} />,
            titolo: 'Indicativo presente e imperfetto, infinito di sum',
          }],
          type: 'string',
        },
        first_name: 'Noemi',
        nameSortable: 'Puma Noemi',
        name: 'Noemi Puma',
        inCorso: 0,
        key: 1003,
        last_name: 'Puma',
        nonIniziate: 3,
        percentualeErrate: 0,
        studenteAcademyId: 1003,
        email: 'noemi.puma@acme.com',
      }],
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      block: 'obiettivi',
      field: 'nameSortable',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('errore', () => {
    const gen = classeDettaglioDataFetchSaga({
      payload: {
        ...mockData.payload,
        block: 'grigliaValutazione',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_FETCH}4000`
    ));

    expect(gen.throw('errore').value).toEqual(put(classeDettaglioFeedbackSet(
      true,
      'error',
      'I dati relativi alla sezione selezionata non possono essere caricati',
    )));

    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });

  it('successo con blocco senza fetch dati', () => {
    const gen = classeDettaglioDataFetchSaga({
      payload: {
        ...mockData.payload,
        block: 'blocco',
      },
    });

    expect(gen.next().value).toEqual(put(classeDettaglioFeedbackReset()));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(true)));

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(classeDettaglioContenutoSet({
      sortedData: [],
    })));

    expect(gen.next().value).toEqual(put(classeDettaglioDisplaySet({
      block: 'blocco',
      field: 'nameSortable',
      type: 'string',
      sort: 'asc',
    })));
    expect(gen.next().value).toEqual(put(classeDettaglioSpinnerSet(false)));
  });
});


describe('classeDettaglioEspelliStudente saga', () => {
  const mockData = {
    payload: {
      studente: {
        id: 123,
        nome: 'nome',
      },
      corso: {
        id: 456,
        nome: 'nome corso',
      },
      configuration: {
        disciplinaId: 33,
      },
      block: 'blocco',
    },
  };

  it('in caso di successo', () => {
    const gen = classeDettaglioEspelliStudente(mockData);

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_ESPELLI.replace('{CORSO_ID}', 456)}`, {
        studenteacademy: 123,
      }
    ));

    expect(gen.next({ status: 200 }).value).toEqual(put(classeDettaglioCorsoFetch({
      block: 'blocco',
      corsoId: 456,
      disciplinaId: 33,
    })));
  });

  it('in caso di risposta negativa', () => {
    const gen = classeDettaglioEspelliStudente(mockData);

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_ESPELLI.replace('{CORSO_ID}', 456)}`, {
        studenteacademy: 123,
      }
    ));

    expect(gen.next({ status: 303 }).value).toEqual(put(modalSetData({
      titolo: 'Impossibile eseguire questa espulsione',
      contenuto: 'Non ho potuto espellere lo studente <strong>nome</strong> dal corso <strong>nome corso</strong>',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('in caso di errore', () => {
    const gen = classeDettaglioEspelliStudente(mockData);

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_ESPELLI.replace('{CORSO_ID}', 456)}`, {
        studenteacademy: 123,
      }
    ));

    expect(gen.throw('error').value).toEqual(put(modalSetData({
      titolo: 'Impossibile eseguire questa espulsione',
      contenuto: 'Non ho potuto espellere lo studente <strong>nome</strong> dal corso <strong>nome corso</strong>',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });
});


describe('watchClasseDettaglio saga', () => {
  it('procedura in caso di successo', () => {
    const gen = watchClasseDettaglio();

    expect(gen.next().value).toEqual(
      takeEvery(CLASSE_DETTAGLIO_DISPLAY_SORT, classeDettaglioSortSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(CLASSE_DETTAGLIO_DATA_FETCH, classeDettaglioDataFetchSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(CLASSE_DETTAGLIO_CORSO_FETCH, classeDettaglioCorsoFetchSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(CLASSE_DETTAGLIO_ESPELLI, classeDettaglioEspelliStudente)
    );
  });
});

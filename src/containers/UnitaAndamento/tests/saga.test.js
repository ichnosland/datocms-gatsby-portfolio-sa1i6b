import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';

import {
  UNITA_ANDAMENTO_URL_CLASSE_FETCH,
  UNITA_ANDAMENTO_FETCH,
  UNITA_ANDAMENTO_SORT,
} from '../constants';
import {
  unitaAndamentoSpinnerSet,
  unitaAndamentoFeedbackSet,
  unitaAndamentoFeedbackReset,
  unitaAndamentoContenutoSet,
  unitaAndamentoSort,
  unitaAndamentoSortSet,
} from '../actions';
import {
  unitaAndamentoSortSaga,
  unitaAndamentoFetchSaga,
  watchUnitaAndamento,
} from '../saga';


/* eslint-disable redux-saga/yield-effects */
describe('unitaAndamentoSortSaga', () => {
  const mockPayloadData = [{
    key: 'key1',
    campo1: 'valore 1',
    campo2: 500,
    campo3: 'valore 4',
    campo4: '',
    campo5: 4000,
  }, {
    key: 'key4',
    campo1: 'valore 1',
    campo2: 500,
    campo3: 'valore 3',
    campo4: '',
    campo5: 10,
  }, {
    key: 'key2',
    campo1: 'valore 3',
    campo2: 100,
    campo3: 'valore 2',
    campo4: 'valore1',
    campo5: undefined,
  }, {
    key: 'key3',
    campo1: 'valore 4',
    campo2: 300,
    campo3: 'valore 2',
    campo4: 'valore 5',
    campo5: undefined,
  }];

  it('test di sorting campo1 (stringa) asc', () => {
    const gen = unitaAndamentoSortSaga({
      payloadData: mockPayloadData,
      sortingData: {
        field: 'campo1',
        sort: 'asc',
        type: 'string',
      },
    });

    expect(gen.next().value).toEqual(put(unitaAndamentoSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(unitaAndamentoContenutoSet({
      sortedData: [{
        campo1: 'valore 1',
        campo2: 500,
        campo3: 'valore 4',
        campo4: '',
        campo5: 4000,
        key: 'key1',
      }, {
        campo1: 'valore 1',
        campo2: 500,
        campo3: 'valore 3',
        campo4: '',
        campo5: 10,
        key: 'key4',
      }, {
        campo1: 'valore 3',
        campo2: 100,
        campo3: 'valore 2',
        campo4: 'valore1',
        campo5: undefined,
        key: 'key2',
      }, {
        campo1: 'valore 4',
        campo2: 300,
        campo3: 'valore 2',
        campo4: 'valore 5',
        campo5: undefined,
        key: 'key3',
      }],
    })));
    expect(gen.next().value).toEqual(put(unitaAndamentoSortSet({
      field: 'campo1',
      sort: 'asc',
      type: 'string',
    })));
    expect(gen.next().value).toEqual(put(unitaAndamentoSpinnerSet(false)));
  });
});


describe('unitaAndamentoFetchSaga', () => {
  const mockResponseData = {
    titolo: 'titolo unità',
    prerequisito: 55555,
    numero_lezioni: 12,
    andamento: [{
      lezione_raggiunta: 12,
      completata: true,
      percentuale_errate: 33.6666,
      studente_academy: 100,
    }, {
      lezione_raggiunta: 3,
      completata: false,
      percentuale_errate: 10.2222,
      studente_academy: 200,
    }, {
      lezione_raggiunta: 2,
      completata: false,
      percentuale_errate: 4,
      studente_academy: 300,
    }, {
      lezione_raggiunta: 0,
      completata: false,
      percentuale_errate: 15.5555,
      studente_academy: 500,
    }],
  };

  const mockPayload = {
    theme: {
      brand: 'rgb(16, 174, 188)',
    },
    iscritti: [{
      last_name: 'Sara',
      first_name: 'Coccodrillo',
      studenteAcademy: 100,
      punti: 2,
    }, {
      last_name: 'Enrico',
      first_name: 'Elefante',
      studenteAcademy: 200,
      punti: undefined,
    }, {
      last_name: 'Andrea',
      first_name: 'Gatto',
      studenteAcademy: 400,
      punti: 6,
    }, {
      last_name: 'Federico',
      first_name: 'Coccinella',
      studenteAcademy: 500,
      punti: 8,
    }],
    display: {
      field: 'campo5',
      sort: 'asc',
      type: 'number',
    },
  };

  it('lettura dati con successo', () => {
    const gen = unitaAndamentoFetchSaga({
      corsoId: 1000,
      unitaId: 2000,
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(put(unitaAndamentoFeedbackReset()));
    expect(gen.next().value).toEqual(put(unitaAndamentoSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${UNITA_ANDAMENTO_URL_CLASSE_FETCH}1000/2000`
    ));

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(unitaAndamentoContenutoSet({
      numeroLezioni: 12,
      prerequisito: 55555,
      titolo: 'titolo unità',
      totaleUnitaCompletate: 1,
      totaleUnitaIniziate: 1,
      totaleUnitaNonIniziate: 2,
      intestazioniColonna: [{
        label: 'Studente',
        field: 'nameSortable',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
        fieldsDisplay: [{ field: 'name' }],
      }, {
        label: 'Lezione',
        field: 'lezioneRaggiunta',
        type: 'number',
        fieldsDisplay: [
          { field: 'lezioneRaggiunta' },
          { field: 'stato' },
        ],
      }, {
        label: '%',
        field: 'percentualeErrori',
        type: 'number',
        style: {
          color: 'rgb(255, 0, 0)',
        },
        fieldsDisplay: [{ field: 'percentualeErrori' }],
      }, {
        label: 'XP',
        field: 'xp',
        type: 'number',
        fieldsDisplay: [{ field: 'xp' }],
        style: {
          color: 'rgb(16, 174, 188)',
        },
      }],
    })));

    expect(gen.next().value).toEqual(put(unitaAndamentoSort(
      [{
        studenteAcademyId: 100,
        key: 100,
        xp: 2,
        name: 'Coccodrillo Sara',
        nameSortable: 'Sara Coccodrillo',
        lezioneRaggiunta: 12,
        completata: true,
        inCorso: false,
        percentualeErrori: 34,
      }, {
        studenteAcademyId: 200,
        key: 200,
        xp: 0,
        name: 'Elefante Enrico',
        nameSortable: 'Enrico Elefante',
        lezioneRaggiunta: 3,
        completata: false,
        inCorso: true,
        percentualeErrori: 10,
      }, {
        studenteAcademyId: 400,
        key: 400,
        xp: 6,
        name: 'Gatto Andrea',
        nameSortable: 'Andrea Gatto',
        lezioneRaggiunta: 0,
        completata: false,
        inCorso: false,
        percentualeErrori: 0,
      }, {
        studenteAcademyId: 500,
        key: 500,
        xp: 8,
        name: 'Coccinella Federico',
        nameSortable: 'Federico Coccinella',
        lezioneRaggiunta: 0,
        completata: false,
        inCorso: false,
        percentualeErrori: 16,
      }], {
        field: 'campo5',
        sort: 'asc',
        type: 'number',
      }
    )));

    expect(gen.next().value).toEqual(put(unitaAndamentoSpinnerSet(false)));
  });

  it('lettura dati con errore', () => {
    const gen = unitaAndamentoFetchSaga({
      corsoId: 1000,
      unitaId: 2000,
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(put(unitaAndamentoFeedbackReset()));
    expect(gen.next().value).toEqual(put(unitaAndamentoSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${UNITA_ANDAMENTO_URL_CLASSE_FETCH}1000/2000`
    ));

    expect(gen.throw('errore').value).toEqual(put(unitaAndamentoFeedbackSet(
      true,
      'error',
      'Le statistiche di andamento di questa unità non possono essere caricate'
    )));

    expect(gen.next().value).toEqual(put(unitaAndamentoSpinnerSet(false)));
  });
});


describe('watchUnitaAndamento', () => {
  it('testo che funzioni come atteso', () => {
    const gen = watchUnitaAndamento();

    expect(gen.next().value).toEqual(takeEvery(
      UNITA_ANDAMENTO_FETCH,
      unitaAndamentoFetchSaga
    ));
    expect(gen.next().value).toEqual(takeEvery(
      UNITA_ANDAMENTO_SORT,
      unitaAndamentoSortSaga
    ));
  });
});

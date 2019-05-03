import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import {
  classiSpinnerSet,
  classiFeedbackReset,
  classiFeedbackSet,
  classiDataSet,
} from '../actions';
import { CLASSI_DATA_FETCH, CLASSI_URI_DATA_FETCH } from '../constants';
import { sagaFetchClassi, classiWatch } from '../saga';


/* eslint-disable redux-saga/yield-effects */
describe('sagaFetchClassi saga', () => {
  const fetchClassiCall = call(
    axios.get,
    `${API_BASE_PATH}${CLASSI_URI_DATA_FETCH}21`
  );
  const mockResponseData = { nome: 'nome', pk: 1234 };

  it('testa il corretto funzionamento quando il fetch dei dati ha successo', () => {
    const gen = sagaFetchClassi({ idDisciplina: 21 });

    expect(gen.next().value).toEqual(put(
      classiSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      classiFeedbackReset()
    ));

    expect(gen.next().value).toEqual(fetchClassiCall);

    expect(gen.next({ data: { nome: 'nome', pk: 1234 } }).value).toEqual(put(
      classiDataSet(mockResponseData)
    ));

    expect(gen.next().value).toEqual(put(
      classiSpinnerSet(false)
    ));
  });

  it('testa il corretto funzionamento quando il fetch dei dati dà errore', () => {
    const gen = sagaFetchClassi({ idDisciplina: 21 });

    expect(gen.next().value).toEqual(put(
      classiSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      classiFeedbackReset()
    ));

    expect(gen.next().value).toEqual(fetchClassiCall);

    expect(gen.next().value).toEqual(put(
      classiFeedbackSet(
        true,
        'Impossibile leggere le classi'
      )
    ));

    expect(gen.next().value).toEqual(put(
      classiSpinnerSet(false)
    ));
  });
});

describe('classiWatch saga', () => {
  it('must call classiWatch functions', () => {
    const gen = classiWatch();

    expect(gen.next().value).toEqual(takeEvery(
      CLASSI_DATA_FETCH,
      sagaFetchClassi,
    ));
  });
});

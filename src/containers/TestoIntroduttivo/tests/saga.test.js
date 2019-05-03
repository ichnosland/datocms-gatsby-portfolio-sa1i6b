import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import {
  testoIntroduttivoSpinnerSet,
  testoIntroduttivoErrorReset,
  testoIntroduttivoErrorSet,
  testoIntroduttivoDataSet,
} from '../actions';
import { TESTOINTRODUTTIVO_DATA_FETCH, TESTOINTRODUTTIVO_URI_DATA_FETCH } from '../constants';
import { sagaFetchTestoIntroduttivo, testoIntroduttivoWatch } from '../saga';


/* eslint-disable redux-saga/yield-effects */
describe('sagaFetchTestoIntroduttivo saga', () => {
  const fetchTestoCall = call(
    axios.get,
    `${API_BASE_PATH}${TESTOINTRODUTTIVO_URI_DATA_FETCH}123`
  );
  const mockResponseData = { titolo: 'titolo', contenuto: 'contenuto' };

  it('testa il corretto funzionamento quando il fetch dei dati ha successo', () => {
    const gen = sagaFetchTestoIntroduttivo({ idTestoIntroduttivo: 123 });

    expect(gen.next().value).toEqual(put(
      testoIntroduttivoSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      testoIntroduttivoErrorReset()
    ));

    expect(gen.next().value).toEqual(fetchTestoCall);

    expect(gen.next({ data: { titolo: 'titolo', contenuto: 'contenuto' } }).value).toEqual(put(
      testoIntroduttivoDataSet(mockResponseData)
    ));

    expect(gen.next().value).toEqual(put(
      testoIntroduttivoSpinnerSet(false)
    ));
  });

  it('testa il corretto funzionamento quando il fetch dei dati dà errore', () => {
    const gen = sagaFetchTestoIntroduttivo({ idTestoIntroduttivo: 123 });

    expect(gen.next().value).toEqual(put(
      testoIntroduttivoSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      testoIntroduttivoErrorReset()
    ));

    expect(gen.next().value).toEqual(fetchTestoCall);

    expect(gen.next().value).toEqual(put(
      testoIntroduttivoErrorSet(
        true,
        'Impossibile leggere il testo introduttivo per questa missione'
      )
    ));

    expect(gen.next().value).toEqual(put(
      testoIntroduttivoSpinnerSet(false)
    ));
  });
});

describe('testoIntroduttivoWatch saga', () => {
  it('must call testoIntroduttivoWatch functions', () => {
    const gen = testoIntroduttivoWatch();

    expect(gen.next().value).toEqual(takeEvery(
      TESTOINTRODUTTIVO_DATA_FETCH,
      sagaFetchTestoIntroduttivo,
    ));
  });
});

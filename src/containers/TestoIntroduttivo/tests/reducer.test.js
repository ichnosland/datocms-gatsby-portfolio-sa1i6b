import { fromJS } from 'immutable';

import testoIntroduttivoReducer, {
  defaultTestoIntroduttivoError,
  defaultTestoAttivo,
} from '../reducer';
import {
  testoIntroduttivoDataFetch,
  testoIntroduttivoDataSet,
  testoIntroduttivoDataReset,
  testoIntroduttivoErrorReset,
  testoIntroduttivoErrorSet,
  testoIntroduttivoSpinnerSet,
} from '../actions';


describe('testoIntroduttivoReducer reducer', () => {
  const constMockTestoIntroduttivo = fromJS({
    spinner: true,
    testoData: defaultTestoAttivo,
    error: defaultTestoIntroduttivoError,
  });

  it('should return the initial state when no state is provided', () => {
    expect(
      testoIntroduttivoReducer(undefined, { type: undefined })
    ).toEqual(constMockTestoIntroduttivo);
  });

  it('should return the initial state when TESTOINTRODUTTIVO_DATA_FETCH action is provided', () => {
    expect(
      testoIntroduttivoReducer(constMockTestoIntroduttivo, testoIntroduttivoDataFetch())
    ).toEqual(constMockTestoIntroduttivo);
  });

  it('should return the initial state when TESTOINTRODUTTIVO_DATA_SET action is provided', () => {
    expect(
      testoIntroduttivoReducer(constMockTestoIntroduttivo, testoIntroduttivoDataSet({
        titolo: 'nuovo titolo',
        testo: 'nuovo testo',
      }))
    ).toEqual(constMockTestoIntroduttivo.merge({
      testoData: {
        titolo: 'nuovo titolo',
        testo: 'nuovo testo',
      },
    }));
  });

  it('should return the initial state when TESTOINTRODUTTIVO_SPINNER_SET action is provided', () => {
    expect(
      testoIntroduttivoReducer(constMockTestoIntroduttivo, testoIntroduttivoSpinnerSet(true))
    ).toEqual(constMockTestoIntroduttivo.merge({
      spinner: true,
    }));
  });

  it('should return the initial state when TESTOINTRODUTTIVO_ERROR_SET action is provided', () => {
    expect(
      testoIntroduttivoReducer(undefined, testoIntroduttivoErrorSet(true, 'Errore'))
    ).toEqual(constMockTestoIntroduttivo.merge({
      spinner: false,
      error: {
        hasErrors: true,
        errorMessage: 'Errore',
        errorData: {},
      },
    }));
  });

  it('should return the initial state when TESTOINTRODUTTIVO_ERROR_RESET action is provided', () => {
    expect(
      testoIntroduttivoReducer(constMockTestoIntroduttivo.merge({
        error: {
          hasErrors: true,
          errorMessage: 'Errore',
          errorData: {},
        },
      }), testoIntroduttivoErrorReset())
    ).toEqual(constMockTestoIntroduttivo);
  });

  it('should return the initial state when TESTOINTRODUTTIVO_DATA_RESET action is provided', () => {
    expect(
      testoIntroduttivoReducer(constMockTestoIntroduttivo.merge({
        testoData: {
          titolo: 'titolo',
          testo: 'testo',
        },
      }), testoIntroduttivoDataReset())
    ).toEqual(constMockTestoIntroduttivo);
  });
});

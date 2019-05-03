import { fromJS } from 'immutable';

import lezioneReducer, {
  defaultLezioneError,
  defaultTestoAttivo,
} from '../reducer';
import {
  lezioneDataFetch,
  lezioneDataSet,
  lezioneDataReset,
  lezioneErrorReset,
  lezioneErrorSet,
  lezioneSpinnerSet,
} from '../actions';


describe('lezioneReducer reducer', () => {
  const constMockLezione = fromJS({
    spinner: true,
    testoData: defaultTestoAttivo,
    error: defaultLezioneError,
  });

  it('should return the initial state when no state is provided', () => {
    expect(
      lezioneReducer(undefined, { type: undefined })
    ).toEqual(constMockLezione);
  });

  it('should return the initial state when LEZIONE_DATA_FETCH action is provided', () => {
    expect(
      lezioneReducer(constMockLezione, lezioneDataFetch())
    ).toEqual(constMockLezione);
  });

  it('should return the initial state when LEZIONE_DATA_SET action is provided', () => {
    expect(
      lezioneReducer(constMockLezione, lezioneDataSet({
        unitaId: 43,
        titolo: 'nuovo titolo',
        contenuto: [1, 2, 3],
        tabelle: [4, 5, 6],
        pubblicata: true,
      }))
    ).toEqual(constMockLezione.merge({
      testoData: {
        titolo: 'nuovo titolo',
        contenuto: [1, 2, 3],
        tabelle: [4, 5, 6],
        pubblicata: true,
        unitaId: 43,
      },
    }));
  });

  it('should return the initial state when LEZIONE_SPINNER_SET action is provided', () => {
    expect(
      lezioneReducer(constMockLezione, lezioneSpinnerSet(true))
    ).toEqual(constMockLezione.merge({
      spinner: true,
    }));
  });

  it('should return the initial state when LEZIONE_ERROR_SET action is provided', () => {
    expect(
      lezioneReducer(undefined, lezioneErrorSet(true, 'Errore'))
    ).toEqual(constMockLezione.merge({
      spinner: false,
      error: {
        hasErrors: true,
        errorMessage: 'Errore',
        errorData: {},
      },
    }));
  });

  it('should return the initial state when LEZIONE_ERROR_RESET action is provided', () => {
    expect(
      lezioneReducer(constMockLezione.merge({
        error: {
          hasErrors: true,
          errorMessage: 'Errore',
          errorData: {},
        },
      }), lezioneErrorReset())
    ).toEqual(constMockLezione);
  });

  it('should return the initial state when LEZIONE_DATA_RESET action is provided', () => {
    expect(
      lezioneReducer(constMockLezione.merge({
        testoData: {
          titolo: 'titolo',
          testo: 'testo',
        },
      }), lezioneDataReset())
    ).toEqual(constMockLezione);
  });
});

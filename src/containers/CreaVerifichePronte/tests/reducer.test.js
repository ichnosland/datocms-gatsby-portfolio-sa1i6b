/*
 *
 * CreaVerifichePronte reducer test
 *
 */

import { fromJS } from 'immutable';

import creaVerifichePronteReducer, { defaultVerifichePronte } from '../reducer';
import {
  creaverificheVerifichePronteFetch,
  creaverificheVerifichePronteFetchError,
  creaverificheVerifichePronteSet,
  creaverificheVerifichePronteSpinnerSet,
  creaverificheVerifichePronteEserciziFetch,
} from '../actions';

describe('CreaVerifichePronte reducer', () => {
  const mockState = {
    spinner: true,
    spinnerLoadEsercizio: false,
    loadingPrerequisitoVerifica: -1,
    verifichePronte: [],
    messaggioErrore: '',
  };
  it('should return the initial state', () => {
    expect(
      creaVerifichePronteReducer(undefined, { type: undefined })
    ).toEqual(defaultVerifichePronte);
  });

  it('should return combined state after CREA_VERIFICHE_PRONTE_FETCH action is triggered', () => {
    expect(
      creaVerifichePronteReducer(fromJS(mockState), creaverificheVerifichePronteFetch())
    ).toEqual(fromJS(mockState));
  });

  it('should return combined state after CREA_VERIFICHE_PRONTE_SET action is triggered', () => {
    expect(
      creaVerifichePronteReducer(fromJS(mockState), creaverificheVerifichePronteSet({
        verifichePronte: [1, 2, 3],
      }))
    ).toEqual(fromJS({ ...mockState, verifichePronte: [1, 2, 3] }));
  });

  it('should return combined state after CREA_VERIFICHE_PRONTE_FETCH_ERROR action is triggered', () => {
    expect(
      creaVerifichePronteReducer(fromJS(mockState), creaverificheVerifichePronteFetchError(
        'Messaggio di errore'
      ))
    ).toEqual(fromJS({ ...mockState, messaggioErrore: 'Messaggio di errore' }));
  });

  it('should return combined state after CREA_VERIFICHE_PRONTE_SPINNER_SET action is triggered', () => {
    expect(
      creaVerifichePronteReducer(fromJS(mockState), creaverificheVerifichePronteSpinnerSet(false))
    ).toEqual(fromJS({ ...mockState, spinner: false }));
  });

  it('should return combined state after CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI action is triggered', () => {
    expect(
      creaVerifichePronteReducer(fromJS(mockState), creaverificheVerifichePronteEserciziFetch(true))
    ).toEqual(fromJS({ ...mockState }));
  });
});

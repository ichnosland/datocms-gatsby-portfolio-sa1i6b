/*
 *
 * CreaVerifichePronte actions tests
 *
 */

import {
  creaverificheVerifichePronteFetch,
  creaverificheVerifichePronteFetchError,
  creaverificheVerifichePronteSet,
  creaverificheVerifichePronteSpinnerSet,
  creaverificheVerifichePronteEserciziFetch,
} from '../actions';
import {
  CREA_VERIFICHE_PRONTE_FETCH,
  CREA_VERIFICHE_PRONTE_FETCH_ERROR,
  CREA_VERIFICHE_PRONTE_SET,
  CREA_VERIFICHE_PRONTE_SPINNER_SET,
  CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI,
} from '../constants';

describe('CreaVerifichePronte Actions', () => {
  it('check creaverificheVerifichePronteFetch output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PRONTE_FETCH,
      disciplinaId: 'disciplinaId',
    };
    expect(
      creaverificheVerifichePronteFetch('disciplinaId')
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerifichePronteFetchError output is correct when no message is provided', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PRONTE_FETCH_ERROR,
      messaggio: 'Impossibile caricare l\'elenco delle verifiche pronte',
    };
    expect(
      creaverificheVerifichePronteFetchError()
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerifichePronteFetchError output is correct when no message is provided', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PRONTE_FETCH_ERROR,
      messaggio: 'Messaggio',
    };
    expect(
      creaverificheVerifichePronteFetchError('Messaggio')
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerifichePronteSet output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PRONTE_SET,
      payload: { data: 123 },
    };
    expect(
      creaverificheVerifichePronteSet({ data: 123 })
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerifichePronteSpinnerSet output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PRONTE_SPINNER_SET,
      enabled: true,
    };
    expect(
      creaverificheVerifichePronteSpinnerSet(expectedAction.enabled)
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerifichePronteEserciziFetch output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI,
      payload: { data: 123 },
    };
    expect(
      creaverificheVerifichePronteEserciziFetch(expectedAction.payload)
    ).toEqual(expectedAction);
  });
});

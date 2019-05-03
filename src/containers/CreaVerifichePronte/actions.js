/*
 *
 * CreaVerifichePronte actions
 *
 */

import {
  CREA_VERIFICHE_PRONTE_FETCH,
  CREA_VERIFICHE_PRONTE_FETCH_ERROR,
  CREA_VERIFICHE_PRONTE_SET,
  CREA_VERIFICHE_PRONTE_SPINNER_SET,
  CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI,
} from './constants';

export const creaverificheVerifichePronteFetch = (disciplinaId) => ({
  type: CREA_VERIFICHE_PRONTE_FETCH,
  disciplinaId,
});

export const creaverificheVerifichePronteFetchError = (messaggio = 'Impossibile caricare l\'elenco delle verifiche pronte') => ({
  type: CREA_VERIFICHE_PRONTE_FETCH_ERROR,
  messaggio,
});

export const creaverificheVerifichePronteSet = (payload) => ({
  type: CREA_VERIFICHE_PRONTE_SET,
  payload,
});

export const creaverificheVerifichePronteSpinnerSet = (enabled) => ({
  type: CREA_VERIFICHE_PRONTE_SPINNER_SET,
  enabled,
});

export const creaverificheVerifichePronteEserciziFetch = (payload) => ({
  type: CREA_VERIFICHE_PRONTE_FETCH_ESERCIZI,
  payload,
});

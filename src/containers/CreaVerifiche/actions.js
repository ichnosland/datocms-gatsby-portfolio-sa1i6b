/*
 *
 * CreaVerifiche actions
 *
 */

import {
  CREA_VERIFICHE_FETCH,
  CREA_VERIFICHE_FETCH_ERROR,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH_ERROR,
  CREA_VERIFICHE_SET,
  CREA_VERIFICHE_SPINNER_SET,
  CREA_VERIFICHE_POST,
  CREA_VERIFICHE_POST_ERROR,
  CREA_VERIFICHE_VERIFICA_SET,
  CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD,
  CREA_VERIFICHE_VERIFICA_ESERCIZIO_REMOVE,
  CREA_VERIFICHE_VERIFICA_RIEPILOGO_VIEW,
} from './constants';

export const creaverificheVerificaPostError = (messaggio = 'Impossibile inviare i dati') => ({
  type: CREA_VERIFICHE_POST_ERROR,
  messaggio,
});

export const creaverificheVerificaPost = (payload) => ({
  type: CREA_VERIFICHE_POST,
  payload,
});

export const creaverificheVerificaEserciziFetch = (prerequisito) => ({
  type: CREA_VERIFICHE_FETCH,
  prerequisito,
});

export const creaverificheVerificaEserciziFetchError = (messaggio = 'Impossibile caricare l\'elenco degli esercizi disponibili') => ({
  type: CREA_VERIFICHE_FETCH_ERROR,
  messaggio,
});

export const creaverificheVerificaEsercizioPreviewFetch = (esercizioId) => ({
  type: CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH,
  esercizioId,
});

export const creaverificheVerificaEsercizioPreviewFetchError = (
  messaggio = 'Impossibile caricare l\'elenco degli step per questo esercizio'
) => ({
  type: CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH_ERROR,
  messaggio,
});

export const creaverificheVerificaEserciziSet = (payload) => ({
  type: CREA_VERIFICHE_SET,
  payload,
});

export const creaverificheVerificaEserciziSpinnerSet = (enabled) => ({
  type: CREA_VERIFICHE_SPINNER_SET,
  enabled,
});

export const creaverificheVerificaSet = (payload) => ({
  type: CREA_VERIFICHE_VERIFICA_SET,
  payload,
});

export const creaverificheVerificaEsercizioAdd = (step) => ({
  type: CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD,
  step,
});

export const creaverificheVerificaEsercizioRemove = (step) => ({
  type: CREA_VERIFICHE_VERIFICA_ESERCIZIO_REMOVE,
  step,
});

export const creaverificheVerificaRiepilogoView = (enabled) => ({
  type: CREA_VERIFICHE_VERIFICA_RIEPILOGO_VIEW,
  enabled,
});

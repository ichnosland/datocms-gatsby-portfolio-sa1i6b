/*
 *
 * ClasseCreazione actions
 *
 */

import {
  CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH,
  CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET,
  CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH,
  CLASSE_CREAZIONE_GEO_SET,
  CLASSE_CREAZIONE_GEO_COMUNI_FETCH,
  CLASSE_CREAZIONE_GEO_COMUNI_SET,
  CLASSE_CREAZIONE_DATA_SET,
  CLASSE_CREAZIONE_DATA_POST,
  CLASSE_CREAZIONE_RESET,
  CLASSE_CREAZIONE_SPINNER_SET,
  CLASSE_CREAZIONE_FEEDBACK_SET,
  CLASSE_CREAZIONE_FEEDBACK_RESET,
  CLASSE_CREAZIONE_GEO_SCUOLE_SET,
} from './constants';


export const classeCreazioneScuoleAttiveFetch = () => ({
  type: CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH,
});

export const classeCreazioneScuoleAttiveSet = (payload) => ({
  type: CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET,
  payload,
});

export const classeCreazioneGeoProvinciaFetch = () => ({
  type: CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH,
});

export const classeCreazioneGeoSet = (payload) => ({
  type: CLASSE_CREAZIONE_GEO_SET,
  payload,
});

export const classeCreazioneGeoComuneFetch = (sigla) => ({
  type: CLASSE_CREAZIONE_GEO_COMUNI_FETCH,
  sigla,
});

export const classeCreazioneGeoComuneSet = (payload) => ({
  type: CLASSE_CREAZIONE_GEO_COMUNI_SET,
  payload,
});

export const classeCreazioneGeoScuoleSet = (payload) => ({
  type: CLASSE_CREAZIONE_GEO_SCUOLE_SET,
  payload,
});

export const classeCreazioneDataSet = (payload) => ({
  type: CLASSE_CREAZIONE_DATA_SET,
  payload,
});

export const classeCreazioneDataPost = (payload, history) => ({
  type: CLASSE_CREAZIONE_DATA_POST,
  payload,
  history,
});

export const classeCreazioneReset = () => ({
  type: CLASSE_CREAZIONE_RESET,
});

export const classeCreazioneSpinnerSet = (enable) => ({
  type: CLASSE_CREAZIONE_SPINNER_SET,
  enable,
});

export const classeCreazioneFeedbackSet = (enable, tipologia, messaggio) => ({
  type: CLASSE_CREAZIONE_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const classeCreazioneFeedbackReset = () => ({
  type: CLASSE_CREAZIONE_FEEDBACK_RESET,
});

/*
 *
 * ClasseDettaglio actions
 *
 */

import {
  CLASSE_DETTAGLIO_ESPELLI,
  CLASSE_DETTAGLIO_RESET,
  CLASSE_DETTAGLIO_DATA_FETCH,
  CLASSE_DETTAGLIO_CORSO_FETCH,
  CLASSE_DETTAGLIO_CONTENUTO_SET,
  CLASSE_DETTAGLIO_DISPLAY_SET,
  CLASSE_DETTAGLIO_DISPLAY_SORT,
  CLASSE_DETTAGLIO_FEEDBACK_SET,
  CLASSE_DETTAGLIO_FEEDBACK_RESET,
  CLASSE_DETTAGLIO_SPINNER_SET,
} from './constants';

export const classeDettaglioEspelli = (payload) => ({
  type: CLASSE_DETTAGLIO_ESPELLI,
  payload,
});

export const classeDettaglioReset = () => ({
  type: CLASSE_DETTAGLIO_RESET,
});

export const classeDettaglioCorsoFetch = (payload) => ({
  type: CLASSE_DETTAGLIO_CORSO_FETCH,
  payload,
});

export const classeDettaglioDataFetch = (payload) => ({
  type: CLASSE_DETTAGLIO_DATA_FETCH,
  payload,
});

export const classeDettaglioContenutoSet = (payload) => ({
  type: CLASSE_DETTAGLIO_CONTENUTO_SET,
  payload,
});

export const classeDettaglioDisplaySort = (payloadData, sortingData) => ({
  type: CLASSE_DETTAGLIO_DISPLAY_SORT,
  payloadData,
  sortingData,
});

export const classeDettaglioDisplaySet = (payload) => ({
  type: CLASSE_DETTAGLIO_DISPLAY_SET,
  payload,
});

export const classeDettaglioFeedbackSet = (hasFeedback, tipologia, messaggio) => ({
  type: CLASSE_DETTAGLIO_FEEDBACK_SET,
  hasFeedback,
  tipologia,
  messaggio,
});

export const classeDettaglioFeedbackReset = () => ({
  type: CLASSE_DETTAGLIO_FEEDBACK_RESET,
});

export const classeDettaglioSpinnerSet = (enable) => ({
  type: CLASSE_DETTAGLIO_SPINNER_SET,
  enable,
});

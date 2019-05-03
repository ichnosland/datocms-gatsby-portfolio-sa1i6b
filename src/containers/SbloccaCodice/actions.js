/*
 *
 * SbloccaCodice actions
 *
 */

import {
  SBLOCCACODICE_SBLOCCA_POST,
  SBLOCCACODICE_SPINNER_SET,
  SBLOCCACODICE_FEEDBACK_SET,
  SBLOCCACODICE_FEEDBACK_RESET,
  SBLOCCACODICE_ACQUISTA_SET,
  SBLOCCACODICE_ACQUISTA_RESET,
  SBLOCCACODICE_ACQUISTA_FETCH,
  SBLOCCACODICE_ACQUISTA_POST,
} from './constants';

export const sbloccaCodiceSbloccaPost = (codice, configuration, history) => ({
  type: SBLOCCACODICE_SBLOCCA_POST,
  codice,
  configuration,
  history,
});

export const sbloccaCodiceSpinnerSet = (enable) => ({
  type: SBLOCCACODICE_SPINNER_SET,
  enable,
});

export const sbloccaCodiceFeedbackSet = (enable, tipologia, messaggio) => ({
  type: SBLOCCACODICE_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const sbloccaCodiceFeedbackReset = () => ({
  type: SBLOCCACODICE_FEEDBACK_RESET,
});

export const sbloccaCodiceAcquistaSet = (payload) => ({
  type: SBLOCCACODICE_ACQUISTA_SET,
  payload,
});

export const sbloccaCodiceAcquistaReset = () => ({
  type: SBLOCCACODICE_ACQUISTA_RESET,
});

export const sbloccaCodiceAcquistaFetch = (disciplina) => ({
  type: SBLOCCACODICE_ACQUISTA_FETCH,
  disciplina,
});

export const sbloccaCodiceAcquistaPost = (paypalId, orderData, configuration, ticketData) => ({
  type: SBLOCCACODICE_ACQUISTA_POST,
  paypalId,
  orderData,
  configuration,
  ticketData,
});

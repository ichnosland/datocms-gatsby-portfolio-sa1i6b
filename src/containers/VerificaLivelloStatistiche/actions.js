/*
 *
 * VerificaLivelloStatistiche actions
 *
 */

import {
  VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH,
  VERIFICA_LIVELLO_STATISTICHE_DATA_SET,
  VERIFICA_LIVELLO_STATISTICHE_DATA_RESET,
  VERIFICA_LIVELLO_STATISTICHE_SPINNER_SET,
  VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_SET,
  VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_RESET,
  VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT,
  VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
} from './constants';

export const verificaLivelloStatisticheDataFetch = (payload) => ({
  type: VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH,
  payload,
});

export const verificaLivelloStatisticheDataSet = (payload) => ({
  type: VERIFICA_LIVELLO_STATISTICHE_DATA_SET,
  payload,
});

export const verificaLivelloStatisticheDataSelect = (payload) => ({
  type: VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT,
  payload,
});

export const verificaLivelloStatisticheSpinnerSet = (enabled) => ({
  type: VERIFICA_LIVELLO_STATISTICHE_SPINNER_SET,
  enabled,
});

export const verificaLivelloStatisticheDataReset = () => ({
  type: VERIFICA_LIVELLO_STATISTICHE_DATA_RESET,
});

export const verificaLivelloStatisticheFeedbackSet = (enabled, tipologia, messaggio) => ({
  type: VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_SET,
  enabled,
  tipologia,
  messaggio,
});

export const verificaLivelloStatisticheFeedbackReset = () => ({
  type: VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_RESET,
});

export const verificaLivelloStatisticheDidascaliaSet = (payload) => ({
  type: VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  payload,
});

export const verificaLivelloStatisticheDidascaliaReset = () => ({
  type: VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
});

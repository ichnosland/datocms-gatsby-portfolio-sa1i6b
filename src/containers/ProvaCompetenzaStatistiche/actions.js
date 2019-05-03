/*
 *
 * ProvaCompetenzaStatistiche actions
 *
 */

import {
  PROVA_COMPETENZA_STATISTICHE_DATA_FETCH,
  PROVA_COMPETENZA_STATISTICHE_DATA_SET,
  PROVA_COMPETENZA_STATISTICHE_DATA_RESET,
  PROVA_COMPETENZA_STATISTICHE_SPINNER_SET,
  PROVA_COMPETENZA_STATISTICHE_FEEDBACK_SET,
  PROVA_COMPETENZA_STATISTICHE_FEEDBACK_RESET,
  PROVA_COMPETENZA_STATISTICHE_DATA_SELECT,
  PROVA_COMPETENZA_DIDASCALIA_SET,
  PROVA_COMPETENZA_DIDASCALIA_RESET,
} from './constants';

export const provaCompetenzaStatisticheDataFetch = (payload) => ({
  type: PROVA_COMPETENZA_STATISTICHE_DATA_FETCH,
  payload,
});

export const provaCompetenzaStatisticheDataSet = (payload) => ({
  type: PROVA_COMPETENZA_STATISTICHE_DATA_SET,
  payload,
});

export const provaCompetenzaStatisticheDataSelect = (payload) => ({
  type: PROVA_COMPETENZA_STATISTICHE_DATA_SELECT,
  payload,
});

export const provaCompetenzaStatisticheSpinnerSet = (enabled) => ({
  type: PROVA_COMPETENZA_STATISTICHE_SPINNER_SET,
  enabled,
});

export const provaCompetenzaStatisticheDataReset = () => ({
  type: PROVA_COMPETENZA_STATISTICHE_DATA_RESET,
});

export const provaCompetenzaStatisticheFeedbackSet = (enabled, tipologia, messaggio) => ({
  type: PROVA_COMPETENZA_STATISTICHE_FEEDBACK_SET,
  enabled,
  tipologia,
  messaggio,
});

export const provaCompetenzaStatisticheFeedbackReset = () => ({
  type: PROVA_COMPETENZA_STATISTICHE_FEEDBACK_RESET,
});

export const provaCompetenzaDidascaliaSet = (payload) => ({
  type: PROVA_COMPETENZA_DIDASCALIA_SET,
  payload,
});

export const provaCompetenzaDidascaliaReset = () => ({
  type: PROVA_COMPETENZA_DIDASCALIA_RESET,
});

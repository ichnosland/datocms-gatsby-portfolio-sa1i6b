/*
 *
 * VersioniStatistiche actions
 *
 */

import {
  VERSIONI_STATISTICHE_DATA_FETCH,
  VERSIONI_STATISTICHE_DATA_SET,
  VERSIONI_STATISTICHE_DATA_RESET,
  VERSIONI_STATISTICHE_SPINNER_SET,
  VERSIONI_STATISTICHE_FEEDBACK_SET,
  VERSIONI_STATISTICHE_FEEDBACK_RESET,
  VERSIONI_STATISTICHE_DATA_SELECT,
  VERSIONI_STATISTICHE_DIDASCALIA_SET,
  VERSIONI_STATISTICHE_DIDASCALIA_RESET,
} from './constants';

export const versioniStatisticheDataFetch = (payload) => ({
  type: VERSIONI_STATISTICHE_DATA_FETCH,
  payload,
});

export const versioniStatisticheDataSet = (payload) => ({
  type: VERSIONI_STATISTICHE_DATA_SET,
  payload,
});

export const versioniStatisticheDataSelect = (payload) => ({
  type: VERSIONI_STATISTICHE_DATA_SELECT,
  payload,
});

export const versioniStatisticheSpinnerSet = (enabled) => ({
  type: VERSIONI_STATISTICHE_SPINNER_SET,
  enabled,
});

export const versioniStatisticheDataReset = () => ({
  type: VERSIONI_STATISTICHE_DATA_RESET,
});

export const versioniStatisticheFeedbackSet = (enabled, tipologia, messaggio) => ({
  type: VERSIONI_STATISTICHE_FEEDBACK_SET,
  enabled,
  tipologia,
  messaggio,
});

export const versioniStatisticheFeedbackReset = () => ({
  type: VERSIONI_STATISTICHE_FEEDBACK_RESET,
});

export const versioniStatisticheDidascaliaSet = (payload) => ({
  type: VERSIONI_STATISTICHE_DIDASCALIA_SET,
  payload,
});

export const versioniStatisticheDidascaliaReset = () => ({
  type: VERSIONI_STATISTICHE_DIDASCALIA_RESET,
});

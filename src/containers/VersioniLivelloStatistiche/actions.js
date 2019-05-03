/*
 *
 * VersioniLivelloStatistiche actions
 *
 */

import {
  VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH,
  VERSIONI_LIVELLO_STATISTICHE_DATA_SET,
  VERSIONI_LIVELLO_STATISTICHE_DATA_RESET,
  VERSIONI_LIVELLO_STATISTICHE_SPINNER_SET,
  VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_SET,
  VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_RESET,
  VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT,
  VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
} from './constants';

export const versioniLivelloStatisticheDataFetch = (payload) => ({
  type: VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH,
  payload,
});

export const versioniLivelloStatisticheDataSet = (payload) => ({
  type: VERSIONI_LIVELLO_STATISTICHE_DATA_SET,
  payload,
});

export const versioniLivelloStatisticheDataSelect = (payload) => ({
  type: VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT,
  payload,
});

export const versioniLivelloStatisticheSpinnerSet = (enabled) => ({
  type: VERSIONI_LIVELLO_STATISTICHE_SPINNER_SET,
  enabled,
});

export const versioniLivelloStatisticheDataReset = () => ({
  type: VERSIONI_LIVELLO_STATISTICHE_DATA_RESET,
});

export const versioniLivelloStatisticheFeedbackSet = (enabled, tipologia, messaggio) => ({
  type: VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_SET,
  enabled,
  tipologia,
  messaggio,
});

export const versioniLivelloStatisticheFeedbackReset = () => ({
  type: VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_RESET,
});

export const versioniLivelloStatisticheDidascaliaSet = (payload) => ({
  type: VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  payload,
});

export const versioniLivelloStatisticheDidascaliaReset = () => ({
  type: VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
});

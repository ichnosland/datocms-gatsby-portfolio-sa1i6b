/*
 *
 * Lezione actions
 *
 */

import {
  LEZIONE_DATA_FETCH,
  LEZIONE_DATA_SET,
  LEZIONE_DATA_RESET,
  LEZIONE_ERROR_RESET,
  LEZIONE_ERROR_SET,
  LEZIONE_SPINNER_SET,
} from './constants';

export const lezioneDataFetch = (idLezione) => ({
  type: LEZIONE_DATA_FETCH,
  idLezione,
});

export const lezioneDataSet = (payload) => ({
  type: LEZIONE_DATA_SET,
  payload,
});

export const lezioneDataReset = () => ({
  type: LEZIONE_DATA_RESET,
});

export const lezioneErrorReset = () => ({
  type: LEZIONE_ERROR_RESET,
});

export const lezioneErrorSet = (enable = true, message = '', errorData = {}) => ({
  type: LEZIONE_ERROR_SET,
  enable,
  message,
  errorData,
});

export const lezioneSpinnerSet = (enable) => ({
  type: LEZIONE_SPINNER_SET,
  enable,
});

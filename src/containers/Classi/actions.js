/*
 *
 * Classi actions
 *
 */

import {
  CLASSI_DATA_FETCH,
  CLASSI_DATA_SET,
  CLASSI_DATA_RESET,
  CLASSI_FEEDBACK_RESET,
  CLASSI_FEEDBACK_SET,
  CLASSI_SPINNER_SET,
} from './constants';

export const classiDataFetch = (idDisciplina) => ({
  type: CLASSI_DATA_FETCH,
  idDisciplina,
});

export const classiDataSet = (payload) => ({
  type: CLASSI_DATA_SET,
  payload,
});

export const classiDataReset = () => ({
  type: CLASSI_DATA_RESET,
});

export const classiFeedbackReset = () => ({
  type: CLASSI_FEEDBACK_RESET,
});

export const classiFeedbackSet = (enable = true, message = '', errorData = {}) => ({
  type: CLASSI_FEEDBACK_SET,
  enable,
  message,
  errorData,
});

export const classiSpinnerSet = (enable) => ({
  type: CLASSI_SPINNER_SET,
  enable,
});

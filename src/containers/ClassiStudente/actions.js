/*
 *
 * ClassiStudente actions
 *
 */

import {
  CLASSI_STUDENTE_FETCH,
  CLASSI_STUDENTE_SET,
  CLASSI_STUDENTE_RESET,
  CLASSI_STUDENTE_ISCRIVITI_POST,
  CLASSI_STUDENTE_SPINNER_SET,
  CLASSI_STUDENTE_FEEDBACK_SET,
  CLASSI_STUDENTE_FEEDBACK_RESET,
} from './constants';

export const classiStudenteFetch = (disciplinaId) => ({
  type: CLASSI_STUDENTE_FETCH,
  disciplinaId,
});

export const classiStudenteSet = (payload) => ({
  type: CLASSI_STUDENTE_SET,
  payload,
});

export const classiStudenteReset = () => ({
  type: CLASSI_STUDENTE_RESET,
});

export const classiStudenteIscrivitiPost = (codiceCorso, configuration) => ({
  type: CLASSI_STUDENTE_ISCRIVITI_POST,
  codiceCorso,
  configuration,
});

export const classiStudenteSpinnerSet = (enable) => ({
  type: CLASSI_STUDENTE_SPINNER_SET,
  enable,
});

export const classiStudenteFeedbackSet = (enable, tipologia, messaggio) => ({
  type: CLASSI_STUDENTE_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const classiStudenteFeedbackReset = () => ({
  type: CLASSI_STUDENTE_FEEDBACK_RESET,
});

/*
 *
 * Corsi actions
 *
 */

import {
  CORSI_RESET,
  CORSI_ERROR_SET,
  CORSI_ERROR_RESET,
  CORSI_SPINNER_SET,
  CORSI_LIST_INITIALIZE,
  CORSI_LIST_DOCENTE_FETCH,
  CORSI_LIST_STUDENTE_FETCH,
  CORSI_LIST_SET,
  CORSI_CORSO_DETAIL_DOCENTE_TRIGGER,
  CORSI_CORSO_DETAIL_DOCENTE_SET,
} from './constants';

export const corsiReset = () => ({
  type: CORSI_RESET,
});

export const corsiSpinnerSet = (enable) => ({
  type: CORSI_SPINNER_SET,
  enable,
});

export const corsiErrorSet = (enable = true, message = '', errorData = {}) => ({
  type: CORSI_ERROR_SET,
  enable,
  message,
  errorData,
});

export const corsiErrorReset = () => ({
  type: CORSI_ERROR_RESET,
});

export const corsiListInitialize = (configuration, isDocente, userId) => ({
  type: CORSI_LIST_INITIALIZE,
  configuration,
  isDocente,
  userId,
});

export const corsiListDocenteFetch = (idDisciplina) => ({
  type: CORSI_LIST_DOCENTE_FETCH,
  idDisciplina,
});

export const corsiListStudenteFetch = (idDisciplina) => ({
  type: CORSI_LIST_STUDENTE_FETCH,
  idDisciplina,
});

export const corsiListSet = (payload) => ({
  type: CORSI_LIST_SET,
  payload,
});

export const corsiCorsoSelectedDocenteTrigger = (idCorso, configuration, isDocente, userId) => ({
  type: CORSI_CORSO_DETAIL_DOCENTE_TRIGGER,
  idCorso,
  configuration,
  isDocente,
  userId,
});

export const corsiCorsoDetailDocenteSet = (payload) => ({
  type: CORSI_CORSO_DETAIL_DOCENTE_SET,
  payload,
});

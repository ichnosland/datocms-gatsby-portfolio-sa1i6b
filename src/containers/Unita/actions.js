/*
 *
 * Unita actions
 *
 */

import {
  UNITA_CONTENUTO_FETCH,
  UNITA_CONTENUTO_SET,
  UNITA_RESET,
  UNITA_STEP_FETCH,
  UNITA_STEP_SET,
  UNITA_STEP_RESET,
  UNITA_STEP_NEXT,
  UNITA_STEP_INITIALIZE,
  UNITA_FEEDBACK_SET,
  UNITA_FEEDBACK_RESET,
  UNITA_RISPOSTA_POST,
  UNITA_RISPOSTA_SET,
  UNITA_RISPOSTA_RESET,
  UNITA_SPINNER_SET,
  UNITA_ASSEGNA_TRIGGER,
} from './constants';

export const unitaContenutoSet = (payload) => ({
  type: UNITA_CONTENUTO_SET,
  payload,
});

export const unitaContenutoFetch = (id, corsoId = 0) => ({
  type: UNITA_CONTENUTO_FETCH,
  id,
  corsoId,
});

export const unitaStepFetch = (id, isDocente = false) => ({
  type: UNITA_STEP_FETCH,
  id,
  isDocente,
});

export const unitaStepSet = (payload) => ({
  type: UNITA_STEP_SET,
  payload,
});

export const unitaStepInitialize = (payload) => ({
  type: UNITA_STEP_INITIALIZE,
  payload,
});

export const unitaStepReset = () => ({
  type: UNITA_STEP_RESET,
});

export const unitaStepNext = (payload) => ({
  type: UNITA_STEP_NEXT,
  payload,
});

export const unitaFeedbackSet = (enable, tipologia, messaggio) => ({
  type: UNITA_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const unitaFeedbackReset = () => ({
  type: UNITA_FEEDBACK_RESET,
});

export const unitaRispostaSet = (payload) => ({
  type: UNITA_RISPOSTA_SET,
  payload,
});

export const unitaRispostaPost = (payload) => ({
  type: UNITA_RISPOSTA_POST,
  payload,
});

export const unitaRispostaReset = () => ({
  type: UNITA_RISPOSTA_RESET,
});

export const unitaSpinnerSet = (enable) => ({
  type: UNITA_SPINNER_SET,
  enable,
});

export const unitaAssegna = (id, idCorso, idDisciplina) => ({
  type: UNITA_ASSEGNA_TRIGGER,
  id,
  idCorso,
  idDisciplina,
});

export const unitaReset = () => ({
  type: UNITA_RESET,
});

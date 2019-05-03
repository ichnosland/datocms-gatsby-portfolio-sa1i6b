/*
 *
 * ProvaCompetenza actions
 *
 */

import {
  PROVA_COMPETENZA_CONTENUTO_FETCH,
  PROVA_COMPETENZA_CONTENUTO_SET,
  PROVA_COMPETENZA_RESET,
  PROVA_COMPETENZA_STEP_FETCH,
  PROVA_COMPETENZA_STEP_SET,
  PROVA_COMPETENZA_STEP_RESET,
  PROVA_COMPETENZA_STEP_NEXT,
  PROVA_COMPETENZA_STEP_INITIALIZE,
  PROVA_COMPETENZA_FEEDBACK_SET,
  PROVA_COMPETENZA_FEEDBACK_RESET,
  PROVA_COMPETENZA_RISPOSTA_POST,
  PROVA_COMPETENZA_RISPOSTA_SET,
  PROVA_COMPETENZA_RISPOSTA_RESET,
  PROVA_COMPETENZA_SPINNER_SET,
  PROVA_COMPETENZA_ASSEGNA_TRIGGER,
  PROVA_COMPETENZA_RITIRA_TRIGGER,
  PROVA_COMPETENZA_CONSEGNA,
} from './constants';

export const provaCompetenzaContenutoSet = (payload) => ({
  type: PROVA_COMPETENZA_CONTENUTO_SET,
  payload,
});

export const provaCompetenzaContenutoFetch = (id, isDocente = false, corsoId = -1) => ({
  type: PROVA_COMPETENZA_CONTENUTO_FETCH,
  id,
  isDocente,
  corsoId,
});

export const provaCompetenzaStepFetch = (id, isDocente = false) => ({
  type: PROVA_COMPETENZA_STEP_FETCH,
  id,
  isDocente,
});

export const provaCompetenzaStepSet = (payload) => ({
  type: PROVA_COMPETENZA_STEP_SET,
  payload,
});

export const provaCompetenzaStepInitialize = (payload) => ({
  type: PROVA_COMPETENZA_STEP_INITIALIZE,
  payload,
});

export const provaCompetenzaStepReset = () => ({
  type: PROVA_COMPETENZA_STEP_RESET,
});

export const provaCompetenzaStepNext = (payload) => ({
  type: PROVA_COMPETENZA_STEP_NEXT,
  payload,
});

export const provaCompetenzaFeedbackSet = (enable, tipologia, messaggio) => ({
  type: PROVA_COMPETENZA_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const provaCompetenzaFeedbackReset = () => ({
  type: PROVA_COMPETENZA_FEEDBACK_RESET,
});

export const provaCompetenzaRispostaSet = (payload) => ({
  type: PROVA_COMPETENZA_RISPOSTA_SET,
  payload,
});

export const provaCompetenzaRispostaPost = (payload) => ({
  type: PROVA_COMPETENZA_RISPOSTA_POST,
  payload,
});

export const provaCompetenzaRispostaReset = () => ({
  type: PROVA_COMPETENZA_RISPOSTA_RESET,
});

export const provaCompetenzaSpinnerSet = (enable) => ({
  type: PROVA_COMPETENZA_SPINNER_SET,
  enable,
});

export const provaCompetenzaAssegna = (id, idCorso) => ({
  type: PROVA_COMPETENZA_ASSEGNA_TRIGGER,
  id,
  idCorso,
});

export const provaCompetenzaRitira = (idAssegnazione, idCorso) => ({
  type: PROVA_COMPETENZA_RITIRA_TRIGGER,
  idAssegnazione,
  idCorso,
});

export const provaCompetenzaReset = () => ({
  type: PROVA_COMPETENZA_RESET,
});

export const provaCompetenzaConsegna = (payload) => ({
  type: PROVA_COMPETENZA_CONSEGNA,
  payload,
});

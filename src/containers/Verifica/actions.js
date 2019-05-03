/*
 *
 * Verifica actions
 *
 */

import {
  VERIFICA_LIVELLO_FETCH,
  VERIFICA_LIVELLO_SET,
  VERIFICA_LIVELLO_RESET,
  VERIFICA_LIVELLO_SPINNER_SET,
  VERIFICA_LIVELLO_PROVA_TRIGGER,
  VERIFICA_CONTENUTO_FETCH,
  VERIFICA_CONTENUTO_SET,
  VERIFICA_RESET,
  VERIFICA_STEP_FETCH,
  VERIFICA_STEP_SET,
  VERIFICA_STEP_RESET,
  VERIFICA_STEP_NEXT,
  VERIFICA_STEP_INITIALIZE,
  VERIFICA_FEEDBACK_SET,
  VERIFICA_FEEDBACK_RESET,
  VERIFICA_RISPOSTA_POST,
  VERIFICA_RISPOSTA_SET,
  VERIFICA_RISPOSTA_RESET,
  VERIFICA_SPINNER_SET,
  VERIFICA_ASSEGNA_TRIGGER,
  VERIFICA_RITIRA_TRIGGER,
  VERIFICA_CONSEGNA,
} from './constants';


export const verificaLivelloFetch = (livelloId, isDocente, corsoId = 0, idsUnita = [], soloLatino = false) => ({
  type: VERIFICA_LIVELLO_FETCH,
  livelloId,
  isDocente,
  corsoId,
  idsUnita,
  soloLatino,
});

export const verificaLivelloSet = (payload) => ({
  type: VERIFICA_LIVELLO_SET,
  payload,
});

export const verificaLivelloReset = () => ({
  type: VERIFICA_LIVELLO_RESET,
});

export const verificaLivelloSpinnerSet = (payload) => ({
  type: VERIFICA_LIVELLO_SPINNER_SET,
  payload,
});

export const verificaLivelloProvaTrigger = (payload) => ({
  type: VERIFICA_LIVELLO_PROVA_TRIGGER,
  payload,
});

export const verificaContenutoSet = (payload) => ({
  type: VERIFICA_CONTENUTO_SET,
  payload,
});

export const verificaContenutoFetch = (livelloId, isDocente = false, corsoId = 0) => ({
  type: VERIFICA_CONTENUTO_FETCH,
  livelloId,
  isDocente,
  corsoId,
});

export const verificaStepFetch = (id, isDocente = false) => ({
  type: VERIFICA_STEP_FETCH,
  id,
  isDocente,
});

export const verificaStepSet = (payload) => ({
  type: VERIFICA_STEP_SET,
  payload,
});

export const verificaStepInitialize = (payload) => ({
  type: VERIFICA_STEP_INITIALIZE,
  payload,
});

export const verificaStepReset = () => ({
  type: VERIFICA_STEP_RESET,
});

export const verificaStepNext = (payload) => ({
  type: VERIFICA_STEP_NEXT,
  payload,
});

export const verificaFeedbackSet = (enable, tipologia, messaggio) => ({
  type: VERIFICA_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const verificaFeedbackReset = () => ({
  type: VERIFICA_FEEDBACK_RESET,
});

export const verificaRispostaSet = (payload) => ({
  type: VERIFICA_RISPOSTA_SET,
  payload,
});

export const verificaRispostaPost = (payload) => ({
  type: VERIFICA_RISPOSTA_POST,
  payload,
});

export const verificaRispostaReset = () => ({
  type: VERIFICA_RISPOSTA_RESET,
});

export const verificaSpinnerSet = (enable) => ({
  type: VERIFICA_SPINNER_SET,
  enable,
});

export const verificaAssegna = (payload) => ({
  type: VERIFICA_ASSEGNA_TRIGGER,
  payload,
});

export const verificaRitira = (idVerifica, verificheAssegnate) => ({
  type: VERIFICA_RITIRA_TRIGGER,
  idVerifica,
  verificheAssegnate,
});

export const verificaReset = () => ({
  type: VERIFICA_RESET,
});

export const verificaConsegna = (payload) => ({
  type: VERIFICA_CONSEGNA,
  payload,
});

/*
 *
 * ProvaParallel actions
 *
 */

import {
  PROVA_PARALLEL_OVERVIEW_FETCH,
  PROVA_PARALLEL_OVERVIEW_SET,
  PROVA_PARALLEL_OVERVIEW_RESET,
  PROVA_PARALLEL_PREVIEW_FETCH,
  PROVA_PARALLEL_PREVIEW_SET,
  PROVA_PARALLEL_PREVIEW_RESET,
  PROVA_PARALLEL_ESECUZIONE_FETCH,
  PROVA_PARALLEL_ESECUZIONE_SET,
  PROVA_PARALLEL_ESECUZIONE_RESET,
  PROVA_PARALLEL_RESET,
  PROVA_PARALLEL_STEP_SET,
  PROVA_PARALLEL_STEP_RESET,
  PROVA_PARALLEL_FEEDBACK_SET,
  PROVA_PARALLEL_FEEDBACK_RESET,
  PROVA_PARALLEL_RISPOSTA_POST,
  PROVA_PARALLEL_RISPOSTA_SET,
  PROVA_PARALLEL_RISPOSTA_RESET,
  PROVA_PARALLEL_SPINNER_SET,
  PROVA_PARALLEL_INVIA_REPORT,
} from './constants';


export const provaParallelOverviewFetch = (id) => ({
  type: PROVA_PARALLEL_OVERVIEW_FETCH,
  id,
});

export const provaParallelOverviewSet = (payload) => ({
  type: PROVA_PARALLEL_OVERVIEW_SET,
  payload,
});

export const provaParallelOverviewReset = () => ({
  type: PROVA_PARALLEL_OVERVIEW_RESET,
});

export const provaParallelPreviewFetch = (id) => ({
  type: PROVA_PARALLEL_PREVIEW_FETCH,
  id,
});

export const provaParallelPreviewSet = (payload) => ({
  type: PROVA_PARALLEL_PREVIEW_SET,
  payload,
});

export const provaParallelPreviewReset = () => ({
  type: PROVA_PARALLEL_PREVIEW_RESET,
});

export const provaParallelEsecuzioneFetch = (payload) => ({
  type: PROVA_PARALLEL_ESECUZIONE_FETCH,
  payload,
});

export const provaParallelEsecuzioneSet = (payload) => ({
  type: PROVA_PARALLEL_ESECUZIONE_SET,
  payload,
});

export const provaParallelEsecuzioneReset = () => ({
  type: PROVA_PARALLEL_ESECUZIONE_RESET,
});

export const provaParallelStepSet = (payload) => ({
  type: PROVA_PARALLEL_STEP_SET,
  payload,
});

export const provaParallelStepReset = () => ({
  type: PROVA_PARALLEL_STEP_RESET,
});

export const provaParallelFeedbackSet = (enable, tipologia, messaggio) => ({
  type: PROVA_PARALLEL_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const provaParallelFeedbackReset = () => ({
  type: PROVA_PARALLEL_FEEDBACK_RESET,
});

export const provaParallelRispostaSet = (payload) => ({
  type: PROVA_PARALLEL_RISPOSTA_SET,
  payload,
});

export const provaParallelRispostaPost = (payload) => ({
  type: PROVA_PARALLEL_RISPOSTA_POST,
  payload,
});

export const provaParallelRispostaReset = () => ({
  type: PROVA_PARALLEL_RISPOSTA_RESET,
});

export const provaParallelSpinnerSet = (enable) => ({
  type: PROVA_PARALLEL_SPINNER_SET,
  enable,
});

export const provaParallelReset = () => ({
  type: PROVA_PARALLEL_RESET,
});

export const provaParallelInviaReport = (payload) => ({
  type: PROVA_PARALLEL_INVIA_REPORT,
  payload,
});

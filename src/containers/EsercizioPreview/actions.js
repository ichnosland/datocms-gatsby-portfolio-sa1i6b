/*
 *
 * EsercizioPreview actions
 *
 */

import {
  ESERCIZIO_PREVIEW_CONTENUTO_SET,
  ESERCIZIO_PREVIEW_RESET,
  ESERCIZIO_PREVIEW_STEP_SET,
  ESERCIZIO_PREVIEW_STEP_NEXT,
  ESERCIZIO_PREVIEW_STEP_INITIALIZE,
  ESERCIZIO_PREVIEW_FEEDBACK_SET,
  ESERCIZIO_PREVIEW_FEEDBACK_RESET,
  ESERCIZIO_PREVIEW_RISPOSTA_POST,
  ESERCIZIO_PREVIEW_RISPOSTA_SET,
  ESERCIZIO_PREVIEW_RISPOSTA_RESET,
  ESERCIZIO_PREVIEW_SPINNER_SET,
} from './constants';


export const esercizioPreviewContenutoSet = (payload) => ({
  type: ESERCIZIO_PREVIEW_CONTENUTO_SET,
  payload,
});

export const esercizioPreviewStepSet = (payload) => ({
  type: ESERCIZIO_PREVIEW_STEP_SET,
  payload,
});

export const esercizioPreviewStepInitialize = (id, parseMultimedia) => ({
  type: ESERCIZIO_PREVIEW_STEP_INITIALIZE,
  id,
  parseMultimedia,
});

export const esercizioPreviewStepNext = (payload) => ({
  type: ESERCIZIO_PREVIEW_STEP_NEXT,
  payload,
});

export const esercizioPreviewFeedbackSet = (enable, tipologia, messaggio) => ({
  type: ESERCIZIO_PREVIEW_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const esercizioPreviewFeedbackReset = () => ({
  type: ESERCIZIO_PREVIEW_FEEDBACK_RESET,
});

export const esercizioPreviewRispostaSet = (payload) => ({
  type: ESERCIZIO_PREVIEW_RISPOSTA_SET,
  payload,
});

export const esercizioPreviewRispostaPost = (payload) => ({
  type: ESERCIZIO_PREVIEW_RISPOSTA_POST,
  payload,
});

export const esercizioPreviewRispostaReset = () => ({
  type: ESERCIZIO_PREVIEW_RISPOSTA_RESET,
});

export const esercizioPreviewSpinnerSet = (enable) => ({
  type: ESERCIZIO_PREVIEW_SPINNER_SET,
  enable,
});

export const esercizioPreviewReset = () => ({
  type: ESERCIZIO_PREVIEW_RESET,
});

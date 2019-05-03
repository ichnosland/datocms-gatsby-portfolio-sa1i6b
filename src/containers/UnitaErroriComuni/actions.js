/*
 *
 * UnitaErroriComuni actions
 *
 */

import {
  UNITA_ERRORI_COMUNI_CONTENUTO_SET,
  UNITA_ERRORI_COMUNI_RESET,
  UNITA_ERRORI_COMUNI_STEP_SET,
  UNITA_ERRORI_COMUNI_STEP_NEXT,
  UNITA_ERRORI_COMUNI_STEP_INITIALIZE,
  UNITA_ERRORI_COMUNI_RISPOSTA_POST,
  UNITA_ERRORI_COMUNI_RISPOSTA_SET,
  UNITA_ERRORI_COMUNI_RISPOSTA_RESET,
} from './constants';


export const unitaErroriComuniContenutoSet = (payload) => ({
  type: UNITA_ERRORI_COMUNI_CONTENUTO_SET,
  payload,
});

export const unitaErroriComuniStepSet = (payload) => ({
  type: UNITA_ERRORI_COMUNI_STEP_SET,
  payload,
});

export const unitaErroriComuniStepInitialize = (payload) => ({
  type: UNITA_ERRORI_COMUNI_STEP_INITIALIZE,
  payload,
});

export const unitaErroriComuniStepNext = (payload) => ({
  type: UNITA_ERRORI_COMUNI_STEP_NEXT,
  payload,
});

export const unitaErroriComuniRispostaSet = (payload) => ({
  type: UNITA_ERRORI_COMUNI_RISPOSTA_SET,
  payload,
});

export const unitaErroriComuniRispostaPost = (payload) => ({
  type: UNITA_ERRORI_COMUNI_RISPOSTA_POST,
  payload,
});

export const unitaErroriComuniRispostaReset = () => ({
  type: UNITA_ERRORI_COMUNI_RISPOSTA_RESET,
});

export const unitaErroriComuniReset = () => ({
  type: UNITA_ERRORI_COMUNI_RESET,
});

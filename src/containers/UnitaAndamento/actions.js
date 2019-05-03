/*
 *
 * UnitaAndamento actions
 *
 */

import {
  UNITA_ANDAMENTO_RESET,
  UNITA_ANDAMENTO_FETCH,
  UNITA_ANDAMENTO_SPINNER_SET,
  UNITA_ANDAMENTO_FEEDBACK_SET,
  UNITA_ANDAMENTO_FEEDBACK_RESET,
  UNITA_ANDAMENTO_CONTENUTO_SET,
  UNITA_ANDAMENTO_SORT,
  UNITA_ANDAMENTO_SORT_SET,
} from './constants';


export const unitaAndamentoReset = () => ({
  type: UNITA_ANDAMENTO_RESET,
});

export const unitaAndamentoFetch = (unitaId, corsoId, payload) => ({
  type: UNITA_ANDAMENTO_FETCH,
  unitaId,
  corsoId,
  payload,
});

export const unitaAndamentoSpinnerSet = (enable) => ({
  type: UNITA_ANDAMENTO_SPINNER_SET,
  enable,
});

export const unitaAndamentoFeedbackSet = (hasFeedback, tipologia, messaggio) => ({
  type: UNITA_ANDAMENTO_FEEDBACK_SET,
  hasFeedback,
  tipologia,
  messaggio,
});

export const unitaAndamentoFeedbackReset = () => ({
  type: UNITA_ANDAMENTO_FEEDBACK_RESET,
});

export const unitaAndamentoContenutoSet = (payload) => ({
  type: UNITA_ANDAMENTO_CONTENUTO_SET,
  payload,
});

export const unitaAndamentoSort = (payloadData, sortingData) => ({
  type: UNITA_ANDAMENTO_SORT,
  payloadData,
  sortingData,
});

export const unitaAndamentoSortSet = (payload) => ({
  type: UNITA_ANDAMENTO_SORT_SET,
  payload,
});

/*
 *
 * ProvaParallelPreview reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  PROVA_PARALLEL_OVERVIEW_SET,
  PROVA_PARALLEL_OVERVIEW_RESET,
  PROVA_PARALLEL_PREVIEW_SET,
  PROVA_PARALLEL_PREVIEW_RESET,
  PROVA_PARALLEL_ESECUZIONE_SET,
  PROVA_PARALLEL_ESECUZIONE_RESET,
  PROVA_PARALLEL_RESET,
  PROVA_PARALLEL_RISPOSTA_SET,
  PROVA_PARALLEL_RISPOSTA_RESET,
  PROVA_PARALLEL_SPINNER_SET,
  PROVA_PARALLEL_FEEDBACK_SET,
  PROVA_PARALLEL_FEEDBACK_RESET,
  PROVA_PARALLEL_STEP_SET,
  PROVA_PARALLEL_STEP_RESET,
} from './constants';

export const defaultProvaParallelFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultProvaParallelOverview = fromJS({
  isLoaded: false,
  id: 0,
  titolo: '',
  autore: '',
  fonte: '',
  testo: '',
  totaleDomande: 0,
});

export const defaultProvaParallelPreview = fromJS({
  isLoaded: false,
  id: 0,
  titolo: '',
  steps: [],
});

export const defaultProvaParallelEsecuzione = fromJS({
  isLoaded: false,
  consegnata: false,
  titolo: '',
  testo: '',
  id: 0,
  steps: [],
  risposteFornite: {},
  stepCaricato: 0,
});

export const defaultProvaParallelRisposta = fromJS({
  rispostaSelezionata: undefined,
  isCheckable: false,
  isFocusEnabled: false,
});

export const defaultProvaParallelStep = fromJS({
  testi: [],
  esercizi: [],
  numeroProgressivoStep: 0,
});

function provaParallelSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_PARALLEL_RESET:
      return fromJS(false);

    case PROVA_PARALLEL_SPINNER_SET:
      return action.enable;
  }
}

function provaParallelFeedbackReducer(state = defaultProvaParallelFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_PARALLEL_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case PROVA_PARALLEL_FEEDBACK_RESET:
    case PROVA_PARALLEL_RESET:
      return defaultProvaParallelFeedback;
  }
}

function provaParallelOverviewReducer(state = defaultProvaParallelOverview, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_PARALLEL_OVERVIEW_SET:
      return state.merge(action.payload);

    case PROVA_PARALLEL_OVERVIEW_RESET:
    case PROVA_PARALLEL_RESET:
      return defaultProvaParallelOverview;
  }
}

function provaParallelPreviewReducer(state = defaultProvaParallelPreview, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_PARALLEL_PREVIEW_SET:
      return state.merge(action.payload);

    case PROVA_PARALLEL_PREVIEW_RESET:
    case PROVA_PARALLEL_RESET:
      return defaultProvaParallelPreview;
  }
}

function provaParallelEsecuzioneReducer(state = defaultProvaParallelEsecuzione, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_PARALLEL_ESECUZIONE_SET:
      return state.merge(action.payload);

    case PROVA_PARALLEL_ESECUZIONE_RESET:
    case PROVA_PARALLEL_RESET:
      return defaultProvaParallelEsecuzione;
  }
}

function provaParallelStepReducer(state = defaultProvaParallelStep, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_PARALLEL_STEP_SET:
      return state.merge(action.payload);

    case PROVA_PARALLEL_STEP_RESET:
    case PROVA_PARALLEL_RESET:
      return defaultProvaParallelStep;
  }
}

function provaParallelRispostaReducer(state = defaultProvaParallelRisposta, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_PARALLEL_RISPOSTA_SET:
      return state.merge(action.payload);

    case PROVA_PARALLEL_RISPOSTA_RESET:
    case PROVA_PARALLEL_RESET:
      return defaultProvaParallelRisposta;
  }
}

const provaParallelReducer = combineReducers({
  spinner: provaParallelSpinnerReducer,
  feedback: provaParallelFeedbackReducer,
  overview: provaParallelOverviewReducer,
  preview: provaParallelPreviewReducer,
  esecuzione: provaParallelEsecuzioneReducer,
  step: provaParallelStepReducer,
  risposta: provaParallelRispostaReducer,
});

export default provaParallelReducer;

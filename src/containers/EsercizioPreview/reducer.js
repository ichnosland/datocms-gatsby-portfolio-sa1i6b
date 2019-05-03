/*
 *
 * EsercizioPreviewPreview reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  ESERCIZIO_PREVIEW_CONTENUTO_SET,
  ESERCIZIO_PREVIEW_RESET,
  ESERCIZIO_PREVIEW_RISPOSTA_SET,
  ESERCIZIO_PREVIEW_RISPOSTA_RESET,
  ESERCIZIO_PREVIEW_SPINNER_SET,
  ESERCIZIO_PREVIEW_FEEDBACK_SET,
  ESERCIZIO_PREVIEW_FEEDBACK_RESET,
  ESERCIZIO_PREVIEW_STEP_SET,
} from './constants';

export const defaultEsercizioPreviewFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultEsercizioPreviewContenuto = fromJS({
  isLoaded: false,
  inCorso: false,
  consegnata: false,
  id: -1,
  titolo: '',
  totaleDomande: -1,
  voto: -1,
  steps: [],
  risposteFornite: {},
  stepCaricato: 0,
  missione: 0,
  openedSections: {},
});

export const defaultEsercizioPreviewRisposta = fromJS({
  rispostaSelezionata: undefined,
  isCheckable: false,
  isChecked: false,
  isCorrect: false,
  isPristine: true,
  isInterfaceLocked: false,
  correzioneStep: {
    corrette: [],
    sbagliate: [],
    soluzione: undefined,
  },
  mostraSoluzione: false,
  mostraCorrezione: false,
  isHelpEnabled: false,
  isFocusEnabled: false,
});

export const defaultEsercizioPreviewStep = fromJS({
  testi: [],
  esercizi: [],
  isStepLoaded: false,
  numeroProgressivoStep: 0,
  nextStep: undefined,
});

function esercizioPreviewSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case ESERCIZIO_PREVIEW_RESET:
      return fromJS(false);

    case ESERCIZIO_PREVIEW_SPINNER_SET:
      return action.enable;
  }
}

function esercizioPreviewFeedbackReducer(state = defaultEsercizioPreviewFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case ESERCIZIO_PREVIEW_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case ESERCIZIO_PREVIEW_FEEDBACK_RESET:
    case ESERCIZIO_PREVIEW_RESET:
      return defaultEsercizioPreviewFeedback;
  }
}

function esercizioPreviewContenutoReducer(state = defaultEsercizioPreviewContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case ESERCIZIO_PREVIEW_CONTENUTO_SET:
      return state.merge(action.payload);

    case ESERCIZIO_PREVIEW_RESET:
      return defaultEsercizioPreviewContenuto;
  }
}

function esercizioPreviewStepReducer(state = defaultEsercizioPreviewStep, action) {
  switch (action.type) {
    default:
      return state;

    case ESERCIZIO_PREVIEW_STEP_SET:
      return state.merge(action.payload);

    case ESERCIZIO_PREVIEW_RESET:
      return defaultEsercizioPreviewStep;
  }
}

function esercizioPreviewRispostaReducer(state = defaultEsercizioPreviewRisposta, action) {
  switch (action.type) {
    default:
      return state;

    case ESERCIZIO_PREVIEW_RISPOSTA_SET:
      return state.merge(action.payload);

    case ESERCIZIO_PREVIEW_RISPOSTA_RESET:
    case ESERCIZIO_PREVIEW_RESET:
      return defaultEsercizioPreviewRisposta;
  }
}

const esercizioPreviewReducer = combineReducers({
  spinner: esercizioPreviewSpinnerReducer,
  feedback: esercizioPreviewFeedbackReducer,
  contenuto: esercizioPreviewContenutoReducer,
  step: esercizioPreviewStepReducer,
  risposta: esercizioPreviewRispostaReducer,
});

export default esercizioPreviewReducer;

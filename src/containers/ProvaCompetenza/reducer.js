/*
 *
 * ProvaCompetenzaPreview reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  PROVA_COMPETENZA_CONTENUTO_SET,
  PROVA_COMPETENZA_RESET,
  PROVA_COMPETENZA_RISPOSTA_SET,
  PROVA_COMPETENZA_RISPOSTA_RESET,
  PROVA_COMPETENZA_SPINNER_SET,
  PROVA_COMPETENZA_FEEDBACK_SET,
  PROVA_COMPETENZA_FEEDBACK_RESET,
  PROVA_COMPETENZA_STEP_SET,
  PROVA_COMPETENZA_STEP_RESET,
} from './constants';

export const defaultProvaCompetenzaFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultProvaCompetenzaContenuto = fromJS({
  isLoaded: false,
  inCorso: false,
  consegnata: false,
  ritirata: false,
  assegnata: false,
  id: -1,
  idAssegnazione: 0,
  titolo: '',
  autore: '',
  fonte: '',
  difficolta: '',
  sottotitolo: '',
  dataAssegnazione: '',
  testo: '',
  prerequisito: '',
  totaleDomande: -1,
  voto: -1,
  steps: [],
  risposteFornite: {},
  stepCaricato: 0,
  missione: 0,
});

export const defaultProvaCompetenzaRisposta = fromJS({
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

export const defaultProvaCompetenzaStep = fromJS({
  testi: [],
  esercizi: [],
  isStepLoaded: false,
  numeroProgressivoStep: 0,
  nextStep: undefined,
});

function provaCompetenzaSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_COMPETENZA_RESET:
      return fromJS(false);

    case PROVA_COMPETENZA_SPINNER_SET:
      return action.enable;
  }
}

function provaCompetenzaFeedbackReducer(state = defaultProvaCompetenzaFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_COMPETENZA_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case PROVA_COMPETENZA_FEEDBACK_RESET:
    case PROVA_COMPETENZA_RESET:
      return defaultProvaCompetenzaFeedback;
  }
}

function provaCompetenzaContenutoReducer(state = defaultProvaCompetenzaContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_COMPETENZA_CONTENUTO_SET:
      return state.merge(action.payload);

    case PROVA_COMPETENZA_RESET:
      return defaultProvaCompetenzaContenuto;
  }
}

function provaCompetenzaStepReducer(state = defaultProvaCompetenzaStep, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_COMPETENZA_STEP_SET:
      return state.merge(action.payload);

    case PROVA_COMPETENZA_STEP_RESET:
    case PROVA_COMPETENZA_RESET:
      return defaultProvaCompetenzaStep;
  }
}

function provaCompetenzaRispostaReducer(state = defaultProvaCompetenzaRisposta, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_COMPETENZA_RISPOSTA_SET:
      return state.merge(action.payload);

    case PROVA_COMPETENZA_RISPOSTA_RESET:
    case PROVA_COMPETENZA_RESET:
      return defaultProvaCompetenzaRisposta;
  }
}

const provaCompetenzaReducer = combineReducers({
  spinner: provaCompetenzaSpinnerReducer,
  feedback: provaCompetenzaFeedbackReducer,
  contenuto: provaCompetenzaContenutoReducer,
  step: provaCompetenzaStepReducer,
  risposta: provaCompetenzaRispostaReducer,
});

export default provaCompetenzaReducer;

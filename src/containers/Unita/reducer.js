/*
 *
 * UnitaPreview reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  UNITA_CONTENUTO_SET,
  UNITA_RESET,
  UNITA_RISPOSTA_SET,
  UNITA_RISPOSTA_RESET,
  UNITA_SPINNER_SET,
  UNITA_FEEDBACK_SET,
  UNITA_FEEDBACK_RESET,
  UNITA_STEP_SET,
  UNITA_STEP_RESET,
} from './constants';

export const defaultUnitaFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultUnitaContenuto = fromJS({
  isLoaded: false,
  consegnata: false,
  assegnata: false,
  id: 0,
  idAssegnazione: 0,
  titolo: '',
  lezione: 0,
  prerequisito: 0,
  lezioni: {
    totali: 0,
    completate: 0,
    andamento: {},
  },
  unitaCompletata: false,
  difficolta: '',
  livelloId: 0,
  totaleDomande: 0,
});

export const defaultUnitaRisposta = fromJS({
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

export const defaultUnitaStep = fromJS({
  testi: [],
  esercizi: [],
  isStepLoaded: false,
  numeroStepCompletati: 0,
  stepId: 0,
  nextStep: undefined,
});

function unitaSpinnerReducer(state = fromJS(true), action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_RESET:
      return fromJS(true);

    case UNITA_SPINNER_SET:
      return action.enable;
  }
}

function unitaFeedbackReducer(state = defaultUnitaFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case UNITA_FEEDBACK_RESET:
    case UNITA_RESET:
      return defaultUnitaFeedback;
  }
}

function unitaContenutoReducer(state = defaultUnitaContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_CONTENUTO_SET:
      return state.merge(action.payload);

    case UNITA_RESET:
      return defaultUnitaContenuto;
  }
}

function unitaStepReducer(state = defaultUnitaStep, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_STEP_SET:
      return state.merge(action.payload);

    case UNITA_STEP_RESET:
    case UNITA_RESET:
      return defaultUnitaStep;
  }
}

function unitaRispostaReducer(state = defaultUnitaRisposta, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_RISPOSTA_SET:
      return state.merge(action.payload);

    case UNITA_RISPOSTA_RESET:
    case UNITA_RESET:
      return defaultUnitaRisposta;
  }
}

const unitaReducer = combineReducers({
  spinner: unitaSpinnerReducer,
  feedback: unitaFeedbackReducer,
  contenuto: unitaContenutoReducer,
  step: unitaStepReducer,
  risposta: unitaRispostaReducer,
});

export default unitaReducer;

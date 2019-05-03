/*
 *
 * VerificaPreview reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  VERIFICA_LIVELLO_SET,
  VERIFICA_LIVELLO_RESET,
  VERIFICA_LIVELLO_SPINNER_SET,
  VERIFICA_CONTENUTO_SET,
  VERIFICA_RESET,
  VERIFICA_RISPOSTA_SET,
  VERIFICA_RISPOSTA_RESET,
  VERIFICA_SPINNER_SET,
  VERIFICA_FEEDBACK_SET,
  VERIFICA_FEEDBACK_RESET,
  VERIFICA_STEP_SET,
  VERIFICA_STEP_RESET,
} from './constants';


export const defaultVerificaFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultVerificheLivello = fromJS({
  isLoaded: false,
  titolo: '',
  unitSelectionEnabled: false,
  unita: [],
  verificheAssegnate: [],
  datiVerifica: {
    soloLatino: false,
    unitaSelezionate: [],
  },
  spinnerSmall: {},
});

export const defaultVerificaContenuto = fromJS({
  isLoaded: false,
  inCorso: false,
  consegnata: false,
  ritirata: false,
  id: 0,
  totaleStep: -1,
  voto: -1,
  steps: [],
  stepRiaccodati: [],
  unitaSelezionate: [],
  soloLatino: false,
  risposteFornite: {},
  stepCaricato: 0,
  livelloId: 0,
  backUrl: '',
});

export const defaultVerificaRisposta = fromJS({
  rispostaSelezionata: undefined,
  isCheckable: false,
  isFocusEnabled: false,
});

export const defaultVerificaStep = fromJS({
  testi: [],
  esercizi: [],
  isStepLoaded: false,
  numeroProgressivoStep: 0,
  skipped: [],
});

function verificaSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_RESET:
      return fromJS(false);

    case VERIFICA_SPINNER_SET:
      return action.enable;
  }
}

function verificaFeedbackReducer(state = defaultVerificaFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case VERIFICA_FEEDBACK_RESET:
    case VERIFICA_RESET:
      return defaultVerificaFeedback;
  }
}

function verificaLivelloReducer(state = defaultVerificheLivello, action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_LIVELLO_SET:
      return state.merge(action.payload);

    case VERIFICA_LIVELLO_SPINNER_SET:
      return state.merge({
        spinnerSmall: {
          ...state.spinnerSmall,
          ...action.payload,
        },
      });

    case VERIFICA_RESET:
    case VERIFICA_LIVELLO_RESET:
      return defaultVerificheLivello;
  }
}

function verificaContenutoReducer(state = defaultVerificaContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_CONTENUTO_SET:
      return state.merge(action.payload);

    case VERIFICA_RESET:
      return defaultVerificaContenuto;
  }
}

function verificaStepReducer(state = defaultVerificaStep, action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_STEP_SET:
      return state.merge(action.payload);

    case VERIFICA_STEP_RESET:
    case VERIFICA_RESET:
      return defaultVerificaStep;
  }
}

function verificaRispostaReducer(state = defaultVerificaRisposta, action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_RISPOSTA_SET:
      return state.merge(action.payload);

    case VERIFICA_RISPOSTA_RESET:
    case VERIFICA_RESET:
      return defaultVerificaRisposta;
  }
}

const verificaReducer = combineReducers({
  spinner: verificaSpinnerReducer,
  feedback: verificaFeedbackReducer,
  contenuto: verificaContenutoReducer,
  step: verificaStepReducer,
  risposta: verificaRispostaReducer,
  livello: verificaLivelloReducer,
});

export default verificaReducer;

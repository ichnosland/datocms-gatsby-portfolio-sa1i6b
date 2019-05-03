/*
 *
 * Versioni reducer
 *
 */
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  VERSIONI_VERSIONE_RESET,
  VERSIONI_VERSIONE_SET,
  VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_SET,
  VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_RESET,
  VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_SET,
  VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_RESET,
  VERSIONI_FEEDBACK_SET,
  VERSIONI_FEEDBACK_RESET,
  VERSIONI_SPINNER_SET,
  VERSIONI_PURGE_TRIGGER,
  VERSIONI_LIVELLO_SET,
  VERSIONI_LIVELLO_RESET,
  VERSIONI_LIVELLO_SPINNER_SET,
} from './constants';


export const defaultVersioniLivello = fromJS({
  isLoaded: false,
  titolo: '',
  versioniAssegnate: [],
  missioni: [],
  versioniMissione: {},
  versioneSelezionata: undefined,
  spinnerSmall: {},
});

export const defaultVersioneFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultVersioneCaricata = fromJS({
  isLoaded: false,
  inCorso: false,
  isConsegnata: false,
  ritirata: false,
  assegnata: false,
  id: -1,
  idAssegnazione: 0,
  periodi: [],
  titolo: '',
  testo: '',
  sottotitolo: '',
  autore: '',
  fonte: '',
  missione: 0,
  totaleDomande: -1,
  dataAssegnazione: undefined,
  previewPeriodi: [],
  isEsecuzioneLoaded: false,
  backUrl: '',
});

export const defaultVersioneAvanzamento = fromJS({
  periodiDaEseguire: {
    periodiIncompletiPks: [],
    stepDaEseguire: {},
  },
  risposteFornite: {},
  provaConclusa: false,
  votoFinale: -1,
  rispostaSelezionata: undefined,
  isCheckable: false,
  isChecked: false,
  isCorrect: false,
  isPristine: true,
  isInterfaceLocked: false,
  isEsecuzioneLoaded: false,
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

export const defaultVersioneEsecuzione = fromJS({
  periodoCaricato: [],
  stepCaricatoKey: -1,
  periodoCaricatoId: -1,
  stepTotali: -1,
  stepEseguiti: -1,
});

function versioniVersioneAvanzamentoReducer(state = defaultVersioneAvanzamento, action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_SET:
      return state.merge(action.payload);

    case VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_RESET:
    case VERSIONI_PURGE_TRIGGER:
      return defaultVersioneAvanzamento;
  }
}

function versioniVersioneEsecuzioneReducer(state = defaultVersioneEsecuzione, action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_SET:
      return state.merge(action.payload);

    case VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_RESET:
    case VERSIONI_PURGE_TRIGGER:
      return defaultVersioneEsecuzione;
  }
}

function versioniSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_FEEDBACK_SET:
    case VERSIONI_PURGE_TRIGGER:
      return fromJS(false);

    case VERSIONI_SPINNER_SET:
      return action.enable;
  }
}

function versioniFeedbackReducer(state = defaultVersioneFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case VERSIONI_FEEDBACK_RESET:
    case VERSIONI_PURGE_TRIGGER:
      return defaultVersioneFeedback;
  }
}

function versioniVersioneCaricataReducer(state = defaultVersioneCaricata, action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_VERSIONE_SET:
      return state.merge(action.payload);

    case VERSIONI_VERSIONE_RESET:
    case VERSIONI_PURGE_TRIGGER:
      return defaultVersioneCaricata;
  }
}

function versioniLivelloReducer(state = defaultVersioniLivello, action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_LIVELLO_SET:
      return state.merge(action.payload);

    case VERSIONI_LIVELLO_SPINNER_SET:
      return state.merge({
        spinnerSmall: {
          ...state.spinnerSmall,
          ...action.payload,
        },
      });

    case VERSIONI_PURGE_TRIGGER:
    case VERSIONI_LIVELLO_RESET:
      return defaultVersioniLivello;
  }
}

const versioniReducer = combineReducers({
  spinner: versioniSpinnerReducer,
  feedback: versioniFeedbackReducer,
  versioneCaricata: versioniVersioneCaricataReducer,
  versioneAvanzamento: versioniVersioneAvanzamentoReducer,
  versioneEsecuzione: versioniVersioneEsecuzioneReducer,
  livello: versioniLivelloReducer,
});

export default versioniReducer;

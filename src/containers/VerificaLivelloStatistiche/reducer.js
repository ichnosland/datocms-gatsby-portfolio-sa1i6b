/*
 *
 * VerificaLivelloStatistiche reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  VERIFICA_LIVELLO_STATISTICHE_DATA_SET,
  VERIFICA_LIVELLO_STATISTICHE_DATA_RESET,
  VERIFICA_LIVELLO_STATISTICHE_SPINNER_SET,
  VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_SET,
  VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_RESET,
  VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
} from './constants';

export const defaultStatisticaCaricata = fromJS({
  iscritti: [],
  studenti: [],
  esercizi: {},
  media: {},
  stepPks: [],
  risposte: {},
  reportDisponibili: [],
  statisticheDisponibili: [],
  idAssegnazione: 0,
  id: 0,
  grafici: [],
  previousId: -1,
  nextId: -1,
  utenteSelezionato: undefined,
  openedSections: {},
});

export const defaultVersioneStatisticheFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultVersioneStatisticheDidascalia = fromJS({
  tipologiaGrafico: '',
  titolo: '',
  tipologia: '',
  display: false,
  campioni: 0,
  y: 0,
  x: '',
});

function verificaLivelloStatisticheDidascaliaReducer(state = defaultVersioneStatisticheDidascalia, action) {
  switch (action.type) {
    case VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_SET:
      return state.merge(action.payload);

    case VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_RESET:
      return defaultVersioneStatisticheDidascalia;

    default:
      return state;
  }
}

function verificaLivelloStatisticheSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_LIVELLO_STATISTICHE_DATA_RESET:
      return fromJS(false);

    case VERIFICA_LIVELLO_STATISTICHE_SPINNER_SET:
      return action.enabled;
  }
}

function verificaLivelloStatisticheCaricateReducer(state = defaultStatisticaCaricata, action) {
  switch (action.type) {
    case VERIFICA_LIVELLO_STATISTICHE_DATA_SET:
      return state.merge(action.payload);

    case VERIFICA_LIVELLO_STATISTICHE_DATA_RESET:
      return defaultStatisticaCaricata;

    default:
      return state;
  }
}

function verificaLivelloStatisticheFeedbackReducer(state = defaultVersioneStatisticheFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enabled,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_RESET:
    case VERIFICA_LIVELLO_STATISTICHE_DATA_RESET:
      return defaultVersioneStatisticheFeedback;
  }
}

const verificaLivelloStatisticheReducer = combineReducers({
  spinner: verificaLivelloStatisticheSpinnerReducer,
  feedback: verificaLivelloStatisticheFeedbackReducer,
  statisticheCaricate: verificaLivelloStatisticheCaricateReducer,
  didascalia: verificaLivelloStatisticheDidascaliaReducer,
});


export default verificaLivelloStatisticheReducer;

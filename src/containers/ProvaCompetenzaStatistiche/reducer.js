/*
 *
 * ProvaCompetenzaStatistiche reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  PROVA_COMPETENZA_STATISTICHE_DATA_SET,
  PROVA_COMPETENZA_STATISTICHE_DATA_RESET,
  PROVA_COMPETENZA_STATISTICHE_SPINNER_SET,
  PROVA_COMPETENZA_STATISTICHE_FEEDBACK_SET,
  PROVA_COMPETENZA_STATISTICHE_FEEDBACK_RESET,
  PROVA_COMPETENZA_DIDASCALIA_SET,
  PROVA_COMPETENZA_DIDASCALIA_RESET,
} from './constants';

export const defaultStatisticaCaricata = fromJS({
  iscritti: [],
  studenti: [],
  esercizi: {},
  media: {},
  stepPks: [],
  risposte: {},
  reportDisponibili: [],
  idAssegnazione: 0,
  id: 0,
  grafici: [],
  previousId: -1,
  nextId: -1,
  utenteSelezionato: undefined,
  openedSections: {},
  statisticheDisponibili: [],
  isLoaded: false,
  idMissione: 0,
});

export const defaultProvaCompetenzaFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultProvaCompetenzaStatisticheDidascalia = fromJS({
  tipologiaGrafico: '',
  titolo: '',
  tipologia: '',
  display: false,
  campioni: 0,
  y: 0,
  x: '',
});

function provaCompetenzaDidascaliaReducer(state = defaultProvaCompetenzaStatisticheDidascalia, action) {
  switch (action.type) {
    case PROVA_COMPETENZA_DIDASCALIA_SET:
      return state.merge(action.payload);

    case PROVA_COMPETENZA_DIDASCALIA_RESET:
      return defaultProvaCompetenzaStatisticheDidascalia;

    default:
      return state;
  }
}

function provaCompetenzaStatisticheSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_COMPETENZA_STATISTICHE_DATA_RESET:
      return fromJS(false);

    case PROVA_COMPETENZA_STATISTICHE_SPINNER_SET:
      return action.enabled;
  }
}

function provaCompetenzaStatisticheCaricateReducer(state = defaultStatisticaCaricata, action) {
  switch (action.type) {
    case PROVA_COMPETENZA_STATISTICHE_DATA_SET:
      return state.merge(action.payload);

    case PROVA_COMPETENZA_STATISTICHE_DATA_RESET:
      return defaultStatisticaCaricata;

    default:
      return state;
  }
}

function provaCompetenzaStatisticheFeedbackReducer(state = defaultProvaCompetenzaFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case PROVA_COMPETENZA_STATISTICHE_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enabled,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case PROVA_COMPETENZA_STATISTICHE_FEEDBACK_RESET:
    case PROVA_COMPETENZA_STATISTICHE_DATA_RESET:
      return defaultProvaCompetenzaFeedback;
  }
}

const provaCompetenzaStatisticheReducer = combineReducers({
  spinner: provaCompetenzaStatisticheSpinnerReducer,
  feedback: provaCompetenzaStatisticheFeedbackReducer,
  statisticheCaricate: provaCompetenzaStatisticheCaricateReducer,
  didascalia: provaCompetenzaDidascaliaReducer,
});


export default provaCompetenzaStatisticheReducer;

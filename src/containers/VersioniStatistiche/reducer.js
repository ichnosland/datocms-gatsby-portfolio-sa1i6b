/*
 *
 * VersioniStatistiche reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  VERSIONI_STATISTICHE_DATA_SET,
  VERSIONI_STATISTICHE_DATA_RESET,
  VERSIONI_STATISTICHE_SPINNER_SET,
  VERSIONI_STATISTICHE_FEEDBACK_SET,
  VERSIONI_STATISTICHE_FEEDBACK_RESET,
  VERSIONI_STATISTICHE_DIDASCALIA_SET,
  VERSIONI_STATISTICHE_DIDASCALIA_RESET,
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

function versioniStatisticheDidascaliaReducer(state = defaultVersioneStatisticheDidascalia, action) {
  switch (action.type) {
    case VERSIONI_STATISTICHE_DIDASCALIA_SET:
      return state.merge(action.payload);

    case VERSIONI_STATISTICHE_DIDASCALIA_RESET:
      return defaultVersioneStatisticheDidascalia;

    default:
      return state;
  }
}

function versioniStatisticheSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_STATISTICHE_DATA_RESET:
      return fromJS(false);

    case VERSIONI_STATISTICHE_SPINNER_SET:
      return action.enabled;
  }
}

function versioniStatisticheCaricateReducer(state = defaultStatisticaCaricata, action) {
  switch (action.type) {
    case VERSIONI_STATISTICHE_DATA_SET:
      return state.merge(action.payload);

    case VERSIONI_STATISTICHE_DATA_RESET:
      return defaultStatisticaCaricata;

    default:
      return state;
  }
}

function versioniStatisticheFeedbackReducer(state = defaultVersioneStatisticheFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_STATISTICHE_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enabled,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case VERSIONI_STATISTICHE_FEEDBACK_RESET:
    case VERSIONI_STATISTICHE_DATA_RESET:
      return defaultVersioneStatisticheFeedback;
  }
}

const versioniStatisticheReducer = combineReducers({
  spinner: versioniStatisticheSpinnerReducer,
  feedback: versioniStatisticheFeedbackReducer,
  statisticheCaricate: versioniStatisticheCaricateReducer,
  didascalia: versioniStatisticheDidascaliaReducer,
});


export default versioniStatisticheReducer;

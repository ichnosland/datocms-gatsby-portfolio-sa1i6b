/*
 *
 * VersioniLivelloStatistiche reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  VERSIONI_LIVELLO_STATISTICHE_DATA_SET,
  VERSIONI_LIVELLO_STATISTICHE_DATA_RESET,
  VERSIONI_LIVELLO_STATISTICHE_SPINNER_SET,
  VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_SET,
  VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_RESET,
  VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
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

function versioniLivelloStatisticheDidascaliaReducer(state = defaultVersioneStatisticheDidascalia, action) {
  switch (action.type) {
    case VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_SET:
      return state.merge(action.payload);

    case VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_RESET:
      return defaultVersioneStatisticheDidascalia;

    default:
      return state;
  }
}

function versioniLivelloStatisticheSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_LIVELLO_STATISTICHE_DATA_RESET:
      return fromJS(false);

    case VERSIONI_LIVELLO_STATISTICHE_SPINNER_SET:
      return action.enabled;
  }
}

function versioniLivelloStatisticheCaricateReducer(state = defaultStatisticaCaricata, action) {
  switch (action.type) {
    case VERSIONI_LIVELLO_STATISTICHE_DATA_SET:
      return state.merge(action.payload);

    case VERSIONI_LIVELLO_STATISTICHE_DATA_RESET:
      return defaultStatisticaCaricata;

    default:
      return state;
  }
}

function versioniLivelloStatisticheFeedbackReducer(state = defaultVersioneStatisticheFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enabled,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_RESET:
    case VERSIONI_LIVELLO_STATISTICHE_DATA_RESET:
      return defaultVersioneStatisticheFeedback;
  }
}

const versioniLivelloStatisticheReducer = combineReducers({
  spinner: versioniLivelloStatisticheSpinnerReducer,
  feedback: versioniLivelloStatisticheFeedbackReducer,
  statisticheCaricate: versioniLivelloStatisticheCaricateReducer,
  didascalia: versioniLivelloStatisticheDidascaliaReducer,
});


export default versioniLivelloStatisticheReducer;

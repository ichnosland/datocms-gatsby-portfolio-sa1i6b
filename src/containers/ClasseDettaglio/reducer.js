/*
 *
 * ClasseDettaglio reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  CLASSE_DETTAGLIO_RESET,
  CLASSE_DETTAGLIO_CONTENUTO_SET,
  CLASSE_DETTAGLIO_FEEDBACK_SET,
  CLASSE_DETTAGLIO_FEEDBACK_RESET,
  CLASSE_DETTAGLIO_SPINNER_SET,
  CLASSE_DETTAGLIO_DISPLAY_SET,
} from './constants';


export const defaultClasseDettaglioContenuto = fromJS({
  sortedData: [],
  isCorsoLoaded: false,
  corsoNome: '',
  corsoId: 0,
  corsoIscritti: [],
  obiettivi: {
    isLoaded: false,
    data: undefined,
  },
  verificheLivello: {
    isLoaded: false,
    data: undefined,
  },
  versioniLivello: {
    isLoaded: false,
    data: undefined,
  },
  versioniMissione: {
    isLoaded: false,
    data: undefined,
  },
  proveCompetenza: {
    isLoaded: false,
    data: undefined,
  },
  grigliaValutazione: {
    isLoaded: false,
    data: undefined,
  },
  intestazioniColonna: [],
});

export const defaultClasseDettaglioFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultClasseDettaglioDisplay = fromJS({
  field: '',
  sort: 'asc',
  type: 'string',
  block: '',
});

function ClasseDettaglioSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_DETTAGLIO_FEEDBACK_SET:
    case CLASSE_DETTAGLIO_RESET:
      return fromJS(false);

    case CLASSE_DETTAGLIO_SPINNER_SET:
      return fromJS(action.enable);
  }
}

function ClasseDettaglioFeedbackReducer(state = defaultClasseDettaglioFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_DETTAGLIO_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.hasFeedback,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case CLASSE_DETTAGLIO_FEEDBACK_RESET:
    case CLASSE_DETTAGLIO_RESET:
      return defaultClasseDettaglioFeedback;
  }
}

function ClasseDettaglioDisplayReducer(state = defaultClasseDettaglioDisplay, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_DETTAGLIO_DISPLAY_SET:
      return state.merge(action.payload);

    case CLASSE_DETTAGLIO_RESET:
      return defaultClasseDettaglioDisplay;
  }
}

function ClasseDettaglioContenutoReducer(state = defaultClasseDettaglioContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_DETTAGLIO_CONTENUTO_SET:
      return state.merge(action.payload);

    case CLASSE_DETTAGLIO_RESET:
      return defaultClasseDettaglioContenuto;
  }
}

const ClasseDettaglioReducer = combineReducers({
  spinner: ClasseDettaglioSpinnerReducer,
  feedback: ClasseDettaglioFeedbackReducer,
  display: ClasseDettaglioDisplayReducer,
  contenuto: ClasseDettaglioContenutoReducer,
});

export default ClasseDettaglioReducer;

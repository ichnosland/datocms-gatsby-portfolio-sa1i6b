/*
 *
 * ClasseCreazione reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  CLASSE_CREAZIONE_DATA_SET,
  CLASSE_CREAZIONE_RESET,
  CLASSE_CREAZIONE_SPINNER_SET,
  CLASSE_CREAZIONE_FEEDBACK_SET,
  CLASSE_CREAZIONE_FEEDBACK_RESET,
  CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET,
  CLASSE_CREAZIONE_GEO_SET,
  CLASSE_CREAZIONE_GEO_COMUNI_SET,
  CLASSE_CREAZIONE_GEO_SCUOLE_SET,
} from './constants';


export const defaultClasseCreazioneScuoleAttive = fromJS({
  list: [],
  isLoaded: false,
});

export const defaultClasseCreazioneGeo = fromJS({
  province: [],
  isProvinceLoaded: false,
  comuni: {},
  scuole: {},
  indirizziDiStudio: [],
});

export const defaultClasseCreazioneFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultClasseCreazioneData = fromJS({
  display: 'scuoleAttive',
  scuolaSelezionata: undefined,
  creaNuovaClasse: false,
  classeSelezionata: undefined,
  provinciaSelezionata: undefined,
  comuneSelezionato: undefined,
  indirizzoDiStudioSelezionato: undefined,
  annoClasse: undefined,
  nomeClasse: undefined,
  pk: undefined,
  nuova: false,
});


function classeCreazioneSpinnerReducer(state = fromJS(false), action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_CREAZIONE_SPINNER_SET:
      return fromJS(action.enable);

    case CLASSE_CREAZIONE_RESET:
      return fromJS(false);
  }
}

function classeCreazioneFeedbackReducer(state = defaultClasseCreazioneFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_CREAZIONE_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.enable,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case CLASSE_CREAZIONE_RESET:
    case CLASSE_CREAZIONE_FEEDBACK_RESET:
      return defaultClasseCreazioneFeedback;
  }
}

function classeCreazioneDataReducer(state = defaultClasseCreazioneData, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_CREAZIONE_DATA_SET:
      return state.merge(action.payload);

    case CLASSE_CREAZIONE_RESET:
      return defaultClasseCreazioneData;
  }
}

function classeCreazioneScuoleAttiveReducer(state = defaultClasseCreazioneScuoleAttive, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET:
      return state.merge(action.payload);
  }
}

function classeCreazioneGeoReducer(state = defaultClasseCreazioneGeo, action) {
  switch (action.type) {
    default:
      return state;

    case CLASSE_CREAZIONE_GEO_COMUNI_SET:
      return state.merge({
        comuni: state.get('comuni').merge(action.payload),
      });

    case CLASSE_CREAZIONE_GEO_SCUOLE_SET:
      return state.merge({
        scuole: state.get('scuole').merge(action.payload),
      });

    case CLASSE_CREAZIONE_GEO_SET:
      return state.merge(action.payload);
  }
}

const classeCreazioneReducer = combineReducers({
  spinner: classeCreazioneSpinnerReducer,
  feedback: classeCreazioneFeedbackReducer,
  scuoleAttive: classeCreazioneScuoleAttiveReducer,
  geo: classeCreazioneGeoReducer,
  data: classeCreazioneDataReducer,
});

export default classeCreazioneReducer;

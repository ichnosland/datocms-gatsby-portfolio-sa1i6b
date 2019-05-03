/*
 *
 * GrigliaValutazioni reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  GRIGLIA_VALUTAZIONI_SPINNER_SET,
  GRIGLIA_VALUTAZIONI_FEEDBACK_SET,
  GRIGLIA_VALUTAZIONI_FEEDBACK_RESET,
  GRIGLIA_VALUTAZIONI_DISPLAY_SET,
  GRIGLIA_VALUTAZIONI_CONTENUTO_SET,
  GRIGLIA_VALUTAZIONI_VALUTABILI_SET,
  GRIGLIA_VALUTAZIONI_VALUTABILI_RESET,
  GRIGLIA_VALUTAZIONI_SELECTION_SET,
  GRIGLIA_VALUTAZIONI_SELECTION_RESET,
  GRIGLIA_VALUTAZIONI_RESET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_SET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_RESET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_SET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_RESET,
} from './constants';

const blocchi = [
  'obiettivi',
  'versioniLivello',
  'versioniMissione',
  'verificheLivello',
  'verificheMissione',
  'proveCompetenza',
];
const blocchiData = blocchi.reduce((acc, item) => {
  acc[item] = [];

  return acc;
}, {});

export const defaultGrigliaValutazioniFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultGrigliaValutazioniSpinner = fromJS({ default: false });

export const defaultGrigliaValutazioniValutabili = fromJS(blocchiData);
export const defaultGrigliaValutazioniSelection = fromJS({
  titolo: '',
  ...blocchiData,
});

export const defaultGrigliaValutazioniDisplay = fromJS({
  field: '',
  sort: 'asc',
  type: 'string',
  block: '',
});

export const defaultGrigliaValutazioniContenuto = fromJS({
  sortedData: [],
  isDataLoaded: false,
  nomeCorso: '',
  intestazioniColonna: [{
    blocchi,
    label: 'Titolo',
    field: 'titolo',
    type: 'string',
    style: {
      justifyContent: 'space-between',
    },
    fieldsDisplay: [{ field: 'titolo' }],
  }, {
    blocchi,
    label: 'Data',
    field: 'dataSortable',
    type: 'string',
    fieldsDisplay: [{ field: 'dataCreazione' }],
  }, {
    blocchi,
    label: 'Seleziona',
    field: 'checkboxSortable',
    type: 'string',
    fieldsDisplay: [{ field: 'checkbox' }],
  }],
});

export const defaultGrigliaValutazioniDettaglio = fromJS({
  sortedData: [],
  valutazioneId: 0,
  dataCreazione: '',
  corsoId: 0,
  titolo: '',
  data: '',
  tipologia: '',
  intestazioniColonna: [],
  corsoNome: '',
});

export const defaultGrigliaValutazioniDettaglioStudente = fromJS({
  isLoaded: false,
  nome: '',
  dataCreazioneValutazione: '',
  corsoNome: '',
  corsoId: 0,
  votoMedia: 0,
  verifiche: [],
  versioni: [],
  proveCompetenza: [],
  unita: [],
  valutazioneId: 0,
  valutazioneTitolo: '',
  valutazioneTipologia: '',
});

function grigliaValutazioniFeedbackReducer(state = defaultGrigliaValutazioniFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.hasFeedback,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case GRIGLIA_VALUTAZIONI_FEEDBACK_RESET:
    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniFeedback;
  }
}

function grigliaValutazioniValutabiliReducer(state = defaultGrigliaValutazioniValutabili, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_VALUTABILI_SET:
      return state.merge(action.payload);

    case GRIGLIA_VALUTAZIONI_VALUTABILI_RESET:
    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniValutabili;
  }
}

function grigliaValutazioniDisplayReducer(state = defaultGrigliaValutazioniDisplay, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_DISPLAY_SET:
      return state.merge(action.payload);

    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniDisplay;
  }
}

function grigliaValutazioniContenutoReducer(state = defaultGrigliaValutazioniContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_CONTENUTO_SET:
      return state.merge(action.payload);

    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniContenuto;
  }
}

function grigliaValutazioniSelectionReducer(state = defaultGrigliaValutazioniSelection, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_SELECTION_SET:
      return state.merge(action.payload);

    case GRIGLIA_VALUTAZIONI_SELECTION_RESET:
    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniSelection;
  }
}

function grigliaValutazioniDettaglioReducer(state = defaultGrigliaValutazioniDettaglio, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_DETTAGLIO_SET:
      return state.merge(action.payload);

    case GRIGLIA_VALUTAZIONI_DETTAGLIO_RESET:
    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniDettaglio;
  }
}

function grigliaValutazioniDettaglioStudenteReducer(state = defaultGrigliaValutazioniDettaglioStudente, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_SET:
      return state.merge(action.payload);

    case GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_RESET:
    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniDettaglioStudente;
  }
}

function grigliaValutazioniSpinnerDetailReducer(state = defaultGrigliaValutazioniSpinner, action) {
  switch (action.type) {
    default:
      return state;

    case GRIGLIA_VALUTAZIONI_FEEDBACK_SET:
    case GRIGLIA_VALUTAZIONI_RESET:
      return defaultGrigliaValutazioniSpinner;

    case GRIGLIA_VALUTAZIONI_SPINNER_SET:
      return state.merge({ [action.key]: action.value });
  }
}

const GrigliaValutazioniReducer = combineReducers({
  spinner: grigliaValutazioniSpinnerDetailReducer,
  feedback: grigliaValutazioniFeedbackReducer,
  display: grigliaValutazioniDisplayReducer,
  valutabili: grigliaValutazioniValutabiliReducer,
  selection: grigliaValutazioniSelectionReducer,
  contenuto: grigliaValutazioniContenutoReducer,
  dettaglio: grigliaValutazioniDettaglioReducer,
  dettaglioStudente: grigliaValutazioniDettaglioStudenteReducer,
});

export default GrigliaValutazioniReducer;

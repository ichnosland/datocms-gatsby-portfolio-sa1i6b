/*
 *
 * UnitaPreview reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  UNITA_ANDAMENTO_RESET,
  UNITA_ANDAMENTO_SPINNER_SET,
  UNITA_ANDAMENTO_FEEDBACK_SET,
  UNITA_ANDAMENTO_FEEDBACK_RESET,
  UNITA_ANDAMENTO_CONTENUTO_SET,
  UNITA_ANDAMENTO_SORT_SET,
} from './constants';

export const defaultUnitaAndamentoFeedback = fromJS({
  hasFeedback: false,
  tipologia: '',
  messaggio: '',
});

export const defaultUnitaAndamentoContenuto = fromJS({
  titolo: '',
  numeroLezioni: 0,
  prerequisito: 0,
  sortedData: [],
  totaleUnitaCompletate: 0,
  totaleUnitaIniziate: 0,
  totaleUnitaNonIniziate: 0,
  intestazioniColonna: [],
});

export const defaultUnitaAndamentoAndamentoSort = fromJS({
  field: 'nameSortable',
  sort: 'asc',
  type: 'string',
});

function unitaAndamentoSpinnerReducer(state = fromJS(true), action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_ANDAMENTO_RESET:
      return fromJS(true);

    case UNITA_ANDAMENTO_SPINNER_SET:
      return action.enable;
  }
}

function unitaAndamentoFeedbackReducer(state = defaultUnitaAndamentoFeedback, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_ANDAMENTO_FEEDBACK_SET:
      return state.merge({
        hasFeedback: action.hasFeedback,
        tipologia: action.tipologia,
        messaggio: action.messaggio,
      });

    case UNITA_ANDAMENTO_FEEDBACK_RESET:
    case UNITA_ANDAMENTO_RESET:
      return defaultUnitaAndamentoFeedback;
  }
}

function unitaAndamentoContenutoReducer(state = defaultUnitaAndamentoContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_ANDAMENTO_CONTENUTO_SET:
      return state.merge(action.payload);

    case UNITA_ANDAMENTO_RESET:
      return defaultUnitaAndamentoContenuto;
  }
}

function unitaAndamentoSortReducer(state = defaultUnitaAndamentoAndamentoSort, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_ANDAMENTO_SORT_SET:
      return state.merge(action.payload);

    case UNITA_ANDAMENTO_RESET:
      return defaultUnitaAndamentoAndamentoSort;
  }
}

const unitaAndamentoReducer = combineReducers({
  spinner: unitaAndamentoSpinnerReducer,
  feedback: unitaAndamentoFeedbackReducer,
  contenuto: unitaAndamentoContenutoReducer,
  display: unitaAndamentoSortReducer,
});

export default unitaAndamentoReducer;

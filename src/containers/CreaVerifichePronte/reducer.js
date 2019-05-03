/*
 *
 * CreaVerifichePronte reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CREA_VERIFICHE_PRONTE_FETCH,
  CREA_VERIFICHE_PRONTE_FETCH_ERROR,
  CREA_VERIFICHE_PRONTE_SET,
  CREA_VERIFICHE_PRONTE_SPINNER_SET,
} from './constants';

export const defaultVerifichePronte = fromJS({
  spinner: true,
  spinnerLoadEsercizio: false,
  loadingPrerequisitoVerifica: -1,
  verifichePronte: [],
  messaggioErrore: '',
});

function creaVerifichePronteReducer(state = defaultVerifichePronte, action) {
  switch (action.type) {
    case CREA_VERIFICHE_PRONTE_FETCH:
      return state;

    case CREA_VERIFICHE_PRONTE_SET:
      return state.merge(action.payload, { messaggioErrore: '' });

    case CREA_VERIFICHE_PRONTE_FETCH_ERROR:
      return state.merge({ messaggioErrore: action.messaggio });

    case CREA_VERIFICHE_PRONTE_SPINNER_SET:
      return state.merge({ spinner: action.enabled });

    default:
      return state;
  }
}

export default creaVerifichePronteReducer;

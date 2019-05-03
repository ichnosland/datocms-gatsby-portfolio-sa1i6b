/*
 *
 * CreaVerifiche reducer
 *
 */
import { fromJS } from 'immutable';

import { createStepKey } from 'common/esercizi';
import {
  CREA_VERIFICHE_SET,
  CREA_VERIFICHE_FETCH,
  CREA_VERIFICHE_SPINNER_SET,
  CREA_VERIFICHE_VERIFICA_SET,
  CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD,
  CREA_VERIFICHE_VERIFICA_ESERCIZIO_REMOVE,
  CREA_VERIFICHE_FETCH_ERROR,
  CREA_VERIFICHE_POST_ERROR,
} from './constants';

export const defaultMytestUnita = fromJS({
  spinner: true,
  steps: [],
  titoloUnita: '',
  titoloMissione: '',
  titoloLivello: '',
  verifica: {
    eserciziSelezionati: [],
    titolo: '',
    note: '',
    anteprimaStampa: false,
    verificheCreate: [],
    key: -1,
  },
  messaggioErrore: '',
});

function creaVerificheReducer(state = defaultMytestUnita, action) {
  switch (action.type) {
    case CREA_VERIFICHE_FETCH:
      return state;

    case CREA_VERIFICHE_SET:
      return state.merge(action.payload, { messaggioErrore: '' });

    case CREA_VERIFICHE_FETCH_ERROR:
    case CREA_VERIFICHE_POST_ERROR:
      return state.merge({ messaggioErrore: action.messaggio });

    case CREA_VERIFICHE_SPINNER_SET:
      return state.merge({ spinner: action.enabled });

    case CREA_VERIFICHE_VERIFICA_SET:
      return state.merge({
        verifica: {
          ...state.toJS().verifica,
          ...action.payload,
        },
        messaggioErrore: '',
      });

    case CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD:
      return state.merge({
        verifica: {
          ...state.toJS().verifica,
          eserciziSelezionati: [
            ...state.toJS().verifica.eserciziSelezionati.filter(
              (elemento) => (elemento.key !== createStepKey(action.step.idEsercizio, action.step.idsElementi))
            ), {
              ...action.step,
            }],
        },
      });

    case CREA_VERIFICHE_VERIFICA_ESERCIZIO_REMOVE:
      return state.merge({
        verifica: {
          ...state.toJS().verifica,
          eserciziSelezionati: [
            ...state.toJS().verifica.eserciziSelezionati.filter(
              (elemento) => (elemento.key !== createStepKey(action.step.idEsercizio, action.step.idsElementi))
            )],
        },
      });

    default:
      return state;
  }
}

export default creaVerificheReducer;

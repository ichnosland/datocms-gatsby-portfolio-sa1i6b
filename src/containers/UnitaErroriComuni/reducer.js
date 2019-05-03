/*
 *
 * UnitaErroriComuniPreview reducer
 *
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  UNITA_ERRORI_COMUNI_CONTENUTO_SET,
  UNITA_ERRORI_COMUNI_RESET,
  UNITA_ERRORI_COMUNI_RISPOSTA_SET,
  UNITA_ERRORI_COMUNI_RISPOSTA_RESET,
  UNITA_ERRORI_COMUNI_STEP_SET,
} from './constants';

export const defaultUnitaErroriComuniContenuto = fromJS({
  isLoaded: false,
  inCorso: false,
  consegnata: false,
  unitaId: 0,
  titolo: '',
  totaleDomande: -1,
  voto: -1,
  steps: [],
  risposteFornite: {},
  stepCaricato: 0,
  missione: 0,
  openedSections: {},
});

export const defaultUnitaErroriComuniRisposta = fromJS({
  rispostaSelezionata: undefined,
  isCheckable: false,
  isChecked: false,
  isCorrect: false,
  isPristine: true,
  isInterfaceLocked: false,
  correzioneStep: {
    corrette: [],
    sbagliate: [],
    soluzione: undefined,
  },
  mostraSoluzione: false,
  mostraCorrezione: false,
  isHelpEnabled: false,
  isFocusEnabled: false,
});

export const defaultUnitaErroriComuniStep = fromJS({
  testi: [],
  esercizi: [],
  isStepLoaded: false,
  numeroProgressivoStep: 0,
  nextStep: undefined,
});

function unitaErroriComuniContenutoReducer(state = defaultUnitaErroriComuniContenuto, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_ERRORI_COMUNI_CONTENUTO_SET:
      return state.merge(action.payload);

    case UNITA_ERRORI_COMUNI_RESET:
      return defaultUnitaErroriComuniContenuto;
  }
}

function unitaErroriComuniStepReducer(state = defaultUnitaErroriComuniStep, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_ERRORI_COMUNI_STEP_SET:
      return state.merge(action.payload);

    case UNITA_ERRORI_COMUNI_RESET:
      return defaultUnitaErroriComuniStep;
  }
}

function unitaErroriComuniRispostaReducer(state = defaultUnitaErroriComuniRisposta, action) {
  switch (action.type) {
    default:
      return state;

    case UNITA_ERRORI_COMUNI_RISPOSTA_SET:
      return state.merge(action.payload);

    case UNITA_ERRORI_COMUNI_RISPOSTA_RESET:
    case UNITA_ERRORI_COMUNI_RESET:
      return defaultUnitaErroriComuniRisposta;
  }
}

const unitaErroriComuniReducer = combineReducers({
  contenuto: unitaErroriComuniContenutoReducer,
  step: unitaErroriComuniStepReducer,
  risposta: unitaErroriComuniRispostaReducer,
});

export default unitaErroriComuniReducer;

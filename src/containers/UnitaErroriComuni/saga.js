import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import {
  getIdsElementiEsercizio,
  calcolaSoluzioni,
  correggiRisposta,
  creaTestoReadable,
  createStepFromEsercizi,
  normalizzaRispostaSelezionata,
} from 'common/esercizi';
import { playSound } from 'common/suoni';
import { modalSetData } from 'containers/ModalBox/actions';

import {
  UNITA_ERRORI_COMUNI_URL_FETCH,
  UNITA_ERRORI_COMUNI_STEP_INITIALIZE,
  UNITA_ERRORI_COMUNI_STEP_NEXT,
  UNITA_ERRORI_COMUNI_RISPOSTA_POST,
} from './constants';
import {
  unitaErroriComuniContenutoSet,
  unitaErroriComuniReset,
  unitaErroriComuniStepSet,
  unitaErroriComuniRispostaReset,
  unitaErroriComuniRispostaSet,
} from './actions';


/**
 * Esegue l'inizializzazione del contenuto dell'esercizio
 * @param {Object} data.payload parametri della richiesta
 * @param {Number} data.payload.corsoId id del corso
 * @param {Number} data.payload.prerequisitoId pk del prerequisito
 * @param {Number} data.payload.unitaId pk dell'unità
 * @param {Function} data.payload.historyPush funzione di push della history
 */
export function* unitaErroriComuniStepInitialize(data) { // eslint-disable-line no-unused-vars
  yield put(unitaErroriComuniReset());

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${UNITA_ERRORI_COMUNI_URL_FETCH}${data.payload.prerequisitoId}/${data.payload.corsoId}`
    );

    if (response.data.length === 0) {
      yield put(modalSetData({
        contenuto: 'Non sono disponibili errori frequenti per questa unità',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    } else {
      const loadedSteps = createStepFromEsercizi(response.data).map((step, k) => ({
        ...step,
        id: k,
      }));

      yield put(unitaErroriComuniContenutoSet({
        steps: loadedSteps,
        risposteFornite: {},
        stepCaricato: 0,
        titolo: 'Errori frequenti',
        isLoaded: true,
        totaleDomande: loadedSteps.length,
        unitaId: data.payload.unitaId,
      }));

      yield put(unitaErroriComuniStepSet({
        testi: loadedSteps[0].testi,
        esercizi: loadedSteps[0].esercizi,
        numeroProgressivoStep: loadedSteps[0].id,
        isStepLoaded: true,
      }));

      yield call(data.payload.historyPush, `/errori-frequenti/${data.payload.unitaId}`);
    }
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Impossibile caricare gli errori frequenti per questa unità',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
}

/**
 * Invia via post i dati della risposta inserita dall'utente
 * e prepara i dati del prossimo step da eseguire
 * @param {object} data dati della funzione
 * @param {object} data.payload payload della funzione
 * @param {object} data.payload.step gestione degli step
 * @param {array} data.payload.step.testi testi dello step
 * @param {array} data.payload.step.esercizi esercizi dello step
 * @param {number} data.payload.step.numeroProgressivoStep numero dello step corrente
 * @param {object} data.payload.risposta dati relativi alla risposta e alla sua validazione
 * @param {object/array} data.payload.risposta.rispostaSelezionata contiene la risposta selezionata
 * @param {bool} data.payload.helpRequest indica se è stata fatta una richiesta di help
 * @param {object} data.payload.contenutoEsercizio contiene i dati della prova per competenza
 * @param {object} data.payload.contenutoEsercizio.risposteFornite risposte fornite dall'utente
 * @param {number} data.payload.contenutoEsercizio.stepCaricato id dello step caricato
 * @param {number} data.payload.contenutoEsercizio.id id della prova / assegnazione
 * @param {bool} data.payload.enableSuoni indica se i suoni sono attivi
 */
export function* unitaErroriComuniRispostaPost(data) {
  const step = data.payload.step;
  const risposteFornite = data.payload.contenutoEsercizio.risposteFornite;
  const risposta = data.payload.risposta;
  const rispostaAnalizzata = normalizzaRispostaSelezionata(
    risposta.rispostaSelezionata,
    step.esercizi[0].tipo
  );

  const { fallbackRisposta, rispostaSelezionata, rispostaNormalizzata } = rispostaAnalizzata;

  const correzioneRisposta = {
    isCorrect: false,
    corrette: [],
    sbagliate: [],
    soluzione: undefined,
    ...correggiRisposta(step, rispostaAnalizzata),
  };

  if (data.payload.helpRequest || !correzioneRisposta.isCorrect) {
    correzioneRisposta.soluzione = calcolaSoluzioni(
      step.testi, step.esercizi
    );
  }

  const dataToSet = {
    isChecked: true,
    isPristine: false,
    isCorrect: correzioneRisposta.isCorrect,
    mostraSoluzione: data.payload.helpRequest || !correzioneRisposta.isCorrect,
    mostraCorrezione: !data.payload.helpRequest,
    isHelpEnabled: data.payload.helpRequest,
    isInterfaceLocked: true,
    correzioneStep: {
      corrette: correzioneRisposta.corrette,
      sbagliate: correzioneRisposta.sbagliate,
      soluzione: correzioneRisposta.soluzione,
    },
  };

  const basePostData = {
    tipo: step.esercizi[0].tipo,
    step: step.numeroProgressivoStep,
    help_request: data.payload.helpRequest,
    risposta: data.payload.helpRequest ? fallbackRisposta : rispostaNormalizzata,
    readable: creaTestoReadable(rispostaSelezionata, step, data.payload.helpRequest),
    elementi: getIdsElementiEsercizio(step),
    esercizio: step.esercizi[0].esercizioId,
  };

  if (data.payload.helpRequest) {
    yield call(playSound, 'step_aiuto', !data.payload.enableSuoni);
  } else if (correzioneRisposta.isCorrect) {
    yield call(playSound, 'step_corretto', !data.payload.enableSuoni);
  } else {
    yield call(playSound, 'step_sbagliato', !data.payload.enableSuoni);
  }

  const contenutoDataSet = {};
  contenutoDataSet.risposteFornite = {
    ...risposteFornite,
    [data.payload.contenutoEsercizio.stepCaricato]: {
      ...basePostData,
      stato: correzioneRisposta.isCorrect ? 'C' : 'S',
      corretta: correzioneRisposta.isCorrect,
    },
  };

  const nextStepId = data.payload.contenutoEsercizio.stepCaricato + 1;
  contenutoDataSet.stepCaricato = nextStepId;

  if (nextStepId >= data.payload.contenutoEsercizio.steps.length) {
    yield put(unitaErroriComuniStepSet({
      nextStep: null,
    }));
  } else {
    yield put(unitaErroriComuniStepSet({
      nextStep: {
        testi: data.payload.contenutoEsercizio.steps[nextStepId].testi,
        esercizi: data.payload.contenutoEsercizio.steps[nextStepId].esercizi,
        numeroProgressivoStep: nextStepId,
        isStepLoaded: true,
      },
    }));
  }
  yield put(unitaErroriComuniContenutoSet(contenutoDataSet));
  yield put(unitaErroriComuniRispostaSet(dataToSet));
}


/**
 * Esegue l'avanzamento di step
 * @param {Object} data dati della funzione
 * @param {Object} data.payload payload della funzione
 * @param {Object} data.payload.step gestione degli step
 * @param {Object} data.payload.step.nextStep contenuto del prossimo step da caricare
 * @param {Boolean} data.payload.enableSuoni indica se i suoni sono attivati
 */
export function* unitaErroriComuniStepNext(data) {
  const nextStep = data.payload.step.nextStep;

  if (nextStep) {
    yield put(unitaErroriComuniStepSet({
      ...nextStep,
      nextStep: undefined,
      isStepLoaded: true,
    }));
  } else {
    yield put(unitaErroriComuniContenutoSet({
      consegnata: true,
    }));
    yield call(playSound, 'vinto', !data.payload.enableSuoni);
  }

  yield put(unitaErroriComuniRispostaReset());
}


export default function* watchUnitaErroriComuni() {
  yield takeEvery(UNITA_ERRORI_COMUNI_STEP_INITIALIZE, unitaErroriComuniStepInitialize);
  yield takeEvery(UNITA_ERRORI_COMUNI_RISPOSTA_POST, unitaErroriComuniRispostaPost);
  yield takeEvery(UNITA_ERRORI_COMUNI_STEP_NEXT, unitaErroriComuniStepNext);
}

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
  calcolaChildrenTesto,
} from 'common/esercizi';
import { playSound } from 'common/suoni';
import {
  ESERCIZIO_PREVIEW_URL_FETCH,
  ESERCIZIO_PREVIEW_STEP_INITIALIZE,
  ESERCIZIO_PREVIEW_STEP_NEXT,
  ESERCIZIO_PREVIEW_RISPOSTA_POST,
} from './constants';
import {
  esercizioPreviewContenutoSet,
  esercizioPreviewSpinnerSet,
  esercizioPreviewReset,
  esercizioPreviewStepSet,
  esercizioPreviewRispostaReset,
  esercizioPreviewRispostaSet,
  esercizioPreviewFeedbackSet,
} from './actions';


/**
 * Esegue l'inizializzazione del contenuto dell'esercizio
 * @param {Object} data parametri della richiesta
 * @param {Number} data.id id dell'assegnazione / prova
 * @param {Boolean} data.parseMultimedia indica se è richiesto il parsing del contenuto multimediale
 */
export function* esercizioPreviewStepInitialize(data) { // eslint-disable-line no-unused-vars
  yield put(esercizioPreviewSpinnerSet(true));
  yield put(esercizioPreviewReset());

  try {
    const response = yield call(axios.get, `${API_BASE_PATH}${ESERCIZIO_PREVIEW_URL_FETCH}${data.id}`);
    let loadedSteps = createStepFromEsercizi(response.data.elementi).map((step, k) => ({
      ...step,
      id: k,
    }));

    if (data.parseMultimedia) {
      /*
        FIXME: calcolo il testo della consegna sull'html pulito
        e non sull'html generato da cloudschooling.

        Posso fare questo perché non mi serve avere il lessico,
        quindi sovrascrivo tutto usando testo_principale.
      */
      loadedSteps = loadedSteps.map((s) => ({
        ...s,
        testi: s.testi.map((st) => ({
          ...st,
          testoConsegna: calcolaChildrenTesto(st.testo_principale),
        })),
      }));
    };

    yield put(esercizioPreviewContenutoSet({
      steps: loadedSteps,
      risposteFornite: {},
      stepCaricato: 0,
      titolo: 'Preview esercizio',
      isLoaded: true,
      totaleDomande: loadedSteps.length,
      id: data.id,
    }));

    yield put(esercizioPreviewStepSet({
      testi: loadedSteps[0].testi,
      esercizi: loadedSteps[0].esercizi,
      numeroProgressivoStep: loadedSteps[0].id,
      isStepLoaded: true,
    }));
  } catch (error) {
    yield put(esercizioPreviewFeedbackSet(
      true,
      'error',
      'Impossibile caricare questa esecuzione'
    ));
  }

  yield put(esercizioPreviewSpinnerSet(false));
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
export function* esercizioPreviewRispostaPost(data) {
  yield put(esercizioPreviewSpinnerSet(true));
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
    yield put(esercizioPreviewStepSet({
      nextStep: null,
    }));
  } else {
    yield put(esercizioPreviewStepSet({
      nextStep: {
        testi: data.payload.contenutoEsercizio.steps[nextStepId].testi,
        esercizi: data.payload.contenutoEsercizio.steps[nextStepId].esercizi,
        numeroProgressivoStep: nextStepId,
        isStepLoaded: true,
      },
    }));
  }
  yield put(esercizioPreviewContenutoSet(contenutoDataSet));
  yield put(esercizioPreviewRispostaSet(dataToSet));
  yield put(esercizioPreviewSpinnerSet(false));
}


/**
 * Esegue l'avanzamento di step
 * @param {object} data dati della funzione
 * @param {object} data.payload payload della funzione
 * @param {object} data.payload.step gestione degli step
 * @param {object} data.payload.step.nextStep contenuto del prossimo step da caricare
 */
export function* esercizioPreviewStepNext(data) {
  const nextStep = data.payload.step.nextStep;

  if (nextStep) {
    yield put(esercizioPreviewStepSet({
      ...nextStep,
      nextStep: undefined,
      isStepLoaded: true,
    }));
  } else {
    yield put(esercizioPreviewContenutoSet({
      consegnata: true,
    }));
  }

  yield put(esercizioPreviewRispostaReset());
}

export default function* watchEsercizioPreview() {
  yield takeEvery(ESERCIZIO_PREVIEW_STEP_INITIALIZE, esercizioPreviewStepInitialize);
  yield takeEvery(ESERCIZIO_PREVIEW_RISPOSTA_POST, esercizioPreviewRispostaPost);
  yield takeEvery(ESERCIZIO_PREVIEW_STEP_NEXT, esercizioPreviewStepNext);
}

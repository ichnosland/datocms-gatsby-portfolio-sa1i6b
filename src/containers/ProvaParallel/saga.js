import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import {
  getIdsElementiEsercizio,
  correggiRisposta,
  creaTestoReadable,
  createStepFromEsercizi,
  normalizzaRispostaSelezionata,
  buildStepRepresentationPreview,
  calcolaChildrenTesto,
} from 'common/esercizi';
import { modalSetData } from 'containers/ModalBox/actions';
import { googleAnalyticsWrapper } from 'common/utils';
import errore from 'images/infocard-icn_errore.png';

import {
  PROVA_PARALLEL_URL_OVERVIEW_FETCH,
  PROVA_PARALLEL_URL_PREVIEW_FETCH,
  PROVA_PARALLEL_URL_ESECUZIONE_FETCH,
  // PROVA_PARALLEL_URL_INVIA_REPORT,

  PROVA_PARALLEL_OVERVIEW_FETCH,
  PROVA_PARALLEL_PREVIEW_FETCH,
  PROVA_PARALLEL_ESECUZIONE_FETCH,
  PROVA_PARALLEL_RISPOSTA_POST,
  PROVA_PARALLEL_INVIA_REPORT,

} from './constants';
import {
  provaParallelOverviewSet,
  provaParallelPreviewSet,
  provaParallelPreviewReset,
  provaParallelEsecuzioneSet,
  provaParallelEsecuzioneReset,
  provaParallelSpinnerSet,
  provaParallelReset,
  provaParallelFeedbackSet,
  provaParallelFeedbackReset,
  provaParallelStepSet,
  provaParallelRispostaReset,
  provaParallelInviaReport,
} from './actions';


/**
 * Carica i dati generali della prova parallel
 * @param {Object} data parametri della richiesta
 * @param {Number} data.id pk della prova da cercare
 */
export function* provaParallelOverviewFetchSaga(data) {
  yield put(provaParallelReset());
  yield put(provaParallelSpinnerSet(true));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${PROVA_PARALLEL_URL_OVERVIEW_FETCH}${data.id}`
    );

    yield put(provaParallelOverviewSet({
      titolo: response.data.titolo,
      testo: response.data.testo,
      autore: response.data.autore,
      fonte: response.data.fonte,
      totaleDomande: response.data.totale_domande,
      id: response.data.id,
      isLoaded: true,
    }));
  } catch (error) {
    yield put(provaParallelFeedbackSet(
      true,
      'error',
      'Impossibile scaricare questa prova per Parallel',
    ));
  }
  yield put(provaParallelSpinnerSet(false));
}

/**
 * Carica i dati relativi alla preview della prova parallel
 * @param {Object} data parametri della richiesta
 * @param {Number} data.id pk della prova
 */
export function* provaParallelPreviewFetchSaga(data) {
  yield put(provaParallelPreviewReset());
  yield put(provaParallelFeedbackReset());
  yield put(provaParallelSpinnerSet(true));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${PROVA_PARALLEL_URL_PREVIEW_FETCH}${data.id}`
    );

    const steps = response.data.steps.map((step) => ({
      id: step.id,
      ...createStepFromEsercizi(step.elementi)[0],
    }));

    yield put(provaParallelPreviewSet({
      id: response.data.id,
      titolo: response.data.titolo,
      steps: buildStepRepresentationPreview(steps),
      isLoaded: true,
    }));
  } catch (error) {
    yield put(provaParallelFeedbackSet(
      true,
      'error',
      'Impossibile eseguire la preview di questa prova Parallel',
    ));
  }
  yield put(provaParallelSpinnerSet(false));
}


/**
 * Carica i dati relativi all'esecuzione della prova parallel
 * @param {Object} data.payload parametri della richiesta
 * @param {Number} data.payload.id pk della prova
 * @param {Number} data.payload.disciplinaId pk della disciplina
 * @param {String} data.payload.product nome del prodotto
 */
export function* provaParallelEsecuzioneFetchSaga(data) {
  yield put(provaParallelEsecuzioneReset());
  yield put(provaParallelFeedbackReset());
  yield put(provaParallelSpinnerSet(true));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${PROVA_PARALLEL_URL_ESECUZIONE_FETCH}${data.payload.id}`
    );

    const steps = response.data.steps.map((step) => ({
      id: step.id,
      numeroProgressivoStep: step.id,
      ...createStepFromEsercizi(step.elementi)[0],
    }))
      /*
        FIXME: calcolo il testo della consegna sull'html pulito
        e non sull'html generato da cloudschooling.

        Posso fare questo perché non mi serve avere il lessico,
        quindi sovrascrivo tutto usando testo_principale.

        Il problema è che quando ho delle immagini da
        CS arriva spazzatura dentro elem.html perché gli url vengono
        parsati come fosse lessico e quindi arriva da back-end
        spazzatura wrappata da tag lessico.
        Potrò sistemarlo solo una volta che avremo fatto fuori
        le vecchie academy. Nel frattempo sovrascriviamo
        testoConsegna con testo_principale per i testi dello step.
      */
      .map((s) => ({
        ...s,
        testi: s.testi.map((st) => ({
          ...st,
          testoConsegna: calcolaChildrenTesto(st.testo_principale),
        })),
      }));

    let stepCaricato = 0;
    const localData = localStorage.getItem(
      `provaparallel_${data.payload.product}_${data.payload.disciplinaId}_${data.payload.id}`
    );

    let risposteFornite = {};
    if (localData) {
      try {
        risposteFornite = JSON.parse(localData);
        stepCaricato = Math.max(...Object.keys(risposteFornite).map((k) => parseInt(k, 10)), -1) + 1;
        /*
          Se per qualche motivo sono all'ultimo step ma non l'ho
          consegnato, faccio rieseguire l'ultimo step
        */
        if (steps.length === stepCaricato) {
          delete risposteFornite[stepCaricato - 1];
          stepCaricato = steps.length - 1;
        } else if (!steps[stepCaricato]) {
          stepCaricato = 0;
          risposteFornite = {};
        }
      } /* istanbul ignore next */ catch (e) { /* non gestisco */ }
    }

    yield put(provaParallelEsecuzioneSet({
      steps,
      stepCaricato,
      id: response.data.id,
      titolo: response.data.titolo,
      testo: response.data.testo,
      risposteFornite,
      isLoaded: true,
    }));

    const stepInCorso = steps[stepCaricato];
    yield put(provaParallelStepSet({
      testi: stepInCorso.testi,
      esercizi: stepInCorso.esercizi,
      numeroProgressivoStep: stepInCorso.id,
      id: stepInCorso.id,
    }));

    yield call(googleAnalyticsWrapper, 'event', {
      category: 'Prova Parallel',
      action: 'Preview',
    });

    yield put(modalSetData({
      titolo: 'Esecuzione prova parallel',
      contenuto: `
        <p>Sono un popup con le <strong>istruzioni di esecuzione</strong></p>
      `,
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  } catch (error) {
    yield put(provaParallelFeedbackSet(
      true,
      'error',
      'Impossibile eseguire questa prova Parallel',
    ));
  }
  yield put(provaParallelSpinnerSet(false));
}


/**
 * Invia via post i dati della risposta inserita dall'utente
 * e prepara i dati del prossimo step da eseguire
 * @param {Object} data.payload payload della funzione
 * @param {Object[]} data.payload.steps step della prova
 * @param {Object} data.payload.step step caricato
 * @param {Object[]} data.payload.step.testi testi dello step
 * @param {Object[]} data.payload.step.esercizi esercizi dello step
 * @param {Number} data.payload.step.numeroProgressivoStep numero dello step caricato
 * @param {(Object|Object[])} data.payload.rispostaSelezionata contiene la risposta selezionata
 * @param {Boolean} data.payload.skipRequest indica se è stata fatta una richiesta di skip
 * @param {Object} data.payload.risposteFornite risposte fornite dall'utente
 * @param {Function} data.payload.historyPush funzione di push della history
 * @param {Number} data.payload.disciplinaId pk della disciplina
 * @param {String} data.payload.product nome del prodotto
 * @param {Number} data.payload.stepCaricato id dello step caricato
 * @param {Number} data.payload.idProvaParallel id della prova parallel // FIXME
 */
export function* provaParallelRispostaPost(data) {
  yield put(provaParallelSpinnerSet(true));

  try {
    const step = data.payload.step;
    const steps = data.payload.steps;
    const risposteFornite = data.payload.risposteFornite;
    const risposta = data.payload.rispostaSelezionata;
    const rispostaAnalizzata = normalizzaRispostaSelezionata(
      risposta,
      step.esercizi[0].tipo
    );
    const { fallbackRisposta, rispostaSelezionata, rispostaNormalizzata } = rispostaAnalizzata;
    const isCorrect = correggiRisposta(step, rispostaAnalizzata).isCorrect;

    const basePostData = {
      tipo: step.esercizi[0].tipo,
      step: step.numeroProgressivoStep,
      skip: data.payload.skipRequest,
      risposta: data.payload.skipRequest ? fallbackRisposta : rispostaNormalizzata,
      readable: creaTestoReadable(
        rispostaSelezionata,
        step,
        false,
        data.payload.skipRequest
      ),
      elementi: getIdsElementiEsercizio(step),
      esercizio: step.esercizi[0].esercizioId,
    };

    const risposteForniteAggiornate = {
      ...risposteFornite,
      [data.payload.stepCaricato]: {
        ...basePostData,
        stato: isCorrect ? 'C' : 'S',
        corretta: isCorrect,
      },
    };

    const nextStepId = data.payload.stepCaricato + 1;

    if (nextStepId >= steps.length) {
      yield put(provaParallelInviaReport({
        historyPush: data.payload.historyPush,
        idProvaParallel: data.payload.idProvaParallel,
        disciplinaId: data.payload.disciplinaId,
        product: data.payload.product,
        risposteFornite: risposteForniteAggiornate,
      }));
    } else {
      yield put(provaParallelStepSet({
        testi: steps[nextStepId].testi,
        esercizi: steps[nextStepId].esercizi,
        numeroProgressivoStep: nextStepId,
        id: nextStepId,
      }));

      localStorage.setItem(
        `provaparallel_${data.payload.product}_${data.payload.disciplinaId}_${data.payload.idProvaParallel}`,
        JSON.stringify(risposteForniteAggiornate)
      );

      yield put(provaParallelEsecuzioneSet({
        stepCaricato: nextStepId,
        risposteFornite: risposteForniteAggiornate,
      }));
    }
    yield put(provaParallelRispostaReset());
  } catch /* istanbul ignore next */ (e) /* istanbul ignore next */ {
    yield put(modalSetData({
      contenuto: 'Non ho potuto correggere questa risposta',
      closeButton: {
        text: 'Ok',
      },
      image: {
        src: errore,
        width: '180px',
        height: '130px',
        alt: 'Errore',
      },
      show: true,
    }));
  }
  yield put(provaParallelSpinnerSet(false));
}


/**
 * Effettua la consegna della prova per parallel 
 *
 * @param {Object} data
 * @param {Number} data.payload.idProvaParallel id della prova parallel // FIXME
 * @param {Object} data.payload.risposteFornite oggetto con le risposte fornire (docente)
 * @param {Object} data.payload.historyPush funzione di push della history
 * @param {Number} data.payload.disciplinaId pk della disciplina
 * @param {String} data.payload.product nome del prodotto
 */
export function* provaParallelInviaReportProvaSaga(data) {
  try {
    // const consegnaResponse = yield call(
    //   axios.post,
    //   `${API_BASE_PATH}${PROVA_PARALLEL_URL_INVIA_REPORT}`, {
    //     id: data.payload.idProvaParallel,
    //     risposte: data.payload.risposteFornite,
    //   }
    // );

    yield call(googleAnalyticsWrapper, 'event', {
      category: 'Esecuzione parallel',
      action: 'Consegna',
    });

    yield put(provaParallelEsecuzioneSet({
      consegnata: true,
      risposteFornite: data.payload.risposteFornite,
    }));

    localStorage.removeItem(
      `provaparallel_${data.payload.product}_${data.payload.disciplinaId}_${data.payload.idProvaParallel}`
    );

    yield call(data.payload.historyPush, '/prova-parallel-response');
  } catch /* istanbul ignore next */ (e) /* istanbul ignore next */ {
    yield put(modalSetData({
      contenuto: 'Non ho potuto consegnare, riprova',
      closeButton: {
        text: 'Ok',
      },
      image: {
        src: errore,
        width: '180px',
        height: '130px',
        alt: 'Errore',
      },
      show: true,
    }));
  }
}

export default function* provaParallelSaga() {
  yield takeEvery(PROVA_PARALLEL_OVERVIEW_FETCH, provaParallelOverviewFetchSaga);
  yield takeEvery(PROVA_PARALLEL_PREVIEW_FETCH, provaParallelPreviewFetchSaga);
  yield takeEvery(PROVA_PARALLEL_ESECUZIONE_FETCH, provaParallelEsecuzioneFetchSaga);
  yield takeEvery(PROVA_PARALLEL_RISPOSTA_POST, provaParallelRispostaPost);
  yield takeEvery(PROVA_PARALLEL_INVIA_REPORT, provaParallelInviaReportProvaSaga);
}

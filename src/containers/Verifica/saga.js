import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import checkmark from 'images/infocard-icn_checkmark.png';
import { API_BASE_PATH } from 'configuration';
import {
  getIdsElementiEsercizio,
  correggiRisposta,
  creaTestoReadable,
  createStepFromEsercizi,
  normalizzaRispostaSelezionata,
} from 'common/esercizi';
import { getHintToDisplay } from 'common/hints';
import { playSound } from 'common/suoni';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { userHintDisplay } from 'containers/User/actions';
import { googleAnalyticsWrapper } from 'common/utils';
import {
  VERIFICA_URL_LIVELLO_DOCENTE_FETCH,
  VERIFICA_URL_LIVELLO_STUDENTE_FETCH,
  VERIFICA_URL_ASSEGNA,
  VERIFICA_URL_RITIRA,
  VERIFICA_URL_LIVELLO_PROVA,
  VERIFICA_URL_STEP_STUDENTE_FETCH,
  VERIFICA_URL_STEP_STUDENTE_POST,
  VERIFICA_URL_CONSEGNA_STUDENTE,

  VERIFICA_LIVELLO_FETCH,
  VERIFICA_LIVELLO_PROVA_TRIGGER,
  VERIFICA_CONSEGNA,
  VERIFICA_URL_CONSEGNA_DOCENTE,
  VERIFICA_ASSEGNA_TRIGGER,
  VERIFICA_RITIRA_TRIGGER,
  VERIFICA_STEP_INITIALIZE,
  VERIFICA_RISPOSTA_POST,
} from './constants';
import {
  verificaLivelloSet,
  verificaLivelloSpinnerSet,
  verificaContenutoSet,
  verificaSpinnerSet,
  verificaReset,
  verificaFeedbackSet,
  verificaStepSet,
  verificaStepReset,
  verificaRispostaReset,
  verificaConsegna,
} from './actions';


/**
 * Dato in input un array contenente le verifiche assegnate
 * restituisce un array contenente le pk di tutte le unità
 * utilizzate al loro interno
 * @param {Object[]} verificheAssegnate elenco delle verifiche assegnate
 * @param {Object[]} verificheAssegnate[].unita elenco delle unità di una singola verifica
 * @param {Number} verificheAssegnate[].unita[].id pk di ogni singola unità che compone la verifica
 * @returns {Object[]} elenco delle pk delle singole unità
 */
export const getVerificheAssegnateIds = (verificheAssegnate) => (
  verificheAssegnate.reduce((acc, item) => {
    const pks = acc.concat(item.unita.map((u) => (u.id)));
    return pks;
  }, []));


/**
 * Carica i dati delle info relative alla verifica
 * @param {Object} data parametri della richiesta
 * @param {Number} data.livelloId pk del livello
 * @param {Boolean} data.isDocente indica se l'utente è un docente
 * @param {Number} data.corsoId id del corso (se docente)
 * @param {Object[]} data.idsUnita unità da preselezionare
 * @param {Boolean} data.soloLatino flag se usare solo latino; false di default
 */
export function* verificaLivelloFetchSaga(data) {
  yield put(verificaSpinnerSet(true));
  yield put(verificaReset());

  try {
    let response;
    if (data.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERIFICA_URL_LIVELLO_DOCENTE_FETCH}${data.livelloId}/${data.corsoId}`
      );

      const pkVerificheAssegnate = getVerificheAssegnateIds(response.data.verifiche_assegnate);
      const unita = response.data.unita.map(
        (u) => ({ ...u, inVerifica: pkVerificheAssegnate.indexOf(u.id) > -1 })
      );

      yield put(verificaLivelloSet({
        titolo: response.data.label_verifica,
        unitSelectionEnabled: response.data.enable_unit_selection,
        unita,
        verificheAssegnate: response.data.verifiche_assegnate,
        datiVerifica: {
          soloLatino: data.soloLatino,
          unitaSelezionate: data.idsUnita.filter(
            (u) => unita
              .filter((i) => (!i.inVerifica))
              .map((j) => (j.id)).indexOf(u) > -1
          ),
        },
        isLoaded: true,
      }));
    } else {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERIFICA_URL_LIVELLO_STUDENTE_FETCH}${data.livelloId}`
      );

      yield put(verificaLivelloSet({
        verificheAssegnate: response.data,
        isLoaded: true,
      }));
    }
  } catch (error) {
    yield put(verificaFeedbackSet(
      true,
      'error',
      'Impossibile scaricare le verifiche di questo livello',
    ));
  }
  yield put(verificaSpinnerSet(false));
}


/**
 * Esegue l'inizializzazione per l'esecuzione docente
 * @param {Object} data parametri della richiesta
 * @param {Object} data.payload.history history
 * @param {Object} data.payload.userHints hints da mostrare per l'utente
 * @param {Object} data.payload.userId ID utente
 * @param {Object[]} data.payload.unitaSelezionate pk delle unità da testare
 * @param {String} data.payload.product nome del prodotto
 * @param {Boolean} data.payload.livelloId id del livello
 * @param {Boolean} data.payload.titolo titolo
 * @param {Boolean} data.payload.soloLatino indica se è una prova solo latino
 * @param {Function} data.payload.dispatch dispatch
 * @param {String} data.payload.backUrl url di back
 */
export function* verificaLivelloProvaTriggerSaga(data) { // eslint-disable-line no-unused-vars
  yield put(verificaSpinnerSet(true));
  yield put(verificaRispostaReset());

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${VERIFICA_URL_LIVELLO_PROVA}`, {
        livello: data.payload.livelloId,
        solo_latino: data.payload.soloLatino,
        unita: data.payload.unitaSelezionate,
      }
    );

    const loadedSteps = response.data.map((step) => ({
      id: step.id,
      ...createStepFromEsercizi(step.elementi)[0],
    }));

    yield put(verificaContenutoSet({
      steps: loadedSteps,
      totaleStep: loadedSteps.length,
      risposteFornite: {},
      stepCaricato: 0,
      livelloId: parseInt(data.payload.livelloId, 10),
      titolo: data.payload.titolo,
      unitaSelezionate: data.payload.unitaSelezionate,
      soloLatino: data.payload.soloLatino,
      isLoaded: true,
      backUrl: data.payload.backUrl,
    }));

    const hintToDisplay = getHintToDisplay(
      data.payload.product,
      `verifica_${loadedSteps[0].esercizi[0].tipo}`,
      data.payload.userHints
    );

    yield put(userHintDisplay({
      hintToDisplay,
      dispatch: data.payload.dispatch,
      userHints: data.payload.userHints,
      userId: data.payload.userId,
      product: data.payload.product,
    }));

    yield put(verificaStepSet({
      testi: loadedSteps[0].testi,
      esercizi: loadedSteps[0].esercizi,
      numeroProgressivoStep: loadedSteps[0].id,
      isStepLoaded: true,
    }));
    yield call(data.payload.history.push, '/verifica-esecuzione');
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Questa verifica non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }

  yield put(verificaSpinnerSet(false));
}


/**
 * Esegue l'inizializzazione dell'esecuzione facendo il fetch
 * del primo step dell'esecuzione da affrontare
 * @param {Object} data parametri della richiesta
 * @param {Number} data.payload.id id dell'assegnazione / prova
 * @param {Function} data.payload.historyPush history.push
 * @param {Number} data.payload.livelloId pk livello
 * @param {Object} data.payload.userHints hints dell'utente
 * @param {String} data.payload.productName nome del prodotto
 * @param {Number} data.payload.userId pk dell'utente
 * @param {Function} data.payload.dispatchFunction funzione di dispatch
 * @param {String} data.payload.backUrl url di torna indietro
 * @param {Boolean} data.payload.enableSuoni url di torna indietro
 */
export function* verificaStepInitializeSaga(data) { // eslint-disable-line no-unused-vars
  yield put(verificaSpinnerSet(true));
  yield put(verificaStepReset());
  yield put(verificaRispostaReset());

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${VERIFICA_URL_STEP_STUDENTE_FETCH}`, {
        assegnazione: data.payload.id,
      }
    );

    if (response.data.step !== null) {
      const stepSplitted = createStepFromEsercizi(response.data.step.elementi);
      const hintToDisplay = getHintToDisplay(
        data.payload.productName,
        `verifica_${stepSplitted[0].esercizi.tipo}`,
        data.payload.userHints
      );

      yield put(userHintDisplay({
        hintToDisplay,
        dispatch: data.payload.dispatchFunction,
        userHints: data.payload.userHints,
        userId: data.payload.userId,
        product: data.payload.productName,
      }));

      yield put(verificaContenutoSet({
        id: data.payload.id,
        isLoaded: true,
        stepCaricato: response.data.step_index,
        livelloId: data.payload.livelloId,
        backUrl: data.payload.backUrl,
        totaleStep: response.data.num_steps,
      }));

      yield put(verificaStepSet({
        testi: stepSplitted[0].testi,
        esercizi: stepSplitted[0].esercizi,
        numeroProgressivoStep: response.data.step_index,
        isStepLoaded: true,
      }));
      yield call(data.payload.historyPush, '/verifica-esecuzione');
    } else {
      yield put(verificaConsegna({
        id: data.payload.id,
        forceEnd: true,
        historyPush: data.payload.historyPush,
        isDocente: false,
        enableSuoni: data.payload.enableSuoni,
      }));
    }
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Questa prova non può essere eseguita',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }

  yield put(verificaSpinnerSet(false));
}

/**
 * Invia via post i dati della risposta inserita dall'utente
 * e prepara i dati del prossimo step da eseguire
 * @param {Object} data dati della funzione
 * @param {Object} data.payload payload della funzione
 * @param {Object} data.payload.step gestione degli step
 * @param {Object[]} data.payload.step.testi testi dello step
 * @param {Object[]} data.payload.step.esercizi esercizi dello step
 * @param {Object[]} data.payload.step.saltate esercizi dello step
 * @param {Number} data.payload.step.numeroProgressivoStep numero dello step corrente
 * @param {Object} data.payload.risposta dati relativi alla risposta e alla sua validazione
 * @param {(Object|Object[])} data.payload.risposta.rispostaSelezionata contiene la risposta selezionata
 * @param {Boolean} data.payload.risposta.isSaltata indica se la risposta è saltata
 * @param {Boolean} data.payload.isDocente indica se l'utente è un docente
 * @param {Object} data.payload.contenutoVerifica contiene i dati della verifica
 * @param {Object} data.payload.contenutoVerifica.risposteFornite risposte fornite dall'utente
 * @param {Number} data.payload.contenutoVerifica.stepCaricato id dello step caricato
 * @param {Object[]} data.payload.contenutoVerifica.unitaSelezionate unità selezionate
 * @param {Boolean} data.payload.contenutoVerifica.soloLatino solo domande latino
 * @param {Number} data.payload.contenutoVerifica.id id della prova / assegnazione
 * @param {Object[]} data.payload.contenutoVerifica.steps step della versioni
 * @param {Object[]} data.payload.contenutoVerifica.stepRiaccordati step riaccordati e da rieseguire
 * @param {Boolean} data.payload.enableSuoni indica se i suoni sono attivi
 * @param {Boolean} data.payload.productName nome del prodotto in uso
 * @param {Function} data.payload.historyPush push della history
 * @param {Function} data.payload.dispatch funzione di dispatch
 * @param {Number} data.payload.userId pk utente
 */
export function* verificaRispostaPostSaga(data) {
  yield put(verificaSpinnerSet(true));

  const step = data.payload.step;
  const risposteFornite = data.payload.contenutoVerifica.risposteFornite;
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
  const basePostData = {
    tipo: step.esercizi[0].tipo,
    step: step.numeroProgressivoStep,
    help_request: false,
    saltata: data.payload.isSaltata,
    risposta: data.payload.isSaltata ? fallbackRisposta : rispostaNormalizzata,
    // il terzo parametro di creaTestoReadable forza il readable dell'answer a "Saltata"
    readable: creaTestoReadable(rispostaSelezionata, step, data.payload.isSaltata),
    elementi: getIdsElementiEsercizio(step),
    esercizio: step.esercizi[0].esercizioId,
    skipped: step.skipped,
  };

  /**
   * Se ho saltato lo step e lo step in questione è già stato saltato in precedenza
   * (mi trovo per esempio nella ennesima esecuzione degli step saltati), invio
   * al back-end l'array degli step saltati con quello corrente in coda.
   * Il back-end usa questo ordine per riproporre per ultimo lo step che ho appena eseguito
   */
  if (data.payload.isSaltata && step.skipped.indexOf(step.numeroProgressivoStep) > -1) {
    basePostData.skipped = [
      ...step.skipped.filter((s) => s !== step.numeroProgressivoStep),
      step.numeroProgressivoStep,
    ];
  }

  /**
   * SIMULAZIONE ESECUZIONE DOCENTE
   * Simulo l'esecuzione della versione per il docente:
   * non invio le risposte date ma mi salvo tutto in locale.
   * Alla fine dell'esecuzione scelgo se consegnare o riprendere,
   * se ce ne sono, le domande saltate.
   * Quando ho terminato l'esecuzione mando al back-end tutte le
   * risposte date e ricevo il voto finale
   */
  if (data.payload.isDocente) {
    const contenutoDataSet = {};
    let stato = 'X';
    if (!data.payload.isSaltata) {
      stato = correzioneRisposta.isCorrect ? 'C' : 'S';
    }

    contenutoDataSet.risposteFornite = {
      ...risposteFornite,
      [step.numeroProgressivoStep]: {
        ...basePostData,
        stato,
        corretta: correzioneRisposta.isCorrect,
      },
    };

    if (data.payload.isSaltata) {
      const st = data.payload.contenutoVerifica.steps[data.payload.contenutoVerifica.stepCaricato];
      contenutoDataSet.stepRiaccodati = [
        ...data.payload.contenutoVerifica.stepRiaccodati.filter(
          (s) => (s.id !== st.id)
        ),
        st,
      ];
    } else {
      contenutoDataSet.stepRiaccodati = [
        ...(data.payload.contenutoVerifica.stepRiaccodati || /* istanbul ignore next */[]),
      ];
    }

    const nextStepId = data.payload.contenutoVerifica.stepCaricato + 1;
    contenutoDataSet.stepCaricato = nextStepId;

    /**
     * ESECUZIONE DOCENTE: step terminati
     * Ho terminato gli step disponibili: gestisco la fine della prova
     * - se ho saltato degli step, mi viene chiesto se voglio riprenderli o consegnare
     * - se non ho step saltati, consegno
     */
    if (nextStepId >= data.payload.contenutoVerifica.steps.length) {
      /**
       * ESECUZIONE DOCENTE: step saltati
       * Ho degli step saltati: il popup mi chiede se voglio consegnare o riprendere
       * quelli saltati:
       * - se riprendo quelli saltati, riaccodo gli step saltati e riprendo l'esecuzione
       * - se voglio consegnare, invio al back-end l'oggetto con le risposte
       */
      if (contenutoDataSet.stepRiaccodati.length) {
        const dispatchFx = data.payload.dispatch;

        yield put(modalSetData({
          contenuto: 'Stai per terminare la verifica. Desideri consegnare o riprendere le domande saltate?',
          closeButton: {
            /**
             * ESECUZIONE DOCENTE: consegna versione con step saltati
             * Consegna la versione anche se ho degli step saltati
             */
            text: 'Consegna',
            onClick: /* istanbul ignore next */ () => {
              dispatchFx(verificaSpinnerSet(true));
              dispatchFx(verificaConsegna({
                isDocente: true,
                risposteFornite: contenutoDataSet.risposteFornite,
                unitaSelezionate: data.payload.contenutoVerifica.unitaSelezionate,
                livelloId: data.payload.contenutoVerifica.livelloId,
                soloLatino: data.payload.contenutoVerifica.soloLatino,
                historyPush: data.payload.historyPush,
                forceEnd: true,
                enableSuoni: data.payload.enableSuoni,
              }));
              dispatchFx(modalSetEmptyData());
            },
          },
          acceptButton: {
            /**
             * ESECUZIONE DOCENTE: riprendi step saltati
             * Riprende l'esecuzione delle domande saltate riaccodandole e
             * riaprendo l'interfaccia di esecuzione
             */
            text: 'Riprendi',
            onClick: /* istanbul ignore next */ () => {
              const nextStep = contenutoDataSet.stepRiaccodati[0];

              dispatchFx(verificaStepSet({
                testi: nextStep.testi,
                esercizi: nextStep.esercizi,
                numeroProgressivoStep: nextStep.id,
                isStepLoaded: true,
              }));
              const hintToDisplay = getHintToDisplay(
                data.payload.productName,
                `verifica_${nextStep.esercizi[0].tipo}`,
                data.payload.userHints
              );

              dispatchFx(userHintDisplay({
                hintToDisplay,
                dispatch: dispatchFx,
                userHints: data.payload.userHints,
                userId: data.payload.userId,
                product: data.payload.productName,
              }));

              dispatchFx(verificaContenutoSet({
                steps: contenutoDataSet.stepRiaccodati,
                totaleStep: contenutoDataSet.stepRiaccodati.length,
                stepRiaccodati: [],
                stepCaricato: 0,
              }));

              dispatchFx(modalSetEmptyData());
            },
          },
          show: true,
        }));
      } else {
        /**
         * ESECUZIONE DOCENTE: consegna senza step saltati
         * Se non ho step saltati, termino la prova consegnando
         * al back-end le risposte fornite
         */
        yield put(verificaConsegna({
          isDocente: true,
          risposteFornite: contenutoDataSet.risposteFornite,
          unitaSelezionate: data.payload.contenutoVerifica.unitaSelezionate,
          livelloId: data.payload.contenutoVerifica.livelloId,
          soloLatino: data.payload.contenutoVerifica.soloLatino,
          historyPush: data.payload.historyPush,
          forceEnd: true,
          enableSuoni: data.payload.enableSuoni,
        }));
      }
    } else {
      /**
       * ESECUZIONE DOCENTE: avanzamento step
       * Ho ancora degli step da eseguire, quindi carico quello
       * successivo nell'interfaccia di esecuzione
       */
      const nextStep = data.payload.contenutoVerifica.steps[nextStepId];

      yield put(verificaStepSet({
        testi: nextStep.testi,
        esercizi: nextStep.esercizi,
        numeroProgressivoStep: nextStep.id,
        isStepLoaded: true,
      }));

      const hintToDisplay = getHintToDisplay(
        data.payload.productName,
        `verifica_${nextStep.esercizi[0].tipo}`,
        data.payload.userHints
      );

      yield put(userHintDisplay({
        hintToDisplay,
        dispatch: data.payload.dispatch,
        userHints: data.payload.userHints,
        userId: data.payload.userId,
        product: data.payload.productName,
      }));
    }
    yield put(verificaContenutoSet(contenutoDataSet));
    yield put(verificaRispostaReset());
  } else {
    /**
     * ESECUZIONE STUDENTE
     * Invio al back-end ogni singola risposta data per
     * la valutazione ed eseguo l'avanzamento dello step
     * successivo.
     * Alla fine dell'esecuzione posso riprendere le domande
     * saltate o consegnare.
     */
    try {
      const responsoCorrezione = yield call(
        axios.post,
        `${API_BASE_PATH}${VERIFICA_URL_STEP_STUDENTE_POST}`, {
          ...basePostData,
          assegnazione: data.payload.contenutoVerifica.id,
        }
      );
      /**
       * ESECUZIONE STUDENTE: prova terminata
       * non ho più step da eseguire, quindi eseguo
       * la consegna della verifica
       */
      if (responsoCorrezione.data.step) {
        /**
         * ESECUZIONE STUDENTE: riprendi step saltati
         * Se sto visualizzando il primo degli step saltati,
         * chiedi all'utente se vuoi proseguire o consegnare prima
         * di mostrarglielo
         *
         * Se sto skippando solo l'ultimo step e ho dato risposte
         * a tutte le altre domande, ovvero mi trovo nel caso in cui
         * stepIndex === stepRisposta, vado a controllare se lo step
         * in corso è già stato skippato almeno una volta e si trova
         * in responsoCorrezione.data.skipped
         */
        const stepRisposta = responsoCorrezione.data.step_risposta;
        const stepIndex = responsoCorrezione.data.step_index;
        if (stepIndex < stepRisposta || (stepIndex <= stepRisposta && responsoCorrezione.data.skipped.indexOf(stepIndex) > -1)) {
          const dispatchFx = data.payload.dispatch;

          yield put(modalSetData({
            contenuto: 'Stai per terminare la verifica. Desideri consegnare o riprendere le domande saltate?',
            closeButton: {
              /**
               * ESECUZIONE STUDENTE: consegna versione con step saltati
               * Consegna la versione anche se ho degli step saltati
               */
              text: 'Consegna',
              onClick: /* istanbul ignore next */ () => {
                dispatchFx(verificaSpinnerSet(true));
                dispatchFx(verificaConsegna({
                  forceEnd: true,
                  id: data.payload.contenutoVerifica.id,
                  isDocente: false,
                  historyPush: data.payload.historyPush,
                  enableSuoni: data.payload.enableSuoni,
                }));
                dispatchFx(modalSetEmptyData());
              },
            },
            acceptButton: {
              /**
               * ESECUZIONE STUDENTE: riprendi step saltati
               * Riprende l'esecuzione delle domande saltate riaccodandole e
               * riaprendo l'interfaccia di esecuzione
               */
              text: 'Riprendi',
              onClick: /* istanbul ignore next */ () => {
                const stepSplitted = createStepFromEsercizi(responsoCorrezione.data.step.elementi);
                dispatchFx(verificaStepSet({
                  testi: stepSplitted[0].testi,
                  esercizi: stepSplitted[0].esercizi,
                  numeroProgressivoStep: responsoCorrezione.data.step_index,
                  skipped: responsoCorrezione.data.skipped,
                  isStepLoaded: true,
                }));
                dispatchFx(modalSetEmptyData());
              },
            },
            show: true,
          }));
        } else {
          /**
           * ESECUZIONE STUDENTE: carico step successivo
           * carico lo step successivo da eseguire
           */
          const stepSplitted = createStepFromEsercizi(responsoCorrezione.data.step.elementi);
          yield put(verificaStepSet({
            testi: stepSplitted[0].testi,
            esercizi: stepSplitted[0].esercizi,
            numeroProgressivoStep: responsoCorrezione.data.step_index,
            skipped: responsoCorrezione.data.skipped,
            isStepLoaded: true,
          }));
        }
      } else {
        /**
         * ESECUZIONE STUDENTE: consegna verifica
         * Se non ho degli step saltati, vado direttamente
         * alla consegna della verifica
         */
        yield put(verificaConsegna({
          forceEnd: true,
          id: data.payload.contenutoVerifica.id,
          isDocente: false,
          historyPush: data.payload.historyPush,
          enableSuoni: data.payload.enableSuoni,
        }));
      }

      yield put(verificaRispostaReset());
    } catch (error) {
      let message = 'Assicurarsi di avere una connessione';
      if ((error.response || {}).status === 409) {
        message = 'Hai già risposto a questa domanda, assicurati di non aver già eseguito questa domanda';
      }
      yield put(modalSetData({
        titolo: 'Impossibile inviare i dati',
        contenuto: message,
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    }
  }

  yield put(verificaSpinnerSet(false));
}


/**
 * Saga per eseguire le operazioni di assegnazione di una verifica
 * @param {Object} data contiene i dati della versione
 * @param {Object} data.payload contiene il payload della richiesta
 * @param {Number} data.payload.livelloId ID del livello
 * @param {Number} data.payload.corsoId ID del corso a cui è assegnata la versione da assegnare
 * @param {Object[]} data.payload.unita elenco delle unità selezionate
 * @param {Boolean} data.payload.soloLatino indica se la verifica è solo in latino
 */
export function* verificaAssegnaSaga(data) {
  yield put(verificaLivelloSpinnerSet({
    assegna: true,
  }));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${VERIFICA_URL_ASSEGNA}`, {
        corso: data.payload.corsoId,
        livello: data.payload.livelloId,
        solo_latino: data.payload.soloLatino,
        unita: data.payload.unita,
      }
    );

    const pkVerificheAssegnate = getVerificheAssegnateIds(response.data.verifiche_assegnate);
    yield put(verificaLivelloSet({
      titolo: response.data.label_verifica,
      unitSelectionEnabled: response.data.enable_unit_selection,
      unita: response.data.unita.map(
        (u) => ({ ...u, inVerifica: pkVerificheAssegnate.indexOf(u.id) > -1 })
      ),
      verificheAssegnate: response.data.verifiche_assegnate,
      isLoaded: true,
      datiVerifica: {
        soloLatino: false,
        unitaSelezionate: [],
      },
    }));

    yield put(modalSetData({
      contenuto: 'L\'assegnazione è avvenuta con successo',
      image: {
        src: checkmark,
        width: '180px',
        height: '130px',
        alt: 'Assegnata',
      },
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Questa verifica non può essere assegnata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
  yield put(verificaLivelloSpinnerSet({
    assegna: false,
  }));
}


/**
 * Saga per eseguire le operazioni di ritiro di una versione
 *
 * @param {Object} data contiene i dati da inviare per fare la richiesta
 * @param {String} data.idVerifica ID della verifica
 * @param {String} data.verificheAssegnate elenco delle verifiche assegnate
 */
export function* verificaRitiraSaga(data) {
  yield put(verificaLivelloSpinnerSet({
    [`ritira_${data.idVerifica}`]: true,
    ritira: true,
  }));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${VERIFICA_URL_RITIRA}`, {
        verifica: data.idVerifica,
      }
    );

    if (response.data.ritirata) {
      yield put(verificaLivelloSet({
        verificheAssegnate: data.verificheAssegnate.map((v) => ({
          ...v,
          ritirata: v.id === data.idVerifica ? true : v.ritirata,
        })),
      }));

      yield put(modalSetData({
        contenuto: 'Il ritiro è avvenuto con successo',
        closeButton: {
          text: 'Ok',
        },
        image: {
          src: checkmark,
          width: '180px',
          height: '130px',
          alt: 'Ritirata',
        },
        show: true,
      }));
    } else {
      yield put(modalSetData({
        contenuto: 'Questa verifica non può essere ritirata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    }
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Questa verifica non può essere ritirata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
  yield put(verificaLivelloSpinnerSet({
    [`ritira_${data.idVerifica}`]: false,
    ritira: false,
  }));
}


/**
 * Effettua la consegna della verifica e mette nello store
 * il voto ottenuto
 *
 * @param {Object} data
 * @param {Number} data.payload.id id della versione / consegna
 * @param {Number} data.payload.isDocente indica se è docente
 * @param {Object} data.payload.risposteFornite oggetto con le risposte fornire (docente)
 * @param {Object} data.payload.livelloId pk del livello
 * @param {Boolean} data.payload.soloLatino solo domande latino
 * @param {Object} data.payload.unitaSelezionate pk unità selezionate
 * @param {Boolean} data.payload.forceEnd flag per il redirect forzato
 * @param {Boolean} data.payload.enableSuoni flag per abilitare i suoni
 * @param {Object} data.payload.historyPush oggetto history push function
 */
export function* verificaConsegnaSaga(data) {
  try {
    let consegnaResponse;

    if (data.payload.isDocente) {
      consegnaResponse = yield call(
        axios.post,
        `${API_BASE_PATH}${VERIFICA_URL_CONSEGNA_DOCENTE}`, {
          risposte: data.payload.risposteFornite,
          solo_latino: data.payload.soloLatino,
          unita: data.payload.unitaSelezionate,
          livello: data.payload.livelloId,
        }
      );
    } else {
      consegnaResponse = yield call(
        axios.post,
        `${API_BASE_PATH}${VERIFICA_URL_CONSEGNA_STUDENTE}`, {
          assegnazione: data.payload.id,
        }
      );
    }

    googleAnalyticsWrapper('event', {
      category: 'Verifica',
      action: `Consegna ${data.payload.isDocente ? 'docente' : 'studente'}`,
    });

    yield put(verificaContenutoSet({
      consegnata: true,
      voto: consegnaResponse.data.voto,
    }));

    if (data.payload.forceEnd) {
      yield call(playSound, consegnaResponse.data.voto >= 6 ? 'vinto' : 'perso', !data.payload.enableSuoni);
      yield call(data.payload.historyPush, '/verifica-response');
    }
  } catch (e) {
    yield put(modalSetData({
      contenuto: 'Non ho potuto leggere il voto della consegna, riprovare',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
}

export function* watchVerifica() {
  yield takeEvery(VERIFICA_LIVELLO_FETCH, verificaLivelloFetchSaga);
  yield takeEvery(VERIFICA_LIVELLO_PROVA_TRIGGER, verificaLivelloProvaTriggerSaga);
  yield takeEvery(VERIFICA_STEP_INITIALIZE, verificaStepInitializeSaga);
  yield takeEvery(VERIFICA_RISPOSTA_POST, verificaRispostaPostSaga);
  yield takeEvery(VERIFICA_ASSEGNA_TRIGGER, verificaAssegnaSaga);
  yield takeEvery(VERIFICA_RITIRA_TRIGGER, verificaRitiraSaga);
  yield takeEvery(VERIFICA_CONSEGNA, verificaConsegnaSaga);
}

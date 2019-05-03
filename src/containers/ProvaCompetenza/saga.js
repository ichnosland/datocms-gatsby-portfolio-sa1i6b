import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import checkmark from 'images/infocard-icn_checkmark.png';
import { API_BASE_PATH } from 'configuration';
import {
  getIdsElementiEsercizio,
  calcolaSoluzioni,
  correggiRisposta,
  creaTestoReadable,
  createStepFromEsercizi,
  normalizzaRispostaSelezionata,
} from 'common/esercizi';
import { getHintToDisplay } from 'common/hints';
import { playSound } from 'common/suoni';
import { modalSetData } from 'containers/ModalBox/actions';
import { userHintDisplay } from 'containers/User/actions';
import { googleAnalyticsWrapper } from 'common/utils';
import {
  PROVA_COMPETENZA_URL_DOCENTE_FETCH,
  PROVA_COMPETENZA_URL_STUDENTE_FETCH,
  PROVA_COMPETENZA_URL_ASSEGNA,
  PROVA_COMPETENZA_URL_RITIRA,
  PROVA_COMPETENZA_URL_STEP_DOCENTE_FETCH,
  PROVA_COMPETENZA_URL_STEP_STUDENTE_FETCH,
  PROVA_COMPETENZA_URL_STEP_STUDENTE_POST,
  PROVA_COMPETENZA_URL_CONSEGNA_STUDENTE,

  PROVA_COMPETENZA_CONSEGNA,
  PROVA_COMPETENZA_URL_CONSEGNA_DOCENTE,
  PROVA_COMPETENZA_ASSEGNA_TRIGGER,
  PROVA_COMPETENZA_RITIRA_TRIGGER,
  PROVA_COMPETENZA_CONTENUTO_FETCH,
  PROVA_COMPETENZA_STEP_INITIALIZE,
  PROVA_COMPETENZA_STEP_NEXT,
  PROVA_COMPETENZA_RISPOSTA_POST,
} from './constants';
import {
  provaCompetenzaContenutoSet,
  provaCompetenzaSpinnerSet,
  provaCompetenzaReset,
  provaCompetenzaFeedbackSet,
  provaCompetenzaStepSet,
  provaCompetenzaRispostaReset,
  provaCompetenzaRispostaSet,
  provaCompetenzaConsegna,
} from './actions';


/**
 * Carica i dati delle info relative alla prova per competenza
 * @param {object} data parametri della richiesta
 * @param {number} data.id pk della prova da cercare
 * @param {bool} data.isDocente indica se l'utente è un docente
 * @param {number} data.corsoId id del corso (se docente)
 */
export function* provaCompetenzaContenutoFetch(data) {
  yield put(provaCompetenzaSpinnerSet(true));
  yield put(provaCompetenzaReset());

  try {
    let response;
    if (data.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${PROVA_COMPETENZA_URL_DOCENTE_FETCH}${data.corsoId}/${data.id}`
      );
    } else {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${PROVA_COMPETENZA_URL_STUDENTE_FETCH}${data.id}`
      );
    }

    yield put(provaCompetenzaContenutoSet({
      titolo: response.data.titolo || '',
      inCorso: response.data.in_corso || false,
      consegnata: response.data.consegnata || false,
      missione: response.data.missione || 0,
      prerequisito: response.data.prerequisito || '',
      sottotitolo: response.data.sottotitolo || '',
      testo: (response.data.testo || '').replace(/_/g, ' '),
      autore: response.data.autore || '',
      fonte: response.data.fonte || '',
      difficolta: response.data.difficolta || '',
      totaleDomande: response.data.totale_domande || -1,
      assegnata: (response.data.assegnazione || {}).id > 0,
      idAssegnazione: (response.data.assegnazione || {}).id || 0,
      ritirata: (response.data.assegnazione || {}).ritirata || response.data.ritirata || /* istanbul ignore next */ false,
      dataAssegnazione: (response.data.assegnazione || {}).data_assegnazione || undefined,
      id: response.data.id,
      isLoaded: true,
    }));
  } catch (error) {
    yield put(provaCompetenzaFeedbackSet(
      true,
      'error',
      'Impossibile scaricare questa prova per competenza',
    ));
  }
  yield put(provaCompetenzaSpinnerSet(false));
}


/**
 * Esegue l'inizializzazione dell'esecuzione facendo il fetch
 * del primo step dell'esecuzione da affrontare
 * @param {object} data parametri della richiesta
 * @param {object} data.payload.id id dell'assegnazione / prova
 * @param {object} data.payload.isDocente indica se è un docente
 * @param {object} data.payload.history history
 * @param {object} data.payload.userAppData oggetto appData dell'utente
 * @param {object} data.payload.userAppData.hints hints dell'utente
 * @param {object} data.payload.configuration configuration dell'app
 * @param {object} data.payload.configuration.product nome del prodotto
 * @param {object} data.payload.userAnagraphics anagraphics utente
 * @param {object} data.payload.userAnagraphics.id pk dell'utente
 * @param {function} data.payload.dispatch dispatch
 */
export function* provaCompetenzaStepInitialize(data) { // eslint-disable-line no-unused-vars
  yield put(provaCompetenzaSpinnerSet(true));
  yield put(provaCompetenzaRispostaReset());

  try {
    let response;
    if (data.payload.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${PROVA_COMPETENZA_URL_STEP_DOCENTE_FETCH}${data.payload.id}`
      );

      const loadedSteps = response.data.steps.map((step) => ({
        id: step.id,
        ...createStepFromEsercizi(step.elementi)[0],
      }));
      yield put(provaCompetenzaContenutoSet({
        steps: loadedSteps,
        risposteFornite: {},
        stepCaricato: 0,
      }));

      const hintToDisplay = getHintToDisplay(
        data.payload.configuration.product,
        `competenza_${loadedSteps[0].esercizi[0].tipo}`,
        data.payload.userAppData.hints
      );

      yield put(userHintDisplay({
        hintToDisplay,
        dispatch: data.payload.dispatch,
        userHints: data.payload.userAppData.hints,
        userId: data.payload.userAnagraphics.id,
        product: data.payload.configuration.product,
      }));

      yield put(provaCompetenzaStepSet({
        testi: loadedSteps[0].testi,
        esercizi: loadedSteps[0].esercizi,
        numeroProgressivoStep: response.data.numero_step || 0,
        isStepLoaded: true,
      }));
      yield call(data.payload.history.push, '/prova-competenza-esecuzione');
    } else {
      response = yield call(
        axios.post,
        `${API_BASE_PATH}${PROVA_COMPETENZA_URL_STEP_STUDENTE_FETCH}`, {
          assegnazione: data.payload.id,
        }
      );

      if (response.data.step !== null) {
        const stepSplitted = createStepFromEsercizi(response.data.step.elementi);
        const hintToDisplay = getHintToDisplay(
          data.payload.configuration.product,
          `competenza_${stepSplitted[0].esercizi.tipo}`,
          data.payload.userAppData.hints
        );

        yield put(userHintDisplay({
          hintToDisplay,
          dispatch: data.payload.dispatch,
          userHints: data.payload.userAppData.hints,
          userId: data.payload.userAnagraphics.id,
          product: data.payload.configuration.product,
        }));

        yield put(provaCompetenzaStepSet({
          testi: stepSplitted[0].testi,
          esercizi: stepSplitted[0].esercizi,
          numeroProgressivoStep: response.data.step_index,
          isStepLoaded: true,
        }));
        yield call(data.payload.history.push, '/prova-competenza-esecuzione');
      } else {
        yield put(provaCompetenzaConsegna({
          id: data.payload.id,
          forceEnd: true,
          history: data.payload.history,
        }));
      }
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

  yield put(provaCompetenzaSpinnerSet(false));
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
 * @param {bool} data.payload.risposta.isPristine indica se è la prima correzione dello step
 * @param {bool} data.payload.isDocente indica se l'utente è un docente
 * @param {bool} data.payload.helpRequest indica se è stata fatta una richiesta di help
 * @param {object} data.payload.contenutoProva contiene i dati della prova per competenza
 * @param {object} data.payload.contenutoProva.risposteFornite risposte fornite dall'utente
 * @param {number} data.payload.contenutoProva.stepCaricato id dello step caricato
 * @param {number} data.payload.contenutoProva.id id della prova / assegnazione
 * @param {bool} data.payload.enableSuoni indica se i suoni sono attivi
 */
export function* provaCompetenzaRispostaPost(data) {
  yield put(provaCompetenzaSpinnerSet(true));

  const step = data.payload.step;
  const risposteFornite = data.payload.contenutoProva.risposteFornite;
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

  if (!data.payload.risposta.isPristine || data.payload.isDocente) /* istanbul ignore next */ {
    if (data.payload.helpRequest) {
      yield call(playSound, 'step_aiuto', !data.payload.enableSuoni);
    } else if (correzioneRisposta.isCorrect) {
      yield call(playSound, 'step_corretto', !data.payload.enableSuoni);
    } else {
      yield call(playSound, 'step_sbagliato', !data.payload.enableSuoni);
    }
  }

  if (!data.payload.risposta.isPristine) {
    yield put(provaCompetenzaRispostaSet(dataToSet));
  } else if (data.payload.isDocente) {
    // se sono docente eseguo tutto offline, quindi mi creo l'oggetto
    // con le risposte in locale
    const contenutoDataSet = {};

    /* istanbul ignore next */
    if (data.payload.risposta.isPristine) {
      contenutoDataSet.risposteFornite = {
        ...risposteFornite,
        [data.payload.contenutoProva.stepCaricato]: {
          ...basePostData,
          stato: correzioneRisposta.isCorrect ? 'C' : 'S',
          corretta: correzioneRisposta.isCorrect,
        },
      };

      const nextStepId = data.payload.contenutoProva.stepCaricato + 1;
      contenutoDataSet.stepCaricato = nextStepId;

      if (nextStepId >= data.payload.contenutoProva.steps.length) {
        yield put(provaCompetenzaConsegna({
          id: data.payload.contenutoProva.id,
          isDocente: true,
          risposteFornite: contenutoDataSet.risposteFornite,
        }));
      } else {
        yield put(provaCompetenzaStepSet({
          nextStep: {
            testi: data.payload.contenutoProva.steps[nextStepId].testi,
            esercizi: data.payload.contenutoProva.steps[nextStepId].esercizi,
            numeroProgressivoStep: nextStepId,
            isStepLoaded: true,
          },
        }));
      }
      yield put(provaCompetenzaContenutoSet(contenutoDataSet));
    }

    yield put(provaCompetenzaRispostaSet(dataToSet));
  } else {
    let responsoCorrezione;
    try {
      responsoCorrezione = yield call(
        axios.post,
        `${API_BASE_PATH}${PROVA_COMPETENZA_URL_STEP_STUDENTE_POST}`, {
          ...basePostData,
          assegnazione: data.payload.contenutoProva.id,
        }
      );

      if (!responsoCorrezione.data.step) {
        yield put(provaCompetenzaConsegna({ id: data.payload.contenutoProva.id }));
      } else {
        const stepSplitted = createStepFromEsercizi(responsoCorrezione.data.step.elementi);
        yield put(provaCompetenzaStepSet({
          nextStep: {
            testi: stepSplitted[0].testi,
            esercizi: stepSplitted[0].esercizi,
            numeroProgressivoStep: responsoCorrezione.data.step_index,
            isStepLoaded: true,
          },
        }));
      }

      if (!data.payload.helpRequest) /* istanbul ignore next */ {
        dataToSet.isCorrect = responsoCorrezione.data.corretta || false;
        if (dataToSet.isCorrect) /* istanbul ignore next */ {
          yield call(playSound, 'step_corretto', !data.payload.enableSuoni);
        } else {
          yield call(playSound, 'step_sbagliato', !data.payload.enableSuoni);
        }
      } else {
        yield call(playSound, 'step_aiuto', !data.payload.enableSuoni);
      }

      yield put(provaCompetenzaRispostaSet(dataToSet));
    } catch (error) /* istanbul ignore next */ {
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

  yield put(provaCompetenzaSpinnerSet(false));
}

/**
 * Esegue l'avanzamento di step una volta effettuata la correzione e/o
 * la visualizzazione del responso della risposta inserita dall'utente
 * @param {object} data dati della funzione
 * @param {object} data.payload payload della funzione
 * @param {object} data.payload.step gestione degli step
 * @param {object} data.payload.step.nextStep contenuto del prossimo step da caricare
 * @param {object} data.payload.history history
 * @param {object} data.payload.risposta gestione delle risposte dell'utente
 * @param {object} data.payload.contenutoProva dati caricati della prova di competenza
 * @param {bool} data.payload.contenutoProva.consegnata indica se la prova è consegnata
 * @param {bool} data.payload.isDocente indica se l'utente è un docente
 * @param {bool} data.payload.enableSuoni indica se i suoni sono attivi
 * @param {object} data.payload.configuration file di configurazione dell'app
 * @param {string} data.payload.configuration.product nome del product app
 * @param {object} data.payload.userAppData configurazioni app utente
 * @param {object} data.payload.userAppData.hints hints dell'utente
 * @param {object} data.payload.userAnagraphics anagraphics utente
 * @param {number} data.payload.userAnagraphics.id id utente
 * @param {function} data.payload.dispatch funzione di dispatch
 */
export function* provaCompetenzaStepNext(data) {
  const nextStep = data.payload.step.nextStep;

  yield put(provaCompetenzaStepSet({
    ...nextStep,
    nextStep: undefined,
    isStepLoaded: true,
  }));

  yield put(provaCompetenzaRispostaReset());

  if (data.payload.contenutoProva.consegnata) {
    yield call(playSound, data.payload.contenutoProva.voto >= 6 ? /* istanbul ignore next */ 'vinto' : 'perso', !data.payload.enableSuoni);
    yield call(data.payload.history.push, '/prova-competenza-response');
  } else {
    const hintToDisplay = getHintToDisplay(
      data.payload.configuration.product,
      `competenza_${nextStep.esercizi[0].tipo}`,
      data.payload.userAppData.hints
    );

    yield put(userHintDisplay({
      hintToDisplay,
      dispatch: data.payload.dispatch,
      userHints: data.payload.userAppData.hints,
      userId: data.payload.userAnagraphics.id,
      product: data.payload.configuration.product,
    }));
  }
}


/**
 * Saga per eseguire le operazioni di assegnazione di una prova per competenza
 * @param {object} data contiene i dati da inviare per fare la richiesta
 * @param {string} data.id ID della prova per competenza o della sua assegnazione
 * @param {string} data.idCorso ID del corso a cui è assegnata la versione da assegnare
 */
export function* provaCompetenzaAssegna(data) {
  yield put(provaCompetenzaSpinnerSet(true));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${PROVA_COMPETENZA_URL_ASSEGNA}`, {
        prova_competenza: data.id,
        corso: data.idCorso,
      }
    );

    yield put(provaCompetenzaContenutoSet({
      assegnata: true,
      dataAssegnazione: response.data.data_creazione,
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
      contenuto: 'Questa prova per competenza non può essere assegnata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
  yield put(provaCompetenzaSpinnerSet(false));
}


/**
 * Saga per eseguire le operazioni di ritiro di una versione
 *
 * @param {object} data contiene i dati da inviare per fare la richiesta
 * @param {string} data.idAssegnazione ID dell'assegnazione
 * @param {string} data.idCorso ID del corso a cui è assegnata la versione da ritirare
 */
export function* provaCompetenzaRitira(data) {
  yield put(provaCompetenzaSpinnerSet(true));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${PROVA_COMPETENZA_URL_RITIRA}`, {
        prova_competenza: data.idAssegnazione,
        corso: data.idCorso,
      }
    );

    if (response.data.ritirata) {
      yield put(provaCompetenzaContenutoSet({ ritirata: true }));
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
        contenuto: 'Questa prova per competenza non può essere ritirata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    }
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Questa prova per competenza non può essere ritirata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
  yield put(provaCompetenzaSpinnerSet(false));
}


/**
 * Effettua la consegna della prova per competenza e mette nello store
 * il voto ottenuto
 *
 * @param {object} data
 * @param {number} data.payload.id id della versione / consegna
 * @param {number} data.payload.isDocente indica se è docente
 * @param {object} data.payload.risposteFornite oggetto con le risposte fornire (docente)
 * @param {bool} data.payload.forceEnd flag per il redirect forzato
 * @param {object} data.payload.history oggetto history
 * @param {bool} data.payload.enableSuoni indica se i suoni sono attivi
 */
export function* provaCompetenzaConsegnaProva(data) {
  try {
    let consegnaResponse;

    if (data.payload.isDocente) {
      consegnaResponse = yield call(
        axios.post,
        `${API_BASE_PATH}${PROVA_COMPETENZA_URL_CONSEGNA_DOCENTE}`, {
          prova_competenza: data.payload.id,
          risposte: data.payload.risposteFornite,
        }
      );
    } else {
      consegnaResponse = yield call(
        axios.post,
        `${API_BASE_PATH}${PROVA_COMPETENZA_URL_CONSEGNA_STUDENTE}`, {
          assegnazione: data.payload.id,
        }
      );
    }

    googleAnalyticsWrapper('event', {
      category: 'Prova per competenza',
      action: `Consegna ${data.payload.isDocente ? 'docente' : 'studente'}`,
    });

    yield put(provaCompetenzaContenutoSet({
      consegnata: true,
      voto: consegnaResponse.data.voto,
    }));

    if (data.payload.forceEnd) {
      yield call(playSound, consegnaResponse.data.voto >= 6 ? 'vinto' : /* istanbul ignore next */ 'perso', !data.payload.enableSuoni);
      yield call(data.payload.history.push, '/prova-competenza-response');
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

export function* watchProvaCompetenza() {
  yield takeEvery(PROVA_COMPETENZA_CONTENUTO_FETCH, provaCompetenzaContenutoFetch);
  yield takeEvery(PROVA_COMPETENZA_STEP_INITIALIZE, provaCompetenzaStepInitialize);
  yield takeEvery(PROVA_COMPETENZA_RISPOSTA_POST, provaCompetenzaRispostaPost);
  yield takeEvery(PROVA_COMPETENZA_STEP_NEXT, provaCompetenzaStepNext);
  yield takeEvery(PROVA_COMPETENZA_ASSEGNA_TRIGGER, provaCompetenzaAssegna);
  yield takeEvery(PROVA_COMPETENZA_RITIRA_TRIGGER, provaCompetenzaRitira);
  yield takeEvery(PROVA_COMPETENZA_CONSEGNA, provaCompetenzaConsegnaProva);
}

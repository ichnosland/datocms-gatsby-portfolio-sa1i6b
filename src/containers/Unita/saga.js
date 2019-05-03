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
import { userHintDisplay, userDataSet } from 'containers/User/actions';
import { googleAnalyticsWrapper } from 'common/utils';
import {
  UNITA_URL_FETCH,
  UNITA_URL_ASSEGNA,
  UNITA_URL_STEP_FETCH,
  UNITA_URL_STEP_POST,

  UNITA_ASSEGNA_TRIGGER,
  UNITA_CONTENUTO_FETCH,
  UNITA_STEP_INITIALIZE,
  UNITA_STEP_NEXT,
  UNITA_RISPOSTA_POST,
} from './constants';
import {
  unitaContenutoSet,
  unitaSpinnerSet,
  unitaReset,
  unitaFeedbackSet,
  unitaStepSet,
  unitaRispostaReset,
  unitaRispostaSet,
} from './actions';


/**
 * Carica i dati delle info relative all'unità
 * @param {Object} data parametri della richiesta
 * @param {number} data.id pk della prova da cercare
 * @param {number} data.corsoId id del corso (se docente)
 */
export function* unitaContenutoFetch(data) {
  yield put(unitaSpinnerSet(true));
  yield put(unitaReset());

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${UNITA_URL_FETCH}${data.id}`, {
        params: {
          corso: data.corsoId,
        },
      }
    );

    const cards = response.data.cards.sort();
    const andamento = cards.reduce((acc, card, key) => {
      const prefisso = card.replace('ACA', '');
      const statoEsecuzioni = response.data.stato_esecuzioni || {};
      const stato = statoEsecuzioni[prefisso] || {};
      let isSbloccata = false;
      if (stato.in_corso || stato.completata) {
        isSbloccata = true;
      } else if (cards.indexOf('ACA00') > -1 && prefisso === '00') {
        isSbloccata = true;
      } else if (cards.indexOf('ACA00') === -1 && prefisso === '01') {
        isSbloccata = true;
      } else {
        const k = cards.indexOf(card);
        if (k >= 1) {
          const prefissoPrecedente = cards[k - 1].replace('ACA', '');
          if ((statoEsecuzioni[prefissoPrecedente] || {}).completata) {
            isSbloccata = true;
          }
        }
      }

      acc[key] = {
        difficolta: prefisso,
        sbloccata: isSbloccata,
        inCorso: stato.in_corso || false,
        completata: stato.completata || false,
      };
      return acc;
    }, {});

    yield put(unitaContenutoSet({
      titolo: response.data.nome || '',
      prerequisito: parseInt(response.data.prerequisito || 0, 10),
      livelloId: response.data.livello,
      assegnata: response.data.assegnazione || false,
      lezione: response.data.lezione,
      id: response.data.id,
      lezioni: {
        totali: cards.length,
        completate: cards
          .reduce((acc, _, k) => (acc + (andamento[k].completata ? 1 : 0)), 0),
        andamento,
      },
      isLoaded: true,
    }));
  } catch (error) {
    yield put(unitaFeedbackSet(
      true,
      'error',
      'Impossibile caricare il contenuto di questa unità',
    ));
  }
  yield put(unitaSpinnerSet(false));
}


/**
 * Esegue l'inizializzazione dell'esecuzione facendo il fetch
 * del primo step dell'esecuzione da affrontare
 * @param {Number} data parametri della richiesta
 * @param {String} data.payload.prerequisito prerequisito dell'unità
 * @param {Number} data.payload.disciplina pk della disciplina
 * @param {Number} data.payload.prerequisito prerequisito dell'unità
 * @param {function} data.payload.historyPush history.push
 * @param {string} data.payload.productName nome del prodotto
 * @param {Number} data.payload.userId pk utente
 * @param {Object} data.payload.userHints hints utente
 * @param {Number} data.payload.livelloId pk livello
 * @param {Number} data.payload.unitaId pk unita
 * @param {string} data.payload.difficolta difficoltà
 * @param {function} data.payload.dispatch dispatch function
 */
export function* unitaStepInitialize(data) { // eslint-disable-line no-unused-vars
  yield put(unitaSpinnerSet(true));
  yield put(unitaRispostaReset());

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${UNITA_URL_STEP_FETCH}`, {
        unita: data.payload.unitaId,
        prerequisito: data.payload.prerequisito,
        difficolta: data.payload.difficolta,
        disciplina: data.payload.disciplina,
      }
    );

    if (response.data.step) {
      const stepSplitted = createStepFromEsercizi(response.data.step.elementi);
      const hintToDisplay = getHintToDisplay(
        data.payload.productName,
        `unita_${stepSplitted[0].esercizi[0].tipo}`,
        data.payload.userHints
      );

      yield put(userHintDisplay({
        hintToDisplay,
        dispatch: data.payload.dispatch,
        userHints: data.payload.userHints,
        userId: data.payload.userId,
        product: data.payload.productName,
      }));

      yield put(unitaStepSet({
        testi: stepSplitted[0].testi,
        esercizi: stepSplitted[0].esercizi,
        stepId: response.data.step.id,
        numeroStepCompletati: response.data.num_correct_steps,
        isStepLoaded: true,
      }));

      yield put(unitaContenutoSet({
        difficolta: data.payload.difficolta,
        totaleDomande: response.data.num_required_steps + response.data.num_wrong_steps,
      }));

      yield call(data.payload.historyPush, '/unita-esecuzione');
    } else {
      yield put(modalSetData({
        contenuto: 'Questa prova non può essere eseguita',
        closeButton: {
          text: 'Ok',
        },
        show: true,
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

  yield put(unitaSpinnerSet(false));
}

/**
 * Invia via post i dati della risposta inserita dall'utente
 * e prepara i dati del prossimo step da eseguire
 * @param {Object} data dati della funzione
 * @param {Object} data.payload payload della funzione
 * @param {Object} data.payload.step gestione degli step
 * @param {Object[]} data.payload.step.testi testi dello step
 * @param {Object[]} data.payload.step.esercizi esercizi dello step
 * @param {number} data.payload.step.stepId numero dello step corrente
 * @param {Object} data.payload.risposta dati relativi alla risposta e alla sua validazione
 * @param {(Object|Object[])} data.payload.risposta.rispostaSelezionata contiene la risposta selezionata
 * @param {boolean} data.payload.isDocente indica se l'utente è un docente
 * @param {Object} data.payload.contenutoUnita contiene i dati dell'unità
 * @param {number} data.payload.contenutoUnita.stepCaricato id dello step caricato
 * @param {number} data.payload.contenutoUnita.id id della prova / assegnazione
 * @param {boolean} data.payload.enableSuoni indica se i suoni sono attivi
 * @param {object} data.payload.studenteAcademy studenteAcademy utente
 */
export function* unitaRispostaPost(data) {
  yield put(unitaSpinnerSet(true));
  const step = data.payload.step;
  const risposta = data.payload.risposta;
  const unita = data.payload.contenutoUnita;

  const rispostaAnalizzata = normalizzaRispostaSelezionata(
    risposta.rispostaSelezionata,
    step.esercizi[0].tipo
  );
  const { rispostaSelezionata, rispostaNormalizzata } = rispostaAnalizzata;

  const correzioneRisposta = {
    isCorrect: false,
    corrette: [],
    sbagliate: [],
    soluzione: undefined,
    ...correggiRisposta(step, rispostaAnalizzata),
  };

  const dataToSet = {
    isChecked: true,
    isPristine: false,
    isCorrect: false,
    mostraSoluzione: false,
    mostraCorrezione: true,
    isHelpEnabled: false,
    isInterfaceLocked: true,
    correzioneStep: {
      corrette: correzioneRisposta.corrette,
      sbagliate: correzioneRisposta.sbagliate,
      soluzione: undefined,
    },
  };

  const basePostData = {
    unita: unita.id,
    livello: unita.livelloId,
    difficolta: unita.difficolta,
    disciplina: data.payload.disciplinaId,
    tipo: step.esercizi[0].tipo,
    step: step.stepId,
    help_request: false,
    risposta: rispostaNormalizzata,
    readable: creaTestoReadable(rispostaSelezionata, step),
    elementi: getIdsElementiEsercizio(step),
    esercizio: step.esercizi[0].esercizioId || /* istanbul ignore next */ 0,
  };

  try {
    const responsoCorrezione = yield call(
      axios.post,
      `${API_BASE_PATH}${UNITA_URL_STEP_POST}`,
      basePostData
    );

    if (responsoCorrezione.data.complete) {
      yield put(unitaContenutoSet({
        consegnata: true,
      }));
    } else {
      const stepSplitted = createStepFromEsercizi(responsoCorrezione.data.step.elementi);
      yield put(unitaStepSet({
        nextStep: {
          testi: stepSplitted[0].testi,
          esercizi: stepSplitted[0].esercizi,
          stepId: responsoCorrezione.data.step.id,
          numeroStepCompletati: responsoCorrezione.data.num_correct_steps,
          isStepLoaded: true,
        },
      }));

      if (!data.payload.isDocente) {
        yield put(userDataSet({
          anagraphics: {
            studenteAcademy: {
              ...data.payload.studenteAcademy,
              punti: responsoCorrezione.data.xp,
            },
          },
        }));
      }

      yield put(unitaContenutoSet({
        totaleDomande: responsoCorrezione.data.num_required_steps + responsoCorrezione.data.num_wrong_steps,
      }));
    }

    if (responsoCorrezione.data.correct || false) {
      dataToSet.isCorrect = true;
      yield call(playSound, 'step_corretto', !data.payload.enableSuoni);
    } else {
      dataToSet.correzioneStep.soluzione = calcolaSoluzioni(
        step.testi, step.esercizi
      );
      dataToSet.mostraCorrezione = true;
      dataToSet.mostraSoluzione = true;
      yield call(playSound, 'step_sbagliato', !data.payload.enableSuoni);
    }

    yield put(unitaRispostaSet(dataToSet));
  } catch (error) {
    let message = 'Assicurarsi di avere una connessione';
    if ((error.response || {}).status === 409) {
      message = 'Hai già risposto a questa domanda, assicurati di non averla già eseguita';
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

  yield put(unitaSpinnerSet(false));
}

/**
 * Esegue l'avanzamento di step una volta effettuata la correzione e/o
 * la visualizzazione del responso della risposta inserita dall'utente
 * @param {Object} data.payload payload della funzione
 * @param {Object} data.payload.nextStep step successivo
 * @param {Object} data.payload.historyPush funzione di push di history
 * @param {Object} data.payload.risposta gestione delle risposte dell'utente
 * @param {Boolean} data.payload.isConsegnata indica se è stata consegnata
 * @param {Number} data.payload.voto voto finale
 * @param {Boolean} data.payload.enableSuoni indica se i suoni sono attivi
 * @param {Object} data.payload.userHints hints utente
 * @param {String} data.payload.productName nome del prodotto
 * @param {Number} data.payload.userId id utente
 * @param {Function} data.payload.dispatch funzione di dispatch
 * @param {Boolean} data.payload.isDocente indica se docente
 * @param {Object} data.payload.lezioni resoconto lezioni in corso
 * @param {Object} data.payload.lezioni.andamento andamento lezioni
 * @param {String} data.payload.difficolta difficoltà dell'unità in corso
 */
export function* unitaStepNext(data) {
  const nextStep = data.payload.nextStep;

  yield put(unitaStepSet({
    ...nextStep,
    nextStep: undefined,
    isStepLoaded: true,
  }));

  yield put(unitaRispostaReset());

  if (data.payload.isConsegnata) {
    const andamento = data.payload.lezioni.andamento;
    const lezioniRaggiunte = Object.keys(data.payload.lezioni.andamento).map((k) => (
      andamento[k].completata || andamento[k].difficolta === data.payload.difficolta
    )).filter((e) => (e)).length;

    yield put(unitaContenutoSet({
      lezioni: {
        ...data.payload.lezioni,
        completate: lezioniRaggiunte,
      },
    }));

    yield call(googleAnalyticsWrapper, 'event', {
      category: 'Unità',
      action: `Consegna ${data.payload.isDocente ? 'docente' : 'studente'}`,
    });
    yield call(playSound, 'vinto', !data.payload.enableSuoni);
    yield call(data.payload.historyPush, '/unita-response');
  } else {
    const hintToDisplay = getHintToDisplay(
      data.payload.productName,
      `unita_${nextStep.esercizi[0].tipo}`,
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
}


/**
 * Saga per eseguire le operazioni di assegnazione di un'unità
 * @param {Object} data contiene i dati da inviare per fare la richiesta
 * @param {string} data.id ID dell'unità o della sua assegnazione
 * @param {string} data.idCorso ID del corso a cui è assegnata la versione da assegnare
 * @param {string} data.idDisciplina ID della disciplina
 */
export function* unitaAssegna(data) {
  yield put(unitaSpinnerSet(true));

  try {
    yield call(
      axios.post,
      `${API_BASE_PATH}${UNITA_URL_ASSEGNA}`, {
        unita: data.id,
        corso: data.idCorso,
        disciplina: data.idDisciplina,
      }
    );

    yield put(unitaContenutoSet({
      assegnata: true,
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
      contenuto: 'Quest\'unità non può essere assegnata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
  yield put(unitaSpinnerSet(false));
}


export function* watchUnita() {
  yield takeEvery(UNITA_CONTENUTO_FETCH, unitaContenutoFetch);
  yield takeEvery(UNITA_STEP_INITIALIZE, unitaStepInitialize);
  yield takeEvery(UNITA_RISPOSTA_POST, unitaRispostaPost);
  yield takeEvery(UNITA_STEP_NEXT, unitaStepNext);
  yield takeEvery(UNITA_ASSEGNA_TRIGGER, unitaAssegna);
}

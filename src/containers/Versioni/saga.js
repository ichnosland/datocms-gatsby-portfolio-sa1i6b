import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import checkmark from 'images/infocard-icn_checkmark.png';
import { API_BASE_PATH } from 'configuration';
import {
  getIdsElementiEsercizio,
  calcolaSoluzioni,
  correggiRisposta,
  creaTestoReadable,
  cleanTesto,
  normalizzaRispostaSelezionata,
} from 'common/esercizi';
import { getHintToDisplay } from 'common/hints';
import { modalSetData } from 'containers/ModalBox/actions';
import { playSound } from 'common/suoni';
import { userHintDisplay } from 'containers/User/actions';
import { googleAnalyticsWrapper } from 'common/utils';

import {
  VERSIONI_URL_VERSIONE_FETCH_DOCENTE,
  VERSIONI_URL_VERSIONE_FETCH_STUDENTE,
  VERSIONI_URL_VERSIONE_RITIRA,
  VERSIONI_URL_VERSIONE_ASSEGNA,
  VERSIONI_URL_VERSIONE_DOCENTE_INIZIALIZZA,
  VERSIONI_URL_VERSIONE_STUDENTE_INIZIALIZZA,
  VERSIONI_URL_VERSIONE_STUDENTE_RIPRENDI,
  VERSIONI_URL_VERSIONE_CONSEGNA_DOCENTE,
  VERSIONI_URL_VERSIONE_CONSEGNA_STUDENTE,
  VERSIONI_URL_LIVELLO_DOCENTE_FETCH,
  VERSIONI_URL_LIVELLO_STUDENTE_FETCH,
  VERSIONI_VERSIONE_FETCH_TRIGGER,
  VERSIONI_VERSIONE_ASSEGNA,
  VERSIONI_VERSIONE_RITIRA,
  VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_POST,
  VERSIONI_URL_VERSIONE_ESECUZIONE_RISPOSTE_FORNITE_POST,
  VERSIONI_VERSIONE_AVANZAMENTO_NEXT_TRIGGER,
  VERSIONI_VERSIONE_ESECUZIONE_INIZIALIZZA,
  VERSIONI_VERSIONE_ESECUZIONE_CONSEGNA,
  VERSIONI_VERSIONE_ESECUZIONE_SVUOTA_TRIGGER,
  VERSIONI_LIVELLO_FETCH,
} from './constants';
import {
  versioniVersioneReset,
  versioniVersioneSet,
  versioniFeedbackSet,
  versioniFeedbackReset,
  versioniSpinnerSet,
  versioniVersioneAvanzamentoRisposteUtenteSet,
  versioniVersioneAvanzamentoRisposteUtenteReset,
  versioniVersioneEsecuzionePeriodoCaricatoReset,
  versioniVersioneEsecuzionePeriodoCaricatoSet,
  versioniLivelloSet,
  versioniLivelloReset,
  versioniLivelloSpinnerSet,
} from './actions';
import {
  calcolaPeriodiDaEseguire,
  calcolaTestoIntroduttivoPeriodi,
  versionePeriodoToSteps,
} from './utils';


/**
 * Carica i dati delle info relative alla verifica
 * @param {Object} data parametri della richiesta
 * @param {Number} data.livelloId pk del livello
 * @param {Boolean} data.isDocente indica se l'utente è un docente
 * @param {Number} data.corsoId id del corso (se docente)
 * @param {Number} data.idSelezionato pk della versione selezionata
 */
export function* versioniLivelloFetchSaga(data) {
  yield put(versioniSpinnerSet(true));
  yield put(versioniLivelloReset());
  yield put(versioniFeedbackReset());

  try {
    let response;
    if (data.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_URL_LIVELLO_DOCENTE_FETCH}${data.livelloId}/${data.corsoId}`
      );

      const versioniTrovate = response.data.versioni.reduce((acc, versione) => {
        const missioneId = versione.missione;
        acc.missioni = [
          ...acc.missioni.filter((m) => (
            m.id !== missioneId
          )), {
            ordine: versione.missione_ordine || 0,
            titolo: versione.missione,
            id: missioneId,
          }];

        if (!acc.versioniMissione[missioneId]) {
          acc.versioniMissione[missioneId] = [];
        }

        acc.versioniMissione[missioneId].push({
          titolo: versione.titolo,
          id: versione.id,
          assegnata: versione.assegnata,
          totaleDomande: versione.totale_domande,
        });

        if (versione.assegnata) {
          acc.versioniAssegnate = [...acc.versioniAssegnate, versione];
        }

        if (versione.id === data.idSelezionato && !versione.assegnata) {
          acc.versioneSelezionata = versione;
        }
        return acc;
      }, { missioni: [], versioniMissione: {}, versioniAssegnate: [], versioneSelezionata: undefined });

      yield put(versioniLivelloSet({
        titolo: response.data.livello_label,
        ...versioniTrovate,
        isLoaded: true,
      }));
    } else {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_URL_LIVELLO_STUDENTE_FETCH}${data.livelloId}`
      );

      yield put(versioniLivelloSet({
        titolo: response.data.livello_label,
        versioniAssegnate: response.data.versioni.sort((a, b) => {
          const sortA = `${(a.consegnata ? 5 : 0) + (a.ritirata ? 3 : 0) + (a.in_corso ? 1 : 0)}-${a.data_creazione}`;
          const sortB = `${(b.consegnata ? 5 : 0) + (b.ritirata ? 3 : 0) + (b.in_corso ? 1 : 0)}-${b.data_creazione}`;

          if (sortA > sortB) {
            return -1;
          } else if (sortA < sortB) {
            return 1;
          }

          return 0;
        }),
        isLoaded: true,
      }));

      if (response.data.versioni.length === 0) {
        yield put(versioniFeedbackSet(
          true,
          'error',
          'Non sono state assegnate versioni per questo livello',
        ));
      }
    }
  } catch (error) {
    yield put(versioniFeedbackSet(
      true,
      'error',
      'Impossibile scaricare le verifiche di questo livello',
    ));
  }
  yield put(versioniSpinnerSet(false));
}


/**
 * Saga per eseguire le operazioni di fetch dei dati di una versione
 *
 * @param {object} data contiene i dati della versione da scaricare
 * @param {string} data.id ID della versione/assegnazione da leggere
 * @param {boolean} data.isDocente indica se il richiedente è un docente
 * @param {boolean} data.idCorso indica l'id del corso
 */
export function* versioniPreviewFetch(data) {
  yield put(versioniSpinnerSet(true));
  yield put(versioniFeedbackReset());
  yield put(versioniVersioneReset());

  try {
    const pathVersioni = data.isDocente ?
      `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_FETCH_DOCENTE}${data.idCorso}/${data.id}` :
      `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_FETCH_STUDENTE}${data.id}`;

    const response = yield call(
      axios.get,
      pathVersioni
    );

    yield put(versioniVersioneSet({
      titolo: response.data.titolo,
      sottotitolo: response.data.sottotitolo,
      inCorso: response.data.in_corso || false,
      fonte: response.data.fonte,
      autore: response.data.autore,
      missione: response.data.missione,
      prerequisito: response.data.prerequisito,
      periodi: response.data.periodi,
      assegnata: (response.data.assegnazione || {}).id > 0,
      idAssegnazione: (response.data.assegnazione || {}).id || 0,
      testo: cleanTesto((response.data.testi || []).join(' '), 'leavepunct').replace(/_/g, ' '),
      consegnata: response.data.consegnata,
      ritirata: (response.data.assegnazione || {}).ritirata || response.data.ritirata || false,
      totaleDomande: response.data.totale_domande,
      dataAssegnazione: (response.data.assegnazione || {}).data_assegnazione || undefined,
      id: response.data.id,
      isLoaded: true,
    }));
  } catch (error) {
    yield put(versioniFeedbackSet(
      true,
      'error',
      'Impossibile scaricare questa versione',
    ));
  }
  yield put(versioniSpinnerSet(false));
}


/**
 * Saga per eseguire le operazioni di assegnazione di una versione
 *
 * @param {object} data contiene i dati da inviare per fare la richiesta
 * @param {string} data.idVersione ID della versione da assegnare
 * @param {string} data.idCorso ID del corso a cui è assegnata la versione da assegnare
 * @param {Object} data.versioniLivelloData versioni assegnate e di livello
 * @param {Object[]} data.versioniLivelloData.versioniAssegnate versioni assegnate
 * @param {Object} data.versioniLivelloData.versioniMissione versioni della missione
 */
export function* versioneAssegnaSaga(data) {
  if (!data.versioniLivelloData) {
    yield put(versioniSpinnerSet(true));
    yield put(versioniFeedbackReset());
  } else {
    yield put(versioniLivelloSpinnerSet({
      assegna: true,
    }));
  }

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_ASSEGNA}`, {
        versione: data.idVersione,
        corso: data.idCorso,
      }
    );

    if (response.data.assegnata) {
      const { versioniAssegnate, versioniMissione } = data.versioniLivelloData || {};
      if (!data.versioniLivelloData) {
        yield put(versioniVersioneSet({
          assegnata: true,
          dataAssegnazione: response.data.data_creazione,
        }));
      } else {
        let versioneAssegnata;
        const nuoveVersioniMissione = {};

        Object.keys(versioniMissione).forEach((k) => {
          nuoveVersioniMissione[k] = [];
          versioniMissione[k].forEach((d) => {
            if (d.id === data.idVersione) {
              versioneAssegnata = d;
            }
            nuoveVersioniMissione[k] = nuoveVersioniMissione[k].concat({
              ...d,
              assegnata: d.assegnata || d.id === data.idVersione,
            });
          });
        });

        yield put(versioniLivelloSet({
          versioniAssegnate: [
            ...versioniAssegnate.filter(
              (v) => (v.id !== data.idVersione),
            ), {
              ...versioneAssegnata,
              assegnata: true,
              ritirata: false,
              assegnata_data: response.data.data_creazione,
            },
          ],
          versioniMissione: nuoveVersioniMissione,
        }));
      }
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
    } else {
      yield put(modalSetData({
        contenuto: 'Questa versione non può essere assegnata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    }
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Questa versione non può essere assegnata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }

  if (!data.versioniLivelloData) {
    yield put(versioniSpinnerSet(false));
  } else {
    yield put(versioniLivelloSpinnerSet({
      assegna: false,
    }));
  }
}


/**
 * Saga per eseguire le operazioni di ritiro di una versione
 *
 * @param {object} data contiene i dati da inviare per fare la richiesta
 * @param {string} data.idVersione ID della versione da ritirare
 * @param {string} data.idCorso ID del corso a cui è assegnata la versione da ritirare
 * @param {Object[]} data.versioniAssegnateData versioni assegnate
 */
export function* versioneRitiraSaga(data) {
  if (!data.versioniAssegnateData) {
    yield put(versioniSpinnerSet(true));
    yield put(versioniFeedbackReset());
  } else {
    yield put(versioniLivelloSpinnerSet({
      [`ritira_${data.idVersione}`]: true,
      ritira: true,
    }));
  }

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_RITIRA}`, {
        versione: data.idVersione,
        corso: data.idCorso,
      }
    );

    if (response.data.ritirata) {
      if (!data.versioniAssegnateData) {
        yield put(versioniVersioneSet({ ritirata: true }));
      } else {
        const versioniAssegnate = data.versioniAssegnateData.map((v) => ({
          ...v,
          ritirata: v.ritirata || v.id === data.idVersione,
        }));

        yield put(versioniLivelloSet({
          versioniAssegnate,
        }));
      }

      yield put(modalSetData({
        contenuto: 'Il ritiro è avvenuto con successo',
        image: {
          src: checkmark,
          width: '180px',
          height: '130px',
          alt: 'Ritirata',
        },
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    } else {
      yield put(modalSetData({
        contenuto: 'Questa versione non può essere ritirata',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    }
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Questa versione non può essere ritirata',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }

  if (!data.versioniAssegnateData) {
    yield put(versioniSpinnerSet(false));
  } else {
    yield put(versioniLivelloSpinnerSet({
      [`ritira_${data.idVersione}`]: false,
      ritira: false,
    }));
  }
}


/**
 * Saga per eseguire le operazioni di caricamento della
 * versione da eseguire
 *
 * @param {object} data
 * @param {object} data.payload
 * @param {boolean} data.payload.isDocente indica se il richiedente è un docente
 * @param {boolean} data.payload.inCorso indica se l'esecuzione è in corso
 * @param {number} data.payload.backUrl url di ritorno
 * @param {number} data.payload.id id della versione / assegnazione
 * */
export function* versioneEseguiInizializza(data) {
  yield put(versioniSpinnerSet(true));
  yield put(versioniFeedbackReset());
  yield put(versioniVersioneAvanzamentoRisposteUtenteReset());
  yield put(versioniVersioneEsecuzionePeriodoCaricatoReset());

  try {
    let response;
    if (data.payload.isDocente) {
      response = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_DOCENTE_INIZIALIZZA}${data.payload.id}`
      );
    } else {
      response = yield call(
        axios.post,
        `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_STUDENTE_INIZIALIZZA}`, {
          assegnazione: data.payload.id,
        }
      );
    }

    const periodiParsati = response.data.periodi
      .sort((a, b) => (a.periodo_id - b.periodo_id))
      .map((singoloPeriodo) => ({
        periodo_id: singoloPeriodo.periodo_id,
        periodo: versionePeriodoToSteps(singoloPeriodo),
      }));
    yield put(versioniVersioneSet({
      titolo: response.data.titolo,
      sottotitolo: response.data.sottotitolo,
      fonte: response.data.fonte,
      autore: response.data.autore,
      periodi: periodiParsati,
      id: response.data.id,
      previewPeriodi: calcolaTestoIntroduttivoPeriodi(response.data.periodi),
      isLoaded: true,
      isEsecuzioneLoaded: true,
      backUrl: data.payload.backUrl || '',
    }));

    let statoAvanzamento = {};

    if (!data.payload.docente && data.payload.inCorso) {
      const statoAvanzamentoData = yield call(
        axios.get,
        `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_STUDENTE_RIPRENDI}${data.payload.id}`
      );
      statoAvanzamento = statoAvanzamentoData.data;
    }

    yield put(versioniVersioneAvanzamentoRisposteUtenteSet({
      risposteFornite: statoAvanzamento,
      periodiDaEseguire: calcolaPeriodiDaEseguire(
        response.data.periodi,
        statoAvanzamento
      ),
    }));

    yield call(data.payload.history.push, '/versione-periodi');
  } catch (error) {
    yield put(versioniFeedbackSet(
      true,
      'error',
      'Questa versione non può essere eseguita',
    ));
  }
  yield put(versioniSpinnerSet(false));
}


/**
 * @param {Object} data
 * @param {Boolean} data.payload.isDocente indica se l'utente è un docente
 * @param {Object[]} data.payload.step step in esecuzione
 * @param {Object} data.payload.risposteFornite matrice delle risposte fornite dal docente
 * @param {Object} data.payload.enableSuoni indica se abilitare i suoni
 * @param {Object} data.payload.versioneAvanzamento dati di avanzamento della versione in corso
 * @param {Object} data.payload.versioneCaricata dati della versione caricata
 * @param {Object} data.payload.versioneEsecuzione dati esecuzione versione
 * */
export function* versioneAvanzamentoRisposteFornitePost(data) {
  yield put(versioniSpinnerSet(true));
  yield put(versioniFeedbackReset());
  const stepCaricato = data.payload.versioneEsecuzione.periodoCaricato[data.payload.versioneEsecuzione.stepCaricatoKey];
  const versioneAvanzamento = data.payload.versioneAvanzamento;
  const versioneCaricata = data.payload.versioneCaricata;
  const risposteFornite = versioneAvanzamento.risposteFornite;
  const rispostaAnalizzata = normalizzaRispostaSelezionata(
    data.payload.risposta,
    stepCaricato.esercizi[0].tipo
  );
  const { fallbackRisposta, rispostaSelezionata, rispostaNormalizzata } = rispostaAnalizzata;

  const correzioneRisposta = {
    isCorrect: false,
    corrette: [],
    sbagliate: [],
    soluzione: undefined,
    ...correggiRisposta(stepCaricato, rispostaAnalizzata),
  };

  if (data.payload.helpRequest) {
    correzioneRisposta.soluzione = calcolaSoluzioni(
      stepCaricato.testi, stepCaricato.esercizi
    );
  }

  const dataToSet = {
    isChecked: true,
    isPristine: false,
    isCorrect: correzioneRisposta.isCorrect,
    mostraSoluzione: data.payload.helpRequest,
    mostraCorrezione: !data.payload.helpRequest,
    isHelpEnabled: data.payload.helpRequest,
    isInterfaceLocked: true,
    correzioneStep: {
      corrette: correzioneRisposta.corrette,
      sbagliate: correzioneRisposta.sbagliate,
      soluzione: correzioneRisposta.soluzione,
    },
  };

  if (!versioneAvanzamento.isPristine || data.payload.isDocente) /* istanbul ignore next */ {
    if (data.payload.helpRequest) {
      yield call(playSound, 'step_aiuto', !data.payload.enableSuoni);
    } else if (correzioneRisposta.isCorrect) {
      yield call(playSound, 'step_corretto', !data.payload.enableSuoni);
    } else {
      yield call(playSound, 'step_sbagliato', !data.payload.enableSuoni);
    }
  }

  // se sono in una correzione, non salvo lo stato di avanzamento
  // ma mi limito a visualizzare la correzione
  if (!versioneAvanzamento.isPristine) {
    yield put(versioniVersioneAvanzamentoRisposteUtenteSet(dataToSet));
  } else if (data.payload.isDocente) {
    // se sono docente eseguo tutto offline, quindi mi creo l'oggetto
    // con le risposte in locale
    dataToSet.risposteFornite = {
      ...risposteFornite,
      [stepCaricato.periodoId]: {
        ...(risposteFornite[stepCaricato.periodoId] || {}),
        [stepCaricato.id]: {
          ...((risposteFornite[stepCaricato.periodoId] || {})[stepCaricato.id] || {}),
          id: stepCaricato.esercizi[0].id,
          elementi: getIdsElementiEsercizio(stepCaricato),
          stato: correzioneRisposta.isCorrect ? /* istanbul ignore next */ 'C' : 'S',
          corretta: correzioneRisposta.isCorrect,
          esercizio: stepCaricato.esercizi[0].esercizioId,
          answer: data.payload.helpRequest ? fallbackRisposta : rispostaNormalizzata,
          readable: creaTestoReadable(
            rispostaSelezionata, stepCaricato, data.payload.helpRequest
          ),
        },
      },
    };

    dataToSet.periodiDaEseguire = calcolaPeriodiDaEseguire(
      versioneCaricata.periodi,
      dataToSet.risposteFornite
    );

    yield put(versioniVersioneAvanzamentoRisposteUtenteSet(dataToSet));
  } else {
    // se sono uno studente e non è la prima risposta data, uso
    // gli endpoint per validare la risposta
    try {
      const response = yield call(
        axios.post,
        `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_ESECUZIONE_RISPOSTE_FORNITE_POST}`, {
          assegnazione: versioneCaricata.id,
          tipo: stepCaricato.esercizi[0].tipo,
          periodo: stepCaricato.periodoId,
          step: stepCaricato.id,
          help_request: data.payload.helpRequest,
          risposta: data.payload.helpRequest ? fallbackRisposta : rispostaNormalizzata,
          readable: creaTestoReadable(
            rispostaSelezionata, stepCaricato, data.payload.helpRequest
          ),
          elementi: getIdsElementiEsercizio(stepCaricato),
          esercizio: stepCaricato.esercizi[0].esercizioId,
        }
      );
      dataToSet.risposteFornite = response.data;
      dataToSet.periodiDaEseguire = calcolaPeriodiDaEseguire(
        versioneCaricata.periodi,
        response.data
      );

      const responseData = response.data[data.payload.versioneEsecuzione.periodoCaricatoId][stepCaricato.id];

      if (!data.payload.helpRequest) /* istanbul ignore next */ {
        dataToSet.isCorrect = responseData.corretta || /* istanbul ignore next */ false;
        if (dataToSet.isCorrect) /* istanbul ignore next */ {
          yield call(playSound, 'step_corretto', !data.payload.enableSuoni);
        } else {
          yield call(playSound, 'step_sbagliato', !data.payload.enableSuoni);
        }
      } else {
        yield call(playSound, 'step_aiuto', !data.payload.enableSuoni);
      }

      yield put(versioniVersioneAvanzamentoRisposteUtenteSet(dataToSet));
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

  yield put(versioniSpinnerSet(false));
}

/**
 * Esegue l'avanzamento verso lo step successivo
 * @param {object} data.payload payload della funzione
 * @param {object} data.payload.risposteFornite risposte fornite dallo studente
 * @param {array} data.payload.periodi periodi della versione
 * @param {number} data.payload.stepEseguiti contatore degli step eseguiti
 * @param {number} data.payload.stepCaricatoKey key dello step caricato
 * @param {number} data.payload.periodoCaricatoId id dello step caricato
 * @param {number} data.payload.periodoCaricato periodo caricato
 * @param {object} data.payload.configuration configuration object
 * @param {object} data.payload.configuration.product product loaded
 * @param {function} data.payload.onModalResetData funzione di reset della modal
 * @param {object} data.payload.userAppData dati dell'utente relativi all'app
 * @param {object} data.payload.userAppData.hints hint dell'utente
 * @param {object} data.payload.userAnagraphics dati dell'utente (nome, cognome, id)
 * @param {number} data.payload.userAnagraphics.id id utente
 */
export function* versioneAvanzamentoNext(data) {
  yield put(versioniVersioneAvanzamentoRisposteUtenteReset());
  yield put(versioniVersioneAvanzamentoRisposteUtenteSet({
    risposteFornite: data.payload.risposteFornite,
    periodiDaEseguire: calcolaPeriodiDaEseguire(
      data.payload.periodi,
      data.payload.risposteFornite
    ),
  }));

  if (data.payload.periodoCaricatoId) {
    if (data.payload.periodoCaricato.length > (data.payload.stepCaricatoKey + 1)) {
      const stepCaricatoKey = data.payload.stepCaricatoKey + 1;
      const prossimoStep = data.payload.periodoCaricato[stepCaricatoKey];
      const hintToDisplay = getHintToDisplay(
        data.payload.configuration.product,
        `versione_${prossimoStep.esercizi[0].tipo}`,
        data.payload.userAppData.hints
      );

      yield put(versioniVersioneEsecuzionePeriodoCaricatoSet({
        stepCaricatoKey,
        stepEseguiti: data.payload.stepEseguiti + 1,
      }));

      yield put(userHintDisplay({
        hintToDisplay,
        dispatch: data.payload.dispatch,
        userHints: data.payload.userAppData.hints,
        userId: data.payload.userAnagraphics.id,
        product: data.payload.configuration.product,
      }));
    } else {
      yield put(versioniVersioneEsecuzionePeriodoCaricatoReset());
      yield call(data.payload.history.push, '/versione-periodi');
    }
  }
}

/**
 * Esegue la consegna della versione
 * @param {object} data.payload payload della funzione
 * @param {object} data.payload.id id della versione
 * @param {object} data.payload.risposteFornite risposta fornita
 * @param {object} data.payload.history oggetto history
 * @param {bool} data.payload.isDocente se utente è docente
 * @param {object} data.payload.enableSuoni indica se abilitare i suoni
 */
export function* versioneEsecuzioneConsegna(data) {
  yield put(versioniSpinnerSet(true));
  try {
    let response;

    if (data.payload.isDocente) {
      response = yield call(
        axios.post,
        `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_CONSEGNA_DOCENTE}`, {
          versione: data.payload.id,
          risposte: data.payload.risposteFornite,
        }
      );
    } else {
      response = yield call(
        axios.post,
        `${API_BASE_PATH}${VERSIONI_URL_VERSIONE_CONSEGNA_STUDENTE}`, {
          assegnazione: data.payload.id,
        }
      );
    }

    googleAnalyticsWrapper('event', {
      category: 'Versione',
      action: `Consegna ${data.payload.isDocente ? 'docente' : 'studente'}`,
    });

    yield put(versioniVersioneSet({
      isConsegnata: true,
    }));
    yield put(versioniVersioneAvanzamentoRisposteUtenteSet({
      votoFinale: response.data.voto,
    }));

    yield call(playSound, response.data.voto >= 6 ? 'vinto' : 'perso', !data.payload.enableSuoni);
    yield call(data.payload.history.push, '/versione-response');
  } catch (error) {
    yield put(versioniFeedbackSet(
      true,
      'error',
      'Non ho potuto consegnare questa versione',
    ));
  }
  yield put(versioniSpinnerSet(false));
}

/**
 * Esegue lo svuotamento del periodo caricato
 * @param {object} data parametri della richiesta
 * @param {object} data.periodi elenco dei periodi
 * @param {object} data.risposteFornite elenco delle risposte fornite
 */
export function* versioneEsecuzioneSvuota(data) {
  yield put(versioniVersioneAvanzamentoRisposteUtenteReset());
  yield put(versioniVersioneAvanzamentoRisposteUtenteSet({
    risposteFornite: data.payload.risposteFornite,
    periodiDaEseguire: calcolaPeriodiDaEseguire(
      data.payload.periodi,
      data.payload.risposteFornite
    ),
  }));
  yield put(versioniVersioneEsecuzionePeriodoCaricatoReset());
  yield call(data.payload.history.push, '/versione-periodi');
}

export function* watchVersioni() {
  yield takeEvery(VERSIONI_LIVELLO_FETCH, versioniLivelloFetchSaga);
  yield takeEvery(VERSIONI_VERSIONE_FETCH_TRIGGER, versioniPreviewFetch);
  yield takeEvery(VERSIONI_VERSIONE_ASSEGNA, versioneAssegnaSaga);
  yield takeEvery(VERSIONI_VERSIONE_RITIRA, versioneRitiraSaga);
  yield takeEvery(VERSIONI_VERSIONE_ESECUZIONE_INIZIALIZZA, versioneEseguiInizializza);
  yield takeEvery(VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_POST, versioneAvanzamentoRisposteFornitePost);
  yield takeEvery(VERSIONI_VERSIONE_AVANZAMENTO_NEXT_TRIGGER, versioneAvanzamentoNext);
  yield takeEvery(VERSIONI_VERSIONE_ESECUZIONE_CONSEGNA, versioneEsecuzioneConsegna);
  yield takeEvery(VERSIONI_VERSIONE_ESECUZIONE_SVUOTA_TRIGGER, versioneEsecuzioneSvuota);
}

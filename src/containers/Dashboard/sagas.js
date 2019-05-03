import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { CONFIGURATION_CHANGE } from 'common/applications/constants';
import { configurationSet } from 'common/applications/actions';
import { defaultMytestUnita } from 'containers/CreaVerifiche/reducer';
import { creaverificheVerificaEserciziSet } from 'containers/CreaVerifiche/actions';
import { API_BASE_PATH } from 'configuration';
import {
  DASHBOARD_LIVELLI_FETCH,
  DASHBOARD_LIVELLI_URL_ENDPOINT,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ACADEMY,
  DASHBOARD_LIVELLI_URL_ENDPOINT_PARALLEL,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ALATIN,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ITACA,
  DASHBOARD_LIVELLI_URL_ENDPOINT_ARGONAUTA,
} from './constants';
import {
  spinnerSet,
  livelliSet,
  livelliFetch,
  livelliFetchError,
  livelliIsLoadingSet,
} from './actions';

export const montaAlberoDashboard = (data, product) => {
  let elencoVersioniPerMissione = [];
  let elencoProveCompetenzaPerMissione = [];
  let elencoProveParallelPerMissione = [];
  let elencoVersioniPerLivello = [];
  let elencoVerifichePerLivello = [];

  switch (product) {
    case 'parallel':
      // FIXME: a regime mettere la chiave corretta
      elencoProveParallelPerMissione = data.prove_competenza || [];
      break;
    case 'lyceum':
      elencoVersioniPerMissione = data.versioni || [];
      elencoProveCompetenzaPerMissione = data.prove_competenza || [];
      break;
    case 'alatin':
      elencoVersioniPerLivello = data.versioni || [];
      elencoVerifichePerLivello = data.verifiche || [];
      break;
    case 'itaca':
      elencoVerifichePerLivello = data.verifiche || [];
      break;
    /* istanbul ignore next */ default: break;
  }

  const versioniPerLivello = elencoVersioniPerLivello.reduce((acc, versione) => {
    acc[versione.livello] = {
      assegnate: versione.assegnate,
      daRitirare: versione.da_ritirare,
      daConsegnare: versione.da_consegnare,
    };

    return acc;
  }, { assegnate: 0, daRitirare: 0, daConsegnare: 0 });

  const verifichePerLivello = elencoVerifichePerLivello.reduce((acc, verifica) => {
    acc[verifica.livello] = {
      assegnate: verifica.assegnate,
      daRitirare: verifica.da_ritirare,
      daConsegnare: verifica.da_consegnare,
    };

    return acc;
  }, { assegnate: 0, daRitirare: 0, daConsegnare: 0 });

  const versioniPerMissione = elencoVersioniPerMissione.reduce((acc, versione) => {
    if (!acc[versione.missione]) {
      acc[versione.missione] = [];
    }

    const fonteAutore = [versione.autore, versione.fonte].filter((item) => (item));
    const titoloDisplay = `${versione.titolo}${fonteAutore.length > 0 ? ` (${fonteAutore.join(', ')})` : ''} - versione`;

    if (versione.assegnabile) {
      acc[versione.missione].push({
        id: versione.id,
        ordine: versione.ordine,
        assegnazione: versione.assegnazione,
        titolo: titoloDisplay,
        completata: versione.completata,
        inCorso: versione.in_corso,
        tipo: versione.tipo.toLowerCase(),
      });
    }

    return acc;
  }, {});

  const proveCompetenzaPerMissione = elencoProveCompetenzaPerMissione.reduce((acc, prova) => {
    if (!acc[prova.missione]) {
      acc[prova.missione] = [];
    }
    const fonteAutore = [prova.autore, prova.fonte].filter((item) => (item)).join(', ');
    const titoloDisplay = `${prova.titolo}${fonteAutore ? ` (${fonteAutore})` : ''} - comprensione${prova.difficolta ? ` ${prova.difficolta}` : ''}`;

    if (prova.assegnabile) {
      acc[prova.missione].push({
        id: prova.id,
        ordine: prova.ordine,
        assegnazione: prova.assegnazione,
        titolo: titoloDisplay,
        completata: prova.completata,
        inCorso: prova.in_corso,
        tipo: prova.tipo.toLowerCase(),
      });
    }

    return acc;
  }, {});

  const proveParallelPerMissione = elencoProveParallelPerMissione.reduce((acc, test) => {
    if (!acc[test.missione]) {
      acc[test.missione] = [];
    }
    const fonteAutore = [test.autore, test.fonte].filter((item) => (item)).join(', ');
    const titoloDisplay = `${test.titolo}${fonteAutore ? ` (${fonteAutore})` : ''} - parallel`;

    if (test.assegnabile) {
      acc[test.missione].push({
        id: test.id,
        ordine: test.ordine,
        assegnazione: test.assegnazione,
        titolo: titoloDisplay,
        completata: test.completata,
        inCorso: test.in_corso,
        tipo: 'provaparallel', // FIXME: a regime prendere tipologia da endpoint
      });
    }

    return acc;
  }, {});

  const unitaPerMissione = (data.unita || []).reduce((acc, unita) => {
    if (!acc[unita.missione]) {
      acc[unita.missione] = [];
    }

    acc[unita.missione].push({
      lessico: unita.lessico,
      sbloccata: unita.sbloccata,
      locked: unita.locked,
      titolo: unita.titolo,
      id: unita.id,
      ordine: unita.ordine,
      tipo: 'unita',
      assegnazione: unita.assegnata ? {
        id: unita.id,
      } : undefined,
      lezioniTotali: unita.lezioni,
      lezioniEseguite: unita.esecuzioni,
    });

    return acc;
  }, {});

  return data.livelli.reduce((acc, livello) => {
    acc.push({
      id: livello.id,
      titolo: livello.titolo,
      versioni: versioniPerLivello[livello.id],
      verifiche: verifichePerLivello[livello.id],
      missioni: livello.missioni
        .sort((a, b) => (a.ordine - b.ordine))
        .map((missione) => ({
          titolo: missione.titolo,
          displayTitolo: ['lyceum'].indexOf(product) > -1,
          id: missione.id,
          hasTesto: missione.con_testo,
          contenuti: [
            ...(versioniPerMissione[missione.id] || []),
            ...(proveCompetenzaPerMissione[missione.id] || []),
            ...(unitaPerMissione[missione.id] || []),
            ...(proveParallelPerMissione[missione.id] || []),
          ].sort((a, b) => (a.ordine - b.ordine)),
        })),
    });

    return acc;
  }, []);
};


export function* loadLivelli(data) {
  try {
    yield put(spinnerSet(true));
    yield put(livelliIsLoadingSet(true));

    let response;
    let url = DASHBOARD_LIVELLI_URL_ENDPOINT;
    const urlForProduct = {
      alatin: DASHBOARD_LIVELLI_URL_ENDPOINT_ALATIN,
      itaca: DASHBOARD_LIVELLI_URL_ENDPOINT_ITACA,
      argonauta: DASHBOARD_LIVELLI_URL_ENDPOINT_ARGONAUTA,
      lyceum: DASHBOARD_LIVELLI_URL_ENDPOINT_ACADEMY,
      parallel: DASHBOARD_LIVELLI_URL_ENDPOINT_PARALLEL,
    };

    switch (data.configuration.product) {
      case 'alatin':
      case 'itaca':
      case 'argonauta':
      case 'lyceum':
      case 'parallel':
        url = urlForProduct[data.configuration.product];
        response = yield call(
          axios.get,
          `${API_BASE_PATH}${url}`, {
            params: {
              disciplina: data.configuration.disciplinaId,
              corso: data.isDocente && data.corsoId ? data.corsoId : undefined,
            },
          }
        );
        yield put(livelliSet(montaAlberoDashboard(response.data, data.configuration.product)));
        break;

      default:
        response = yield call(
          axios.get,
          `${API_BASE_PATH}${url}`, {
            params: { disciplina: data.configuration.disciplinaId },
          }
        );

        yield put(livelliSet(response.data));
        break;
    }

    yield put(spinnerSet(false));
  } catch (error) {
    yield put(livelliFetchError());
    yield put(spinnerSet(true));
  }
  yield put(livelliIsLoadingSet(false));
}

/**
 * Dati in input i dati della nuova configurazione da
 * applicare, aggiorna il file di configurazione degli esercizi
 *
 * Mi porto dietro anche oldConfiguration che contiene i vecchi
 * dati della configurazione perché mi serve inoltrarli a livelliFetch
 * Questo perché non è detto che ho tutti i dettagli che voglio
 * aggiornare sono tutti quelli che mi servono in livelliFetch: per
 * esempio potrei voler aggiornare il titolo dell'applicazione ma
 * aver bisogno in livelliFetch di product
 * @param data payload dell'action
 * @param data.payload nuovi dati da sovrascrivere
 * @param data.oldConfiguration vecchi dati della configurazione
 */
export function* updateConfiguration(data) {
  yield put(creaverificheVerificaEserciziSet(defaultMytestUnita)); // TODO: questo non credo debba stare qui
  yield put(configurationSet(data.payload));
  yield put(livelliFetch({ ...data.oldConfiguration, ...data.payload }));
}

export function* watchDashboard() {
  yield takeEvery(DASHBOARD_LIVELLI_FETCH, loadLivelli);
  yield takeEvery(CONFIGURATION_CHANGE, updateConfiguration);
}

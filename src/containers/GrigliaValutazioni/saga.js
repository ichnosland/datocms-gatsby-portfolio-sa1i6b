import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { round } from 'common/utils';
import { API_BASE_PATH } from 'configuration';
import { sortDataBySpecs } from 'common/statistiche';
import { modalSetData } from 'containers/ModalBox/actions';
import errore from 'images/infocard-icn_errore.png';
import { classeDettaglioDataFetch, classeDettaglioFeedbackSet } from 'containers/ClasseDettaglio/actions';

import {
  GRIGLIA_VALUTAZIONI_URI_CREA,
  GRIGLIA_VALUTAZIONI_URI_DETTAGLIO,
  GRIGLIA_VALUTAZIONI_URI_DETTAGLIO_STUDENTE,
  GRIGLIA_VALUTAZIONI_URI_FETCH,
  GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH,
  GRIGLIA_VALUTAZIONI_VALUTABILI_SORT,
  GRIGLIA_VALUTAZIONI_CREA,
  GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH,
  CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA,
} from './constants';

import {
  grigliaValutazioneSpinnerSet,
  grigliaValutazioneFeedbackSet,
  grigliaValutazioneFeedbackReset,
  grigliaValutazioneDisplaySet,
  grigliaValutazioneValutabiliSet,
  grigliaValutazioneContenutoSet,
  grigliaValutazioneDettaglioReset,
  grigliaValutazioneDettaglioSet,
  grigliaValutazioneValutabiliReset,
  grigliaValutazioneReset,
  grigliaValutazioneDettaglioStudenteSet,
  grigliaValutazioneDettaglioStudenteReset,
} from './actions';



/**
 * Datie in input le valutazioni, per ognuna aggiunge
 * un record contenente il voto approssimato
 * @param {Object[]} valutazioni
 */
export const approssimaVotoValutazioni = (valutazioni) => (valutazioni.map((v) => ({
  ...v,
  votoApprossimato: v.voto >= 0 ? round(v.voto, 2) : v.voto,
})));

/**
 * Indica su quale chiave del reducer vanno settati i dati letti
 * dall'endpoint: per esempio versioniLivello e versioniMissioni
 * fanno riferimento alla stessa chiave "versioni" perché i dati
 * sono gli stessi.
 */
const aliasBlocchi = {
  obiettivi: 'unita',
  proveCompetenza: 'prove_competenza',
  versioniLivello: 'versioni',
  versioniMissione: 'versioni',
  verificheLivello: 'verifiche',
  verificheMissioni: 'verifiche',
};

/**
 * Dati in input i dati degli elementi da riordinare
 * e i criteri di riordino, salva nel reducer
 * gli elementi riordinati
 * @param {Object} data dati della funzione
 * @param {Object[]} data.payloadData array da ordinare
 * @param {Object} data.sortingData dettagli di riordino
 * @param {String} data.sortingData.sort ordine (asc / desc) di ordinamento
 * @param {String} data.sortingData.field chiave in base alla quale ordinare
 * @param {String} data.sortingData.type tipologia di dato (numero o altro)
 */
export function* grigliaValutazioneSortSaga(data) {
  yield put(grigliaValutazioneSpinnerSet(true));

  const sortedData = sortDataBySpecs(data.payloadData, data.sortingData);

  yield put(grigliaValutazioneContenutoSet({ sortedData }));
  yield put(grigliaValutazioneDisplaySet(data.sortingData));
  yield put(grigliaValutazioneSpinnerSet(false));
}


/**
 * Effettua il fetch dell'elenco degli elementi valutabili
 * @param {Object} data payload della funzione
 * @param {Number} data.corsoId pk del corso
 * @param {String} data.progetto nome del progetto
 * @param {Object} data.payload dati da gestire
 * @param {Object[]} data.payload.blocchiAttivi elenco dei blocchi da gestire
 */
export function* valutabiliFetchSaga(data) {
  yield put(grigliaValutazioneSpinnerSet(true));
  yield put(grigliaValutazioneReset());

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${GRIGLIA_VALUTAZIONI_URI_FETCH}${data.corsoId}`
      /*
        TODO: capire se ha senso inviare l'elenco dei blocchi attivi
        o se il server filtra i dati in base a data.progetto o in
        che altro modo, perché in questo momento il client sta restituendo
        tutto senza far differenze
      */
    );

    /*
      Filtra i dati lasciando solo le chiavi che vanno effettivamente
      mostrate al docente, ovvero che hanno una corrispondenza tra
      quelle incluse in data.payload.blocchiAttivi.
      TODO: questa cosa a regime deve farla il back-end e non il front-end
    */
    const blocchiDaMostrare = data.payload.blocchiAttivi
      .filter((blocco) => (aliasBlocchi[blocco]));

    const valutabili = blocchiDaMostrare.reduce((acc, key) => {
      if (response.data[aliasBlocchi[key]]) {
        acc[key] = response.data[aliasBlocchi[key]].map((i) => ({
          id: i.id,
          dataCreazione: new Date(i.data_creazione)
            .toISOString().split('T')[0].split('-').reverse().join('/'),
          dataSortable: i.data_creazione,
          titolo: i.titolo,
          checkbox: undefined,
          checkboxSortable: 0,
        }));
      }
      return acc;
    }, {});

    const displayData = {
      field: 'titolo',
      block: blocchiDaMostrare[0],
      type: 'string',
      sort: 'asc',
    };

    yield put(grigliaValutazioneValutabiliSet(valutabili));

    const orderedData = sortDataBySpecs(valutabili[displayData.block], displayData);
    yield put(grigliaValutazioneContenutoSet({
      isDataLoaded: true,
      nomeCorso: response.data.nome_classe,
      sortedData: orderedData,
    }));
    yield put(grigliaValutazioneDisplaySet(displayData));
  } catch (error) {
    yield put(grigliaValutazioneFeedbackSet(
      true,
      'error',
      'I dati di questa valutazione non possono essere caricati'
    ));
  }

  yield put(grigliaValutazioneSpinnerSet(false));
}


/**
 * Carica un nuovo blocco selezionato
 * @param {Object} data payload della funzione
 * @param {Object} data.valutabili elenco dei blocchi attivi
 * @param {String} data.blocco blocco da selezionare
 */
export function* grigliaValutazioniBloccoSetSaga(data) {
  yield put(grigliaValutazioneFeedbackReset());
  yield put(grigliaValutazioneSpinnerSet(true));

  const displayData = {
    field: 'titolo',
    block: data.blocco,
    type: 'string',
    style: {
      justifyContent: 'space-between',
    },
    sort: 'asc',
  };

  const orderedData = sortDataBySpecs(
    data.valutabili[data.blocco],
    displayData
  );
  yield put(grigliaValutazioneContenutoSet({
    isDataLoaded: true,
    sortedData: orderedData,
  }));

  yield put(grigliaValutazioneDisplaySet(displayData));
  yield put(grigliaValutazioneSpinnerSet(false));
}


/**
 * Crea una nuova valutazione. Effettua il post dei dati
 * di una nuova valutazione. Se ha successo, fa un redirect alla
 * pagina delle valutazioni
 * @param {Object} data dati dell'action
 * @param {Object} data.payload payload
 * @param {Object[]} data.payload.blocchiAttivi elenco dei blocchi attivi
 * @param {Number} data.payload.corsoId pk del corso
 * @param {Function} data.payload.historyPush function dell'history push
 * @param {Object} data.payload.selection dati selezionati dall'utente
 * @param {String} data.payload.selection.titolo titolo selezionato
 * @param {Object[]} data.payload.selection.obiettivi pk degli obiettivi selezionati
 * @param {Object[]} data.payload.selection.versioniMissione pk delle versioni di missione
 * @param {Object[]} data.payload.selection.versioniLivello pk delle versioni di livello
 * @param {Object[]} data.payload.selection.verificheMissione pk delle verifiche di missione
 * @param {Object[]} data.payload.selection.verificheLivello pk delle verifiche di livello
 * @param {Object[]} data.payload.selection.proveCompetenza pk delle prove per competenza
 */
export function* valutazioneCreaSaga(data) {
  yield put(grigliaValutazioneFeedbackReset());
  yield put(grigliaValutazioneSpinnerSet(true));

  try {
    const blocchiDaMostrare = data.payload.blocchiAttivi
      .filter((blocco) => (aliasBlocchi[blocco]));

    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${GRIGLIA_VALUTAZIONI_URI_CREA}${data.payload.corsoId}`, {
        titolo: data.payload.selection.titolo,
        ...blocchiDaMostrare.reduce((acc, key) => {
          if (data.payload.selection[key]) {
            // TODO: questo va gestito in modo più intelligente da back-end
            acc[aliasBlocchi[key]] = data.payload.selection[key];
          }

          return acc;
        }, { versioni: [], verifiche: [], prove_competenza: [], unita: [] }),
      }
    );

    if ((response || {}).status === 201) {
      yield call(
        data.payload.historyPush,
        `/classe-dettaglio/${data.payload.corsoId}/grigliavalutazione`
      );
      yield put(grigliaValutazioneValutabiliReset());
    } else {
      yield put(modalSetData({
        contenuto: 'Non è stato possibile salvare la tua valutazione',
        show: true,
        closeButton: {
          text: 'Ok',
        },
        image: {
          src: errore,
          width: '180px',
          height: '130px',
          alt: 'Errore',
        },
      }));
    }
  } catch (e) {
    yield put(modalSetData({
      contenuto: 'Non è stato possibile salvare la tua valutazione',
      show: true,
      closeButton: {
        text: 'Ok',
      },
      image: {
        src: errore,
        width: '180px',
        height: '130px',
        alt: 'Errore',
      },
    }));
  }

  yield put(grigliaValutazioneSpinnerSet(false));
}


/**
 * Effettua il fetch del dettaglio della griglia di valutazione
 * @param {Object} data
 * @param {Number} data.payload.valutazioneId pk della valutazione
 * @param {Object} data.payload.data dati della prova da visualizzare
 * @param {String} data.payload.data.titolo titolo della prova
 * @param {String} data.payload.data.dataCreazione data di creazione
 * @param {Number} data.payload.data.corsoId pk del corso
 * @param {String} data.payload.data.corsoNome nome del corso
 * @param {Object} data.payload.data.tipologia tipologia della prova
 * @param {Object} data.payload.theme tema
 * @param {String} data.payload.theme.brand brand del tema
 */
export function* grigliaValutazioneDettaglioSaga(data) {
  yield put(grigliaValutazioneDettaglioReset());
  yield put(grigliaValutazioneSpinnerSet(true));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${GRIGLIA_VALUTAZIONI_URI_DETTAGLIO}${data.payload.valutazioneId}`
    );

    const displayData = {
      field: 'nome',
      type: 'string',
      sort: 'asc',
    };

    const orderedData = sortDataBySpecs(
      response.data.map((d) => ({ ...d, voto: round(d.voto, 2) })),
      displayData
    );

    yield put(grigliaValutazioneDisplaySet(displayData));
    yield put(grigliaValutazioneDettaglioSet({
      valutazioneId: data.payload.valutazioneId,
      dataCreazione: data.payload.data.dataCreazione,
      titolo: data.payload.data.titolo,
      corsoId: data.payload.data.corsoId,
      corsoNome: data.payload.data.corsoNome,
      tipologia: data.payload.data.tipologia,
      sortedData: orderedData,
      intestazioniColonna: [{
        label: 'Studente',
        field: 'nome',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
        styleCell: {
          primo: true,
        },
        fieldsDisplay: [{
          field: 'nome',
          function: 'studenteDetailFunction',
        }],
      }, {
        label: 'Punteggio',
        field: 'voto',
        type: 'number',
        styleRiga: {
          color: data.payload.theme.brand,
        },
        fieldsDisplay: [{ field: 'voto' }],
      }],
    }));
  } catch (error) {
    yield put(grigliaValutazioneFeedbackSet(
      true,
      'error',
      'Il dettaglio di questa valutazione non è disponibile',
    ));
  }
  yield put(grigliaValutazioneSpinnerSet(false));
}

/**
 * Dati in input i dati degli elementi da riordinare per il rettaglio
 * e i criteri di riordino, salva nel reducer
 * gli elementi riordinati
 * @param {Object} data dati della funzione
 * @param {Object[]} data.payloadData array da ordinare
 * @param {Object} data.sortingData dettagli di riordino
 * @param {String} data.sortingData.sort ordine (asc / desc) di ordinamento
 * @param {String} data.sortingData.field chiave in base alla quale ordinare
 * @param {String} data.sortingData.type tipologia di dato (numero o altro)
 */
export function* grigliaValutazioneDetailSortSaga(data) {
  yield put(grigliaValutazioneSpinnerSet(true));
  const sortedData = sortDataBySpecs(data.payloadData, data.sortingData);
  yield put(grigliaValutazioneDettaglioSet({ sortedData }));
  yield put(grigliaValutazioneDisplaySet(data.sortingData));
  yield put(grigliaValutazioneSpinnerSet(false));
}


/**
 * Effettua il fetch dei dati del dettaglio dello studente
 * per una singola valutazione
 * @param {Object} data dati della funzione
 * @param {Object} data.payload payload
 * @param {Number} data.payload.studenteAcademyId: pk dello studente academy
 * @param {Number} data.payload.valutazioneId: pk della valutazione
 * @param {String} data.payload.valutazioneTitolo: titolo valutazione
 * @param {String} data.payload.valutazioneTipologia: tipologia valutazione
 * @param {String} data.payload.nomeStudente: nome dello studente
 * @param {String} data.payload.dataCreazioneValutazione: data di creazione readable della valutazione
 * @param {Number} data.payload.voto: voto dello studente
 * @param {Function} data.payload.historyPush: push della history
 * @param {Number} data.payload.corsoId: id del corso
 * @param {String} data.payload.corsoNome: nome del corso
 */
export function* grigliaValutazioneDettaglioStudenteSaga(data) {
  yield put(grigliaValutazioneDettaglioStudenteReset());
  yield put(grigliaValutazioneSpinnerSet(true, 'dettaglioStudente'));
  yield put(grigliaValutazioneSpinnerSet(true, `dettaglioStudente_${data.payload.studenteAcademyId}`));

  try {
    const pathGriglia = GRIGLIA_VALUTAZIONI_URI_DETTAGLIO_STUDENTE.replace('{ID_VALUTAZIONE}', data.payload.valutazioneId);
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${pathGriglia}`, {
        id_studente: data.payload.studenteAcademyId,
      }
    );

    yield put(grigliaValutazioneDettaglioStudenteSet({
      isLoaded: true,
      nome: data.payload.nomeStudente,
      valutazioneId: data.payload.valutazioneId,
      dataCreazioneValutazione: data.payload.dataCreazioneValutazione,
      corsoNome: data.payload.corsoNome,
      corsoId: data.payload.corsoId,
      votoMedia: data.payload.voto,
      verifiche: approssimaVotoValutazioni(response.data.verifiche || []),
      versioni: approssimaVotoValutazioni(response.data.versioni || []),
      proveCompetenza: approssimaVotoValutazioni(response.data.prove_competenza || []),
      unita: approssimaVotoValutazioni(response.data.unita || []),
      valutazioneTitolo: data.payload.valutazioneTitolo,
      valutazioneTipologia: data.payload.valutazioneTipologia,
    }));

    yield call(data.payload.historyPush, '/griglia-valutazione-dettaglio-studente');
  } catch (error) {
    yield put(modalSetData({
      contenuto: 'Il dettaglio di questo studente non è disponibile',
      show: true,
      closeButton: {
        text: 'Ok',
      },
      image: {
        src: errore,
        width: '180px',
        height: '130px',
        alt: 'Errore',
      },
    }));
  }
  yield put(grigliaValutazioneSpinnerSet(false, 'dettaglioStudente'));
  yield put(grigliaValutazioneSpinnerSet(false, `dettaglioStudente_${data.payload.studenteAcademyId}`));
}

/**
 * Elimina una valutazione visibile nel dettaglio dello studente
 * @param {Number} data.payload.id: pk della valutazione
 * @param {Object} data.payload.block
 * @param {Number} data.payload.corsoId
 * @param {Function} data.payload.historyPush
 * @param {Object} data.payload.corsoIscritti
 * @param {Object} data.payload.data
 */
export function* grigliaValutazioniEliminaSaga(data) {
  try {
    const pathGriglia = `${CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA}${data.payload.id}`;
    yield call(
      axios.delete,
      `${API_BASE_PATH}${pathGriglia}`
    );
    yield put(
      classeDettaglioDataFetch({
        block: data.payload.block,
        corsoId: data.payload.corsoId,
        historyPush: data.payload.historyPush,
        corsoIscritti: data.payload.corsoIscritti,
        data: data.payload.data,
      })
    );
  } catch {
    yield put(classeDettaglioFeedbackSet(
      true,
      'error',
      "Impossibile cancellare la valutazione, ricarica la pagina o contatta l'assistenza",
    ));
  }
}

export default function* watchValutazione() {
  yield takeEvery(GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH, valutabiliFetchSaga);
  yield takeEvery(GRIGLIA_VALUTAZIONI_CREA, valutazioneCreaSaga);
  yield takeEvery(GRIGLIA_VALUTAZIONI_VALUTABILI_SORT, grigliaValutazioneSortSaga);
  yield takeEvery(GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET, grigliaValutazioniBloccoSetSaga);
  yield takeEvery(GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH, grigliaValutazioneDettaglioSaga);
  yield takeEvery(CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA, grigliaValutazioniEliminaSaga);
  yield takeEvery(GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT, grigliaValutazioneDetailSortSaga);
  yield takeEvery(GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH, grigliaValutazioneDettaglioStudenteSaga);
}

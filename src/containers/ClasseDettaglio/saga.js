/*
 *
 * Corsi sagas
 *
 */

import React from 'react';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH, APP_TESTING } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import { sortDataBySpecs } from 'common/statistiche';
import { Icon } from 'components/Button';
import { colore } from 'style/color';
import buttonicon from 'icons/buttons';
import { round } from 'common/utils';
import {
  CLASSE_DETTAGLIO_URL_CORSO_FETCH,
  CLASSE_DETTAGLIO_URL_OBIETTIVI_FETCH,
  CLASSE_DETTAGLIO_URL_VERSIONI_MISSIONE_FETCH,
  CLASSE_DETTAGLIO_URL_VERIFICHE_LIVELLO_FETCH,
  CLASSE_DETTAGLIO_URL_VERSIONI_LIVELLO_FETCH,
  CLASSE_DETTAGLIO_URL_PROVE_COMPETENZA_FETCH,
  CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_FETCH,
  CLASSE_DETTAGLIO_URL_ESPELLI,
  CLASSE_DETTAGLIO_CORSO_FETCH,
  CLASSE_DETTAGLIO_DATA_FETCH,
  CLASSE_DETTAGLIO_DISPLAY_SORT,
  CLASSE_DETTAGLIO_ESPELLI,
} from './constants';
import {
  classeDettaglioDisplaySet,
  classeDettaglioReset,
  classeDettaglioContenutoSet,
  classeDettaglioSpinnerSet,
  classeDettaglioFeedbackReset,
  classeDettaglioFeedbackSet,
  classeDettaglioDataFetch,
  classeDettaglioCorsoFetch,
} from './actions';


/**
 * Dati in input l'array con l'elenco degli iscritti e
 * l'oggetto con i dati delle prove a loro associati,
 * restituisce un array con le info estese dello studente,
 * tra cui dati del dettaglio e media approssimata
 * @param {Object[]} corsoIscritti
 * @param {Object} dataContenuto
 */
export const calcolaDatiStudente = (corsoIscritti, dataContenuto = {}) => (
  corsoIscritti.map((u) => {
    const dataUtente = (dataContenuto[u.studenteAcademyId] || {});
    return {
      ...u,
      key: u.studenteAcademyId,
      media: dataUtente.media >= 0 ? round(dataUtente.media, 2) : undefined,
      detailData: dataUtente.detailData ? {
        ...dataUtente.detailData,
        titolo: u.name,
        sottoTitolo: u.email,
      } :
        {
          sortedData: [],
          titolo: u.name,
          sottoTitolo: u.email,
        },
    };
  })
);


/**
 * Dati in input un array dei dati di una prova (versione, verifiche ecc),
 * calcola il dettaglio della visualizzazione e la media
 * @param {Object[]} data
 */
export const calcolaDataStudente = (data, styleOptions = {}) => {
  let returnData;

  returnData = data.reduce((acc, item) => {
    if (!acc[item.studente]) {
      acc[item.studente] = {
        media: 0,
        detailData: {
          sortedData: [],
          field: 'titolo',
          sort: 'asc',
          type: 'string',
          intestazioniColonna: [{
            label: 'Titolo',
            field: 'titolo',
            type: 'string',
            style: {
              justifyContent: 'space-between',
            },
            fieldsDisplay: [{ field: 'titolo' }],
          }, {
            label: 'Voto',
            field: 'voto',
            type: 'number',
            styleRiga: {
              color: styleOptions.brand,
            },
            fieldsDisplay: [{ field: 'voto' }],
          }],
        },
      };
    }

    acc[item.studente].detailData.sortedData.push({
      titolo: item.titolo,
      voto: round(item.voto, 2),
      votoReale: item.voto,
    });
    return acc;
  }, {});

  returnData = Object.keys(returnData)
    .reduce((acc, k) => {
      acc[k] = {
        ...returnData[k],
        media: returnData[k].detailData.sortedData
          .reduce((acc2, item) => (acc2 + item.votoReale), 0) /
          (returnData[k].detailData.sortedData.length),
      };

      return acc;
    }, {});

  return returnData;
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
export function* classeDettaglioSortSaga(data) {
  yield put(classeDettaglioSpinnerSet(true));

  const sortedData = sortDataBySpecs(data.payloadData, data.sortingData);

  yield put(classeDettaglioContenutoSet({ sortedData }));
  yield put(classeDettaglioDisplaySet(data.sortingData));
  yield put(classeDettaglioSpinnerSet(false));
}


/**
 * Effettua il fetch dei dati del corso e, in base al tab attivo e fa il
 * parsing dei dati da utilizzare nelle singole tab
 * @param {Object} data
 * @param {Number} data.payload.corsoId pk del corso
 * @param {Number} data.payload.disciplinaId pk della disciplina
 * @param {String} data.payload.block nome del blocco attivo
 * @param {Object[]} data.payload.enabledBlocks elenco dei blocchi attivi
 * @param {Object} data.payload.theme tema caricato
 * @param {String} data.payload.theme.brand brand del tema
 */
export function* classeDettaglioCorsoFetchSaga(data) {
  yield put(classeDettaglioReset());
  yield put(classeDettaglioSpinnerSet(true));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_CORSO_FETCH}${data.payload.corsoId}`, {
        params: { disciplina: data.payload.disciplinaId },
      },
    );

    const dataContenuto = {
      isCorsoLoaded: true,
      corsoNome: response.data.nome,
      corsoId: response.data.pk,
      corsoIscritti: response.data.iscritti.map((u) => ({
        studenteAcademyId: u.studenteAcademy,
        email: u.email,
        nameSortable: `${u.last_name} ${u.first_name}`,
        name: `${u.first_name} ${u.last_name}`,
        xp: u.punti,
      })),
      intestazioniColonna: [{
        blocchi: ['obiettivi', 'versioniMissione'],
        label: 'Studente',
        field: 'nameSortable',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
        styleCell: {
          primo: true,
        },
        fieldsDisplay: [{
          field: 'name',
          function: 'detailDataFunction',
        }, /* istanbul ignore next */ APP_TESTING && {
          field: 'espelliStudente',
          function: 'espelliStudentefunction',
        }].filter((f) => (f)),
      }, {
        blocchi: ['verificheLivello', 'versioniLivello', 'proveCompetenza'],
        label: 'Studente',
        field: 'nameSortable',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
        styleCell: {
          primo: true,
        },
        fieldsDisplay: [{ field: 'name', function: 'detailDataFunction' }],
      }, {
        blocchi: ['obiettivi'],
        label: 'Completate',
        field: 'completate',
        type: 'number',
        styleRiga: {
          color: colore.ui.okTxt,
        },
        fieldsDisplay: [{ field: 'completate' }],
      }, {
        blocchi: ['obiettivi'],
        label: 'In corso',
        field: 'inCorso',
        type: 'number',
        styleRiga: {
          color: colore.actions.help,
        },
        fieldsDisplay: [{ field: 'inCorso' }],
      }, {
        blocchi: ['obiettivi'],
        label: 'Non iniziate',
        field: 'nonIniziate',
        type: 'number',
        styleRiga: {
          color: colore.ui.lightTxt,
        },
        fieldsDisplay: [{ field: 'nonIniziate' }],
      }, {
        blocchi: ['obiettivi'],
        label: '%',
        field: 'percentualeErrate',
        type: 'number',
        styleRiga: {
          color: colore.actions.error,
        },
        fieldsDisplay: [{ field: 'percentualeErrate' }],
      }, {
        blocchi: ['obiettivi'],
        label: 'XP',
        field: 'xp',
        type: 'number',
        styleRiga: {
          color: data.payload.theme.brand,
        },
        fieldsDisplay: [{ field: 'xp' }],
      }, {
        blocchi: ['versioniLivello', 'verificheLivello', 'versioniMissione', 'proveCompetenza'],
        label: 'Media',
        field: 'media',
        type: 'number',
        styleRiga: {
          color: data.payload.theme.brand,
        },
        fieldsDisplay: [{ field: 'media' }],
      }, {
        blocchi: ['grigliaValutazione'],
        label: 'Titolo',
        field: 'titolo',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
        styleCell: {
          primo: true,
        },
        fieldsDisplay: [{
          field: 'titolo',
          function: 'apriValutazioneFunction',
        }, {
          field: 'eliminaValutazione',
          function: 'eliminaValutazioneFunction',
        }],
      }, {
        blocchi: ['grigliaValutazione'],
        label: 'Tipologia',
        field: 'tipo',
        type: 'string',
        styleRiga: {
          textTransform: 'lowercase',
        },
        fieldsDisplay: [{ field: 'tipo' }],
      }, {
        blocchi: ['grigliaValutazione'],
        label: 'Creata il',
        field: 'dataCreazioneSortable',
        type: 'string',
        fieldsDisplay: [{ field: 'dataCreazione' }],
      }],
    };

    yield put(classeDettaglioContenutoSet(dataContenuto));
    yield put(classeDettaglioDataFetch({
      data: {
        obiettivi: dataContenuto.obiettivi,
        verificheLivello: dataContenuto.verificheLivello,
        versioniLivello: dataContenuto.versioniLivello,
        proveCompetenza: dataContenuto.proveCompetenza,
        grigliaValutazione: dataContenuto.grigliaValutazione,
      },
      theme: data.payload.theme,
      block: data.payload.block,
      corsoId: data.payload.corsoId,
      corsoIscritti: dataContenuto.corsoIscritti,
    }));
  } catch (error) {
    yield put(classeDettaglioFeedbackSet(
      true,
      'error',
      'I dati non possono essere caricati',
    ));
  }

  yield put(classeDettaglioSpinnerSet(false));
}


/**
 * Effettua il fetch dei dati richiesti nelle singole tab
 * viene richiamata quando faccio lo switch da una tab all'altra
 * o quando faccio l'inizializzazione del progetto
 * @param {Object} data
 * @param {Object} data.payload
 * @param {Number} data.payload.corsoId pk del corso
 * @param {String} data.payload.block nome del blocco attivo
 * @param {String} data.payload.corsoIscritti array con gli iscritti del corso
 * @param {String} data.payload.historyPush funzione di history.push
 * @param {Object} data.payload.theme tema caricato
 * @param {String} data.payload.theme.brand brand del tema
 * @param {Object} data.payload.data dati degli elementi precaricati
 * @param {Object} data.payload.data.obiettivi dati degli obiettivi
 * @param {Object} data.payload.data.proveCompetenza dati delle prove competenza
 * @param {Object} data.payload.data.versioniLivello dati delle versioni di livello
 * @param {Object} data.payload.data.versioniMissione dati delle versioni di missioni
 * @param {Object} data.payload.data.verificheLivello dati delle verifiche di livello
 * @param {Object} data.payload.data.grigliaValutazione dati griglia di valutazione
 * @param {Object} data.payload.data.proveCompetenza dati prove per competenza
 */
export function* classeDettaglioDataFetchSaga(data) {
  yield put(classeDettaglioFeedbackReset());
  yield put(classeDettaglioSpinnerSet(true));

  const bloccoCaricato = data.payload.data[data.payload.block] || { isLoaded: false };
  const dataContenuto = {};

  const urlData = {
    versioniLivello: [
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_VERSIONI_LIVELLO_FETCH}${data.payload.corsoId}`,
    ],
    versioniMissione: [
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_VERSIONI_MISSIONE_FETCH}${data.payload.corsoId}`,
    ],
    verificheLivello: [
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_VERIFICHE_LIVELLO_FETCH}${data.payload.corsoId}`,
    ],
    grigliaValutazione: [
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_FETCH}${data.payload.corsoId}`,
    ],
    proveCompetenza: [
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_PROVE_COMPETENZA_FETCH}${data.payload.corsoId}`,
    ],
    obiettivi: [
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_OBIETTIVI_FETCH}${data.payload.corsoId}`,
    ],
  }[data.payload.block];

  const displayData = {
    field: 'nameSortable',
    block: data.payload.block,
    type: 'string',
    sort: 'asc',
  };

  /**
   * Se sono nella griglia di valutazione non visualizzo
   * i singoli studenti ma l'elenco delle valutazioni,
   * quindi non può essere display su nameSortable
   */
  if (data.payload.block === 'grigliaValutazione') {
    displayData.field = 'titolo';
  }

  try {
    const { actions: { help, okay }, ui: { darkBg } } = colore;
    const { check, crono, minus } = buttonicon;
    let response = {};
    if (bloccoCaricato.isLoaded) {
      dataContenuto[data.payload.block] = bloccoCaricato;
    } else if (urlData) {
      response = yield call(axios.get, ...urlData);

      switch (data.payload.block) {
        case 'proveCompetenza':
          dataContenuto.proveCompetenza = {
            data: calcolaDataStudente(
              response.data, { brand: data.payload.theme.brand }
            ),
            isLoaded: true,
          };
          break;

        case 'versioniMissione':
          dataContenuto.versioniMissione = {
            data: calcolaDataStudente(
              response.data, { brand: data.payload.theme.brand }
            ),
            isLoaded: true,
          };
          break;

        case 'versioniLivello':
          dataContenuto.versioniLivello = {
            data: calcolaDataStudente(
              response.data, { brand: data.payload.theme.brand }
            ),
            isLoaded: true,
          };
          break;

        case 'verificheLivello':
          dataContenuto.verificheLivello = {
            data: calcolaDataStudente(
              response.data, { brand: data.payload.theme.brand }
            ),
            isLoaded: true,
          };
          break;

        case 'obiettivi':
          dataContenuto.obiettivi = {
            data: {
              unita: {},
              iscrittiData: {},
            },
            isLoaded: true,
          };

          dataContenuto.obiettivi.data.unita = response.data.assegnazioni
            .reduce((acc, item) => {
              acc.pks.push(item.id);
              acc.assegnate[item.id] = {
                nome: item.nome,
              };

              return acc;
            }, { assegnate: {}, pks: [] });

          dataContenuto.obiettivi.data.iscrittiData = data.payload.corsoIscritti.reduce((acc, u) => {
            acc[u.studenteAcademyId] = (response.data.esecuzioni[u.studenteAcademyId] || [])
              // ogni item è formato un array con: [pkUnita, isCompletata]
              .reduce((acc2, item) => {
                if (item[1]) {
                  acc2.completate.push(item[0]);
                } else {
                  acc2.inCorso.push(item[0]);
                }

                return acc2;
              }, { inCorso: [], completate: [] });

            acc[u.studenteAcademyId].nonIniziate = dataContenuto.obiettivi.data.unita.pks
              .filter((unitaAssegnata) => ([
                ...acc[u.studenteAcademyId].inCorso,
                ...acc[u.studenteAcademyId].completate,
              ].indexOf(unitaAssegnata) === -1));

            acc[u.studenteAcademyId].percentualeErrate = round(
              response.data.percentuali_errate[u.studenteAcademyId] || 0, 0
            );
            return acc;
          }, {});
          break;

        case 'grigliaValutazione':
          dataContenuto.grigliaValutazione = {
            data: response.data.map((valutazione) => ({
              key: valutazione.id,
              id: valutazione.id,
              titolo: valutazione.titolo,
              tipo: valutazione.tipo,
              dataCreazione: new Date(valutazione.data_creazione)
                .toISOString().split('T')[0].split('-').reverse().join('/'),
              dataCreazioneSortable: valutazione.data_creazione,
              eliminaValutazione: ' ',
            })),
            isLoaded: true,
          };
          break;

        /* istanbul ignore next */ default: break;
      }
    }

    let sortedData = [];
    switch (data.payload.block) {
      case 'versioniMissione':
        sortedData = calcolaDatiStudente(
          data.payload.corsoIscritti,
          dataContenuto.versioniMissione.data
        );
        break;

      case 'proveCompetenza':
        sortedData = calcolaDatiStudente(
          data.payload.corsoIscritti,
          dataContenuto.proveCompetenza.data
        );
        break;

      case 'versioniLivello':
        sortedData = calcolaDatiStudente(
          data.payload.corsoIscritti,
          dataContenuto.versioniLivello.data
        );
        break;

      case 'verificheLivello':
        sortedData = calcolaDatiStudente(
          data.payload.corsoIscritti,
          dataContenuto.verificheLivello.data
        );
        break;

      case 'obiettivi':
        sortedData = data.payload.corsoIscritti.map((u) => {
          const uData = dataContenuto.obiettivi.data.iscrittiData[u.studenteAcademyId] || /* istanbul ignore next */ {
            inCorso: [],
            completate: [],
            nonIniziate: [],
          };
          const unita = dataContenuto.obiettivi.data.unita;

          return {
            ...u,
            key: u.studenteAcademyId,
            percentualeErrate: uData.percentualeErrate,
            inCorso: uData.inCorso.length,
            completate: uData.completate.length,
            nonIniziate: uData.nonIniziate.length,
            detailData: {
              titolo: u.name,
              sottoTitolo: u.email,
              sortedData: unita.pks.map((k) => {
                const stato = [
                  uData.completate.indexOf(k) > -1 && 'completata',
                  uData.inCorso.indexOf(k) > -1 && 'inCorso',
                  uData.nonIniziate.indexOf(k) > -1 && 'nonIniziata',
                ].filter((d) => (d)).join('');

                const statoDisplay = {
                  completata: <Icon {...check} fill={okay} />,
                  inCorso: <Icon {...crono} fill={help} />,
                  nonIniziata: <Icon {...minus} fill={darkBg} />,
                }[stato];

                return {
                  titolo: unita.assegnate[k].nome,
                  stato,
                  statoDisplay,
                };
              }),
              field: 'titolo',
              sort: 'asc',
              type: 'string',
              intestazioniColonna: [{
                label: 'Titolo',
                field: 'titolo',
                type: 'string',
                style: {
                  justifyContent: 'space-between',
                },
                fieldsDisplay: [{ field: 'titolo' }],
              }, {
                label: 'Stato',
                field: 'stato',
                type: 'string',
                fieldsDisplay: [{ field: 'statoDisplay' }],
              }],
            },
          };
        });
        break;

      case 'grigliaValutazione':
        sortedData = dataContenuto.grigliaValutazione.data;
        break;

      /* istanbul ignore next */ default: break;
    }

    const orderedData = sortDataBySpecs(sortedData, displayData);

    yield put(classeDettaglioContenutoSet({
      ...dataContenuto,
      sortedData: orderedData,
    }));
    yield put(classeDettaglioDisplaySet(displayData));

    if (data.payload.historyPush) {
      yield call(
        data.payload.historyPush,
        `/classe-dettaglio/${data.payload.corsoId}/${data.payload.block.toLowerCase()}`
      );
    }
  } catch (error) {
    yield put(classeDettaglioFeedbackSet(
      true,
      'error',
      'I dati relativi alla sezione selezionata non possono essere caricati',
    ));
  }
  yield put(classeDettaglioSpinnerSet(false));
}


/**
 * Esegue l'espulsione di uno studente da un corso
 * @param {object} data oggetto con i dati della chiamata
 * @param {object} data.payload.studente dati dello studente academy
 * @param {number} data.payload.studente.id id dello studente
 * @param {string} data.payload.studente.nome nome dello studente
 * @param {object} data.payload.corso dati del corso
 * @param {String} data.payload.block
 * @param {number} data.payload.corso.id id del corso
 * @param {string} data.payload.corso.nome nome del corso
 * @param {object} data.payload.configuration configurazione
 */
export function* classeDettaglioEspelliStudente(data) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${CLASSE_DETTAGLIO_URL_ESPELLI.replace('{CORSO_ID}', data.payload.corso.id)}`, {
        studenteacademy: data.payload.studente.id,
      }
    );

    if (response.status === 200) {
      yield put(classeDettaglioCorsoFetch({
        corsoId: data.payload.corso.id,
        disciplinaId: data.payload.configuration.disciplinaId,
        block: data.payload.block,
      }));
    } else {
      yield put(modalSetData({
        titolo: 'Impossibile eseguire questa espulsione',
        contenuto: `Non ho potuto espellere lo studente <strong>${data.payload.studente.nome}</strong> dal corso <strong>${data.payload.corso.nome}</strong>`,
        closeButton: {
          text: 'Ok',
        },
        show: true,
      }));
    }
  } catch (error) {
    yield put(modalSetData({
      titolo: 'Impossibile eseguire questa espulsione',
      contenuto: `Non ho potuto espellere lo studente <strong>${data.payload.studente.nome}</strong> dal corso <strong>${data.payload.corso.nome}</strong>`,
      closeButton: {
        text: 'Ok',
      },
      show: true,
    }));
  }
}

export function* watchClasseDettaglio() {
  yield takeEvery(CLASSE_DETTAGLIO_DISPLAY_SORT, classeDettaglioSortSaga);
  yield takeEvery(CLASSE_DETTAGLIO_DATA_FETCH, classeDettaglioDataFetchSaga);
  yield takeEvery(CLASSE_DETTAGLIO_CORSO_FETCH, classeDettaglioCorsoFetchSaga);
  yield takeEvery(CLASSE_DETTAGLIO_ESPELLI, classeDettaglioEspelliStudente);
}

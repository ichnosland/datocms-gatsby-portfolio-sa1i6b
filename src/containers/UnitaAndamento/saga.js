/*
 *
 * UnitaAndamento saga
 *
 */

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { API_BASE_PATH } from 'configuration';
import { round } from 'common/utils';
import { sortDataBySpecs } from 'common/statistiche';
import { colore } from 'style/color';

import {
  UNITA_ANDAMENTO_URL_CLASSE_FETCH,
  UNITA_ANDAMENTO_FETCH,
  UNITA_ANDAMENTO_SORT,
} from './constants';
import {
  unitaAndamentoSpinnerSet,
  unitaAndamentoFeedbackSet,
  unitaAndamentoFeedbackReset,
  unitaAndamentoContenutoSet,
  unitaAndamentoSort,
  unitaAndamentoSortSet,
} from './actions';


/**
 * Dati in input i dati da ordinare e il metodo da
 * utilizzare per ordinarli, setta un nuovo set
 * di dati ordinati
 * @param {object} data dati della funzione
 * @param {Object[]} data.payloadData dati da riordinare
 * @param {Object} data.sortingData dati relativi all'ordine
 * @param {String} data.sortingData.field nome del field
 * @param {String} data.sortingData.sort ordine di sort (asc / desc)
 * @param {String} data.sortingData.type tipo di dato da ordinare
 */
export function* unitaAndamentoSortSaga(data) {
  yield put(unitaAndamentoSpinnerSet(true));

  const sortedData = sortDataBySpecs(data.payloadData, data.sortingData);

  yield put(unitaAndamentoContenutoSet({ sortedData }));
  yield put(unitaAndamentoSortSet(data.sortingData));
  yield put(unitaAndamentoSpinnerSet(false));
}


/**
 * Scarica le statistiche delle versioni relative alla classe
 * @param {object} data dati della funzione
 * @param {number} data.corsoId ID del corso
 * @param {number} data.unitaId ID dell'unità
 * @param {string} data.payload selezione effettuata
 * @param {Object[]} data.payload.iscritti iscritti al corso
 * @param {Object} data.payload.display display rules
 * @param {Number} data.payload.display.field column index to display
 * @param {String} data.payload.display.sort sort order (asc / desc)
 * @param {String} data.payload.display.type tipologia del dato da ordinare
 * @param {Object} data.payload.theme oggetto tema
 * @param {String} data.payload.theme.brand colore brand del tema
 */
export function* unitaAndamentoFetchSaga(data) {
  yield put(unitaAndamentoFeedbackReset());
  yield put(unitaAndamentoSpinnerSet(true));

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${UNITA_ANDAMENTO_URL_CLASSE_FETCH}${data.corsoId}/${data.unitaId}`
    );

    const unitaSvolte = response.data.andamento.reduce((acc, item) => {
      acc[item.studente_academy] = {
        lezioneRaggiunta: item.lezione_raggiunta,
        completata: item.completata,
        inCorso: !item.completata && item.lezione_raggiunta > 0,
        percentualeErrori: round(item.percentuale_errate, 0),
      };
      return acc;
    }, {});

    const iscrittiData = data.payload.iscritti.map((u) => ({
      studenteAcademyId: u.studenteAcademy,
      key: u.studenteAcademy,
      xp: u.punti || 0,
      name: `${u.first_name} ${u.last_name}`,
      nameSortable: `${u.last_name} ${u.first_name}`,
      ...(unitaSvolte[u.studenteAcademy] || {
        lezioneRaggiunta: 0,
        completata: false,
        inCorso: false,
        percentualeErrori: 0,
      }),
    }));

    const conteggioAggregati = iscrittiData.reduce((acc, item) => {
      if (item.completata) {
        acc.totaleUnitaCompletate += 1;
      } else if (item.inCorso) {
        acc.totaleUnitaIniziate += 1;
      } else {
        acc.totaleUnitaNonIniziate += 1;
      }

      return acc;
    }, { totaleUnitaCompletate: 0, totaleUnitaIniziate: 0, totaleUnitaNonIniziate: 0 });

    yield put(unitaAndamentoContenutoSet({
      titolo: response.data.titolo,
      prerequisito: response.data.prerequisito,
      numeroLezioni: response.data.numero_lezioni,
      intestazioniColonna: [{
        label: 'Studente',
        field: 'nameSortable',
        type: 'string',
        style: {
          justifyContent: 'space-between',
        },
        fieldsDisplay: [{ field: 'name' }],
      }, {
        label: 'Lezione',
        field: 'lezioneRaggiunta',
        type: 'number',
        fieldsDisplay: [
          { field: 'lezioneRaggiunta' },
          { field: 'stato' },
        ],
      }, {
        label: '%',
        field: 'percentualeErrori',
        type: 'number',
        style: {
          color: colore.actions.error,
        },
        fieldsDisplay: [{ field: 'percentualeErrori' }],
      }, {
        label: 'XP',
        field: 'xp',
        type: 'number',
        fieldsDisplay: [{ field: 'xp' }],
        style: {
          color: data.payload.theme.brand,
        },
      }],
      ...conteggioAggregati,
    }));

    yield put(unitaAndamentoSort(
      iscrittiData,
      data.payload.display
    ));
  } catch (error) {
    yield put(unitaAndamentoFeedbackSet(
      true,
      'error',
      'Le statistiche di andamento di questa unità non possono essere caricate'
    ));
  }
  yield put(unitaAndamentoSpinnerSet(false));
}

export function* watchUnitaAndamento() {
  yield takeEvery(UNITA_ANDAMENTO_FETCH, unitaAndamentoFetchSaga);
  yield takeEvery(UNITA_ANDAMENTO_SORT, unitaAndamentoSortSaga);
}

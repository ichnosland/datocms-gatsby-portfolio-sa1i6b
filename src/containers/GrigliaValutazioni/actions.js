/*
 *
 * GrigliaValutazioni actions
 *
 */

import {
  GRIGLIA_VALUTAZIONI_SPINNER_SET,
  GRIGLIA_VALUTAZIONI_FEEDBACK_SET,
  GRIGLIA_VALUTAZIONI_FEEDBACK_RESET,
  GRIGLIA_VALUTAZIONI_DISPLAY_SET,
  GRIGLIA_VALUTAZIONI_CONTENUTO_SET,
  GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH,
  GRIGLIA_VALUTAZIONI_VALUTABILI_SET,
  GRIGLIA_VALUTAZIONI_VALUTABILI_RESET,
  GRIGLIA_VALUTAZIONI_VALUTABILI_SORT,
  GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET,
  GRIGLIA_VALUTAZIONI_SELECTION_SET,
  GRIGLIA_VALUTAZIONI_SELECTION_RESET,
  GRIGLIA_VALUTAZIONI_CREA,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_SET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_RESET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_SET,
  GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_RESET,
  GRIGLIA_VALUTAZIONI_RESET,
  CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA,
} from './constants';


export const grigliaValutazioneSpinnerSet = (value, key = 'default') => ({
  type: GRIGLIA_VALUTAZIONI_SPINNER_SET,
  value,
  key,
});

export const grigliaValutazioneFeedbackSet = (hasFeedback, tipologia, messaggio) => ({
  type: GRIGLIA_VALUTAZIONI_FEEDBACK_SET,
  hasFeedback,
  tipologia,
  messaggio,
});

export const grigliaValutazioneFeedbackReset = () => ({
  type: GRIGLIA_VALUTAZIONI_FEEDBACK_RESET,
});

export const grigliaValutazioneValutabiliFetch = (corsoId, progetto, payload) => ({
  type: GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH,
  corsoId,
  progetto,
  payload,
});

export const grigliaValutazioneValutabiliSet = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_VALUTABILI_SET,
  payload,
});

export const grigliaValutazioneValutabiliReset = () => ({
  type: GRIGLIA_VALUTAZIONI_VALUTABILI_RESET,
});

export const grigliaValutazioneValutabiliSort = (payloadData, sortingData) => ({
  type: GRIGLIA_VALUTAZIONI_VALUTABILI_SORT,
  payloadData,
  sortingData,
});

export const grigliaValutazioneValutabiliBloccoSet = (blocco, valutabili) => ({
  type: GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET,
  blocco,
  valutabili,
});

export const grigliaValutazioneDisplaySet = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_DISPLAY_SET,
  payload,
});

export const grigliaValutazioneContenutoSet = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_CONTENUTO_SET,
  payload,
});

export const grigliaValutazioneSelectionSet = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_SELECTION_SET,
  payload,
});

export const grigliaValutazioneSelectionReset = () => ({
  type: GRIGLIA_VALUTAZIONI_SELECTION_RESET,
});

export const grigliaValutazioneCrea = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_CREA,
  payload,
});

export const grigliaValutazioneDettaglioFetch = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH,
  payload,
});

export const grigliaValutazioneDettaglioSet = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_DETTAGLIO_SET,
  payload,
});

export const grigliaValutazioneDettaglioReset = () => ({
  type: GRIGLIA_VALUTAZIONI_DETTAGLIO_RESET,
});

export const grigliaValutazioneDettaglioSort = (payloadData, sortingData) => ({
  type: GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT,
  payloadData,
  sortingData,
});

export const grigliaValutazioneDettaglioStudenteFetch = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH,
  payload,
});

export const grigliaValutazioneDettaglioStudenteSet = (payload) => ({
  type: GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_SET,
  payload,
});

export const grigliaValutazioneDettaglioStudenteReset = () => ({
  type: GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_RESET,
});

export const grigliaValutazioneReset = () => ({
  type: GRIGLIA_VALUTAZIONI_RESET,
});

export const grigliaValutazioniElimina = (payload) => ({
  type: CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA,
  payload,
});

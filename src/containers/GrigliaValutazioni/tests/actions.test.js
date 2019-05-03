
import {
  grigliaValutazioneSpinnerSet,
  grigliaValutazioneFeedbackSet,
  grigliaValutazioneFeedbackReset,
  grigliaValutazioneValutabiliFetch,
  grigliaValutazioneValutabiliSet,
  grigliaValutazioneValutabiliReset,
  grigliaValutazioneValutabiliSort,
  grigliaValutazioneValutabiliBloccoSet,
  grigliaValutazioneDisplaySet,
  grigliaValutazioneContenutoSet,
  grigliaValutazioneSelectionSet,
  grigliaValutazioneSelectionReset,
  grigliaValutazioneCrea,
  grigliaValutazioneDettaglioFetch,
  grigliaValutazioneDettaglioSet,
  grigliaValutazioneDettaglioReset,
  grigliaValutazioneDettaglioSort,
  grigliaValutazioneDettaglioStudenteFetch,
  grigliaValutazioniElimina,
  grigliaValutazioneReset,
  grigliaValutazioneDettaglioStudenteSet,
  grigliaValutazioneDettaglioStudenteReset,
} from '../actions';
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
  CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA,
  GRIGLIA_VALUTAZIONI_RESET,
} from '../constants';

describe('GrigliaValutazioni actions', () => {
  it('GRIGLIA_VALUTAZIONI_SPINNER_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_SPINNER_SET,
      value: true,
      key: 'key',
    };
    expect(grigliaValutazioneSpinnerSet(true, 'key')).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_SPINNER_SET with default values', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_SPINNER_SET,
      value: true,
      key: 'default',
    };
    expect(grigliaValutazioneSpinnerSet(true)).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_FEEDBACK_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_FEEDBACK_SET,
      hasFeedback: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(grigliaValutazioneFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_FEEDBACK_RESET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_FEEDBACK_RESET,
    };
    expect(grigliaValutazioneFeedbackReset()).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_VALUTABILI_FETCH,
      corsoId: 1,
      progetto: 'progetto',
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneValutabiliFetch(1, 'progetto', { data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_VALUTABILI_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_VALUTABILI_SET,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneValutabiliSet({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_VALUTABILI_RESET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_VALUTABILI_RESET,
    };
    expect(grigliaValutazioneValutabiliReset()).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_VALUTABILI_SORT', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_VALUTABILI_SORT,
      payloadData: { data: 'payloadData' },
      sortingData: { data: 'sortingData' },
    };
    expect(grigliaValutazioneValutabiliSort({ data: 'payloadData' }, { data: 'sortingData' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_VALUTABILI_BLOCCO_SET,
      blocco: 'blocco',
      valutabili: { data: 'valutabili' },
    };
    expect(grigliaValutazioneValutabiliBloccoSet('blocco', { data: 'valutabili' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DISPLAY_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DISPLAY_SET,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneDisplaySet({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_CONTENUTO_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_CONTENUTO_SET,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneContenutoSet({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_SELECTION_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_SELECTION_SET,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneSelectionSet({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_SELECTION_RESET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_SELECTION_RESET,
    };
    expect(grigliaValutazioneSelectionReset()).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_CREA', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_CREA,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneCrea({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DETTAGLIO_FETCH,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneDettaglioFetch({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DETTAGLIO_SET,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneDettaglioSet({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_RESET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DETTAGLIO_RESET,
    };
    expect(grigliaValutazioneDettaglioReset()).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DETTAGLIO_SORT,
      payloadData: { data: 'payloadData' },
      sortingData: { data: 'sortingData' },
    };
    expect(grigliaValutazioneDettaglioSort({ data: 'payloadData' }, { data: 'sortingData' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_FETCH,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneDettaglioStudenteFetch({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_SET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_SET,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioneDettaglioStudenteSet({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_RESET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_RESET,
    };
    expect(grigliaValutazioneDettaglioStudenteReset()).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_URL_GRIGLIA_VALUTAZIONE_ELIMINA,
      payload: { data: 'payload' },
    };
    expect(grigliaValutazioniElimina({ data: 'payload' })).toEqual(expected);
  });

  it('GRIGLIA_VALUTAZIONI_RESET', () => {
    const expected = {
      type: GRIGLIA_VALUTAZIONI_RESET,
    };
    expect(grigliaValutazioneReset()).toEqual(expected);
  });
});

import {
  CLASSE_DETTAGLIO_ESPELLI,
  CLASSE_DETTAGLIO_RESET,
  CLASSE_DETTAGLIO_DATA_FETCH,
  CLASSE_DETTAGLIO_CORSO_FETCH,
  CLASSE_DETTAGLIO_CONTENUTO_SET,
  CLASSE_DETTAGLIO_DISPLAY_SET,
  CLASSE_DETTAGLIO_DISPLAY_SORT,
  CLASSE_DETTAGLIO_FEEDBACK_SET,
  CLASSE_DETTAGLIO_FEEDBACK_RESET,
  CLASSE_DETTAGLIO_SPINNER_SET,
} from '../constants';
import {
  classeDettaglioEspelli,
  classeDettaglioReset,
  classeDettaglioCorsoFetch,
  classeDettaglioDataFetch,
  classeDettaglioContenutoSet,
  classeDettaglioDisplaySort,
  classeDettaglioDisplaySet,
  classeDettaglioFeedbackSet,
  classeDettaglioFeedbackReset,
  classeDettaglioSpinnerSet,
} from '../actions';

describe('ClasseDettaglio actions', () => {
  it('CLASSE_DETTAGLIO_ESPELLI', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_ESPELLI,
      payload: { data: 123 },
    };
    expect(classeDettaglioEspelli({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_RESET', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_RESET,
    };
    expect(classeDettaglioReset()).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_DATA_FETCH', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_DATA_FETCH,
      payload: { data: 123 },
    };
    expect(classeDettaglioDataFetch({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_CORSO_FETCH', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_CORSO_FETCH,
      payload: { data: 123 },
    };
    expect(classeDettaglioCorsoFetch({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_CONTENUTO_SET', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_CONTENUTO_SET,
      payload: { data: 123 },
    };
    expect(classeDettaglioContenutoSet({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_DISPLAY_SET', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_DISPLAY_SET,
      payload: { data: 123 },
    };
    expect(classeDettaglioDisplaySet({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_DISPLAY_SORT', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_DISPLAY_SORT,
      payloadData: [1, 2, 3],
      sortingData: { data: 4 },
    };
    expect(classeDettaglioDisplaySort([1, 2, 3], { data: 4 })).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_FEEDBACK_SET', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_FEEDBACK_SET,
      hasFeedback: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(classeDettaglioFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_FEEDBACK_RESET', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_FEEDBACK_RESET,
    };
    expect(classeDettaglioFeedbackReset({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_DETTAGLIO_SPINNER_SET', () => {
    const expected = {
      type: CLASSE_DETTAGLIO_SPINNER_SET,
      enable: true,
    };
    expect(classeDettaglioSpinnerSet(true)).toEqual(expected);
  });
});

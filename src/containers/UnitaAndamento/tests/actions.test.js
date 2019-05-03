
import {
  unitaAndamentoReset,
  unitaAndamentoFetch,
  unitaAndamentoSpinnerSet,
  unitaAndamentoFeedbackSet,
  unitaAndamentoFeedbackReset,
  unitaAndamentoContenutoSet,
  unitaAndamentoSort,
  unitaAndamentoSortSet,
} from '../actions';
import {
  UNITA_ANDAMENTO_RESET,
  UNITA_ANDAMENTO_FETCH,
  UNITA_ANDAMENTO_SPINNER_SET,
  UNITA_ANDAMENTO_FEEDBACK_SET,
  UNITA_ANDAMENTO_FEEDBACK_RESET,
  UNITA_ANDAMENTO_CONTENUTO_SET,
  UNITA_ANDAMENTO_SORT,
  UNITA_ANDAMENTO_SORT_SET,
} from '../constants';

describe('UnitaAndamento actions', () => {
  it('UNITA_ANDAMENTO_RESET', () => {
    const expected = {
      type: UNITA_ANDAMENTO_RESET,
    };
    expect(unitaAndamentoReset()).toEqual(expected);
  });

  it('UNITA_ANDAMENTO_FETCH', () => {
    const expected = {
      type: UNITA_ANDAMENTO_FETCH,
      unitaId: 100,
      corsoId: 200,
      payload: { data: 300 },
    };
    expect(unitaAndamentoFetch(100, 200, { data: 300 })).toEqual(expected);
  });

  it('UNITA_ANDAMENTO_SPINNER_SET', () => {
    const expected = {
      type: UNITA_ANDAMENTO_SPINNER_SET,
      enable: true,
    };
    expect(unitaAndamentoSpinnerSet(true)).toEqual(expected);
  });
  
  it('UNITA_ANDAMENTO_FEEDBACK_SET', () => {
    const expected = {
      type: UNITA_ANDAMENTO_FEEDBACK_SET,
      hasFeedback: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(unitaAndamentoFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('UNITA_ANDAMENTO_FEEDBACK_RESET', () => {
    const expected = {
      type: UNITA_ANDAMENTO_FEEDBACK_RESET,
    };
    expect(unitaAndamentoFeedbackReset()).toEqual(expected);
  });

  it('UNITA_ANDAMENTO_CONTENUTO_SET', () => {
    const expected = {
      type: UNITA_ANDAMENTO_CONTENUTO_SET,
      payload: { data: 300 },
    };
    expect(unitaAndamentoContenutoSet({ data: 300 })).toEqual(expected);
  });

  it('UNITA_ANDAMENTO_SORT', () => {
    const expected = {
      type: UNITA_ANDAMENTO_SORT,
      payloadData: { data: 500 },
      sortingData: { data: 600 },
    };
    expect(unitaAndamentoSort({ data: 500 }, { data: 600 })).toEqual(expected);
  });

  it('UNITA_ANDAMENTO_SORT_SET', () => {
    const expected = {
      type: UNITA_ANDAMENTO_SORT_SET,
      payload: { data: 700 },
    };
    expect(unitaAndamentoSortSet({ data: 700 })).toEqual(expected);
  });
});

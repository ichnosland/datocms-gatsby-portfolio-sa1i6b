
import { fromJS } from 'immutable';

import unitaAndamentoReducer, {
  defaultUnitaAndamentoFeedback,
  defaultUnitaAndamentoContenuto,
  defaultUnitaAndamentoAndamentoSort,
} from '../reducer';
import {
  unitaAndamentoReset,
  unitaAndamentoSpinnerSet,
  unitaAndamentoFeedbackSet,
  unitaAndamentoFeedbackReset,
  unitaAndamentoContenutoSet,
  unitaAndamentoSortSet,
} from '../actions';

const mockPopulatedState = fromJS({
  spinner: fromJS(true),
  feedback: fromJS({
    hasFeedback: true,
    tipologia: 'tipologia',
    messaggio: 'messaggio',
  }),
  contenuto: fromJS({
    titolo: 'Titolo',
    numeroLezioni: 10,
    prerequisito: 1110,
    sortedData: [{ data1: 'value2', data2: 333 }],
    totaleUnitaCompletate: 0,
    totaleUnitaIniziate: 0,
    totaleUnitaNonIniziate: 0,
    intestazioniColonna: [{
      label: 'Intestazione 1',
      field: 'data1',
      type: 'string',
      fieldsDisplay: [{ field: 'data1' }],
    }, {
      label: 'Intestazione 2',
      field: 'data2',
      type: 'number',
      fieldsDisplay: [{ field: 'data2' }],
    }],
  }),
  display: fromJS({
    field: 'data2',
    sort: 'asc',
    type: 'string',
  }),
});

describe('unitaAndamentoReducer', () => {
  it('stato iniziale', () => {
    expect(unitaAndamentoReducer(undefined, {})).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaAndamentoFeedback,
      contenuto: defaultUnitaAndamentoContenuto,
      display: defaultUnitaAndamentoAndamentoSort,
    }));
  });

  it('UNITA_ANDAMENTO_RESET', () => {
    expect(unitaAndamentoReducer(mockPopulatedState, unitaAndamentoReset())).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaAndamentoFeedback,
      contenuto: defaultUnitaAndamentoContenuto,
      display: defaultUnitaAndamentoAndamentoSort,
    }));
  });

  it('UNITA_ANDAMENTO_SPINNER_SET', () => {
    expect(unitaAndamentoReducer(undefined, unitaAndamentoSpinnerSet(false))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultUnitaAndamentoFeedback,
      contenuto: defaultUnitaAndamentoContenuto,
      display: defaultUnitaAndamentoAndamentoSort,
    }));
  });

  it('UNITA_ANDAMENTO_FEEDBACK_SET', () => {
    expect(
      unitaAndamentoReducer(undefined, unitaAndamentoFeedbackSet(true, 'tipologia', 'messaggio'))
    ).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaAndamentoFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      contenuto: defaultUnitaAndamentoContenuto,
      display: defaultUnitaAndamentoAndamentoSort,
    }));
  });

  it('UNITA_ANDAMENTO_FEEDBACK_RESET', () => {
    expect(unitaAndamentoReducer(mockPopulatedState, unitaAndamentoFeedbackReset())).toEqual(
      mockPopulatedState.merge({
        feedback: defaultUnitaAndamentoFeedback,
      })
    );
  });

  it('UNITA_ANDAMENTO_CONTENUTO_SET', () => {
    const mockDataToSet = {
      titolo: 'Titolo',
      numeroLezioni: 10,
      prerequisito: 1110,
      sortedData: [{ data1: 'value2', data2: 333 }],
      totaleUnitaCompletate: 0,
      totaleUnitaIniziate: 0,
      totaleUnitaNonIniziate: 0,
      intestazioniColonna: [{
        label: 'Intestazione 1',
        field: 'data1',
        type: 'string',
        fieldsDisplay: [{ field: 'data1' }],
      }, {
        label: 'Intestazione 2',
        field: 'data2',
        type: 'number',
        fieldsDisplay: [{ field: 'data2' }],
      }],
    };
    expect(
      unitaAndamentoReducer(undefined, unitaAndamentoContenutoSet(mockDataToSet))
    ).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaAndamentoFeedback,
      contenuto: defaultUnitaAndamentoContenuto.merge(mockDataToSet),
      display: defaultUnitaAndamentoAndamentoSort,
    }));
  });

  it('UNITA_ANDAMENTO_SORT_SET', () => {
    const mockDataToSet = {
      field: 'data4',
      sort: 'desc',
      type: 'number',
    };
    expect(
      unitaAndamentoReducer(undefined, unitaAndamentoSortSet(mockDataToSet))
    ).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaAndamentoFeedback,
      contenuto: defaultUnitaAndamentoContenuto,
      display: defaultUnitaAndamentoAndamentoSort.merge(mockDataToSet),
    }));
  });
});

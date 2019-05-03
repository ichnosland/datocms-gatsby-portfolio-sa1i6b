import {
  livelliFetch,
  livelliFetchError,
  livelliSet,
  spinnerSet,
  unitaFiltra,
  livelliReset,
  dashboardMenuEggSet,
  dashboardSearchActiveSet,
} from '../actions';
import {
  DASHBOARD_LIVELLI_FETCH,
  DASHBOARD_LIVELLI_SET,
  DASHBOARD_LIVELLI_FETCH_ERROR,
  DASHBOARD_SPINNER_SET,
  DASHBOARD_UNITA_FILTRA,
  DASHBOARD_LIVELLI_RESET,
  DASHBOARD_MENUEGG_SET,
  DASHBOARD_SEARCHACTIVE_SET,
} from '../constants';

describe('Actions', () => {
  it('check livelliFetch output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_LIVELLI_FETCH,
      configuration: { data: 123 },
      isDocente: true,
      corsoId: 456,
    };
    expect(livelliFetch({ data: 123 }, true, 456)).toEqual(expectedAction);
  });

  it('check livelliFetch output is correct with defaults', () => {
    const expectedAction = {
      type: DASHBOARD_LIVELLI_FETCH,
      configuration: { data: 123 },
      isDocente: false,
      corsoId: undefined,
    };
    expect(livelliFetch({ data: 123 })).toEqual(expectedAction);
  });

  it('check livelliSet output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_LIVELLI_SET,
      payload: { data: 'payload' },
    };
    expect(livelliSet(
      { data: 'payload' }
    )).toEqual(expectedAction);
  });

  it('check livelliFetchError output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_LIVELLI_FETCH_ERROR,
      message: 'Custom message',
    };
    expect(
      livelliFetchError('Custom message')
    ).toEqual(expectedAction);
  });

  it('check spinnerSet output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_SPINNER_SET,
      payload: { data: 'payload' },
    };
    expect(spinnerSet(
      { data: 'payload' }
    )).toEqual(expectedAction);
  });

  it('check unitaFiltra output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_UNITA_FILTRA,
      filtro: 'keyword',
    };
    expect(
      unitaFiltra('keyword')
    ).toEqual(expectedAction);
  });

  it('check livelliReset output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_LIVELLI_RESET,
    };
    expect(livelliReset()).toEqual(expectedAction);
  });

  it('check dashboardMenuEggSet output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_MENUEGG_SET,
      value: true,
    };
    expect(dashboardMenuEggSet(true)).toEqual(expectedAction);
  });

  it('check dashboardSearchActiveSet output is correct', () => {
    const expectedAction = {
      type: DASHBOARD_SEARCHACTIVE_SET,
      value: true,
    };
    expect(dashboardSearchActiveSet(true)).toEqual(expectedAction);
  });
});

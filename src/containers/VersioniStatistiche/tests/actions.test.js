
import {
  versioniStatisticheDataFetch,
  versioniStatisticheDataSet,
  versioniStatisticheSpinnerSet,
  versioniStatisticheDataReset,
  versioniStatisticheFeedbackSet,
  versioniStatisticheFeedbackReset,
  versioniStatisticheDataSelect,
  versioniStatisticheDidascaliaSet,
  versioniStatisticheDidascaliaReset,
} from '../actions';
import {
  VERSIONI_STATISTICHE_DATA_FETCH,
  VERSIONI_STATISTICHE_DATA_SET,
  VERSIONI_STATISTICHE_DATA_RESET,
  VERSIONI_STATISTICHE_SPINNER_SET,
  VERSIONI_STATISTICHE_FEEDBACK_SET,
  VERSIONI_STATISTICHE_FEEDBACK_RESET,
  VERSIONI_STATISTICHE_DATA_SELECT,
  VERSIONI_STATISTICHE_DIDASCALIA_SET,
  VERSIONI_STATISTICHE_DIDASCALIA_RESET,
} from '../constants';

describe('VersioniStatistiche actions', () => {
  it('controllo che VERSIONI_STATISTICHE_DATA_FETCH si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_DATA_FETCH,
      payload: { data: 123 },
    };
    expect(versioniStatisticheDataFetch({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_DATA_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_DATA_SET,
      payload: { data: 123 },
    };
    expect(versioniStatisticheDataSet(
      { data: 123 }
    )).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_DATA_SELECT si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_DATA_SELECT,
      payload: { data: 123 },
    };
    expect(versioniStatisticheDataSelect({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_SPINNER_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_SPINNER_SET,
      enabled: true,
    };
    expect(versioniStatisticheSpinnerSet(true)).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_DATA_RESET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_DATA_RESET,
    };
    expect(versioniStatisticheDataReset()).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_FEEDBACK_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_FEEDBACK_SET,
      enabled: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(versioniStatisticheFeedbackSet(
      true, 'tipologia', 'messaggio'
    )).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_FEEDBACK_RESET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_FEEDBACK_RESET,
    };
    expect(versioniStatisticheFeedbackReset()).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_DIDASCALIA_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_DIDASCALIA_SET,
      payload: { data: 123 },
    };
    expect(versioniStatisticheDidascaliaSet({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERSIONI_STATISTICHE_DIDASCALIA_RESET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_STATISTICHE_DIDASCALIA_RESET,
    };
    expect(versioniStatisticheDidascaliaReset()).toEqual(expected);
  });
});


import {
  versioniLivelloStatisticheDataFetch,
  versioniLivelloStatisticheDataSet,
  versioniLivelloStatisticheSpinnerSet,
  versioniLivelloStatisticheDataReset,
  versioniLivelloStatisticheFeedbackSet,
  versioniLivelloStatisticheFeedbackReset,
  versioniLivelloStatisticheDataSelect,
  versioniLivelloStatisticheDidascaliaSet,
  versioniLivelloStatisticheDidascaliaReset,
} from '../actions';
import {
  VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH,
  VERSIONI_LIVELLO_STATISTICHE_DATA_SET,
  VERSIONI_LIVELLO_STATISTICHE_DATA_RESET,
  VERSIONI_LIVELLO_STATISTICHE_SPINNER_SET,
  VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_SET,
  VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_RESET,
  VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT,
  VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
} from '../constants';

describe('VersioniLivelloStatistiche actions', () => {
  it('controllo che VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_DATA_FETCH,
      payload: { data: 123 },
    };
    expect(versioniLivelloStatisticheDataFetch({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_DATA_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_DATA_SET,
      payload: { data: 123 },
    };
    expect(versioniLivelloStatisticheDataSet(
      { data: 123 }
    )).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_DATA_SELECT,
      payload: { data: 123 },
    };
    expect(versioniLivelloStatisticheDataSelect({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_SPINNER_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_SPINNER_SET,
      enabled: true,
    };
    expect(versioniLivelloStatisticheSpinnerSet(true)).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_DATA_RESET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_DATA_RESET,
    };
    expect(versioniLivelloStatisticheDataReset()).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_SET,
      enabled: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(versioniLivelloStatisticheFeedbackSet(
      true, 'tipologia', 'messaggio'
    )).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_RESET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_FEEDBACK_RESET,
    };
    expect(versioniLivelloStatisticheFeedbackReset()).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_SET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_SET,
      payload: { data: 123 },
    };
    expect(versioniLivelloStatisticheDidascaliaSet({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_RESET si comporti come atteso', () => {
    const expected = {
      type: VERSIONI_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
    };
    expect(versioniLivelloStatisticheDidascaliaReset()).toEqual(expected);
  });
});

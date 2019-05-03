
import {
  provaCompetenzaStatisticheDataFetch,
  provaCompetenzaStatisticheDataSet,
  provaCompetenzaStatisticheDataSelect,
  provaCompetenzaStatisticheSpinnerSet,
  provaCompetenzaStatisticheDataReset,
  provaCompetenzaStatisticheFeedbackSet,
  provaCompetenzaStatisticheFeedbackReset,
  provaCompetenzaDidascaliaSet,
  provaCompetenzaDidascaliaReset,
} from '../actions';
import {
  PROVA_COMPETENZA_STATISTICHE_DATA_FETCH,
  PROVA_COMPETENZA_STATISTICHE_DATA_SET,
  PROVA_COMPETENZA_STATISTICHE_DATA_SELECT,
  PROVA_COMPETENZA_STATISTICHE_DATA_RESET,
  PROVA_COMPETENZA_STATISTICHE_SPINNER_SET,
  PROVA_COMPETENZA_STATISTICHE_FEEDBACK_SET,
  PROVA_COMPETENZA_STATISTICHE_FEEDBACK_RESET,
  PROVA_COMPETENZA_DIDASCALIA_SET,
  PROVA_COMPETENZA_DIDASCALIA_RESET,
} from '../constants';

describe('ProvaCompetenzaStatistiche actions', () => {
  it('controllo che PROVA_COMPETENZA_STATISTICHE_DATA_FETCH si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_STATISTICHE_DATA_FETCH,
      payload: { data: 123 },
    };
    expect(provaCompetenzaStatisticheDataFetch({ data: 123 })).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_STATISTICHE_DATA_SET si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_STATISTICHE_DATA_SET,
      payload: { data: 123 },
    };
    expect(provaCompetenzaStatisticheDataSet({ data: 123 })).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_STATISTICHE_DATA_SELECT si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_STATISTICHE_DATA_SELECT,
      payload: { data: 123 },
    };
    expect(provaCompetenzaStatisticheDataSelect({ data: 123 })).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_STATISTICHE_SPINNER_SET si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_STATISTICHE_SPINNER_SET,
      enabled: true,
    };
    expect(provaCompetenzaStatisticheSpinnerSet(true)).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_STATISTICHE_DATA_RESET si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_STATISTICHE_DATA_RESET,
    };
    expect(provaCompetenzaStatisticheDataReset()).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_STATISTICHE_FEEDBACK_SET si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_STATISTICHE_FEEDBACK_SET,
      enabled: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(provaCompetenzaStatisticheFeedbackSet(
      true, 'tipologia', 'messaggio'
    )).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_STATISTICHE_FEEDBACK_RESET si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_STATISTICHE_FEEDBACK_RESET,
    };
    expect(provaCompetenzaStatisticheFeedbackReset()).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_DIDASCALIA_SET si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_DIDASCALIA_SET,
      payload: { data: 123 },
    };
    expect(provaCompetenzaDidascaliaSet({ data: 123 })).toEqual(expected);
  });

  it('controllo che PROVA_COMPETENZA_DIDASCALIA_RESET si comporti come atteso', () => {
    const expected = {
      type: PROVA_COMPETENZA_DIDASCALIA_RESET,
    };
    expect(provaCompetenzaDidascaliaReset()).toEqual(expected);
  });
});

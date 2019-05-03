
import {
  verificaLivelloStatisticheDataFetch,
  verificaLivelloStatisticheDataSet,
  verificaLivelloStatisticheSpinnerSet,
  verificaLivelloStatisticheDataReset,
  verificaLivelloStatisticheFeedbackSet,
  verificaLivelloStatisticheFeedbackReset,
  verificaLivelloStatisticheDataSelect,
  verificaLivelloStatisticheDidascaliaSet,
  verificaLivelloStatisticheDidascaliaReset,
} from '../actions';
import {
  VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH,
  VERIFICA_LIVELLO_STATISTICHE_DATA_SET,
  VERIFICA_LIVELLO_STATISTICHE_DATA_RESET,
  VERIFICA_LIVELLO_STATISTICHE_SPINNER_SET,
  VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_SET,
  VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_RESET,
  VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT,
  VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_SET,
  VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
} from '../constants';

describe('VerificaLivelloStatistiche actions', () => {
  it('controllo che VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_DATA_FETCH,
      payload: { data: 123 },
    };
    expect(verificaLivelloStatisticheDataFetch({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_DATA_SET si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_DATA_SET,
      payload: { data: 123 },
    };
    expect(verificaLivelloStatisticheDataSet(
      { data: 123 }
    )).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_DATA_SELECT,
      payload: { data: 123 },
    };
    expect(verificaLivelloStatisticheDataSelect({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_SPINNER_SET si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_SPINNER_SET,
      enabled: true,
    };
    expect(verificaLivelloStatisticheSpinnerSet(true)).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_DATA_RESET si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_DATA_RESET,
    };
    expect(verificaLivelloStatisticheDataReset()).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_SET si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_SET,
      enabled: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(verificaLivelloStatisticheFeedbackSet(
      true, 'tipologia', 'messaggio'
    )).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_RESET si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_FEEDBACK_RESET,
    };
    expect(verificaLivelloStatisticheFeedbackReset()).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_SET si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_SET,
      payload: { data: 123 },
    };
    expect(verificaLivelloStatisticheDidascaliaSet({ data: 123 })).toEqual(expected);
  });

  it('controllo che VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_RESET si comporti come atteso', () => {
    const expected = {
      type: VERIFICA_LIVELLO_STATISTICHE_DIDASCALIA_RESET,
    };
    expect(verificaLivelloStatisticheDidascaliaReset()).toEqual(expected);
  });
});

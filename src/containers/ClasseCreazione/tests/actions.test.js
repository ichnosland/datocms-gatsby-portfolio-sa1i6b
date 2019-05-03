import {
  CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH,
  CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET,
  CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH,
  CLASSE_CREAZIONE_GEO_SET,
  CLASSE_CREAZIONE_GEO_COMUNI_FETCH,
  CLASSE_CREAZIONE_GEO_COMUNI_SET,
  CLASSE_CREAZIONE_DATA_SET,
  CLASSE_CREAZIONE_DATA_POST,
  CLASSE_CREAZIONE_RESET,
  CLASSE_CREAZIONE_SPINNER_SET,
  CLASSE_CREAZIONE_FEEDBACK_SET,
  CLASSE_CREAZIONE_FEEDBACK_RESET,
  CLASSE_CREAZIONE_GEO_SCUOLE_SET,
} from '../constants';
import {
  classeCreazioneScuoleAttiveFetch,
  classeCreazioneScuoleAttiveSet,
  classeCreazioneGeoProvinciaFetch,
  classeCreazioneGeoSet,
  classeCreazioneGeoComuneFetch,
  classeCreazioneGeoComuneSet,
  classeCreazioneGeoScuoleSet,
  classeCreazioneDataSet,
  classeCreazioneDataPost,
  classeCreazioneReset,
  classeCreazioneSpinnerSet,
  classeCreazioneFeedbackSet,
  classeCreazioneFeedbackReset,
} from '../actions';

describe('ClasseCreazione actions', () => {
  it('CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH', () => {
    const expected = {
      type: CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH,
    };
    expect(classeCreazioneScuoleAttiveFetch()).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET,
      payload: { data: 123 },
    };
    expect(classeCreazioneScuoleAttiveSet({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH', () => {
    const expected = {
      type: CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH,
    };
    expect(classeCreazioneGeoProvinciaFetch()).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_GEO_SET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_GEO_SET,
      payload: { data: 123 },
    };
    expect(classeCreazioneGeoSet({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_GEO_COMUNI_FETCH', () => {
    const expected = {
      type: CLASSE_CREAZIONE_GEO_COMUNI_FETCH,
      sigla: 'TO',
    };
    expect(classeCreazioneGeoComuneFetch('TO')).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_GEO_COMUNI_SET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_GEO_COMUNI_SET,
      payload: { data: 123 },
    };
    expect(classeCreazioneGeoComuneSet({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_GEO_SCUOLE_SET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_GEO_SCUOLE_SET,
      payload: { data: 123 },
    };
    expect(classeCreazioneGeoScuoleSet({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_DATA_SET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_DATA_SET,
      payload: { data: 123 },
    };
    expect(classeCreazioneDataSet({ data: 123 })).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_DATA_POST', () => {
    const expected = {
      type: CLASSE_CREAZIONE_DATA_POST,
      payload: { data: 123 },
      history: { history: true },
    };
    expect(classeCreazioneDataPost({ data: 123 }, { history: true })).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_RESET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_RESET,
    };
    expect(classeCreazioneReset()).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_SPINNER_SET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_SPINNER_SET,
      enable: true,
    };
    expect(classeCreazioneSpinnerSet(true)).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_FEEDBACK_SET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(
      classeCreazioneFeedbackSet(true, 'tipologia', 'messaggio')
    ).toEqual(expected);
  });

  it('CLASSE_CREAZIONE_FEEDBACK_RESET', () => {
    const expected = {
      type: CLASSE_CREAZIONE_FEEDBACK_RESET,
    };
    expect(classeCreazioneFeedbackReset()).toEqual(expected);
  });
});


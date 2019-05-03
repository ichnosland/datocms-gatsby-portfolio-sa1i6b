import * as actions from '../actions';
import * as types from '../constants';

describe('Corsi actions', () => {
  it('check lezioneDataFetch output is correct', () => {
    const expected = {
      type: types.LEZIONE_DATA_FETCH,
      idLezione: 123,
    };
    expect(actions.lezioneDataFetch(123)).toEqual(expected);
  });

  it('check lezioneDataSet output is correct', () => {
    const expected = {
      type: types.LEZIONE_DATA_SET,
      payload: { data: 123 },
    };
    expect(actions.lezioneDataSet({ data: 123 })).toEqual(expected);
  });

  it('check lezioneDataReset output is correct', () => {
    const expected = {
      type: types.LEZIONE_DATA_RESET,
    };
    expect(actions.lezioneDataReset()).toEqual(expected);
  });

  it('check lezioneErrorReset output is correct', () => {
    const expected = {
      type: types.LEZIONE_ERROR_RESET,
    };
    expect(actions.lezioneErrorReset()).toEqual(expected);
  });

  it('check lezioneErrorSet output is correct', () => {
    const expected = {
      type: types.LEZIONE_ERROR_SET,
      enable: true,
      message: 'messaggio',
      errorData: { data: 123 },
    };
    expect(actions.lezioneErrorSet(
      true, 'messaggio', { data: 123 }
    )).toEqual(expected);
  });

  it('check lezioneErrorSet output is correct', () => {
    const expected = {
      type: types.LEZIONE_ERROR_SET,
      enable: true,
      message: '',
      errorData: {},
    };
    expect(actions.lezioneErrorSet()).toEqual(expected);
  });

  it('check lezioneSpinnerSet output is correct', () => {
    const expected = {
      type: types.LEZIONE_SPINNER_SET,
      enable: true,
    };
    expect(actions.lezioneSpinnerSet(true)).toEqual(expected);
  });
});

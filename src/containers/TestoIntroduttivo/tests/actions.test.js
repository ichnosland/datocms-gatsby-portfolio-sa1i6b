import * as actions from '../actions';
import * as types from '../constants';

describe('Corsi actions', () => {
  it('check testoIntroduttivoDataFetch output is correct', () => {
    const expected = {
      type: types.TESTOINTRODUTTIVO_DATA_FETCH,
      idTestoIntroduttivo: 123,
    };
    expect(actions.testoIntroduttivoDataFetch(123)).toEqual(expected);
  });

  it('check testoIntroduttivoDataSet output is correct', () => {
    const expected = {
      type: types.TESTOINTRODUTTIVO_DATA_SET,
      payload: { data: 123 },
    };
    expect(actions.testoIntroduttivoDataSet({ data: 123 })).toEqual(expected);
  });

  it('check testoIntroduttivoDataReset output is correct', () => {
    const expected = {
      type: types.TESTOINTRODUTTIVO_DATA_RESET,
    };
    expect(actions.testoIntroduttivoDataReset()).toEqual(expected);
  });

  it('check testoIntroduttivoErrorReset output is correct', () => {
    const expected = {
      type: types.TESTOINTRODUTTIVO_ERROR_RESET,
    };
    expect(actions.testoIntroduttivoErrorReset()).toEqual(expected);
  });

  it('check testoIntroduttivoErrorSet output is correct', () => {
    const expected = {
      type: types.TESTOINTRODUTTIVO_ERROR_SET,
      enable: true,
      message: 'messaggio',
      errorData: { data: 123 },
    };
    expect(actions.testoIntroduttivoErrorSet(
      true, 'messaggio', { data: 123 }
    )).toEqual(expected);
  });

  it('check testoIntroduttivoErrorSet output is correct', () => {
    const expected = {
      type: types.TESTOINTRODUTTIVO_ERROR_SET,
      enable: true,
      message: '',
      errorData: {},
    };
    expect(actions.testoIntroduttivoErrorSet()).toEqual(expected);
  });

  it('check testoIntroduttivoSpinnerSet output is correct', () => {
    const expected = {
      type: types.TESTOINTRODUTTIVO_SPINNER_SET,
      enable: true,
    };
    expect(actions.testoIntroduttivoSpinnerSet(true)).toEqual(expected);
  });
});

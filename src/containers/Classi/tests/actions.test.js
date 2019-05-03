import * as actions from '../actions';
import * as types from '../constants';

describe('Classi actions', () => {
  it('check classiDataFetch output is correct', () => {
    const expected = {
      type: types.CLASSI_DATA_FETCH,
      idDisciplina: 21,
    };
    expect(actions.classiDataFetch(21)).toEqual(expected);
  });

  it('check classiDataSet output is correct', () => {
    const expected = {
      type: types.CLASSI_DATA_SET,
      payload: { data: 21 },
    };
    expect(actions.classiDataSet({ data: 21 })).toEqual(expected);
  });

  it('check classiDataReset output is correct', () => {
    const expected = {
      type: types.CLASSI_DATA_RESET,
    };
    expect(actions.classiDataReset()).toEqual(expected);
  });

  it('check classiFeedbackReset output is correct', () => {
    const expected = {
      type: types.CLASSI_FEEDBACK_RESET,
    };
    expect(actions.classiFeedbackReset()).toEqual(expected);
  });

  it('check classiFeedbackSet output is correct', () => {
    const expected = {
      type: types.CLASSI_FEEDBACK_SET,
      enable: true,
      message: 'messaggio',
      errorData: { data: 21 },
    };
    expect(actions.classiFeedbackSet(
      true, 'messaggio', { data: 21 }
    )).toEqual(expected);
  });

  it('check classiFeedbackSet output is correct', () => {
    const expected = {
      type: types.CLASSI_FEEDBACK_SET,
      enable: true,
      message: '',
      errorData: {},
    };
    expect(actions.classiFeedbackSet()).toEqual(expected);
  });

  it('check classiSpinnerSet output is correct', () => {
    const expected = {
      type: types.CLASSI_SPINNER_SET,
      enable: true,
    };
    expect(actions.classiSpinnerSet(true)).toEqual(expected);
  });
});

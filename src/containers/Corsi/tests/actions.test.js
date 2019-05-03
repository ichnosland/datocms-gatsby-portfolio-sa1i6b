import * as actions from '../actions';
import * as types from '../constants';

describe('Corsi actions', () => {
  it('check corsiReset output is correct', () => {
    const expected = {
      type: types.CORSI_RESET,
    };
    expect(actions.corsiReset()).toEqual(expected);
  });

  it('check corsiListDocenteFetch output is correct', () => {
    const expected = {
      type: types.CORSI_LIST_DOCENTE_FETCH,
      idDisciplina: 1234,
    };
    expect(actions.corsiListDocenteFetch(1234)).toEqual(expected);
  });

  it('check corsiListStudenteFetch output is correct', () => {
    const expected = {
      type: types.CORSI_LIST_STUDENTE_FETCH,
      idDisciplina: 1234,
    };
    expect(actions.corsiListStudenteFetch(1234)).toEqual(expected);
  });

  it('check corsiErrorSet output is correct when no params are set', () => {
    const expected = {
      type: types.CORSI_ERROR_SET,
      enable: true,
      message: 'messaggio',
      errorData: { data: 123 },
    };
    expect(actions.corsiErrorSet(
      true,
      'messaggio',
      { data: 123 }
    )).toEqual(expected);
  });

  it('check corsiErrorSet output is correct when no params are set', () => {
    const expected = {
      type: types.CORSI_ERROR_SET,
      enable: true,
      message: '',
      errorData: {},
    };
    expect(actions.corsiErrorSet()).toEqual(expected);
  });

  it('check corsiListInitialize output is correct when no params are set', () => {
    const expected = {
      type: types.CORSI_LIST_INITIALIZE,
      configuration: { data: 123 },
      isDocente: 456,
    };
    expect(actions.corsiListInitialize({ data: 123 }, 456)).toEqual(expected);
  });

  it('check corsiListSet output is correct', () => {
    const expected = {
      type: types.CORSI_LIST_SET,
      payload: {
        data: { id: 123, obj: {} },
      },
    };
    expect(
      actions.corsiListSet(expected.payload)
    ).toEqual(expected);
  });

  it('check corsiErrorSet output is correct', () => {
    const expected = {
      type: types.CORSI_ERROR_SET,
      enable: true,
      message: 'message',
      errorData: { data: 123 },
    };
    expect(
      actions.corsiErrorSet(true, expected.message, { data: 123 })
    ).toEqual(expected);
  });
});

import { fromJS } from 'immutable';

import corsiReducer, {
  defaultCorsiList,
  defaultcorsoSelezionato,
  defaultCorsiError,
} from '../reducer';
import * as actions from '../actions';


describe('corsiReducer reducer', () => {
  const constMockCorso = fromJS({
    spinner: false,
    corsiAttivi: defaultCorsiList,
    corsoSelezionato: defaultcorsoSelezionato,
    error: defaultCorsiError,
  });

  it('should return the initial state when no state is provided', () => {
    expect(
      corsiReducer(undefined, { type: undefined })
    ).toEqual(constMockCorso);
  });

  it('should return the initial state when CORSI_ERROR_SET action is provided', () => {
    expect(
      corsiReducer(undefined, actions.corsiErrorSet(true, 'Errore'))
    ).toEqual(constMockCorso.merge({
      error: {
        hasErrors: true,
        errorMessage: 'Errore',
        errorData: {},
      },
    }));
  });

  it('should return the initial state when CORSI_SPINNER_SET action is provided', () => {
    expect(
      corsiReducer(undefined, actions.corsiSpinnerSet(true))
    ).toEqual(constMockCorso.merge({
      spinner: true,
    }));
  });

  it('should return the initial state when CORSI_CORSO_DETAIL_DOCENTE_SET action is provided', () => {
    expect(
      corsiReducer(undefined, actions.corsiCorsoDetailDocenteSet({ iscritti: [1, 2, 3], pk: 123, nome: 'nome' }))
    ).toEqual(constMockCorso.merge({
      corsoSelezionato: {
        isCorsoLoaded: false,
        isIscrittiLoaded: false,
        pk: 123,
        nome: 'nome',
        iscritti: [1, 2, 3],
      },
    }));
  });

  it('should return the initial state when CORSI_ERROR_RESET action is provided', () => {
    expect(
      corsiReducer(constMockCorso.merge({
        error: {
          hasErrors: true,
          errorMessage: 'Errore',
          errorData: { data: 123 },
        },
      }), actions.corsiErrorReset())
    ).toEqual(constMockCorso);
  });

  it('should return the initial state when CORSI_RESET action is provided', () => {
    expect(
      corsiReducer(constMockCorso.merge({
        corsiAttivi: {
          items: [1, 2, 3],
          isCorsiLoaded: true,
        },
        corsoSelezionato: {
          isCorsoLoaded: true,
          pk: 123,
          data: { data: 123 },
        },
      }), actions.corsiReset())
    ).toEqual(constMockCorso);
  });

  it('should return state after CORSI_LIST_SET action is triggered', () => {
    expect(
      corsiReducer(constMockCorso, actions.corsiListSet({
        items: [1, 2, 3],
        isCorsiLoaded: true,
      }))
    ).toEqual(constMockCorso.merge({
      corsiAttivi: {
        items: [1, 2, 3],
        isCorsiLoaded: true,
      },
    }));
  });

  it('should return state after CORSI_LIST_DOCENTE_FETCH action is triggered', () => {
    expect(
      corsiReducer(constMockCorso, actions.corsiListDocenteFetch(123))
    ).toEqual(constMockCorso);
  });

  it('should return state after CORSI_LIST_STUDENTE_FETCH action is triggered', () => {
    expect(
      corsiReducer(constMockCorso, actions.corsiListStudenteFetch(123))
    ).toEqual(constMockCorso);
  });
});


/*
 *
 * CreaVerifiche reducer test
 *
 */
import { fromJS } from 'immutable';

import creaVerificheReducer, { defaultMytestUnita } from '../reducer';
import {
  creaverificheVerificaEserciziFetch,
  creaverificheVerificaEserciziSet,
  creaverificheVerificaEserciziSpinnerSet,
  creaverificheVerificaPostError,
  creaverificheVerificaEserciziFetchError,
  creaverificheVerificaSet,
  creaverificheVerificaRiepilogoView,
  creaverificheVerificaEsercizioAdd,
  creaverificheVerificaEsercizioRemove,
} from '../actions';

describe('creaVerificheReducer reducer', () => {
  const stateMock = {
    spinner: false,
    steps: [1, 2, 3],
    titoloUnita: 'Titolo unità',
    titoloMissione: 'Titolo Missione',
    titoloLivello: 'Titolo Livello',
    messaggioErrore: '',
  };

  it('should return the initial state', () => {
    expect(
      creaVerificheReducer(undefined, { type: undefined })
    ).toEqual(defaultMytestUnita);
  });

  it('should return combined state after CREA_VERIFICHE_FETCH action is triggered', () => {
    expect(
      creaVerificheReducer(stateMock, creaverificheVerificaEserciziFetch({ prerequisito: 123 }))
    ).toEqual(stateMock);
  });

  it('should return combined state after CREA_VERIFICHE_SET action is triggered', () => {
    expect(
      creaVerificheReducer(fromJS({}), creaverificheVerificaEserciziSet(stateMock))
    ).toEqual(fromJS(stateMock));
  });

  it('should return combined state after SPINNER_SET action is triggered', () => {
    expect(
      creaVerificheReducer(undefined, creaverificheVerificaEserciziSpinnerSet(false))
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      spinner: false,
    }));
  });

  it('should return combined state after CREA_VERIFICHE_POST_ERROR action is triggered', () => {
    expect(
      creaVerificheReducer(undefined, creaverificheVerificaPostError())
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      messaggioErrore: 'Impossibile inviare i dati',
    }));
  });

  it('should return combined state after CREA_VERIFICHE_FETCH_ERROR action is triggered', () => {
    expect(
      creaVerificheReducer(undefined, creaverificheVerificaEserciziFetchError())
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      messaggioErrore: 'Impossibile caricare l\'elenco degli esercizi disponibili',
    }));
  });

  it('should return combined state after CREA_VERIFICHE_VERIFICA_SET action is triggered', () => {
    expect(
      creaVerificheReducer(undefined, creaverificheVerificaSet({
        data: 123,
      }))
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      verifica: {
        ...defaultMytestUnita.toJS().verifica,
        data: 123,
      },
    }));
  });

  it('should return combined state after CREA_VERIFICHE_VERIFICA_RIEPILOGO_VIEW action is triggered', () => {
    expect(
      creaVerificheReducer(undefined, creaverificheVerificaRiepilogoView(true))
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      verifica: {
        ...defaultMytestUnita.toJS().verifica,
      },
    }));
  });

  it('should return combined state after CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD action is triggered', () => {
    expect(
      creaVerificheReducer(undefined, creaverificheVerificaEsercizioAdd(
        { idEsercizio: 100, idsElementi: [1001, 1002], key: '100_1001.1002' }
      ))
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      verifica: {
        ...defaultMytestUnita.toJS().verifica,
        eserciziSelezionati: [fromJS({
          idEsercizio: 100,
          idsElementi: [1001, 1002],
          key: '100_1001.1002',
        })],
      },
    }));
  });

  it('should return combined state after CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD action not adding twice the same elements', () => {
    const addElement = {
      idEsercizio: 100,
      idsElementi: [1001, 1002],
      key: '100_1001.1002',
    };
    expect(
      creaVerificheReducer(fromJS({
        ...defaultMytestUnita.toJS(),
        verifica: {
          ...defaultMytestUnita.toJS().verifica,
          eserciziSelezionati: [addElement],
        },
      }), creaverificheVerificaEsercizioAdd(
        { idEsercizio: 100, idsElementi: [1001, 1002], key: '100_1001.1002' }
      ))
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      verifica: {
        ...defaultMytestUnita.toJS().verifica,
        eserciziSelezionati: [fromJS(addElement)],
      },
    }));
  });

  it('should return combined state after CREA_VERIFICHE_VERIFICA_ESERCIZIO_REMOVE action is triggered', () => {
    expect(
      creaVerificheReducer(fromJS({
        ...defaultMytestUnita.toJS(),
        verifica: {
          ...defaultMytestUnita.toJS().verifica,
          eserciziSelezionati: [{
            idEsercizio: 100,
            idsElementi: [1001, 1002],
            key: '100_1001.1002',
          }],
        },
      }), creaverificheVerificaEsercizioRemove(
        { idEsercizio: 100, idsElementi: [1001, 1002], key: '100_1001.1002' }
      ))
    ).toEqual(fromJS({
      ...defaultMytestUnita.toJS(),
      verifica: {
        ...defaultMytestUnita.toJS().verifica,
        eserciziSelezionati: [],
      },
    }));
  });
});

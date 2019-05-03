/*
 *
 * CreaVerifiche actions tests
 *
 */

import {
  creaverificheVerificaEserciziFetch,
  creaverificheVerificaEserciziFetchError,
  creaverificheVerificaEsercizioPreviewFetch,
  creaverificheVerificaEsercizioPreviewFetchError,
  creaverificheVerificaEserciziSet,
  creaverificheVerificaEserciziSpinnerSet,
  creaverificheVerificaPost,
  creaverificheVerificaPostError,
  creaverificheVerificaEsercizioAdd,
  creaverificheVerificaEsercizioRemove,
  creaverificheVerificaRiepilogoView,
  creaverificheVerificaSet,
} from '../actions';
import {
  CREA_VERIFICHE_FETCH,
  CREA_VERIFICHE_FETCH_ERROR,
  CREA_VERIFICHE_SET,
  CREA_VERIFICHE_SPINNER_SET,
  CREA_VERIFICHE_POST,
  CREA_VERIFICHE_POST_ERROR,
  CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD,
  CREA_VERIFICHE_VERIFICA_ESERCIZIO_REMOVE,
  CREA_VERIFICHE_VERIFICA_RIEPILOGO_VIEW,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH,
  CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH_ERROR,
  CREA_VERIFICHE_VERIFICA_SET,
} from '../constants';

describe('CreaVerifiche Actions', () => {
  it('check creaverificheVerificaPost output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_POST,
      payload: {
        data: 123,
      },
    };
    expect(
      creaverificheVerificaPost(expectedAction.payload)
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerificaPostError output is correct when no message is provided', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_POST_ERROR,
      messaggio: 'Impossibile inviare i dati',
    };
    expect(
      creaverificheVerificaPostError()
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerificaPostError output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_POST_ERROR,
      messaggio: 'Impossibile inviare i dati. Riprovare più tardi',
    };
    expect(
      creaverificheVerificaPostError(expectedAction.messaggio)
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerificaEserciziFetch output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_FETCH,
      prerequisito: 123,
    };
    expect(creaverificheVerificaEserciziFetch(expectedAction.prerequisito)).toEqual(expectedAction);
  });

  it('check creaverificheVerificaEserciziFetchError output is correct with default message', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_FETCH_ERROR,
    };
    expect(creaverificheVerificaEserciziFetchError()).toEqual({
      ...expectedAction,
      messaggio: 'Impossibile caricare l\'elenco degli esercizi disponibili',
    });
  });

  it('check creaverificheVerificaEserciziFetchError output is correct with custom message', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_FETCH_ERROR,
    };
    expect(creaverificheVerificaEserciziFetchError('Nuovo messaggio')).toEqual({
      ...expectedAction,
      messaggio: 'Nuovo messaggio',
    });
  });

  it('check creaverificheVerificaEsercizioPreviewFetch output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH,
      esercizioId: 123,
    };
    expect(creaverificheVerificaEsercizioPreviewFetch(expectedAction.esercizioId)).toEqual(expectedAction);
  });

  it('check creaverificheVerificaEsercizioPreviewFetchError output is correct with default message', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH_ERROR,
    };
    expect(creaverificheVerificaEsercizioPreviewFetchError()).toEqual({
      ...expectedAction,
      messaggio: 'Impossibile caricare l\'elenco degli step per questo esercizio',
    });
  });

  it('check creaverificheVerificaEsercizioPreviewFetchError output is correct with custom message', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_PREVIEW_ESERCIZIO_FETCH_ERROR,
    };
    expect(creaverificheVerificaEsercizioPreviewFetchError('Nuovo messaggio')).toEqual({
      ...expectedAction,
      messaggio: 'Nuovo messaggio',
    });
  });

  it('check creaverificheVerificaEserciziSet output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_SET,
      payload: {
        data: [1, 2, 3],
      },
    };
    expect(
      creaverificheVerificaEserciziSet(expectedAction.payload)
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerificaEserciziSpinnerSet output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_SPINNER_SET,
      enabled: true,
    };
    expect(
      creaverificheVerificaEserciziSpinnerSet(expectedAction.enabled)
    ).toEqual(expectedAction);
  });
  it('check creaverificheVerificaEsercizioAdd output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_VERIFICA_ESERCIZIO_ADD,
      step: {
        idEsercizio: 100,
        idsElementi: [4, 5, 6],
      },
    };
    expect(
      creaverificheVerificaEsercizioAdd(
        expectedAction.step
      )
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerificaEsercizioRemove output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_VERIFICA_ESERCIZIO_REMOVE,
      step: {
        idEsercizio: 100,
        idsElementi: [4, 5, 6],
      },
    };
    expect(
      creaverificheVerificaEsercizioRemove(
        expectedAction.step
      )
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerificaRiepilogoView output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_VERIFICA_RIEPILOGO_VIEW,
      enabled: true,
    };
    expect(
      creaverificheVerificaRiepilogoView(true)
    ).toEqual(expectedAction);
  });

  it('check creaverificheVerificaSet output is correct', () => {
    const expectedAction = {
      type: CREA_VERIFICHE_VERIFICA_SET,
      payload: { data: 123 },
    };
    expect(
      creaverificheVerificaSet(expectedAction.payload)
    ).toEqual(expectedAction);
  });
});

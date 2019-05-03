
import {
  sbloccaCodiceSbloccaPost,
  sbloccaCodiceSpinnerSet,
  sbloccaCodiceFeedbackSet,
  sbloccaCodiceFeedbackReset,
  sbloccaCodiceAcquistaSet,
  sbloccaCodiceAcquistaReset,
  sbloccaCodiceAcquistaFetch,
  sbloccaCodiceAcquistaPost,
} from '../actions';
import {
  SBLOCCACODICE_SBLOCCA_POST,
  SBLOCCACODICE_SPINNER_SET,
  SBLOCCACODICE_FEEDBACK_SET,
  SBLOCCACODICE_FEEDBACK_RESET,
  SBLOCCACODICE_ACQUISTA_SET,
  SBLOCCACODICE_ACQUISTA_RESET,
  SBLOCCACODICE_ACQUISTA_FETCH,
  SBLOCCACODICE_ACQUISTA_POST,
} from '../constants';

describe('SbloccaCodice actions', () => {
  it('check sbloccaCodiceSbloccaPost output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_SBLOCCA_POST,
      codice: '123',
      configuration: { data: 456 },
    };
    expect(sbloccaCodiceSbloccaPost('123', { data: 456 })).toEqual(expectedAction);
  });

  it('check sbloccaCodiceSpinnerSet output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_SPINNER_SET,
      enable: true,
    };
    expect(sbloccaCodiceSpinnerSet(true)).toEqual(expectedAction);
  });

  it('check sbloccaCodiceFeedbackSet output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(sbloccaCodiceFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expectedAction);
  });

  it('check sbloccaCodiceAcquistaReset output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_FEEDBACK_RESET,
    };
    expect(sbloccaCodiceFeedbackReset()).toEqual(expectedAction);
  });

  it('check sbloccaCodiceAcquistaSet output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_ACQUISTA_SET,
      payload: { data: 123 },
    };
    expect(sbloccaCodiceAcquistaSet({ data: 123 })).toEqual(expectedAction);
  });

  it('check sbloccaCodiceAcquistaReset output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_ACQUISTA_RESET,
    };
    expect(sbloccaCodiceAcquistaReset()).toEqual(expectedAction);
  });

  it('check sbloccaCodiceAcquistaFetch output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_ACQUISTA_FETCH,
      disciplina: 123,
    };
    expect(sbloccaCodiceAcquistaFetch(123)).toEqual(expectedAction);
  });

  it('check sbloccaCodiceAcquistaPost output is correct', () => {
    const expectedAction = {
      type: SBLOCCACODICE_ACQUISTA_POST,
      paypalId: 1,
      orderData: 2,
      configuration: { data: 123 },
      ticketData: {
        first_name: 'nome',
        last_name: 'cognome',
      },
    };
    expect(sbloccaCodiceAcquistaPost(1, 2, expectedAction.configuration, expectedAction.ticketData)).toEqual(expectedAction);
  });
});

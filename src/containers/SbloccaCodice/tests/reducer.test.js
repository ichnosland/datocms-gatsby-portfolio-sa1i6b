import { fromJS } from 'immutable';

import sbloccaCodiceReducer, { defaultSbloccaCodiceFeedback, defaultSbloccaCodicePaypal } from '../reducer';
import {
  sbloccaCodiceSbloccaPost,
  sbloccaCodiceSpinnerSet,
  sbloccaCodiceFeedbackSet,
  sbloccaCodiceFeedbackReset,
  sbloccaCodiceAcquistaSet,
  sbloccaCodiceAcquistaReset,
} from '../actions';

const initialReducerState = fromJS({
  spinner: false,
  feedback: defaultSbloccaCodiceFeedback,
  paypal: defaultSbloccaCodicePaypal,
});


describe('sbloccaCodiceReducer', () => {
  it('should return the initial combined state', () => {
    expect(sbloccaCodiceReducer(initialReducerState, { type: undefined })).toEqual(initialReducerState);
  });

  it('should return the initial combined state when default is empty', () => {
    expect(sbloccaCodiceReducer(fromJS({}), { type: undefined })).toEqual(initialReducerState);
  });

  it('should return combined state on SBLOCCACODICE_SBLOCCA_POST', () => {
    expect(
      sbloccaCodiceReducer(initialReducerState, sbloccaCodiceSbloccaPost('123'))
    ).toEqual(initialReducerState);
  });

  it('should return combined state on SBLOCCACODICE_SPINNER_SET', () => {
    expect(
      sbloccaCodiceReducer(initialReducerState, sbloccaCodiceSpinnerSet(true))
    ).toEqual(initialReducerState.merge({ spinner: true }));
  });

  it('should return combined state on SBLOCCACODICE_FEEDBACK_SET', () => {
    expect(
      sbloccaCodiceReducer(initialReducerState, sbloccaCodiceFeedbackSet(
        true, 'tipologia', 'messaggio'
      ))
    ).toEqual(initialReducerState.merge({
      feedback: {
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      },
    }));
  });

  it('should return combined state on SBLOCCACODICE_FEEDBACK_RESET', () => {
    expect(sbloccaCodiceReducer(
      initialReducerState.merge({
        feedback: {
          hasFeedback: true,
          tipologia: 'tipologia',
          messaggio: 'messaggio',
        },
      }),
      sbloccaCodiceFeedbackReset()
    )).toEqual(initialReducerState);
  });

  it('should return combined state on SBLOCCACODICE_ACQUISTA_SET', () => {
    expect(
      sbloccaCodiceReducer(initialReducerState, sbloccaCodiceAcquistaSet({
        prodottiDisponibili: [1, 2, 3],
        display: true,
        isLoaded: true,
      }))
    ).toEqual(initialReducerState.merge({
      paypal: {
        prodottiDisponibili: [1, 2, 3],
        display: true,
        isLoaded: true,
      },
    }));
  });

  it('should return combined state on SBLOCCACODICE_ACQUISTA_RESET', () => {
    expect(sbloccaCodiceReducer(
      initialReducerState.merge({
        paypal: {
          prodottiDisponibili: [1, 2, 3],
          display: true,
          isLoaded: true,
        },
      }),
      sbloccaCodiceAcquistaReset()
    )).toEqual(initialReducerState);
  });
});

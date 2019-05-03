
import {
  esercizioPreviewContenutoSet,
  esercizioPreviewStepSet,
  esercizioPreviewStepInitialize,
  esercizioPreviewStepNext,
  esercizioPreviewFeedbackSet,
  esercizioPreviewFeedbackReset,
  esercizioPreviewRispostaSet,
  esercizioPreviewRispostaPost,
  esercizioPreviewRispostaReset,
  esercizioPreviewSpinnerSet,
  esercizioPreviewReset,
} from '../actions';
import {
  ESERCIZIO_PREVIEW_CONTENUTO_SET,
  ESERCIZIO_PREVIEW_RESET,
  ESERCIZIO_PREVIEW_STEP_SET,
  ESERCIZIO_PREVIEW_STEP_NEXT,
  ESERCIZIO_PREVIEW_STEP_INITIALIZE,
  ESERCIZIO_PREVIEW_FEEDBACK_SET,
  ESERCIZIO_PREVIEW_FEEDBACK_RESET,
  ESERCIZIO_PREVIEW_RISPOSTA_POST,
  ESERCIZIO_PREVIEW_RISPOSTA_SET,
  ESERCIZIO_PREVIEW_RISPOSTA_RESET,
  ESERCIZIO_PREVIEW_SPINNER_SET,
} from '../constants';


describe('EsercizioPreview actions', () => {
  it('test comportamento action ESERCIZIO_PREVIEW_CONTENUTO_SET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_CONTENUTO_SET,
      payload: { data: 123 },
    };
    expect(esercizioPreviewContenutoSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_STEP_SET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_STEP_SET,
      payload: { data: 123 },
    };
    expect(esercizioPreviewStepSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_STEP_INITIALIZE', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_STEP_INITIALIZE,
      id: 333,
      parseMultimedia: true,
    };
    expect(esercizioPreviewStepInitialize(333, true)).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_STEP_NEXT', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_STEP_NEXT,
      payload: { data: 123 },
    };
    expect(esercizioPreviewStepNext({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_FEEDBACK_SET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(esercizioPreviewFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_FEEDBACK_RESET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_FEEDBACK_RESET,
    };
    expect(esercizioPreviewFeedbackReset()).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_RISPOSTA_SET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_RISPOSTA_SET,
      payload: { data: 123 },
    };
    expect(esercizioPreviewRispostaSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_RISPOSTA_POST', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_RISPOSTA_POST,
      payload: { data: 123 },
    };
    expect(esercizioPreviewRispostaPost({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_RISPOSTA_RESET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_RISPOSTA_RESET,
    };
    expect(esercizioPreviewRispostaReset()).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_SPINNER_SET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_SPINNER_SET,
      enable: true,
    };
    expect(esercizioPreviewSpinnerSet(true)).toEqual(expected);
  });

  it('test comportamento action ESERCIZIO_PREVIEW_RESET', () => {
    const expected = {
      type: ESERCIZIO_PREVIEW_RESET,
    };
    expect(esercizioPreviewReset()).toEqual(expected);
  });
});

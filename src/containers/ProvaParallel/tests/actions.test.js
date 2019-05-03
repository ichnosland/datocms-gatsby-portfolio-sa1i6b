
import {
  provaParallelOverviewFetch,
  provaParallelOverviewSet,
  provaParallelOverviewReset,
  provaParallelPreviewFetch,
  provaParallelPreviewSet,
  provaParallelPreviewReset,
  provaParallelEsecuzioneFetch,
  provaParallelEsecuzioneSet,
  provaParallelEsecuzioneReset,
  provaParallelStepSet,
  provaParallelStepReset,
  provaParallelFeedbackSet,
  provaParallelFeedbackReset,
  provaParallelRispostaSet,
  provaParallelRispostaPost,
  provaParallelRispostaReset,
  provaParallelSpinnerSet,
  provaParallelReset,
  provaParallelInviaReport,
} from '../actions';
import {
  PROVA_PARALLEL_OVERVIEW_FETCH,
  PROVA_PARALLEL_OVERVIEW_SET,
  PROVA_PARALLEL_OVERVIEW_RESET,
  PROVA_PARALLEL_PREVIEW_FETCH,
  PROVA_PARALLEL_PREVIEW_SET,
  PROVA_PARALLEL_PREVIEW_RESET,
  PROVA_PARALLEL_ESECUZIONE_FETCH,
  PROVA_PARALLEL_ESECUZIONE_SET,
  PROVA_PARALLEL_ESECUZIONE_RESET,
  PROVA_PARALLEL_RESET,
  PROVA_PARALLEL_STEP_SET,
  PROVA_PARALLEL_STEP_RESET,
  PROVA_PARALLEL_FEEDBACK_SET,
  PROVA_PARALLEL_FEEDBACK_RESET,
  PROVA_PARALLEL_RISPOSTA_POST,
  PROVA_PARALLEL_RISPOSTA_SET,
  PROVA_PARALLEL_RISPOSTA_RESET,
  PROVA_PARALLEL_SPINNER_SET,
  PROVA_PARALLEL_INVIA_REPORT,
} from '../constants';

describe('ProvaCompetenza actions', () => {
  it('test comportamento action PROVA_PARALLEL_OVERVIEW_FETCH', () => {
    const expected = {
      type: PROVA_PARALLEL_OVERVIEW_FETCH,
      id: 1200,
    };
    expect(provaParallelOverviewFetch(1200)).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_OVERVIEW_SET', () => {
    const expected = {
      type: PROVA_PARALLEL_OVERVIEW_SET,
      payload: { data: 5555 },
    };
    expect(provaParallelOverviewSet({ data: 5555 })).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_OVERVIEW_RESET con valori default', () => {
    const expected = {
      type: PROVA_PARALLEL_OVERVIEW_RESET,
    };
    expect(provaParallelOverviewReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_PREVIEW_FETCH', () => {
    const expected = {
      type: PROVA_PARALLEL_PREVIEW_FETCH,
      id: 1,
    };
    expect(provaParallelPreviewFetch(1)).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_PREVIEW_SET con valori default', () => {
    const expected = {
      type: PROVA_PARALLEL_PREVIEW_SET,
      payload: { data: 777 },
    };
    expect(provaParallelPreviewSet({ data: 777 })).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_PREVIEW_RESET', () => {
    const expected = {
      type: PROVA_PARALLEL_PREVIEW_RESET,
    };
    expect(provaParallelPreviewReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_ESECUZIONE_FETCH', () => {
    const expected = {
      type: PROVA_PARALLEL_ESECUZIONE_FETCH,
      payload: { data: 123 },
    };
    expect(provaParallelEsecuzioneFetch({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_ESECUZIONE_SET', () => {
    const expected = {
      type: PROVA_PARALLEL_ESECUZIONE_SET,
      payload: { data: 4444 },
    };
    expect(provaParallelEsecuzioneSet({ data: 4444 })).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_ESECUZIONE_RESET', () => {
    const expected = {
      type: PROVA_PARALLEL_ESECUZIONE_RESET,
    };
    expect(provaParallelEsecuzioneReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_STEP_SET', () => {
    const expected = {
      type: PROVA_PARALLEL_STEP_SET,
      payload: { data: 8888 },
    };
    expect(provaParallelStepSet({ data: 8888 })).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_STEP_RESET', () => {
    const expected = {
      type: PROVA_PARALLEL_STEP_RESET,
    };
    expect(provaParallelStepReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_FEEDBACK_SET', () => {
    const expected = {
      type: PROVA_PARALLEL_FEEDBACK_SET,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
      enable: true,
    };
    expect(provaParallelFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_FEEDBACK_RESET', () => {
    const expected = {
      type: PROVA_PARALLEL_FEEDBACK_RESET,
    };
    expect(provaParallelFeedbackReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_RISPOSTA_SET', () => {
    const expected = {
      type: PROVA_PARALLEL_RISPOSTA_SET,
      payload: { data: 444 },
    };
    expect(provaParallelRispostaSet({ data: 444 })).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_RISPOSTA_POST', () => {
    const expected = {
      type: PROVA_PARALLEL_RISPOSTA_POST,
      payload: { data: 333 },
    };
    expect(provaParallelRispostaPost({ data: 333 })).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_RISPOSTA_RESET', () => {
    const expected = {
      type: PROVA_PARALLEL_RISPOSTA_RESET,
    };
    expect(provaParallelRispostaReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_SPINNER_SET', () => {
    const expected = {
      type: PROVA_PARALLEL_SPINNER_SET,
      enable: true,
    };
    expect(provaParallelSpinnerSet(true)).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_RESET', () => {
    const expected = {
      type: PROVA_PARALLEL_RESET,
    };
    expect(provaParallelReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_PARALLEL_INVIA_REPORT', () => {
    const expected = {
      type: PROVA_PARALLEL_INVIA_REPORT,
      payload: { data: 123 },
    };
    expect(provaParallelInviaReport({ data: 123 })).toEqual(expected);
  });
});

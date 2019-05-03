
import {
  unitaContenutoSet,
  unitaContenutoFetch,
  unitaStepFetch,
  unitaStepSet,
  unitaStepInitialize,
  unitaStepReset,
  unitaStepNext,
  unitaFeedbackSet,
  unitaFeedbackReset,
  unitaRispostaSet,
  unitaRispostaPost,
  unitaRispostaReset,
  unitaSpinnerSet,
  unitaAssegna,
  unitaReset,
} from '../actions';
import {
  UNITA_CONTENUTO_FETCH,
  UNITA_CONTENUTO_SET,
  UNITA_RESET,
  UNITA_STEP_FETCH,
  UNITA_STEP_SET,
  UNITA_STEP_RESET,
  UNITA_STEP_NEXT,
  UNITA_STEP_INITIALIZE,
  UNITA_FEEDBACK_SET,
  UNITA_FEEDBACK_RESET,
  UNITA_RISPOSTA_RESET,
  UNITA_RISPOSTA_POST,
  UNITA_RISPOSTA_SET,
  UNITA_SPINNER_SET,
  UNITA_ASSEGNA_TRIGGER,
} from '../constants';

describe('Unita actions', () => {
  it('test comportamento action UNITA_CONTENUTO_SET', () => {
    const expected = {
      type: UNITA_CONTENUTO_SET,
      payload: { data: 123 },
    };
    expect(unitaContenutoSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_CONTENUTO_FETCH', () => {
    const expected = {
      type: UNITA_CONTENUTO_FETCH,
      id: 1,
      corsoId: 2,
    };
    expect(unitaContenutoFetch(1, 2)).toEqual(expected);
  });

  it('test comportamento action UNITA_CONTENUTO_FETCH con valori default', () => {
    const expected = {
      type: UNITA_CONTENUTO_FETCH,
      id: 1,
      corsoId: 0,
    };
    expect(unitaContenutoFetch(1)).toEqual(expected);
  });

  it('test comportamento action UNITA_STEP_FETCH', () => {
    const expected = {
      type: UNITA_STEP_FETCH,
      id: 1,
      isDocente: true,
    };
    expect(unitaStepFetch(1, true)).toEqual(expected);
  });

  it('test comportamento action UNITA_STEP_FETCH con valori default', () => {
    const expected = {
      type: UNITA_STEP_FETCH,
      id: 1,
      isDocente: false,
    };
    expect(unitaStepFetch(1)).toEqual(expected);
  });

  it('test comportamento action UNITA_STEP_SET', () => {
    const expected = {
      type: UNITA_STEP_SET,
      payload: { data: 123 },
    };
    expect(unitaStepSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_STEP_INITIALIZE', () => {
    const expected = {
      type: UNITA_STEP_INITIALIZE,
      payload: { data: 123 },
    };
    expect(unitaStepInitialize({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_STEP_RESET', () => {
    const expected = {
      type: UNITA_STEP_RESET,
    };
    expect(unitaStepReset()).toEqual(expected);
  });

  it('test comportamento action UNITA_STEP_NEXT', () => {
    const expected = {
      type: UNITA_STEP_NEXT,
      payload: { data: 123 },
    };
    expect(unitaStepNext({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_FEEDBACK_SET', () => {
    const expected = {
      type: UNITA_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(unitaFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('test comportamento action UNITA_FEEDBACK_RESET', () => {
    const expected = {
      type: UNITA_FEEDBACK_RESET,
    };
    expect(unitaFeedbackReset()).toEqual(expected);
  });

  it('test comportamento action UNITA_RISPOSTA_SET', () => {
    const expected = {
      type: UNITA_RISPOSTA_SET,
      payload: { data: 123 },
    };
    expect(unitaRispostaSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_RISPOSTA_POST', () => {
    const expected = {
      type: UNITA_RISPOSTA_POST,
      payload: { data: 123 },
    };
    expect(unitaRispostaPost({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_RISPOSTA_RESET', () => {
    const expected = {
      type: UNITA_RISPOSTA_RESET,
    };
    expect(unitaRispostaReset()).toEqual(expected);
  });

  it('test comportamento action UNITA_SPINNER_SET', () => {
    const expected = {
      type: UNITA_SPINNER_SET,
      enable: true,
    };
    expect(unitaSpinnerSet(true)).toEqual(expected);
  });

  it('test comportamento action UNITA_ASSEGNA_TRIGGER', () => {
    const expected = {
      type: UNITA_ASSEGNA_TRIGGER,
      id: 1,
      idCorso: 2,
    };
    expect(unitaAssegna(1, 2)).toEqual(expected);
  });

  it('test comportamento action UNITA_RESET', () => {
    const expected = {
      type: UNITA_RESET,
    };
    expect(unitaReset()).toEqual(expected);
  });
});

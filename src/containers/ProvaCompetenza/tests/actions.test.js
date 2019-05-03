
import {
  provaCompetenzaContenutoSet,
  provaCompetenzaContenutoFetch,
  provaCompetenzaStepFetch,
  provaCompetenzaStepSet,
  provaCompetenzaStepInitialize,
  provaCompetenzaStepReset,
  provaCompetenzaStepNext,
  provaCompetenzaFeedbackSet,
  provaCompetenzaFeedbackReset,
  provaCompetenzaRispostaSet,
  provaCompetenzaRispostaPost,
  provaCompetenzaRispostaReset,
  provaCompetenzaSpinnerSet,
  provaCompetenzaAssegna,
  provaCompetenzaRitira,
  provaCompetenzaReset,
  provaCompetenzaConsegna,
} from '../actions';
import {
  PROVA_COMPETENZA_CONTENUTO_FETCH,
  PROVA_COMPETENZA_CONTENUTO_SET,
  PROVA_COMPETENZA_RESET,
  PROVA_COMPETENZA_STEP_FETCH,
  PROVA_COMPETENZA_STEP_SET,
  PROVA_COMPETENZA_STEP_RESET,
  PROVA_COMPETENZA_STEP_NEXT,
  PROVA_COMPETENZA_STEP_INITIALIZE,
  PROVA_COMPETENZA_FEEDBACK_SET,
  PROVA_COMPETENZA_FEEDBACK_RESET,
  PROVA_COMPETENZA_RISPOSTA_RESET,
  PROVA_COMPETENZA_RISPOSTA_POST,
  PROVA_COMPETENZA_RISPOSTA_SET,
  PROVA_COMPETENZA_SPINNER_SET,
  PROVA_COMPETENZA_ASSEGNA_TRIGGER,
  PROVA_COMPETENZA_RITIRA_TRIGGER,
  PROVA_COMPETENZA_CONSEGNA,
} from '../constants';

describe('ProvaCompetenza actions', () => {
  it('test comportamento action PROVA_COMPETENZA_CONTENUTO_SET', () => {
    const expected = {
      type: PROVA_COMPETENZA_CONTENUTO_SET,
      payload: { data: 123 },
    };
    expect(provaCompetenzaContenutoSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_CONTENUTO_FETCH', () => {
    const expected = {
      type: PROVA_COMPETENZA_CONTENUTO_FETCH,
      id: 1,
      isDocente: true,
      corsoId: 2,
    };
    expect(provaCompetenzaContenutoFetch(1, true, 2)).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_CONTENUTO_FETCH con valori default', () => {
    const expected = {
      type: PROVA_COMPETENZA_CONTENUTO_FETCH,
      id: 1,
      isDocente: false,
      corsoId: -1,
    };
    expect(provaCompetenzaContenutoFetch(1)).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_STEP_FETCH', () => {
    const expected = {
      type: PROVA_COMPETENZA_STEP_FETCH,
      id: 1,
      isDocente: true,
    };
    expect(provaCompetenzaStepFetch(1, true)).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_STEP_FETCH con valori default', () => {
    const expected = {
      type: PROVA_COMPETENZA_STEP_FETCH,
      id: 1,
      isDocente: false,
    };
    expect(provaCompetenzaStepFetch(1)).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_STEP_SET', () => {
    const expected = {
      type: PROVA_COMPETENZA_STEP_SET,
      payload: { data: 123 },
    };
    expect(provaCompetenzaStepSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_STEP_INITIALIZE', () => {
    const expected = {
      type: PROVA_COMPETENZA_STEP_INITIALIZE,
      payload: { data: 123 },
    };
    expect(provaCompetenzaStepInitialize({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_STEP_RESET', () => {
    const expected = {
      type: PROVA_COMPETENZA_STEP_RESET,
    };
    expect(provaCompetenzaStepReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_STEP_NEXT', () => {
    const expected = {
      type: PROVA_COMPETENZA_STEP_NEXT,
      payload: { data: 123 },
    };
    expect(provaCompetenzaStepNext({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_FEEDBACK_SET', () => {
    const expected = {
      type: PROVA_COMPETENZA_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(provaCompetenzaFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_FEEDBACK_RESET', () => {
    const expected = {
      type: PROVA_COMPETENZA_FEEDBACK_RESET,
    };
    expect(provaCompetenzaFeedbackReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_RISPOSTA_SET', () => {
    const expected = {
      type: PROVA_COMPETENZA_RISPOSTA_SET,
      payload: { data: 123 },
    };
    expect(provaCompetenzaRispostaSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_RISPOSTA_POST', () => {
    const expected = {
      type: PROVA_COMPETENZA_RISPOSTA_POST,
      payload: { data: 123 },
    };
    expect(provaCompetenzaRispostaPost({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_RISPOSTA_RESET', () => {
    const expected = {
      type: PROVA_COMPETENZA_RISPOSTA_RESET,
    };
    expect(provaCompetenzaRispostaReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_SPINNER_SET', () => {
    const expected = {
      type: PROVA_COMPETENZA_SPINNER_SET,
      enable: true,
    };
    expect(provaCompetenzaSpinnerSet(true)).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_ASSEGNA_TRIGGER', () => {
    const expected = {
      type: PROVA_COMPETENZA_ASSEGNA_TRIGGER,
      id: 1,
      idCorso: 2,
    };
    expect(provaCompetenzaAssegna(1, 2)).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_RITIRA_TRIGGER', () => {
    const expected = {
      type: PROVA_COMPETENZA_RITIRA_TRIGGER,
      idAssegnazione: 1,
      idCorso: 2,
    };
    expect(provaCompetenzaRitira(1, 2)).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_RESET', () => {
    const expected = {
      type: PROVA_COMPETENZA_RESET,
    };
    expect(provaCompetenzaReset()).toEqual(expected);
  });

  it('test comportamento action PROVA_COMPETENZA_CONSEGNA', () => {
    const expected = {
      type: PROVA_COMPETENZA_CONSEGNA,
      payload: { data: 123 },
    };
    expect(provaCompetenzaConsegna({ data: 123 })).toEqual(expected);
  });
});

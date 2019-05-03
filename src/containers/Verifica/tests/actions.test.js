
import {
  verificaLivelloFetch,
  verificaLivelloSet,
  verificaLivelloReset,
  verificaLivelloSpinnerSet,
  verificaLivelloProvaTrigger,
  verificaContenutoSet,
  verificaContenutoFetch,
  verificaStepFetch,
  verificaStepSet,
  verificaStepInitialize,
  verificaStepReset,
  verificaStepNext,
  verificaFeedbackSet,
  verificaFeedbackReset,
  verificaRispostaSet,
  verificaRispostaPost,
  verificaRispostaReset,
  verificaSpinnerSet,
  verificaAssegna,
  verificaRitira,
  verificaReset,
  verificaConsegna,
} from '../actions';
import {
  VERIFICA_LIVELLO_FETCH,
  VERIFICA_LIVELLO_SET,
  VERIFICA_LIVELLO_RESET,
  VERIFICA_LIVELLO_SPINNER_SET,
  VERIFICA_LIVELLO_PROVA_TRIGGER,
  VERIFICA_CONTENUTO_FETCH,
  VERIFICA_CONTENUTO_SET,
  VERIFICA_RESET,
  VERIFICA_STEP_FETCH,
  VERIFICA_STEP_SET,
  VERIFICA_STEP_RESET,
  VERIFICA_STEP_NEXT,
  VERIFICA_STEP_INITIALIZE,
  VERIFICA_FEEDBACK_SET,
  VERIFICA_FEEDBACK_RESET,
  VERIFICA_RISPOSTA_POST,
  VERIFICA_RISPOSTA_SET,
  VERIFICA_RISPOSTA_RESET,
  VERIFICA_SPINNER_SET,
  VERIFICA_ASSEGNA_TRIGGER,
  VERIFICA_RITIRA_TRIGGER,
  VERIFICA_CONSEGNA,
} from '../constants';

describe('Verifica actions', () => {
  it('VERIFICA_LIVELLO_FETCH', () => {
    const expected = {
      type: VERIFICA_LIVELLO_FETCH,
      livelloId: 1,
      isDocente: true,
      corsoId: 3,
      idsUnita: [4, 5, 6],
      soloLatino: true,
    };
    expect(verificaLivelloFetch(1, true, 3, [4, 5, 6], true)).toEqual(expected);
  });

  it('VERIFICA_LIVELLO_FETCH con default', () => {
    const expected = {
      type: VERIFICA_LIVELLO_FETCH,
      livelloId: 1,
      isDocente: true,
      corsoId: 0,
      idsUnita: [],
      soloLatino: false,
    };
    expect(verificaLivelloFetch(1, true)).toEqual(expected);
  });

  it('VERIFICA_LIVELLO_SET', () => {
    const expected = {
      type: VERIFICA_LIVELLO_SET,
      payload: { data: 333 },
    };
    expect(verificaLivelloSet({ data: 333 })).toEqual(expected);
  });

  it('VERIFICA_LIVELLO_RESET', () => {
    const expected = {
      type: VERIFICA_LIVELLO_RESET,
    };
    expect(verificaLivelloReset()).toEqual(expected);
  });

  it('VERIFICA_LIVELLO_SPINNER_SET', () => {
    const expected = {
      type: VERIFICA_LIVELLO_SPINNER_SET,
      payload: { data: 444 },
    };
    expect(verificaLivelloSpinnerSet({ data: 444 })).toEqual(expected);
  });

  it('VERIFICA_LIVELLO_PROVA_TRIGGER', () => {
    const expected = {
      type: VERIFICA_LIVELLO_PROVA_TRIGGER,
      payload: { data: 555 },
    };
    expect(verificaLivelloProvaTrigger({ data: 555 })).toEqual(expected);
  });

  it('VERIFICA_CONTENUTO_SET', () => {
    const expected = {
      type: VERIFICA_CONTENUTO_SET,
      payload: { data: 666 },
    };
    expect(verificaContenutoSet({ data: 666 })).toEqual(expected);
  });

  it('VERIFICA_CONTENUTO_FETCH', () => {
    const expected = {
      type: VERIFICA_CONTENUTO_FETCH,
      livelloId: 11,
      isDocente: true,
      corsoId: 31,
    };
    expect(verificaContenutoFetch(11, true, 31)).toEqual(expected);
  });

  it('VERIFICA_CONTENUTO_FETCH con default', () => {
    const expected = {
      type: VERIFICA_CONTENUTO_FETCH,
      livelloId: 10,
      isDocente: false,
      corsoId: 0,
    };
    expect(verificaContenutoFetch(10)).toEqual(expected);
  });

  it('VERIFICA_STEP_FETCH', () => {
    const expected = {
      type: VERIFICA_STEP_FETCH,
      id: 66,
      isDocente: true,
    };
    expect(verificaStepFetch(66, true)).toEqual(expected);
  });

  it('VERIFICA_STEP_FETCH con default', () => {
    const expected = {
      type: VERIFICA_STEP_FETCH,
      id: 77,
      isDocente: false,
    };
    expect(verificaStepFetch(77)).toEqual(expected);
  });

  it('VERIFICA_STEP_SET', () => {
    const expected = {
      type: VERIFICA_STEP_SET,
      payload: { data: 777 },
    };
    expect(verificaStepSet({ data: 777 })).toEqual(expected);
  });

  it('VERIFICA_STEP_INITIALIZE', () => {
    const expected = {
      type: VERIFICA_STEP_INITIALIZE,
      payload: { data: 888 },
    };
    expect(verificaStepInitialize({ data: 888 })).toEqual(expected);
  });

  it('VERIFICA_STEP_RESET', () => {
    const expected = {
      type: VERIFICA_STEP_RESET,
    };
    expect(verificaStepReset()).toEqual(expected);
  });

  it('VERIFICA_STEP_NEXT', () => {
    const expected = {
      type: VERIFICA_STEP_NEXT,
      payload: { data: 999 },
    };
    expect(verificaStepNext({ data: 999 })).toEqual(expected);
  });

  it('VERIFICA_FEEDBACK_SET', () => {
    const expected = {
      type: VERIFICA_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(verificaFeedbackSet(true, 'tipologia', 'messaggio')).toEqual(expected);
  });

  it('VERIFICA_FEEDBACK_RESET', () => {
    const expected = {
      type: VERIFICA_FEEDBACK_RESET,
    };
    expect(verificaFeedbackReset()).toEqual(expected);
  });

  it('VERIFICA_RISPOSTA_SET', () => {
    const expected = {
      type: VERIFICA_RISPOSTA_SET,
      payload: { data: 1111 },
    };
    expect(verificaRispostaSet({ data: 1111 })).toEqual(expected);
  });

  it('VERIFICA_RISPOSTA_POST', () => {
    const expected = {
      type: VERIFICA_RISPOSTA_POST,
      payload: { data: 2222 },
    };
    expect(verificaRispostaPost({ data: 2222 })).toEqual(expected);
  });

  it('VERIFICA_RISPOSTA_RESET', () => {
    const expected = {
      type: VERIFICA_RISPOSTA_RESET,
    };
    expect(verificaRispostaReset()).toEqual(expected);
  });

  it('VERIFICA_SPINNER_SET', () => {
    const expected = {
      type: VERIFICA_SPINNER_SET,
      enable: true,
    };
    expect(verificaSpinnerSet(true)).toEqual(expected);
  });

  it('VERIFICA_ASSEGNA_TRIGGER', () => {
    const expected = {
      type: VERIFICA_ASSEGNA_TRIGGER,
      payload: { data: 3333 },
    };
    expect(verificaAssegna({ data: 3333 })).toEqual(expected);
  });

  it('VERIFICA_RITIRA_TRIGGER', () => {
    const expected = {
      type: VERIFICA_RITIRA_TRIGGER,
      idVerifica: 4444,
      verificheAssegnate: { data: 5555 },
    };
    expect(verificaRitira(4444, { data: 5555 })).toEqual(expected);
  });

  it('VERIFICA_RESET', () => {
    const expected = {
      type: VERIFICA_RESET,
    };
    expect(verificaReset()).toEqual(expected);
  });

  it('VERIFICA_CONSEGNA', () => {
    const expected = {
      type: VERIFICA_CONSEGNA,
      payload: { data: 6666 },
    };
    expect(verificaConsegna({ data: 6666 })).toEqual(expected);
  });
});

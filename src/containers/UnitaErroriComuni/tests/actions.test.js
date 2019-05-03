
import {
  unitaErroriComuniContenutoSet,
  unitaErroriComuniStepSet,
  unitaErroriComuniStepInitialize,
  unitaErroriComuniStepNext,
  unitaErroriComuniRispostaSet,
  unitaErroriComuniRispostaPost,
  unitaErroriComuniRispostaReset,
  unitaErroriComuniReset,
} from '../actions';
import {
  UNITA_ERRORI_COMUNI_CONTENUTO_SET,
  UNITA_ERRORI_COMUNI_RESET,
  UNITA_ERRORI_COMUNI_STEP_SET,
  UNITA_ERRORI_COMUNI_STEP_NEXT,
  UNITA_ERRORI_COMUNI_STEP_INITIALIZE,
  UNITA_ERRORI_COMUNI_RISPOSTA_POST,
  UNITA_ERRORI_COMUNI_RISPOSTA_SET,
  UNITA_ERRORI_COMUNI_RISPOSTA_RESET,
} from '../constants';


describe('UnitaErroriComuni actions', () => {
  it('test comportamento action UNITA_ERRORI_COMUNI_CONTENUTO_SET', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_CONTENUTO_SET,
      payload: { data: 123 },
    };
    expect(unitaErroriComuniContenutoSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_ERRORI_COMUNI_STEP_SET', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_STEP_SET,
      payload: { data: 123 },
    };
    expect(unitaErroriComuniStepSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_ERRORI_COMUNI_STEP_INITIALIZE', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_STEP_INITIALIZE,
      payload: { data: 12222 },
    };
    expect(unitaErroriComuniStepInitialize({ data: 12222 })).toEqual(expected);
  });

  it('test comportamento action UNITA_ERRORI_COMUNI_STEP_NEXT', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_STEP_NEXT,
      payload: { data: 123 },
    };
    expect(unitaErroriComuniStepNext({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_ERRORI_COMUNI_RISPOSTA_SET', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_RISPOSTA_SET,
      payload: { data: 123 },
    };
    expect(unitaErroriComuniRispostaSet({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_ERRORI_COMUNI_RISPOSTA_POST', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_RISPOSTA_POST,
      payload: { data: 123 },
    };
    expect(unitaErroriComuniRispostaPost({ data: 123 })).toEqual(expected);
  });

  it('test comportamento action UNITA_ERRORI_COMUNI_RISPOSTA_RESET', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_RISPOSTA_RESET,
    };
    expect(unitaErroriComuniRispostaReset()).toEqual(expected);
  });

  it('test comportamento action UNITA_ERRORI_COMUNI_RESET', () => {
    const expected = {
      type: UNITA_ERRORI_COMUNI_RESET,
    };
    expect(unitaErroriComuniReset()).toEqual(expected);
  });
});

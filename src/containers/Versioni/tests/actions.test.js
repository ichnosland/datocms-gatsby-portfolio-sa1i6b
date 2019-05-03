
import {
  versioniLivelloFetch,
  versioniLivelloSet,
  versioniLivelloReset,
  versioniLivelloSpinnerSet,
  versioniVersioneFetchTrigger,
  versioniVersioneReset,
  versioniVersioneSet,
  versioniVersioneAssegna,
  versioniVersioneRitira,
  versioniVersioneEsecuzioneInitialize,
  versioniVersioneAvanzamentoRisposteUtenteReset,
  versioniVersioneAvanzamentoRisposteUtenteSet,
  versioniVersioneAvanzamentoRisposteUtentePost,
  versioniVersioneAvanzamentoNextTrigger,
  versioniVersioneEsecuzionePeriodoCaricatoSet,
  versioniVersioneEsecuzionePeriodoCaricatoReset,
  versioniVersioneEsecuzioneConsegna,
  versioniVersioneEsecuzioneCaricaPeriodo,
  versioniVersioneEsecuzioneSvuotaTrigger,
  versioniFeedbackSet,
  versioniFeedbackReset,
  versioniSpinnerSet,
  versioniPurgeTrigger,
} from '../actions';
import {
  VERSIONI_LIVELLO_FETCH,
  VERSIONI_LIVELLO_SET,
  VERSIONI_LIVELLO_RESET,
  VERSIONI_LIVELLO_SPINNER_SET,
  VERSIONI_VERSIONE_FETCH_TRIGGER,
  VERSIONI_VERSIONE_RESET,
  VERSIONI_VERSIONE_SET,
  VERSIONI_VERSIONE_ASSEGNA,
  VERSIONI_VERSIONE_RITIRA,
  VERSIONI_VERSIONE_ESECUZIONE_INIZIALIZZA,
  VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_SET,
  VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_RESET,
  VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_POST,
  VERSIONI_VERSIONE_AVANZAMENTO_NEXT_TRIGGER,
  VERSIONI_VERSIONE_ESECUZIONE_CONSEGNA,
  VERSIONI_VERSIONE_ESECUZIONE_CARICA_PERIODO,
  VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_SET,
  VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_RESET,
  VERSIONI_VERSIONE_ESECUZIONE_SVUOTA_TRIGGER,
  VERSIONI_FEEDBACK_SET,
  VERSIONI_FEEDBACK_RESET,
  VERSIONI_SPINNER_SET,
  VERSIONI_PURGE_TRIGGER,
} from '../constants';

describe('Versioni actions', () => {
  it('versioniLivelloFetch', () => {
    const expected = {
      type: VERSIONI_LIVELLO_FETCH,
      livelloId: 1,
      isDocente: 2,
      corsoId: 3,
      idSelezionato: 4,
    };
    expect(versioniLivelloFetch(1, 2, 3, 4)).toEqual(expected);
  });

  it('versioniLivelloFetch con valori di default', () => {
    const expected = {
      type: VERSIONI_LIVELLO_FETCH,
      livelloId: 1,
      isDocente: 2,
      corsoId: 0,
      idSelezionato: 0,
    };
    expect(versioniLivelloFetch(1, 2)).toEqual(expected);
  });

  it('versioniLivelloSet', () => {
    const expected = {
      type: VERSIONI_LIVELLO_SET,
      payload: { data1: 'uno', data2: 'due' },
    };
    expect(versioniLivelloSet({ data1: 'uno', data2: 'due' })).toEqual(expected);
  });

  it('versioniLivelloReset', () => {
    const expected = {
      type: VERSIONI_LIVELLO_RESET,
    };
    expect(versioniLivelloReset()).toEqual(expected);
  });

  it('versioniLivelloSpinnerSet', () => {
    const expected = {
      type: VERSIONI_LIVELLO_SPINNER_SET,
      payload: { data1: 'uno', data2: 'due' },
    };
    expect(versioniLivelloSpinnerSet({ data1: 'uno', data2: 'due' })).toEqual(expected);
  });

  it('versioniVersioneFetchTrigger', () => {
    const expected = {
      type: VERSIONI_VERSIONE_FETCH_TRIGGER,
      id: 123,
      isDocente: true,
      idCorso: 2,
      idPreselected: 4,
    };
    expect(versioniVersioneFetchTrigger(123, true, 2, 4)).toEqual(expected);
  });

  it('versioniVersioneFetchTrigger con valori di default', () => {
    const expected = {
      type: VERSIONI_VERSIONE_FETCH_TRIGGER,
      id: 123,
      isDocente: false,
      idCorso: undefined,
      idPreselected: 0,
    };
    expect(versioniVersioneFetchTrigger(123)).toEqual(expected);
  });

  it('il risultato di versioniVersioneReset deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_RESET,
    };
    expect(versioniVersioneReset()).toEqual(expected);
  });

  it('il risultato di versioniVersioneSet deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_SET,
      payload: { data: 123 },
    };
    expect(versioniVersioneSet({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniVersioneAssegna deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_ASSEGNA,
      idVersione: 123,
      idCorso: 456,
    };
    expect(versioniVersioneAssegna(123, 456)).toEqual(expected);
  });

  it('il risultato di versioniVersioneRitira deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_RITIRA,
      idVersione: 123,
      idCorso: 456,
    };
    expect(versioniVersioneRitira(123, 456)).toEqual(expected);
  });

  it('il risultato di versioniVersioneEsecuzioneInitialize deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_ESECUZIONE_INIZIALIZZA,
      payload: { data: 123 },
    };
    expect(versioniVersioneEsecuzioneInitialize({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniVersioneAvanzamentoRisposteUtenteReset deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_RESET,
    };
    expect(versioniVersioneAvanzamentoRisposteUtenteReset()).toEqual(expected);
  });

  it('il risultato di versioniVersioneAvanzamentoRisposteUtenteSet deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_SET,
      payload: { data: 123 },
    };
    expect(versioniVersioneAvanzamentoRisposteUtenteSet({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniVersioneAvanzamentoRisposteUtentePost deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_POST,
      payload: { data: 123 },
    };
    expect(versioniVersioneAvanzamentoRisposteUtentePost({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniVersioneAvanzamentoNextTrigger deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_AVANZAMENTO_NEXT_TRIGGER,
      payload: { data: 123 },
    };
    expect(versioniVersioneAvanzamentoNextTrigger({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniVersioneEsecuzionePeriodoCaricatoSet deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_SET,
      payload: { data: 123 },
    };
    expect(versioniVersioneEsecuzionePeriodoCaricatoSet({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniVersioneEsecuzionePeriodoCaricatoReset deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_RESET,
    };
    expect(versioniVersioneEsecuzionePeriodoCaricatoReset()).toEqual(expected);
  });

  it('il risultato di versioniVersioneEsecuzioneConsegna deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_ESECUZIONE_CONSEGNA,
      payload: { data: 123 },
    };
    expect(versioniVersioneEsecuzioneConsegna({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniVersioneEsecuzioneCaricaPeriodo deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_ESECUZIONE_CARICA_PERIODO,
      id: 123,
    };
    expect(versioniVersioneEsecuzioneCaricaPeriodo(123)).toEqual(expected);
  });

  it('il risultato di versioniVersioneEsecuzioneSvuotaTrigger deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_VERSIONE_ESECUZIONE_SVUOTA_TRIGGER,
      payload: { data: 123 },
    };
    expect(versioniVersioneEsecuzioneSvuotaTrigger({ data: 123 })).toEqual(expected);
  });

  it('il risultato di versioniFeedbackSet deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_FEEDBACK_SET,
      enable: true,
      tipologia: 'warning',
      messaggio: 'messaggio',
    };
    expect(versioniFeedbackSet(true, 'warning', 'messaggio')).toEqual(expected);
  });

  it('il risultato di versioniFeedbackReset deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_FEEDBACK_RESET,
    };
    expect(versioniFeedbackReset()).toEqual(expected);
  });

  it('il risultato di versioniSpinnerSet deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_SPINNER_SET,
      enable: true,
    };
    expect(versioniSpinnerSet(true)).toEqual(expected);
  });

  it('il risultato di versioniPurgeTrigger deve essere quello atteso', () => {
    const expected = {
      type: VERSIONI_PURGE_TRIGGER,
    };
    expect(versioniPurgeTrigger()).toEqual(expected);
  });
});

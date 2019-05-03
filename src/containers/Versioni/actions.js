/*
 *
 * Versioni actions
 *
 */

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
} from './constants';


export const versioniLivelloFetch = (livelloId, isDocente, corsoId = 0, idSelezionato = 0) => ({
  type: VERSIONI_LIVELLO_FETCH,
  livelloId,
  isDocente,
  corsoId,
  idSelezionato,
});

export const versioniLivelloSet = (payload) => ({
  type: VERSIONI_LIVELLO_SET,
  payload,
});

export const versioniLivelloReset = () => ({
  type: VERSIONI_LIVELLO_RESET,
});

export const versioniLivelloSpinnerSet = (payload) => ({
  type: VERSIONI_LIVELLO_SPINNER_SET,
  payload,
});

export const versioniVersioneFetchTrigger = (id, isDocente = false, idCorso = undefined, idPreselected = 0) => ({
  type: VERSIONI_VERSIONE_FETCH_TRIGGER,
  id,
  isDocente,
  idCorso,
  idPreselected,
});

export const versioniVersioneReset = () => ({
  type: VERSIONI_VERSIONE_RESET,
});

export const versioniVersioneSet = (payload) => ({
  type: VERSIONI_VERSIONE_SET,
  payload,
});

export const versioniVersioneAssegna = (idVersione, idCorso, versioniLivelloData = undefined) => ({
  type: VERSIONI_VERSIONE_ASSEGNA,
  idVersione,
  idCorso,
  versioniLivelloData,
});

export const versioniVersioneRitira = (idVersione, idCorso, versioniAssegnateData = undefined) => ({
  type: VERSIONI_VERSIONE_RITIRA,
  idVersione,
  idCorso,
  versioniAssegnateData,
});

export const versioniVersioneEsecuzioneInitialize = (payload) => ({
  type: VERSIONI_VERSIONE_ESECUZIONE_INIZIALIZZA,
  payload,
});

export const versioniVersioneAvanzamentoRisposteUtenteReset = () => ({
  type: VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_RESET,
});

export const versioniVersioneAvanzamentoRisposteUtenteSet = (payload) => ({
  type: VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_SET,
  payload,
});

export const versioniVersioneAvanzamentoRisposteUtentePost = (payload) => ({
  type: VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_POST,
  payload,
});

export const versioniVersioneAvanzamentoNextTrigger = (payload) => ({
  type: VERSIONI_VERSIONE_AVANZAMENTO_NEXT_TRIGGER,
  payload,
});

export const versioniVersioneEsecuzionePeriodoCaricatoSet = (payload) => ({
  type: VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_SET,
  payload,
});

export const versioniVersioneEsecuzionePeriodoCaricatoReset = () => ({
  type: VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_RESET,
});

export const versioniVersioneEsecuzioneConsegna = (payload) => ({
  type: VERSIONI_VERSIONE_ESECUZIONE_CONSEGNA,
  payload,
});

export const versioniVersioneEsecuzioneCaricaPeriodo = (id) => ({
  type: VERSIONI_VERSIONE_ESECUZIONE_CARICA_PERIODO,
  id,
});

export const versioniVersioneEsecuzioneSvuotaTrigger = (payload) => ({
  type: VERSIONI_VERSIONE_ESECUZIONE_SVUOTA_TRIGGER,
  payload,
});

export const versioniFeedbackSet = (enable, tipologia, messaggio) => ({
  type: VERSIONI_FEEDBACK_SET,
  enable,
  tipologia,
  messaggio,
});

export const versioniFeedbackReset = () => ({
  type: VERSIONI_FEEDBACK_RESET,
});

export const versioniSpinnerSet = (enable) => ({
  type: VERSIONI_SPINNER_SET,
  enable,
});

export const versioniPurgeTrigger = () => ({
  type: VERSIONI_PURGE_TRIGGER,
});

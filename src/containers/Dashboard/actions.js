import {
  DASHBOARD_UNITA_FILTRA,
  DASHBOARD_LIVELLI_SET,
  DASHBOARD_LIVELLI_FETCH,
  DASHBOARD_LIVELLI_FETCH_ERROR,
  DASHBOARD_SPINNER_SET,
  DASHBOARD_LIVELLI_RESET,
  DASHBOARD_MENUEGG_SET,
  DASHBOARD_SEARCHACTIVE_SET,
  DASHBOARD_LIVELLI_ISLOADING_SET,
} from './constants';

export function livelliFetch(configuration, isDocente = false, corsoId = undefined) {
  return {
    type: DASHBOARD_LIVELLI_FETCH,
    configuration,
    isDocente,
    corsoId,
  };
}

export function livelliSet(payload) {
  return {
    type: DASHBOARD_LIVELLI_SET,
    payload,
  };
}

export function livelliReset() {
  return {
    type: DASHBOARD_LIVELLI_RESET,
  };
}

export function livelliFetchError(message = 'Errore caricamento') {
  return {
    type: DASHBOARD_LIVELLI_FETCH_ERROR,
    message,
  };
}

export function livelliIsLoadingSet(value) {
  return {
    type: DASHBOARD_LIVELLI_ISLOADING_SET,
    value,
  };
}

export function spinnerSet(payload) {
  return {
    type: DASHBOARD_SPINNER_SET,
    payload,
  };
}

export function unitaFiltra(parolaChiave) {
  return {
    type: DASHBOARD_UNITA_FILTRA,
    filtro: parolaChiave,
  };
}

export const dashboardMenuEggSet = (value) => ({
  type: DASHBOARD_MENUEGG_SET,
  value,
});

export const dashboardSearchActiveSet = (value) => ({
  type: DASHBOARD_SEARCHACTIVE_SET,
  value,
});

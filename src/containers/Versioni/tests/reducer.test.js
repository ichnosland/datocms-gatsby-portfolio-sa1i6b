
import { fromJS } from 'immutable';
import versioniReducer, {
  defaultVersioneFeedback,
  defaultVersioneCaricata,
  defaultVersioneAvanzamento,
  defaultVersioneEsecuzione,
  defaultVersioniLivello,
} from '../reducer';
import {
  versioniVersioneAvanzamentoRisposteUtenteSet,
  versioniVersioneAvanzamentoRisposteUtenteReset,
  versioniVersioneEsecuzionePeriodoCaricatoSet,
  versioniVersioneEsecuzionePeriodoCaricatoReset,
  versioniFeedbackSet,
  versioniFeedbackReset,
  versioniVersioneSet,
  versioniVersioneReset,
  versioniSpinnerSet,
  versioniLivelloSet,
  versioniLivelloReset,
  versioniLivelloSpinnerSet,
  versioniPurgeTrigger,
} from '../actions';

const initialState = fromJS({
  spinner: fromJS(false),
  feedback: defaultVersioneFeedback,
  versioneCaricata: defaultVersioneCaricata,
  versioneAvanzamento: defaultVersioneAvanzamento,
  versioneEsecuzione: defaultVersioneEsecuzione,
  livello: defaultVersioniLivello,
});

const dataVersioneAvanzamento = {
  mostraSoluzione: false,
  isCorrect: false,
  isPristine: true,
  correzioneStep: {
    corrette: [],
    sbagliate: [],
    soluzione: undefined,
  },
  rispostaSelezionata: undefined,
  isInterfaceLocked: false,
  isEsecuzioneLoaded: false,
  periodiDaEseguire: {
    periodiIncompletiPks: [1, 2, 3],
    stepDaEseguire: {
      1: {
        1: {
          data: 123,
          data2: 456,
        },
      },
    },
  },
  risposteFornite: {
    1: 'uno',
    2: 'due',
    3: 'tre',
  },
  isChecked: false,
  votoFinale: 3,
  mostraCorrezione: false,
  provaConclusa: true,
  isHelpEnabled: false,
  isCheckable: false,
  isFocusEnabled: false,
};

const dataVersioneEsecuzione = {
  periodoCaricato: [1, 2, 3],
  stepCaricatoKey: 1,
  periodoCaricatoId: -1,
  stepTotali: 3,
  stepEseguiti: 2,
  rispostaSelezionata: {
    data: 123,
  },
};

const dataVersioneFeedback = {
  hasFeedback: true,
  tipologia: 'alert',
  messaggio: 'testo messaggio',
};

const dataVersioneCaricata = {
  isLoaded: true,
  isConsegnata: true,
  ritirata: false,
  inCorso: false,
  assegnata: true,
  idAssegnazione: 123,
  id: 456,
  missione: 0,
  periodi: [1, 3, 4],
  titolo: 'titolo',
  sottotitolo: 'sottotitolo',
  autore: 'autore',
  testo: '',
  fonte: 'fonte',
  totaleDomande: 3,
  dataAssegnazione: '2016-01-01',
  previewPeriodi: [4, 5, 6],
  isEsecuzioneLoaded: false,
  backUrl: '/back-url',
};

const dataLivello = {
  isLoaded: true,
  titolo: 'titolo',
  versioniAssegnate: [1, 2, 3],
  missioni: [3, 4, 5],
  versioniMissione: {
    uno: [5, 6, 7],
  },
  versioneSelezionata: { id: 1 },
  spinnerSmall: { assegna: true },
};

describe('versioniReducer', () => {
  it('controllo che lo stato iniziale sia quello atteso', () => {
    expect(versioniReducer(undefined, {})).toEqual(initialState);
  });

  it('controllo che lo stato generato da VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_SET', () => {
    expect(versioniReducer(
      initialState,
      versioniVersioneAvanzamentoRisposteUtenteSet(dataVersioneAvanzamento)
    )).toEqual(initialState.merge({ versioneAvanzamento: dataVersioneAvanzamento }));
  });

  it('controllo che lo stato generato da VERSIONI_VERSIONE_AVANZAMENTO_RISPOSTE_FORNITE_RESET', () => {
    expect(versioniReducer(
      initialState.merge({ versioneAvanzamento: dataVersioneAvanzamento }),
      versioniVersioneAvanzamentoRisposteUtenteReset()
    )).toEqual(initialState);
  });

  it('controllo che lo stato generato da VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_SET', () => {
    expect(versioniReducer(
      initialState,
      versioniVersioneEsecuzionePeriodoCaricatoSet(dataVersioneEsecuzione)
    )).toEqual(initialState.merge({
      versioneEsecuzione: dataVersioneEsecuzione,
    }));
  });

  it('controllo che lo stato generato da VERSIONI_VERSIONE_ESECUZIONE_PERIODO_CARICATO_RESET', () => {
    expect(versioniReducer(
      initialState.merge({ versioneEsecuzione: dataVersioneEsecuzione }),
      versioniVersioneEsecuzionePeriodoCaricatoReset()
    )).toEqual(initialState);
  });

  it('controllo che lo stato generato da VERSIONI_FEEDBACK_SET', () => {
    expect(versioniReducer(
      initialState,
      versioniFeedbackSet(true, 'alert', 'testo messaggio')
    )).toEqual(initialState.merge({
      feedback: dataVersioneFeedback,
    }));
  });

  it('controllo che lo stato generato da VERSIONI_FEEDBACK_RESET', () => {
    expect(versioniReducer(
      initialState.merge({ feedback: dataVersioneFeedback }),
      versioniFeedbackReset()
    )).toEqual(initialState);
  });

  it('controllo che lo stato generato da VERSIONI_VERSIONE_SET', () => {
    expect(versioniReducer(
      initialState,
      versioniVersioneSet(dataVersioneCaricata)
    )).toEqual(initialState.merge({
      versioneCaricata: dataVersioneCaricata,
    }));
  });

  it('controllo che lo stato generato da VERSIONI_FEEDBACK_RESET', () => {
    expect(versioniReducer(
      initialState.merge({ versioneCaricata: dataVersioneCaricata }),
      versioniVersioneReset()
    )).toEqual(initialState);
  });

  it('controllo che lo stato generato da VERSIONI_SPINNER_SET', () => {
    expect(versioniReducer(
      initialState,
      versioniSpinnerSet(true)
    )).toEqual(initialState.merge({
      spinner: true,
    }));
  });

  it('controllo che lo stato generato da VERSIONI_LIVELLO_SET', () => {
    expect(versioniReducer(
      initialState,
      versioniLivelloSet(dataLivello)
    )).toEqual(initialState.merge({
      livello: dataLivello,
    }));
  });

  it('controllo che lo stato generato da VERSIONI_LIVELLO_RESET', () => {
    expect(versioniReducer(
      initialState.merge({ livello: dataLivello }),
      versioniLivelloReset()
    )).toEqual(initialState);
  });

  it('controllo che lo stato generato da VERSIONI_LIVELLO_SPINNER_SET', () => {
    expect(versioniReducer(
      initialState,
      versioniLivelloSpinnerSet({ key: true })
    )).toEqual(initialState.merge({
      livello: initialState.get('livello').merge({
        spinnerSmall: {
          key: true,
        },
      }),
    }));
  });

  it('controllo che lo stato generato da VERSIONI_PURGE_TRIGGER', () => {
    expect(versioniReducer(
      initialState.merge({
        livello: dataLivello,
        versioneCaricata: dataVersioneCaricata,
        feedback: dataVersioneFeedback,
        versioneEsecuzione: dataVersioneEsecuzione,
        versioneAvanzamento: dataVersioneAvanzamento,
      }),
      versioniPurgeTrigger()
    )).toEqual(initialState);
  });
});


import { fromJS } from 'immutable';

import esercizioPreviewReducer, {
  defaultEsercizioPreviewFeedback,
  defaultEsercizioPreviewContenuto,
  defaultEsercizioPreviewRisposta,
  defaultEsercizioPreviewStep,
} from '../reducer';
import {
  esercizioPreviewContenutoSet,
  esercizioPreviewStepSet,
  esercizioPreviewFeedbackSet,
  esercizioPreviewFeedbackReset,
  esercizioPreviewRispostaSet,
  esercizioPreviewRispostaReset,
  esercizioPreviewSpinnerSet,
  esercizioPreviewReset,
} from '../actions';


const mockPopulatedState = fromJS({
  spinner: fromJS(true),
  feedback: fromJS({
    hasFeedback: true,
    tipologia: 'tipologia',
    messaggio: 'messaggio',
  }),
  contenuto: fromJS({
    isLoaded: true,
    inCorso: true,
    consegnata: true,
    id: 12,
    titolo: 'titolo',
    totaleDomande: 13,
    voto: 4,
  }),
  step: fromJS({
    testi: [1, 2, 3],
    esercizi: [4, 5, 6],
    isStepLoaded: true,
    numeroProgressivoStep: 4,
    nextStep: { data: 123 },
  }),
  risposta: fromJS({
    risposteFornite: { data: 123 },
    rispostaSelezionata: undefined,
    isCheckable: true,
    isChecked: true,
    isCorrect: true,
    isPristine: true,
    isInterfaceLocked: true,
    correzioneStep: {
      corrette: [1, 2],
      sbagliate: [3, 4],
      soluzione: undefined,
    },
    mostraSoluzione: true,
    mostraCorrezione: true,
    isHelpEnabled: true,
  }),
});

describe('esercizioPreviewReducer', () => {
  it('controllo lo stato iniziale', () => {
    expect(esercizioPreviewReducer(undefined, {})).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultEsercizioPreviewFeedback,
      contenuto: defaultEsercizioPreviewContenuto,
      step: defaultEsercizioPreviewStep,
      risposta: defaultEsercizioPreviewRisposta,
    }));
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_RESET', () => {
    expect(esercizioPreviewReducer(mockPopulatedState, esercizioPreviewReset())).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultEsercizioPreviewFeedback,
      contenuto: defaultEsercizioPreviewContenuto,
      step: defaultEsercizioPreviewStep,
      risposta: defaultEsercizioPreviewRisposta,
    }));
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_SPINNER_SET', () => {
    expect(esercizioPreviewReducer(undefined, esercizioPreviewSpinnerSet(true))).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultEsercizioPreviewFeedback,
      contenuto: defaultEsercizioPreviewContenuto,
      step: defaultEsercizioPreviewStep,
      risposta: defaultEsercizioPreviewRisposta,
    }));
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_FEEDBACK_SET', () => {
    expect(
      esercizioPreviewReducer(undefined, esercizioPreviewFeedbackSet(true, 'tipologia', 'messaggio'))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultEsercizioPreviewFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      contenuto: defaultEsercizioPreviewContenuto,
      step: defaultEsercizioPreviewStep,
      risposta: defaultEsercizioPreviewRisposta,
    }));
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_FEEDBACK_RESET', () => {
    expect(esercizioPreviewReducer(mockPopulatedState, esercizioPreviewFeedbackReset())).toEqual(
      mockPopulatedState.merge({
        feedback: defaultEsercizioPreviewFeedback,
      })
    );
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_CONTENUTO_SET', () => {
    expect(
      esercizioPreviewReducer(undefined, esercizioPreviewContenutoSet({
        isLoaded: true,
        inCorso: true,
        consegnata: true,
        id: 22,
        titolo: 'titolo',
        totaleDomande: 23,
        voto: 8,
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultEsercizioPreviewFeedback,
      contenuto: defaultEsercizioPreviewContenuto.merge({
        isLoaded: true,
        inCorso: true,
        consegnata: true,
        id: 22,
        titolo: 'titolo',
        totaleDomande: 23,
        voto: 8,
      }),
      step: defaultEsercizioPreviewStep,
      risposta: defaultEsercizioPreviewRisposta,
    }));
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_STEP_SET', () => {
    expect(
      esercizioPreviewReducer(undefined, esercizioPreviewStepSet({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultEsercizioPreviewFeedback,
      contenuto: defaultEsercizioPreviewContenuto,
      step: defaultEsercizioPreviewStep.merge({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }),
      risposta: defaultEsercizioPreviewRisposta,
    }));
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_RISPOSTA_SET', () => {
    expect(
      esercizioPreviewReducer(undefined, esercizioPreviewRispostaSet({
        risposteFornite: { data: 123 },
        rispostaSelezionata: undefined,
        isCheckable: true,
        isChecked: true,
        isCorrect: true,
        isPristine: true,
        isInterfaceLocked: true,
        correzioneStep: {
          corrette: [1, 2],
          sbagliate: [3, 4],
          soluzione: undefined,
        },
        mostraSoluzione: true,
        mostraCorrezione: true,
        isHelpEnabled: true,
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultEsercizioPreviewFeedback,
      contenuto: defaultEsercizioPreviewContenuto,
      step: defaultEsercizioPreviewStep,
      risposta: defaultEsercizioPreviewRisposta.merge({
        risposteFornite: { data: 123 },
        rispostaSelezionata: undefined,
        isCheckable: true,
        isChecked: true,
        isCorrect: true,
        isPristine: true,
        isInterfaceLocked: true,
        correzioneStep: {
          corrette: [1, 2],
          sbagliate: [3, 4],
          soluzione: undefined,
        },
        mostraSoluzione: true,
        mostraCorrezione: true,
        isHelpEnabled: true,
      }),
    }));
  });

  it('controllo lo stato dopo ESERCIZIO_PREVIEW_RISPOSTA_RESET', () => {
    expect(esercizioPreviewReducer(mockPopulatedState, esercizioPreviewRispostaReset())).toEqual(
      mockPopulatedState.merge({
        risposta: defaultEsercizioPreviewRisposta,
      })
    );
  });
});


import { fromJS } from 'immutable';

import provaParallelReducer, {
  defaultProvaParallelFeedback,
  defaultProvaParallelOverview,
  defaultProvaParallelPreview,
  defaultProvaParallelEsecuzione,
  defaultProvaParallelRisposta,
  defaultProvaParallelStep,
} from '../reducer';
import {
  provaParallelOverviewSet,
  provaParallelOverviewReset,
  provaParallelPreviewSet,
  provaParallelPreviewReset,
  provaParallelEsecuzioneSet,
  provaParallelEsecuzioneReset,
  provaParallelStepSet,
  provaParallelStepReset,
  provaParallelFeedbackSet,
  provaParallelFeedbackReset,
  provaParallelRispostaSet,
  provaParallelRispostaReset,
  provaParallelSpinnerSet,
  provaParallelReset,
} from '../actions';


const mockPopulatedState = fromJS({
  spinner: fromJS(true),
  feedback: fromJS({
    hasFeedback: true,
    tipologia: 'tipologia',
    messaggio: 'messaggio',
  }),
  overview: fromJS({
    isLoaded: false,
    id: 100,
    titolo: 'titolo',
    autore: 'autore',
    fonte: 'fonte',
    testo: 'testo',
    totaleDomande: 10,
  }),
  preview: fromJS({
    isLoaded: false,
    id: 100,
    titolo: 'titolo',
    steps: [1, 2, 3],
  }),
  esecuzione: fromJS({
    isLoaded: true,
    consegnata: true,
    titolo: 'titolo',
    testo: 'testo',
    id: 20,
    steps: [5, 6, 7],
    risposteFornite: {
      1: { data: 555 },
    },
    stepCaricato: 1,
  }),
  step: fromJS({
    testi: [1, 2, 3],
    esercizi: [4, 5, 6],
    numeroProgressivoStep: 4,
  }),
  risposta: fromJS({
    rispostaSelezionata: ['risposta'],
    isCheckable: true,
    isFocusEnabled: true,
  }),
});

describe('provaParallelReducer', () => {
  it('controllo lo stato iniziale', () => {
    expect(provaParallelReducer(undefined, {})).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_RESET', () => {
    expect(provaParallelReducer(mockPopulatedState, provaParallelReset())).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_SPINNER_SET', () => {
    expect(provaParallelReducer(undefined, provaParallelSpinnerSet(true))).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_FEEDBACK_SET', () => {
    expect(
      provaParallelReducer(undefined, provaParallelFeedbackSet(true, 'tipologia', 'messaggio'))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_FEEDBACK_RESET', () => {
    expect(provaParallelReducer(mockPopulatedState, provaParallelFeedbackReset())).toEqual(
      mockPopulatedState.merge({
        feedback: defaultProvaParallelFeedback,
      })
    );
  });

  it('controllo lo stato dopo PROVA_PARALLEL_STEP_SET', () => {
    expect(
      provaParallelReducer(undefined, provaParallelStepSet({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        numeroProgressivoStep: 5,
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep.merge({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        numeroProgressivoStep: 5,
      }),
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_STEP_RESET', () => {
    expect(provaParallelReducer(mockPopulatedState, provaParallelStepReset())).toEqual(
      mockPopulatedState.merge({
        step: defaultProvaParallelStep,
      })
    );
  });

  it('controllo lo stato dopo PROVA_PARALLEL_RISPOSTA_SET', () => {
    expect(
      provaParallelReducer(undefined, provaParallelRispostaSet({
        rispostaSelezionata: ['risposta'],
        isCheckable: true,
        isFocusEnabled: true,
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta.merge({
        rispostaSelezionata: ['risposta'],
        isCheckable: true,
        isFocusEnabled: true,
      }),
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_RISPOSTA_RESET', () => {
    expect(provaParallelReducer(mockPopulatedState, provaParallelRispostaReset())).toEqual(
      mockPopulatedState.merge({
        risposta: defaultProvaParallelRisposta,
      })
    );
  });

  it('controllo lo stato dopo PROVA_PARALLEL_ESECUZIONE_SET', () => {
    expect(
      provaParallelReducer(undefined, provaParallelEsecuzioneSet({
        isLoaded: true,
        consegnata: true,
        titolo: 'titolo',
        testo: 'testo',
        id: 20,
        steps: [5, 6, 7],
        risposteFornite: {
          1: { data: 555 },
        },
        stepCaricato: 1,
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione.merge({
        isLoaded: true,
        consegnata: true,
        titolo: 'titolo',
        testo: 'testo',
        id: 20,
        steps: [5, 6, 7],
        risposteFornite: {
          1: { data: 555 },
        },
        stepCaricato: 1,
      }),
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_ESECUZIONE_RESET', () => {
    expect(provaParallelReducer(mockPopulatedState, provaParallelEsecuzioneReset())).toEqual(
      mockPopulatedState.merge({
        esecuzione: defaultProvaParallelEsecuzione,
      })
    );
  });

  it('controllo lo stato dopo PROVA_PARALLEL_PREVIEW_SET_SET', () => {
    expect(
      provaParallelReducer(undefined, provaParallelPreviewSet({
        isLoaded: false,
        id: 100,
        titolo: 'titolo',
        steps: [1, 2, 3],
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview,
      preview: defaultProvaParallelPreview.merge({
        isLoaded: false,
        id: 100,
        titolo: 'titolo',
        steps: [1, 2, 3],
      }),
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_PREVIEW_SET_RESET', () => {
    expect(provaParallelReducer(mockPopulatedState, provaParallelPreviewReset())).toEqual(
      mockPopulatedState.merge({
        preview: defaultProvaParallelPreview,
      })
    );
  });

  it('controllo lo stato dopo PROVA_PARALLEL_OVERVIEW_SET_SET', () => {
    expect(
      provaParallelReducer(undefined, provaParallelOverviewSet({
        isLoaded: false,
        id: 100,
        titolo: 'titolo',
        autore: 'autore',
        fonte: 'fonte',
        testo: 'testo',
        totaleDomande: 10,
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaParallelFeedback,
      overview: defaultProvaParallelOverview.merge({
        isLoaded: false,
        id: 100,
        titolo: 'titolo',
        autore: 'autore',
        fonte: 'fonte',
        testo: 'testo',
        totaleDomande: 10,
      }),
      preview: defaultProvaParallelPreview,
      esecuzione: defaultProvaParallelEsecuzione,
      step: defaultProvaParallelStep,
      risposta: defaultProvaParallelRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_PARALLEL_OVERVIEW_SET_RESET', () => {
    expect(provaParallelReducer(mockPopulatedState, provaParallelOverviewReset())).toEqual(
      mockPopulatedState.merge({
        overview: defaultProvaParallelOverview,
      })
    );
  });
});

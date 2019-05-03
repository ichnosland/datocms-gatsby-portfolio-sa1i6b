
import { fromJS } from 'immutable';

import provaCompetenzaReducer, {
  defaultProvaCompetenzaFeedback,
  defaultProvaCompetenzaContenuto,
  defaultProvaCompetenzaRisposta,
  defaultProvaCompetenzaStep,
} from '../reducer';
import {
  provaCompetenzaContenutoSet,
  provaCompetenzaStepSet,
  provaCompetenzaStepReset,
  provaCompetenzaFeedbackSet,
  provaCompetenzaFeedbackReset,
  provaCompetenzaRispostaSet,
  provaCompetenzaRispostaReset,
  provaCompetenzaSpinnerSet,
  provaCompetenzaReset,
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
    ritirata: true,
    assegnata: true,
    id: 12,
    titolo: 'titolo',
    testo: 'testo',
    prerequisito: 'prerequisito',
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

describe('provaCompetenzaReducer', () => {
  it('controllo lo stato iniziale', () => {
    expect(provaCompetenzaReducer(undefined, {})).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaCompetenzaFeedback,
      contenuto: defaultProvaCompetenzaContenuto,
      step: defaultProvaCompetenzaStep,
      risposta: defaultProvaCompetenzaRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_RESET', () => {
    expect(provaCompetenzaReducer(mockPopulatedState, provaCompetenzaReset())).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaCompetenzaFeedback,
      contenuto: defaultProvaCompetenzaContenuto,
      step: defaultProvaCompetenzaStep,
      risposta: defaultProvaCompetenzaRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_SPINNER_SET', () => {
    expect(provaCompetenzaReducer(undefined, provaCompetenzaSpinnerSet(true))).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultProvaCompetenzaFeedback,
      contenuto: defaultProvaCompetenzaContenuto,
      step: defaultProvaCompetenzaStep,
      risposta: defaultProvaCompetenzaRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_FEEDBACK_SET', () => {
    expect(
      provaCompetenzaReducer(undefined, provaCompetenzaFeedbackSet(true, 'tipologia', 'messaggio'))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaCompetenzaFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      contenuto: defaultProvaCompetenzaContenuto,
      step: defaultProvaCompetenzaStep,
      risposta: defaultProvaCompetenzaRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_FEEDBACK_RESET', () => {
    expect(provaCompetenzaReducer(mockPopulatedState, provaCompetenzaFeedbackReset())).toEqual(
      mockPopulatedState.merge({
        feedback: defaultProvaCompetenzaFeedback,
      })
    );
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_CONTENUTO_SET', () => {
    expect(
      provaCompetenzaReducer(undefined, provaCompetenzaContenutoSet({
        isLoaded: true,
        inCorso: true,
        consegnata: true,
        ritirata: true,
        assegnata: true,
        id: 22,
        titolo: 'titolo',
        testo: 'testo',
        prerequisito: 'prerequisito',
        totaleDomande: 23,
        voto: 8,
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaCompetenzaFeedback,
      contenuto: defaultProvaCompetenzaContenuto.merge({
        isLoaded: true,
        inCorso: true,
        consegnata: true,
        ritirata: true,
        assegnata: true,
        id: 22,
        titolo: 'titolo',
        testo: 'testo',
        prerequisito: 'prerequisito',
        totaleDomande: 23,
        voto: 8,
      }),
      step: defaultProvaCompetenzaStep,
      risposta: defaultProvaCompetenzaRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_STEP_SET', () => {
    expect(
      provaCompetenzaReducer(undefined, provaCompetenzaStepSet({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }))
    ).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultProvaCompetenzaFeedback,
      contenuto: defaultProvaCompetenzaContenuto,
      step: defaultProvaCompetenzaStep.merge({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }),
      risposta: defaultProvaCompetenzaRisposta,
    }));
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_STEP_RESET', () => {
    expect(provaCompetenzaReducer(mockPopulatedState, provaCompetenzaStepReset())).toEqual(
      mockPopulatedState.merge({
        step: defaultProvaCompetenzaStep,
      })
    );
  });

  it('controllo lo stato dopo PROVA_COMPETENZA_RISPOSTA_SET', () => {
    expect(
      provaCompetenzaReducer(undefined, provaCompetenzaRispostaSet({
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
      feedback: defaultProvaCompetenzaFeedback,
      contenuto: defaultProvaCompetenzaContenuto,
      step: defaultProvaCompetenzaStep,
      risposta: defaultProvaCompetenzaRisposta.merge({
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

  it('controllo lo stato dopo PROVA_COMPETENZA_RISPOSTA_RESET', () => {
    expect(provaCompetenzaReducer(mockPopulatedState, provaCompetenzaRispostaReset())).toEqual(
      mockPopulatedState.merge({
        risposta: defaultProvaCompetenzaRisposta,
      })
    );
  });
});

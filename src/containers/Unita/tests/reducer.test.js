
import { fromJS } from 'immutable';

import unitaReducer, {
  defaultUnitaFeedback,
  defaultUnitaContenuto,
  defaultUnitaRisposta,
  defaultUnitaStep,
} from '../reducer';
import {
  unitaContenutoSet,
  unitaStepSet,
  unitaStepReset,
  unitaFeedbackSet,
  unitaFeedbackReset,
  unitaRispostaSet,
  unitaRispostaReset,
  unitaSpinnerSet,
  unitaReset,
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

describe('unitaReducer', () => {
  it('controllo lo stato iniziale', () => {
    expect(unitaReducer(undefined, {})).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaFeedback,
      contenuto: defaultUnitaContenuto,
      step: defaultUnitaStep,
      risposta: defaultUnitaRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_RESET', () => {
    expect(unitaReducer(mockPopulatedState, unitaReset())).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaFeedback,
      contenuto: defaultUnitaContenuto,
      step: defaultUnitaStep,
      risposta: defaultUnitaRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_SPINNER_SET', () => {
    expect(unitaReducer(undefined, unitaSpinnerSet(false))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultUnitaFeedback,
      contenuto: defaultUnitaContenuto,
      step: defaultUnitaStep,
      risposta: defaultUnitaRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_FEEDBACK_SET', () => {
    expect(
      unitaReducer(undefined, unitaFeedbackSet(true, 'tipologia', 'messaggio'))
    ).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      contenuto: defaultUnitaContenuto,
      step: defaultUnitaStep,
      risposta: defaultUnitaRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_FEEDBACK_RESET', () => {
    expect(unitaReducer(mockPopulatedState, unitaFeedbackReset())).toEqual(
      mockPopulatedState.merge({
        feedback: defaultUnitaFeedback,
      })
    );
  });

  it('controllo lo stato dopo UNITA_CONTENUTO_SET', () => {
    expect(
      unitaReducer(undefined, unitaContenutoSet({
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
      spinner: fromJS(true),
      feedback: defaultUnitaFeedback,
      contenuto: defaultUnitaContenuto.merge({
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
      step: defaultUnitaStep,
      risposta: defaultUnitaRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_STEP_SET', () => {
    expect(
      unitaReducer(undefined, unitaStepSet({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }))
    ).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultUnitaFeedback,
      contenuto: defaultUnitaContenuto,
      step: defaultUnitaStep.merge({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }),
      risposta: defaultUnitaRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_STEP_RESET', () => {
    expect(unitaReducer(mockPopulatedState, unitaStepReset())).toEqual(
      mockPopulatedState.merge({
        step: defaultUnitaStep,
      })
    );
  });

  it('controllo lo stato dopo UNITA_RISPOSTA_SET', () => {
    expect(
      unitaReducer(undefined, unitaRispostaSet({
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
      spinner: fromJS(true),
      feedback: defaultUnitaFeedback,
      contenuto: defaultUnitaContenuto,
      step: defaultUnitaStep,
      risposta: defaultUnitaRisposta.merge({
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

  it('controllo lo stato dopo UNITA_RISPOSTA_RESET', () => {
    expect(unitaReducer(mockPopulatedState, unitaRispostaReset())).toEqual(
      mockPopulatedState.merge({
        risposta: defaultUnitaRisposta,
      })
    );
  });
});

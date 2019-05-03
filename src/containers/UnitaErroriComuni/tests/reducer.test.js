
import { fromJS } from 'immutable';

import unitaErroriComuniReducer, {
  defaultUnitaErroriComuniContenuto,
  defaultUnitaErroriComuniRisposta,
  defaultUnitaErroriComuniStep,
} from '../reducer';
import {
  unitaErroriComuniContenutoSet,
  unitaErroriComuniStepSet,
  unitaErroriComuniRispostaSet,
  unitaErroriComuniRispostaReset,
  unitaErroriComuniReset,
} from '../actions';


const mockPopulatedState = fromJS({
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

describe('unitaErroriComuniReducer', () => {
  it('controllo lo stato iniziale', () => {
    expect(unitaErroriComuniReducer(undefined, {})).toEqual(fromJS({
      contenuto: defaultUnitaErroriComuniContenuto,
      step: defaultUnitaErroriComuniStep,
      risposta: defaultUnitaErroriComuniRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_ERRORI_COMUNI_RESET', () => {
    expect(unitaErroriComuniReducer(mockPopulatedState, unitaErroriComuniReset())).toEqual(fromJS({
      contenuto: defaultUnitaErroriComuniContenuto,
      step: defaultUnitaErroriComuniStep,
      risposta: defaultUnitaErroriComuniRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_ERRORI_COMUNI_CONTENUTO_SET', () => {
    expect(
      unitaErroriComuniReducer(undefined, unitaErroriComuniContenutoSet({
        isLoaded: true,
        inCorso: true,
        consegnata: true,
        id: 22,
        titolo: 'titolo',
        totaleDomande: 23,
        voto: 8,
      }))
    ).toEqual(fromJS({
      contenuto: defaultUnitaErroriComuniContenuto.merge({
        isLoaded: true,
        inCorso: true,
        consegnata: true,
        id: 22,
        titolo: 'titolo',
        totaleDomande: 23,
        voto: 8,
      }),
      step: defaultUnitaErroriComuniStep,
      risposta: defaultUnitaErroriComuniRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_ERRORI_COMUNI_STEP_SET', () => {
    expect(
      unitaErroriComuniReducer(undefined, unitaErroriComuniStepSet({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }))
    ).toEqual(fromJS({
      contenuto: defaultUnitaErroriComuniContenuto,
      step: defaultUnitaErroriComuniStep.merge({
        testi: [11, 12, 13],
        esercizi: [14, 15, 16],
        isStepLoaded: true,
        numeroProgressivoStep: 5,
        nextStep: { data: 555 },
      }),
      risposta: defaultUnitaErroriComuniRisposta,
    }));
  });

  it('controllo lo stato dopo UNITA_ERRORI_COMUNI_RISPOSTA_SET', () => {
    expect(
      unitaErroriComuniReducer(undefined, unitaErroriComuniRispostaSet({
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
      contenuto: defaultUnitaErroriComuniContenuto,
      step: defaultUnitaErroriComuniStep,
      risposta: defaultUnitaErroriComuniRisposta.merge({
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

  it('controllo lo stato dopo UNITA_ERRORI_COMUNI_RISPOSTA_RESET', () => {
    expect(unitaErroriComuniReducer(mockPopulatedState, unitaErroriComuniRispostaReset())).toEqual(
      mockPopulatedState.merge({
        risposta: defaultUnitaErroriComuniRisposta,
      })
    );
  });
});

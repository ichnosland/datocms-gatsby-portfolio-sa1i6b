
import { fromJS } from 'immutable';

import verificaReducer, {
  defaultVerificaFeedback,
  defaultVerificheLivello,
  defaultVerificaContenuto,
  defaultVerificaRisposta,
  defaultVerificaStep,
} from '../reducer';
import {
  verificaLivelloSet,
  verificaLivelloReset,
  verificaLivelloSpinnerSet,
  verificaContenutoSet,
  verificaStepSet,
  verificaStepReset,
  verificaFeedbackSet,
  verificaFeedbackReset,
  verificaRispostaSet,
  verificaRispostaReset,
  verificaSpinnerSet,
  verificaReset,
} from '../actions';


const dataVerificaFeedback = {
  hasFeedback: true,
  tipologia: 'tipologia',
  messaggio: 'messaggio',
};

const dataVerificaLivello = {
  isLoaded: true,
  titolo: 'titolo',
  unitSelectionEnabled: true,
  unita: [3, 4],
  verificheAssegnate: [],
  datiVerifica: {
    soloLatino: false,
    unitaSelezionate: [],
  },
  spinnerSmall: {},
  backUrl: '/backurl',
};

const dataVerificaContenuto = {
  isLoaded: true,
  inCorso: true,
  consegnata: true,
  ritirata: true,
  id: 123,
  totaleStep: 11,
  voto: 5,
  steps: [1, 2, 3],
  stepRiaccodati: [4],
  unitaSelezionate: [4, 6],
  risposteFornite: { data: 123 },
  stepCaricato: 10,
  livelloId: 20,
  soloLatino: false,
  backUrl: '/backurl',
};

const dataVerificaStep = {
  testi: [1, 2, 3],
  esercizi: [4, 5, 6],
  isStepLoaded: true,
  numeroProgressivoStep: 4,
  skipped: [3, 4, 5],
};

const dataVerificaRisposta = {
  rispostaSelezionata: ['risposta'],
  isCheckable: true,
  isFocusEnabled: true,
};

const initialState = fromJS({
  spinner: fromJS(false),
  feedback: defaultVerificaFeedback,
  contenuto: defaultVerificaContenuto,
  step: defaultVerificaStep,
  risposta: defaultVerificaRisposta,
  livello: defaultVerificheLivello,
});

describe('verificaReducer', () => {
  it('controllo lo stato iniziale', () => {
    expect(verificaReducer(undefined, {})).toEqual(initialState);
  });

  it('controllo lo stato dopo VERIFICA_RESET', () => {
    expect(verificaReducer(initialState.merge({
      spinner: fromJS(true),
      feedback: dataVerificaFeedback,
      contenuto: dataVerificaContenuto,
      step: dataVerificaStep,
      risposta: dataVerificaRisposta,
      livello: dataVerificaLivello,
    }), verificaReset())).toEqual(
      initialState
    );
  });

  it('controllo lo stato dopo VERIFICA_SPINNER_SET', () => {
    expect(verificaReducer(undefined, verificaSpinnerSet(true))).toEqual(
      initialState.merge({ spinner: true })
    );
  });

  it('controllo lo stato dopo VERIFICA_FEEDBACK_SET', () => {
    expect(verificaReducer(undefined, verificaFeedbackSet(
      true,
      'tipologia',
      'messaggio',
    ))).toEqual(
      initialState.merge({ feedback: dataVerificaFeedback })
    );
  });

  it('controllo lo stato dopo VERIFICA_RESET', () => {
    expect(verificaReducer(initialState.merge({
      feedback: dataVerificaFeedback,
    }), verificaFeedbackReset())).toEqual(initialState);
  });

  it('controllo lo stato dopo VERIFICA_LIVELLO_SPINNER_SET', () => {
    expect(verificaReducer(undefined, verificaLivelloSpinnerSet({
      chiave: true,
    }))).toEqual(
      initialState.merge({
        livello: {
          ...defaultVerificheLivello.toJS(),
          spinnerSmall: { chiave: true },
        },
      })
    );
  });


  it('controllo lo stato dopo VERIFICA_LIVELLO_SET', () => {
    expect(verificaReducer(undefined, verificaLivelloSet(
      dataVerificaLivello
    ))).toEqual(
      initialState.merge({ livello: dataVerificaLivello })
    );
  });

  it('controllo lo stato dopo VERIFICA_LIVELLO_RESET', () => {
    expect(verificaReducer(initialState.merge({
      livello: dataVerificaLivello,
    }), verificaLivelloReset())).toEqual(initialState);
  });

  it('controllo lo stato dopo VERIFICA_CONTENUTO_SET', () => {
    expect(verificaReducer(undefined, verificaContenutoSet(
      dataVerificaContenuto
    ))).toEqual(
      initialState.merge({ contenuto: dataVerificaContenuto })
    );
  });

  it('controllo lo stato dopo VERIFICA_STEP_SET', () => {
    expect(verificaReducer(undefined, verificaStepSet(
      dataVerificaStep
    ))).toEqual(
      initialState.merge({ step: dataVerificaStep })
    );
  });

  it('controllo lo stato dopo VERIFICA_STEP_RESET', () => {
    expect(verificaReducer(initialState.merge({
      step: dataVerificaStep,
    }), verificaStepReset())).toEqual(initialState);
  });


  it('controllo lo stato dopo VERIFICA_CONTENUTO_SET', () => {
    expect(verificaReducer(undefined, verificaRispostaSet(
      dataVerificaRisposta
    ))).toEqual(
      initialState.merge({ risposta: dataVerificaRisposta })
    );
  });

  it('controllo lo stato dopo VERIFICA_CONTENUTO_RESET', () => {
    expect(verificaReducer(initialState.merge({
      risposta: dataVerificaRisposta,
    }), verificaRispostaReset())).toEqual(initialState);
  });
});


import { fromJS } from 'immutable';
import classeCreazioneReducer, {
  defaultClasseCreazioneScuoleAttive,
  defaultClasseCreazioneGeo,
  defaultClasseCreazioneFeedback,
  defaultClasseCreazioneData,
} from '../reducer';

import {
  classeCreazioneScuoleAttiveSet,
  classeCreazioneGeoSet,
  classeCreazioneGeoComuneSet,
  classeCreazioneGeoScuoleSet,
  classeCreazioneDataSet,
  classeCreazioneReset,
  classeCreazioneSpinnerSet,
  classeCreazioneFeedbackSet,
  classeCreazioneFeedbackReset,
} from '../actions';


describe('classeCreazioneReducer', () => {
  it('stato iniziale', () => {
    expect(classeCreazioneReducer(undefined, {})).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_SPINNER_SET', () => {
    expect(classeCreazioneReducer(fromJS({}), classeCreazioneSpinnerSet(true))).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_FEEDBACK_SET', () => {
    expect(classeCreazioneReducer(fromJS({}), classeCreazioneFeedbackSet(
      true,
      'tipo',
      'messaggio'
    ))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_FEEDBACK_RESET', () => {
    expect(classeCreazioneReducer(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData,
    }), classeCreazioneFeedbackReset())).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_DATA_SET', () => {
    expect(classeCreazioneReducer(fromJS({}), classeCreazioneDataSet({
      display: 'scuoleAttive',
      scuolaSelezionata: 444,
      creaNuovaClasse: true,
      classeSelezionata: 123,
      provinciaSelezionata: 'TO',
      comuneSelezionato: 'TORINO',
      indirizzoDiStudioSelezionato: 'indirizzo di studio',
      annoClasse: 1,
      nomeClasse: 'nome',
      pk: 444,
      nuova: true,
    }))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData.merge({
        display: 'scuoleAttive',
        scuolaSelezionata: 444,
        creaNuovaClasse: true,
        classeSelezionata: 123,
        provinciaSelezionata: 'TO',
        comuneSelezionato: 'TORINO',
        indirizzoDiStudioSelezionato: 'indirizzo di studio',
        annoClasse: 1,
        nomeClasse: 'nome',
        pk: 444,
        nuova: true,
      }),
    }));
  });

  it('CLASSE_CREAZIONE_DATA_RESET', () => {
    expect(classeCreazioneReducer(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData.merge({
        display: 'scuoleAttive',
        scuolaSelezionata: 444,
        creaNuovaClasse: true,
        classeSelezionata: 123,
        provinciaSelezionata: 'TO',
        comuneSelezionato: 'TORINO',
        indirizzoDiStudioSelezionato: 'indirizzo di studio',
        annoClasse: 1,
        nomeClasse: 'nome',
        pk: 444,
        nuova: true,
      }),
    }), classeCreazioneReset())).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_SCUOLE_ATTIVE_SET', () => {
    expect(classeCreazioneReducer(fromJS({}), classeCreazioneScuoleAttiveSet({
      list: [1, 2, 3],
      isLoaded: true,
    }))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive.merge({
        list: [1, 2, 3],
        isLoaded: true,
      }),
      geo: defaultClasseCreazioneGeo,
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_GEO_COMUNI_SET', () => {
    expect(classeCreazioneReducer(fromJS({}), classeCreazioneGeoComuneSet({
      TO: [1, 2, 3],
    }))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo.merge({
        comuni: {
          TO: [1, 2, 3],
        },
      }),
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_GEO_SCUOLE_SET', () => {
    expect(classeCreazioneReducer(fromJS({}), classeCreazioneGeoScuoleSet({
      TO: [1, 2, 3],
    }))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo.merge({
        scuole: {
          TO: [1, 2, 3],
        },
      }),
      data: defaultClasseCreazioneData,
    }));
  });

  it('CLASSE_CREAZIONE_GEO_SET', () => {
    expect(classeCreazioneReducer(fromJS({}), classeCreazioneGeoSet({
      indirizziDiStudio: [1, 2, 3],
    }))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseCreazioneFeedback,
      scuoleAttive: defaultClasseCreazioneScuoleAttive,
      geo: defaultClasseCreazioneGeo.merge({
        indirizziDiStudio: [1, 2, 3],
      }),
      data: defaultClasseCreazioneData,
    }));
  });
});

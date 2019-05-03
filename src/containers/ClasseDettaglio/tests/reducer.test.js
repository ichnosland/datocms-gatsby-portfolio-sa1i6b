
import { fromJS } from 'immutable';
import classeDettaglioReducer, {
  defaultClasseDettaglioFeedback,
  defaultClasseDettaglioContenuto,
  defaultClasseDettaglioDisplay,
} from '../reducer';
import {
  classeDettaglioReset,
  classeDettaglioDisplaySet,
  classeDettaglioFeedbackSet,
  classeDettaglioFeedbackReset,
  classeDettaglioSpinnerSet,
  classeDettaglioContenutoSet,
} from '../actions';


describe('classeDettaglioReducer', () => {
  it('stato iniziale', () => {
    expect(classeDettaglioReducer(undefined, {})).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback,
      display: defaultClasseDettaglioDisplay,
      contenuto: defaultClasseDettaglioContenuto,
    }));
  });

  it('CLASSE_DETTAGLIO_SPINNER_SET', () => {
    expect(classeDettaglioReducer(fromJS({}), classeDettaglioSpinnerSet(true))).toEqual(fromJS({
      spinner: fromJS(true),
      feedback: defaultClasseDettaglioFeedback,
      display: defaultClasseDettaglioDisplay,
      contenuto: defaultClasseDettaglioContenuto,
    }));
  });

  it('CLASSE_DETTAGLIO_FEEDBACK_SET', () => {
    expect(classeDettaglioReducer(fromJS({}), classeDettaglioFeedbackSet(
      true,
      'tipo',
      'messaggio'
    ))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      display: defaultClasseDettaglioDisplay,
      contenuto: defaultClasseDettaglioContenuto,
    }));
  });

  it('CLASSE_DETTAGLIO_FEEDBACK_RESET', () => {
    expect(classeDettaglioReducer(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      display: defaultClasseDettaglioDisplay,
      contenuto: defaultClasseDettaglioContenuto,
    }), classeDettaglioFeedbackReset())).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback,
      display: defaultClasseDettaglioDisplay,
      contenuto: defaultClasseDettaglioContenuto,
    }));
  });

  it('CLASSE_DETTAGLIO_RESET', () => {
    expect(classeDettaglioReducer(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      display: defaultClasseDettaglioDisplay.merge({
        field: 'field',
        sort: 'desc',
        type: 'number',
        block: 'block',
      }),
      contenuto: defaultClasseDettaglioContenuto.merge({
        sortedData: [1, 2, 3],
        isCorsoLoaded: true,
        corsoNome: 'nomecorso',
        corsoId: 1,
        corsoIscritti: [3, 4, 5],
      }),
    }), classeDettaglioReset())).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback,
      display: defaultClasseDettaglioDisplay,
      contenuto: defaultClasseDettaglioContenuto,
    }));
  });

  it('CLASSE_DETTAGLIO_DISPLAY_SET', () => {
    expect(classeDettaglioReducer(fromJS({}), classeDettaglioDisplaySet({
      field: 'field',
      sort: 'desc',
      type: 'number',
      block: 'block',
    }))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback,
      display: defaultClasseDettaglioDisplay.merge({
        field: 'field',
        sort: 'desc',
        type: 'number',
        block: 'block',
      }),
      contenuto: defaultClasseDettaglioContenuto,
    }));
  });

  it('CLASSE_DETTAGLIO_CONTENUTO_SET', () => {
    expect(classeDettaglioReducer(fromJS({}), classeDettaglioContenutoSet({
      sortedData: [1, 2, 3],
      isCorsoLoaded: true,
      corsoNome: 'nomecorso',
      corsoId: 1,
      corsoIscritti: [3, 4, 5],
    }))).toEqual(fromJS({
      spinner: fromJS(false),
      feedback: defaultClasseDettaglioFeedback,
      display: defaultClasseDettaglioDisplay,
      contenuto: defaultClasseDettaglioContenuto.merge({
        sortedData: [1, 2, 3],
        isCorsoLoaded: true,
        corsoNome: 'nomecorso',
        corsoId: 1,
        corsoIscritti: [3, 4, 5],
      }),
    }));
  });
});

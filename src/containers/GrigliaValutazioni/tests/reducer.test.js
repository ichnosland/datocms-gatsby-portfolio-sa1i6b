
import { fromJS } from 'immutable';
import grigliaValutazioniReducer, {
  defaultGrigliaValutazioniSpinner,
  defaultGrigliaValutazioniFeedback,
  defaultGrigliaValutazioniValutabili,
  defaultGrigliaValutazioniSelection,
  defaultGrigliaValutazioniDisplay,
  defaultGrigliaValutazioniContenuto,
  defaultGrigliaValutazioniDettaglio,
  defaultGrigliaValutazioniDettaglioStudente,
} from '../reducer';
import {
  grigliaValutazioneSpinnerSet,
  grigliaValutazioneFeedbackSet,
  grigliaValutazioneFeedbackReset,
  grigliaValutazioneValutabiliSet,
  grigliaValutazioneValutabiliReset,
  grigliaValutazioneDisplaySet,
  grigliaValutazioneContenutoSet,
  grigliaValutazioneSelectionSet,
  grigliaValutazioneSelectionReset,
  grigliaValutazioneDettaglioSet,
  grigliaValutazioneDettaglioReset,
  grigliaValutazioneReset,
  grigliaValutazioneDettaglioStudenteSet,
  grigliaValutazioneDettaglioStudenteReset,
} from '../actions';


describe('grigliaValutazioniReducer', () => {
  it('stato iniziale', () => {
    expect(grigliaValutazioniReducer(undefined, {})).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_SPINNER_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneSpinnerSet(true, 'key'))).toEqual(fromJS({
      spinner: fromJS({ key: true, default: false }),
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_FEEDBACK_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneFeedbackSet(
      true,
      'tipo',
      'messaggio'
    ))).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_FEEDBACK_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }), grigliaValutazioneFeedbackReset())).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_VALUTABILI_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneValutabiliSet({
      verifiche: [1, 2, 3],
      versioni: [4, 5, 6],
    }))).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili.merge({
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
      }),
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_VALUTABILI_RESET', () => {
    expect(grigliaValutazioniReducer(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili.merge({
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
      }),
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }), grigliaValutazioneValutabiliReset())).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_DISPLAY_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneDisplaySet({
      field: 'field',
      sort: 'asc',
      type: 'string',
      block: 'block',
    }))).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay.merge({
        field: 'field',
        sort: 'asc',
        type: 'string',
        block: 'block',
      }),
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_CONTENUTO_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneContenutoSet({
      sortedData: [1, 2, 3],
      isDataLoaded: true,
    }))).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto.merge({
        sortedData: [1, 2, 3],
        isDataLoaded: true,
      }),
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_SELECTION_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneSelectionSet({
      verifiche: [1, 2, 3],
      versioni: [4, 5, 6],
    }))).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection.merge({
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
      }),
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_SELECTION_RESET', () => {
    expect(grigliaValutazioniReducer(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection.merge({
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
      }),
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }), grigliaValutazioneSelectionReset())).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneDettaglioSet({
      sortedData: [1, 2, 3],
      valutazioneId: 10,
      corsoId: 333,
      titolo: 'titolo',
      data: 'data',
      tipologia: 'tipo',
    }))).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio.merge({
        sortedData: [1, 2, 3],
        valutazioneId: 10,
        corsoId: 333,
        titolo: 'titolo',
        data: 'data',
        tipologia: 'tipo',
      }),
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_RESET', () => {
    expect(grigliaValutazioniReducer(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio.merge({
        sortedData: [1, 2, 3],
        valutazioneId: 10,
        corsoId: 333,
        titolo: 'titolo',
        data: 'data',
        tipologia: 'tipo',
      }),
    }), grigliaValutazioneDettaglioReset())).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_RESET', () => {
    expect(grigliaValutazioniReducer(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipo',
        messaggio: 'messaggio',
      }),
      display: defaultGrigliaValutazioniDisplay.merge({
        field: 'field',
        sort: 'asc',
        type: 'string',
        block: 'block',
      }),
      valutabili: defaultGrigliaValutazioniValutabili.merge({
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
      }),
      selection: defaultGrigliaValutazioniSelection.merge({
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
      }),
      contenuto: defaultGrigliaValutazioniContenuto.merge({
        sortedData: [1, 2, 3],
        isDataLoaded: true,
      }),
      dettaglio: defaultGrigliaValutazioniDettaglio.merge({
        sortedData: [1, 2, 3],
        valutazioneId: 10,
        corsoId: 333,
        titolo: 'titolo',
        data: 'data',
        tipologia: 'tipo',
      }),
    }), grigliaValutazioneReset())).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_SET', () => {
    expect(grigliaValutazioniReducer(fromJS({}), grigliaValutazioneDettaglioStudenteSet({
      isLoaded: true,
      nome: 'nome',
      dataCreazioneValutazione: '1/11/2019',
      corsoNome: 'nome corso',
      corsoId: 10,
      votoMedia: 4,
      verifiche: [1, 2, 3],
      versioni: [4, 5, 6],
      proveCompetenza: [7, 8, 9],
      unita: [4, 3, 2],
      valutazioneId: 110,
      valutazioneTitolo: 'titolo',
      valutazioneTipologia: 'tipologia',
    }))).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente.merge({
        isLoaded: true,
        nome: 'nome',
        dataCreazioneValutazione: '1/11/2019',
        corsoNome: 'nome corso',
        corsoId: 10,
        votoMedia: 4,
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
        proveCompetenza: [7, 8, 9],
        unita: [4, 3, 2],
        valutazioneId: 110,
        valutazioneTitolo: 'titolo',
        valutazioneTipologia: 'tipologia',
      }),
    }));
  });

  it('GRIGLIA_VALUTAZIONI_DETTAGLIO_STUDENTE_RESET', () => {
    expect(grigliaValutazioniReducer(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente.merge({
        isLoaded: true,
        nome: 'nome',
        dataCreazioneValutazione: '1/11/2019',
        corsoNome: 'nome corso',
        corsoId: 10,
        votoMedia: 4,
        verifiche: [1, 2, 3],
        versioni: [4, 5, 6],
        proveCompetenza: [7, 8, 9],
        unita: [4, 3, 2],
        valutazioneId: 110,
        valutazioneTitolo: 'titolo',
        valutazioneTipologia: 'tipologia',
      }),
    }), grigliaValutazioneDettaglioStudenteReset())).toEqual(fromJS({
      spinner: defaultGrigliaValutazioniSpinner,
      feedback: defaultGrigliaValutazioniFeedback,
      display: defaultGrigliaValutazioniDisplay,
      valutabili: defaultGrigliaValutazioniValutabili,
      selection: defaultGrigliaValutazioniSelection,
      contenuto: defaultGrigliaValutazioniContenuto,
      dettaglio: defaultGrigliaValutazioniDettaglio,
      dettaglioStudente: defaultGrigliaValutazioniDettaglioStudente,
    }));
  });
});

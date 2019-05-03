
import { fromJS } from 'immutable';

import provaCompetenzaStatisticheReducer, {
  defaultStatisticaCaricata,
  defaultProvaCompetenzaFeedback,
  defaultProvaCompetenzaStatisticheDidascalia,
} from '../reducer';
import {
  provaCompetenzaStatisticheDataSet,
  provaCompetenzaStatisticheSpinnerSet,
  provaCompetenzaStatisticheDataReset,
  provaCompetenzaStatisticheFeedbackSet,
  provaCompetenzaStatisticheFeedbackReset,
  provaCompetenzaDidascaliaSet,
  provaCompetenzaDidascaliaReset,
} from '../actions';

describe('provaCompetenzaStatisticheReducer', () => {
  it('deve restituire lo stato iniziale', () => {
    expect(provaCompetenzaStatisticheReducer(undefined, {})).toEqual(fromJS({
      spinner: false,
      feedback: defaultProvaCompetenzaFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultProvaCompetenzaStatisticheDidascalia,
    }));
  });

  it('deve settare lo spinner', () => {
    expect(provaCompetenzaStatisticheReducer(
      undefined, provaCompetenzaStatisticheSpinnerSet(true)
    )).toEqual(fromJS({
      spinner: true,
      feedback: defaultProvaCompetenzaFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultProvaCompetenzaStatisticheDidascalia,
    }));
  });

  it('deve settare i dati caricati', () => {
    expect(provaCompetenzaStatisticheReducer(
      undefined, provaCompetenzaStatisticheDataSet({
        iscritti: [1, 2, 3],
        studenti: [3, 4, 5],
        media: { 4: 'media' },
      })
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultProvaCompetenzaFeedback,
      statisticheCaricate: defaultStatisticaCaricata.merge({
        iscritti: [1, 2, 3],
        studenti: [3, 4, 5],
        media: { 4: 'media' },
      }),
      didascalia: defaultProvaCompetenzaStatisticheDidascalia,
    }));
  });

  it('deve settare il feedback', () => {
    expect(provaCompetenzaStatisticheReducer(
      undefined, provaCompetenzaStatisticheFeedbackSet(
        true,
        'tipologia',
        'messaggio'
      )
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultProvaCompetenzaFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultProvaCompetenzaStatisticheDidascalia,
    }));
  });

  it('provaCompetenzaStatisticheDataReset deve riportare tutto allo stato iniziale', () => {
    expect(provaCompetenzaStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultProvaCompetenzaFeedback.merge({
          hasFeedback: true,
          tipologia: 'tipologia',
          messaggio: 'messaggio',
        }),
        statisticheCaricate: defaultStatisticaCaricata.merge({
          iscritti: [1, 2, 3],
          studenti: [3, 4, 5],
          media: { 4: 'media' },
        }),
      }), provaCompetenzaStatisticheDataReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultProvaCompetenzaFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultProvaCompetenzaStatisticheDidascalia,
    }));
  });

  it('provaCompetenzaStatisticheFeedbackReset deve resettare il feedback', () => {
    expect(provaCompetenzaStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultProvaCompetenzaFeedback.merge({
          hasFeedback: true,
          tipologia: 'tipologia',
          messaggio: 'messaggio',
        }),
        statisticheCaricate: defaultStatisticaCaricata,
        didascalia: defaultProvaCompetenzaStatisticheDidascalia,
      }), provaCompetenzaStatisticheFeedbackReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultProvaCompetenzaFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultProvaCompetenzaStatisticheDidascalia,
    }));
  });

  it('provaCompetenzaDidascaliaSet deve settare la didascalia', () => {
    expect(provaCompetenzaStatisticheReducer(
      undefined, provaCompetenzaDidascaliaSet({
        titolo: 'titolo',
        tipologia: 'tipologia',
        display: true,
        campioni: 2,
        y: 1,
      })
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultProvaCompetenzaFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultProvaCompetenzaStatisticheDidascalia.merge({
        titolo: 'titolo',
        tipologia: 'tipologia',
        display: true,
        campioni: 2,
        y: 1,
      }),
    }));
  });

  it('provaCompetenzaDidascaliaReset deve resettare la didascalia', () => {
    expect(provaCompetenzaStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultProvaCompetenzaFeedback,
        statisticheCaricate: defaultStatisticaCaricata,
        didascalia: defaultProvaCompetenzaStatisticheDidascalia.merge({
          titolo: 'titolo',
          tipologia: 'tipologia',
          display: true,
          campioni: 2,
          y: 1,
        }),
      }), provaCompetenzaDidascaliaReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultProvaCompetenzaFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultProvaCompetenzaStatisticheDidascalia,
    }));
  });
});

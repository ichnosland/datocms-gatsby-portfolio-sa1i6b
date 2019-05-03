
import { fromJS } from 'immutable';

import versioniStatisticheReducer, {
  defaultStatisticaCaricata,
  defaultVersioneStatisticheFeedback,
  defaultVersioneStatisticheDidascalia,
} from '../reducer';
import {
  versioniStatisticheDataSet,
  versioniStatisticheSpinnerSet,
  versioniStatisticheDataReset,
  versioniStatisticheFeedbackSet,
  versioniStatisticheFeedbackReset,
  versioniStatisticheDidascaliaSet,
  versioniStatisticheDidascaliaReset,
} from '../actions';

describe('versioniStatisticheReducer', () => {
  it('deve restituire lo stato iniziale', () => {
    expect(versioniStatisticheReducer(undefined, {})).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('deve settare lo spinner', () => {
    expect(versioniStatisticheReducer(
      undefined, versioniStatisticheSpinnerSet(true)
    )).toEqual(fromJS({
      spinner: true,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('deve settare i dati caricati', () => {
    expect(versioniStatisticheReducer(
      undefined, versioniStatisticheDataSet({
        iscritti: [1, 2, 3],
        studenti: [3, 4, 5],
        media: { 4: 'media' },
      })
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata.merge({
        iscritti: [1, 2, 3],
        studenti: [3, 4, 5],
        media: { 4: 'media' },
      }),
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('deve settare il feedback', () => {
    expect(versioniStatisticheReducer(
      undefined, versioniStatisticheFeedbackSet(
        true,
        'tipologia',
        'messaggio'
      )
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback.merge({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('versioniStatisticheDataReset deve riportare tutto allo stato iniziale', () => {
    expect(versioniStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultVersioneStatisticheFeedback.merge({
          hasFeedback: true,
          tipologia: 'tipologia',
          messaggio: 'messaggio',
        }),
        statisticheCaricate: defaultStatisticaCaricata.merge({
          iscritti: [1, 2, 3],
          studenti: [3, 4, 5],
          media: { 4: 'media' },
        }),
        didascalia: defaultVersioneStatisticheDidascalia,
      }), versioniStatisticheDataReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('versioniStatisticheFeedbackReset deve resettare il feedback', () => {
    expect(versioniStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultVersioneStatisticheFeedback.merge({
          hasFeedback: true,
          tipologia: 'tipologia',
          messaggio: 'messaggio',
        }),
        statisticheCaricate: defaultStatisticaCaricata,
        didascalia: defaultVersioneStatisticheDidascalia,
      }), versioniStatisticheFeedbackReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('versioniStatisticheDidascaliaSet deve settare la didascalia', () => {
    expect(versioniStatisticheReducer(
      undefined, versioniStatisticheDidascaliaSet({
        titolo: 'titolo',
        tipologia: 'tipologia',
        display: true,
        campioni: 2,
        y: 1,
      })
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia.merge({
        titolo: 'titolo',
        tipologia: 'tipologia',
        display: true,
        campioni: 2,
        y: 1,
      }),
    }));
  });

  it('versioniStatisticheDidascaliaReset deve resettare la didascalia', () => {
    expect(versioniStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultVersioneStatisticheFeedback,
        statisticheCaricate: defaultStatisticaCaricata,
        didascalia: defaultVersioneStatisticheDidascalia.merge({
          titolo: 'titolo',
          tipologia: 'tipologia',
          display: true,
          campioni: 2,
          y: 1,
        }),
      }), versioniStatisticheDidascaliaReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });
});


import { fromJS } from 'immutable';

import versioniLivelloStatisticheReducer, {
  defaultStatisticaCaricata,
  defaultVersioneStatisticheFeedback,
  defaultVersioneStatisticheDidascalia,
} from '../reducer';
import {
  versioniLivelloStatisticheDataSet,
  versioniLivelloStatisticheSpinnerSet,
  versioniLivelloStatisticheDataReset,
  versioniLivelloStatisticheFeedbackSet,
  versioniLivelloStatisticheFeedbackReset,
  versioniLivelloStatisticheDidascaliaSet,
  versioniLivelloStatisticheDidascaliaReset,
} from '../actions';

describe('versioniLivelloStatisticheReducer', () => {
  it('deve restituire lo stato iniziale', () => {
    expect(versioniLivelloStatisticheReducer(undefined, {})).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('deve settare lo spinner', () => {
    expect(versioniLivelloStatisticheReducer(
      undefined, versioniLivelloStatisticheSpinnerSet(true)
    )).toEqual(fromJS({
      spinner: true,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('deve settare i dati caricati', () => {
    expect(versioniLivelloStatisticheReducer(
      undefined, versioniLivelloStatisticheDataSet({
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
    expect(versioniLivelloStatisticheReducer(
      undefined, versioniLivelloStatisticheFeedbackSet(
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

  it('versioniLivelloStatisticheDataReset deve riportare tutto allo stato iniziale', () => {
    expect(versioniLivelloStatisticheReducer(
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
      }), versioniLivelloStatisticheDataReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('versioniLivelloStatisticheFeedbackReset deve resettare il feedback', () => {
    expect(versioniLivelloStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultVersioneStatisticheFeedback.merge({
          hasFeedback: true,
          tipologia: 'tipologia',
          messaggio: 'messaggio',
        }),
        statisticheCaricate: defaultStatisticaCaricata,
        didascalia: defaultVersioneStatisticheDidascalia,
      }), versioniLivelloStatisticheFeedbackReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('versioniLivelloStatisticheDidascaliaSet deve settare la didascalia', () => {
    expect(versioniLivelloStatisticheReducer(
      undefined, versioniLivelloStatisticheDidascaliaSet({
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

  it('versioniLivelloStatisticheDidascaliaReset deve resettare la didascalia', () => {
    expect(versioniLivelloStatisticheReducer(
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
      }), versioniLivelloStatisticheDidascaliaReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });
});

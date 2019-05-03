
import { fromJS } from 'immutable';

import verificaLivelloStatisticheReducer, {
  defaultStatisticaCaricata,
  defaultVersioneStatisticheFeedback,
  defaultVersioneStatisticheDidascalia,
} from '../reducer';
import {
  verificaLivelloStatisticheDataSet,
  verificaLivelloStatisticheSpinnerSet,
  verificaLivelloStatisticheDataReset,
  verificaLivelloStatisticheFeedbackSet,
  verificaLivelloStatisticheFeedbackReset,
  verificaLivelloStatisticheDidascaliaSet,
  verificaLivelloStatisticheDidascaliaReset,
} from '../actions';

describe('verificaLivelloStatisticheReducer', () => {
  it('deve restituire lo stato iniziale', () => {
    expect(verificaLivelloStatisticheReducer(undefined, {})).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('deve settare lo spinner', () => {
    expect(verificaLivelloStatisticheReducer(
      undefined, verificaLivelloStatisticheSpinnerSet(true)
    )).toEqual(fromJS({
      spinner: true,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('deve settare i dati caricati', () => {
    expect(verificaLivelloStatisticheReducer(
      undefined, verificaLivelloStatisticheDataSet({
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
    expect(verificaLivelloStatisticheReducer(
      undefined, verificaLivelloStatisticheFeedbackSet(
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

  it('verificaLivelloStatisticheDataReset deve riportare tutto allo stato iniziale', () => {
    expect(verificaLivelloStatisticheReducer(
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
      }), verificaLivelloStatisticheDataReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('verificaLivelloStatisticheFeedbackReset deve resettare il feedback', () => {
    expect(verificaLivelloStatisticheReducer(
      fromJS({
        spinner: false,
        feedback: defaultVersioneStatisticheFeedback.merge({
          hasFeedback: true,
          tipologia: 'tipologia',
          messaggio: 'messaggio',
        }),
        statisticheCaricate: defaultStatisticaCaricata,
        didascalia: defaultVersioneStatisticheDidascalia,
      }), verificaLivelloStatisticheFeedbackReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });

  it('verificaLivelloStatisticheDidascaliaSet deve settare la didascalia', () => {
    expect(verificaLivelloStatisticheReducer(
      undefined, verificaLivelloStatisticheDidascaliaSet({
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

  it('verificaLivelloStatisticheDidascaliaReset deve resettare la didascalia', () => {
    expect(verificaLivelloStatisticheReducer(
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
      }), verificaLivelloStatisticheDidascaliaReset()
    )).toEqual(fromJS({
      spinner: false,
      feedback: defaultVersioneStatisticheFeedback,
      statisticheCaricate: defaultStatisticaCaricata,
      didascalia: defaultVersioneStatisticheDidascalia,
    }));
  });
});

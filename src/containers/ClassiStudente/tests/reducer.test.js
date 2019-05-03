
import { fromJS } from 'immutable';

import {
  classiStudenteSet,
  classiStudenteReset,
  classiStudenteFeedbackSet,
  classiStudenteSpinnerSet,
  classiStudenteFeedbackReset,
} from '../actions';
import classiStudenteReducer, { defaultClassiStudenteState } from '../reducer';

describe('classiStudenteReducer', () => {
  it('restituisce lo stato iniziale', () => {
    expect(classiStudenteReducer(undefined, {})).toEqual(fromJS({
      spinner: false,
      feedback: defaultClassiStudenteState,
      list: fromJS([]),
    }));
  });

  it('restituisce lo stato dopo il dispatch di CLASSI_STUDENTE_FEEDBACK_SET', () => {
    expect(classiStudenteReducer(undefined, classiStudenteFeedbackSet(
      true, 'tipologia', 'messaggio'
    ))).toEqual(fromJS({
      spinner: false,
      feedback: fromJS({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      list: fromJS([]),
    }));
  });

  it('restituisce lo stato dopo il dispatch di CLASSI_STUDENTE_SPINNER_SET', () => {
    expect(classiStudenteReducer(undefined, classiStudenteSpinnerSet(
      true
    ))).toEqual(fromJS({
      spinner: true,
      feedback: defaultClassiStudenteState,
      list: fromJS([]),
    }));
  });

  it('restituisce lo stato dopo il dispatch di CLASSI_STUDENTE_FEEDBACK_RESET', () => {
    expect(classiStudenteReducer(fromJS({
      spinner: true,
      feedback: fromJS({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      list: fromJS([1, 2, 3]),
    }), classiStudenteFeedbackReset())).toEqual(fromJS({
      spinner: true,
      feedback: defaultClassiStudenteState,
      list: fromJS([1, 2, 3]),
    }));
  });

  it('restituisce lo stato dopo il dispatch di CLASSI_STUDENTE_SET', () => {
    expect(classiStudenteReducer(undefined, classiStudenteSet(
      [1, 2, 3, 4]
    ))).toEqual(fromJS({
      spinner: false,
      feedback: defaultClassiStudenteState,
      list: fromJS([1, 2, 3, 4]),
    }));
  });

  it('restituisce lo stato dopo il dispatch di CLASSI_STUDENTE_FEEDBACK_RESET', () => {
    expect(classiStudenteReducer(fromJS({
      spinner: true,
      feedback: fromJS({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      list: fromJS([1, 2, 3]),
    }), classiStudenteReset())).toEqual(fromJS({
      spinner: true,
      feedback: fromJS({
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      }),
      list: fromJS([]),
    }));
  });
});


import {
  classiStudenteFetch,
  classiStudenteSet,
  classiStudenteReset,
  classiStudenteIscrivitiPost,
  classiStudenteSpinnerSet,
  classiStudenteFeedbackSet,
  classiStudenteFeedbackReset,
} from '../actions';
import {
  CLASSI_STUDENTE_FETCH,
  CLASSI_STUDENTE_SET,
  CLASSI_STUDENTE_RESET,
  CLASSI_STUDENTE_ISCRIVITI_POST,
  CLASSI_STUDENTE_SPINNER_SET,
  CLASSI_STUDENTE_FEEDBACK_SET,
  CLASSI_STUDENTE_FEEDBACK_RESET,
} from '../constants';

describe('ClassiStudente actions', () => {
  it('CLASSI_STUDENTE_FETCH deve comportarsi come atteso', () => {
    const expected = {
      type: CLASSI_STUDENTE_FETCH,
      disciplinaId: 123,
    };
    expect(classiStudenteFetch(123)).toEqual(expected);
  });

  it('CLASSI_STUDENTE_SET deve comportarsi come atteso', () => {
    const expected = {
      type: CLASSI_STUDENTE_SET,
      payload: { data: 123 },
    };
    expect(classiStudenteSet({ data: 123 })).toEqual(expected);
  });

  it('CLASSI_STUDENTE_RESET deve comportarsi come atteso', () => {
    const expected = {
      type: CLASSI_STUDENTE_RESET,
    };
    expect(classiStudenteReset()).toEqual(expected);
  });

  it('CLASSI_STUDENTE_RESET deve comportarsi come atteso', () => {
    const expected = {
      type: CLASSI_STUDENTE_ISCRIVITI_POST,
      codiceCorso: 'codiceCorso',
      configuration: { data: 123 },
    };
    expect(classiStudenteIscrivitiPost(
      'codiceCorso',
      { data: 123 }
    )).toEqual(expected);
  });

  it('CLASSI_STUDENTE_SPINNER_SET deve comportarsi come atteso', () => {
    const expected = {
      type: CLASSI_STUDENTE_SPINNER_SET,
      enable: true,
    };
    expect(classiStudenteSpinnerSet(true)).toEqual(expected);
  });

  it('CLASSI_STUDENTE_FEEDBACK_SET deve comportarsi come atteso', () => {
    const expected = {
      type: CLASSI_STUDENTE_FEEDBACK_SET,
      enable: true,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    };
    expect(classiStudenteFeedbackSet(
      true, 'tipologia', 'messaggio'
    )).toEqual(expected);
  });

  it('CLASSI_STUDENTE_FEEDBACK_RESET deve comportarsi come atteso', () => {
    const expected = {
      type: CLASSI_STUDENTE_FEEDBACK_RESET,
    };
    expect(classiStudenteFeedbackReset()).toEqual(expected);
  });
});

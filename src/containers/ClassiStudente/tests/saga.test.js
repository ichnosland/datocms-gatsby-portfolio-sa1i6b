import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';

import { userEvaluateTrigger } from 'containers/User/actions';
import {
  classiStudenteIscrivitiPost,
  fetchClassiStudente,
  watchClassiStudente,
} from '../saga';
import {
  classiStudenteFetch,
  classiStudenteSet,
  classiStudenteSpinnerSet,
  classiStudenteFeedbackSet,
  classiStudenteFeedbackReset,
} from '../actions';
import {
  CLASSI_STUDENTE_FETCH,
  CLASSI_STUDENTE_URI_ISCRIVITI_POST,
  CLASSI_STUDENTE_URI_FETCH,
  CLASSI_STUDENTE_ISCRIVITI_POST,
} from '../constants';

/* eslint-disable redux-saga/yield-effects */
describe('classiStudenteIscrivitiPost saga', () => {
  const mockData = {
    configuration: {
      disciplinaId: 33,
    },
    codiceCorso: 'Manon66',
  };

  it('procedura in caso di successo', () => {
    const gen = classiStudenteIscrivitiPost(mockData);

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classiStudenteFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${CLASSI_STUDENTE_URI_ISCRIVITI_POST}`, {
        corso: mockData.codiceCorso,
        disciplina: mockData.configuration.disciplinaId,
      }
    ));

    expect(gen.next({ status: 200 }).value).toEqual(put(classiStudenteFeedbackSet(
      true,
      'okay',
      'La tua iscrizione è avvenuta correttamente'
    )));

    expect(gen.next().value).toEqual(put(classiStudenteFetch(
      mockData.configuration.disciplinaId
    )));
    expect(gen.next().value).toEqual(put(userEvaluateTrigger(
      mockData.configuration
    )));
    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(false)));
  });

  it('procedura in caso di successo quando la risposta non è 200', () => {
    const gen = classiStudenteIscrivitiPost(mockData);

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classiStudenteFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${CLASSI_STUDENTE_URI_ISCRIVITI_POST}`, {
        corso: mockData.codiceCorso,
        disciplina: mockData.configuration.disciplinaId,
      }
    ));

    expect(gen.next({ status: 400 }).value).toEqual(put(classiStudenteFeedbackSet(
      true,
      'error',
      'Il codice inserito non è valido'
    )));

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(false)));
  });

  it('procedura in caso di errore', () => {
    const gen = classiStudenteIscrivitiPost(mockData);

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classiStudenteFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${CLASSI_STUDENTE_URI_ISCRIVITI_POST}`, {
        corso: mockData.codiceCorso,
        disciplina: mockData.configuration.disciplinaId,
      }
    ));

    expect(gen.next().value).toEqual(put(classiStudenteFeedbackSet(
      true,
      'error',
      'Il codice inserito non è valido'
    )));

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(false)));
  });
});

describe('fetchClassiStudente saga', () => {
  const mockData = {
    disciplinaId: 33,
  };

  it('procedura in caso di successo', () => {
    const gen = fetchClassiStudente(mockData);

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classiStudenteFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSI_STUDENTE_URI_FETCH}${mockData.disciplinaId}`
    ));

    expect(
      gen.next({ data: [1, 2, 3] }).value
    ).toEqual(put(classiStudenteSet([1, 2, 3])));

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(false)));
  });

  it('procedura in caso di errore', () => {
    const gen = fetchClassiStudente(mockData);

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classiStudenteFeedbackReset()));

    expect(gen.next().value).toEqual(call(
      axios.get,
      `${API_BASE_PATH}${CLASSI_STUDENTE_URI_FETCH}${mockData.disciplinaId}`
    ));

    expect(
      gen.next().value
    ).toEqual(put(classiStudenteFeedbackSet(
      true,
      'error',
      'Impossibile iscriversi a questa classe'
    )));

    expect(gen.next().value).toEqual(put(classiStudenteSpinnerSet(false)));
  });
});

describe('watchClassiStudente saga', () => {
  it('procedura in caso di successo', () => {
    const gen = watchClassiStudente();

    expect(gen.next().value).toEqual(
      takeEvery(CLASSI_STUDENTE_ISCRIVITI_POST, classiStudenteIscrivitiPost)
    );

    expect(gen.next().value).toEqual(
      takeEvery(CLASSI_STUDENTE_FETCH, fetchClassiStudente)
    );
  });
});

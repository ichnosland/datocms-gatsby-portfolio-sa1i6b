import { fromJS } from 'immutable';

import classiReducer, {
  defaultClassiError,
} from '../reducer';
import {
  classiDataFetch,
  classiDataSet,
  classiDataReset,
  classiFeedbackReset,
  classiFeedbackSet,
  classiSpinnerSet,
} from '../actions';


describe('classiReducer reducer', () => {
  const constMockClassi = fromJS({
    spinner: true,
    classiData: [],
    error: defaultClassiError,
  });

  it('should return the initial state when no state is provided', () => {
    expect(
      classiReducer(undefined, { type: undefined })
    ).toEqual(constMockClassi);
  });

  it('should return the initial state when CLASSI_DATA_FETCH action is provided', () => {
    expect(
      classiReducer(constMockClassi, classiDataFetch())
    ).toEqual(constMockClassi);
  });

  it('should return the initial state when CLASSI_DATA_SET action is provided', () => {
    expect(
      classiReducer(constMockClassi, classiDataSet([{
        nome: 'nome',
        pk: 1234,
        corsi: [{
          nome: 'nomeCorso',
          applied: 18,
          pk: 4321,
        }],
      }, {
        nome: 'nome',
        pk: 1234,
        corsi: [{
          nome: 'nomeCorso',
          applied: 0,
          pk: 4321,
        }],
      }, {
        nome: 'nome',
        pk: 1234,
        corsi: [{
          nome: 'nomeCorso',
          applied: undefined,
          pk: 4321,
        }],
      }]))
    ).toEqual(constMockClassi.merge({
      classiData: [{
        nome: 'nome',
        pk: 1234,
        corsi: [{
          nome: 'nomeCorso',
          applied: 18,
          pk: 4321,
        }],
      }, {
        nome: 'nome',
        pk: 1234,
        corsi: [{
          nome: 'nomeCorso',
          applied: 0,
          pk: 4321,
        }],
      }, {
        nome: 'nome',
        pk: 1234,
        corsi: [{
          nome: 'nomeCorso',
          applied: undefined,
          pk: 4321,
        }],
      }],
    }));
  });

  it('should return the initial state when CLASSI_SPINNER_SET action is provided', () => {
    expect(
      classiReducer(constMockClassi, classiSpinnerSet(true))
    ).toEqual(constMockClassi.merge({
      spinner: true,
    }));
  });

  it('should return the initial state when CLASSI_FEEDBACK_SET action is provided', () => {
    expect(
      classiReducer(undefined, classiFeedbackSet(true, 'Errore'))
    ).toEqual(constMockClassi.merge({
      spinner: false,
      error: {
        hasErrors: true,
        errorMessage: 'Errore',
        errorData: {},
      },
    }));
  });

  it('should return the initial state when CLASSI_FEEDBACK_RESET action is provided', () => {
    expect(
      classiReducer(constMockClassi.merge({
        error: {
          hasErrors: true,
          errorMessage: 'Errore',
          errorData: {},
        },
      }), classiFeedbackReset())
    ).toEqual(constMockClassi);
  });

  it('should return the initial state when CLASSI_DATA_RESET action is provided', () => {
    expect(
      classiReducer(constMockClassi.merge({
        classiData: {
          nome: 'nome',
          pk: 1234,
          corsi: {
            nome: 'nomeCorso',
            applied: 18,
            pk: 4321,
          },
        },
      }), classiDataReset())
    ).toEqual(constMockClassi);
  });
});

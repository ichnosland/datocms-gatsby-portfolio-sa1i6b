/*
 *
 * TestoIntroduttivo actions
 *
 */

import {
  TESTOINTRODUTTIVO_DATA_FETCH,
  TESTOINTRODUTTIVO_DATA_SET,
  TESTOINTRODUTTIVO_DATA_RESET,
  TESTOINTRODUTTIVO_ERROR_RESET,
  TESTOINTRODUTTIVO_ERROR_SET,
  TESTOINTRODUTTIVO_SPINNER_SET,
} from './constants';

export const testoIntroduttivoDataFetch = (idTestoIntroduttivo) => ({
  type: TESTOINTRODUTTIVO_DATA_FETCH,
  idTestoIntroduttivo,
});

export const testoIntroduttivoDataSet = (payload) => ({
  type: TESTOINTRODUTTIVO_DATA_SET,
  payload,
});

export const testoIntroduttivoDataReset = () => ({
  type: TESTOINTRODUTTIVO_DATA_RESET,
});

export const testoIntroduttivoErrorReset = () => ({
  type: TESTOINTRODUTTIVO_ERROR_RESET,
});

export const testoIntroduttivoErrorSet = (enable = true, message = '', errorData = {}) => ({
  type: TESTOINTRODUTTIVO_ERROR_SET,
  enable,
  message,
  errorData,
});

export const testoIntroduttivoSpinnerSet = (enable) => ({
  type: TESTOINTRODUTTIVO_SPINNER_SET,
  enable,
});

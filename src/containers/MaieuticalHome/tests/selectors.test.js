import { fromJS } from 'immutable';

import {
  makeSelectConfirmMessage,
  makeSelectErrorMessage,
  makeSelectSpinner,
  selectMaieuticalHomeDomain,
} from '../selectors';

describe('selectMaieuticalHomeDomain', () => {
  it('should select the maieuticalHome state', () => {
    const maieuticalHomeState = fromJS({
      spinner: false,
      errorMessage: '',
      confirmMessage: '',
    });
    const mockedState = fromJS({
      maieuticalHome: maieuticalHomeState,
    });
    expect(selectMaieuticalHomeDomain(mockedState)).toEqual(maieuticalHomeState);
  });
});

describe('makeSelectSpinner', () => {
  const spinnerSelector = makeSelectSpinner();
  it('should select the spinner', () => {
    const spinner = false;
    const mockedState = fromJS({
      maieuticalHome: {
        spinner,
      },
    });
    expect(spinnerSelector(mockedState)).toEqual(spinner);
  });
});

describe('makeSelectErrorMessage', () => {
  const errorMessageSelector = makeSelectErrorMessage();
  it('should select the errorMessage', () => {
    const errorMessage = '';
    const mockedState = fromJS({
      maieuticalHome: {
        errorMessage,
      },
    });
    expect(errorMessageSelector(mockedState)).toEqual(errorMessage);
  });
});

describe('makeSelectConfirmMessage', () => {
  const confirmMessageSelector = makeSelectConfirmMessage();
  it('should select the confirmMessage', () => {
    const confirmMessage = '';
    const mockedState = fromJS({
      maieuticalHome: {
        confirmMessage,
      },
    });
    expect(confirmMessageSelector(mockedState)).toEqual(confirmMessage);
  });
});

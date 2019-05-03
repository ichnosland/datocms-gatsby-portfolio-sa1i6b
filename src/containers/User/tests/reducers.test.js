import { fromJS } from 'immutable';

import userReducer, {
  defaultAuthentication,
  defaultAppData,
  defaultErrorSettings,
  defaultAnagraphicsSettings,
} from '../reducer';
import {
  userDataSet,
  userDataFetch,
  userLogoutSet,
  userSpinnerSet,
  userErrorClean,
  userErrorSet,
} from '../actions';

const mockInitialState = {
  anagraphics: {},
  authentication: defaultAuthentication.toJS(),
  appData: defaultAppData.toJS(),
  spinner: false,
  error: defaultErrorSettings.toJS(),
};

const mockPopulatedState = {
  ...mockInitialState,
  anagraphics: {
    dataUno: 12,
    dataDue: 34,
  },
  authentication: {
    ...mockInitialState.authentication,
    authorizationToken: 'token di auth',
  },
  appData: {
    ...mockInitialState.appData,
    docente: true,
  },
  spinner: true,
};

describe('userReducer', () => {
  it('should return the initial combined state', () => {
    expect(userReducer(fromJS({}), { type: undefined })).toEqual(fromJS({
      anagraphics: defaultAnagraphicsSettings,
      authentication: defaultAuthentication,
      appData: defaultAppData,
      spinner: fromJS(false),
      error: defaultErrorSettings,
    }));
  });

  it('should return the initial combined state on USER_LOGOUT_SET', () => {
    expect(userReducer(fromJS(mockPopulatedState), userLogoutSet())).toEqual(fromJS({
      anagraphics: defaultAnagraphicsSettings,
      authentication: defaultAuthentication,
      appData: defaultAppData,
      spinner: true,
      error: defaultErrorSettings.toJS(),
    }));
  });

  it('should return the initial combined state on USER_ERROR_CLEAN', () => {
    expect(userReducer(fromJS({
      ...mockPopulatedState,
      error: {
        hasErrors: true,
        errorMessage: 'Errore',
        errorData: { data: 123 },
      },
    }), userErrorClean())).toEqual(fromJS({
      ...mockPopulatedState,
      error: {
        hasErrors: false,
        errorMessage: '',
        errorData: undefined,
        tipologia: 'error',
      },
    }));
  });

  it('should return the initial combined state on USER_ERROR_SET', () => {
    expect(userReducer(fromJS(mockPopulatedState), userErrorSet(
      true, 'Errore', { data: 123 }, 'okay'
    ))).toEqual(fromJS({
      ...mockPopulatedState,
      spinner: false,
      error: {
        hasErrors: true,
        errorMessage: 'Errore',
        errorData: { data: 123 },
        tipologia: 'okay',
      },
    }));
  });

  it('should return the initial combined state on USER_SPINNER_SET', () => {
    expect(userReducer(fromJS(mockPopulatedState), userSpinnerSet(true))).toEqual(fromJS({
      ...mockPopulatedState,
      spinner: true,
    }));
  });

  it('should return USER_FETCH_DATA combined state', () => {
    expect(userReducer(fromJS({}), userDataFetch({
      username: 'test', password: 'test',
    })).toJS()).toEqual({
      anagraphics: defaultAnagraphicsSettings.toJS(),
      authentication: defaultAuthentication.toJS(),
      appData: defaultAppData.toJS(),
      spinner: false,
      error: defaultErrorSettings.toJS(),
    });
  });

  it('should return USER_SET_DATA combined state', () => {
    expect(userReducer(fromJS({}), userDataSet({
      anagraphics: { email: 'nuova_email@acme.com' },
      authentication: { logged: true },
      appData: { assegnazioni: [1, 2, 3] },
    })).toJS()).toEqual({
      anagraphics: defaultAnagraphicsSettings.merge({ email: 'nuova_email@acme.com' }).toJS(),
      authentication: {
        ...defaultAuthentication.toJS(),
        logged: true,
      },
      appData: {
        ...defaultAppData.toJS(),
        assegnazioni: [1, 2, 3],
      },
      spinner: false,
      error: defaultErrorSettings.toJS(),
    });
  });
});


describe('defaultAuthentication w/ APP_AUTH_TOKEN', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  it('APP_AUTH_TOKEN must inherit process.env.TOKEN value and must call setAuthorizationToken', () => {
    process.env.TOKEN = 'token';
    const commonAuthData = require('common/authorization'); // eslint-disable-line global-require
    const spy = jest.spyOn(commonAuthData, 'setAuthorizationToken');
    expect(spy).not.toHaveBeenCalled();

    const defaultTokenReloaded = require('../reducer').defaultAuthentication; // eslint-disable-line global-require

    expect(spy).toHaveBeenCalledWith('Token token');
    expect(defaultTokenReloaded.toJS()).toEqual({
      logged: true,
      isDataSynced: true,
      isUpdating: false,
      status: '',
      authorizationToken: 'Token token',
      codiceSbloccato: false,
      codiceDaSbloccare: false,
    });
  });
});

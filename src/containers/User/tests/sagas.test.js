import React from 'react';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { API_BASE_PATH } from 'configuration';
import { MODAL_SET_DATA } from 'containers/ModalBox/constants';
import { corsiListInitialize, corsiReset } from 'containers/Corsi/actions';
import { livelliReset } from 'containers/Dashboard/actions';
import { cookieSet } from 'common/cookies';
import { setAuthorizationToken } from 'common/authorization';
import { modalSetData } from 'containers/ModalBox/actions';
import Page from 'components/Page';
import Container from 'components/Container';
import HtmlInjector from 'components/NewListPanels/HtmlInjector';

import * as actions from '../actions';
import * as constants from '../constants';
import * as sagas from '../saga';


const mockConfiguration = {
  product: 'mytestmatematica',
  hasPremium: false,
  disciplinaId: 123,
  homePage: '/homepagepath',
  enabledHints: {
    dashboard: true,
    stepG: true,
    stepUP: true,
  },
};

const mockDataResponse = {
  email: 'acme@acme.com',
  id: 666,
  studenteAcademy: {
    docente: true,
    id: 999,
  },
};

const mockUserDataSet = {
  anagraphics: {
    id: 666,
    email: mockDataResponse.email,
    studenteAcademy: {
      docente: true,
      id: 999,
    },
  },
  appData: {
    docente: true,
    enableSuoni: true,
    hints: {
      dashboard: true,
      stepG: true,
      stepUP: true,
    },
  },
  authentication: {
    authorizationToken: 'Token token',
    logged: true,
  },
};

/* eslint-disable redux-saga/yield-effects */

describe('userEvaluate saga', () => {
  it('should work as expected when cookieData is set', () => {
    const gen = sagas.userEvaluate({ configuration: mockConfiguration });

    expect(gen.next().value).toEqual(put(
      actions.userDataSet({
        authentication: {
          isUpdating: true,
          isDataSynced: false,
        },
      })
    ));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      actions.userErrorClean()
    ));

    Cookies.set('authorizationToken_mytestmatematica', '12345', { expires: 30 });

    expect(gen.next().value).toEqual(put(
      actions.userResumeTrigger({ configuration: mockConfiguration })
    ));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('should work as expected when cookieData is set but no token is available', () => {
    const gen = sagas.userEvaluate({ configuration: mockConfiguration });

    expect(gen.next().value).toEqual(put(
      actions.userDataSet({
        authentication: {
          isUpdating: true,
          isDataSynced: false,
        },
      })
    ));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      actions.userErrorClean()
    ));

    Cookies.set('authorizationToken_mytestmatematica', '');

    expect(gen.next().value).toEqual(put(
      actions.userDataSet({
        authentication: {
          isUpdating: false,
          isDataSynced: true,
        },
        appData: {
          hints: {
            dashboard: true,
            stepG: true,
            stepUP: true,
          },
        },
      })
    ));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('should work as expected when cookieData is set but no token is not set', () => {
    const gen = sagas.userEvaluate({
      configuration: mockConfiguration,
    });

    expect(gen.next().value).toEqual(put(
      actions.userDataSet({
        authentication: {
          isUpdating: true,
          isDataSynced: false,
        },
      })
    ));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      actions.userErrorClean()
    ));

    Cookies.remove('authorizationToken_mytestmatematica', '');

    expect(gen.next().value).toEqual(put(
      actions.userDataSet({
        authentication: {
          isUpdating: false,
          isDataSynced: true,
        },
        appData: {
          hints: {
            dashboard: true,
            stepG: true,
            stepUP: true,
          },
        },
      })
    ));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });
});

describe('userResume saga', () => {
  const mockResumeData = {
    payload: {
      configuration: mockConfiguration,
      dispatch: () => { },
    },
  };

  const resumeMockCall = call(
    axios.get,
    `${API_BASE_PATH}${constants.USER_URL_RESUME_ENDPOINT}`, {
      params: {
        disciplina: mockConfiguration.disciplinaId,
      },
    }
  );

  it('should work as expected when operation is successful and premium is NOT required', () => {
    const gen = sagas.userResume(mockResumeData);

    expect(gen.next().value).toEqual(resumeMockCall);

    expect(gen.next({
      data: mockDataResponse,
    }).value).toEqual(put(
      actions.userDataSet({
        anagraphics: mockUserDataSet.anagraphics,
        appData: mockUserDataSet.appData,
        authentication: {
          logged: true,
          isDataSynced: true,
          isUpdating: false,
        },
      })
    ));

    expect(gen.next({
      data: mockDataResponse,
    }).value).toEqual(put(
      actions.userNotificheFetch({
        disciplinaId: 123,
        product: 'mytestmatematica',
        dispatch: mockResumeData.payload.dispatch,
        userId: 999,
      })
    ));

    expect(gen.next({
      data: mockDataResponse,
    }).value).toEqual(undefined);
  });

  it('should work as expected when operation is successful and enabledHints == undefined', () => {
    const dispatch = () => { };
    const gen = sagas.userResume({
      ...mockResumeData,
      payload: {
        ...mockDataResponse.payload,
        dispatch,
        configuration: {
          ...mockResumeData.payload.configuration,
          enabledHints: undefined,
          aaa: true,
        },
      },
    });

    gen.next();

    expect(gen.next({
      data: mockDataResponse,
    }).value).toEqual(put(
      actions.userDataSet({
        anagraphics: mockUserDataSet.anagraphics,
        appData: {
          ...mockUserDataSet.appData,
          hints: {},
        },
        authentication: {
          logged: true,
          isDataSynced: true,
          isUpdating: false,
        },
      })
    ));

    expect(gen.next({
      data: mockDataResponse,
    }).value).toEqual(put(
      actions.userNotificheFetch({
        disciplinaId: 123,
        product: 'mytestmatematica',
        dispatch,
        userId: 999,
      })
    ));
  });

  it('should work as expected on data retrieval failure', () => {
    const dispatch = () => { };
    const gen = sagas.userResume({
      payload: {
        configuration: mockConfiguration,
        dispatch,
      },
    });

    gen.next();
    expect(gen.throw('errore').value).toEqual(put(
      actions.userErrorSet(
        true,
        'La tua sessione è scaduta, effettua di nuovo il login',
        {}
      )
    ));

    expect(gen.next().value).toEqual(put(
      actions.userDataSet({
        authentication: {
          isDataSynced: true,
          isUpdating: false,
        },
        appData: {
          hints: {
            dashboard: true,
            stepG: true,
            stepUP: true,
          },
        },
      })
    ));
  });

  it('should work as expected when operation is successful and premium is required', () => {
    const dispatch = () => { };
    const gen = sagas.userResume({
      ...mockResumeData,
      payload: {
        dispatch,
        configuration: {
          ...mockResumeData.payload.configuration,
          hasPremium: true,
        },
      },
    });

    expect(gen.next().value).toEqual(resumeMockCall);

    expect(gen.next({
      data: {
        ...mockDataResponse,
        studenteAcademy: {
          docente: false,
          id: 999,
        },
      },
    }).value).toEqual(put(
      actions.userDataSet({
        anagraphics: {
          ...mockUserDataSet.anagraphics,
          studenteAcademy: {
            ...mockUserDataSet.anagraphics.studenteAcademy,
            docente: false,
          },
        },
        appData: {
          ...mockUserDataSet.appData,
          docente: false,
        },
        authentication: {
          logged: true,
          isDataSynced: true,
          isUpdating: false,
        },
      })
    ));

    expect(gen.next({ configuration: { ...mockConfiguration, hasPremium: true } }).value).toEqual(put(
      actions.userCodiceSbloccoFetch(123)
    ));

    expect(gen.next({
      data: mockDataResponse,
    }).value).toEqual(put(
      actions.userNotificheFetch({
        disciplinaId: 123,
        product: 'mytestmatematica',
        dispatch,
        userId: 999,
      })
    ));
  });

  it('should work as expected when operation is successful and configuration.hasClassi = true', () => {
    const dispatch = () => { };
    const mockResponse = {
      ...mockDataResponse,
      studenteAcademy: {
        docente: false,
        id: 999,
      },
    };
    const gen = sagas.userResume({
      ...mockResumeData,
      payload: {
        dispatch,
        configuration: {
          ...mockResumeData.payload.configuration,
          hasClassi: true,
        },
      },
    });

    expect(gen.next().value).toEqual(resumeMockCall);

    expect(gen.next({
      data: mockResponse,
    }).value).toEqual(put(
      actions.userDataSet({
        anagraphics: {
          ...mockUserDataSet.anagraphics,
          studenteAcademy: {
            ...mockUserDataSet.anagraphics.studenteAcademy,
            docente: false,
          },
        },
        appData: {
          ...mockUserDataSet.appData,
          docente: false,
        },
        authentication: {
          logged: true,
          isDataSynced: true,
          isUpdating: false,
        },
      })
    ));

    expect(gen.next().value).toEqual(put(
      corsiListInitialize({
        ...mockConfiguration,
        hasClassi: true,
      }, false, 999)
    ));

    expect(gen.next({
      data: mockResponse,
    }).value).toEqual(put(
      actions.userNotificheFetch({
        disciplinaId: 123,
        product: 'mytestmatematica',
        dispatch,
        userId: 999,
      })
    ));
  });
});

describe('loadUserData saga', () => {
  const loginData = {
    email: 'aaa@maieuticallabs.it',
    password: '123',
  };
  const dispatch = () => { };

  const mockCallData = call(
    axios.post,
    `${API_BASE_PATH}${constants.USER_URL_LOGIN_ENDPOINT}`, {
      disciplina: mockConfiguration.disciplinaId,
    }, {
      headers: {
        Authorization: 'Basic YWFhQG1haWV1dGljYWxsYWJzLml0OjEyMw==',
      },
    }
  );

  const history = { push: jest.fn() };

  it('loadUserData must work as expected if successful if no premium registration needed and payload.isFacebook == false', () => {
    const gen = sagas.loadUserData({ dispatch, loginData, configuration: mockConfiguration, history, isFacebook: false });

    expect(gen.next().value).toEqual(put(
      actions.userErrorClean()
    ));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(mockCallData);

    expect(gen.next({
      data: {
        token: 'token',
        user: {
          email: 'acme@acme.com',
          id: 666,
          studenteAcademy: {
            docente: true,
            id: 999,
          },
        },
      },
    }).value).toEqual(put(actions.userDataSet(mockUserDataSet)));

    expect(gen.next().value).toEqual(call(cookieSet, {
      cookieKey: 'authorizationToken_mytestmatematica',
      payload: 'Token token',
    }));

    expect(gen.next().value).toEqual(put(actions.userNotificheFetch({
      disciplinaId: 123,
      dispatch,
      userId: 999,
      product: 'mytestmatematica',
    })));

    expect(gen.next().value).toEqual(call(history.push, '/homepagepath'));

    expect(gen.next().value).toEqual(put(actions.userDataSet({
      authentication: {
        isUpdating: false,
        isDataSynced: true,
      },
    })));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('loadUserData must work as expected if successful and enabledHints == undefined', () => {
    const gen = sagas.loadUserData({
      loginData,
      configuration: {
        ...mockConfiguration,
        enabledHints: undefined,
      },
      history,
      isFacebook: false,
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      data: {
        token: 'token',
        user: {
          email: 'acme@acme.com',
          id: 666,
          studenteAcademy: {
            docente: true,
            id: 999,
          },
        },
      },
    }).value).toEqual(put(actions.userDataSet({
      ...mockUserDataSet,
      appData: {
        ...mockUserDataSet.appData,
        hints: {},
      },
    })));
  });

  it('loadUserData must work as expected if successful if no premium registration needed and payload.isFacebook == true', () => {
    const gen = sagas.loadUserData({
      dispatch,
      loginData: {
        ...loginData,
        fbname: 'fbname',
        fbuid: 'fbuid',
        fbtoken: 'fbtoken',
        register: true,
      },
      configuration: mockConfiguration,
      history,
      isFacebook: true,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.USER_URL_LOGIN_FACEBOOK_ENDPOINT}`, {
        disciplina: mockConfiguration.disciplinaId,
        email: loginData.email,
        fbname: 'fbname',
        fbuid: 'fbuid',
        fbtoken: 'fbtoken',
        register: true,
      }
    ));

    expect(gen.next({
      data: {
        user: mockDataResponse,
        fbhash: 'fbhash',
        token: 'tokenfacebook',
      },
    }).value).toEqual(put(actions.userDataSet({
      ...mockUserDataSet,
      authentication: {
        ...mockUserDataSet.authentication,
        authorizationToken: 'Basic YWFhQG1haWV1dGljYWxsYWJzLml0OmZiaGFzaA==',
      },
    })));

    expect(gen.next().value).toEqual(call(cookieSet, {
      cookieKey: 'authorizationToken_mytestmatematica',
      payload: 'Basic YWFhQG1haWV1dGljYWxsYWJzLml0OmZiaGFzaA==',
    }));

    expect(gen.next().value).toEqual(put(actions.userNotificheFetch({
      disciplinaId: 123,
      dispatch,
      userId: 999,
      product: 'mytestmatematica',
    })));

    expect(gen.next().value).toEqual(call(history.push, '/homepagepath'));

    expect(gen.next().value).toEqual(put(actions.userDataSet({
      authentication: {
        isUpdating: false,
        isDataSynced: true,
      },
    })));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('loadUserData must work as expected if successful if no premium registration needed and not mytest-ish app', () => {
    const gen = sagas.loadUserData({ dispatch, loginData, configuration: { ...mockConfiguration, product: 'productname' }, history });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(mockCallData);

    expect(gen.next({
      data: {
        token: 'token',
        user: {
          email: 'acme@acme.com',
          id: 666,
          studenteAcademy: {
            docente: true,
            id: 999,
          },
        },
      },
    }).value).toEqual(put(actions.userDataSet(mockUserDataSet)));

    expect(gen.next().value).toEqual(call(cookieSet, {
      cookieKey: 'authorizationToken_productname',
      payload: 'Token token',
    }));

    expect(gen.next().value).toEqual(put(actions.userNotificheFetch({
      disciplinaId: 123,
      dispatch,
      userId: 999,
      product: 'productname',
    })));

    expect(gen.next().value).toEqual(call(history.push, '/homepagepath'));

    expect(gen.next().value).toEqual(put(actions.userDataSet({
      authentication: {
        isUpdating: false,
        isDataSynced: true,
      },
    })));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('loadUserData must work as expected if successful AND docente AND hasClassi = true', () => {
    const gen = sagas.loadUserData({
      loginData,
      dispatch,
      configuration: {
        ...mockConfiguration,
        hasClassi: true,
      },
      history,
    });

    expect(gen.next().value).toEqual(put(actions.userErrorClean()));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));

    expect(gen.next().value).toEqual(mockCallData);

    expect(
      gen.next({
        data: {
          token: 'token',
          user: {
            email: 'acme@acme.com',
            id: 666,
            studenteAcademy: {
              docente: true,
              id: 999,
            },
          },
        },
      }).value
    ).toEqual(put(actions.userDataSet(mockUserDataSet)));

    expect(gen.next().value).toEqual(call(cookieSet, {
      cookieKey: 'authorizationToken_mytestmatematica',
      payload: 'Token token',
    }));
    expect(gen.next().value).toEqual(put(corsiListInitialize({
      ...mockConfiguration,
      hasClassi: true,
    }, true, 999)));

    expect(gen.next().value).toEqual(put(actions.userNotificheFetch({
      disciplinaId: 123,
      dispatch,
      userId: 999,
      product: 'mytestmatematica',
    })));

    expect(gen.next().value).toEqual(call(history.push, '/homepagepath'));

    expect(gen.next().value).toEqual(put(actions.userDataSet({
      authentication: {
        isUpdating: false,
        isDataSynced: true,
      },
    })));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('loadUserData must work as expected if successful AND studente AND premium registration needed (studente)', () => {
    const gen = sagas.loadUserData({
      loginData,
      dispatch,
      configuration: { ...mockConfiguration, hasPremium: true },
      history,
    });

    gen.next();
    gen.next();

    expect(gen.next().value).toEqual(mockCallData);

    expect(
      gen.next({
        data: { user: { ...mockDataResponse, studenteAcademy: { docente: false, id: 999 } } },
      }).value
    ).toEqual(put(actions.userDataSet({
      ...mockUserDataSet,
      anagraphics: {
        ...mockUserDataSet.anagraphics,
        studenteAcademy: {
          ...mockUserDataSet.studenteAcademy,
          docente: false,
          id: 999,
        },
      },
      appData: {
        ...mockUserDataSet.appData,
        docente: false,
      },
      authentication: {
        ...mockUserDataSet.authentication,
        authorizationToken: 'Token ',
      },
    })));

    expect(gen.next({ configuration: { ...mockConfiguration, hasPremium: true } }).value).toEqual(put(
      actions.userCodiceSbloccoFetch(123)
    ));

    expect(gen.next().value).toEqual(call(cookieSet, {
      cookieKey: 'authorizationToken_mytestmatematica',
      payload: 'Token ',
    }));

    expect(gen.next().value).toEqual(put(actions.userNotificheFetch({
      disciplinaId: 123,
      dispatch,
      userId: 999,
      product: 'mytestmatematica',
    })));

    expect(gen.next().value).toEqual(call(history.push, '/homepagepath'));

    expect(gen.next().value).toEqual(put(actions.userDataSet({
      authentication: {
        isUpdating: false,
        isDataSynced: true,
      },
    })));

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('loadUserData must work as expected on generic failure', () => {
    const gen = sagas.loadUserData({ loginData, configuration: mockConfiguration });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile effettuare il login', {})
    ));

    gen.next();

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('loadUserData must work as expected on generic failure and empty response', () => {
    const gen = sagas.loadUserData({ loginData, configuration: mockConfiguration });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw({ response: undefined }).value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile effettuare il login', {})
    ));

    gen.next();

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('loadUserData must work as expected on generic failure and response empty object', () => {
    const gen = sagas.loadUserData({ loginData, configuration: mockConfiguration });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw({ response: {} }).value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile effettuare il login', {})
    ));

    gen.next();

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });

  it('loadUserData must work as expected on generic failure and empty response.status === 401', () => {
    const gen = sagas.loadUserData({ loginData, configuration: mockConfiguration });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw({ response: { status: 401 } }).value).toEqual(put(
      actions.userErrorSet(true, 'Email e/o password errati', { status: 401 })
    ));

    gen.next();

    expect(gen.next().value).toEqual(put(
      actions.userSpinnerSet(false)
    ));
  });
});


describe('checkCodiceSblocco saga', () => {
  const mockCodiceSbloccatoCall = call(
    axios.get,
    `${API_BASE_PATH}${constants.USER_URL_CODICE_SBLOCCO}`, {}
  );

  it('should work as expected when operation is successful and codiceSbloccato == true', () => {
    const gen = sagas.checkCodiceSblocco(mockConfiguration);

    expect(gen.next().value).toEqual(put(
      actions.userErrorClean()
    ));

    expect(gen.next().value).toEqual(mockCodiceSbloccatoCall);

    expect(gen.next({
      data: [{
        disciplina: mockConfiguration.disciplinaId,
        fine_sblocco: '2019-06-10',
        inizio_sblocco: '2010-10-01',
      }, {
        disciplina: mockConfiguration.disciplinaId,
        fine_sblocco: '2020-10-01',
        inizio_sblocco: '2010-10-01',
      }, {
        disciplina: mockConfiguration.disciplinaId,
        fine_sblocco: '2017-10-01',
        inizio_sblocco: '2010-10-01',
      }, {
        disciplina: mockConfiguration.disciplinaId,
        fine_sblocco: '2020-10-01',
        inizio_sblocco: '2010-10-01',
      }],
    }).value).toEqual(put(
      actions.userDataSet({
        authentication: {
          codiceSbloccato: true,
          codiceDaSbloccare: false,
        },
        appData: {
          premiumDataScadenza: '2020-10-01',
        },
      })
    ));
  });

  it('should work as expected when operation is successful and codiceSbloccato == false', () => {
    const gen = sagas.checkCodiceSblocco(mockConfiguration);

    gen.next();
    gen.next();

    expect(gen.next({ data: [] }).value).toEqual(put(
      actions.userDataSet({
        authentication: {
          codiceSbloccato: false,
          codiceDaSbloccare: true,
        },
        appData: {
          premiumDataScadenza: undefined,
        },
      })
    ));
  });

  it('should work as expected when operation is not successful', () => {
    const gen = sagas.checkCodiceSblocco(mockConfiguration);

    expect(gen.next().value).toEqual(put(
      actions.userErrorClean()
    ));

    expect(gen.next().value).toEqual(mockCodiceSbloccatoCall);

    expect(gen.next().value).toEqual(put(
      actions.userErrorSet(
        true,
        'Impossibile attivare il codice di sblocco',
        new TypeError('Cannot read property \'data\' of undefined'),
      )
    ));
  });
});

describe('userLogout saga', () => {
  const history = {
    push: () => { },
  };
  it('userLogout saga should work as expected when configuration.hasClassi == false && logoutAll == false', () => {
    const gen =
      sagas.userLogout({
        payload: {
          logoutAll: false,
          configuration: {
            hasClassi: false,
            product: 'productname',
          },
          history,
        },
      });

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.USER_URL_LOGOUT_ENDPOINT}`
    ));
    expect(gen.next().value).toEqual(put(actions.userLogoutSet()));
    expect(gen.next().value).toEqual(call(Cookies.remove, 'authorizationToken_productname'));
    expect(gen.next().value).toEqual(call(setAuthorizationToken, ''));
    expect(gen.next().value).toEqual(call(history.push, '/login'));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
    expect(gen.next().value).toEqual(put(livelliReset()));
    expect(gen.next().value).toEqual(undefined);
  });

  it('userLogout saga should work as expected when configuration.hasClassi == true', () => {
    const gen = sagas.userLogout({
      payload: {
        logoutAll: false,
        configuration: {
          hasClassi: true,
          product: 'productname',
        },
        history,
      },
    });

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.USER_URL_LOGOUT_ENDPOINT}`
    ));
    expect(gen.next().value).toEqual(put(actions.userLogoutSet()));
    expect(gen.next().value).toEqual(call(Cookies.remove, 'authorizationToken_productname'));
    expect(gen.next().value).toEqual(call(setAuthorizationToken, ''));
    expect(gen.next().value).toEqual(call(history.push, '/login'));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
    expect(gen.next().value).toEqual(put(livelliReset()));
    expect(gen.next().value).toEqual(put(corsiReset()));
  });

  it('userLogout saga should work as expected when configuration.logoutAll == true', () => {
    const gen = sagas.userLogout({
      payload: {
        logoutAll: true,
        configuration: {
          hasClassi: false,
          product: 'productname',
        },
        history,
      },
    });

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(call(
      axios.post,
      `${API_BASE_PATH}${constants.USER_URL_LOGOUT_ALL_ENDPOINT}`
    ));
    expect(gen.next().value).toEqual(put(actions.userLogoutSet()));
    expect(gen.next().value).toEqual(call(Cookies.remove, 'authorizationToken_productname'));
    expect(gen.next().value).toEqual(call(setAuthorizationToken, ''));
    expect(gen.next().value).toEqual(call(history.push, '/login'));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
    expect(gen.next().value).toEqual(put(livelliReset()));
    expect(gen.next().value).toEqual(undefined);
  });
});


describe('userRegisterPostSaga saga', () => {
  const history = {
    push: () => { },
  };
  const payload = {
    email: 'acme@example.com',
    username: 'username',
    password: 'password',
    history,
    configuration: {
      homePage: '/home',
      disciplinaId: 444,
    },
  };
  const mockResponse = {
    studenteAcademy: {
      status: 'W',
      docente: true,
    },
  };
  const callData = call(
    axios.post,
    `${API_BASE_PATH}${constants.USER_URL_REGISTER_POST}`, {
      email: payload.email,
      password: payload.password,
      username: payload.username,
      disciplina: 444,
    }
  );

  it('when procedure is successful with 201', () => {
    const gen = sagas.userRegisterPostSaga({ payload });

    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next({
      status: 201,
      data: mockResponse,
    }).value).toEqual(put(actions.userDataFetch(
      {
        email: 'acme@example.com',
        password: 'password',
      },
      payload.configuration,
      payload.history
    )));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('when procedure is successful with != 201', () => {
    const gen = sagas.userRegisterPostSaga({ payload });

    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next({
      status: 301,
      data: mockResponse,
    }).value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile effettuare la registrazione')
    ));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('when procedure is successful with error 406', () => {
    const gen = sagas.userRegisterPostSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw({ response: { status: 406 } }).value).toEqual(put(
      actions.userErrorSet(true, 'L\'indirizzo email inserito è già registrato')
    ));
  });

  it('when procedure is successful with error 409', () => {
    const gen = sagas.userRegisterPostSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw({ response: { status: 409 } }).value).toEqual(put(
      actions.userErrorSet(true, 'L\'indirizzo email inserito è già registrato')
    ));
  });

  it('when procedure is successful with error', () => {
    const gen = sagas.userRegisterPostSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw({ response: { status: 400 } }).value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile effettuare la registrazione')
    ));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('when procedure is successful with error when no status displayed', () => {
    const gen = sagas.userRegisterPostSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw({ response: {} }).value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile effettuare la registrazione')
    ));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('when procedure is successful with error when no response displayed', () => {
    const gen = sagas.userRegisterPostSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw().value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile effettuare la registrazione')
    ));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });
});


describe('userRegisterCompletePostSaga saga', () => {
  const history = {
    push: () => { },
  };
  const payload = {
    nome: 'nome',
    cognome: 'cognome',
    history,
    configuration: {
      homePage: '/home',
      hasPremium: true,
      disciplinaId: 33,
      enabledHints: {
        hint1: true,
        hint2: true,
        disabledHint: false,
      },
    },
  };
  const callData = call(
    axios.post,
    `${API_BASE_PATH}${constants.USER_URL_REGISTER_COMPLETE_POST}`, {
      nome: payload.nome,
      cognome: payload.cognome,
      disciplina: 33,
    }
  );

  it('when procedure is successful with 200', () => {
    const gen = sagas.userRegisterCompletePostSaga({ payload });

    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next({
      status: 200,
      data: { nome: 'Pippo', cognome: 'Franco' },
    }).value).toEqual(put(actions.userDataSet({
      anagraphics: {
        first_name: 'Pippo',
        last_name: 'Franco',
      },
      authentication: {
        logged: true,
        status: 'E',
        isUpdating: false,
        isDataSynced: true,
        codiceDaSbloccare: true,
      },
      appData: {
        enableSuoni: true,
        hints: {
          hint1: true,
          hint2: true,
        },
      },
    })));

    expect(gen.next().value).toEqual(call(history.push, '/home'));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('when procedure is successful with 200 and enabledHints === undefined', () => {
    const gen = sagas.userRegisterCompletePostSaga({
      payload: {
        ...payload,
        configuration: {
          ...payload.configuration,
          enabledHints: undefined,
        },
      },
    });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({
      status: 200,
      data: { nome: 'Pippo', cognome: 'Franco' },
    }).value).toEqual(put(actions.userDataSet({
      anagraphics: {
        first_name: 'Pippo',
        last_name: 'Franco',
      },
      authentication: {
        logged: true,
        status: 'E',
        isUpdating: false,
        isDataSynced: true,
        codiceDaSbloccare: true,
      },
      appData: {
        enableSuoni: true,
        hints: {},
      },
    })));
  });

  it('when procedure is successful with != 200', () => {
    const gen = sagas.userRegisterCompletePostSaga({ payload });

    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next({ status: 301 }).value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile completare la registrazione')
    ));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('when procedure is successful with error', () => {
    const gen = sagas.userRegisterCompletePostSaga({ payload });

    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next().value).toEqual(put(
      actions.userErrorSet(true, 'Impossibile completare la registrazione')
    ));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });
});


describe('userHintDisplaySaga saga', () => {
  const payload = {
    hintToDisplay: {
      contenuto: 'contenuto',
      nome: 'name',
    },
    product: 'product',
    userHints: {},
    dispatch: jest.fn(),
    userId: 111,
  };

  it('must put modalSetData when hintToDisplay contains data', () => {
    const gen = sagas.userHintDisplaySaga({ payload });

    const next = gen.next().value;
    expect(next.PUT.action.type).toBe(MODAL_SET_DATA);
    expect(next.PUT.action.payload.contenuto).toBe('contenuto');
    expect(next.PUT.action.payload.closeButton.text).toBe('Ok');

    expect(payload.dispatch).not.toHaveBeenCalled();
    next.PUT.action.payload.closeButton.onClick();
    expect(payload.dispatch).toHaveBeenCalledWith(actions.userDataSet({
      appData: { hints: { name: false } },
    }));
  });

  it('must put undefined when hintToDisplay contains data', () => {
    const gen = sagas.userHintDisplaySaga({
      payload: { ...payload, hintToDisplay: undefined },
    });

    const next = gen.next().value;
    expect(next).toBe(undefined);
  });
});

describe('userChangePasswordSaga saga', () => {
  const payload = {
    new_password1: 'password1',
    new_password2: 'password1',
    old_password: 'old_password',
    history: {
      push: jest.fn(),
    },
    configuration: mockConfiguration,
  };

  const callData = call(
    axios.post,
    `${API_BASE_PATH}${constants.USER_URL_CHANGE_PASSWORD}`, {
      new_password1: payload.new_password1,
      new_password2: payload.new_password2,
      old_password: payload.old_password,
    }
  );

  it('must test password reset when successful', () => {
    const gen = sagas.userChangePasswordSaga({ payload });
    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next({ status: 200 }).value).toEqual(put(actions.userErrorSet(
      true,
      'La tua password è stata resettata correttamente. Inserisci la nuova password per collegarti',
      {},
      'okay'
    )));

    expect(gen.next({ status: 200 }).value).toEqual(put(actions.userLogoutTrigger({
      configuration: payload.configuration,
      history: payload.history,
    })));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('must test password reset when not successful', () => {
    const gen = sagas.userChangePasswordSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ status: 303 }).value).toEqual(put(actions.userErrorSet(
      true, 'Non è stato possibile cambiare la password'
    )));
  });

  it('must test password reset in case of error', () => {
    const gen = sagas.userChangePasswordSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(actions.userErrorSet(
      true, 'Non è stato possibile cambiare la password'
    )));
  });
});


describe('userResetPasswordSaga saga', () => {
  const payload = {
    email: 'pippo@example.com',
    disciplina: 55,
  };

  const callData = call(
    axios.post,
    `${API_BASE_PATH}${constants.USER_URL_RESET_PASSWORD}`, {
      email: payload.email,
      disciplina: payload.disciplina,
    }
  );

  it('must test password reset when successful', () => {
    const gen = sagas.userResetPasswordSaga({ payload });
    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next({ status: 200 }).value).toEqual(put(actions.userErrorSet(
      true,
      'Ti è stata inviata una mail con le istruzioni per il reset della password',
      {},
      'okay'
    )));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('must test password reset when not successful', () => {
    const gen = sagas.userResetPasswordSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ status: 303 }).value).toEqual(put(actions.userErrorSet(
      true, 'Non è stato possibile resettare la password'
    )));
  });

  it('must test password reset in case of error', () => {
    const gen = sagas.userResetPasswordSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(actions.userErrorSet(
      true, 'Non è stato possibile resettare la password'
    )));
  });
});


describe('userConfirmNewPasswordSaga saga', () => {
  const payload = {
    new_password1: 'password1',
    new_password2: 'password1',
    uid: 'uid',
    token: 'token',
    history: {
      push: jest.fn(),
    },
    configuration: mockConfiguration,
  };

  const callData = call(
    axios.post,
    `${API_BASE_PATH}${constants.USER_URL_CONFIRM_NEW_PASSWORD}`, {
      new_password1: payload.new_password1,
      new_password2: payload.new_password2,
      uid: payload.uid,
      token: payload.token,
    }
  );

  it('must test password reset when successful', () => {
    const gen = sagas.userConfirmNewPasswordSaga({ payload });
    expect(gen.next().value).toEqual(put(actions.userErrorClean()));
    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(true)));
    expect(gen.next().value).toEqual(callData);

    expect(gen.next({ status: 200 }).value).toEqual(put(actions.userErrorSet(
      true,
      'La tua password è stata impostata correttamente. Inserisci la nuova password per collegarti',
      {},
      'okay'
    )));

    expect(gen.next({ status: 200 }).value).toEqual(put(actions.userLogoutTrigger({
      configuration: payload.configuration,
      history: payload.history,
    })));

    expect(gen.next().value).toEqual(put(actions.userSpinnerSet(false)));
  });

  it('must test password reset when not successful', () => {
    const gen = sagas.userConfirmNewPasswordSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ status: 303 }).value).toEqual(put(actions.userErrorSet(
      true, 'Non è stato possibile salvare la nuova password'
    )));
  });

  it('must test password reset in case of error', () => {
    const gen = sagas.userConfirmNewPasswordSaga({ payload });
    gen.next();
    gen.next();
    gen.next();

    expect(gen.throw('error').value).toEqual(put(actions.userErrorSet(
      true, 'Non è stato possibile salvare la nuova password'
    )));
  });
});


describe('userNotificheFetchSaga saga', () => {
  const payload = {
    disciplinaId: 555,
    product: 'product',
    userId: 222,
  };

  it('must test with 200 and not cookie set', () => {
    const gen = sagas.userNotificheFetchSaga({ payload });

    expect(gen.next(call(
      axios.post,
      `${API_BASE_PATH}${constants.USER_URL_NOTIFICHE}`, {
        params: { disciplina: 555 },
      }
    )));

    expect(gen.next({
      status: 200,
      data: {
        testo: 'testo',
        titolo: 'titolo',
        uuid: 'uuid',
      },
    }).value).toEqual(put(modalSetData({
      contenuto: (
        <Page full>
          <Container>
            <HtmlInjector
              text="testo"
            />
          </Container>
        </Page>
      ),
      bgcolor: 'transparent',
      titolo: 'titolo',
      show: true,
      topbar: true,
      isPopup: false,
      closeButton: {
        text: 'Ok',
        onClick: expect.any(Function),
      },
    })));
  });

  it('must test with 200 and not cookie set', () => {
    const gen = sagas.userNotificheFetchSaga({ payload });
    // settiamo il cookie
    cookieSet({ cookieKey: 'notifica_product_222_uuid', payload: 'false' });

    expect(gen.next(call(
      axios.post,
      `${API_BASE_PATH}${constants.USER_URL_NOTIFICHE}`, {
        params: { disciplina: 555 },
      }
    )));

    expect(gen.next({
      status: 200,
      data: {
        testo: 'testo',
        titolo: 'titolo',
        uuid: 'uuid',
      },
    }).value).toEqual(undefined);
  });

  it('must test with != 200', () => {
    const gen = sagas.userNotificheFetchSaga({ payload });

    expect(gen.next(call(
      axios.post,
      `${API_BASE_PATH}${constants.USER_URL_NOTIFICHE}`, {
        params: { disciplina: 555 },
      }
    )));

    expect(gen.next({
      status: 300,
      data: {
        testo: 'testo',
        titolo: 'titolo',
        uuid: 'uuid',
      },
    }).value).toEqual(undefined);
  });
});


describe('watchUser saga', () => {
  it('must call watchUser functions', () => {
    const gen = sagas.watchUser();

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_FETCH_DATA,
      sagas.loadUserData
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_CODICE_SBLOCCO_FETCH,
      sagas.checkCodiceSblocco
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_RESUME_TRIGGER,
      sagas.userResume
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_EVALUATE_TRIGGER,
      sagas.userEvaluate
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_LOGOUT_TRIGGER,
      sagas.userLogout
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_REGISTER_POST,
      sagas.userRegisterPostSaga
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_REGISTER_COMPLETE_POST,
      sagas.userRegisterCompletePostSaga
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_HINT_DISPLAY,
      sagas.userHintDisplaySaga
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_CHANGE_PASSWORD_POST,
      sagas.userChangePasswordSaga
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_RESET_PASSWORD_POST,
      sagas.userResetPasswordSaga
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_CONFIRM_NEW_PASSWORD_POST,
      sagas.userConfirmNewPasswordSaga
    ));

    expect(gen.next().value).toEqual(takeEvery(
      constants.USER_NOTIFICHE_FETCH,
      sagas.userNotificheFetchSaga
    ));
  });
});

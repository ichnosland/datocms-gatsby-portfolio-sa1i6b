import {
  userDataFetch,
  userDataSet,
  userCodiceSbloccoFetch,
  userSpinnerSet,
  userErrorSet,
  userErrorClean,
  userResumeTrigger,
  userLogoutTrigger,
  userLogoutSet,
  userEvaluateTrigger,
  userRegistrationPost,
  userRegistrationCompletePost,
  userHintDisplay,
  userChangePassword,
  userResetPassword,
  userConfirmNewPasswordPost,
  userNotificheFetch,
} from '../actions';
import {
  USER_FETCH_DATA,
  USER_SET_DATA,
  USER_CODICE_SBLOCCO_FETCH,
  USER_SPINNER_SET,
  USER_ERROR_SET,
  USER_ERROR_CLEAN,
  USER_RESUME_TRIGGER,
  USER_LOGOUT_SET,
  USER_LOGOUT_TRIGGER,
  USER_EVALUATE_TRIGGER,
  USER_REGISTER_POST,
  USER_REGISTER_COMPLETE_POST,
  USER_HINT_DISPLAY,
  USER_CHANGE_PASSWORD_POST,
  USER_RESET_PASSWORD_POST,
  USER_CONFIRM_NEW_PASSWORD_POST,
  USER_NOTIFICHE_FETCH,
} from '../constants';

describe('Actions', () => {
  it('check userDataFetch output is correct when isFacebook is not provided', () => {
    const expectedAction = {
      type: USER_FETCH_DATA,
      loginData: { data: 'payload' },
      configuration: { uno: 'uno', due: 'due' },
      history: { push: 'push_data' },
      isFacebook: false,
    };
    expect(userDataFetch(
      { data: 'payload' },
      { uno: 'uno', due: 'due' },
      { push: 'push_data' }
    )).toEqual(expectedAction);
  });

  it('check userDataFetch output is correct when isFacebook is provided', () => {
    const expectedAction = {
      type: USER_FETCH_DATA,
      loginData: { data: 'payload' },
      configuration: { uno: 'uno', due: 'due' },
      history: { push: 'push_data' },
      isFacebook: true,
    };
    expect(userDataFetch(
      { data: 'payload' },
      { uno: 'uno', due: 'due' },
      { push: 'push_data' },
      true
    )).toEqual(expectedAction);
  });

  it('check userErrorSet output is correct', () => {
    const expectedAction = {
      type: USER_ERROR_SET,
      enable: true,
      message: 'Messaggio',
      errorData: { data: 123 },
      tipologia: 'okay',
    };
    expect(
      userErrorSet(true, 'Messaggio', { data: 123 }, 'okay')
    ).toEqual(expectedAction);
  });

  it('check userErrorSet output is correct with default values', () => {
    const expectedAction = {
      type: USER_ERROR_SET,
      enable: true,
      message: '',
      errorData: {},
      tipologia: 'error',
    };
    expect(
      userErrorSet()
    ).toEqual(expectedAction);
  });

  it('check userErrorSet output is correct with default errorData value', () => {
    const expectedAction = {
      type: USER_ERROR_SET,
      enable: true,
      message: 'Messaggio',
      errorData: {},
      tipologia: 'error',
    };
    expect(
      userErrorSet(
        expectedAction.enable,
        expectedAction.message
      )
    ).toEqual(expectedAction);
  });

  it('check userDataSet output is correct', () => {
    const expectedAction = {
      type: USER_SET_DATA,
      payload: { data: 'payload' },
    };
    expect(userDataSet(
      { data: 'payload' }
    )).toEqual(expectedAction);
  });

  it('check userCodiceSbloccoFetch output is correct', () => {
    const expectedAction = {
      type: USER_CODICE_SBLOCCO_FETCH,
    };
    expect(userCodiceSbloccoFetch()).toEqual(expectedAction);
  });

  it('should check if userSpinnerSet output is correct', () => {
    const expectedAction = {
      type: USER_SPINNER_SET,
      payload: true,
    };
    expect(userSpinnerSet(expectedAction.payload)).toEqual(expectedAction);
  });

  it('should check if userErrorSet output is correct', () => {
    const expectedAction = {
      type: USER_ERROR_SET,
      enable: true,
      message: 'Error message',
      errorData: { data: 123 },
      tipologia: 'error',
    };
    expect(
      userErrorSet(expectedAction.enable, expectedAction.message, expectedAction.errorData)
    ).toEqual(expectedAction);
  });

  it('should check if userErrorClean output is correct', () => {
    const expectedAction = {
      type: USER_ERROR_CLEAN,
    };
    expect(userErrorClean()).toEqual(expectedAction);
  });

  it('should check if userResumeTrigger output is correct', () => {
    const expectedAction = {
      type: USER_RESUME_TRIGGER,
      payload: { data: 123 },
    };
    expect(
      userResumeTrigger(expectedAction.payload)
    ).toEqual(expectedAction);
  });

  it('should check if userLogoutTrigger output is correct', () => {
    const expectedAction = {
      type: USER_LOGOUT_TRIGGER,
    };
    expect(userLogoutTrigger()).toEqual(expectedAction);
  });

  it('should check if userLogoutSet output is correct', () => {
    const expectedAction = {
      type: USER_LOGOUT_SET,
    };
    expect(userLogoutSet()).toEqual(expectedAction);
  });

  it('should check if userEvaluateTrigger output is correct', () => {
    const expectedAction = {
      type: USER_EVALUATE_TRIGGER,
      configuration: {
        data: 123,
      },
    };
    expect(userEvaluateTrigger(expectedAction.configuration)).toEqual(expectedAction);
  });

  it('should check if userRegistrationPost output is correct', () => {
    const expectedAction = {
      type: USER_REGISTER_POST,
      payload: { data: 123 },
    };
    expect(userRegistrationPost(expectedAction.payload)).toEqual(expectedAction);
  });

  it('should check if userRegistrationCompletePost output is correct', () => {
    const expectedAction = {
      type: USER_REGISTER_COMPLETE_POST,
      payload: { data: 123 },
    };
    expect(userRegistrationCompletePost(expectedAction.payload)).toEqual(expectedAction);
  });

  it('should check if userResumeTrigger output is correct', () => {
    const expectedAction = {
      type: USER_HINT_DISPLAY,
      payload: { data: 123 },
    };
    expect(userHintDisplay(expectedAction.payload)).toEqual(expectedAction);
  });

  it('should check if userChangePassword output is correct', () => {
    const expectedAction = {
      type: USER_CHANGE_PASSWORD_POST,
      payload: { data: 123 },
    };
    expect(userChangePassword(expectedAction.payload)).toEqual(expectedAction);
  });

  it('should check if userResetPassword output is correct', () => {
    const expectedAction = {
      type: USER_RESET_PASSWORD_POST,
      payload: { data: 123 },
    };
    expect(userResetPassword(expectedAction.payload)).toEqual(expectedAction);
  });

  it('should check if userConfirmNewPasswordPost output is correct', () => {
    const expectedAction = {
      type: USER_CONFIRM_NEW_PASSWORD_POST,
      payload: { data: 123 },
    };
    expect(userConfirmNewPasswordPost(expectedAction.payload)).toEqual(expectedAction);
  });

  it('should check if userNotificheFetch', () => {
    const expectedAction = {
      type: USER_NOTIFICHE_FETCH,
      payload: { data: 123 },
    };
    expect(userNotificheFetch(expectedAction.payload)).toEqual(expectedAction);
  });
});

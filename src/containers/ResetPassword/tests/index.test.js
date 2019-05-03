import React from 'react';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import userReducer from 'containers/User/reducer';
import { userResetPassword, userConfirmNewPasswordPost } from 'containers/User/actions';
import { modalSetData } from 'containers/ModalBox/actions';
import AlertBanner from 'components/AlertBanner';
import Spinner from 'components/Spinner';
import { FormSection } from 'components/FormElements';
import ButtonGroup from 'components/ButtonGroup';
import ZendeskTicket from 'containers/ZendeskTicket';
import ResetPassword, { ResetPasswordView } from '../index';
import ResetPasswordForm from '../ResetPasswordForm';
import ConfirmPasswordForm from '../ConfirmPasswordForm';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
};
const store = configureStore({}, {});
const history = {
  push: () => { },
};
const product = 'product';

describe('<ResetPassword />', () => {
  let ConfigurationWrapper;

  beforeEach(() => {
    const withConfigReducer = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
    const withUserReducer = injectReducer({ key: 'user', reducer: userReducer });
    ConfigurationWrapper = compose(
      withConfigReducer,
      withUserReducer,
      connect()
    )(ResetPassword);
  });

  it('should render login section when user is not logged', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper match={{ params: {} }} history={history} />, { context: { store } }
    ).dive().dive().dive().dive();

    expect(renderedComponent.find(FormSection).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
  });

  it('mapDispatchToProps should dispatch proper events', () => {
    const storeMock = configureStore({}, {});
    storeMock.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper match={{ params: {} }} history={history} />, { context: { history, store: storeMock } }
    ).dive().dive().dive().dive();

    expect(storeMock.dispatch).not.toHaveBeenCalledWith(
      userResetPassword({ data: 123 })
    );
    renderedComponent.instance().props.onUserResetPassword({ data: 123 });
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      userResetPassword({ data: 123 })
    );

    expect(storeMock.dispatch).not.toHaveBeenCalledWith(
      userConfirmNewPasswordPost({ data: 123 })
    );
    renderedComponent.instance().props.onUserConfirmNewPassword({ data: 123 });
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      userConfirmNewPasswordPost({ data: 123 })
    );

    expect(storeMock.dispatch).not.toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );
    renderedComponent.instance().props.onModalSetData({ data: 123 });
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );
  });
});

describe('<ResetPasswordView />', () => {
  const mockProps = {
    match: { params: {} },
    product,
    history,
    spinner: false,
    onUserChangePassword: () => { },
    onModalSetData: () => { },
    resetPasswordData: {
      values: {
        password_new_1: 'password_new',
        password_new_2: 'password_new',
        old_password: 'old_password',
      },
    },
    error: {
      hasErrors: false,
      errorMessage: '',
    },
    configuration: mockConfiguration,
    onUserResetPassword: () => { },
    onUserConfirmNewPassword: () => { },
  };

  it('deve visualizzare il form di conferma password', () => {
    const props = {
      ...mockProps,
      match: { params: {
        uid: 'uid',
        token: 'token',
      } },
    };
    const renderedComponent = shallow(
      <ResetPasswordView {...props} />
    );

    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ResetPasswordForm).length).toBe(0);
    expect(renderedComponent.find(ConfirmPasswordForm).length).toBe(1);
  });

  it('in caso di errore deve visualizzare un alert banner', () => {
    const props = {
      ...mockProps,
      error: {
        hasErrors: true,
        errorMessage: 'Messaggio di errore',
      },
    };
    const renderedComponent = shallow(
      <ResetPasswordView {...props} />
    );

    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ResetPasswordForm).length).toBe(1);
    expect(renderedComponent.find(ConfirmPasswordForm).length).toBe(0);
  });

  it('deve visualizzare uno spinner', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ResetPasswordView {...props} />
    );

    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(ResetPasswordForm).length).toBe(0);
  });

  it('resetPasswordSubmit deve chiamare onUserResetPassword', () => {
    const props = {
      ...mockProps,
      onUserResetPassword: jest.fn(),
      resetPasswordData: {
        values: {
          email: 'pippo@example.com',
        },
      },
    };

    const renderedComponent = shallow(
      <ResetPasswordView {...props} />
    );

    expect(props.onUserResetPassword).not.toHaveBeenCalled();
    renderedComponent.instance().resetPasswordSubmit({ preventDefault: () => { } });
    expect(props.onUserResetPassword).toHaveBeenCalled();
    expect(renderedComponent.find(FormSection).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ResetPasswordForm).length).toBe(1);
    expect(renderedComponent.find(ConfirmPasswordForm).length).toBe(0);
  });

  it('confirmPasswordSubmit deve chiamare onUserConfirmNewPassword', () => {
    const props = {
      ...mockProps,
      onUserConfirmNewPassword: jest.fn(),
      confirmPasswordData: {
        values: {
          password_new_1: 'password_new',
          password_new_2: 'password_new',
        },
      },
    };

    const renderedComponent = shallow(
      <ResetPasswordView {...props} />
    );

    expect(props.onUserConfirmNewPassword).not.toHaveBeenCalled();
    renderedComponent.instance().confirmPasswordSubmit({ preventDefault: () => { } });
    expect(props.onUserConfirmNewPassword).toHaveBeenCalled();
    expect(renderedComponent.find(FormSection).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ResetPasswordForm).length).toBe(1);
    expect(renderedComponent.find(ConfirmPasswordForm).length).toBe(0);
  });

  it('should render one Registration component', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <ResetPasswordView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    const onClickButtonFx = renderedComponent.find(ButtonGroup).props().buttons[0].onClickFunction;

    onClickButtonFx();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'reset_password',
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });

  it('ResetPasswordForm > backFunction must call history.push', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };

    const renderedComponent = shallow(
      <ResetPasswordView {...props} />
    );

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(ResetPasswordForm).dive().props().backFunction();
    expect(props.history.push).toHaveBeenCalledWith('/login');
  });
});

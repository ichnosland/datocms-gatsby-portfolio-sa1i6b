import React from 'react';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import userReducer from 'containers/User/reducer';
import { userChangePassword } from 'containers/User/actions';
import { modalSetData } from 'containers/ModalBox/actions';
import AlertBanner from 'components/AlertBanner';
import Spinner from 'components/Spinner';
import { FormSection } from 'components/FormElements';
import ButtonGroup from 'components/ButtonGroup';
import ZendeskTicket from 'containers/ZendeskTicket';
import Login, { CambiaPasswordView } from '../index';
import CambiaPasswordForm from '../CambiaPasswordForm';


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

describe('<Login />', () => {
  let ConfigurationWrapper;

  beforeEach(() => {
    const withConfigReducer = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
    const withUserReducer = injectReducer({ key: 'user', reducer: userReducer });
    ConfigurationWrapper = compose(
      withConfigReducer,
      withUserReducer,
      connect()
    )(Login);
  });

  it('should render login section when user is not logged', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { store } }
    ).dive().dive().dive().dive();

    expect(renderedComponent.find(FormSection).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
  });

  it('mapDispatchToProps should dispatch proper events', () => {
    const storeMock = configureStore({}, {});
    storeMock.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { history, store: storeMock } }
    ).dive().dive().dive().dive();

    expect(storeMock.dispatch).not.toHaveBeenCalledWith(
      userChangePassword({ data: 123 })
    );
    renderedComponent.instance().props.onUserChangePassword({ data: 123 });
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      userChangePassword({ data: 123 })
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

describe('<CambiaPasswordView />', () => {
  it('on error should display CambiaPasswordForm component', () => {
    const renderedComponent = shallow(
      <CambiaPasswordView
        product={product}
        history={history}
        spinner={false}
        onUserChangePassword={() => { }}
        onModalSetData={() => { }}
        resetPasswordData={{
          values: {
            password_new_1: 'password_new',
            password_new_2: 'password_new',
            old_password: 'old_password',
          },
        }}
        configuration={mockConfiguration}
        error={{
          hasErrors: true,
          errorMessage: 'Messaggio di errore',
        }}
      />
    );

    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(CambiaPasswordForm).length).toBe(1);
  });

  it('on error should display Spinner component', () => {
    const renderedComponent = shallow(
      <CambiaPasswordView
        store={store}
        spinner
        onUserChangePassword={() => { }}
        onModalSetData={() => { }}
        history={history}
        resetPasswordData={{
          values: {
            password_new_1: 'password_new',
            password_new_2: 'password_new',
            old_password: 'old_password',
          },
        }}
        configuration={mockConfiguration}
        error={{
          hasErrors: true,
          errorMessage: 'Messaggio di errore',
        }}
      />
    );

    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(CambiaPasswordForm).length).toBe(0);
  });

  it('on error should display AlertBanner component', () => {
    const renderedComponent = shallow(
      <CambiaPasswordView
        store={store}
        spinner={false}
        onUserChangePassword={() => { }}
        onModalSetData={() => { }}
        history={history}
        resetPasswordData={{
          values: {
            password_new_1: 'password_new',
            password_new_2: 'password_new',
            old_password: 'old_password',
          },
        }}
        configuration={mockConfiguration}
        error={{
          hasErrors: true,
          errorMessage: 'Messaggio di errore',
        }}
      />
    );

    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(CambiaPasswordForm).length).toBe(1);
  });

  it('onSubmit should call userDataFetch', () => {
    const mockOnUserLogin = jest.fn();
    const renderedComponent = shallow(
      <CambiaPasswordView
        store={store}
        spinner={false}
        onUserChangePassword={mockOnUserLogin}
        onModalSetData={() => { }}
        history={history}
        resetPasswordData={{
          values: {
            password_new_1: 'password_new',
            password_new_2: 'password_new',
            old_password: 'old_password',
          },
        }}
        configuration={mockConfiguration}
        error={{
          hasErrors: false,
          errorMessage: '',
        }}
      />
    );

    expect(mockOnUserLogin).not.toHaveBeenCalled();
    renderedComponent.instance().onSubmit({ preventDefault: () => { } });
    expect(mockOnUserLogin).toHaveBeenCalled();
    expect(renderedComponent.find(FormSection).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(CambiaPasswordForm).length).toBe(1);
  });

  it('should render one Registration component', () => {
    const onModalSetData = jest.fn();
    const renderedComponent = shallow(
      <CambiaPasswordView
        store={store}
        spinner={false}
        onUserChangePassword={() => { }}
        onModalSetData={onModalSetData}
        history={history}
        resetPasswordData={{
          values: {
            password_new_1: 'password_new',
            password_new_2: 'password_new',
            old_password: 'old_password',
          },
        }}
        configuration={mockConfiguration}
        error={{
          hasErrors: false,
          errorMessage: '',
        }}
      />
    );

    expect(onModalSetData).not.toHaveBeenCalled();
    const onClickButtonFx = renderedComponent.find(ButtonGroup).props().buttons[0].onClickFunction;

    onClickButtonFx();
    expect(onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'cambia_password',
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });

  it('CambiaPasswordForm > backFunction must call history.push', () => {
    const mockHistory = {
      push: jest.fn(),
    };

    const renderedComponent = shallow(
      <CambiaPasswordView
        store={store}
        spinner={false}
        onUserChangePassword={() => { }}
        onModalSetData={() => { }}
        history={mockHistory}
        resetPasswordData={{
          values: {
            password_new_1: 'password_new',
            password_new_2: 'password_new',
            old_password: 'old_password',
          },
        }}
        configuration={mockConfiguration}
        error={{
          hasErrors: false,
          errorMessage: '',
        }}
      />
    );

    expect(mockHistory.push).not.toHaveBeenCalled();
    renderedComponent.find(CambiaPasswordForm).dive().props().backFunction();
    expect(mockHistory.push).toHaveBeenCalledWith('/profilo');
  });
});

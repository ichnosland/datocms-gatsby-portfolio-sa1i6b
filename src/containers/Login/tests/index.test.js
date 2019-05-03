import React from 'react';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import userReducer from 'containers/User/reducer';
import { userDataFetch } from 'containers/User/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import AlertBanner from 'components/AlertBanner';
import Spinner from 'components/Spinner';
import { FormSection } from 'components/FormElements';
import ButtonGroup from 'components/ButtonGroup';
import ZendeskTicket from 'containers/ZendeskTicket';
import Login, { LoginView, AnnullaButton } from '../index';
import LoginForm from '../LoginForm';


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


    renderedComponent.instance().props.onUserLogin(
      { data: 1123 },
      { data2: 1456 },
      history
    );
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      userDataFetch(
        { data: 1123 },
        { data2: 1456 },
        history,
        false,
        storeMock.dispatch
      )
    );

    expect(storeMock.dispatch).not.toHaveBeenCalledWith(
      modalSetData({ data: 2789 })
    );
    renderedComponent.instance().props.onModalSetData({ data: 2789 });
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 2789 })
    );

    expect(storeMock.dispatch).not.toHaveBeenCalledWith(modalSetEmptyData());
    renderedComponent.instance().props.onModalSetEmptyData();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );
  });
});

describe('<LoginView />', () => {
  it('on error should display LoginForm component', () => {
    const renderedComponent = shallow(
      <LoginView
        product={product}
        store={store}
        history={history}
        spinner={false}
        onUserLogin={() => { }}
        onModalSetData={() => { }}
        onModalSetEmptyData={() => { }}
        formLoginData={{
          values: {
            email: 'acme@acme.com',
            password: 'segreta',
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
    expect(renderedComponent.find(LoginForm).length).toBe(1);
  });

  it('on error should display Spinner component', () => {
    const renderedComponent = shallow(
      <LoginView
        store={store}
        spinner
        onUserLogin={() => { }}
        onModalSetData={() => { }}
        onModalSetEmptyData={() => { }}
        history={history}
        formLoginData={{
          values: {
            email: 'acme@acme.com',
            password: 'segreta',
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
    expect(renderedComponent.find(LoginForm).length).toBe(0);
  });

  it('on error should display AnnullaButton if configuration.landingUrl is set', () => {
    const mockConfigurationPlusUrl = {
      ...mockConfiguration,
      landingUrl: 'landingUrl',
    };
    const renderedComponent = shallow(
      <LoginView
        product={product}
        store={store}
        history={history}
        spinner={false}
        onUserLogin={() => { }}
        onModalSetData={() => { }}
        onModalSetEmptyData={() => { }}
        formLoginData={{
          values: {
            email: 'acme@acme.com',
            password: 'segreta',
          },
        }}
        configuration={mockConfigurationPlusUrl}
        error={{
          hasErrors: true,
          errorMessage: 'Messaggio di errore',
        }}
      />
    );

    expect(renderedComponent.find(AnnullaButton).length).toBe(1);
    expect(renderedComponent.find(LoginForm).length).toBe(1);
  });

  it('on error should display AlertBanner component', () => {
    const renderedComponent = shallow(
      <LoginView
        store={store}
        spinner={false}
        onUserLogin={() => { }}
        onModalSetData={() => { }}
        onModalSetEmptyData={() => { }}
        history={history}
        formLoginData={{
          values: {
            email: 'acme@acme.com',
            password: 'segreta',
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
    expect(renderedComponent.find(LoginForm).length).toBe(1);
  });

  it('onSubmit should call userDataFetch', () => {
    const mockOnUserLogin = jest.fn();
    const renderedComponent = shallow(
      <LoginView
        store={store}
        spinner={false}
        onUserLogin={mockOnUserLogin}
        onModalSetData={() => { }}
        onModalSetEmptyData={() => { }}
        history={history}
        formLoginData={{
          values: {
            email: 'acme@acme.com',
            password: 'segreta',
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
    expect(renderedComponent.find(LoginForm).length).toBe(1);
  });

  it('onResponseFacebook should call onUserLogin', () => {
    const mockOnUserLogin = jest.fn();
    const renderedComponent = shallow(
      <LoginView
        store={store}
        spinner={false}
        onUserLogin={mockOnUserLogin}
        onModalSetData={() => { }}
        onModalSetEmptyData={() => { }}
        history={history}
        configuration={mockConfiguration}
        error={{
          hasErrors: false,
          errorMessage: '',
        }}
      />
    );

    expect(mockOnUserLogin).not.toHaveBeenCalled();
    renderedComponent.instance().onResponseFacebook({
      email: 'acme@example.com',
      name: 'nome',
      id: 12345,
      accessToken: 'accessToken',
    });
    expect(mockOnUserLogin).toHaveBeenCalledWith(
      {
        email: 'acme@example.com',
        fbname: 'nome',
        fbuid: 12345,
        fbtoken: 'accessToken',
        register: false,
      },
      mockConfiguration,
      history,
      true
    );
  });

  it('should render one Registration component', () => {
    const onModalSetData = jest.fn();
    const renderedComponent = shallow(
      <LoginView
        store={store}
        spinner={false}
        onUserLogin={() => { }}
        onModalSetData={onModalSetData}
        onModalSetEmptyData={() => { }}
        history={history}
        formLoginData={{
          values: {
            email: 'acme@acme.com',
            password: 'segreta',
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
            provenienza: 'login',
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });
});

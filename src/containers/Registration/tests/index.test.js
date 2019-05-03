import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';
import configureStore from 'configureStore';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import userReducer from 'containers/User/reducer';
import { modalSetData } from 'containers/ModalBox/actions';
import { userRegistrationPost, userDataFetch } from 'containers/User/actions';
import ButtonGroup from 'components/ButtonGroup';
import ZendeskTicket from 'containers/ZendeskTicket';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import Registration, { RegistrationView } from '../index';
import RegistrationForm from '../RegistrationForm';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/home',
};
const history = {
  push: () => { },
};
const store = configureStore({}, {});
const mockPros = {
  spinner: false,
  error: {},
  history,
  configuration: mockConfiguration,
  onModalSetData: () => { },
  onUserRegister: () => { },
  onUserLogin: () => { },
  userAuthentication: {
    logged: false,
  },
  store,
};

describe('<RegistrationView />', () => {
  it('should render one Registration component', () => {
    const renderedComponent = shallow(
      <RegistrationView {...mockPros} />
    );

    expect(renderedComponent.find(RegistrationForm).length).toBe(1);
  });

  it('should render one Registration component', () => {
    const props = {
      ...mockPros,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <RegistrationView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    const onClickButtonFx = renderedComponent.find(ButtonGroup).props().buttons[0].onClickFunction;

    onClickButtonFx();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'registration',
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });

  it('onResponseFacebook should call onUserLogin', () => {
    const props = {
      ...mockPros,
      onUserLogin: jest.fn(),
    };
    const renderedComponent = shallow(
      <RegistrationView {...props} />
    );

    expect(props.onUserLogin).not.toHaveBeenCalled();
    renderedComponent.instance().onResponseFacebook({
      email: 'acme@example.com',
      name: 'nome',
      id: 12345,
      accessToken: 'accessToken',
    });
    expect(props.onUserLogin).toHaveBeenCalledWith(
      {
        email: 'acme@example.com',
        fbname: 'nome',
        fbuid: 12345,
        fbtoken: 'accessToken',
        register: true,
      },
      mockConfiguration,
      history,
      true
    );
  });

  it('should render one Registration component when spinner = true', () => {
    const props = {
      ...mockPros,
      spinner: true,
    };
    const renderedComponent = shallow(
      <RegistrationView {...props} />
    );

    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one Registration component when hasErrors = true', () => {
    const props = {
      ...mockPros,
      error: {
        hasErrors: true,
        errorMessage: 'message',
      },
    };
    const renderedComponent = shallow(
      <RegistrationView {...props} />
    );

    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('onSubmit should call onUserRegister', () => {
    const props = {
      ...mockPros,
      onUserRegister: jest.fn(),
      formRegistrationData: {
        values: {
          username: 'username',
          password: 'password',
          password2: 'password2',
          email: 'email',
        },
      },
    };
    const renderedComponent = shallow(
      <RegistrationView {...props} />
    );
    const instance = renderedComponent.instance();

    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onUserRegister).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      history,
      ...props.formRegistrationData.values,
    });
  });
});

describe('<Registration />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    connect()
  )(Registration);

  it('mapDispatchToProps > onModalSetData', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive();

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(modalSetData({ data: 123 }));
    renderedComponent.props().onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetData({ data: 123 }));
  });

  it('onUserRegister > userRegistrationPost', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive();

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(userRegistrationPost({ data: 123 }));
    renderedComponent.props().onUserRegister({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(userRegistrationPost({ data: 123 }));

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(userDataFetch(1, 2, 3, 4));
    renderedComponent.props().onUserLogin(1, 2, 3, 4);
    expect(mockStore.dispatch).toHaveBeenCalledWith(userDataFetch(1, 2, 3, 4));
  });
});

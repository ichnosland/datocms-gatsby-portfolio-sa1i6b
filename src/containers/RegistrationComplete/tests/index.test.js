import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';
import configureStore from 'configureStore';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import userReducer, {
  defaultErrorSettings,
  defaultAuthentication,
} from 'containers/User/reducer';
import { userRegistrationCompletePost } from 'containers/User/actions';
import Section from 'components/Section';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import RegistrationComplete, { RegistrationCompleteView } from '../index';
import RegistrationCompleteForm from '../RegistrationCompleteForm';

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
const mockProps = {
  spinner: false,
  configuration: mockConfiguration,
  onUserRegisterComplete: () => { },
  error: {
    errorMessage: '',
    hasErrors: false,
  },
  history,
  store,
};


describe('<RegistrationCompleteView />', () => {
  it('Visualizza il form di registrazione', () => {
    const renderedComponent = shallow(
      <RegistrationCompleteView {...mockProps} />
    );

    expect(renderedComponent.find(Section).length).toBe(1);
    expect(renderedComponent.find(RegistrationCompleteForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Visualizza uno spinner', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <RegistrationCompleteView {...props} />
    );

    expect(renderedComponent.find(Section).length).toBe(1);
    expect(renderedComponent.find(RegistrationCompleteForm).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Visualizza un messaggio di feedback', () => {
    const props = {
      ...mockProps,
      error: {
        errorMessage: 'messaggio di errore',
        hasErrors: true,
      },
    };
    const renderedComponent = shallow(
      <RegistrationCompleteView {...props} />
    );

    expect(renderedComponent.find(Section).length).toBe(1);
    expect(renderedComponent.find(RegistrationCompleteForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('onSubmit deve chiamare onUserRegisterComplete', () => {
    const props = {
      ...mockProps,
      onUserRegisterComplete: jest.fn(),
      formRegistrationData: {
        values: {
          nome: 'nome',
          cognome: 'cognome',
        },
      },
    };
    const renderedComponent = shallow(
      <RegistrationCompleteView {...props} />
    );

    expect(props.onUserRegisterComplete).not.toHaveBeenCalled();
    renderedComponent.instance().onSubmit({ preventDefault: () => { } });
    expect(props.onUserRegisterComplete).toHaveBeenCalledWith({
      history: props.history,
      configuration: mockConfiguration,
      ...props.formRegistrationData.values,
    });
  });
});

describe('<RegistrationComplete />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    connect()
  )(RegistrationComplete);

  it('should render its Route', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={history}
      />, { context: { store } }
    ).dive().dive().dive();

    const props = renderedComponent.props();
    expect(props.configuration).toEqual(mockConfiguration);
    expect(props.userAuthentication).toEqual(defaultAuthentication.toJS());
    expect(props.error).toEqual(defaultErrorSettings.toJS());
  });

  it('mapDispatchToProps > onModalSetData', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive();

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(userRegistrationCompletePost({ data: 123 }));
    renderedComponent.props().onUserRegisterComplete({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(userRegistrationCompletePost({ data: 123 }));
  });
});

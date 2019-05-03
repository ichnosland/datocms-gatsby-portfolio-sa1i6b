import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import { Button } from 'components/Button';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import { provaCompetenzaReset } from 'containers/ProvaCompetenza/actions';
import provaCompetenzaReducer, {
  defaultProvaCompetenzaFeedback,
  defaultProvaCompetenzaContenuto,
  defaultProvaCompetenzaRisposta,
  defaultProvaCompetenzaStep,
} from 'containers/ProvaCompetenza/reducer';
import ResponseView from 'components/ResponseView';

import ProvaCompetenzaResponse, { ProvaCompetenzaResponseView } from '../index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const baseProps = {
  configuration: mockConfiguration,
  contenutoProva: {
    voto: 5,
    isLoaded: true,
    consegnata: true,
  },
  history: {
    push: () => { },
  },
  onPurgeProvaCompetenza: () => { },
};

describe('<ProvaCompetenzaResponseView />', () => {
  it('visualizza il riepilogo con le informazioni di base se voto < 6', () => {
    const renderedComponent = shallow(
      <ProvaCompetenzaResponseView {...baseProps} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ResponseView with an img', () => {
    const renderedComponent = shallow(
      <ProvaCompetenzaResponseView {...baseProps} />
    );
    expect(renderedComponent.find(ResponseView).length).toBe(1);
    expect(renderedComponent.dive().find('img').length).toBe(1);
    expect(renderedComponent.dive().find('img').props().alt).toBe('Risultato insufficiente');
  });

  it('visualizza il riepilogo con le informazioni di base se voto >= 6', () => {
    const props = {
      ...baseProps,
      contenutoProva: {
        ...baseProps.contenutoProva,
        voto: 8,
      },
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent.dive().find('img').length).toBe(1);
    expect(renderedComponent.dive().find('img').props().alt).toBe('Ottimo');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('il click al button deve chiamare onPurgeProvaCompetenza', () => {
    const props = {
      ...baseProps,
      onPurgeProvaCompetenza: jest.fn(),
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(props.onPurgeProvaCompetenza).not.toHaveBeenCalled();
    renderedComponent.dive().find(Button).simulate('click');
    expect(props.onPurgeProvaCompetenza).toHaveBeenCalled();
  });

  it('fa un push di history se isLoaded = false', () => {
    const props = {
      ...baseProps,
      contenutoProva: {
        ...baseProps.contenutoProva,
        isLoaded: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<ProvaCompetenzaResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith(mockConfiguration.homePage);
  });

  it('fa un push di history se consegnata = false', () => {
    const props = {
      ...baseProps,
      contenutoProva: {
        ...baseProps.contenutoProva,
        consegnata: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<ProvaCompetenzaResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith(mockConfiguration.homePage);
  });
});

describe('<ProvaCompetenzaResponse />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerProvaCompetenza = injectReducer({ key: 'provaCompetenza', reducer: provaCompetenzaReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerProvaCompetenza,
    connect()
  )(ProvaCompetenzaResponse);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.step).toEqual(defaultProvaCompetenzaStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultProvaCompetenzaFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultProvaCompetenzaRisposta.toJS());
    expect(receivedProps.contenutoProva).toEqual(defaultProvaCompetenzaContenuto.toJS());
  });

  it('la prop onPurgeProvaCompetenza deve fare il dispatch di provaCompetenzaReset', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(store.dispatch).not.toHaveBeenCalled();
    receivedProps.onPurgeProvaCompetenza();
    expect(store.dispatch).toHaveBeenCalledWith(provaCompetenzaReset());
  });
});

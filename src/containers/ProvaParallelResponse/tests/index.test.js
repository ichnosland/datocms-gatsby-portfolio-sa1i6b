import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import { Button } from 'components/Button';
import { provaParallelReset } from 'containers/ProvaParallel/actions';
import provaParallelReducer, { defaultProvaParallelEsecuzione } from 'containers/ProvaParallel/reducer';
import ResponseView from 'components/ResponseView';

import ProvaParallelResponse, { ProvaParallelResponseView } from '../index';


const configuration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const baseProps = {
  configuration,
  esecuzione: {
    isLoaded: true,
    consegnata: true,
  },
  history: {
    push: () => { },
  },
  onPurgeProvaParallel: () => { },
};

describe('<ProvaParallelResponseView />', () => {
  it('visualizza il riepilogo con le informazioni di base se voto < 6', () => {
    const renderedComponent = shallow(
      <ProvaParallelResponseView {...baseProps} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ResponseView with an img', () => {
    const renderedComponent = shallow(
      <ProvaParallelResponseView {...baseProps} />
    );
    expect(renderedComponent.find(ResponseView).length).toBe(1);
    expect(renderedComponent.dive().find('img').length).toBe(1);
    expect(renderedComponent.dive().find('img').props().alt).toBe('Ottimo');
  });

  it('il click al button deve chiamare onPurgeProvaParallel', () => {
    const props = {
      ...baseProps,
      onPurgeProvaParallel: jest.fn(),
    };
    const renderedComponent = shallow(
      <ProvaParallelResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(props.onPurgeProvaParallel).not.toHaveBeenCalled();
    renderedComponent.dive().find(Button).simulate('click');
    expect(props.onPurgeProvaParallel).toHaveBeenCalled();
  });

  it('fa un push di history se isLoaded = false', () => {
    const props = {
      ...baseProps,
      esecuzione: {
        ...baseProps.esecuzione,
        isLoaded: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<ProvaParallelResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith(configuration.homePage);
  });

  it('fa un push di history se consegnata = false', () => {
    const props = {
      ...baseProps,
      esecuzione: {
        ...baseProps.esecuzione,
        consegnata: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<ProvaParallelResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith(configuration.homePage);
  });
});

describe('<ProvaParallelResponse />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerProvaParallel = injectReducer({ key: 'provaParallel', reducer: provaParallelReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerProvaParallel,
    connect()
  )(ProvaParallelResponse);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    expect(receivedProps.configuration).toEqual(configuration);
    expect(receivedProps.esecuzione).toEqual(defaultProvaParallelEsecuzione.toJS());
  });

  it('la prop onPurgeProvaParallel deve fare il dispatch di provaParallelReset', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    expect(store.dispatch).not.toHaveBeenCalled();
    receivedProps.onPurgeProvaParallel();
    expect(store.dispatch).toHaveBeenCalledWith(provaParallelReset());
  });
});

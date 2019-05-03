import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import { ResponseWrap } from 'components/ResponseView/ResponseViewElements';
import { Button } from 'components/Button';
import { verificaReset } from 'containers/Verifica/actions';
import ResponseView from 'components/ResponseView';
import verificaReducer, { defaultVerificaContenuto } from 'containers/Verifica/reducer';

import VerificaResponse, { VerificaResponseView } from '../index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  switcherMyTest: true,
  homePage: '/homepage',
};

const mockProps = {
  configuration: mockConfiguration,
  verificaCaricata: {
    isLoaded: true,
    id: 456,
    idAssegnazione: 567,
    consegnata: true,
    voto: 4,
    backUrl: '/backurl',
  },
  history: {
    push: () => { },
  },
  onResetVerifica: () => { },
};

describe('<VerificaResponseView />', () => {
  it('visualizza il riepilogo con le informazioni di base se voto < 6', () => {
    const renderedComponent = shallow(
      <VerificaResponseView {...mockProps} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent.find(ResponseView).length).toBe(1);
    expect(renderedComponent.dive().find('img').props().alt).toBe('Risultato insufficiente');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il riepilogo con le informazioni di base se voto >= 6', () => {
    const props = {
      ...mockProps,
      verificaCaricata: {
        ...mockProps.verificaCaricata,
        voto: 8,
      },
    };
    const renderedComponent = shallow(
      <VerificaResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent.find(ResponseView).length).toBe(1);
    expect(renderedComponent.dive().find('img').props().alt).toBe('Ottimo');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('il click al button deve chiamare onResetVerifica e history.push', () => {
    const props = {
      ...mockProps,
      onResetVerifica: jest.fn(),
      userAppData: {
        docente: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <VerificaResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);

    expect(props.onResetVerifica).not.toHaveBeenCalled();
    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.dive().find(Button).simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/backurl');
  });

  it('fa un push di history se isLoaded = false', () => {
    const props = {
      ...mockProps,
      verificaCaricata: {
        ...mockProps.verificaCaricata,
        isLoaded: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<VerificaResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalled();
  });

  it('fa un push di history se consegnata = false', () => {
    const props = {
      ...mockProps,
      verificaCaricata: {
        ...mockProps.verificaCaricata,
        consegnata: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<VerificaResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalled();
  });
});

describe('<VerificaResponse />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerVersioni = injectReducer({ key: 'verifiche', reducer: verificaReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerVersioni,
    connect()
  )(VerificaResponse);

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
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.verificaCaricata).toEqual(defaultVerificaContenuto.toJS());
  });

  it('la prop onResetVerifica deve fare il dispatch di versioniPurgeTrigger', () => {
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

    expect(store.dispatch).not.toHaveBeenCalledWith(verificaReset());
    receivedProps.onResetVerifica();
    expect(store.dispatch).toHaveBeenCalledWith(verificaReset());
  });
});

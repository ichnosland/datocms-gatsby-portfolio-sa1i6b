import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import { Button } from 'components/Button';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import { versioniPurgeTrigger } from 'containers/Versioni/actions';
import versioneReducer, {
  defaultVersioneAvanzamento, defaultVersioneCaricata,
} from 'containers/Versioni/reducer';
import ResponseView from 'components/ResponseView';

import VersioneResponse, { VersioneResponseView } from '../index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const baseProps = {
  configuration: mockConfiguration,
  versioneCaricata: {
    titolo: 'titolo versione',
    isEsecuzioneLoaded: true,
    id: 456,
    idAssegnazione: 567,
    isConsegnata: true,
  },
  versioneAvanzamento: {
    votoFinale: 4,
  },
  history: {
    push: () => { },
  },
  onPurgeVersione: () => { },
};

describe('<VersioneResponseView />', () => {
  it('visualizza il riepilogo con le informazioni di base se voto < 6', () => {
    const renderedComponent = shallow(
      <VersioneResponseView {...baseProps} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ResponseWrap with an img', () => {
    const renderedComponent = shallow(
      <VersioneResponseView {...baseProps} />
    );
    expect(renderedComponent.find(ResponseView).length).toBe(1);
    expect(renderedComponent.dive().find('img').length).toBe(1);
  });

  it('visualizza il riepilogo con le informazioni di base se voto >= 6', () => {
    const props = {
      ...baseProps,
      versioneAvanzamento: {
        ...baseProps.versioneAvanzamento,
        votoFinale: 8,
      },
    };
    const renderedComponent = shallow(
      <VersioneResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('il click al button deve chiamare onPurgeVersione', () => {
    const props = {
      ...baseProps,
      onPurgeVersione: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioneResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(props.onPurgeVersione).not.toHaveBeenCalled();
    renderedComponent.dive().find(Button).simulate('click');
    expect(props.onPurgeVersione).toHaveBeenCalled();
  });

  it('fa un push di history se isEsecuzioneLoaded = false', () => {
    const props = {
      ...baseProps,
      versioneCaricata: {
        ...baseProps.versioneCaricata,
        isEsecuzioneLoaded: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<VersioneResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalled();
  });

  it('fa un push di history se isConsegnata = false', () => {
    const props = {
      ...baseProps,
      versioneCaricata: {
        ...baseProps.versioneCaricata,
        isConsegnata: false,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<VersioneResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalled();
  });
});

describe('<VersioneResponse />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerVersioni = injectReducer({ key: 'versioni', reducer: versioneReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerVersioni,
    connect()
  )(VersioneResponse);

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
    expect(receivedProps.versioneCaricata).toEqual(defaultVersioneCaricata.toJS());
    expect(receivedProps.versioneAvanzamento).toEqual(defaultVersioneAvanzamento.toJS());
  });

  it('la prop onPurgeVersione deve fare il dispatch di versioniPurgeTrigger', () => {
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
    receivedProps.onPurgeVersione();
    expect(store.dispatch).toHaveBeenCalledWith(versioniPurgeTrigger());
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import { Button } from 'components/Button';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import { unitaReset } from 'containers/Unita/actions';
import ResponseView from 'components/ResponseView';
import unitaReducer, {
  defaultUnitaFeedback,
  defaultUnitaContenuto,
  defaultUnitaRisposta,
  defaultUnitaStep,
} from 'containers/Unita/reducer';
import UnitaResponse, { UnitaResponseView } from '../index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const baseProps = {
  userAppData: {
    docente: false,
  },
  configuration: mockConfiguration,
  contenutoUnita: {
    isLoaded: true,
    id: 3,
    consegnata: true,
    lezioni: {
      completate: 2,
      totali: 7,
    },
  },
  history: {
    push: () => { },
  },
  onPurgeUnita: () => { },
};

describe('<UnitaResponseView />', () => {
  it('visualizza il riepilogo con le informazioni di base', () => {
    const renderedComponent = shallow(
      <UnitaResponseView {...baseProps} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent.find(ResponseView).props()).toEqual({
      votoApprossimato: 10,
      goodSrc: 'IMAGE_MOCK',
      lezioniCompletate: 2,
      lezioniTotali: 7,
      titolo: 'Hai completato la lezione',
      steps: true,
      resetFunction: expect.any(Function),
      nascondiVoto: true,
      product: 'product',
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il riepilogo con le informazioni di base se docente', () => {
    const props = {
      ...baseProps,
      userAppData: {
        docente: true,
      },
    };
    const renderedComponent = shallow(
      <UnitaResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(renderedComponent.find(ResponseView).props()).toEqual({
      votoApprossimato: 10,
      goodSrc: 'IMAGE_MOCK',
      lezioniCompletate: 2,
      lezioniTotali: 7,
      titolo: 'Hai completato la lezione',
      steps: false,
      resetFunction: expect.any(Function),
      nascondiVoto: true,
      product: 'product',
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ResponseWrap with an img', () => {
    const renderedComponent = shallow(
      <UnitaResponseView {...baseProps} />
    );
    expect(renderedComponent.find(ResponseView).length).toBe(1);
    expect(renderedComponent.dive().find('img').length).toBe(1);
  });

  it('il click al button deve chiamare onPurgeUnita', () => {
    const props = {
      ...baseProps,
      onPurgeUnita: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaResponseView {...props} />
    );
    expect(renderedComponent.dive().find(Button).length).toBe(1);
    expect(props.onPurgeUnita).not.toHaveBeenCalled();
    renderedComponent.dive().find(Button).simulate('click');
    expect(props.onPurgeUnita).toHaveBeenCalled();
  });

  it('fa un push di history se isLoaded = false e contenutoUnita.id > 0', () => {
    const props = {
      ...baseProps,
      contenutoUnita: {
        ...baseProps.contenutoUnita,
        isLoaded: false,
        id: 3,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<UnitaResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/unita-preview/3');
  });

  it('fa un push di history se consegnata = false se contenutoUnita.id > 0', () => {
    const props = {
      ...baseProps,
      contenutoUnita: {
        ...baseProps.contenutoUnita,
        consegnata: false,
        id: 3,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<UnitaResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/unita-preview/3');
  });

  it('fa un push di history se consegnata = false se contenutoUnita.id == 0', () => {
    const props = {
      ...baseProps,
      contenutoUnita: {
        ...baseProps.contenutoUnita,
        consegnata: false,
        id: 0,
      },
      history: {
        push: jest.fn(),
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<UnitaResponseView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith(mockConfiguration.homePage);
  });
});

describe('<UnitaResponse />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerUnita = injectReducer({ key: 'unita', reducer: unitaReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerUnita,
    connect()
  )(UnitaResponse);

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
    expect(receivedProps.step).toEqual(defaultUnitaStep.toJS());
    expect(receivedProps.spinner).toBe(true);
    expect(receivedProps.feedback).toEqual(defaultUnitaFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultUnitaRisposta.toJS());
    expect(receivedProps.contenutoUnita).toEqual(defaultUnitaContenuto.toJS());
  });

  it('la prop onPurgeUnita deve fare il dispatch di unitaReset', () => {
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
    receivedProps.onPurgeUnita();
    expect(store.dispatch).toHaveBeenCalledWith(unitaReset());
  });
});

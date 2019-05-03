import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import Spinner from 'components/Spinner';
import { AlertBanner } from 'components/AlertBanner';
import versioneReducer, {
  defaultVersioneFeedback,
  defaultVersioniLivello,
} from 'containers/Versioni/reducer';
import { versioniLivelloFetch, versioniVersioneEsecuzioneInitialize } from 'containers/Versioni/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';

import VersioneStudente, { VersioniStudenteView } from '../index';
import VersioniLivelloOverview from '../LivelloStudenteOverview';


const mockConfiguration = {
  product: 'alatin',
  hasPremium: true,
  disciplinaId: 777,
  switcherMyTest: true,
  homePage: '/homepage',
};

const mockProps = {
  spinner: false,
  match: {
    params: {
      id: '123',
    },
  },
  history: {
    push: () => { },
  },
  configuration: mockConfiguration,
  feedback: {
    hasFeedback: false,
    tipologia: '',
    messaggio: '',
  },
  versioniLivello: {
    spinnerSmall: {},
    isLoaded: true,
    titolo: 'label livello',
    versioniAssegnate: [{
      id: 100,
      ritirata: false,
      in_corso: false,
      consegnata: false,
      titolo: 'titolo versione 1',
      assegnata_data: '11/03/2018',
      assegnazione: 1000,
      totale_domande: 12,
    }, {
      id: 200,
      ritirata: false,
      in_corso: true,
      consegnata: false,
      titolo: 'titolo versione 2',
      assegnata_data: '01/04/2018',
      assegnazione: 2000,
      totale_domande: 13,
    }, {
      id: 300,
      ritirata: false,
      in_corso: false,
      consegnata: true,
      titolo: 'titolo versione 3',
      assegnata_data: '11/05/2018',
      assegnazione: 3000,
      totale_domande: 14,
    }, {
      id: 400,
      ritirata: true,
      in_corso: true,
      consegnata: false,
      titolo: 'titolo versione 4',
      assegnata_data: '30/06/2018',
      assegnazione: 4000,
      totale_domande: 15,
    }, {
      id: 500,
      ritirata: true,
      in_corso: true,
      consegnata: true,
      titolo: 'titolo versione 5',
      assegnata_data: '21/07/2018',
      assegnazione: 5000,
      totale_domande: 16,
    }],
  },
  onVersioneLivelloFetch: () => { },
  onInitializeEsecuzione: () => { },
  dispatch: () => { },
  userAnagraphics: {
    id: 666,
  },
  userAppData: {
    hints: {
      versione_G: true,
      stepUP: true,
    },
  },
};


describe('<VersioniStudenteView />', () => {
  it('!spinner !feedback.hasFeedback', () => {
    const renderedComponent = shallow(
      <VersioniStudenteView {...mockProps} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(AlertBanner).length).toBe(0);
    expect((renderedComponent).find(VersioniLivelloOverview).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('spinner !feedback.hasFeedback', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <VersioniStudenteView {...props} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(1);
    expect((renderedComponent).find(AlertBanner).length).toBe(0);
    expect((renderedComponent).find(VersioniLivelloOverview).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('!spinner feedback.hasFeedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <VersioniStudenteView {...props} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(AlertBanner).length).toBe(1);
    expect((renderedComponent).find(VersioniLivelloOverview).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('componentDidMount deve chiamare onVersioneLivelloFetch', () => {
    const props = {
      ...mockProps,
      onVersioneLivelloFetch: jest.fn(),
    };
    const spy = jest.spyOn(VersioniStudenteView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <VersioniStudenteView {...props} />
    );

    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(props.onVersioneLivelloFetch).toHaveBeenCalledWith('123', false);
  });

  it('eseguiFunction deve chiamare onInitializeEsecuzione', () => {
    const props = {
      ...mockProps,
      onInitializeEsecuzione: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStudenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onInitializeEsecuzione).not.toHaveBeenCalled();

    instance.eseguiFunction({
      assegnazione: 555,
      in_corso: true,
    });
    expect(props.onInitializeEsecuzione).toHaveBeenCalledWith({
      backUrl: '/versioni-livello/123',
      id: 555,
      isDocente: false,
      userHints: { stepUP: true, versione_G: true },
      history: mockProps.history,
      dispatchFunction: mockProps.dispatch,
      productName: 'alatin',
      inCorso: true,
      userId: 666,
    });
  });

  it('visualizzaStatistiche deve fare un history.push', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };

    const renderedComponent = shallow(
      <VersioniStudenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.history.push).not.toHaveBeenCalled();
    instance.visualizzaStatistiche();
    expect(props.history.push).toHaveBeenCalledWith('/versione-livello-statistiche/123');
  });
});


describe('<VersioneStudente />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerVersione = injectReducer({ key: 'versioni', reducer: versioneReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerVersione,
    connect()
  )(VersioneStudente);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultVersioneFeedback.toJS());
    expect(receivedProps.versioniLivello).toEqual(defaultVersioniLivello.toJS());
  });

  it('testo il corretto funzionemento delle funzioni del mapDispatchToProps', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store: mockStore },
      }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onVersioneLivelloFetch(1, true, 456);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniLivelloFetch(1, true, 456)
    );

    receivedProps.onInitializeEsecuzione({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneEsecuzioneInitialize({ data: 123 })
    );
  });
});

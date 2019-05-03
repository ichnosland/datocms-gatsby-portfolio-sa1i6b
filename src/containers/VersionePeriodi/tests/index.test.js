import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import { userHintDisplay } from 'containers/User/actions';
import TopBar from 'components/TopBar';
import Page from 'components/Page';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import {
  versioniVersioneEsecuzionePeriodoCaricatoSet,
  versioniVersioneEsecuzioneConsegna,
} from 'containers/Versioni/actions';
import versioniReducer, {
  defaultVersioneCaricata,
  defaultVersioneAvanzamento,
  defaultVersioneFeedback,
} from 'containers/Versioni/reducer';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import VersionePeriodiTradotti from 'components/VersionePeriodiTradotti';
import { Button } from 'components/Button';
import VersionePeriodi, { VersionePeriodiView } from '../index';


const mockConfiguration = {
  product: 'lyceum',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const periodi = [{
  periodo: [{
    idPeriodo: 1,
    id: 0,
    keyPeriodo: 0,
    esercizi: [{
      tipo: 'U',
      testo_principale: 'testo_principale',
    }, {
      tipo: 'O',
      testo_principale: 'testo_principale',
    }, {
      tipo: 'G',
      testo_principale: 'testo_principale',
    }],
    testi: [{
      tipo: false,
    }],
  }],
}];

const mockProps = {
  userAppData: {
    docente: true,
    hints: {
      stepUP: true,
      stepG: true,
    },
  },
  configuration: mockConfiguration,
  versioneCaricata: {
    backUrl: '/back-url-versione',
    titolo: 'titolo',
    sottotitolo: 'sottotitolo',
    assegnata: true,
    ritirata: true,
    totaleDomande: 12,
    id: 123,
    periodi,
    isEsecuzioneLoaded: true,
    previewPeriodi: [{
      testoTradotto: 'testo tradotto',
      testoDaTradurre: 'ff',
      idPeriodo: 1,
      keyPeriodo: 0,
    }],
  },
  spinner: false,
  history: {
    push: () => { },
  },
  feedback: {
    hasFeedback: false,
    tipologia: 'tipologia',
    messaggio: 'messaggio',
  },
  versioneAvanzamento: {
    risposteFornite: {},
    periodiDaEseguire: {
      periodiIncompletiPks: [0],
      stepDaEseguire: {
        0: [],
      },
    },
  },
  match: {
    params: {
      id: '123',
    },
  },
  onSetEsecuzione: () => { },
  versioneConsegna: () => { },
  dispatch: () => { },
  onUserHintDisplay: () => { },
  userAnagraphics: {
    id: 444,
  },
  onModalSetData: () => { },
  onModalSetEmptyData: () => { },
};

describe('<VersionePeriodiView />', () => {
  it('visualizza lo stato iniziale quando userappData.docente == true', () => {
    const renderedComponent = shallow(
      <VersionePeriodiView {...mockProps} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/back-url-versione');
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });


  it('se versioneCaricata.isEsecuzioneLoaded == false, vado alla dashboard', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      versioneCaricata: {
        ...mockProps.versioneCaricata,
        isEsecuzioneLoaded: false,
      },
    };
    shallow(<VersionePeriodiView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/homepage');
  });

  it('visualizza lo stato iniziale quando userappData.docente == false', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: false,
      },
    };
    const renderedComponent = shallow(
      <VersionePeriodiView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/back-url-versione');
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('eseguiPeriodo deve chiamare onSetEsecuzione', () => {
    const props = {
      ...mockProps,
      onSetEsecuzione: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersionePeriodiView {...props} />
    );

    expect(props.onSetEsecuzione).not.toHaveBeenCalled();
    renderedComponent.instance().props.onSetEsecuzione();
    expect(props.onSetEsecuzione).toHaveBeenCalled();
  });

  it('visualizza lo stato iniziale quando spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <VersionePeriodiView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza lo stato iniziale quando c\'è un feedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        hasFeedback: true,
        messaggio: 'messaggio',
        tipologia: 'help',
      },
    };
    const renderedComponent = shallow(
      <VersionePeriodiView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('calcolaPropsPreviewPeriodo > goto.onClick deve chiamare this.eseguiPeriodo, che deve ritornare false', () => {
    const renderedComponent = shallow(
      <VersionePeriodiView {...mockProps} />
    );

    expect(
      renderedComponent.find(VersionePeriodiTradotti).props().periodi[0].goTo.onClick()
    ).toBe(false);
  });

  it('calcolaPropsPreviewPeriodo > goto.onClick deve chiamare this.eseguiPeriodo, che deve ritornare false', () => {
    const props = {
      ...mockProps,
      versioneAvanzamento: {
        ...mockProps.versioneAvanzamento,
        periodiDaEseguire: {
          stepDaEseguire: { 1: [0] },
          periodiIncompletiPks: [1],
        },
      },
      onUserHintDisplay: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersionePeriodiView {...props} />
    );

    expect(renderedComponent.find(VersionePeriodiTradotti).props().periodi[0].goTo.onClick()).toBe(true);
    expect(props.onUserHintDisplay).toHaveBeenCalled();
  });

  it('calcolaPropsPreviewPeriodo di default non deve attivare la funzione goTo', () => {
    const renderedComponent = shallow(
      <VersionePeriodiView {...mockProps} />
    );

    expect(
      renderedComponent.instance().calcolaPropsPreviewPeriodo().periodi[0].goTo.enable
    ).toBe(false);
  });

  it('calcolaPropsPreviewPeriodo restituire traduzione suggested se versioneAvanzamento.risposteFornite == undefined', () => {
    const props = {
      ...mockProps,
      versioneAvanzamento: {
        ...mockProps.versioneAvanzamento,
        risposteFornite: {},
      },
    };
    const renderedComponent = shallow(
      <VersionePeriodiView {...props} />
    );

    expect(
      renderedComponent.instance().calcolaPropsPreviewPeriodo().periodi[0].testoTradotto
    ).toBe('<span class="suggested">testo_principale</span> <span class="suggested">testo_principale</span> <span class="suggested">testo_principale</span>');
  });

  it('calcolaPropsPreviewPeriodo Container > Button deve chiamare onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersionePeriodiView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(Button).simulate('click');
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Consegna versione',
      contenuto: 'Sei sicuro di voler consegnare? Se consegni non potrai riprendere la versione',
      acceptButton: {
        onClick: expect.any(Function),
      },
      show: true,
    });
  });
});

describe('<VersionePeriodi />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerVersioni = injectReducer({ key: 'versioni', reducer: versioniReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerVersioni,
    connect()
  )(VersionePeriodi);

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
    expect(receivedProps.versioneCaricata).toEqual(defaultVersioneCaricata.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultVersioneFeedback.toJS());
    expect(receivedProps.versioneAvanzamento).toEqual(defaultVersioneAvanzamento.toJS());
  });

  it('le props settate con mapDispatchToProps devono funzionare correttamente', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();

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

    receivedProps.onSetEsecuzione({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      versioniVersioneEsecuzionePeriodoCaricatoSet({ data: 123 })
    );

    receivedProps.versioneConsegna({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      versioniVersioneEsecuzioneConsegna({ data: 123 })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    receivedProps.onModalSetEmptyData();
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );

    receivedProps.onUserHintDisplay({ data: 1234 });
    expect(store.dispatch).toHaveBeenCalledWith(
      userHintDisplay({ data: 1234 })
    );
  });
});

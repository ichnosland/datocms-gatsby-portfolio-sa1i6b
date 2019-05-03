import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import StatisticheView from 'components/StatisticheView';
import AlertBanner from 'components/AlertBanner';
import userReducer from 'containers/User/reducer';
import corsiReducer from 'containers/Corsi/reducer';
import Container from 'components/Container';
import FlexBox from 'components/FlexBox';
import { GhostButton } from 'components/Button';
import { modalSetData } from 'containers/ModalBox/actions';
import ZendeskTicket from 'containers/ZendeskTicket';
import { API_BASE_PATH } from 'configuration';
import { mockStatisticheElaborateDocente } from 'common/testing-mocks';

import {
  defaultVersioneStatisticheFeedback,
  defaultStatisticaCaricata,
} from '../reducer';
import {
  versioniStatisticheDataSet,
  versioniStatisticheDataFetch,
  versioniStatisticheDataSelect,
  versioniStatisticheDidascaliaSet,
  versioniStatisticheDidascaliaReset,
} from '../actions';
import VersioniStatistiche, { VersioniStatisticheView } from '../index';


const mockConfiguration = {
  product: 'product',
  blocco: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const mockProps = {
  spinner: false,
  match: {
    params: {
      idAssegnazione: '123',
      idMissione: '1',
    },
  },
  configuration: mockConfiguration,
  feedback: {
    hasFeedback: false,
    tipologia: 'tipologia',
    messaggio: 'messaggio',
  },
  userAppData: {
    docente: true,
  },
  userAnagraphics: {
    first_name: 'nome',
    last_name: 'cognome',
    id: 11,
  },
  history: {
    push: () => { },
  },
  statisticheCaricate: mockStatisticheElaborateDocente,
  corsoSelezionato: {
    pk: 1255,
    isCorsoLoaded: true,
    isIscrittiLoaded: true,
    nome: 'nomecorso',
    iscritti: [{
      id: 666,
      first_name: 'nome',
      last_name: 'cognome',
    }],
  },
  onFetchDataStatistiche: () => { },
  onSetDataStatistiche: () => { },
  onModalSetData: () => { },
  onStatisticheSelect: () => { },
  onDidascaliaSet: () => { },
  onDidascaliaReset: () => { },
  didascalia: {
    display: false,
    tipologia: 'tipologia',
    y: 1,
    x: '#1',
    titolo: 'titolo',
    campioni: 1,
  },
};

describe('<VersioniStatisticheView />', () => {
  it('componentDidMount se !isDocente', () => {
    const spy = jest.spyOn(VersioniStatisticheView.prototype, 'componentDidMount');
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        docente: false,
      },
      onFetchDataStatistiche: jest.fn(),
    };

    expect(props.onFetchDataStatistiche).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
    shallow(<VersioniStatisticheView {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.onFetchDataStatistiche).toHaveBeenCalledWith({
      idAssegnazione: '123',
      idMissione: '1',
      idCorso: 1255,
      isDocente: false,
      idUtente: 11,
      history: mockProps.history,
    });
  });

  it('componentDidMount se isDocente && !isIscrittiLoaded', () => {
    jest.clearAllMocks();
    const spy = jest.spyOn(VersioniStatisticheView.prototype, 'componentDidMount');
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        docente: true,
      },
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        isIscrittiLoaded: false,
      },
      onFetchDataStatistiche: jest.fn(),
    };

    expect(spy).not.toHaveBeenCalled();
    expect(props.onFetchDataStatistiche).not.toHaveBeenCalled();
    shallow(<VersioniStatisticheView {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.onFetchDataStatistiche).not.toHaveBeenCalled();
  });

  it('visualizza il componente nel suo stato iniziale', () => {
    const renderedComponent = shallow(
      <VersioniStatisticheView {...mockProps} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza se studente selezionato', () => {
    const props = {
      ...mockProps,
      statisticheCaricate: {
        ...mockProps.statisticheCaricate,
        utenteSelezionato: {
          key: 0,
          id: 335406,
        },
      },
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il componente quando lo spinner è attivo', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(StatisticheView).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il componente quando ho un feedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(StatisticheView).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il componente quando non ho previous / next', () => {
    const props = {
      ...mockProps,
      statisticheCaricate: {
        ...mockProps.statisticheCaricate,
        previousId: -1,
        nextId: -1,
      },
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Controllo il funzionamento del back se docente === true', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: true,
      },
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/versione-preview/777');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Controllo il funzionamento del back se docente === false', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: false,
      },
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/versione-preview/444');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('topBar > rightBtn.onClickFunction deve triggerare onModalSetData se docente e non ha selezionato studenti', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    renderedComponent.find(TopBar).props().rightBtn.onClickFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'statistiche_versioni',
            provenienzaReadable: 'Statistiche versione',
            titolo: 'Titolo statistica',
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/assegnazioneversione/123/change`,
            adminURI: '/versione-statistiche/123',
            corsoSelezionato: 'nomecorso (1255)',
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
    expect(renderedComponent.find(TopBar).props().rightBtn.icon).toBe('topBarFeedback');
  });

  it('topBar > rightBtn.onClickFunction deve triggerare window.print se docente e ha utente selezionato', () => {
    const props = {
      ...mockProps,
      statisticheCaricate: {
        ...mockProps.statisticheCaricate,
        utenteSelezionato: {
          key: 0,
          id: 335406,
        },
      },
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    renderedComponent.find(TopBar).props().button.onClick();
    expect(renderedComponent.find(TopBar).props().button.buttonIcon).toBe('print');
    const spy = jest.spyOn(window, 'print');
    expect(spy).toHaveBeenCalled();
  });

  it('topBar > rightBtn.onClickFunction deve triggerare onModalSetData se studente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: false,
      },
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    renderedComponent.find(TopBar).props().rightBtn.onClickFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'statistiche_versioni',
            provenienzaReadable: 'Statistiche versione',
            titolo: 'Titolo statistica',
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/assegnazioneversione/123/change`,
            adminURI: '/versione-statistiche/123',
            corsoSelezionato: undefined,
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });


  it('loadStat docente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        docente: true,
      },
      onStatisticheSelect: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onStatisticheSelect).not.toHaveBeenCalled();
    instance.loadStat(1111);
    expect(props.onStatisticheSelect).toHaveBeenCalledWith({
      idAssegnazione: 1111,
      idMissione: 5432,
      statisticheDisponibili: [{
        versione_id: 3,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        versione_id: 4,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        versione_id: 94,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        versione_id: 6,
        studenti: [],
        esercizi: [],
        risposte: {},
      }],
      history: mockProps.history,
      idUtente: 0,
    });
  });

  it('loadStat studente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        docente: false,
      },
      onStatisticheSelect: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onStatisticheSelect).not.toHaveBeenCalled();
    instance.loadStat(1111);
    expect(props.onStatisticheSelect).toHaveBeenCalledWith({
      idAssegnazione: 1111,
      idMissione: 5432,
      statisticheDisponibili: [{
        versione_id: 3,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        versione_id: 4,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        versione_id: 94,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        versione_id: 6,
        studenti: [],
        esercizi: [],
        risposte: {},
      }],
      history: mockProps.history,
      idUtente: 11,
    });
  });

  it('selezionaUtente deve chiamare onSetDataStatistiche', () => {
    const props = {
      ...mockProps,
      onSetDataStatistiche: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onSetDataStatistiche).not.toHaveBeenCalled();
    instance.selezionaUtente({ key: 1, id: 123 });
    expect(props.onSetDataStatistiche).toHaveBeenCalledWith({
      utenteSelezionato: { key: 1, id: 123 },
    });
  });

  it('selezionaUtente deve fare return false se studente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: false,
      },
      onSetDataStatistiche: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onSetDataStatistiche).not.toHaveBeenCalled();
    instance.selezionaUtente({ key: 1, id: 123 });
    expect(props.onSetDataStatistiche).not.toHaveBeenCalled();
  });

  it('apriChiudiSezioni deve chiamare onSetDataStatistiche', () => {
    const props = {
      ...mockProps,
      onSetDataStatistiche: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onSetDataStatistiche).not.toHaveBeenCalled();
    instance.apriChiudiSezioni('key', true, true, { 1: true });
    expect(props.onSetDataStatistiche).toHaveBeenCalledWith({
      openedSections: {
        key: {
          blocco: true,
          risposte: true,
          studenti: { 1: true },
        },
      },
    });
  });

  it('apriChiudiSezioni deve chiamare onSetDataStatistiche con parametri di default', () => {
    const props = {
      ...mockProps,
      onSetDataStatistiche: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onSetDataStatistiche).not.toHaveBeenCalled();
    instance.apriChiudiSezioni('key');
    expect(props.onSetDataStatistiche).toHaveBeenCalledWith({
      openedSections: {
        key: {
          blocco: true,
          risposte: false,
          studenti: {},
        },
      },
    });
  });

  it('deve chiamare onFetchDataStatistiche se corsoSelezionato.pk cambia', () => {
    const props = {
      ...mockProps,
      onFetchDataStatistiche: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 666 } });
    expect(props.onFetchDataStatistiche).toHaveBeenCalledWith({
      history: mockProps.history,
      idAssegnazione: '123',
      idCorso: 1255,
      idMissione: '1',
      idUtente: undefined,
      isDocente: true,
    });
    expect(props.onFetchDataStatistiche).toHaveBeenCalledTimes(2);
  });

  it('deve chiamare onFetchDataStatistiche solo al mount se corsoSelezionato.pk non cambia dopo un update', () => {
    const props = {
      ...mockProps,
      onFetchDataStatistiche: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 1255 } });
    expect(props.onFetchDataStatistiche).toHaveBeenCalledTimes(1);
  });

  it('prev e next devono chiamare loadStat', () => {
    const props = {
      ...mockProps,
    };
    const renderedComponent = shallow(
      <VersioniStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'loadStat');

    expect(spy).not.toHaveBeenCalled();

    // previous
    renderedComponent.find(Container).find(FlexBox).at(0).find(GhostButton).at(0).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);

    // next
    renderedComponent.find(Container).find(FlexBox).at(0).find(GhostButton).at(1).simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).lastCalledWith(2);
  });
});

describe('<VersioniStatistiche />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    connect()
  )(VersioniStatistiche);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { idAssegnazione: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultVersioneStatisticheFeedback.toJS());
    expect(receivedProps.statisticheCaricate).toEqual(defaultStatisticaCaricata.toJS());
  });

  it('testo il corretto funzionemento delle funzioni del mapDispatchToProps', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { idAssegnazione: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store: mockStore },
      }
    ).dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onFetchDataStatistiche(1, 2, true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniStatisticheDataFetch(1, 2, true)
    );

    receivedProps.onSetDataStatistiche({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniStatisticheDataSet({ data: 123 })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    receivedProps.onStatisticheSelect({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniStatisticheDataSelect({ data: 123 })
    );

    receivedProps.onDidascaliaSet({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniStatisticheDidascaliaSet({ data: 123 })
    );

    receivedProps.onDidascaliaReset();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniStatisticheDidascaliaReset()
    );
  });
});

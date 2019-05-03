import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import userReducer from 'containers/User/reducer';
import corsiReducer from 'containers/Corsi/reducer';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import FlexBox from 'components/FlexBox';
import { GhostButton } from 'components/Button';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import StatisticheView from 'components/StatisticheView';
import ZendeskTicket from 'containers/ZendeskTicket';
import { provaCompetenzaStatisticheCaricata } from 'common/testing-fixtures/prova-competenza-report';
import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';

import { defaultProvaCompetenzaFeedback, defaultStatisticaCaricata } from '../reducer';
import {
  provaCompetenzaStatisticheDataSet,
  provaCompetenzaStatisticheDataFetch,
  provaCompetenzaStatisticheDataSelect,
  provaCompetenzaDidascaliaSet,
  provaCompetenzaDidascaliaReset,
} from '../actions';
import ProvaCompetenzaStatistiche, { ProvaCompetenzaStatisticheView } from '../index';


const mockConfiguration = {
  product: 'product',
  blocco: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const mockProps = {
  spinner: false,
  history: {
    push: () => { },
  },
  match: {
    params: {
      idAssegnazione: '123',
      idMissione: '1',
    },
  },
  userAnagraphics: {
    first_name: 'nome',
    last_name: 'cognome',
    id: 123,
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
  statisticheCaricate: provaCompetenzaStatisticheCaricata,
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
  onStatisticheSelect: () => { },
  onModalSetData: () => { },
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

describe('<ProvaCompetenzaStatisticheView />', () => {
  it('componentDidMount se !isDocente', () => {
    jest.clearAllMocks();
    const spy = jest.spyOn(ProvaCompetenzaStatisticheView.prototype, 'componentDidMount');
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
    shallow(<ProvaCompetenzaStatisticheView {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.onFetchDataStatistiche).toHaveBeenCalledWith({
      idAssegnazione: '123',
      idMissione: '1',
      idCorso: 1255,
      isDocente: false,
      idUtente: 123,
      history: mockProps.history,
    });
  });

  it('componentDidMount se isDocente && !isIscrittiLoaded', () => {
    jest.clearAllMocks();
    const spy = jest.spyOn(ProvaCompetenzaStatisticheView.prototype, 'componentDidMount');
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
    shallow(<ProvaCompetenzaStatisticheView {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.onFetchDataStatistiche).not.toHaveBeenCalled();
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
      <ProvaCompetenzaStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onStatisticheSelect).not.toHaveBeenCalled();
    instance.loadStat(1111);
    expect(props.onStatisticheSelect).toHaveBeenCalledWith({
      idAssegnazione: 1111,
      idMissione: 666666,
      statisticheDisponibili: [{
        prova_competenza_id: 3,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        prova_competenza_id: 4,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        prova_competenza_id: 94,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        prova_competenza_id: 6,
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
      <ProvaCompetenzaStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onStatisticheSelect).not.toHaveBeenCalled();
    instance.loadStat(1111);
    expect(props.onStatisticheSelect).toHaveBeenCalledWith({
      idAssegnazione: 1111,
      idMissione: 666666,
      statisticheDisponibili: [{
        prova_competenza_id: 3,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        prova_competenza_id: 4,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        prova_competenza_id: 94,
        studenti: [],
        esercizi: [],
        risposte: {},
      }, {
        prova_competenza_id: 6,
        studenti: [],
        esercizi: [],
        risposte: {},
      }],
      history: mockProps.history,
      idUtente: 123,
    });
  });

  it('prev e next devono chiamare loadStat', () => {
    const props = {
      ...mockProps,
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'loadStat');

    expect(spy).not.toHaveBeenCalled();

    // previous
    renderedComponent.find(Container).find(FlexBox).at(0).find(GhostButton).at(0).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(4);

    // next
    renderedComponent.find(Container).find(FlexBox).at(0).find(GhostButton).at(1).simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).lastCalledWith(6);
  });

  it('controllo il contenuto del backnav se è docente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: true,
      },
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/prova-competenza-preview/5556');
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo il contenuto del backnav se è studente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: false,
      },
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/prova-competenza-preview/123');
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('selezionaUtente deve chiamare onSetDataStatistiche', () => {
    const props = {
      ...mockProps,
      onSetDataStatistiche: jest.fn(),
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 1255 } });
    expect(props.onFetchDataStatistiche).toHaveBeenCalledTimes(1);
  });

  it('topBar > rightBtn.onClickFunction deve triggerare onModalSetData se docente e non ha selezionato studenti', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaStatisticheView {...props} />
    );
    renderedComponent.find(TopBar).props().rightBtn.onClickFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'statistiche_prova_competenza',
            provenienzaReadable: 'Statistiche prova competenza',
            titolo: 'La mia casa - prova per competenza',
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/assegnazioneprovacompetenza/123/change`,
            adminURI: '/prova-competenza-statistiche/123',
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

  it('topBar > rightBtn.onClickFunction deve triggerare onModalSetData se docente e ha utente selezionato', () => {
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
      <ProvaCompetenzaStatisticheView {...props} />
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
      <ProvaCompetenzaStatisticheView {...props} />
    );
    renderedComponent.find(TopBar).props().rightBtn.onClickFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'statistiche_prova_competenza',
            provenienzaReadable: 'Statistiche prova competenza',
            titolo: 'La mia casa - prova per competenza',
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/assegnazioneprovacompetenza/123/change`,
            adminURI: '/prova-competenza-statistiche/123',
            corsoSelezionato: undefined,
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });
});

describe('<ProvaCompetenzaStatistiche />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    connect()
  )(ProvaCompetenzaStatistiche);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { idAssegnazione: '123', idMissione: '456' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultProvaCompetenzaFeedback.toJS());
    expect(receivedProps.statisticheCaricate).toEqual(defaultStatisticaCaricata.toJS());
  });

  it('testo il corretto funzionemento delle funzioni del mapDispatchToProps', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { idAssegnazione: '123', idMissione: '456' } }}
        history={{ push: () => { } }}
      />, {
        context: { store: mockStore },
      }
    ).dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onFetchDataStatistiche(1, 2, true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaStatisticheDataFetch(1, 2, true)
    );

    receivedProps.onSetDataStatistiche({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaStatisticheDataSet({ data: 123 })
    );

    receivedProps.onStatisticheSelect({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaStatisticheDataSelect({ data: 123 })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    receivedProps.onDidascaliaSet({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaDidascaliaSet({ data: 123 })
    );

    receivedProps.onDidascaliaReset();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaDidascaliaReset()
    );
  });
});

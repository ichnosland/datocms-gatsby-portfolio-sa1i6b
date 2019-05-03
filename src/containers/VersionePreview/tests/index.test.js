import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import TopBar from 'components/TopBar';
import EsecuzioneOverview from 'components/EsecuzioneOverview';
import Spinner from 'components/Spinner';
import { AlertBanner } from 'components/AlertBanner';
import versioniReducer, { defaultVersioneFeedback, defaultVersioneCaricata } from 'containers/Versioni/reducer';
import { versioniVersioneAssegna, versioniVersioneRitira, versioniVersioneEsecuzioneInitialize, versioniVersioneFetchTrigger } from 'containers/Versioni/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import corsiReducer, { defaultcorsoSelezionato } from 'containers/Corsi/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import EsecuzionePreview, { EsecuzionePreviewView } from '../index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const mockProps = {
  spinner: false,
  match: {
    params: {
      id: '123',
    },
  },
  configuration: mockConfiguration,
  feedback: {
    hasFeedback: false,
    tipologia: '',
    messaggio: '',
  },
  versioneCaricata: {
    missione: 111,
    titolo: 'titolo',
    assegnata: false,
    ritirata: false,
    inCorso: false,
    idAssegnazione: 987,
    totaleDomande: 12,
    id: 456,
    dataAssegnazione: '01/04/2018',
    isEsecuzioneLoaded: true,
  },
  corsoSelezionato: {
    pk: 1255,
    iscritti: [],
    nome: 'nomecorso',
    isCorsoLoaded: true,
    isIscrittiLoaded: true,
  },
  userAppData: {
    docente: true,
  },
  history: {
    push: () => { },
  },
  versioneAssegna: () => { },
  versioneRitira: () => { },
  fetchVersione: () => { },
  onModalSetData: () => { },
  onModalSetEmptyData: () => { },
  onInitializeEsecuzione: () => { },
};

describe('<EsecuzionePreviewView />', () => {
  it('visualizza il componente per assegnata = false, ritirata = false', () => {
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...mockProps} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/homepage');
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve chiamare fetchVersione se versione non è caricata', () => {
    const props = {
      ...mockProps,
      fetchVersione: jest.fn(),
      versioneCaricata: {
        ...mockProps.versioneCaricata,
        isEsecuzioneLoaded: false,
      },
    };
    shallow(
      <EsecuzionePreviewView {...props} />
    );
    expect(props.fetchVersione).toHaveBeenCalledWith('123', true, 1255);
  });

  it('deve chiamare fetchVersione se corsoSelezionato.pk cambia', () => {
    const props = {
      ...mockProps,
      fetchVersione: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 666 } });
    expect(props.fetchVersione).toHaveBeenCalledWith('123', true, 1255);
  });

  it('deve chiamare fetchVersione se corsoSelezionato.pk non cambia', () => {
    const props = {
      ...mockProps,
      fetchVersione: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 1255 } });
    expect(props.fetchVersione).toHaveBeenCalledWith('123', true, 1255);
  });

  it('visualizza il componente per spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il componente per feedback.hasFeedback = true', () => {
    const props = {
      ...mockProps,
      feedback: {
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      },
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo che eseguiProvaFunction chiami onInitializeEsecuzione se docente = true', () => {
    const props = {
      ...mockProps,
      onInitializeEsecuzione: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(props.onInitializeEsecuzione).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().eseguiSimulaFx();
    expect(props.onInitializeEsecuzione).toHaveBeenCalledWith({
      backUrl: '/versione-preview/456',
      id: '123',
      inCorso: false,
      isDocente: true,
      history: props.history,
    });
  });

  it('controllo che eseguiProvaFunction chiami history.push se docente = false', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: false,
      },
      onInitializeEsecuzione: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(props.onInitializeEsecuzione).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().eseguiSimulaFx();
    expect(props.onInitializeEsecuzione).toHaveBeenCalledWith({
      backUrl: '/versione-preview/456',
      id: '123',
      inCorso: false,
      isDocente: false,
      history: props.history,
    });
  });

  it('controllo che assegnaFunction chiami onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().assegnaFx();
    expect(props.onModalSetData).toHaveBeenCalled();
  });

  it('controllo che assegnaFunction dia errore e non chiami onModalSetData se non ho un corso', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        pk: 0,
      },
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().assegnaFx();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione versione',
      contenuto: 'Per assegnare una versione devi avere creato almeno una classe',
      show: true,
    });
  });

  it('controllo che assegnaFunction dia errore e non chiami onModalSetData se ho un corso ma senza iscritti', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [],
      },
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().assegnaFx();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione versione',
      contenuto: 'Non posso assegnare una versione ad una classe vuota (<strong>nomecorso</strong>)',
      show: true,
    });
  });

  it('controllo che visualizzaStatistiche chiami history.push se docente == true', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      userAppData: {
        docente: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.history.push).not.toHaveBeenCalled();
    instance.visualizzaStatistiche();
    expect(props.history.push).toHaveBeenCalledWith('/versione-statistiche/111/987');
  });

  it('controllo che visualizzaStatistiche chiami history.push se docente == false', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      userAppData: {
        docente: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.history.push).not.toHaveBeenCalled();
    instance.visualizzaStatistiche();
    expect(props.history.push).toHaveBeenCalledWith('/versione-statistiche/111/456');
  });

  it('controllo che ritiraFunction chiami onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().ritiraFx();
    expect(props.onModalSetData).toHaveBeenCalled();
  });
});

describe('<EsecuzionePreview />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });
  const withReducerVersioni = injectReducer({ key: 'versioni', reducer: versioniReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    withReducerVersioni,
    withReducerModalBox,
    connect()
  )(EsecuzionePreview);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.corsoSelezionato).toEqual(defaultcorsoSelezionato.toJS());
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.versioneCaricata).toEqual(defaultVersioneCaricata.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultVersioneFeedback.toJS());
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
    ).dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.fetchVersione(1, true, 456);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneFetchTrigger(1, true, 456)
    );

    receivedProps.versioneAssegna(1, true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneAssegna(1, true)
    );

    receivedProps.versioneRitira(1, 2);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneRitira(1, 2)
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetData({ data: 123 }));

    receivedProps.onModalSetEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetEmptyData());

    receivedProps.onInitializeEsecuzione({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneEsecuzioneInitialize({ data: 123 })
    );
  });
});

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
import provaCompetenzaReducer, {
  defaultProvaCompetenzaFeedback,
  defaultProvaCompetenzaContenuto,
  defaultProvaCompetenzaRisposta,
  defaultProvaCompetenzaStep,
} from 'containers/ProvaCompetenza/reducer';
import {
  provaCompetenzaContenutoFetch,
  provaCompetenzaAssegna,
  provaCompetenzaRitira,
  provaCompetenzaStepInitialize,
} from 'containers/ProvaCompetenza/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import corsiReducer, { defaultcorsoSelezionato } from 'containers/Corsi/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import ProvaCompetenzaPreview, { ProvaCompetenzaPreviewView } from '../index';


const mockConfiguration = {
  product: 'lyceum',
  hasPremium: true,
  disciplinaId: 777,
  homePage: '/homepage',
};

const mockProps = {
  spinner: false,
  dispatch: () => { },
  match: {
    params: {
      id: '123',
    },
  },
  configuration: mockConfiguration,
  history: {
    push: () => { },
  },
  feedback: {
    hasFeedback: false,
    tipologia: '',
    messaggio: '',
  },
  userAppData: {
    docente: true,
    hints: {
      stepG: true,
      stepUP: true,
    },
  },
  userAnagraphics: {
    id: 666,
  },
  corsoSelezionato: {
    pk: 2000,
    iscritti: [],
    nome: 'nomecorso',
    isCorsoLoaded: false,
    isIscrittiLoaded: false,
  },
  contenutoProva: {
    isLoaded: true,
    inCorso: true,
    missione: 555,
    idAssegnazione: 444,
    consegnata: false,
    ritirata: false,
    assegnata: true,
    id: 123,
    titolo: 'titolo',
    sottotitolo: 'sottotitolo',
    testo: 'testo',
    prerequisito: 'prerequisito',
    totaleDomande: 12,
  },
  onProvaCompetenzaContenutoFetch: () => { },
  onProvaCompetenzaAssegna: () => { },
  onProvaCompetenzaRitira: () => { },
  onModalSetData: () => { },
  onModalSetEmptyData: () => { },
  onProvaCompetenzaStepInizialize: () => { },
};

describe('<ProvaCompetenzaPreviewView />', () => {
  it('visualizza il componente per assegnata = false, ritirata = false', () => {
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...mockProps} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/homepage');
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve chiamare onProvaCompetenzaContenutoFetch 2 volte (di cui una al mount) se corsoSelezionato.pk cambia', () => {
    const props = {
      ...mockProps,
      onProvaCompetenzaContenutoFetch: jest.fn(),
      corsoSelezionato: {
        pk: 333,
        nome: 'nomecorso',
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
        iscritti: [],
      },
    };
    const spyMount = jest.spyOn(ProvaCompetenzaPreviewView.prototype, 'componentDidMount');
    const spyUpdate = jest.spyOn(ProvaCompetenzaPreviewView.prototype, 'componentDidUpdate');
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(spyUpdate).not.toHaveBeenCalled();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 666 } });
    expect(props.onProvaCompetenzaContenutoFetch).toHaveBeenCalledWith('123', true, 333);
    expect(spyMount).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(props.onProvaCompetenzaContenutoFetch).toHaveBeenCalledTimes(2);
    spyMount.mockRestore();
    spyUpdate.mockRestore();
  });

  it('deve chiamare onProvaCompetenzaContenutoFetch una volta sola (on mount) se corsoSelezionato.pk non cambia', () => {
    const props = {
      ...mockProps,
      onProvaCompetenzaContenutoFetch: jest.fn(),
      corsoSelezionato: {
        pk: 333,
        nome: 'nomecorso',
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
        iscritti: [],
      },
    };
    const spyMount = jest.spyOn(ProvaCompetenzaPreviewView.prototype, 'componentDidMount');
    const spyUpdate = jest.spyOn(ProvaCompetenzaPreviewView.prototype, 'componentDidUpdate');
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(spyUpdate).not.toHaveBeenCalled();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 333 } });
    expect(spyMount).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(props.onProvaCompetenzaContenutoFetch).toHaveBeenCalledWith('123', true, 333);
    expect(props.onProvaCompetenzaContenutoFetch).toHaveBeenCalledTimes(1);
  });

  it('visualizza il componente per spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...props} />
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
      <ProvaCompetenzaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo che eseguiProvaFunction chiami onProvaCompetenzaStepInizialize se docente = true', () => {
    const props = {
      ...mockProps,
      onProvaCompetenzaStepInizialize: jest.fn(),
      userAppData: {
        docente: true,
      },
      corsoSelezionato: {
        pk: 333,
        nome: 'nomecorso',
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
        iscritti: [],
      },
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(props.onProvaCompetenzaStepInizialize).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().eseguiSimulaFx();
    expect(props.onProvaCompetenzaStepInizialize).toHaveBeenCalledWith({
      id: 123,
      isDocente: true,
      history: props.history,
      userAnagraphics: props.userAnagraphics,
      userAppData: props.userAppData,
      configuration: props.configuration,
      dispatch: props.dispatch,
    });
  });

  it('controllo che eseguiProvaFunction chiami history.push se docente = false', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: false,
      },
      onProvaCompetenzaStepInizialize: jest.fn(),
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(props.onProvaCompetenzaStepInizialize).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().eseguiSimulaFx();
    expect(props.onProvaCompetenzaStepInizialize).toHaveBeenCalledWith({
      id: 123,
      isDocente: false,
      history: props.history,
      userAnagraphics: props.userAnagraphics,
      userAppData: props.userAppData,
      configuration: props.configuration,
      dispatch: props.dispatch,
    });
  });

  it('controllo che assegnaFunction chiami onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...props} />
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
      <ProvaCompetenzaPreviewView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().assegnaFx();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione prova per competenza',
      contenuto: 'Per assegnare una prova devi avere creato almeno una classe',
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
      <ProvaCompetenzaPreviewView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().assegnaFx();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione prova per competenza',
      contenuto: 'Non posso assegnare una prova per competenza ad una classe vuota (<strong>nomecorso</strong>)',
      show: true,
    });
  });

  it('controllo che visualizzaStatistiche chiami history.push se docente = true', () => {
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
      <ProvaCompetenzaPreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.history.push).not.toHaveBeenCalled();
    instance.visualizzaStatistiche();
    expect(props.history.push).toHaveBeenCalledWith('/prova-competenza-statistiche/555/444');
  });

  it('controllo che visualizzaStatistiche chiami history.push se docente = false', () => {
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
      <ProvaCompetenzaPreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.history.push).not.toHaveBeenCalled();
    instance.visualizzaStatistiche();
    expect(props.history.push).toHaveBeenCalledWith('/prova-competenza-statistiche/555/123');
  });

  it('controllo che ritiraFunction chiami onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).props().ritiraFx();
    expect(props.onModalSetData).toHaveBeenCalled();
  });
});

describe('<ProvaCompetenzaPreview />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });
  const withReducerProvaCompetenza = injectReducer({ key: 'provaCompetenza', reducer: provaCompetenzaReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    withReducerProvaCompetenza,
    withReducerModalBox,
    connect()
  )(ProvaCompetenzaPreview);

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
    expect(receivedProps.step).toEqual(defaultProvaCompetenzaStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultProvaCompetenzaFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultProvaCompetenzaRisposta.toJS());
    expect(receivedProps.contenutoProva).toEqual(defaultProvaCompetenzaContenuto.toJS());
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

    receivedProps.onProvaCompetenzaContenutoFetch(1, true, 456);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaContenutoFetch(1, true, 456)
    );

    receivedProps.onProvaCompetenzaAssegna(1, 3);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaAssegna(1, 3)
    );

    receivedProps.onProvaCompetenzaRitira(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaRitira(1)
    );

    receivedProps.onProvaCompetenzaStepInizialize({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaCompetenzaStepInitialize({ data: 123 })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetData({ data: 123 }));

    receivedProps.onModalSetEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetEmptyData());
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import { FlexWrap } from 'components/FlexBox';
import { AlertBanner } from 'components/AlertBanner';
import unitaReducer, {
  defaultUnitaFeedback,
  defaultUnitaContenuto,
  defaultUnitaRisposta,
} from 'containers/Unita/reducer';
import {
  unitaContenutoFetch,
  unitaAssegna,
  unitaStepInitialize,
} from 'containers/Unita/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import corsiReducer, { defaultcorsoSelezionato } from 'containers/Corsi/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';

import UnitaPreview, { UnitaPreviewView, UnitWrap } from '../index';
import UnitaPreviewStudente from '../UnitaPreviewStudente';
import UnitaPreviewDocente, { UnitButton } from '../UnitaPreviewDocente';

const mockConfiguration = {
  product: 'prodotto',
  hasPremium: true,
  disciplinaId: 777,
  switcherMyTest: true,
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
  contenutoUnita: {
    isLoaded: true,
    unitaCompletata: false,
    assegnata: true,
    id: 333,
    titolo: 'Titolo unita',
    prerequisito: 3456,
    lezione: 555,
    lezioni: {
      totali: 4,
      completate: 2,
      andamento: {
        0: {
          inCorso: false,
          lezioneCompletata: true,
          sbloccata: true,
          difficolta: 'ACA01',
        },
        1: {
          inCorso: false,
          lezioneCompletata: true,
          sbloccata: true,
          difficolta: 'ACA02',
        },
        2: {
          inCorso: true,
          lezioneCompletata: false,
          sbloccata: true,
          difficolta: 'ACA03',
        },
        3: {
          inCorso: false,
          lezioneCompletata: false,
          sbloccata: false,
          difficolta: 'ACA04',
        },
      },
    },
  },
  onUnitaContenutoFetch: () => { },
  onUnitaAssegna: () => { },
  onUnitaRitira: () => { },
  onModalSetData: () => { },
  onModalSetEmptyData: () => { },
  onUnitaStepInizialize: () => { },
};

describe('<UnitaPreviewView />', () => {
  it('pulsanti della topbar quando è presente una lezione ed è abilitato', () => {
    const renderedComponent = shallow(
      <UnitaPreviewView {...mockProps} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().closeBtn).toEqual({
      url: '/homepage',
      enabled: true,
    });
    expect(renderedComponent.find(TopBar).props().lesson).toEqual({
      url: '/lezione/555',
      enabled: true,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('pulsanti della topbar quando non è presente una lezione deve essere disabilitato', () => {
    const props = {
      ...mockProps,
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        lezione: 0,
      },
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().closeBtn).toEqual({
      url: '/homepage',
      enabled: true,
    });
    expect(renderedComponent.find(TopBar).props().lesson).toEqual({
      url: '/lezione/0',
      enabled: false,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve chiamare onUnitaContenutoFetch 2 volte (di cui una al mount) se corsoSelezionato.pk cambia', () => {
    const props = {
      ...mockProps,
      onUnitaContenutoFetch: jest.fn(),
      corsoSelezionato: {
        pk: 333,
        nome: 'nomecorso',
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
        iscritti: [],
      },
    };
    const spyMount = jest.spyOn(UnitaPreviewView.prototype, 'componentDidMount');
    const spyUpdate = jest.spyOn(UnitaPreviewView.prototype, 'componentDidUpdate');
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(spyUpdate).not.toHaveBeenCalled();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 666 } });
    expect(props.onUnitaContenutoFetch).toHaveBeenCalledWith(123, 333);
    expect(spyMount).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(props.onUnitaContenutoFetch).toHaveBeenCalledTimes(2);
    spyMount.mockRestore();
    spyUpdate.mockRestore();
  });

  it('deve chiamare onUnitaContenutoFetch una volta sola (on mount) se corsoSelezionato.pk non cambia', () => {
    const props = {
      ...mockProps,
      onUnitaContenutoFetch: jest.fn(),
      corsoSelezionato: {
        pk: 333,
        nome: 'nomecorso',
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
        iscritti: [],
      },
    };
    const spyMount = jest.spyOn(UnitaPreviewView.prototype, 'componentDidMount');
    const spyUpdate = jest.spyOn(UnitaPreviewView.prototype, 'componentDidUpdate');
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(spyUpdate).not.toHaveBeenCalled();
    instance.componentDidUpdate({ corsoSelezionato: { pk: 333, isCorsoLoaded: true } });
    expect(spyMount).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(props.onUnitaContenutoFetch).toHaveBeenCalledWith(123, 333);
    expect(props.onUnitaContenutoFetch).toHaveBeenCalledTimes(1);
  });

  it('visualizza il componente per spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(UnitaPreviewDocente).length).toBe(0);
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
      <UnitaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(UnitaPreviewDocente).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('se ho eseguito tutte le lezioni e sono docente, preseleziono l\'ultima card', () => {
    const props = {
      ...mockProps,
      onUnitaStepInizialize: jest.fn(),
      userAppData: {
        ...mockProps.userAppData,
        docente: false,
      },
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        lezioni: {
          totali: 4,
          completate: 4,
          andamento: {
            0: {
              completata: true,
              sbloccata: true,
              inCorso: true,
            },
            1: {
              completata: true,
              sbloccata: true,
              inCorso: false,
            },
            2: {
              completata: false,
              sbloccata: true,
              inCorso: true,
            },
            3: {
              completata: false,
              sbloccata: false,
              inCorso: false,
            },
          },
        },
      },
    };

    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(UnitaPreviewStudente).length).toBe(1);
    expect(renderedComponent.find(UnitaPreviewStudente).props().displayIndex).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo che eseguiUnitaFunction chiami onUnitaStepInizialize e instance.eseguiLezioneDocente se docente = true', () => {
    const props = {
      ...mockProps,
      onUnitaStepInizialize: jest.fn(),
      userAppData: {
        ...mockProps.userAppData,
        docente: true,
      },
      corsoSelezionato: {
        pk: 333,
        nome: 'nomecorso',
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
        iscritti: [],
      },
      formUnitaLezione: {
        values: {
          lezione: '0',
        },
      },
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(UnitaPreviewDocente).length).toBe(1);

    expect(props.onUnitaStepInizialize).not.toHaveBeenCalled();
    renderedComponent.find(UnitaPreviewDocente).props().eseguiUnitaFunction({
      preventDefault: () => { },
    });
    expect(props.onUnitaStepInizialize).toHaveBeenCalledWith({
      dispatch: props.dispatch,
      unitaId: 333,
      prerequisito: 3456,
      difficolta: 'ACA01',
      disciplina: 777,
      historyPush: props.history.push,
      productName: 'prodotto',
      userId: 666,
      userHints: {
        stepG: true,
        stepUP: true,
      },
    });
  });

  it('controllo che eseguiUnitaFunction non chiami onUnitaStepInizialize e instance.eseguiLezioneDocente se docente = true ma !andamento[key]', () => {
    const props = {
      ...mockProps,
      onUnitaStepInizialize: jest.fn(),
      userAppData: {
        ...mockProps.userAppData,
        docente: true,
      },
      corsoSelezionato: {
        pk: 333,
        nome: 'nomecorso',
        isCorsoLoaded: true,
        isIscrittiLoaded: true,
        iscritti: [],
      },
      formUnitaLezione: {
        values: {
          lezione: '7',
        },
      },
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(UnitaPreviewDocente).length).toBe(1);

    expect(props.onUnitaStepInizialize).not.toHaveBeenCalled();
    renderedComponent.find(UnitaPreviewDocente).props().eseguiUnitaFunction({
      preventDefault: () => { },
    });
    expect(props.onUnitaStepInizialize).not.toHaveBeenCalled();
  });

  it('controllo che lezioni[0].buttonFunction chiami history.push se docente = false', () => {
    const mockStore = configureStore({}, {});
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        docente: false,
      },
      onUnitaStepInizialize: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />, {
        context: {
          store: mockStore,
        },
      }
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'eseguiLezione');

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(UnitaPreviewStudente).length).toBe(1);
    expect(props.onUnitaStepInizialize).not.toHaveBeenCalled();

    expect(spy).not.toHaveBeenCalled();
    expect(props.onUnitaStepInizialize).not.toHaveBeenCalled();
    renderedComponent.find(UnitaPreviewStudente).props().lezioni[0].buttonFunction({
      preventDefault: () => { },
    });
    expect(spy).toHaveBeenLastCalledWith(0);
    expect(props.onUnitaStepInizialize).toHaveBeenCalledWith({
      dispatch: props.dispatch,
      unitaId: 333,
      prerequisito: 3456,
      difficolta: 'ACA01',
      disciplina: 777,
      historyPush: props.history.push,
      productName: 'prodotto',
      userId: 666,
      userHints: {
        stepG: true,
        stepUP: true,
      },
    });
  });

  it('controllo che assegnaFunction chiami onModalSetData quando unita è da assegnare', () => {
    const mockStore = configureStore({}, {});
    const props = {
      ...mockProps,
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        assegnata: false,
      },
      userAppData: {
        ...mockProps.userAppData,
        docente: true,
      },
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />, {
        context: {
          store: mockStore,
        },
      }
    );

    const unitaPreviewDocenteProps = renderedComponent.find(UnitaPreviewDocente).props();
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(UnitaPreviewDocente).length).toBe(1);
    expect(unitaPreviewDocenteProps.buttonAssegnaIcon).toBe('bell');
    expect(unitaPreviewDocenteProps.buttonAssegnaLabel).toBe('Assegna');
    expect(unitaPreviewDocenteProps.buttonAssegnaDisabled).toBe(false);

    expect(props.onModalSetData).not.toHaveBeenCalled();
    unitaPreviewDocenteProps.buttonAssegnaFunction({ preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenCalledTimes(1);

    // simulo il click direttamente sul pulsante di assegnazione
    renderedComponent.find(UnitaPreviewDocente)
      .dive().dive().dive().dive()
      .find(UnitButton)
      .simulate('click', { preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenCalledTimes(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo che assegnaFunction chiami onModalSetData quando unita è assegnata', () => {
    const mockStore = configureStore({}, {});
    const props = {
      ...mockProps,
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        assegnata: true,
      },
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />, {
        context: {
          store: mockStore,
        },
      }
    );

    const unitaPreviewDocenteProps = renderedComponent.find(UnitaPreviewDocente).props();
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(UnitaPreviewDocente).length).toBe(1);
    expect(unitaPreviewDocenteProps.buttonAssegnaIcon).toBe('noBell');
    expect(unitaPreviewDocenteProps.buttonAssegnaLabel).toBe('Assegnata');
    expect(unitaPreviewDocenteProps.buttonAssegnaDisabled).toBe(true);
    expect(unitaPreviewDocenteProps.buttonAssegnaFunction).toBe(null);

    // il pulsante di assegnazione deve essere disabilitato
    expect(renderedComponent.find(UnitaPreviewDocente)
      .dive().dive().dive().dive()
      .find(UnitButton).props().disabled).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo che assegnaFunction chiami onModalSetData con un messaggio di conferma se ho un corso con iscritti', () => {
    const mockStore = configureStore({}, {});
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [1, 2, 3],
      },
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        assegnata: false,
      },
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />, {
        context: {
          store: mockStore,
        },
      }
    );

    const unitaPreviewDocenteProps = renderedComponent.find(UnitaPreviewDocente).props();
    expect(props.onModalSetData).not.toHaveBeenCalled();
    unitaPreviewDocenteProps.buttonAssegnaFunction({ preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenLastCalledWith({
      titolo: 'Assegnazione unità',
      contenuto: 'Si desidera assegnare l\'unità<br /><strong>Titolo unita</strong><br /> alla classe <strong>nomecorso</strong>?',
      acceptButton: {
        onClick: expect.any(Function),
      },
      show: true,
    });
    expect(props.onModalSetData).toHaveBeenCalledTimes(1);

    // simulo il click direttamente sul pulsante di assegnazione
    renderedComponent.find(UnitaPreviewDocente)
      .dive().dive().dive().dive()
      .find(UnitButton)
      .simulate('click', { preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenCalledTimes(2);
    expect(props.onModalSetData).toHaveBeenLastCalledWith({
      titolo: 'Assegnazione unità',
      contenuto: 'Si desidera assegnare l\'unità<br /><strong>Titolo unita</strong><br /> alla classe <strong>nomecorso</strong>?',
      acceptButton: {
        onClick: expect.any(Function),
      },
      show: true,
    });
  });

  it('controllo che assegnaFunction dia errore chiami onModalSetData con un messaggio di errore se non ho un corso', () => {
    const mockStore = configureStore({}, {});
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        pk: 0,
      },
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        assegnata: false,
      },
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />, {
        context: {
          store: mockStore,
        },
      }
    );

    const unitaPreviewDocenteProps = renderedComponent.find(UnitaPreviewDocente).props();
    expect(props.onModalSetData).not.toHaveBeenCalled();
    unitaPreviewDocenteProps.buttonAssegnaFunction({ preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenLastCalledWith({
      titolo: 'Assegnazione unità',
      contenuto: 'Per assegnare un\'unità devi avere creato almeno una classe',
      show: true,
    });
    expect(props.onModalSetData).toHaveBeenCalledTimes(1);

    // simulo il click direttamente sul pulsante di assegnazione
    renderedComponent.find(UnitaPreviewDocente)
      .dive().dive().dive().dive()
      .find(UnitButton)
      .simulate('click', { preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenCalledTimes(2);
    expect(props.onModalSetData).toHaveBeenLastCalledWith({
      titolo: 'Assegnazione unità',
      contenuto: 'Per assegnare un\'unità devi avere creato almeno una classe',
      show: true,
    });
  });

  it('controllo che assegnaFunction dia errore e non chiami onModalSetData se ho un corso ma senza iscritti', () => {
    const mockStore = configureStore({}, {});
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [],
      },
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        assegnata: false,
      },
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />, {
        context: {
          store: mockStore,
        },
      }
    );

    const unitaPreviewDocenteProps = renderedComponent.find(UnitaPreviewDocente).props();
    expect(props.onModalSetData).not.toHaveBeenCalled();
    unitaPreviewDocenteProps.buttonAssegnaFunction({ preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenLastCalledWith({
      titolo: 'Assegnazione unità',
      contenuto: 'Non posso assegnare un\'unità ad una classe vuota (<strong>nomecorso</strong>)',
      show: true,
    });
    expect(props.onModalSetData).toHaveBeenCalledTimes(1);

    // simulo il click direttamente sul pulsante di assegnazione
    renderedComponent.find(UnitaPreviewDocente)
      .dive().dive().dive().dive()
      .find(UnitButton)
      .simulate('click', { preventDefault: () => { } });
    expect(props.onModalSetData).toHaveBeenCalledTimes(2);
    expect(props.onModalSetData).toHaveBeenLastCalledWith({
      titolo: 'Assegnazione unità',
      contenuto: 'Non posso assegnare un\'unità ad una classe vuota (<strong>nomecorso</strong>)',
      show: true,
    });
  });

  it('controllo che visualizzaAndamento chiami history.push ad unita-andamento', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <UnitaPreviewView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.history.push).not.toHaveBeenCalled();
    instance.visualizzaAndamento();
    expect(props.history.push).toHaveBeenCalledWith('/unita-andamento/333');
  });
});

describe('<UnitaPreview />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });
  const withReducerUnita = injectReducer({ key: 'unita', reducer: unitaReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    withReducerUnita,
    withReducerModalBox,
    connect()
  )(UnitaPreview);

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
    expect(receivedProps.spinner).toBe(true);
    expect(receivedProps.feedback).toEqual(defaultUnitaFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultUnitaRisposta.toJS());
    expect(receivedProps.contenutoUnita).toEqual(defaultUnitaContenuto.toJS());
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

    receivedProps.onUnitaContenutoFetch(1, 456);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      unitaContenutoFetch(1, 456)
    );

    receivedProps.onUnitaAssegna(1, 3);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      unitaAssegna(1, 3)
    );

    receivedProps.onUnitaStepInizialize({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      unitaStepInitialize({ data: 123 })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetData({ data: 123 }));

    receivedProps.onModalSetEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetEmptyData());
  });
});

describe('<UnitWrap />', () => {
  it('should render its css w/ props theme', () => {
    const theme = {
      brand: 'red',
    };
    const renderedComponent = shallow(
      <UnitWrap theme={theme} />
    );
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

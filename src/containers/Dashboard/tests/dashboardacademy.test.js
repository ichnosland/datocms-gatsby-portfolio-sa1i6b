import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import * as common from 'common/cookies';
import corsiReducer, {
  defaultcorsoSelezionato,
  defaultCorsiError,
  defaultCorsiList,
} from 'containers/Corsi/reducer';
import userReducer, {
  defaultAuthentication,
  defaultAppData,
  defaultErrorSettings,
  defaultAnagraphicsSettings,
} from 'containers/User/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import Container from 'components/Container';
import TopBar from 'components/TopBar';
import EggMenu from 'components/EggMenu';
import Spinner from 'components/Spinner';
import ButtonGroup from 'components/ButtonGroup';
import { ListPanelHeader, ListItem, ListLink } from 'components/NewListPanels';
import AlertBanner from 'components/AlertBanner';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { userDataSet } from 'containers/User/actions';
import { corsiCorsoSelectedDocenteTrigger } from 'containers/Corsi/actions';
import dashboardReducer from 'containers/Dashboard/reducer';

import DashboardAcademy, { DashboardAcademyView } from '../DashboardAcademy';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  hasClassi: true,
  disciplinaId: 123,
  enabledHints: {
    dashboard: true,
  },
};
const store = configureStore({}, {});
const history = {
  push: () => { },
};
const livelli = [{
  id: 14,
  titolo: 'Livello 1',
  missioni: [{
    titolo: 'Missione 1',
    id: 10,
    displayTitolo: true,
    hasTesto: true,
    contenuti: [{
      nome: 'Introduzione: capitolo con testo introduttivo',
      id: 1000,
      locked: false,
      completata: false,
      tipo: 'versioneacademy',
    }, {
      nome: 'Titolo prima versione',
      id: 1001,
      locked: false,
      completata: false,
      inCorso: true,
      iniziata: true,
      tipo: 'versioneacademy',
    }],
  }],
}, {
  id: 15,
  titolo: 'Livello 2',
  missioni: [{
    titolo: 'Missione 1',
    id: 102,
    displayTitolo: true,
    contenuti: [{
      nome: 'Versione 1',
      id: 10002,
      locked: false,
      completata: true,
      inCorso: false,
      iniziata: true,
      tipo: 'versioneacademy',
    }, {
      nome: 'Versione 2',
      id: 10003,
      locked: false,
      tipo: 'versioneacademy',
      assegnazione: {
        id: 123,
        ritirata: false,
      },
    }, {
      nome: 'Titolo prova competenza 1',
      id: 1003,
      locked: false,
      tipo: 'provacompetenzaacademy',
    }, {
      nome: 'Titolo prova competenza 2',
      id: 1005,
      locked: false,
      autore: 'Autore',
      fonte: 'Fonte',
      difficolta: 'B',
      tipo: 'provacompetenzaacademy',
    }, {
      nome: 'Titolo verifica',
      id: 1003,
      locked: false,
      tipo: 'verifica',
    }, {
      nome: 'Titolo unita 1',
      id: 1004,
      locked: false,
      lessico: true,
      tipo: 'unita',
      lezioniEseguite: 2,
      lezioniTotali: 4,
    }, {
      nome: 'Titolo unita 2',
      id: 1005,
      locked: false,
      tipo: 'tipologia-sconosciuta',
    }, {
      nome: 'Titolo unita 3 (locked)',
      id: 1006,
      locked: true,
      sbloccata: true,
      tipo: 'unita',
    }],
  }],
}];
const mockProps = {
  history,
  onSetFilterUnita: jest.fn(),
  loadLivelli: jest.fn(),
  loadCorso: jest.fn(),
  spinner: true,
  livelli,
  configuration: mockConfiguration,
  filterUnita: '',
  user: {
    anagraphics: {
      studenteAcademy: {
        id: 666,
      },
    },
    authentication: {
      codiceDaSbloccare: false,
      codiceSbloccato: true,
    },
    appData: {
      docente: false,
      hints: {
        dashboard: true,
      },
    },
  },
  corsi: {
    corsiAttivi: {
      items: [{
        pk: 1,
        nome: 'nome corso 1',
      }],
    },
    corsoSelezionato: {
      pk: 1,
      nome: 'nome',
      isCorsoLoaded: true,
      isIscrittiLoaded: true,
      iscritti: [],
    },
    error: {
      hasError: false,
      errorMessage: '',
    },
  },
  menuEggStatus: '',
  searchActive: false,
  onMenuEggSet: () => { },
  modalBoxShow: false,
  onChangeTopSelect: () => { },
};

describe('<DashboardAcademyView />', () => {
  it('should render one Dashboard with a spinner component', () => {
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        {...mockProps}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(ListItem).length).toBe(0);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one Dashboard component with no spinner in it when user is studente and missione.displayTitolo == true', () => {
    const props = {
      ...mockProps,
      spinner: false,
      user: {
        ...mockProps.user,
        appData: {
          docente: false,
        },
      },
      livelli: mockProps.livelli.map((l) => ({
        ...l,
        missioni: l.missioni.map((m) => ({ ...m, displayTitolo: false })),
      })),
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(9);
    expect(renderedComponent.find(ListLink).length).toBe(1);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one Dashboard component with no spinner in it when user is studente and missione.displayTitolo == false', () => {
    const props = {
      ...mockProps,
      spinner: false,
      user: {
        ...mockProps.user,
        appData: {
          docente: false,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(10);
    expect(renderedComponent.find(ListLink).length).toBe(2);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('ListItem should call onModalSetData when locked == true', () => {
    const props = {
      ...mockProps,
      spinner: false,
      user: {
        ...mockProps.user,
        appData: {
          docente: false,
        },
      },
      onModalSetData: jest.fn(),
      livelli: [{
        id: 14,
        titolo: 'Livello 1',
        missioni: [{
          titolo: 'Missione 1',
          id: 10,
          displayTitolo: true,
          hasTesto: true,
          contenuti: [{
            nome: 'Unità 1',
            id: 1000,
            locked: true,
            completata: false,
            tipo: 'unita',
          }, {
            nome: 'Unità 2',
            id: 1001,
            locked: false,
            completata: false,
            inCorso: true,
            iniziata: true,
            tipo: 'unita',
          }],
        }],
      }],
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        {...props}
      />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(ListItem).at(1).simulate('click');
    expect(props.onModalSetData).not.toHaveBeenCalled();

    renderedComponent.find(ListItem).at(0).simulate('click');
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: 'Contenuti in fase di sviluppo',
      closeButton: {
        text: 'Ok',
      },
      image: {
        src: 'IMAGE_MOCK',
        width: '180px',
        height: '130px',
        alt: 'Traduci',
      },
      show: true,
    });
  });

  it('should lock dashboard se corsoAttivo.pk == 0 and user.docente == true', () => {
    const props = {
      ...mockProps,
      spinner: false,
      user: {
        ...mockProps.user,
        appData: {
          docente: true,
        },
      },
      corsi: {
        ...mockProps.corsi,
        corsoSelezionato: {
          pk: 0,
          nome: 'nome',
          isCorsoLoaded: true,
          isIscrittiLoaded: true,
          iscritti: [],
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(2);
    expect(renderedComponent.find(ListLink).length).toBe(10);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one Dashboard component with premium icon if studente is premium', () => {
    const props = {
      ...mockProps,
      spinner: false,
      user: {
        ...mockProps.user,
        authentication: {
          codiceSbloccato: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one Dashboard component when user is docente', () => {
    const props = {
      ...mockProps,
      spinner: false,
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(10);
    expect(renderedComponent.find(ListLink).length).toBe(2);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not display EggMenu if modalBoxShow == true', () => {
    const props = {
      ...mockProps,
      modalBoxShow: true,
      spinner: false,
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(10);
    expect(renderedComponent.find(ListLink).length).toBe(2);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one Dashboard when codiceDaSbloccare = true', () => {
    const props = {
      ...mockProps,
      spinner: false,
      user: {
        ...mockProps.user,
        authentication: {
          codiceDaSbloccare: true,
        },
        appData: {
          ...mockProps.user.appData,
          docente: false,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(12);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should display error message when corsi.error.hasError = true', () => {
    const props = {
      ...mockProps,
      spinner: false,
      corsi: {
        ...mockProps.corsi,
        error: {
          hasError: true,
          errorMessage: 'messaggio di errore',
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(0);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('TopBar > topSwitcher.onChangeFunction should call this.changeCorso se docente e hasClassi', () => {
    const props = {
      ...mockProps,
      spinner: false,
      user: {
        ...mockProps.user,
        appData: {
          docente: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'changeCorso');
    expect(spy).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).props().topSwitcher.onChangeFunction({ target: 123 });
    expect(spy).toHaveBeenCalledWith({ target: 123 });
  });

  it('TopBar > topSwitcher.onChangeFunction should call this.changeMateria se switchMateria', () => {
    const props = {
      ...mockProps,
      spinner: false,
      configuration: {
        ...mockProps.configuration,
        hasClassi: false,
        switchMateria: {
          materia1: {
            disciplinaId: 8,
            title: 'Parallel Italiano Antologia',
            pos: 1,
            hasLatex: false,
          },
          materia2: {
            disciplinaId: 7,
            title: 'Parallel Italiano Grammatica',
            hasLatex: false,
          },
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    const instance = renderedComponent.instance();
    const spyChangeCorso = jest.spyOn(instance, 'changeCorso');
    const spyChangeMateria = jest.spyOn(instance, 'changeMateria');
    expect(spyChangeCorso).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).props().topSwitcher.onChangeFunction({
      target: { value: 'materia1' },
    });
    expect(spyChangeCorso).not.toHaveBeenCalled();
    expect(spyChangeMateria).toHaveBeenCalledWith({ target: { value: 'materia1' } });
  });

  it('should test if Topbar -> searchResetFunction is triggering emptySearch with true param', () => {
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.emptySearch = jest.fn();

    const topBarProps = renderedComponent.find(TopBar).props();
    topBarProps.searchResetFunction();
    expect(instance.emptySearch).toHaveBeenCalledWith(true);
  });

  it('should test if Topbar -> backArrow.onClickFunction is triggering emptySearch with false param', () => {
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.emptySearch = jest.fn();

    const topBarProps = renderedComponent.find(TopBar).props();
    topBarProps.backArrow.onClickFunction();
    expect(instance.emptySearch).toHaveBeenCalledWith(false);
  });

  it('componentDidUpdate should call displayPremiumMessage', () => {
    const props = {
      ...mockProps,
      loadLivelli: jest.fn(),
      user: {
        ...mockProps.user,
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: true,
        },
        appData: {
          ...mockProps.appData,
          docente: false,
        },
      },
    };

    const renderedComponent = shallow(
      <DashboardAcademyView
        {...props}
        history={history}
      />
    );

    const instance = renderedComponent.instance();
    instance.displayPremiumMessage = jest.fn();

    instance.componentDidUpdate({
      corsi: {
        corsoSelezionato: {
          isCorsoLoaded: true,
        },
      },
      user: {
        authentication: {
          codiceDaSbloccare: false,
        },
      },
    });
    expect(instance.displayPremiumMessage).toHaveBeenCalled();
    expect(props.loadLivelli).toHaveBeenCalledTimes(1);
  });

  it('componentDidMount must not call loadLivelli if docente and !isCorsoLoaded and configuration.hasClassi', () => {
    const props = {
      ...mockProps,
      loadLivelli: jest.fn(),
      user: {
        ...mockProps.user,
        appData: {
          ...mockProps.appData,
          docente: true,
        },
      },
      corsi: {
        ...mockProps.corsi,
        corsoSelezionato: {
          ...mockProps.corsi.corsoSelezionato,
          isCorsoLoaded: false,
        },
      },
    };

    shallow(
      <DashboardAcademyView
        {...props}
      />
    );

    expect(props.loadLivelli).not.toHaveBeenCalled();
  });

  it('componentDidMount must call loadLivelli if !docente and !isCorsoLoaded and !configuration.hasClassi', () => {
    const props = {
      ...mockProps,
      loadLivelli: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        hasClassi: false,
      },
      user: {
        ...mockProps.user,
        appData: {
          ...mockProps.user.appData,
          docente: true,
        },
      },
      corsi: {
        ...mockProps.corsi,
        corsoSelezionato: {
          ...mockProps.corsi.corsoSelezionato,
          isCorsoLoaded: false,
        },
      },
    };

    shallow(
      <DashboardAcademyView
        {...props}
      />
    );

    expect(props.loadLivelli).toHaveBeenCalledWith(
      props.configuration,
      true,
      1
    );
  });

  it('componentDidUpdate loadLivelli must call loadLivelli again', () => {
    const props = {
      ...mockProps,
      loadLivelli: jest.fn(),
      user: {
        ...mockProps.user,
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: true,
        },
      },
      appData: {
        ...mockProps.appData,
        docente: false,
      },
    };

    const renderedComponent = shallow(
      <DashboardAcademyView
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    instance.componentDidUpdate({
      corsi: {
        corsoSelezionato: {
          isCorsoLoaded: false,
        },
      },
      user: {
        authentication: {
          codiceDaSbloccare: false,
        },
      },
    });
    expect(props.loadLivelli).toHaveBeenCalledTimes(2);
    expect(props.loadLivelli).toHaveBeenCalledWith(mockConfiguration, false, 1);
  });

  it('displayPremiumMessage should call onModalSetData', () => {
    const props = {
      ...mockProps,
      user: {
        ...mockProps.user,
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: true,
        },
        appData: {
          ...mockProps.user.appData,
          docente: false,
        },
      },
      configuration: {
        ...mockProps.configuration,
        product: 'lyceum',
      },
      onModalSetData: jest.fn(),
    };

    shallow(
      <DashboardAcademyView
        {...props}
      />
    );

    expect(props.onModalSetData).toHaveBeenCalled();
  });

  it('should display level buttons when user.appdata.docente == true and assegnate == 0', () => {
    const props = {
      ...mockProps,
      spinner: false,
      livelli: [{
        ...mockProps.livelli[0],
        id: 1,
        verifiche: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 3,
        versioni: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: {
          docente: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(4);
    expect(renderedComponent.find(ListLink).length).toBe(17);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(3);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    // primo livello: solo verifiche
    expect(renderedComponent.find(ButtonGroup).at(0).props()).toEqual({
      buttons: [{
        id: 'livello_1_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // secondo livello: versioni e verifiche
    expect(renderedComponent.find(ButtonGroup).at(1).props()).toEqual({
      buttons: [{
        id: 'livello_2_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_2_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // terzo livello: solo versioni
    expect(renderedComponent.find(ButtonGroup).at(2).props()).toEqual({
      buttons: [{
        id: 'livello_3_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should display level buttons when user.appdata.docente == true and assegnate > 0', () => {
    const props = {
      ...mockProps,
      spinner: false,
      livelli: [{
        ...mockProps.livelli[0],
        id: 1,
        verifiche: {
          assegnate: 5,
          daConsegnare: 0,
          daRitirare: 2,
        },
        versioni: {
          assegnate: 4,
          daConsegnare: 0,
          daRitirare: 3,
        },
      }, {
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 6,
          daConsegnare: 0,
          daRitirare: 6,
        },
        versioni: {
          assegnate: 7,
          daConsegnare: 0,
          daRitirare: 7,
        },
      }, {
        ...mockProps.livelli[1],
        id: 3,
        verifiche: {
          assegnate: 4,
          daConsegnare: 0,
          daRitirare: 0,
        },
        versioni: {
          assegnate: 5,
          daConsegnare: 0,
          daRitirare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: {
          docente: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(4);
    expect(renderedComponent.find(ListLink).length).toBe(17);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(3);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);

    // primo livello
    expect(renderedComponent.find(ButtonGroup).at(0).props()).toEqual({
      buttons: [{
        id: 'livello_1_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_1_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });

    // secondo livello
    expect(renderedComponent.find(ButtonGroup).at(1).props()).toEqual({
      buttons: [{
        id: 'livello_2_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_2_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });

    // terzo livello
    expect(renderedComponent.find(ButtonGroup).at(2).props()).toEqual({
      buttons: [{
        id: 'livello_3_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_3_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should display level buttons when user.appdata.docente == false and assegnate > 0', () => {
    const props = {
      ...mockProps,
      spinner: false,
      livelli: [{
        ...mockProps.livelli[0],
        id: 1,
        verifiche: {
          assegnate: 5,
          daRitirare: 0,
          daConsegnare: 2,
        },
        versioni: {
          assegnate: 4,
          daRitirare: 0,
          daConsegnare: 3,
        },
      }, {
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 6,
          daRitirare: 0,
          daConsegnare: 6,
        },
        versioni: {
          assegnate: 7,
          daRitirare: 0,
          daConsegnare: 7,
        },
      }, {
        ...mockProps.livelli[1],
        id: 3,
        verifiche: {
          assegnate: 4,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 5,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: {
          docente: false,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(18);
    expect(renderedComponent.find(ListLink).length).toBe(3);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(3);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);

    // primo livello
    expect(renderedComponent.find(ButtonGroup).at(0).props()).toEqual({
      buttons: [{
        id: 'livello_1_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_1_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });

    // secondo livello
    expect(renderedComponent.find(ButtonGroup).at(1).props()).toEqual({
      buttons: [{
        id: 'livello_2_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_2_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });

    // terzo livello
    expect(renderedComponent.find(ButtonGroup).at(2).props()).toEqual({
      buttons: [{
        id: 'livello_3_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_3_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('versioni and verifiche buttons should perform an history push event for docente', () => {
    const props = {
      ...mockProps,
      spinner: false,
      history: {
        push: jest.fn(),
      },
      livelli: [{
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 1,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 1,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: {
          docente: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(ButtonGroup).dive().find('ButtonGroup__InnerButton').at(0).simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/versioni-livello-docente/2');
    renderedComponent.find(ButtonGroup).dive().find('ButtonGroup__InnerButton').at(1).simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/versioni-livello-docente/2');
  });

  it('versioni and verifiche buttons should perform an history push event for studente', () => {
    const props = {
      ...mockProps,
      spinner: false,
      history: {
        push: jest.fn(),
      },
      livelli: [{
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 1,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 1,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: {
          docente: false,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(ButtonGroup).dive().find('ButtonGroup__InnerButton').at(0).simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/versioni-livello/2');
    renderedComponent.find(ButtonGroup).dive().find('ButtonGroup__InnerButton').at(1).simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/versioni-livello/2');
  });

  it('should display level buttons when user.appdata.docente == false and codiceDaSbloccare = true', () => {
    const props = {
      ...mockProps,
      spinner: false,
      livelli: [{
        ...mockProps.livelli[0],
        id: 1,
        verifiche: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 3,
        versioni: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: {
          docente: false,
        },
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: true,
          codiceSbloccato: false,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(21);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(3);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(ButtonGroup).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('assegnazioni prove livello studente', () => {
    const props = {
      ...mockProps,
      spinner: false,
      livelli: [{
        ...mockProps.livelli[0],
        id: 1,
        verifiche: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 1,
        },
        versioni: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 1,
        },
      }, {
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: { docente: false },
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: false,
          codiceSbloccato: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(10);
    expect(renderedComponent.find(ListLink).length).toBe(2);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(2);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    // primo livello
    expect(renderedComponent.find(ButtonGroup).at(0).props()).toEqual({
      buttons: [{
        id: 'livello_1_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_1_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // secondo livello
    expect(renderedComponent.find(ButtonGroup).at(1).props()).toEqual({
      buttons: [{
        id: 'livello_2_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_2_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });

    // ButtonGroup non ha istanze at 3
    expect(renderedComponent.find(ButtonGroup).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('assegnazioni prove livello docente', () => {
    const props = {
      ...mockProps,
      spinner: false,
      livelli: [{
        ...mockProps.livelli[0],
        id: 1,
        verifiche: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 1,
        },
        versioni: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 1,
        },
      }, {
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 3,
          daRitirare: 1,
          daConsegnare: 1,
        },
        versioni: {
          assegnate: 3,
          daRitirare: 1,
          daConsegnare: 1,
        },
      }, {
        ...mockProps.livelli[1],
        id: 3,
        verifiche: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }],
      user: {
        ...mockProps.user,
        appData: { docente: true },
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: false,
          codiceSbloccato: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(4);
    expect(renderedComponent.find(ListLink).length).toBe(17);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(3);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    // primo livello
    expect(renderedComponent.find(ButtonGroup).at(0).props()).toEqual({
      buttons: [{
        id: 'livello_1_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_1_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // secondo livello
    expect(renderedComponent.find(ButtonGroup).at(1).props()).toEqual({
      buttons: [{
        id: 'livello_2_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_2_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // terzo livello
    expect(renderedComponent.find(ButtonGroup).at(2).props()).toEqual({
      buttons: [{
        id: 'livello_3_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_3_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // ButtonGroup non ha istanze at 3
    expect(renderedComponent.find(ButtonGroup).length).toBe(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('prove parallel', () => {
    const livelliParallel = [{
      id: 14,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 102,
        displayTitolo: true,
        contenuti: [{
          nome: 'Titolo prova parallel 1',
          id: 1003,
          locked: false,
          tipo: 'provaparallel',
        }, {
          nome: 'Titolo prova parallel 2',
          id: 1005,
          locked: false,
          autore: 'Autore',
          fonte: 'Fonte',
          tipo: 'provaparallel',
        }],
      }],
    }];

    const props = {
      ...mockProps,
      spinner: false,
      livelli: livelliParallel,
      user: {
        ...mockProps.user,
        appData: { docente: true },
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: false,
          codiceSbloccato: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(1);
    expect(renderedComponent.find(ListLink).length).toBe(2);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(ListLink).at(0).props().to).toBe('/prova-parallel/1003');
    expect(renderedComponent.find(ListLink).at(1).props().to).toBe('/prova-parallel/1005');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should display level buttons when user.appdata.docente == false and codiceSbloccato = true', () => {
    const props = {
      ...mockProps,
      spinner: false,
      livelli: [{
        ...mockProps.livelli[0],
        id: 1,
        verifiche: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 2,
        verifiche: {
          assegnate: 2,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 3,
        verifiche: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 3,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 4,
        verifiche: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
        versioni: {
          assegnate: 0,
          daRitirare: 0,
          daConsegnare: 0,
        },
      }, {
        ...mockProps.livelli[1],
        id: 5,
        verifiche: {
          assegnate: 1,
          daRitirare: 0,
          daConsegnare: 1,
        },
        versioni: {
          assegnate: 1,
          daRitirare: 0,
          daConsegnare: 1,
        },
      }],
      user: {
        ...mockProps.user,
        appData: {
          docente: false,
        },
        authentication: {
          ...mockProps.user.authentication,
          codiceDaSbloccare: false,
          codiceSbloccato: true,
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardAcademyView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(34);
    expect(renderedComponent.find(ListLink).length).toBe(5);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(5);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    // primo livello: solo verifiche
    expect(renderedComponent.find(ButtonGroup).at(0).props()).toEqual({
      buttons: [{
        id: 'livello_1_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // secondo livello: versioni e verifiche
    expect(renderedComponent.find(ButtonGroup).at(1).props()).toEqual({
      buttons: [{
        id: 'livello_2_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_2_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // terzo livello: solo versioni
    expect(renderedComponent.find(ButtonGroup).at(2).props()).toEqual({
      buttons: [{
        id: 'livello_3_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });

    // quarto livello: solo verifiche e versioni assegnate non ritirate
    expect(renderedComponent.find(ButtonGroup).at(3).props()).toEqual({
      buttons: [{
        id: 'livello_5_versioni_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }, {
        id: 'livello_5_verifiche_pulsante',
        label: expect.any(Object),
        onClickFunction: expect.any(Function),
      }],
      half: true,
      margin: '20px auto',
    });
    // ButtonGroup non ha istanze at 3
    expect(renderedComponent.find(ButtonGroup).length).toBe(4);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<DashboardAcademy />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withCorsiReducer = injectReducer({ key: 'corsi', reducer: corsiReducer });
  const withUserReducer = injectReducer({ key: 'user', reducer: userReducer });
  const withModalBoxReducer = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });
  const withDashboardReducer = injectReducer({ key: 'dashboard', reducer: dashboardReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withCorsiReducer,
    withUserReducer,
    withModalBoxReducer,
    withDashboardReducer,
    connect()
  )(DashboardAcademy);

  it('should check DashboardAcademy initial props are properly set', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { store, history } }
    ).dive().dive().dive().dive().dive().dive();

    const receivedProps = renderedComponent.props();
    expect(receivedProps.livelli).toEqual([]);
    expect(receivedProps.filterUnita).toEqual('');
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.corsi).toEqual({
      corsiAttivi: defaultCorsiList.toJS(),
      corsoSelezionato: defaultcorsoSelezionato.toJS(),
      error: defaultCorsiError.toJS(),
      spinner: false,
    });
    expect(receivedProps.user).toEqual({
      anagraphics: defaultAnagraphicsSettings.toJS(),
      authentication: defaultAuthentication.toJS(),
      appData: defaultAppData.toJS(),
      error: defaultErrorSettings.toJS(),
      spinner: false,
    });
  });

  it('changeCorso should dispatch loadCorso action to store', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive().dive();
    const instance = renderedComponent.instance();
    instance.changeCorso({ target: { value: 123 } });
    expect(mockStore.dispatch).toHaveBeenCalledWith(corsiCorsoSelectedDocenteTrigger(
      123, mockConfiguration, false
    ));
  });

  it('mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive();
    const props = renderedComponent.props();

    props.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetData({ data: 123 }));

    props.onModalSetEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetEmptyData());

    const spy = jest.spyOn(common, 'cookieSet');
    props.onUserCookieSet('kk', 'val');
    expect(spy).toHaveBeenCalledWith({ cookieKey: 'kk', payload: 'val' });

    props.onUserDataSet({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(userDataSet({ data: 123 }));
  });
});

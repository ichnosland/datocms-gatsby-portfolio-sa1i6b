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
import {
  versioniLivelloFetch,
  versioniLivelloSet,
  versioniVersioneAssegna,
  versioniVersioneRitira,
  versioniVersioneEsecuzioneInitialize,
} from 'containers/Versioni/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import corsiReducer, { defaultcorsoSelezionato } from 'containers/Corsi/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';

import VersioneDocente, { VersioniDocenteView } from '../index';
import VersioniLivelloOverview from '../LivelloDocenteOverview';


const mockConfiguration = {
  product: 'alatin',
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
  history: {
    push: () => { },
  },
  configuration: mockConfiguration,
  feedback: {
    hasFeedback: false,
    tipologia: '',
    messaggio: '',
  },
  corsoSelezionato: {
    pk: 2000,
    iscritti: [],
    nome: 'nomecorso',
    isCorsoLoaded: false,
    isIscrittiLoaded: false,
  },
  versioniLivello: {
    spinnerSmall: {},
    isLoaded: true,
    titolo: 'label livello',
    missioni: [{
      id: 'missione 1',
      ordine: 0,
      titolo: 'missione 1',
    }, {
      id: 'missione 2',
      ordine: 2,
      titolo: 'missione 2',
    }],
    versioneSelezionata: {
      assegnata: false,
      id: 200,
      missione: 'missione 2',
      missione_ordine: 2,
      titolo: 'titolo versione 2',
      totale_domande: 22,
    },
    versioniAssegnate: [{
      ritirata: false,
      id: 100,
      missione: 'missione 1',
      titolo: 'titolo versione 1',
      totale_domande: 12,
      assegnata_data: '11/02/2010',
    }],
    versioniMissione: {
      'missione 1': [{
        assegnata: true,
        id: 100,
        titolo: 'titolo versione 1',
        totaleDomande: 12,
      }],
      'missione 2': [{
        assegnata: false,
        id: 200,
        titolo: 'titolo versione 2',
        totaleDomande: 22,
      }, {
        assegnata: false,
        id: 300,
        titolo: 'titolo versione 3',
        totaleDomande: 32,
      }],
    },
  },
  onVersioneLivelloFetch: () => { },
  onVersioneAssegna: () => { },
  onVersioneRitira: () => { },
  onModalSetData: () => { },
  onModalSetEmptyData: () => { },
  onVersioneStepProvaTrigger: () => { },
  onCreaVersioneSet: () => { },
  onDownloadProtetti: () => { },
  onInitializeEsecuzione: () => { },
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


describe('<VersioniDocenteView />', () => {
  it('!spinner !feedback.hasFeedback', () => {
    const renderedComponent = shallow(
      <VersioniDocenteView {...mockProps} />
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
      <VersioniDocenteView {...props} />
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
      <VersioniDocenteView {...props} />
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
    const spy = jest.spyOn(VersioniDocenteView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );

    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(props.onVersioneLivelloFetch).toHaveBeenCalledWith('123', true, 2000, 0);
  });

  it('componentDidUpdate deve richiamare enableFocusButtonRisposta se è cambiata la pk del corso', () => {
    const props = {
      ...mockProps,
      onVersioneLivelloFetch: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVersioneLivelloFetch).toHaveBeenCalledTimes(1);

    instance.componentDidUpdate({ corsoSelezionato: { pk: 6000 } });
    expect(props.onVersioneLivelloFetch).toHaveBeenCalledTimes(2);
    expect(props.onVersioneLivelloFetch).toHaveBeenLastCalledWith('123', true, 2000);
  });

  it('componentDidUpdate NON deve richiamare enableFocusButtonRisposta se NON è cambiata la pk del corso', () => {
    const props = {
      ...mockProps,
      onVersioneLivelloFetch: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVersioneLivelloFetch).toHaveBeenCalledTimes(1);

    instance.componentDidUpdate({ corsoSelezionato: { pk: 2000 } });
    expect(props.onVersioneLivelloFetch).toHaveBeenCalledTimes(1);
  });

  it('simulaFunction deve chiamare onInitializeEsecuzione', () => {
    const props = {
      ...mockProps,
      onInitializeEsecuzione: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onInitializeEsecuzione).not.toHaveBeenCalled();

    expect(instance.simulaFunction()).toBeTruthy();
    expect(props.onInitializeEsecuzione).toHaveBeenCalledWith({
      backUrl: '/versioni-livello-docente/123/200',
      history: mockProps.history,
      id: 200,
      inCorso: false,
      isDocente: true,
    });
  });

  it('simulaFunction non deve chiamare onInitializeEsecuzione se !versioneSelezionata', () => {
    const props = {
      ...mockProps,
      onInitializeEsecuzione: jest.fn(),
      versioniLivello: {
        ...mockProps.versioniLivello,
        versioneSelezionata: undefined,
      },
    };
    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onInitializeEsecuzione).not.toHaveBeenCalled();

    expect(instance.simulaFunction()).toBeFalsy();
    expect(props.onInitializeEsecuzione).not.toHaveBeenCalled();
  });

  it('assegnaFunction deve dare popup di errore se non ho studenti in classe', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [],
        pk: 34333,
      },
      versioniLivello: {
        ...mockProps.versioniLivello,
        datiVersione: {
          ...mockProps.versioniLivello.datiVersione,
          unitaSelezionate: [1, 2],
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();

    instance.assegnaFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione versione',
      contenuto: 'Non posso assegnare una versione ad una classe vuota (<strong>nomecorso</strong>)',
      show: true,
    });
  });

  it('assegnaFunction deve dare popup di errore se non ho una classe', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [],
        pk: 34333,
      },
      versioniLivello: {
        ...mockProps.versioniLivello,
        datiVersione: {
          ...mockProps.versioniLivello.datiVersione,
          unitaSelezionate: [1, 2],
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();

    instance.assegnaFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione versione',
      contenuto: 'Non posso assegnare una versione ad una classe vuota (<strong>nomecorso</strong>)',
      show: true,
    });
  });


  it('assegnaFunction deve dare popup di conferma se ho studenti in classe', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [{ id: 1234, fist_name: 'nome', last_name: 'cognome' }],
        pk: 34333,
      },
      versioniLivello: {
        ...mockProps.versioniLivello,
        datiVersione: {
          ...mockProps.versioniLivello.datiVersione,
          unitaSelezionate: [1, 2],
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();

    instance.assegnaFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione versione',
      contenuto: 'Si desidera assegnare la versione <strong>titolo versione 2</strong> alla classe <strong>nomecorso</strong>?',
      show: true,
      acceptButton: {
        onClick: expect.any(Function),
      },
    });
  });

  it('assegnaFunction deve dare popup di errore se non ho una classe', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [],
        pk: 0,
      },
      versioniLivello: {
        ...mockProps.versioniLivello,
        datiVersione: {
          ...mockProps.versioniLivello.datiVersione,
          unitaSelezionate: [1, 2],
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();


    expect(instance.assegnaFunction()).toBeTruthy();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione versione',
      contenuto: 'Per assegnare una versione devi avere creato almeno una classe',
      show: true,
    });
  });

  it('assegnaFunction deve non deve proseguire se non ho una versione selezionata', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [],
        pk: 0,
      },
      versioniLivello: {
        ...mockProps.versioniLivello,
        versioneSelezionata: undefined,
        datiVersione: {
          ...mockProps.versioniLivello.datiVersione,
          unitaSelezionate: [1, 2],
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();
    expect(instance.assegnaFunction()).toBeFalsy();
    expect(props.onModalSetData).not.toHaveBeenCalled();
  });

  it('ritiraFunction deve restituire false se non esiste assegnazione', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(instance.ritiraFunction(110)).toBe(false);
  });

  it('ritiraFunction deve restituire false se non è assegnata', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.ritiraFunction(0); // presente nelle fixture la key = 0
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Ritira versione',
      contenuto: 'Si desidera ritirare la versione <strong>titolo versione 1</strong> per la classe <strong>nomecorso</strong>?',
      show: true,
      acceptButton: {
        onClick: expect.any(Function),
      },
    });
  });

  it('ritiraFunction deve restituire false se non esiste assegnazione', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(instance.ritiraFunction(110)).toBe(false);
  });

  it('visualizzaStatistiche deve fare un history.push', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.history.push).not.toHaveBeenCalled();
    expect(instance.visualizzaStatistiche()).toBeTruthy();
    expect(props.history.push).toHaveBeenCalledWith('/versione-livello-statistiche/123');
  });

  it('visualizzaStatistiche non deve fare niente se spinnerSmall.assegna == true || spinnerSmall.ritira == true', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      versioniLivello: {
        ...mockProps.versioniLivello,
        spinnerSmall: {
          assegna: true,
          ritira: true,
        },
      },
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.history.push).not.toHaveBeenCalled();
    expect(instance.visualizzaStatistiche()).toBeFalsy();
    expect(props.history.push).not.toHaveBeenCalled();
  });

  it('selezionaVersione deve chiamare onCreaVersioneSet se non è già selezionato settando i nuovi dati', () => {
    const props = {
      ...mockProps,
      onCreaVersioneSet: jest.fn(),
      versioniLivello: {
        ...mockProps.versioniLivello,
        versioneSelezionata: undefined,
      },
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onCreaVersioneSet).not.toHaveBeenCalled();
    expect(instance.selezionaVersione({
      assegnata: false,
      id: 200,
      titolo: 'titolo versione 2',
      totaleDomande: 22,
    })).toBeTruthy();
    expect(props.onCreaVersioneSet).toHaveBeenCalledWith({
      versioneSelezionata: {
        assegnata: false,
        id: 200,
        titolo: 'titolo versione 2',
        totaleDomande: 22,
      },
    });
  });

  it('selezionaVersione deve chiamare onCreaVersioneSet se non è già selezionato rimuovendo i nuovi dati', () => {
    const props = {
      ...mockProps,
      onCreaVersioneSet: jest.fn(),
      versioniLivello: {
        ...mockProps.versioniLivello,
        versioneSelezionata: {
          assegnata: false,
          id: 200,
          titolo: 'titolo versione 2',
          totaleDomande: 22,
        },
      },
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onCreaVersioneSet).not.toHaveBeenCalled();
    expect(instance.selezionaVersione({
      assegnata: false,
      id: 200,
      titolo: 'titolo versione 2',
      totaleDomande: 22,
    })).toBeTruthy();
    expect(props.onCreaVersioneSet).toHaveBeenCalledWith({
      versioneSelezionata: undefined,
    });
  });

  it('selezionaVersione non deve chiamare onCreaVersioneSet se spinnerSmall.assegna == true', () => {
    const props = {
      ...mockProps,
      onCreaVersioneSet: jest.fn(),
      versioniLivello: {
        ...mockProps.versioniLivello,
        spinnerSmall: {
          assegna: true,
        },
      },
    };

    const renderedComponent = shallow(
      <VersioniDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onCreaVersioneSet).not.toHaveBeenCalled();
    expect(instance.selezionaVersione({
      assegnata: false,
      id: 200,
      titolo: 'titolo versione 2',
      totaleDomande: 22,
    })).toBeFalsy();
    expect(props.onCreaVersioneSet).not.toHaveBeenCalled();
  });
});


describe('<VersioneDocente />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });
  const withReducerVersione = injectReducer({ key: 'versioni', reducer: versioneReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    withReducerVersione,
    withReducerModalBox,
    connect()
  )(VersioneDocente);

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
    ).dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onCreaVersioneSet({ data: 666 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniLivelloSet({ data: 666 })
    );

    receivedProps.onVersioneLivelloFetch(1, true, 456, 789);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniLivelloFetch(1, true, 456, 789)
    );

    receivedProps.onVersioneAssegna(1, 2, { data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneAssegna(1, 2, { data: 123 })
    );

    receivedProps.onVersioneRitira(12355, 10, [1, 3, 4, 5, 6]);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneRitira(12355, 10, [1, 3, 4, 5, 6])
    );

    receivedProps.onInitializeEsecuzione({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      versioniVersioneEsecuzioneInitialize({ data: 123 })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetData({ data: 123 }));

    receivedProps.onModalSetEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetEmptyData());
  });
});

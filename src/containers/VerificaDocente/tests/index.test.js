import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import Spinner from 'components/Spinner';
import { AlertBanner } from 'components/AlertBanner';
import verificaReducer, {
  defaultVerificaFeedback,
  defaultVerificheLivello,
} from 'containers/Verifica/reducer';
import {
  verificaLivelloFetch,
  verificaLivelloSet,
  verificaAssegna,
  verificaRitira,
  verificaLivelloProvaTrigger,
} from 'containers/Verifica/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import corsiReducer, { defaultcorsoSelezionato } from 'containers/Corsi/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import { downloadProtettiFetch } from 'containers/DownloadProtetti/actions';
import { verificheLivelloDocenteResponseData } from 'common/testing-fixtures/verifica';

import VerificaDocente, { VerificheDocenteView } from '../index';
import VerificheLivelloOverview from '../VerificheLivelloDocenteOverview';


const mockConfiguration = {
  product: 'alatin',
  hasPremium: true,
  disciplinaId: 777,
  switcherMyTest: true,
  homePage: '/homepage',
  hasLatino: true,
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
  verificaLivello: {
    spinnerSmall: {},
    isLoaded: true,
    titolo: 'titolo verifica',
    unitSelectionEnabled: true,
    // uso i dati delle fixtures che simulano i dati ricevuti
    // dall'endpoint delle verifiche di livello
    unita: verificheLivelloDocenteResponseData.unita,
    verificheAssegnate: verificheLivelloDocenteResponseData.verifiche_assegnate,
    datiVerifica: {
      soloLatino: false,
      unitaSelezionate: [],
    },
    backUrl: '/backurl',
  },
  onVerificaLivelloFetch: () => { },
  onVerificaAssegna: () => { },
  onVerificaRitira: () => { },
  onModalSetData: () => { },
  onModalSetEmptyData: () => { },
  onVerificaStepProvaTrigger: () => { },
  onCreaVerificaSet: () => { },
  onDownloadProtetti: () => { },
  userAnagraphics: {
    id: 666,
  },
  userAppData: {
    enableSuoni: true,
    hints: {
      verifica_G: true,
      stepUP: true,
    },
  },
};


describe('<VerificheDocenteView />', () => {
  it('!spinner !feedback.hasFeedback', () => {
    const renderedComponent = shallow(
      <VerificheDocenteView {...mockProps} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(AlertBanner).length).toBe(0);
    expect((renderedComponent).find(VerificheLivelloOverview).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('spinner !feedback.hasFeedback', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(1);
    expect((renderedComponent).find(AlertBanner).length).toBe(0);
    expect((renderedComponent).find(VerificheLivelloOverview).length).toBe(0);
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
      <VerificheDocenteView {...props} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(AlertBanner).length).toBe(1);
    expect((renderedComponent).find(VerificheLivelloOverview).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('verificheCartacee non presenti', () => {
    const props = {
      ...mockProps,
      configuration: {
        ...mockProps.configuration,
        product: 'nonesiste',
      },
    };
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(AlertBanner).length).toBe(0);
    expect((renderedComponent).find(VerificheLivelloOverview).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('componentDidMount deve chiamare onVerificaLivelloFetch with default props', () => {
    const props = {
      ...mockProps,
      onVerificaLivelloFetch: jest.fn(),
    };
    const spy = jest.spyOn(VerificheDocenteView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );

    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledWith(
      '123', true, 2000, [], false
    );
  });

  it('componentDidMount deve chiamare onVerificaLivelloFetch con props opzionali', () => {
    const props = {
      ...mockProps,
      match: {
        params: {
          id: '123',
          idsUnita: '4-5-6',
          soloLatino: 'T',
        },
      },
      onVerificaLivelloFetch: jest.fn(),
    };
    const spy = jest.spyOn(VerificheDocenteView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );

    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledWith(
      '123', true, 2000, [4, 5, 6], true
    );
  });

  it('componentDidUpdate deve richiamare enableFocusButtonRisposta se è cambiata la pk del corso e con props default', () => {
    const props = {
      ...mockProps,
      onVerificaLivelloFetch: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledTimes(1);

    instance.componentDidUpdate({ corsoSelezionato: { pk: 6000 } });
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledTimes(2);
    expect(props.onVerificaLivelloFetch).toHaveBeenLastCalledWith('123', true, 2000, [], false);
  });

  it('componentDidUpdate deve richiamare enableFocusButtonRisposta se è cambiata la pk del corso e con props aggiuntive', () => {
    const props = {
      ...mockProps,
      match: {
        params: {
          id: '123',
          idsUnita: '4-5-6',
          soloLatino: 'T',
        },
      },
      onVerificaLivelloFetch: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledTimes(1);

    instance.componentDidUpdate({ corsoSelezionato: { pk: 6000 } });
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledTimes(2);
    expect(props.onVerificaLivelloFetch).toHaveBeenLastCalledWith('123', true, 2000, [4, 5, 6], true);
  });

  it('componentDidUpdate NON deve richiamare enableFocusButtonRisposta se NON è cambiata la pk del corso', () => {
    const props = {
      ...mockProps,
      onVerificaLivelloFetch: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledTimes(1);

    instance.componentDidUpdate({ corsoSelezionato: { pk: 2000 } });
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledTimes(1);
  });

  it('simulaFunction deve chiamare onVerificaStepProvaTrigger con unità selezionate', () => {
    const props = {
      ...mockProps,
      verificaLivello: {
        ...mockProps.verificaLivello,
        datiVerifica: {
          soloLatino: true,
          unitaSelezionate: [7, 8],
        },
      },
      onVerificaStepProvaTrigger: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVerificaStepProvaTrigger).not.toHaveBeenCalled();

    instance.simulaFunction();
    expect(props.onVerificaStepProvaTrigger).toHaveBeenCalledWith({
      backUrl: '/verifiche-livello-docente/123/T/7-8',
      userHints: {
        stepUP: true,
        verifica_G: true,
      },
      livelloId: '123',
      history: props.history,
      dispatch: props.dispatch,
      product: 'alatin',
      userId: 666,
      soloLatino: true,
      unitaSelezionate: [7, 8],
      titolo: 'titolo verifica',
      enableSuoni: true,
    });
  });

  it('simulaFunction deve chiamare onVerificaStepProvaTrigger con unità selezionate vuote e sololatino == false', () => {
    const props = {
      ...mockProps,
      verificaLivello: {
        ...mockProps.verificaLivello,
        datiVerifica: {
          soloLatino: false,
          unitaSelezionate: [],
        },
      },
      onVerificaStepProvaTrigger: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVerificaStepProvaTrigger).not.toHaveBeenCalled();

    instance.simulaFunction();
    expect(props.onVerificaStepProvaTrigger).toHaveBeenCalledWith({
      backUrl: '/verifiche-livello-docente/123/F/',
      userHints: {
        stepUP: true,
        verifica_G: true,
      },
      livelloId: '123',
      history: props.history,
      dispatch: props.dispatch,
      product: 'alatin',
      userId: 666,
      soloLatino: false,
      unitaSelezionate: [],
      titolo: 'titolo verifica',
      enableSuoni: true,
    });
  });

  it('assegnaFunction deve restituire false se non ho unità selezionate', () => {
    const renderedComponent = shallow(
      <VerificheDocenteView {...mockProps} />
    );
    const instance = renderedComponent.instance();
    expect(instance.assegnaFunction()).toBe(false);
  });

  it('assegnaFunction deve dare popup di errore se non ho studenti in classe', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [],
        pk: 34333,
      },
      verificaLivello: {
        ...mockProps.verificaLivello,
        datiVerifica: {
          ...mockProps.verificaLivello.datiVerifica,
          unitaSelezionate: [1, 2],
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();

    instance.assegnaFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione verifica',
      contenuto: 'Non posso assegnare una verifica ad una classe vuota (<strong>nomecorso</strong>)',
      show: true,
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
      verificaLivello: {
        ...mockProps.verificaLivello,
        datiVerifica: {
          ...mockProps.verificaLivello.datiVerifica,
          unitaSelezionate: [1, 2],
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();

    instance.assegnaFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione verifica',
      contenuto: 'Per assegnare una verifica devi avere creato almeno una classe',
      show: true,
    });
  });

  it('assegnaFunction deve dare popup se posso assegnarla con latino e italiano', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [{ pk: 1 }],
        pk: 1111,
      },
      verificaLivello: {
        ...mockProps.verificaLivello,
        datiVerifica: {
          ...mockProps.verificaLivello.datiVerifica,
          unitaSelezionate: [157, 160], // pk delle unità nelle fixtures
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();

    instance.assegnaFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione verifica',
      contenuto: 'Si desidera creare e assegnare una nuova verifica contenente le seguenti unità:<ul class="fake-table"><li>Ripasso grammatica italiana: il verbo</li><li>Ripasso analisi periodo</li></ul> alla classe <strong>nomecorso</strong>, con traduzione di tipo <strong>latino e italiano</strong>?',
      show: true,
      acceptButton: {
        onClick: expect.any(Function),
      },
    });
  });

  it('assegnaFunction deve dare popup se posso assegnarla con solo latino', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        iscritti: [{ pk: 1 }],
        pk: 1111,
      },
      verificaLivello: {
        ...mockProps.verificaLivello,
        datiVerifica: {
          ...mockProps.verificaLivello.datiVerifica,
          unitaSelezionate: [157, 160], // pk delle unità nelle fixtures
          soloLatino: true,
        },
      },
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onModalSetData).not.toHaveBeenCalled();

    instance.assegnaFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Assegnazione verifica',
      contenuto: 'Si desidera creare e assegnare una nuova verifica contenente le seguenti unità:<ul class="fake-table"><li>Ripasso grammatica italiana: il verbo</li><li>Ripasso analisi periodo</li></ul> alla classe <strong>nomecorso</strong>, con traduzione di tipo <strong>solo dal latino</strong>?',
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
      <VerificheDocenteView {...props} />
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
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.ritiraFunction(0); // presente nelle fixture la key = 0
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Ritira verifica',
      contenuto: 'Si desidera ritirare la verifica <strong>titolo verifica</strong> per la classe <strong>nomecorso</strong>?',
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
      <VerificheDocenteView {...props} />
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
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.history.push).not.toHaveBeenCalled();
    expect(instance.visualizzaStatistiche()).toBeTruthy();
    expect(props.history.push).toHaveBeenCalledWith('/verifiche-livello-statistiche/123');
  });

  it('visualizzaStatistiche non deve fare un history.push se spinnerSmall.assegna || spinnerSmall.ritira', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      verificaLivello: {
        ...mockProps.verificaLivello,
        spinnerSmall: {
          assegna: true,
          ritira: false,
        },
      },
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.history.push).not.toHaveBeenCalled();
    expect(instance.visualizzaStatistiche()).toBeFalsy();
    expect(props.history.push).not.toHaveBeenCalled();
  });

  it('aggiungiUnita deve chiamare onCreaVerificaSet', () => {
    const props = {
      ...mockProps,
      onCreaVerificaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onCreaVerificaSet).not.toHaveBeenCalled();
    instance.aggiungiUnita(12345);
    expect(props.onCreaVerificaSet).toHaveBeenCalledWith({
      soloLatino: false,
      unitaSelezionate: [12345],
    });
  });

  it('aggiungiUnita deve chiamare onCreaVerificaSet rimuovendo unità già presenti', () => {
    const props = {
      ...mockProps,
      onCreaVerificaSet: jest.fn(),
      verificaLivello: {
        ...mockProps.verificaLivello,
        datiVerifica: {
          ...mockProps.verificaLivello.datiVerifica,
          unitaSelezionate: [157, 160, 12345],
        },
      },
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onCreaVerificaSet).not.toHaveBeenCalled();
    instance.aggiungiUnita(12345);
    expect(props.onCreaVerificaSet).toHaveBeenCalledWith({
      soloLatino: false,
      unitaSelezionate: [157, 160],
    });
  });

  it('toggleSoloLatino deve chiamare onCreaVerificaSet', () => {
    const props = {
      ...mockProps,
      onCreaVerificaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificheDocenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onCreaVerificaSet).not.toHaveBeenCalled();
    instance.toggleSoloLatino(true);
    expect(props.onCreaVerificaSet).toHaveBeenCalledWith({
      soloLatino: true,
      unitaSelezionate: [],
    });
  });
});


describe('<VerificaDocente />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });
  const withReducerVerifica = injectReducer({ key: 'verifiche', reducer: verificaReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    withReducerVerifica,
    withReducerModalBox,
    connect()
  )(VerificaDocente);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.corsoSelezionato).toEqual(defaultcorsoSelezionato.toJS());
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultVerificaFeedback.toJS());
    expect(receivedProps.verificaLivello).toEqual(defaultVerificheLivello.toJS());
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
    ).dive().dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onCreaVerificaSet({ data: 666 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaLivelloSet({
        datiVerifica: { data: 666 },
      })
    );

    receivedProps.onVerificaLivelloFetch(1, true, 456);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaLivelloFetch(1, true, 456)
    );

    receivedProps.onVerificaAssegna({ data: 4567 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaAssegna({ data: 4567 })
    );

    receivedProps.onVerificaRitira({ data: 555 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaRitira({ data: 555 })
    );

    receivedProps.onVerificaStepProvaTrigger({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaLivelloProvaTrigger({ data: 123 })
    );

    receivedProps.onDownloadProtetti('slug');
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      downloadProtettiFetch('slug')
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetData({ data: 123 }));

    receivedProps.onModalSetEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(modalSetEmptyData());
  });
});

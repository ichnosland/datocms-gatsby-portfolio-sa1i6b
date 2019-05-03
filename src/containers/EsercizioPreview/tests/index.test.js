import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import { calcolaSezioniAperteStatistiche } from 'common/statistiche';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { mockElementiN } from 'common/testing-mocks';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

import EsecuzionePreviewStep from '../EsecuzionePreviewStep';
import EsecuzionePreviewStatistiche from '../EsecuzionePreviewStatistiche';
import EsercizioPreviewEsecuzione, { EsercizioPreviewEsecuzioneView } from '../index';
import {
  esercizioPreviewRispostaSet,
  esercizioPreviewRispostaPost,
  esercizioPreviewStepNext,
  esercizioPreviewStepInitialize,
  esercizioPreviewContenutoSet,
} from '../actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import esercizioPreviewReducer, {
  defaultEsercizioPreviewFeedback,
  defaultEsercizioPreviewContenuto,
  defaultEsercizioPreviewRisposta,
  defaultEsercizioPreviewStep,
} from '../reducer';

const mockConfiguration = {
  product: 'lyceum',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
  parseMultimedia: true,
};
const mockProps = {
  match: {
    params: {
      esercizioId: '4444',
    },
  },
  isModalBoxOpened: false,
  feedback: {
    hasFeedback: false,
    tipologia: 'error',
    messaggio: 'messaggio',
  },
  dispatch: () => { },
  userAppData: {
    docente: true,
    hints: {
      stepG: true,
    },
  },
  configuration: mockConfiguration,
  step: {
    testi: [mockElementiN[0]],
    esercizi: [mockElementiN[1]],
    isStepLoaded: true,
    numeroProgressivoStep: 1,
  },
  userAnagraphics: {
    id: 5666,
  },
  contenutoEsercizio: {
    isLoaded: true,
    inCorso: true,
    consegnata: false,
    ritirata: false,
    assegnata: true,
    id: 123,
    titolo: 'titolo',
    testo: 'testo',
    prerequisito: 'prerequisito',
    totaleDomande: 12,
    voto: -1,
    risposteFornite: {},
    stepCaricato: 0,
    steps: [],
  },
  risposta: {
    rispostaSelezionata: undefined,
    isCheckable: true,
    isCorrect: true,
    isChecked: true,
    isPristine: true,
    isInterfaceLocked: true,
    correzioneStep: {
      corrette: [],
      sbagliate: [],
      soluzione: [],
    },
    mostraSoluzione: true,
    mostraCorrezione: true,
    isHelpEnabled: false,
  },
  spinner: false,
  onModalSetData: () => { },
  onModalResetData: () => { },
  onEsercizioPreviewReset: () => { },
  onPostRisposta: () => { },
  onStepNext: () => { },
  onRispostaSet: () => { },
  onEsercizioPreviewStepInizialize: () => { },
};

describe('<EsercizioPreviewEsecuzioneView />', () => {
  it('Mostra lo step da eseguire', () => {
    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...mockProps} />
    );
    expect(renderedComponent.find(EsecuzionePreviewStep).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(EsecuzionePreviewStatistiche).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostra uno spinner se attivo', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzionePreviewStep).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(EsecuzionePreviewStatistiche).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Se non unitaId EsecuzionePreviewStep rimanda a configuration.homePage il back', () => {
    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...mockProps} />
    );
    expect(renderedComponent.find(EsecuzionePreviewStep).props().backUrl).toBe(
      '/homepage'
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Se non unitaId EsecuzionePreviewStatistiche rimanda a configuration.homePage il back', () => {
    const props = {
      ...mockProps,
      spinner: false,
      contenutoEsercizio: {
        ...mockProps.contenutoEsercizio,
        consegnata: true,
        isLoaded: true,
      },
    };
    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzionePreviewStatistiche).props().backUrl).toBe(
      '/homepage'
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostra uno messaggio di errore se attivo', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzionePreviewStep).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(EsecuzionePreviewStatistiche).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostra statistiche', () => {
    const props = {
      ...mockProps,
      spinner: false,
      contenutoEsercizio: {
        ...mockProps.contenutoEsercizio,
        consegnata: true,
        isLoaded: true,
      },
    };
    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzionePreviewStep).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(EsecuzionePreviewStatistiche).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il contenuto se interfaccia bloccata', () => {
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isInterfaceLocked: true,
      },
    };
    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo helpFunction', () => {
    const props = {
      ...mockProps,
      versioneCaricata: {
        ...mockProps.versioneCaricata,
        isEsecuzioneLoaded: false,
      },
      onPostRisposta: jest.fn(),
    };

    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );

    expect(props.onPostRisposta).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.helpFunction();
    expect(props.onPostRisposta).toHaveBeenLastCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoEsercizio: props.contenutoEsercizio,
      helpRequest: true,
    });
  });

  it('toggleFocus deve chiamare onRispostaSet', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.toggleFocus(true);
    expect(props.onRispostaSet).toHaveBeenLastCalledWith({
      isFocusEnabled: true,
    });
  });

  it('apriChiudiSezioni deve chiamare onOpenedSectionsSet', () => {
    const props = {
      ...mockProps,
      onOpenedSectionsSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onOpenedSectionsSet).not.toHaveBeenCalled();
    instance.apriChiudiSezioni('key', true, true, { data: 1 });
    expect(props.onOpenedSectionsSet).toHaveBeenLastCalledWith(
      calcolaSezioniAperteStatistiche('key', true, true, { data: 1 })
    );

    // default
    instance.apriChiudiSezioni('key');
    expect(props.onOpenedSectionsSet).toHaveBeenLastCalledWith(
      calcolaSezioniAperteStatistiche('key', true, false, {})
    );
  });

  it('testo selezionaRisposta', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.selezionaRisposta(['risposta']);
    expect(props.onRispostaSet).toHaveBeenCalledWith({
      isCheckable: true,
      rispostaSelezionata: ['risposta'],
    });
  });

  it('testo proseguiAvanzamento quando avanzo di step', () => {
    const history = {
      push: () => { },
    };
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isCorrect: true,
        mostraSoluzione: false,
      },
      onStepNext: jest.fn(),
      history,
    };

    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onStepNext).not.toHaveBeenCalled();
    instance.proseguiAvanzamento();
    expect(props.onStepNext).toHaveBeenCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoEsercizio: props.contenutoEsercizio,
    });
  });

  it('testo submitRisposta', () => {
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isCorrect: false,
        mostraSoluzione: false,
      },
      onPostRisposta: jest.fn(),
    };

    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onPostRisposta).not.toHaveBeenCalled();
    instance.submitRisposta();
    expect(props.onPostRisposta).toHaveBeenLastCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoEsercizio: props.contenutoEsercizio,
      helpRequest: false,
    });
  });

  it('testo che funzioneSelezionaRisposta chiami this.selezionaRisposta > onRispostaSet', () => {
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isCorrect: false,
        mostraSoluzione: false,
      },
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <EsercizioPreviewEsecuzioneView {...props} />
    );
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzionePreviewStep).props().selezioneRispostaFx({
      data: 123,
    });
    expect(props.onRispostaSet).toHaveBeenCalledWith({
      rispostaSelezionata: { data: 123 },
      isCheckable: false,
    });
  });

  it('componentDidMount deve chiamare onEsercizioPreviewStepInizialize', () => {
    const props = {
      ...mockProps,
      onEsercizioPreviewStepInizialize: jest.fn(),
      match: { params: { esercizioId: '333' } },
    };

    shallow(<EsercizioPreviewEsecuzioneView {...props} />);
    expect(props.onEsercizioPreviewStepInizialize).toHaveBeenCalledWith(333, true);
  });
});


describe('<EsercizioPreviewEsecuzione />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerEsercizioPreview = injectReducer({ key: 'esercizioPreview', reducer: esercizioPreviewReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerEsercizioPreview,
    withReducerModalBox,
    connect()
  )(EsercizioPreviewEsecuzione);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { esercizioId: '123' } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.step).toEqual(defaultEsercizioPreviewStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultEsercizioPreviewFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultEsercizioPreviewRisposta.toJS());
    expect(receivedProps.contenutoEsercizio).toEqual(defaultEsercizioPreviewContenuto.toJS());
  });

  it('testo le props mapDispatchToProps', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { esercizioId: '123' } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onEsercizioPreviewStepInizialize({ data: 222 });
    expect(store.dispatch).toHaveBeenCalledWith(
      esercizioPreviewStepInitialize({ data: 222 })
    );

    receivedProps.onOpenedSectionsSet({ data: 444 });
    expect(store.dispatch).toHaveBeenCalledWith(
      esercizioPreviewContenutoSet({
        openedSections: {
          data: 444,
        },
      })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    receivedProps.onModalResetData();
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );

    receivedProps.onRispostaSet({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      esercizioPreviewRispostaSet({ data: 123 })
    );

    receivedProps.onPostRisposta({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      esercizioPreviewRispostaPost({ data: 123 })
    );

    receivedProps.onStepNext({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      esercizioPreviewStepNext({ data: 123 })
    );
  });
});

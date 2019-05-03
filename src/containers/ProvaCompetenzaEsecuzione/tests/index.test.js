import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import {
  provaCompetenzaRispostaSet,
  provaCompetenzaReset,
  provaCompetenzaRispostaPost,
  provaCompetenzaStepNext,
} from 'containers/ProvaCompetenza/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import provaCompetenzaReducer, {
  defaultProvaCompetenzaFeedback,
  defaultProvaCompetenzaContenuto,
  defaultProvaCompetenzaRisposta,
  defaultProvaCompetenzaStep,
} from 'containers/ProvaCompetenza/reducer';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import Container from 'components/Container';
import HtmlBlock from 'components/HtmlBlock';
import { mockElementiN } from 'common/testing-mocks';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { FlexWrap } from 'components/FlexBox';
import ProvaCompetenzaEsecuzione, { ProvaCompetenzaEsecuzioneView, BloccoRiepilogo } from '../index';


const mockConfiguration = {
  product: 'lyceum',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};
const mockProps = {
  isModalBoxOpened: false,
  dispatch: () => { },
  userAppData: {
    docente: true,
    hints: {
      stepG: true,
    },
  },
  configuration: mockConfiguration,
  history: {
    push: jest.fn(),
  },
  step: {
    testi: [mockElementiN[0]],
    esercizi: [mockElementiN[1]],
    isStepLoaded: true,
    numeroProgressivoStep: 1,
  },
  userAnagraphics: {
    id: 5666,
  },
  contenutoProva: {
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
  onProvaCompetenzaReset: () => { },
  onPostRisposta: () => { },
  onStepNext: () => { },
  onRispostaSet: () => { },
};

describe('<ProvaCompetenzaEsecuzioneView />', () => {
  it('Mostra lo stato iniziale', () => {
    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...mockProps} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostra uno spinner se attivo', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostra uno spinner se contenutoProva.isLoaded == false', () => {
    const props = {
      ...mockProps,
      contenutoProva: {
        ...mockProps.contenutoProva,
        isLoaded: false,
      },
    };
    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('chiama history.push se !isStepLoaded', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      step: {
        ...mockProps.step,
        isStepLoaded: false,
      },
    };

    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<ProvaCompetenzaEsecuzioneView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/homepage');
  });

  it('chiama history.push se !contenutoProva.isLoaded', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      contenutoProva: {
        ...mockProps.contenutoProva,
        isLoaded: false,
      },
    };

    expect(props.history.push).not.toHaveBeenCalled();
    shallow(<ProvaCompetenzaEsecuzioneView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/homepage');
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
      <ProvaCompetenzaEsecuzioneView {...props} />
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
      <ProvaCompetenzaEsecuzioneView {...props} />
    );

    expect(props.onPostRisposta).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.helpFunction();
    expect(props.onPostRisposta).toHaveBeenLastCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoProva: props.contenutoProva,
      isDocente: props.userAppData.docente,
      helpRequest: true,
    });
  });

  it('toggleFocus deve chiamare onRispostaSet', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.toggleFocus(true);
    expect(props.onRispostaSet).toHaveBeenLastCalledWith({
      isFocusEnabled: true,
    });
  });

  it('testo TopBar.rightBtn se esiste testo', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    const topbarVersioniButton = renderedComponent.find(EsecuzioneSteps).props().topBarParams.rightBtn;
    expect(topbarVersioniButton).toBeTruthy();
    topbarVersioniButton.onClickFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      topbar: true,
      titolo: 'Testo',
      isPopup: false,
      bgcolor: 'transparent',
      contenuto: (
        <Page full>
          <Container>
            <BloccoRiepilogo text={props.contenutoProva.testo} />
          </Container>
        </Page>
      ),
      show: true,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo TopBar.rightBtn se non il testo è vuoto (non deve mostrare pulsante popup)', () => {
    const props = {
      ...mockProps,
      contenutoProva: {
        ...mockProps.contenutoProva,
        testo: '',
      },
    };

    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...props} />
    );

    expect(renderedComponent.find(EsecuzioneSteps).props().topBarParams.rightBtn).toBe(undefined);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo selezionaRisposta', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...props} />
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
      <ProvaCompetenzaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onStepNext).not.toHaveBeenCalled();
    instance.proseguiAvanzamento();
    expect(props.onStepNext).toHaveBeenCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoProva: props.contenutoProva,
      isDocente: props.userAppData.docente,
      history,
      configuration: mockConfiguration,
      dispatch: props.dispatch,
      userAnagraphics: props.userAnagraphics,
      userAppData: props.userAppData,
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
      <ProvaCompetenzaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onPostRisposta).not.toHaveBeenCalled();
    instance.submitRisposta();
    expect(props.onPostRisposta).toHaveBeenLastCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoProva: props.contenutoProva,
      helpRequest: false,
      isDocente: props.userAppData.docente,
    });
  });

  it('testo il close della tobar se è docente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: true,
      },
      history: {
        push: jest.fn(),
      },
      onProvaCompetenzaReset: jest.fn(),
    };

    const renderedComponent = shallow(
      <ProvaCompetenzaEsecuzioneView {...props} />
    );
    renderedComponent.find(EsecuzioneSteps).props().topBarParams.closeBtn.onClickFunction();
    expect(props.onProvaCompetenzaReset).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/prova-competenza-preview/123');
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
      <ProvaCompetenzaEsecuzioneView {...props} />
    );
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneSteps).props().funzioneSelezionaRisposta({
      data: 123,
    });
    expect(props.onRispostaSet).toHaveBeenCalledWith({
      rispostaSelezionata: { data: 123 },
      isCheckable: false,
    });
  });
});

describe('<ProvaCompetenzaEsecuzione />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerProvaCompetenza = injectReducer({ key: 'provaCompetenza', reducer: provaCompetenzaReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerProvaCompetenza,
    withReducerModalBox,
    connect()
  )(ProvaCompetenzaEsecuzione);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.step).toEqual(defaultProvaCompetenzaStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultProvaCompetenzaFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultProvaCompetenzaRisposta.toJS());
    expect(receivedProps.contenutoProva).toEqual(defaultProvaCompetenzaContenuto.toJS());
  });

  it('testo le props mapDispatchToProps', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

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
      provaCompetenzaRispostaSet({ data: 123 })
    );

    receivedProps.onProvaCompetenzaReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      provaCompetenzaReset()
    );

    receivedProps.onPostRisposta({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      provaCompetenzaRispostaPost({ data: 123 })
    );

    receivedProps.onStepNext({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      provaCompetenzaStepNext({ data: 123 })
    );
  });
});

describe('<BloccoRiepilogo />', () => {
  it('should render a <div>', () => {
    const renderedComponent = shallow(<BloccoRiepilogo />);
    expect(renderedComponent.find(HtmlBlock).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      radius: {
        general: '30px',
      },
    };
    const renderedComponent = shallow(
      <BloccoRiepilogo theme={theme} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props radius', () => {
    const radius = '40px';
    const renderedComponent = shallow(
      <BloccoRiepilogo radius={radius} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

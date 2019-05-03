import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import {
  provaParallelRispostaSet,
  provaParallelReset,
  provaParallelRispostaPost,
  provaParallelEsecuzioneFetch,
} from 'containers/ProvaParallel/actions';
import modalBoxReducer from 'containers/ModalBox/reducer';
import provaParallelReducer, {
  defaultProvaParallelFeedback,
  defaultProvaParallelEsecuzione,
  defaultProvaParallelRisposta,
  defaultProvaParallelStep,
} from 'containers/ProvaParallel/reducer';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import Container from 'components/Container';
import HtmlBlock from 'components/HtmlBlock';
import { mockElementiN } from 'common/testing-mocks';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { FlexWrap } from 'components/FlexBox';
import ProvaParallelEsecuzione, { ProvaParallelEsecuzioneView, BloccoRiepilogo } from '../index';


const configuration = {
  product: 'product',
  disciplinaId: 3,
};

const mockProps = {
  history: {
    push: () => { },
  },
  step: {
    testi: [mockElementiN[0]],
    esercizi: [mockElementiN[1]],
    numeroProgressivoStep: 0,
  },
  esecuzione: {
    isLoaded: true,
    consegnata: false,
    id: 1,
    titolo: 'titolo',
    testo: 'testo',
    steps: [{
      testi: [mockElementiN[0]],
      esercizi: [mockElementiN[1]],
      numeroProgressivoStep: 0,
    }],
    risposteFornite: {},
    stepCaricato: 0,
  },
  risposta: {
    rispostaSelezionata: ['risposta'],
    isCheckable: true,
    isFocusEnabled: false,
  },
  spinner: false,
  isModalBoxOpened: false,
  onProvaParallelEsecuzioneFetch: () => { },
  onModalSetData: () => { },
  onModalResetData: () => { },
  onRispostaSet: () => { },
  onProvaParallelReset: () => { },
  onProvaParallelRispostaPost: () => { },
  configuration,
  match: {
    params: {
      id: '44',
    },
  },
};


describe('ProvaParallelEsecuzioneView', () => {
  it('stato iniziale', () => {
    const renderedComponent = shallow(
      <ProvaParallelEsecuzioneView {...mockProps} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent.find(EsecuzioneSteps).props()).toEqual({
      apriModalBox: expect.any(Function),
      audioSettings: {
        enablePause: true,
        maxRepetitions: 1,
      },
      chiudiModalBox: expect.any(Function),
      correzioneRisposta: {
        isCheckable: true,
        isChecked: false,
        isCorrect: false,
        isPristine: false,
        isInterfaceLocked: false,
        isHelpEnabled: false,
        mostraSoluzione: false,
        mostraCorrezione: false,
        risposteInizializza: undefined,
        isFocusEnabled: false,
      },
      correzioneRispostaFx: expect.any(Function),
      disableAutofocus: false,
      funzioneSelezionaRisposta: expect.any(Function),
      hasCorreggi: false,
      hasHelp: false,
      hasLessico: false,
      hasSkip: true,
      rispostaSelezionata: ['risposta'],
      skipFunction: expect.any(Function),
      stepCaricato: {
        esercizi: [expect.any(Object)],
        testi: [expect.any(Object)],
        numeroProgressivoStep: 0,
      },
      stepEseguiti: 0,
      stepTotali: 1,
      toggleFocusFunction: expect.any(Function),
      topBarParams: {
        closeBtn: {
          enabled: true,
          onClickFunction: expect.any(Function),
          url: '#',
        },
        rightBtn: {
          icon: 'version',
          onClickFunction: expect.any(Function),
        },
      },
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('spinner se attivo', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('il contenuto se interfaccia bloccata', () => {
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isInterfaceLocked: true,
      },
    };
    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('toggleFocus deve chiamare onRispostaSet', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.toggleFocus(true);
    expect(props.onRispostaSet).toHaveBeenLastCalledWith({
      isFocusEnabled: true,
    });
  });

  it('TopBar.rightBtn se esiste testo', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);

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
            <BloccoRiepilogo text={props.esecuzione.testo} />
          </Container>
        </Page>
      ),
      show: true,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('TopBar.rightBtn se non il testo è vuoto (non deve mostrare pulsante popup)', () => {
    const props = {
      ...mockProps,
      esecuzione: {
        ...mockProps.esecuzione,
        testo: '',
      },
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);

    expect(renderedComponent.find(EsecuzioneSteps).props().topBarParams.rightBtn).toBe(undefined);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('selezionaRisposta', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.selezionaRisposta(['risposta']);
    expect(props.onRispostaSet).toHaveBeenCalledWith({
      isCheckable: true,
      rispostaSelezionata: ['risposta'],
    });
  });

  it('invio risposta', () => {
    const props = {
      ...mockProps,
      onProvaParallelRispostaPost: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    const instance = renderedComponent.instance();
    expect(props.onProvaParallelRispostaPost).not.toHaveBeenCalled();
    instance.submitRisposta(false);
    expect(props.onProvaParallelRispostaPost).toHaveBeenLastCalledWith({
      step: props.step,
      steps: props.esecuzione.steps,
      rispostaSelezionata: props.risposta.rispostaSelezionata,
      stepCaricato: 0,
      skipRequest: false,
      idProvaParallel: 1,
      historyPush: props.history.push,
      disciplinaId: 3,
      product: 'product',
      risposteFornite: {},
    });
  });

  it('skipFunction', () => {
    const props = {
      ...mockProps,
      onProvaParallelRispostaPost: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    expect(props.onProvaParallelRispostaPost).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneSteps)
      .dive().dive().dive()
      .find('ToolBarButton').at(0).props().onClickFx();
    expect(props.onProvaParallelRispostaPost).toHaveBeenLastCalledWith({
      step: props.step,
      steps: props.esecuzione.steps,
      rispostaSelezionata: props.risposta.rispostaSelezionata,
      stepCaricato: 0,
      skipRequest: true,
      idProvaParallel: 1,
      historyPush: props.history.push,
      disciplinaId: 3,
      product: 'product',
      risposteFornite: {},
    });
  });

  it('correzioneRispostaFx', () => {
    const props = {
      ...mockProps,
      onProvaParallelRispostaPost: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    expect(props.onProvaParallelRispostaPost).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneSteps)
      .dive().dive().dive()
      .find('ToolBarButton').at(1).props().onClickFx();
    expect(props.onProvaParallelRispostaPost).toHaveBeenLastCalledWith({
      step: props.step,
      steps: props.esecuzione.steps,
      rispostaSelezionata: props.risposta.rispostaSelezionata,
      stepCaricato: 0,
      skipRequest: false,
      idProvaParallel: 1,
      historyPush: props.history.push,
      disciplinaId: 3,
      product: 'product',
      risposteFornite: {},
    });
  });

  it('il close della tobar', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      onProvaParallelReset: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
    renderedComponent.find(EsecuzioneSteps).props().topBarParams.closeBtn.onClickFunction();
    expect(props.onProvaParallelReset).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/prova-parallel/1');
  });

  it('che funzioneSelezionaRisposta chiami this.selezionaRisposta > onRispostaSet', () => {
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isCorrect: false,
        mostraSoluzione: false,
      },
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(<ProvaParallelEsecuzioneView {...props} />);
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


describe('<ProvaParallelEsecuzione />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerProvaParallel = injectReducer({ key: 'provaParallel', reducer: provaParallelReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerProvaParallel,
    withReducerModalBox,
    connect()
  )(ProvaParallelEsecuzione);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    expect(receivedProps.configuration).toEqual(configuration);
    expect(receivedProps.step).toEqual(defaultProvaParallelStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultProvaParallelFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultProvaParallelRisposta.toJS());
    expect(receivedProps.esecuzione).toEqual(defaultProvaParallelEsecuzione.toJS());
  });

  it('le props mapDispatchToProps', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onProvaParallelEsecuzioneFetch({ data: 333 });
    expect(store.dispatch).toHaveBeenCalledWith(
      provaParallelEsecuzioneFetch({ data: 333 })
    );

    receivedProps.onModalSetData({ data: 444 });
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 444 })
    );

    receivedProps.onModalResetData();
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );

    receivedProps.onRispostaSet({ data: 111 });
    expect(store.dispatch).toHaveBeenCalledWith(
      provaParallelRispostaSet({ data: 111 })
    );

    receivedProps.onProvaParallelReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      provaParallelReset()
    );

    receivedProps.onProvaParallelRispostaPost({ data: 222 });
    expect(store.dispatch).toHaveBeenCalledWith(
      provaParallelRispostaPost({ data: 222 })
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

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import {
  unitaRispostaSet,
  unitaReset,
  unitaRispostaPost,
  unitaStepNext,
} from 'containers/Unita/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import unitaReducer, {
  defaultUnitaFeedback,
  defaultUnitaContenuto,
  defaultUnitaRisposta,
  defaultUnitaStep,
} from 'containers/Unita/reducer';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import Spinner from 'components/Spinner';
import HtmlBlock from 'components/HtmlBlock';
import { mockElementiN, mockElementiM } from 'common/testing-mocks';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { FlexWrap } from 'components/FlexBox';
import UnitaEsecuzione, { UnitaEsecuzioneView, BloccoRiepilogo } from '../index';


const mockConfiguration = {
  product: 'alatin',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const mockProps = {
  isModalBoxOpened: false,
  dispatch: () => { },
  userAppData: {
    docente: true,
    enableSuoni: true,
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
    stepId: 3,
    numeroStepCompletati: 2,
    nextStep: {
      testi: [mockElementiM[0]],
      esercizi: [mockElementiM[1]],
      stepId: 4,
      numeroStepCompletati: 3,
    },
  },
  userAnagraphics: {
    id: 5666,
    studenteAcademy: {
      punti: 12,
    },
  },
  contenutoUnita: {
    isLoaded: true,
    difficolta: '02',
    lezione: 444,
    lezioni: {
      totale: 3,
      completate: 2,
      data: {
        0: {
          inCorso: true,
          completata: true,
          sbloccata: true,
        },
        1: {
          inCorso: false,
          completata: false,
          sbloccata: true,
        },
        2: {
          inCorso: false,
          completata: false,
          sbloccata: false,
        },
      },
    },
    assegnata: true,
    consegnata: true,
    id: 4555,
    titolo: 'titolo unità',
    prerequisito: 12345,
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
  onUnitaReset: () => { },
  onPostRisposta: () => { },
  onStepNext: () => { },
  onRispostaSet: () => { },
};

describe('<UnitaEsecuzioneView />', () => {
  it('Mostra lo stato iniziale', () => {
    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...mockProps} />
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
      <UnitaEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostra uno spinner se contenutoUnita.isLoaded == false', () => {
    const props = {
      ...mockProps,
      contenutoUnita: {
        ...mockProps.contenutoUnita,
        isLoaded: false,
      },
    };
    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('correzioneRispostaFx chiama onStepNext se interfaceLocked', () => {
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isInterfaceLocked: true,
      },
      onPostRisposta: jest.fn(),
      onStepNext: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
    );

    expect(props.onPostRisposta).not.toHaveBeenCalled();
    expect(props.onStepNext).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneSteps).props().correzioneRispostaFx();
    expect(props.onPostRisposta).not.toHaveBeenCalled();
    expect(props.onStepNext).toHaveBeenCalled();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('correzioneRispostaFx chiama onStepNext se interfaceLocked = false', () => {
    const props = {
      ...mockProps,
      risposta: {
        ...mockProps.risposta,
        isInterfaceLocked: false,
      },
      onPostRisposta: jest.fn(),
      onStepNext: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
    );

    expect(props.onPostRisposta).not.toHaveBeenCalled();
    expect(props.onStepNext).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneSteps).props().correzioneRispostaFx();
    expect(props.onPostRisposta).toHaveBeenCalled();
    expect(props.onStepNext).not.toHaveBeenCalled();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('topBarParams se docente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        docente: false,
      },
    };
    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
    );

    expect(
      renderedComponent.find(EsecuzioneSteps).props().topBarParams
    ).toEqual({
      score: '+ 12',
      closeBtn: {
        url: '#',
        enabled: true,
        onClickFunction: expect.any(Function),
      },
      rightBtn: {
        enabled: true,
        icon: 'lesson',
        url: '/lezione/444/unita-esecuzione',
      },
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('topBarParams se studente', () => {
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        docente: true,
      },
    };
    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
    );

    expect(
      renderedComponent.find(EsecuzioneSteps).props().topBarParams
    ).toEqual({
      score: '',
      closeBtn: {
        url: '#',
        enabled: true,
        onClickFunction: expect.any(Function),
      },
      rightBtn: {
        enabled: true,
        icon: 'lesson',
        url: '/lezione/444/unita-esecuzione',
      },
    });
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
      <UnitaEsecuzioneView {...props} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('toggleFocus deve chiamare onRispostaSet', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.toggleFocus(true);
    expect(props.onRispostaSet).toHaveBeenLastCalledWith({
      isFocusEnabled: true,
    });
  });

  it('testo selezionaRisposta', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
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
      <UnitaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onStepNext).not.toHaveBeenCalled();
    instance.proseguiAvanzamento();
    expect(props.onStepNext).toHaveBeenCalledWith({
      nextStep: props.step.nextStep,
      risposta: props.risposta,
      isConsegnata: true,
      historyPush: props.history.push,
      enableSuoni: true,
      dispatch: props.dispatch,
      productName: 'alatin',
      userId: 5666,
      userHints: { stepG: true },
      isDocente: true,
      studenteAcademy: props.userAnagraphics.studenteAcademy,
      difficolta: '02',
      lezioni: props.contenutoUnita.lezioni,
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
      <UnitaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onPostRisposta).not.toHaveBeenCalled();
    instance.submitRisposta();
    expect(props.onPostRisposta).toHaveBeenLastCalledWith({
      step: props.step,
      contenutoUnita: props.contenutoUnita,
      risposta: props.risposta,
      enableSuoni: true,
      isDocente: true,
      disciplinaId: 123,
      studenteAcademy: {
        punti: 12,
      },
    });
  });

  it('testo il close della tobar', () => {
    const props = {
      ...mockProps,
      userAppData: {
        docente: true,
      },
      history: {
        push: jest.fn(),
      },
      onUnitaReset: jest.fn(),
    };

    const renderedComponent = shallow(
      <UnitaEsecuzioneView {...props} />
    );
    renderedComponent.find(EsecuzioneSteps).props().topBarParams.closeBtn.onClickFunction();
    expect(props.onUnitaReset).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/unita-preview/4555');
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
      <UnitaEsecuzioneView {...props} />
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

describe('<UnitaEsecuzione />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerUnita = injectReducer({ key: 'unita', reducer: unitaReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerUnita,
    withReducerModalBox,
    connect()
  )(UnitaEsecuzione);

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
    expect(receivedProps.step).toEqual(defaultUnitaStep.toJS());
    expect(receivedProps.spinner).toBe(true);
    expect(receivedProps.feedback).toEqual(defaultUnitaFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultUnitaRisposta.toJS());
    expect(receivedProps.contenutoUnita).toEqual(defaultUnitaContenuto.toJS());
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
      unitaRispostaSet({ data: 123 })
    );

    receivedProps.onUnitaReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      unitaReset()
    );

    receivedProps.onPostRisposta({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      unitaRispostaPost({ data: 123 })
    );

    receivedProps.onStepNext({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      unitaStepNext({ data: 123 })
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

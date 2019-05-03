import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import {
  verificaRispostaSet,
  verificaReset,
  verificaRispostaPost,
} from 'containers/Verifica/actions';
import userReducer, { defaultAppData, defaultAnagraphicsSettings } from 'containers/User/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import ZendeskTicket from 'containers/ZendeskTicket';
import verificaReducer, {
  defaultVerificaFeedback,
  defaultVerificaContenuto,
  defaultVerificaRisposta,
  defaultVerificaStep,
} from 'containers/Verifica/reducer';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import Spinner from 'components/Spinner';
import { mockElementiN } from 'common/testing-mocks';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { FlexWrap } from 'components/FlexBox';
import { API_BASE_PATH } from 'configuration';

import VerificaEsecuzione, { VerificaEsecuzioneView } from '../index';


const mockConfiguration = {
  product: 'alatin',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/',
};
const mockProps = {
  configuration: mockConfiguration,
  userAppData: {
    docente: true,
    enableSuoni: true,
    hints: {
      hint1: true,
      hint2: false,
    },
  },
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
    id: 777,
  },
  contenutoVerifica: {
    isLoaded: true,
    inCorso: true,
    consegnata: false,
    ritirata: false,
    id: 0,
    totaleStep: 2,
    voto: -1,
    steps: [],
    stepRiaccodati: [],
    unitaSelezionate: [],
    risposteFornite: {},
    stepCaricato: 0,
    livelloId: 10,
    soloLatino: false,
    backUrl: '/backurl',
  },
  risposta: {
    rispostaSelezionata: ['risposta selezionata'],
    isCheckable: false,
    isFocusEnabled: false,
  },
  spinner: false,
  onModalSetData: () => { },
  onModalResetData: () => { },
  onVerificaReset: () => { },
  onPostRisposta: () => { },
  onRispostaSet: () => { },
  dispatch: () => { },
  isModalBoxOpened: false,
};

describe('<VerificaEsecuzioneView />', () => {
  it('Mostra lo stato iniziale', () => {
    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...mockProps} />
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
      <VerificaEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostra uno spinner se step.isLoaded == false', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        isStepLoaded: false,
      },
    };
    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );
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
    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('skipFunction', () => {
    const props = {
      ...mockProps,
      onPostRisposta: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );

    expect(props.onPostRisposta).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.skipFunction();
    expect(props.onPostRisposta).toHaveBeenLastCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoVerifica: props.contenutoVerifica,
      isSaltata: true,
      isDocente: true,
      enableSuoni: true,
      productName: 'alatin',
      userHints: {
        hint1: true,
        hint2: false,
      },
      userId: 777,
      dispatch: props.dispatch,
      historyPush: props.history.push,
    });
  });

  it('toggleFocus deve chiamare onRispostaSet', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.toggleFocus(true);
    expect(props.onRispostaSet).toHaveBeenLastCalledWith({
      isFocusEnabled: true,
    });
  });

  it('selezionaRisposta', () => {
    const props = {
      ...mockProps,
      onRispostaSet: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    instance.selezionaRisposta(['risposta']);
    expect(props.onRispostaSet).toHaveBeenCalledWith({
      isCheckable: true,
      rispostaSelezionata: ['risposta'],
    });
  });

  it('submitRisposta', () => {
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
      <VerificaEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onPostRisposta).not.toHaveBeenCalled();
    instance.submitRisposta();
    expect(props.onPostRisposta).toHaveBeenLastCalledWith({
      step: props.step,
      risposta: props.risposta,
      contenutoVerifica: props.contenutoVerifica,
      isSaltata: false,
      isDocente: true,
      enableSuoni: true,
      productName: 'alatin',
      userHints: {
        hint1: true,
        hint2: false,
      },
      userId: 777,
      dispatch: props.dispatch,
      historyPush: props.history.push,
    });
  });

  it('close della tobar', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      onVerificaReset: jest.fn(),
    };

    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );
    renderedComponent.find(EsecuzioneSteps).props().topBarParams.closeBtn.onClickFunction();
    expect(props.onVerificaReset).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/backurl');
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

    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
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

  it('helpButtonFunction deve chiamare onModalSetData per inviare un ticket per docente', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
      contenutoVerifica: {
        ...mockProps.contenutoVerifica,
        unitaSelezionate: [1, 2, 3],
      },
      userAppData: {
        ...mockProps.userAppData,
        docente: true,
      },
    };

    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.helpButtonFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'esecuzione_verifica',
            provenienzaReadable: 'Esecuzione verifica step #1',
            titolo: 'Esecuzione verifica prova (unità pk: 1, 2, 3)',
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/esercizioacademy/97552/change`,
            consegna: 'Analizza il tempo e la diatesi',
            testoSemplificato: 'Luna splendet stellae fulgent',
            elementi: [94634, 94635],
            rispostaUtente: 'risposta selezionata',
            rispostaUtenteResponso: 'non applicabile',
            rispostePossibili: 'attivo | presente',
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });

  it('helpButtonFunction deve chiamare onModalSetData per inviare un ticket per studente', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
      contenutoVerifica: {
        ...mockProps.contenutoVerifica,
        id: 1,
      },
      userAppData: {
        ...mockProps.userAppData,
        docente: false,
      },
    };

    const renderedComponent = shallow(
      <VerificaEsecuzioneView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.helpButtonFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'esecuzione_verifica',
            provenienzaReadable: 'Esecuzione verifica step #1',
            titolo: 'Esecuzione verifica #1',
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/esercizioacademy/97552/change`,
            consegna: 'Analizza il tempo e la diatesi',
            testoSemplificato: 'Luna splendet stellae fulgent',
            elementi: [94634, 94635],
            rispostaUtente: 'risposta selezionata',
            rispostaUtenteResponso: 'non applicabile',
            rispostePossibili: 'attivo | presente',
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });
  });
});

describe('<VerificaEsecuzione />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerVerifica = injectReducer({ key: 'verifiche', reducer: verificaReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerVerifica,
    withReducerModalBox,
    connect()
  )(VerificaEsecuzione);

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
    expect(receivedProps.userAnagraphics).toEqual(defaultAnagraphicsSettings.toJS());
    expect(receivedProps.step).toEqual(defaultVerificaStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultVerificaFeedback.toJS());
    expect(receivedProps.risposta).toEqual(defaultVerificaRisposta.toJS());
    expect(receivedProps.contenutoVerifica).toEqual(defaultVerificaContenuto.toJS());
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
      verificaRispostaSet({ data: 123 })
    );

    receivedProps.onVerificaReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      verificaReset()
    );

    receivedProps.onPostRisposta({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      verificaRispostaPost({ data: 123 })
    );
  });
});

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { mockElementiN } from 'common/testing-mocks';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import corsiReducer, { defaultcorsoSelezionato } from 'containers/Corsi/reducer';

import UnitaErroriComuniStep from '../UnitaErroriComuniStep';
import ResponseView from 'components/ResponseView';
import UnitaErroriComuniEsecuzione, { UnitaErroriComuniEsecuzioneView } from '../index';
import {
  unitaErroriComuniRispostaSet,
  unitaErroriComuniRispostaPost,
  unitaErroriComuniStepNext,
  unitaErroriComuniReset,
} from '../actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import unitaErroriComuniReducer, {
  defaultUnitaErroriComuniContenuto,
  defaultUnitaErroriComuniRisposta,
  defaultUnitaErroriComuniStep,
} from '../reducer';

const mockConfiguration = {
  product: 'lyceum',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};
const mockProps = {
  match: {
    params: {
      unitaId: '4444',
    },
  },
  isModalBoxOpened: false,
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
    unitaId: 123,
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
  onModalSetData: () => { },
  onModalResetData: () => { },
  onUnitaErroriComuniReset: () => { },
  onPostRisposta: () => { },
  onStepNext: () => { },
  onRispostaSet: () => { },
  onUnitaErroriComuniStepInizialize: () => { },
  corsoSelezionato: {
    pk: 444,
    isCorsoLoaded: true,
  },
  history: {
    push: () => { },
  },
};

describe('<UnitaErroriComuniEsecuzioneView />', () => {
  it('Mostra lo step da eseguire', () => {
    const renderedComponent = shallow(
      <UnitaErroriComuniEsecuzioneView {...mockProps} />
    );
    expect(renderedComponent.find(UnitaErroriComuniStep).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(ResponseView).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Se non unitaId UnitaErroriComuniStep rimanda alla pagina di andamento', () => {
    const renderedComponent = shallow(
      <UnitaErroriComuniEsecuzioneView {...mockProps} />
    );
    expect(renderedComponent.find(UnitaErroriComuniStep).props().backUrl).toBe(
      '/unita-andamento/4444'
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Se !contenutoEsericizio.isLoaded rimanda alla pagina di andamento', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      contenutoEsercizio: {
        ...mockProps.contenutoEsercizio,
        isLoaded: false,
      },
    };
    const renderedComponent = shallow(
      <UnitaErroriComuniEsecuzioneView {...props} />
    );
    expect(props.history.push).toHaveBeenCalledWith('/unita-andamento/4444');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Se consegnata mostro ResponseView', () => {
    const props = {
      ...mockProps,
      contenutoEsercizio: {
        ...mockProps.contenutoEsercizio,
        consegnata: true,
      },
      match: { params: { unitaId: '666' } },
    };
    const renderedComponent = shallow(
      <UnitaErroriComuniEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(UnitaErroriComuniStep).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(ResponseView).length).toBe(1);
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
      <UnitaErroriComuniEsecuzioneView {...props} />
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
      <UnitaErroriComuniEsecuzioneView {...props} />
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
      <UnitaErroriComuniEsecuzioneView {...props} />
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
      <UnitaErroriComuniEsecuzioneView {...props} />
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
      <UnitaErroriComuniEsecuzioneView {...props} />
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
      <UnitaErroriComuniEsecuzioneView {...props} />
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
      <UnitaErroriComuniEsecuzioneView {...props} />
    );
    expect(props.onRispostaSet).not.toHaveBeenCalled();
    renderedComponent.find(UnitaErroriComuniStep).props().selezioneRispostaFx({
      data: 123,
    });
    expect(props.onRispostaSet).toHaveBeenCalledWith({
      rispostaSelezionata: { data: 123 },
      isCheckable: false,
    });
  });

  it('componentDidMount deve chiamare history.push e !contenutoEsercizio.isLoaded', () => {
    const props = {
      ...mockProps,
      contenutoEsercizio: {
        ...mockProps.contenutoEsercizio,
        isLoaded: false,
      },
      history: { push: jest.fn() },
    };

    shallow(<UnitaErroriComuniEsecuzioneView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/unita-andamento/4444');
  });

  it('componentDidMount non deve chiamare history.push e !contenutoEsercizio.isLoaded', () => {
    const props = {
      ...mockProps,
      contenutoEsercizio: {
        ...mockProps.contenutoEsercizio,
        isLoaded: true,
      },
      history: { push: jest.fn() },
    };

    shallow(<UnitaErroriComuniEsecuzioneView {...props} />);
    expect(props.history.push).not.toHaveBeenCalled();
  });

  it('ResponseView > resetFunction deve chiamare onUnitaErroriComuniReset e push ', () => {
    const props = {
      ...mockProps,
      history: { push: jest.fn() },
      onUnitaErroriComuniReset: jest.fn(),
      contenutoEsercizio: {
        ...mockProps.contenutoEsercizio,
        isLoaded: true,
        consegnata: true,
      },
    };

    const renderedComponent = shallow(<UnitaErroriComuniEsecuzioneView {...props} />);
    expect(props.history.push).not.toHaveBeenCalled();
    expect(props.onUnitaErroriComuniReset).not.toHaveBeenCalled();

    expect(renderedComponent.find(ResponseView).length).toBe(1);

    renderedComponent.find(ResponseView).dive().find('Button').simulate('click');
    expect(props.history.push).toHaveBeenCalled();
    expect(props.onUnitaErroriComuniReset).toHaveBeenCalled();
  });
});


describe('<UnitaErroriComuniEsecuzione />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerUnitaErroriComuni = injectReducer({ key: 'unitaErroriComuni', reducer: unitaErroriComuniReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerUnitaErroriComuni,
    withReducerModalBox,
    withReducerCorsi,
    connect()
  )(UnitaErroriComuniEsecuzione);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { unitaId: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.step).toEqual(defaultUnitaErroriComuniStep.toJS());
    expect(receivedProps.risposta).toEqual(defaultUnitaErroriComuniRisposta.toJS());
    expect(receivedProps.contenutoEsercizio).toEqual(defaultUnitaErroriComuniContenuto.toJS());
    expect(receivedProps.corsoSelezionato).toEqual(defaultcorsoSelezionato.toJS());
  });

  it('testo le props mapDispatchToProps', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { unitaId: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive().dive().dive();

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
      unitaErroriComuniRispostaSet({ data: 123 })
    );

    receivedProps.onPostRisposta({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      unitaErroriComuniRispostaPost({ data: 123 })
    );

    receivedProps.onStepNext({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      unitaErroriComuniStepNext({ data: 123 })
    );

    receivedProps.onUnitaErroriComuniReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      unitaErroriComuniReset()
    );
  });
});

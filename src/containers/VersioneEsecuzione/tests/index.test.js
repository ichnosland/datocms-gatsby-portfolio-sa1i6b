import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import {
  versioniVersioneAvanzamentoRisposteUtenteSet,
  versioniVersioneAvanzamentoRisposteUtentePost,
  versioniVersioneEsecuzioneSvuotaTrigger,
  versioniVersioneAvanzamentoNextTrigger,
} from 'containers/Versioni/actions';
import { calcolaTraduzioneUtentePeriodo } from 'containers/Versioni/utils';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';
import versioniReducer, {
  defaultVersioneCaricata,
  defaultVersioneAvanzamento,
  defaultVersioneEsecuzione,
} from 'containers/Versioni/reducer';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import VersionePeriodiTradotti from 'components/VersionePeriodiTradotti';
import { mockElementiN, mockElementiM } from 'common/testing-mocks';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { FlexWrap } from 'components/FlexBox';
import VersioneEsecuzione, { VersioneEsecuzioneView } from '../index';

const mockPeriodiVersione = [{
  periodo: [{
    elementi: mockElementiN,
    id: 0,
  }],
  periodo_id: 0,
}, {
  periodo: [{
    elementi: mockElementiM,
    id: 0,
  }],
  periodo_id: 1,
}];

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};
const mockProps = {
  configuration: mockConfiguration,
  versioneCaricata: {
    titolo: 'titolo',
    sottotitolo: 'sottotitolo',
    isEsecuzioneLoaded: true,
    id: 123,
    periodi: mockPeriodiVersione,
    previewPeriodi: [],
  },
  userAppData: {
    docente: true,
    hints: {
      stepG: true,
      stepUP: true,
      dashboard: true,
    },
  },
  versioneAvanzamento: {
    periodiDaEseguire: {
      periodiIncompletiPks: [0, 1],
      stepDaEseguire: {},
    },
    isCheckable: true,
    isChecked: true,
    isPristine: true,
    isCorrect: false,
    isInterfaceLocked: false,
    isHelpEnabled: true,
    mostraSoluzione: true,
    mostraCorrezione: false,
    rispostaSelezionata: [1, 2],
    risposteFornite: {},
    isFocusEnabled: false,
  },
  history: {
    push: jest.fn(),
  },
  onModalSetData: jest.fn(),
  versioneEsecuzione: {
    periodoCaricato: [{
      testi: [mockElementiN[0]],
      esercizi: [mockElementiN[1]],
      id: 1234,
      periodoId: 1,
    }],
    stepCaricatoKey: 0,
    periodoCaricatoId: 1,
    stepEseguiti: 2,
  },
  spinner: false,
  onSetAvanzamento: jest.fn(),
  onModalResetData: jest.fn(),
  onPostRispostaUtente: jest.fn(),
  onAvanzamentoNext: jest.fn(),
  onEsecuzioneSvuota: jest.fn(),
  isModalBoxOpened: false,
  dispatch: jest.fn(),
  userAnagraphics: {
    id: 1235,
  },
};

describe('<VersioneEsecuzioneView />', () => {
  it('Mostra lo stato iniziale', () => {
    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...mockProps} />
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
      <VersioneEsecuzioneView {...props} />
    );
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il contenuto se interfaccia bloccata', () => {
    const props = {
      ...mockProps,
      versioneAvanzamento: {
        ...mockProps.versioneAvanzamento,
        isInterfaceLocked: true,
      },
    };
    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('se isEsecuzioneLoaded = false ho un history.push su dashboard', () => {
    const props = {
      ...mockProps,
      versioneCaricata: {
        ...mockProps.versioneCaricata,
        isEsecuzioneLoaded: false,
      },
    };

    shallow(
      <VersioneEsecuzioneView {...props} />
    );
    expect(props.history.push).toHaveBeenCalledWith(mockConfiguration.homePage);
  });

  it('testo helpFunction', () => {
    const props = {
      ...mockProps,
      versioneCaricata: {
        ...mockProps.versioneCaricata,
        isEsecuzioneLoaded: false,
      },
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );

    expect(props.onPostRispostaUtente).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.helpFunction();
    expect(props.onPostRispostaUtente).toHaveBeenLastCalledWith({
      versioneEsecuzione: props.versioneEsecuzione,
      isDocente: true,
      versioneAvanzamento: props.versioneAvanzamento,
      versioneCaricata: props.versioneCaricata,
      risposta: props.versioneAvanzamento.rispostaSelezionata,
      helpRequest: true,
    });
  });

  it('testo TopBar.rightBtn se esiste testo', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    const topbarVersioniButton = renderedComponent.find(EsecuzioneSteps).props().topBarParams.rightBtn;
    expect(topbarVersioniButton).toBeTruthy();
    topbarVersioniButton.onClickFunction();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      topbar: true,
      titolo: 'Riepilogo',
      isPopup: false,
      bgcolor: 'transparent',
      contenuto: (
        <Page full>
          <VersionePeriodiTradotti
            modal
            titolo={props.versioneCaricata.titolo}
            sottotitolo={props.versioneCaricata.sottotitolo}
            periodi={
              props.versioneCaricata.previewPeriodi.map((periodo) => ({
                ...periodo,
                mostraTestoTradotto: props.versioneAvanzamento.periodiDaEseguire.periodiIncompletiPks.indexOf(
                  periodo.idPeriodo
                ) === -1,
                testoTradotto: calcolaTraduzioneUtentePeriodo(
                  props.versioneCaricata.periodi[periodo.keyPeriodo],
                  props.versioneAvanzamento.risposteFornite[periodo.idPeriodo] || {}
                ),
              }))
            }
          />
        </Page>
      ),
      show: true,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo proseguiAvanzamento se posso avanzare di step', () => {
    const props = {
      ...mockProps,
      versioneAvanzamento: {
        ...mockProps.versioneAvanzamento,
        isCorrect: true,
        mostraSoluzione: false,
      },
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onAvanzamentoNext).not.toHaveBeenCalled();
    instance.proseguiAvanzamento();
    expect(props.onAvanzamentoNext).toHaveBeenCalledWith({
      periodoCaricatoId: 1,
      periodi: props.versioneCaricata.periodi,
      periodoCaricato: props.versioneEsecuzione.periodoCaricato,
      risposteFornite: props.versioneAvanzamento.risposteFornite,
      stepCaricatoKey: 0,
      isDocente: true,
      id: 123,
      stepEseguiti: 2,
      history: props.history,
      userAppData: props.userAppData,
      configuration: mockConfiguration,
      dispatch: props.dispatch,
      userAnagraphics: props.userAnagraphics,
    });
  });

  it('testo proseguiAvanzamento se non posso avanzare di step', () => {
    const props = {
      ...mockProps,
      versioneAvanzamento: {
        ...mockProps.versioneAvanzamento,
        isCorrect: false,
        mostraSoluzione: false,
      },
      onSetAvanzamento: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onSetAvanzamento).not.toHaveBeenCalled();
    instance.proseguiAvanzamento();
    expect(props.onSetAvanzamento).toHaveBeenCalledWith({
      isInterfaceLocked: false,
      isChecked: false,
      mostraCorrezione: false,
      mostraSoluzione: false,
      isFocusEnabled: false,
    });
  });

  it('testo submitRisposta', () => {
    const props = {
      ...mockProps,
      versioneAvanzamento: {
        ...mockProps.versioneAvanzamento,
        isCorrect: false,
        mostraSoluzione: false,
      },
      onPostRispostaUtente: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onPostRispostaUtente).not.toHaveBeenCalled();
    instance.submitRisposta();
    expect(props.onPostRispostaUtente).toHaveBeenLastCalledWith({
      versioneEsecuzione: props.versioneEsecuzione,
      isDocente: true,
      versioneAvanzamento: props.versioneAvanzamento,
      versioneCaricata: props.versioneCaricata,
      risposta: props.versioneAvanzamento.rispostaSelezionata,
      helpRequest: false,
    });
  });

  it('toggleFocus deve chiamare onSetAvanzamento', () => {
    const props = {
      ...mockProps,
      onSetAvanzamento: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onSetAvanzamento).not.toHaveBeenCalled();
    instance.toggleFocus(true);
    expect(props.onSetAvanzamento).toHaveBeenLastCalledWith({
      isFocusEnabled: true,
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
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );
    renderedComponent.find(EsecuzioneSteps).props().topBarParams.closeBtn.onClickFunction();
    expect(
      props.onEsecuzioneSvuota
    ).toHaveBeenCalledWith({
      periodi: props.versioneCaricata.periodi,
      risposteFornite: props.versioneAvanzamento.risposteFornite,
      history: props.history,
    });
  });

  it('testo che funzioneSelezionaRisposta chiami this.selezionaRisposta > onSetAvanzamento', () => {
    const props = {
      ...mockProps,
      versioneAvanzamento: {
        ...mockProps.versioneAvanzamento,
        isCorrect: false,
        mostraSoluzione: false,
      },
      onSetAvanzamento: jest.fn(),
    };

    const renderedComponent = shallow(
      <VersioneEsecuzioneView {...props} />
    );
    expect(props.onSetAvanzamento).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneSteps).props().funzioneSelezionaRisposta({
      data: 123,
    });
    expect(props.onSetAvanzamento).toHaveBeenCalledWith({
      rispostaSelezionata: { data: 123 },
      isCheckable: false,
    });
  });

  it('componentWillUnmount deve chiamare onEsecuzioneSvuota', () => {
    const props = {
      ...mockProps,
      onEsecuzioneSvuota: jest.fn(),
    };

    const renderedComponent = shallow(<VersioneEsecuzioneView {...props} />);
    const instance = renderedComponent.instance();
    expect(props.onEsecuzioneSvuota).not.toHaveBeenCalled();
    instance.componentWillUnmount();
    expect(props.onEsecuzioneSvuota).toHaveBeenCalledWith({
      risposteFornite: {},
      periodi: props.versioneCaricata.periodi,
      history: props.history,
    });
  });
});

describe('<VersioneEsecuzione />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerVersioni = injectReducer({ key: 'versioni', reducer: versioniReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerVersioni,
    withReducerModalBox,
    connect()
  )(VersioneEsecuzione);

  it('le props iniziali devono essere settate correttamente se non ho il lessico', () => {
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
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.versioneCaricata).toEqual(defaultVersioneCaricata.toJS());
    expect(receivedProps.versioneAvanzamento).toEqual(defaultVersioneAvanzamento.toJS());
    expect(receivedProps.versioneEsecuzione).toEqual(defaultVersioneEsecuzione.toJS());
    expect(receivedProps.spinner).toBe(false);
  });

  it('le props iniziali devono essere settate correttamente se ho il lessico', () => {
    const ConfigurationWrapperWithLessico = compose(
      withReducerConfiguration,
      withReducerUser,
      withReducerVersioni,
      withReducerModalBox,
      connect()
    )(VersioneEsecuzione);

    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapperWithLessico
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.versioneCaricata).toEqual(defaultVersioneCaricata.toJS());
    expect(receivedProps.versioneAvanzamento).toEqual(defaultVersioneAvanzamento.toJS());
    expect(receivedProps.versioneEsecuzione).toEqual(defaultVersioneEsecuzione.toJS());
    expect(receivedProps.spinner).toBe(false);
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

    receivedProps.onSetAvanzamento({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      versioniVersioneAvanzamentoRisposteUtenteSet({ data: 123 })
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    receivedProps.onModalResetData();
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );

    receivedProps.onPostRispostaUtente({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      versioniVersioneAvanzamentoRisposteUtentePost({ data: 123 })
    );

    receivedProps.onEsecuzioneSvuota();
    expect(store.dispatch).toHaveBeenCalledWith(
      versioniVersioneEsecuzioneSvuotaTrigger()
    );

    receivedProps.onAvanzamentoNext({ data: 123 });
    expect(store.dispatch).toHaveBeenCalledWith(
      versioniVersioneAvanzamentoNextTrigger({ data: 123 })
    );
  });
});

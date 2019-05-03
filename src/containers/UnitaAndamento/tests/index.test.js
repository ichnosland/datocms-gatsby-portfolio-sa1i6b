import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import configureStore from 'configureStore';

import correzione from 'images/infocard-icn_correzione.png';
import reducerCurryer from 'common/applications/reducer';
import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { Button, GhostButton } from 'components/Button';
import ReportGrid from 'components/ReportGrid';
import { modalSetData } from 'containers/ModalBox/actions';
import corsiReducer from 'containers/Corsi/reducer';
import { unitaErroriComuniStepInitialize } from 'containers/UnitaErroriComuni/actions';

import {
  defaultUnitaAndamentoFeedback,
  defaultUnitaAndamentoContenuto,
  defaultUnitaAndamentoAndamentoSort,
} from '../reducer';
import { unitaAndamentoFetch, unitaAndamentoSort } from '../actions';
import UnitaAndamento, { UnitaAndamentoView } from '../index';


const mockProps = {
  spinner: false,
  configuration: {
    theme: {
      brand: 'rgb(16, 174, 188)',
    },
  },
  feedback: {
    hasFeedback: false,
    tipologia: 'error',
    messaggio: 'messaggio',
  },
  contenuto: {
    titolo: 'Titolo',
    numeroLezioni: 10,
    prerequisito: 1110,
    sortedData: [{
      data1: 'row1 val 1',
      data2: 333,
      key: 'uno',
      completata: true,
      inCorso: false,
      lezioneRaggiunta: 2,
    }, {
      data1: 'row1 val 2',
      data2: 444,
      key: 'due',
      completata: false,
      inCorso: true,
      lezioneRaggiunta: 1,
    }, {
      data1: 'row1 val 3',
      data2: 555,
      key: 'tre',
      completata: false,
      inCorso: false,
      lezioneRaggiunta: 0,
    }],
    intestazioniColonna: [{
      label: 'Intestazione 1',
      field: 'data1',
      type: 'string',
      fieldsDisplay: [{ field: 'data1' }],
    }, {
      label: 'Intestazione 2',
      field: 'data2',
      type: 'number',
      fieldsDisplay: [{ field: 'data2' }],
    }],
    totaleUnitaCompletate: 1,
    totaleUnitaIniziate: 2,
    totaleUnitaNonIniziate: 3,
  },
  display: {
    field: 'data2',
    sort: 'asc',
    type: 'string',
  },
  onModalSetData: () => { },
  onUnitaAndamentoSort: () => { },
  onUnitaAndamentoFetch: () => { },
  onEsercizioPreviewStepInizialize: () => { },
  history: {
    push: () => { },
  },
  match: {
    params: { id: 555 },
  },
  corsoSelezionato: {
    isCorsoLoaded: true,
    pk: 123,
    iscritti: [{
      last_name: 'Sara',
      first_name: 'Coccodrillo',
      studenteAcademy: 100,
      xp: 2,
    }, {
      last_name: 'Enrico',
      first_name: 'Elefante',
      studenteAcademy: 200,
      xp: undefined,
    }, {
      last_name: 'Andrea',
      first_name: 'Gatto',
      studenteAcademy: 400,
      xp: 6,
    }, {
      last_name: 'Federico',
      first_name: 'Coccinella',
      studenteAcademy: 500,
      xp: 8,
    }],
    isIscrittiLoaded: true,
  },
  onUnitaErroriComuniStepInizialize: () => { },
};

describe('<UnitaAndamentoView />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('visualizzazione righe e intestazioni', () => {
    const renderedComponent = shallow(
      <UnitaAndamentoView {...mockProps} />
    );

    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).props()).toEqual({
      sortingFunction: mockProps.onUnitaAndamentoSort,
      righe: [
        {
          data1: 'row1 val 1',
          data2: 333,
          stato: expect.anything(),
          completata: true,
          inCorso: false,
          key: 'uno',
          lezioneRaggiunta: 2,
        },
        {
          data1: 'row1 val 2',
          data2: 444,
          stato: expect.anything(),
          completata: false,
          inCorso: true,
          key: 'due',
          lezioneRaggiunta: 1,
        },
        {
          data1: 'row1 val 3',
          data2: 555,
          stato: expect.anything(),
          completata: false,
          inCorso: false,
          key: 'tre',
          lezioneRaggiunta: 0,
        },
      ],
      filtriAttivi: mockProps.display,
      intestazioniColonna: mockProps.contenuto.intestazioniColonna,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizzazione con spinner attivo', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );

    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(Container).length).toBe(0);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('errori frequenti deve chiamare onUnitaErroriComuniStepInizialize', () => {
    const props = {
      ...mockProps,
      onUnitaErroriComuniStepInizialize: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );

    expect(props.onUnitaErroriComuniStepInizialize).not.toHaveBeenCalled();
    renderedComponent.find(Button).at(0).simulate('click');
    expect(renderedComponent.find(Button).at(0).props().children).toBe('Errori frequenti');
    expect(props.onUnitaErroriComuniStepInizialize).toHaveBeenCalledWith({
      corsoId: 123,
      unitaId: 555,
      prerequisitoId: 1110,
      historyPush: props.history.push,
    });
  });

  it('errori frequenti info deve chiamare onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(GhostButton).at(0).simulate('click');
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: expect.any(String),
      show: true,
      image: {
        src: 'IMAGE_MOCK',
        width: '180px',
        height: '130px',
        alt: 'Associa',
      },
      closeButton: {
        text: 'Ok',
      },
    });
  });

  it('visualizzazione con hasFeedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );

    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(0);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizzazione con sortedData.length === 0', () => {
    const props = {
      ...mockProps,
      contenuto: {
        ...mockProps.contenuto,
        sortedData: [],
      },
    };
    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );

    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(0);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Topbar > backNav', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };

    expect(props.history.push).not.toHaveBeenCalled();
    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );
    renderedComponent.find(TopBar).props().backNav.onClickFunction();
    expect(props.history.push).not.toHaveBeenCalledWith();
  });

  it('numeroLezioni === 1', () => {
    const props = {
      ...mockProps,
      contenuto: {
        ...mockProps.contenuto,
        numeroLezioni: 1,
      },
    };

    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('info Button click', () => {
    const props = {
      ...mockProps,
      contenuto: {
        ...mockProps.contenuto,
        onModalSetData: jest.fn(),
      },
    };

    expect(props.contenuto.onModalSetData).not.toHaveBeenCalled();
    const renderedComponent = shallow(
      <UnitaAndamentoView {...props} />
    );
    renderedComponent.find(Button).at(0).simulate('click');
    expect(props.contenuto.onModalSetData).not.toHaveBeenCalledWith({
      contenuto: expect.any(String),
      show: true,
      image: {
        src: correzione,
        width: '180px',
        height: '130px',
        alt: 'Associa',
      },
      closeButton: {
        text: 'Ok',
      },
    });
  });

  it('onUnitaAndamentoFetch chiama al mount onUnitaAndamentoFetch', () => {
    const props = {
      ...mockProps,
      onUnitaAndamentoFetch: jest.fn(),
    };
    const spy = jest.spyOn(UnitaAndamentoView.prototype, 'componentDidMount');
    shallow(<UnitaAndamentoView {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.onUnitaAndamentoFetch).toHaveBeenCalledWith(
      555,
      123, {
        display: props.display,
        iscritti: props.corsoSelezionato.iscritti,
        theme: mockProps.configuration.theme,
      }
    );
  });

  it('onUnitaAndamentoFetch non chiama al mount onUnitaAndamentoFetch se !isCorsoLoaded || !isIscrittiLoaded', () => {
    const props = {
      ...mockProps,
      corsoSelezionato: {
        ...mockProps.corsoSelezionato,
        isIscrittiLoaded: false,
        isCorsoLoaded: false,
      },
      onUnitaAndamentoFetch: jest.fn(),
    };
    const spy = jest.spyOn(UnitaAndamentoView.prototype, 'componentDidMount');
    shallow(<UnitaAndamentoView {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.onUnitaAndamentoFetch).not.toHaveBeenCalled();
  });

  it('onUnitaAndamentoFetch non deve essere chiamato da componentDidUpdate senza modifiche al corso', () => {
    const props = {
      ...mockProps,
      onUnitaAndamentoFetch: jest.fn(),
    };

    const renderedComponent = shallow(<UnitaAndamentoView {...props} />);
    expect(props.onUnitaAndamentoFetch).toHaveBeenCalledTimes(1);

    const instance = renderedComponent.instance();
    instance.componentDidUpdate({
      corsoSelezionato: {
        isIscrittiLoaded: true,
      },
    });
    expect(props.onUnitaAndamentoFetch).toHaveBeenCalledTimes(1);
  });

  it('onUnitaAndamentoFetch chiama al change di componentDidUpdate con oldProps modificate', () => {
    const props = {
      ...mockProps,
      onUnitaAndamentoFetch: jest.fn(),
    };
    const renderedComponent = shallow(<UnitaAndamentoView {...props} />);
    expect(props.onUnitaAndamentoFetch).toHaveBeenCalledTimes(1);
    const instance = renderedComponent.instance();
    instance.componentDidUpdate({
      corsoSelezionato: {
        isIscrittiLoaded: false,
      },
    });
    expect(props.onUnitaAndamentoFetch).toHaveBeenCalledTimes(2);
    expect(props.onUnitaAndamentoFetch).toHaveBeenLastCalledWith(
      555,
      123, {
        display: props.display,
        iscritti: props.corsoSelezionato.iscritti,
        theme: mockProps.configuration.theme,
      }
    );
  });
});

describe('<UnitaAndamento />', () => {
  const store = configureStore({}, {});
  const withReducerCorsi = injectReducer({
    key: 'corsi',
    reducer: corsiReducer,
  });
  const withReducerConfiguration = injectReducer({
    key: 'configuration',
    reducer: reducerCurryer(mockProps.configuration),
  });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerCorsi,
    connect()
  )(UnitaAndamento);

  it('should check Dashboard initial props are properly set', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '111' } }}
        history={mockProps.history}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive().dive().dive();

    const receivedProps = renderedComponent.instance().props;
    expect(receivedProps.corsoSelezionato).toEqual({
      isCorsoLoaded: false,
      isIscrittiLoaded: false,
      iscritti: [],
      nome: '',
      pk: 0,
    });
    expect(receivedProps.contenuto).toEqual(defaultUnitaAndamentoContenuto.toJS());
    expect(receivedProps.feedback).toEqual(defaultUnitaAndamentoFeedback.toJS());
    expect(receivedProps.display).toEqual(defaultUnitaAndamentoAndamentoSort.toJS());
  });

  it('mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '111' } }}
        history={mockProps.history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(unitaAndamentoFetch(1, 2));
    receivedProps.onUnitaAndamentoFetch(1, 2);
    expect(mockStore.dispatch).toHaveBeenCalledWith(unitaAndamentoFetch(1, 2));

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(unitaAndamentoSort(3, 4));
    receivedProps.onUnitaAndamentoSort(3, 4);
    expect(mockStore.dispatch).toHaveBeenCalledWith(unitaAndamentoSort(3, 4));

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );
    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    receivedProps.onUnitaErroriComuniStepInizialize({ data: 555 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      unitaErroriComuniStepInitialize({ data: 555 })
    );
  });
});

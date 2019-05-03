
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import AlertBanner from 'components/AlertBanner';
import ReportGrid, { FlexCell } from 'components/ReportGrid';
import userReducer from 'containers/User/reducer';
import BreadCrumb, { Crumb } from 'components/BreadCrumb';
import { TextButton } from 'components/Button';

import {
  grigliaValutazioneDettaglioFetch,
  grigliaValutazioneDettaglioSort,
  grigliaValutazioneDettaglioStudenteFetch,
} from '../actions';
import GrigliaValutazioniDettaglio, {
  GrigliaValutazioniDettaglioView,
} from '../DettaglioValutazione';
import {
  defaultGrigliaValutazioniSpinner,
  defaultGrigliaValutazioniFeedback,
  defaultGrigliaValutazioniDisplay,
  defaultGrigliaValutazioniDettaglio,
} from '../reducer';

const store = configureStore({}, {});
const history = { push: () => { } };

const mockProps = {
  match: {
    params: {
      valutazioneId: '4444',
    },
  },
  configuration: {
    homePage: '/home',
    theme: {
      brand: '#666',
      subtle: 'rgb(100, 20, 100)',
    },
  },
  spinner: {
    default: false,
  },
  feedback: {
    hasFeedback: false,
    tipologia: 'errore',
    messaggio: 'messaggio',
  },
  display: {
    field: 'titolo',
    sort: 'asc',
    type: 'string',
  },
  history,
  dettaglio: {
    corsoId: 2222,
    dataCreazione: '1/11/2014',
    sortedData: [{
      nome: 'nome studente 1',
      voto: 10,
      id: 1,
      studente: 10,
      studenteOpenDetailIcon: '',
    }, {
      nome: 'nome studente 2',
      voto: 4.5,
      id: 2,
      studente: 20,
      studenteOpenDetailIcon: '',
    }, {
      nome: 'nome studente 3',
      voto: 5,
      id: 3,
      studente: 30,
      studenteOpenDetailIcon: '',
    }, {
      nome: 'nome studente 4',
      voto: 7,
      id: 4,
      studente: 40,
      studenteOpenDetailIcon: '',
    }],
    valutazioneId: 0,
    titolo: 'titolo valutazione',
    data: '11/02/2018',
    tipologia: 'mista',
    corsoNome: 'nome corso',
    intestazioniColonna: [{
      label: 'Studente',
      field: 'nome',
      type: 'string',
      fieldsDisplay: [{
        field: 'nome',
      }, {
        field: 'studenteOpenDetailIcon',
        function: 'studenteDetailFunction',
      }],
    }, {
      label: 'Voto',
      field: 'voto',
      type: 'number',
      fieldsDisplay: [{ field: 'voto' }],
    }],
  },
  location: {
    state: {
      id: 111,
      titolo: 'titolo valutazione',
      tipologia: 'mista',
      dataCreazione: '10/01/2017',
      corsoId: 2222,
      corsoNome: 'nome corso',
    },
  },
  onGrigliaValutazioniDettaglioFetch: () => { },
  onGrigliaValutazioniDettaglioSort: () => { },
  onGrigliaValutazioneDettaglioStudenteFetch: () => { },
};

describe('<GrigliaValutazioniDettaglioView />', () => {
  it('visualizza il contenuto nel suo stato iniziale', () => {
    const renderedComponent = shallow(<GrigliaValutazioniDettaglioView {...mockProps} />);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('topBar deve rimandare alla pagina classe dettaglio', () => {
    const props = {
      ...mockProps,
      history: { push: jest.fn() },
    };
    const renderedComponent = shallow(<GrigliaValutazioniDettaglioView {...props} />);
    expect(renderedComponent.find(TopBar).props().backNav).toEqual({
      enabled: true,
      onClickFunction: expect.any(Function),
    });

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).dive().find('TopBar__IconBtn').simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/classe-dettaglio/2222/grigliavalutazione');
  });

  it('visualizza il contenuto quando spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: { default: true },
    };
    const renderedComponent = shallow(
      <GrigliaValutazioniDettaglioView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(0);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il contenuto quando sortedData.length === 0', () => {
    const props = {
      ...mockProps,
      dettaglio: {
        ...mockProps.dettaglio,
        sortedData: [],
      },
    };
    const renderedComponent = shallow(
      <GrigliaValutazioniDettaglioView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(0);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il contenuto quando feedback = true', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <GrigliaValutazioniDettaglioView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(0);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il contenuto quando ordinamento è per dataSortable', () => {
    const props = {
      ...mockProps,
      display: {
        ...mockProps.display,
        field: 'dataSortable',
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniDettaglioView {...props} />);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('onGrigliaValutazioniDettaglioFetch deve essere triggerato al componentDidMount se settato id e corsoId', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioniDettaglioFetch: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };
    shallow(<GrigliaValutazioniDettaglioView {...props} />);
    expect(props.history.push).not.toHaveBeenCalled();
    expect(props.onGrigliaValutazioniDettaglioFetch).toHaveBeenCalledWith({
      valutazioneId: 4444,
      data: {
        titolo: 'titolo valutazione',
        tipologia: 'mista',
        dataCreazione: '10/01/2017',
        corsoId: 2222,
        corsoNome: 'nome corso',
      },
      theme: {
        brand: '#666',
        subtle: 'rgb(100, 20, 100)',
      },
    });
  });

  it('history.push essere triggerato al componentDidMount se !id || !corsoId', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioniDettaglioFetch: jest.fn(),
      history: {
        push: jest.fn(),
      },
      location: { state: {} },
    };
    shallow(<GrigliaValutazioniDettaglioView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/home');
    expect(props.onGrigliaValutazioniDettaglioFetch).not.toHaveBeenCalledWith();
  });

  it('history.push essere triggerato al componentDidMount se !location', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioniDettaglioFetch: jest.fn(),
      location: undefined,
      history: {
        push: jest.fn(),
      },
    };
    shallow(<GrigliaValutazioniDettaglioView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/home');
    expect(props.onGrigliaValutazioniDettaglioFetch).not.toHaveBeenCalledWith();
  });

  it('studenteDetailFunction deve chiamare onGrigliaValutazioneDettaglioStudenteFetch', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneDettaglioStudenteFetch: jest.fn(),
    };

    const renderedComponent = shallow(<GrigliaValutazioniDettaglioView {...props} />);
    expect(props.onGrigliaValutazioneDettaglioStudenteFetch).not.toHaveBeenCalled();

    renderedComponent
      .find(ReportGrid).dive()
      .find('Grid__GridItem').at(2)
      .find(FlexCell).at(1).simulate('click');
    expect(props.onGrigliaValutazioneDettaglioStudenteFetch).toHaveBeenCalledWith({
      corsoId: 2222,
      dataCreazioneValutazione: '1/11/2014',
      nomeStudente: 'nome studente 1',
      studenteAcademyId: 10,
      voto: 10,
      valutazioneId: 4444,
      valutazioneTipologia: 'mista',
      valutazioneTitolo: 'titolo valutazione',
      corsoNome: 'nome corso',
      historyPush: props.history.push,
    });
  });

  it('studenteDetailFunction non deve chiamare onGrigliaValutazioneDettaglioStudenteFetch se spinner.dettaglioStudente', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneDettaglioStudenteFetch: jest.fn(),
      spinner: {
        ...mockProps.spinner,
        dettaglioStudente: true,
        dettaglioStudente_1: true,
      },
    };

    const renderedComponent = shallow(<GrigliaValutazioniDettaglioView {...props} />);
    expect(props.onGrigliaValutazioneDettaglioStudenteFetch).not.toHaveBeenCalled();

    renderedComponent
      .find(ReportGrid).dive()
      .find('Grid__GridItem').at(2)
      .find(FlexCell).at(1).simulate('click');
    expect(props.onGrigliaValutazioneDettaglioStudenteFetch).not.toHaveBeenCalled();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('click degli elementi delle breadcrumb', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };

    const renderedComponent = shallow(<GrigliaValutazioniDettaglioView {...props} />);

    expect(props.history.push).not.toHaveBeenCalled();
    expect(renderedComponent.find(BreadCrumb).length).toBe(1);
    expect(renderedComponent.find(Crumb).length).toBe(2);

    renderedComponent.find(BreadCrumb).find(Crumb).at(0).find(TextButton).simulate('click');
    expect(props.history.push).lastCalledWith('/classe-dettaglio/2222/grigliavalutazione');
  });
});

describe('<GrigliaValutazioniNew />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockProps.configuration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    connect()
  )(GrigliaValutazioniDettaglio);

  it('controllo che le props iniziali del componente siano settate correttamente', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { valutazioneId: '4444' } }}
        history={history}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(receivedProps.spinner).toEqual(defaultGrigliaValutazioniSpinner.toJS());
    expect(receivedProps.feedback).toEqual(defaultGrigliaValutazioniFeedback.toJS());
    expect(receivedProps.display).toEqual(defaultGrigliaValutazioniDisplay.toJS());
    expect(receivedProps.dettaglio).toEqual(defaultGrigliaValutazioniDettaglio.toJS());
  });

  it('controllo le funzioni di mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { valutazioneId: '4444' } }}
        history={history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    receivedProps.onGrigliaValutazioniDettaglioFetch({ payload: '123' });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneDettaglioFetch({ payload: '123' })
    );

    receivedProps.onGrigliaValutazioniDettaglioSort({ data: 456 }, { data: 567 });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneDettaglioSort({ data: 456 }, { data: 567 })
    );

    receivedProps.onGrigliaValutazioneDettaglioStudenteFetch({ data: 678 });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneDettaglioStudenteFetch({ data: 678 })
    );
  });
});

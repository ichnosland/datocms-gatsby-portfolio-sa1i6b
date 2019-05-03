
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
import { Button } from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';

import AlertBanner from 'components/AlertBanner';
import ReportGrid from 'components/ReportGrid';
import userReducer from 'containers/User/reducer';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';

import {
  grigliaValutazioneValutabiliFetch,
  grigliaValutazioneCrea,
  grigliaValutazioneSelectionSet,
  grigliaValutazioneValutabiliSort,
  grigliaValutazioneValutabiliBloccoSet,
} from '../actions';
import GrigliaValutazioniNew, {
  GrigliaValutazioniNewView,
} from '../NuovaValutazione';
import {
  defaultGrigliaValutazioniSpinner,
  defaultGrigliaValutazioniFeedback,
  defaultGrigliaValutazioniValutabili,
  defaultGrigliaValutazioniSelection,
  defaultGrigliaValutazioniDisplay,
  defaultGrigliaValutazioniContenuto,
} from '../reducer';


const configuration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/home',
  theme: {
    light: 'rgb(200, 10, 10)',
  },
  modules: {
    verificheLivello: { enabled: true },
    verificheMissione: { enabled: true },
    versioniLivello: { enabled: true },
    versioniMissione: { enabled: true },
    provaCompetenza: { enabled: true },
    registroClasse: { obiettivi: true },
  },
};
const store = configureStore({}, {});
const history = { push: () => { } };

const mockProps = {
  match: {
    params: {
      corsoId: '4444',
    },
  },
  configuration,
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
    block: 'blocco',
  },
  contenuto: {
    nomeCorso: 'nome Corso',
    intestazioniColonna: [{
      blocchi: ['blocco'],
      label: 'Titolo',
      field: 'titolo',
      type: 'string',
      fieldsDisplay: [{ field: 'titolo' }],
    }, {
      blocchi: ['blocco'],
      label: 'Data',
      field: 'dataSortable',
      type: 'string',
      fieldsDisplay: [{ field: 'dataCreazione' }],
    }, {
      blocchi: ['blocco'],
      label: 'Seleziona',
      field: 'checkboxSortable',
      type: 'string',
      fieldsDisplay: [{ field: 'checkbox' }],
    }],
    sortedData: [{
      id: 1,
      titolo: 'titolo 1',
      dataSortable: '2019-10-01',
      dataCreazione: '01/10/2019',
      checkbox: ' ',
      checkboxSortable: 0,
    }, {
      id: 2,
      titolo: 'titolo 2',
      dataSortable: '2014-10-01',
      dataCreazione: '01/10/2014',
      checkbox: ' ',
      checkboxSortable: 1,
    }],
  },
  history,
  selection: {
    titolo: 'titolo selezionato',
    obiettivi: [1, 2],
    versioniLivello: [3, 4],
    versioniMissione: [5, 6],
    verificheLivello: [7, 8],
    verificheMissione: [9, 10],
    proveCompetenza: [11, 12],
  },
  valutabili: {
    titolo: 'titolo valutabili',
    obiettivi: [],
    versioniLivello: [],
    versioniMissione: [],
    verificheLivello: [],
    verificheMissione: [],
    proveCompetenza: [],
  },
  onGrigliaValutazioneValutabiliFetch: () => { },
  onGrigliaValutazioneCrea: () => { },
  onGrigliaValutazioneValutabiliBloccoSet: () => { },
  onGrigliaValutazioneSelectionSet: () => { },
  onGrigliaValutazioneValutabiliSort: () => { },
};

describe('<GrigliaValutazioniNewView />', () => {
  it('visualizza il contenuto nel suo stato iniziale', () => {
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...mockProps} />);
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
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    expect(renderedComponent.find(TopBar).props().backNav).toEqual({
      enabled: true,
      onClickFunction: expect.any(Function),
    });

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).dive().find('TopBar__IconBtn').simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/classe-dettaglio/4444');
  });

  it('visualizza il contenuto quando spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: { default: true },
    };
    const renderedComponent = shallow(
      <GrigliaValutazioniNewView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
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
      <GrigliaValutazioniNewView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
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
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('onGrigliaValutazioneValutabiliFetch deve essere triggerato al componentDidMount', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneValutabiliFetch: jest.fn(),
    };
    shallow(<GrigliaValutazioniNewView {...props} />);
    expect(props.onGrigliaValutazioneValutabiliFetch).toHaveBeenCalledWith(
      4444,
      'product', {
        blocchiAttivi: [
          'obiettivi',
          'versioniLivello',
          'versioniMissione',
          'verificheLivello',
          'verificheMissione',
          'proveCompetenza',
        ],
      }
    );
  });

  it('changeDisplay deve chiamare onGrigliaValutazioneValutabiliBloccoSet', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneValutabiliBloccoSet: jest.fn(),
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onGrigliaValutazioneValutabiliBloccoSet).not.toHaveBeenCalled();
    instance.changeDisplay('blocco');
    expect(props.onGrigliaValutazioneValutabiliBloccoSet).toHaveBeenCalledWith(
      'blocco', props.valutabili
    );
  });

  it('calcolaBlockAttivi con tutti i moduli attivi', () => {
    const props = {
      ...mockProps,
      configuration: {
        ...mockProps.configuration,
        modules: {
          verificheLivello: { enabled: true },
          verificheMissione: { enabled: true },
          versioniLivello: { enabled: true },
          versioniMissione: { enabled: true },
          provaCompetenza: { enabled: true },
          registroClasse: { obiettivi: true },
        },
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([{
      id: 1,
      label: (
        <div>
          <span>Obiettivi</span>
          <CountBadge>
            <CountBadgeItem bgcolor={configuration.theme.light}>{2}</CountBadgeItem>
          </CountBadge>
        </div>
      ),
      name: 'obiettivi',
    }, {
      id: 2,
      label: (
        <div>
          <span>Versioni</span>
          <CountBadge>
            <CountBadgeItem bgcolor={configuration.theme.light}>{2}</CountBadgeItem>
          </CountBadge>
        </div>
      ),
      name: 'versioniLivello',
    }, {
      id: 3,
      label: (
        <div>
          <span>Versioni</span>
          <CountBadge>
            <CountBadgeItem bgcolor={configuration.theme.light}>{2}</CountBadgeItem>
          </CountBadge>
        </div>
      ),
      name: 'versioniMissione',
    }, {
      id: 4,
      label: (
        <div>
          <span>Verifiche</span>
          <CountBadge>
            <CountBadgeItem bgcolor={configuration.theme.light}>{2}</CountBadgeItem>
          </CountBadge>
        </div>
      ),
      name: 'verificheLivello',
    }, {
      id: 5,
      label: (
        <div>
          <span>Verifiche</span>
          <CountBadge>
            <CountBadgeItem bgcolor={configuration.theme.light}>{2}</CountBadgeItem>
          </CountBadge>
        </div>
      ),
      name: 'verificheMissione',
    }, {
      id: 6,
      label: (
        <div>
          <span>Prove competenza</span>
          <CountBadge>
            <CountBadgeItem bgcolor={configuration.theme.light}>{2}</CountBadgeItem>
          </CountBadge>
        </div>
      ),
      name: 'proveCompetenza',
    }]);
  });

  it('calcolaBlockAttivi con dati vuoti', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioniDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: {
          registroClasse: {},
        },
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([]);
  });

  it('calcolaBlockAttivi con modules undefined', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioniDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: undefined,
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([]);
  });

  it('calcolaBlockAttivi con modules vuoti', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioniDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: {},
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([]);
  });

  it('sortData deve chiamare onGrigliaValutazioneValutabiliSort', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneValutabiliSort: jest.fn(),
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onGrigliaValutazioneValutabiliSort).not.toHaveBeenCalled();
    instance.sortData([1, 2, 3], { key: 1, key2: 2 });
    expect(props.onGrigliaValutazioneValutabiliSort).toHaveBeenCalledWith(
      [1, 2, 3],
      { key: 1, key2: 2 }
    );
  });

  it('selectData deve chiamare onGrigliaValutazioneSelectionSet se pk > 0 e pk non già selezionata', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneSelectionSet: jest.fn(),
      display: {
        ...mockProps.display,
        block: 'obiettivi',
      },
      selection: {
        ...mockProps.selection,
        obiettivi: [],
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onGrigliaValutazioneSelectionSet).not.toHaveBeenCalled();
    instance.selectData(1);
    expect(props.onGrigliaValutazioneSelectionSet).toHaveBeenCalledWith({
      obiettivi: [1],
    });
  });

  it('selectData deve chiamare onGrigliaValutazioneSelectionSet se pk > 0 e pk già selezionata', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneSelectionSet: jest.fn(),
      display: {
        ...mockProps.display,
        block: 'obiettivi',
      },
      selection: {
        ...mockProps.selection,
        obiettivi: [1],
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onGrigliaValutazioneSelectionSet).not.toHaveBeenCalled();
    instance.selectData(1);
    expect(props.onGrigliaValutazioneSelectionSet).toHaveBeenCalledWith({
      obiettivi: [],
    });
  });

  it('selectData deve chiamare onGrigliaValutazioneSelectionSet se !!titolo', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneSelectionSet: jest.fn(),
      display: {
        ...mockProps.display,
        block: 'obiettivi',
      },
      selection: {
        ...mockProps.selection,
        obiettivi: [1],
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onGrigliaValutazioneSelectionSet).not.toHaveBeenCalled();
    instance.selectData(undefined, 'titolo');
    expect(props.onGrigliaValutazioneSelectionSet).toHaveBeenCalledWith({
      titolo: 'titolo',
    });
  });

  it('selectData deve chiamare onGrigliaValutazioneSelectionSet se titolo è una stringa vuota', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneSelectionSet: jest.fn(),
      display: {
        ...mockProps.display,
        block: 'obiettivi',
      },
      selection: {
        ...mockProps.selection,
        obiettivi: [1],
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onGrigliaValutazioneSelectionSet).not.toHaveBeenCalled();
    instance.selectData(undefined, '');
    expect(props.onGrigliaValutazioneSelectionSet).toHaveBeenCalledWith({
      titolo: '',
    });
  });

  it('selectData non deve chiamare onGrigliaValutazioneSelectionSet se !!titolo e !pk', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneSelectionSet: jest.fn(),
      display: {
        ...mockProps.display,
        block: 'obiettivi',
      },
      selection: {
        ...mockProps.selection,
        obiettivi: [1],
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onGrigliaValutazioneSelectionSet).not.toHaveBeenCalled();
    instance.selectData(undefined, undefined);
    expect(props.onGrigliaValutazioneSelectionSet).not.toHaveBeenCalled();
  });

  it('il pulsante crea deve chiamare onGrigliaValutazioneCrea', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneCrea: jest.fn(),
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    expect(props.onGrigliaValutazioneCrea).not.toHaveBeenCalled();
    renderedComponent.find(Button).at(0).simulate('click');
    expect(props.onGrigliaValutazioneCrea).toHaveBeenCalledWith({
      selection: props.selection,
      historyPush: props.history.push,
      blocchiAttivi: [
        'obiettivi',
        'versioniLivello',
        'versioniMissione',
        'verificheLivello',
        'verificheMissione',
        'proveCompetenza',
      ],
      corsoId: 4444,
    });
  });

  it('switch da versioniLivello ad obiettivi', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneCrea: jest.fn(),
      display: {
        ...mockProps.display,
        block: 'versioniLivello',
      },
      selection: {
        ...mockProps.selection,
        obiettivi: [1],
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'changeDisplay');

    renderedComponent.find(ButtonGroup).dive().find('ButtonGroup__InnerButton').at(0).simulate('click');
    expect(spy).toHaveBeenCalledWith('obiettivi');
  });

  it('switch da tab obiettivi ad obiettivi non funziona', () => {
    const props = {
      ...mockProps,
      onGrigliaValutazioneCrea: jest.fn(),
      display: {
        ...mockProps.display,
        block: 'obiettivi',
      },
      selection: {
        ...mockProps.selection,
        obiettivi: [1],
      },
    };
    const renderedComponent = shallow(<GrigliaValutazioniNewView {...props} />);
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'changeDisplay');

    renderedComponent.find(ButtonGroup).dive().find('ButtonGroup__InnerButton').at(0).simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('<GrigliaValutazioniNew />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    connect()
  )(GrigliaValutazioniNew);

  it('controllo che le props iniziali del componente siano settate correttamente', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { corsoId: '4444' } }}
        history={history}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(receivedProps.spinner).toEqual(defaultGrigliaValutazioniSpinner.toJS());
    expect(receivedProps.feedback).toEqual(defaultGrigliaValutazioniFeedback.toJS());
    expect(receivedProps.display).toEqual(defaultGrigliaValutazioniDisplay.toJS());
    expect(receivedProps.contenuto).toEqual(defaultGrigliaValutazioniContenuto.toJS());
    expect(receivedProps.valutabili).toEqual(defaultGrigliaValutazioniValutabili.toJS());
    expect(receivedProps.selection).toEqual(defaultGrigliaValutazioniSelection.toJS());
    expect(receivedProps.configuration).toEqual(configuration);
  });

  it('controllo le funzioni di mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { corsoId: '4444' } }}
        history={history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    receivedProps.onGrigliaValutazioneValutabiliFetch(1, 'progetto', { payload: '123' });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneValutabiliFetch(1, 'progetto', { payload: '123' })
    );

    receivedProps.onGrigliaValutazioneCrea({ data: 456 });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneCrea({ data: 456 })
    );

    receivedProps.onGrigliaValutazioneValutabiliBloccoSet('blocco', { data: 678 });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneValutabiliBloccoSet('blocco', { data: 678 })
    );

    receivedProps.onGrigliaValutazioneSelectionSet({ data: 765 });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneSelectionSet({ data: 765 })
    );

    receivedProps.onGrigliaValutazioneValutabiliSort({ data: 987 }, { data: 987 });
    expect(mockStore.dispatch).toHaveBeenLastCalledWith(
      grigliaValutazioneValutabiliSort({ data: 987 }, { data: 987 })
    );
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import creaVerificheReducer from 'containers/CreaVerifiche/reducer';
import { configurationChange } from 'common/applications/actions';
import Dashboard from 'components/Dashboard';
import TopBar from 'components/TopBar';
import EggMenu from 'components/EggMenu';
import Spinner from 'components/Spinner';
import * as commonUtils from 'common/utils';

import {
  livelliFetch,
  livelliSet,
  unitaFiltra,
} from '../actions';
import DashboardContainerMyTest, { DashboardViewMyTest } from '../DashboardMyTest';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  title: 'configuration title',
};
const store = configureStore({}, {});
const history = {};
const mockProps = {
  onSetFilterUnita: () => { },
  loadLivelli: () => { },
  spinner: true,
  livelli: [],
  classi: [],
  configuration: mockConfiguration,
  filterUnita: '',
  menuEggStatus: '',
  searchActive: false,
  onMenuEggSet: () => { },
};

describe('<DashboardViewMyTest />', () => {
  it('should render one Dashboard with a spinner component', () => {
    const renderedComponent = shallow(
      <DashboardViewMyTest
        store={store}
        history={history}
        {...mockProps}
      />
    );
    expect(renderedComponent.find(Dashboard).length).toBe(0);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one Dashboard component with no spinner in it', () => {
    const props = {
      ...mockProps,
      spinner: false,
    };
    const renderedComponent = shallow(
      <DashboardViewMyTest {...props} />
    );
    expect(renderedComponent.find(Dashboard).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(EggMenu).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().topSwitcher).toEqual({ items: [] });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one dashboard component with switcher with default pos (undefined)', () => {
    const props = {
      ...mockProps,
      spinner: false,
      configuration: {
        ...mockConfiguration,
        switchMateria: {
          materia1: {
            disciplinaId: 53,
            product: 'product1',
            title: 'materia1',
          },
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardViewMyTest {...props} />
    );
    expect(renderedComponent.find(Dashboard).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().topSwitcher).toEqual({
      items: [{
        key: 'materia1',
        name: 'materia1',
        pos: 0,
      }],
      itemSelected: undefined,
      onChangeFunction: expect.any(Function),
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render one dashboard component with switcher with pos', () => {
    const props = {
      ...mockProps,
      spinner: false,
      configuration: {
        ...mockConfiguration,
        switchMateria: {
          materia2: {
            disciplinaId: 123,
            product: 'product2',
            title: 'materia2',
            pos: 2,
          },
          materia1: {
            disciplinaId: 55,
            product: 'product1',
            title: 'materia1',
            pos: 1,
          },
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardViewMyTest {...props} />
    );
    expect(renderedComponent.find(Dashboard).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().topSwitcher).toEqual({
      items: [{
        key: 'materia1',
        name: 'materia1',
        pos: 1,
      }, {
        key: 'materia2',
        name: 'materia2',
        pos: 2,
      }],
      itemSelected: 'materia2',
      onChangeFunction: expect.any(Function),
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should test if Topbar -> searchResetFunction is triggering emptySearch with true param', () => {
    const props = {
      ...mockProps,
      configuration: {
        ...mockConfiguration,
        switchMateria: {
          materia1: {
            disciplinaId: 53,
            product: 'product1',
            title: 'materia1',
          },
          materia2: {
            disciplinaId: 54,
            product: 'product2',
            title: 'materia2',
          },
        },
      },
    };

    const renderedComponent = shallow(
      <DashboardViewMyTest {...props} />
    );

    const instance = renderedComponent.instance();
    instance.emptySearch = jest.fn();

    const topBarProps = renderedComponent.find(TopBar).props();
    topBarProps.searchResetFunction();
    expect(instance.emptySearch).toHaveBeenCalledWith(true);
  });

  it('should test if Topbar -> backArrow.onClickFunction is triggering emptySearch with false param', () => {
    const renderedComponent = shallow(
      <DashboardViewMyTest {...mockProps} />
    );

    const instance = renderedComponent.instance();
    instance.emptySearch = jest.fn();

    const topBarProps = renderedComponent.find(TopBar).props();
    topBarProps.backArrow.onClickFunction();
    expect(instance.emptySearch).toHaveBeenCalledWith(false);
  });

  it('should test if Topbar -> onChangeFunction is triggering onChangeTopSelect', () => {
    const props = {
      ...mockProps,
      onChangeTopSelect: jest.fn(),
      configuration: {
        ...mockConfiguration,
        product: 'mytestmatematica',
        switchMateria: {
          materia1: {
            disciplinaId: 53,
            product: 'product1',
            title: 'materia1',
          },
          materia2: {
            disciplinaId: 54,
            product: 'product2',
            title: 'materia2',
          },
        },
      },
    };
    const renderedComponent = shallow(
      <DashboardViewMyTest {...props} />
    );

    const topBarProps = renderedComponent.find(TopBar).props();
    topBarProps.topSwitcher.onChangeFunction({ target: { value: 'materia2' } });
    expect(props.onChangeTopSelect).toHaveBeenCalledWith({
      disciplinaId: 54,
      product: 'product2',
      title: 'materia2',
    }, props.configuration);
  });

  it('componentDidMount deve chiamare loadLivelli e googleAnalyticsWrapper se !!configuration.title', () => {
    jest.clearAllMocks();
    const spy = jest.spyOn(DashboardViewMyTest.prototype, 'componentDidMount');
    const props = {
      ...mockProps,
      loadLivelli: jest.fn(),
    };

    const spyGAWrapper = jest.spyOn(commonUtils, 'googleAnalyticsWrapper');

    expect(spy).not.toHaveBeenCalled();
    expect(spyGAWrapper).not.toHaveBeenCalled();
    expect(props.loadLivelli).not.toHaveBeenCalled();
    shallow(<DashboardViewMyTest {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyGAWrapper).toHaveBeenCalledWith('event', {
      category: 'Visualizzazione dashboard',
      action: 'Visualizzazione dashboard configuration title',
    });
    expect(props.loadLivelli).toHaveBeenCalledWith(props.configuration);
  });
});


describe('<Dashboard />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerCreaVerifiche = injectReducer({ key: 'CreaVerifiche', reducer: creaVerificheReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerCreaVerifiche,
    connect()
  )(DashboardContainerMyTest);

  it('should check Dashboard initial props are properly set', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(receivedProps.livelli).toEqual([]);
    expect(receivedProps.spinner).toEqual(true);
    expect(receivedProps.filterUnita).toEqual('');
  });

  it('should render a Dashboard with filtered livelli', () => {
    const livelliMock = [{
      id: 1,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 10,
        unita: [{
          id: 1001,
          locked: false,
          nome: 'Unita 1',
        }, {
          id: 1002,
          locked: false,
          nome: 'Unita 2 - filtrami',
        }],
      }],
    }, {
      id: 2,
      titolo: 'Livello 2',
      missioni: [{
        titolo: 'Missione 2',
        id: 20,
        unita: [{
          id: 1003,
          locked: false,
          nome: 'Unita 3',
        }, {
          id: 1004,
          locked: false,
          nome: 'Unita 4',
        }],
      }],
    }];

    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const instance = renderedComponent.instance();
    instance.context.store.dispatch(livelliSet(livelliMock));
    instance.context.store.dispatch(unitaFiltra('filtrami'));
    const receivedProps = instance.selector.props;

    expect(receivedProps.livelli).toEqual([{
      id: 1,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 10,
        unita: [{
          id: 1002,
          locked: false,
          nome: 'Unita 2 - filtrami',
        }],
      }],
    }]);
  });

  it('should test if unitaFiltra is sending actions to store.dispatch', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive();
    const instance = renderedComponent.instance();

    instance.selector.props.onSetFilterUnita('filterme');
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      unitaFiltra('filterme')
    );
  });

  it('should test if loadLivelli is sending actions to store.dispatch', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive();
    const instance = renderedComponent.instance();
    instance.selector.props.loadLivelli();
    expect(mockStore.dispatch).toHaveBeenCalledWith(livelliFetch());
  });

  it('should test if onChangeTopSelect is sending actions to mockStore.dispatch', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive();
    const instance = renderedComponent.instance();

    instance.selector.props.onChangeTopSelect({ data: 5678 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(configurationChange({ data: 5678 }));
  });

  it('should send to EggMenu mytest configuration.product param', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store } }
    ).dive().dive().dive().dive().dive().dive();
    renderedComponent.update();

    expect(renderedComponent.find(EggMenu).props().product).toBe('product');
  });
});

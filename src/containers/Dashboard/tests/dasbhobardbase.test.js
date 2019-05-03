import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { fromJS } from 'immutable';

import {
  DashboardBaseView,
  dashboardMapStateToProps,
  dashboardMapDispatchToProps,
} from '../DashboardBase';
import { unitaFiltra, livelliFetch, dashboardMenuEggSet, dashboardSearchActiveSet } from '../actions';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
};
const mockProps = {
  onSetFilterUnita: () => { },
  loadLivelli: () => { },
  configuration: mockConfiguration,
  filterUnita: '',
  userAppData: {
    docente: true,
  },
  corsi: {
    corsoSelezionato: {
      pk: -1,
    },
  },
  menuEggStatus: '',
  searchActive: false,
  onMenuEggSet: () => { },
  onDashboardSearchActiveSet: () => { },
};
const store = configureStore({}, {});
const history = {};

describe('<DashboardBaseView />', () => {
  it('should render a warning advice', () => {
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...mockProps}
      />
    );
    expect(renderedComponent.html()).toBe(
      '<p>Creare una funzione di render nella classe ereditante</p>'
    );
  });

  it('check that DashboardBaseView is properly calling loadLivelli on mount', () => {
    const props = {
      ...mockProps,
      loadLivelli: jest.fn(),
    };
    const spy = jest.spyOn(DashboardBaseView.prototype, 'componentDidMount');
    shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...props}
      />, { context: { store } }
    );

    expect(spy).toHaveBeenCalled();
    expect(props.loadLivelli).toHaveBeenCalled();
  });

  it('should test if handleFiltraUnita is calling props.onSetFilterUnita', () => {
    const props = {
      ...mockProps,
      onSetFilterUnita: jest.fn(),
    };
    const filterData = 'filtrami';
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...props}
      />
    );
    const instance = renderedComponent.instance();
    instance.handleFiltraUnita(filterData);
    expect(props.onSetFilterUnita).toHaveBeenCalledWith(filterData);
  });

  it('should test if toggleMenuEgg is calling onMenuEggSet with default value', () => {
    const mockMenuEggSet = jest.fn();
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...mockProps}
        onMenuEggSet={mockMenuEggSet}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockMenuEggSet).not.toHaveBeenCalled();
    instance.toggleMenuEgg();
    expect(mockMenuEggSet).toHaveBeenCalledWith('');
  });

  it('should test if toggleMenuEgg is calling onMenuEggSet with given value', () => {
    const mockMenuEggSet = jest.fn();
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...mockProps}
        onMenuEggSet={mockMenuEggSet}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockMenuEggSet).not.toHaveBeenCalled();
    instance.toggleMenuEgg('value');
    expect(mockMenuEggSet).toHaveBeenCalledWith('value');
  });

  it('should test if topBarConfiguration -> searchResetFunction is triggering emptySearch with true param', () => {
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.emptySearch = jest.fn();

    instance.topBarConfiguration.searchResetFunction();
    expect(instance.emptySearch).toHaveBeenCalledWith(true);
  });

  it('should test if topBarConfiguration -> backArrow.onClickFunction is triggering emptySearch with false param', () => {
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.emptySearch = jest.fn();

    instance.topBarConfiguration.backArrow.onClickFunction();
    expect(instance.emptySearch).toHaveBeenCalledWith(false);
  });

  it('should test if activateSearch toggle searchActive', () => {
    const spy = jest.fn();
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...mockProps}
        filterUnita=""
        onDashboardSearchActiveSet={spy}
      />
    );
    const instance = renderedComponent.instance();
    expect(spy).not.toHaveBeenCalled();
    instance.activateSearch();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should test if emptySearch when populated', () => {
    const props = {
      ...mockProps,
      onSetFilterUnita: jest.fn(),
      filterUnita: 'resettami',
      onDashboardSearchActiveSet: jest.fn(),
    };
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...props}
      />
    );
    const instance = renderedComponent.instance();
    instance.emptySearch(true);
    expect(props.onSetFilterUnita).toHaveBeenCalledWith('');
    expect(props.onDashboardSearchActiveSet).toHaveBeenCalledWith(true);
  });

  it('componentDidUpdate should call onMenuEggSet if eggmenu is being closed', () => {
    const props = {
      ...mockProps,
      onMenuEggSet: jest.fn(),
      menuEggStatus: 'chiudi',
    };
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onMenuEggSet).not.toHaveBeenCalled();
    instance.componentDidUpdate({ menuEggStatus: 'apri' });
    expect(props.onMenuEggSet).toHaveBeenCalledWith('');
  });

  it('componentDidUpdate should not call onMenuEggSet otherwise', () => {
    const props = {
      ...mockProps,
      onMenuEggSet: jest.fn(),
      menuEggStatus: 'apri',
    };
    const renderedComponent = shallow(
      <DashboardBaseView
        store={store}
        history={history}
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onMenuEggSet).not.toHaveBeenCalled();
    instance.componentDidUpdate({ menuEggStatus: 'apri' });
    expect(props.onMenuEggSet).not.toHaveBeenCalled();
  });


  it('should test if changeMateria is calling onChangeTopSelect', () => {
    const props = {
      ...mockProps,
      onChangeTopSelect: jest.fn(),
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
    const mockTarget = { target: { value: 'materia1' } };
    const renderedComponent = shallow(
      <DashboardBaseView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.changeMateria(mockTarget);
    expect(props.onChangeTopSelect).toHaveBeenCalledWith({
      disciplinaId: 53,
      product: 'product1',
      title: 'materia1',
    }, props.configuration);
  });

  it('should test if changeMateria target not found in configuration.switchMateria[NAME]', () => {
    const props = {
      ...mockProps,
      onChangeTopSelect: jest.fn(),
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
    const mockTarget = { target: { value: 'not_exists' } };
    const renderedComponent = shallow(
      <DashboardBaseView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.changeMateria(mockTarget);
    expect(props.onChangeTopSelect).toHaveBeenCalledWith({}, props.configuration);
  });
});

describe('<DashboardBase exports />', () => {
  it('should test default exports', () => {
    expect(typeof dashboardMapStateToProps).toBe('function');
  });

  it('should test dashboardMapDispatchToProps content', () => {
    expect(dashboardMapStateToProps(fromJS({
      dashboard: {
        filterUnita: 'filterUnita',
        spinner: false,
        livelli: [],
        menuEggStatus: '',
        searchActive: false,
      },
      configuration: mockConfiguration,
    }))).toEqual({
      configuration: mockConfiguration,
      filterUnita: 'filterUnita',
      spinner: false,
      livelli: [],
      menuEggStatus: '',
      searchActive: false,
    });
  });

  it('should test dashboardMapStateToProps content', () => {
    const dispatch = jest.fn();
    const mapDispatchToProps = dashboardMapDispatchToProps(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(unitaFiltra({ data: 123 }));
    expect(mapDispatchToProps.onSetFilterUnita({ data: 123 }));
    expect(dispatch).toHaveBeenCalledWith(unitaFiltra({ data: 123 }));

    expect(dispatch).not.toHaveBeenCalledWith(livelliFetch(345));
    expect(mapDispatchToProps.loadLivelli(345));
    expect(dispatch).toHaveBeenCalledWith(livelliFetch(345));

    expect(dispatch).not.toHaveBeenCalledWith(dashboardMenuEggSet('test'));
    expect(mapDispatchToProps.onMenuEggSet('test'));
    expect(dispatch).toHaveBeenCalledWith(dashboardMenuEggSet('test'));

    expect(dispatch).not.toHaveBeenCalledWith(dashboardSearchActiveSet(true));
    expect(mapDispatchToProps.onDashboardSearchActiveSet(true));
    expect(dispatch).toHaveBeenCalledWith(dashboardSearchActiveSet(true));
  });
});

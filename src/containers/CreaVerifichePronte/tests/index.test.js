import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import injectReducer from 'utils/injectReducer';

import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Div from 'components/Div';
import CreaVerificheList from 'components/CreaVerificheList';
import * as actions from 'containers/CreaVerifiche/actions';
import CreaVerifichePronte, { CreaVerifichePronteView } from '../index';

const mockConfiguration = {
  hasPremium: true,
  disciplinaId: 123,
  product: 'prodotto',
};

const mockSteps = [{
  consegna: 'Testo della consegna',
  titolo: 'Trova',
  soluzione: 'Soluzione',
  opzioni: '',
  tipo: 'I',
  idEsercizio: 100,
  idsElementi: [1001, 1002],
  key: '100_1001.1002',
}, {
  consegna: 'Testo della consegna 2',
  titolo: 'Trova',
  soluzione: 'Soluzione2',
  opzioni: '',
  tipo: 'I',
  idEsercizio: 200,
  idsElementi: [2001, 2002],
  key: '200_2001.2002',
}];

const props = {
  spinner: false,
  configuration: mockConfiguration,
  loadingPrerequisitoVerifica: -1,
  spinnerLoadEsercizio: false,
  fetchVerifichePronteData: () => { },
  setVerificaData: () => { },
  fetchEserciziPrerequisito: () => { },
  history: {
    push: () => { },
  },
  verifichePronte: [{
    eserciziSelezionati: mockSteps,
    key: 0,
    prerequisito: 666,
    dataUltimaModifica: '1234',
    titolo: 'Titolo della verifica 1',
  }],
};

describe('<CreaVerifichePronteView />', () => {
  it('should render its content on initial status when spinner is false', () => {
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
  });

  it('should render its content on initial status when spinner is true', () => {
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...{ ...props, spinner: true }}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(0);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
  });

  it('should render its content when no data is provided', () => {
    const mockProps = {
      ...props,
      verifichePronte: [],
    };
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
  });

  it('should render its content when data has length > 1', () => {
    const mockProps = {
      ...props,
      verifichePronte: [
        props.verifichePronte[0], {
          ...props.verifichePronte[0],
          key: 0,
        },
      ],
    };
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
  });

  it('onClickFunction on default state should correctly trigger when step is selected', () => {
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...props}
      />
    );
    const instance = renderedComponent.instance();
    instance.modificaVerifica = jest.fn();

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    const spy = jest.spyOn(instance, 'modificaVerifica');

    expect(spy).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[0].onClickFunction();
    expect(spy).toHaveBeenCalled();
  });

  it('buttonsSpinner shoubl  loadingPrerequisitoVerifica === singolaVerifica.prerequisito', () => {
    const mockProps = {
      ...props,
      verifichePronte: [
        props.verifichePronte[0], {
          ...props.verifichePronte[0],
          key: 0,
        },
      ],
      loadingPrerequisitoVerifica: props.verifichePronte[0].prerequisito,
      spinnerLoadEsercizio: true,
    };

    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    expect(creaVerificaListProps.itemsList[0].buttonsSpinner).toBeTruthy();
  });

  it('tests tornaAllaDashboard should push history', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalledWith('/');
    instance.tornaAllaDashboard();
    expect(mockProps.history.push).toHaveBeenCalledWith('/');
  });

  it('tests modificaVerifica should call fetchEserciziPrerequisito', () => {
    const mockProps = {
      ...props,
      fetchEserciziPrerequisito: jest.fn(),
    };
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.fetchEserciziPrerequisito).not.toHaveBeenCalled();
    instance.modificaVerifica({ data: 123 });
    expect(mockProps.fetchEserciziPrerequisito).toHaveBeenCalledWith({ data: 123 });
  });

  it('tests componentWillReceiveProps pushes history when esercizi are loaded', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      loadingPrerequisitoVerifica: 123,
      spinnerLoadEsercizio: true,
      fetchEserciziPrerequisito: jest.fn(),
    };
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    instance.componentWillReceiveProps({
      loadingPrerequisitoVerifica: -1,
      spinnerLoadEsercizio: false,
    });
    expect(mockProps.history.push).toHaveBeenCalledWith('/modificaverifica/123');
  });

  it('tests componentWillReceiveProps not pushing history when esercizi are loaded', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      loadingPrerequisitoVerifica: 123,
      spinnerLoadEsercizio: false,
      fetchEserciziPrerequisito: jest.fn(),
    };
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    instance.componentWillReceiveProps({
      loadingPrerequisitoVerifica: -1,
      spinnerLoadEsercizio: false,
    });
    expect(mockProps.history.push).not.toHaveBeenCalled();
  });

  it('tests verifichePronte ordered by title', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      loadingPrerequisitoVerifica: 123,
      spinnerLoadEsercizio: false,
      fetchEserciziPrerequisito: jest.fn(),
      verifichePronte: [
        props.verifichePronte[0], {
          ...props.verifichePronte[0],
          titolo: 'AAA titolo che va prima',
        }, {
          ...props.verifichePronte[0],
          titolo: 'ZZZ titolo che va dopo',
        }],
    };
    const renderedComponent = shallow(
      <CreaVerifichePronteView
        {...mockProps}
      />
    );
    const itemsListProps = renderedComponent.find(CreaVerificheList).props().itemsList;
    expect(itemsListProps[0].elementi[0].nome).toBe(mockProps.verifichePronte[1].titolo);
    expect(itemsListProps[1].elementi[0].nome).toBe(mockProps.verifichePronte[0].titolo);
    expect(itemsListProps[2].elementi[0].nome).toBe(mockProps.verifichePronte[2].titolo);
  });
});

describe('<CreaVerifichePronte />', () => {
  const mockVerificaSalva = {
    eserciziSelezionati: [{
      idEsercizio: 100,
      idsElementi: [1001, 1002],
      key: '100_1001.1002',
    }],
    data: '123',
    note: 'note',
    titolo: 'titolo',
  };

  const mockConfigInitialState = fromJS({
    ...mockConfiguration,
  });
  const mockConfigurationReducer = (state = mockConfigInitialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  const withReducer = injectReducer({ key: 'configuration', reducer: mockConfigurationReducer });
  const ConfigurationWrapper = compose(
    withReducer,
    connect()
  )(CreaVerifichePronte);

  it('should check that creaverificheVerificaSet function is correctly working', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...props}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const instance = renderedComponent.instance().selector;

    const spy = jest.spyOn(actions, 'creaverificheVerificaSet');
    instance.props.setVerificaData(mockVerificaSalva);
    expect(spy).toHaveBeenCalledWith(mockVerificaSalva);
  });

  it('should check that creaverificheVerifichePronteEserciziFetch function is correctly dispatching action', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...props}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const instance = renderedComponent.instance().selector;

    instance.props.fetchEserciziPrerequisito({ data: 123 });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should check that fetchVerifichePronteData function id dispatching action to store', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...props}
      />, { context: { store } }
    ).dive().dive();
    const instance = renderedComponent.dive().dive().dive().props();
    expect(store.dispatch).not.toHaveBeenCalled();
    instance.fetchVerifichePronteData();
    expect(store.dispatch).toHaveBeenCalled();
  });
});

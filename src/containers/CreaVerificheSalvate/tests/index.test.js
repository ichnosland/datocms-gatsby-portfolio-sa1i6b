import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import creaVerificheReducer from 'containers/CreaVerifiche/reducer';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Div from 'components/Div';
import CreaVerificheList from 'components/CreaVerificheList';
import * as actions from 'containers/CreaVerifiche/actions';
import CreaVerificheSalvate, { CreaVerificheSalvateView } from '../index';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
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

const mockVerifica = {
  eserciziSelezionati: [],
  titolo: '',
  note: '',
  verificheCreate: [],
  key: -1,
};

const datetime = new Date();

const props = {
  setVerificaData: () => { },
  history: {
    push: () => { },
  },
  creaVerifiche: {
    verifica: {
      ...mockVerifica,
      anteprimaStampa: false,
      verificheCreate: [{
        eserciziSelezionati: mockSteps,
        key: 0,
        dataUltimaModifica: datetime,
      }],
    },
  },
};

const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
const withReducerCreaVerifiche = injectReducer({ key: 'CreaVerifiche', reducer: creaVerificheReducer });

const ConfigurationWrapper = compose(
  withReducerConfiguration,
  withReducerCreaVerifiche,
  connect()
)(CreaVerificheSalvate);

describe('<CreaVerificheSalvateView />', () => {
  it('should render its content on initial status', () => {
    const renderedComponent = shallow(
      <CreaVerificheSalvateView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
  });

  it('should render its content when no data is provided', () => {
    const mockProps = {
      ...props,
      creaVerifiche: {
        verifica: {
          ...mockVerifica,
          verificheCreate: [],
        },
      },
    };
    const renderedComponent = shallow(
      <CreaVerificheSalvateView
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
    const datetimeTest = new Date();
    const mockProps = {
      ...props,
      creaVerifiche: {
        verifica: {
          ...mockVerifica,
          verificheCreate: [{
            eserciziSelezionati: mockSteps,
            key: 0,
            dataUltimaModifica: datetimeTest,
          }, {
            eserciziSelezionati: mockSteps,
            key: 1,
            dataUltimaModifica: datetimeTest,
          }],
        },
      },
    };
    const renderedComponent = shallow(
      <CreaVerificheSalvateView
        {...mockProps}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
  });

  it('onClickFunction on Cancella button should trigger cancellaVerifica function', () => {
    const mockProps = {
      ...props,
    };

    const renderedComponent = shallow(
      <CreaVerificheSalvateView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.modificaVerifica = jest.fn();

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    const spy = jest.spyOn(instance, 'cancellaVerifica');

    expect(spy).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[0].onClickFunction();
    expect(spy).toHaveBeenCalled();
  });

  it('onClickFunction on Modifica button should trigger modificaVerifica function', () => {
    const mockProps = {
      ...props,
    };

    const renderedComponent = shallow(
      <CreaVerificheSalvateView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.modificaVerifica = jest.fn();

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    const spy = jest.spyOn(instance, 'modificaVerifica');

    expect(spy).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[1].onClickFunction();
    expect(spy).toHaveBeenCalled();
  });

  it('tests tornaAllaDashboard should push history', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <CreaVerificheSalvateView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalledWith('/');
    instance.tornaAllaDashboard();
    expect(mockProps.history.push).toHaveBeenCalledWith('/');
  });

  it('tests modificaVerifica should push history', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
    };
    const mockData = {
      ...props.creaVerifiche.verifica,
      key: 1,
    };
    const renderedComponent = shallow(
      <CreaVerificheSalvateView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalledWith('/modificaverifica/1');
    instance.modificaVerifica(mockData);
    expect(mockProps.history.push).toHaveBeenCalledWith('/modificaverifica/1');
  });
});

describe('<CreaVerificheSalvate />', () => {
  it('should check that matchDispatchToPRops function arre correctly working', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...props}
      />, { context: { store } }
    ).dive().dive().dive().dive();

    const receivedProps = renderedComponent.instance().props;
    const spy = jest.spyOn(actions, 'creaverificheVerificaSet');
    receivedProps.setVerificaData({ data: 123 });
    expect(spy).toHaveBeenCalledWith({ data: 123 });
  });

  it('tests cancellaVerifica should remove verifica from list', () => {
    const datetimeTest = new Date();
    const mockVerificheCreate = [{
      eserciziSelezionati: mockSteps,
      key: 0,
      dataUltimaModifica: datetimeTest,
      titolo: 'Titolo 1',
      note: 'Note 1',
    }, {
      eserciziSelezionati: mockSteps,
      key: 1,
      dataUltimaModifica: datetimeTest,
      titolo: 'Titolo 2',
      note: 'Note 2',
    }];
    const store = configureStore({}, {});
    const mockDatiVerifiche = {
      messaggioErrore: '',
      spinner: true,
      steps: [],
      titoloLivello: '',
      titoloMissione: '',
      titoloUnita: '',
      verifica: {
        eserciziSelezionati: [],
        titolo: 'Titolo della verifica',
        note: 'Titolo della verifica',
        verificheCreate: mockVerificheCreate,
        anteprimaStampa: false,
        key: -1,
      },
    };
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...{
          ...store,
          history: {
            push: () => { },
          },
        }}
      />, { context: { store } }
    ).dive().dive();

    const instance = renderedComponent.instance();
    instance.context.store.dispatch(actions.creaverificheVerificaSet({
      ...mockDatiVerifiche.verifica,
    }));

    expect(
      renderedComponent.dive().dive().instance().props.creaVerifiche
    ).toEqual(mockDatiVerifiche);

    renderedComponent.dive().dive().instance().cancellaVerifica(0);

    expect(
      renderedComponent.dive().dive().instance().props.creaVerifiche
    ).toEqual({
      ...mockDatiVerifiche,
      verifica: {
        ...mockDatiVerifiche.verifica,
        verificheCreate: [mockVerificheCreate[1]],
      },
    });
  });

  it('tests cancellaVerifica should remove verifica from list and reset key if the same is loaded in edit mode', () => {
    const datetimeTest = new Date();
    const mockVerificheCreate = [{
      eserciziSelezionati: mockSteps,
      key: 0,
      dataUltimaModifica: datetimeTest,
      titolo: 'Titolo 1',
      note: 'Note 1',
    }, {
      eserciziSelezionati: mockSteps,
      key: 1,
      dataUltimaModifica: datetimeTest,
      titolo: 'Titolo 2',
      note: 'Note 2',
    }];
    const store = configureStore({}, {});
    const mockDatiVerifiche = {
      messaggioErrore: '',
      spinner: true,
      steps: [],
      titoloLivello: '',
      titoloMissione: '',
      titoloUnita: '',
      verifica: {
        eserciziSelezionati: [],
        titolo: 'Titolo della verifica',
        note: 'Titolo della verifica',
        verificheCreate: mockVerificheCreate,
        anteprimaStampa: false,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...{
          ...store,
          history: {
            push: () => { },
          },
        }}
      />, { context: { store } }
    ).dive().dive();

    const instance = renderedComponent.instance();
    instance.context.store.dispatch(actions.creaverificheVerificaSet({
      ...mockDatiVerifiche.verifica,
    }));

    expect(
      renderedComponent.dive().dive().instance().props.creaVerifiche
    ).toEqual(mockDatiVerifiche);

    renderedComponent.dive().dive().instance().cancellaVerifica(0);

    expect(
      renderedComponent.dive().dive().instance().props.creaVerifiche
    ).toEqual({
      ...mockDatiVerifiche,
      verifica: {
        ...mockDatiVerifiche.verifica,
        eserciziSelezionati: [],
        titolo: '',
        note: '',
        key: -1,
        verificheCreate: [mockVerificheCreate[1]],
      },
    });
  });
});

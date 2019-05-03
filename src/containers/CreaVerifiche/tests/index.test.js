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
import * as actions from '../actions';
import CreaVerifiche, { CreaVerificheView } from '../index';
import ContenutoStep from '../ContenutoStep';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
};

const mockSteps = [{
  consegna: 'Testo della consegna',
  titolo: 'Trova',
  soluzioneTestuale: 'Soluzione',
  soluzioni: ['Soluzione'],
  opzioni: [],
  tipo: 'I',
  idEsercizio: 100,
  idsElementi: [1001, 1002],
  key: '100_1001.1002',
}, {
  consegna: 'Testo della consegna 2',
  titolo: 'Trova',
  soluzioneTestuale: 'Soluzione2',
  soluzioni: ['Soluzione2'],
  opzioni: [],
  tipo: 'I',
  idEsercizio: 200,
  idsElementi: [2001, 2002],
  key: '200_2001.2002',
}];

const props = {
  spinner: false,
  match: {
    params: {
      prerequisito: '123',
    },
  },
  fetchEserciziUnita: () => { },
  configuration: mockConfiguration,
  unitaSteps: [],
  titoloUnita: '',
  titoloMissione: '',
  titoloLivello: '',
  enableModalitaRiepilogo: () => { },
  history: {
    push: () => { },
  },
  verifica: {
    eserciziSelezionati: [],
    titolo: '',
    note: '',
    visualizzaRiepilogo: false,
    anteprimaStampa: false,
    key: -1,
  },
  location: {
    params: {
      titoloUnita: '',
      titoloLivello: '',
      titoloMissione: '',
    },
  },
  verificaCreazioneFormData: {},
  setVerificaData: () => { },
  messaggioErrore: '',
  creaVerificaPost: () => { },
  addEsercizio: () => { },
  removeEsercizio: () => { },
  fetchEserciziPreview: () => { },
};

describe('<CreaVerificheView />', () => {
  it('should render its content on initial status when no spinner is set', () => {
    const renderedComponent = shallow(
      <CreaVerificheView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its content when spinner is set', () => {
    const renderedComponent = shallow(
      <CreaVerificheView
        {...{
          ...props,
          spinner: true,
        }}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(0);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its content when error message is set', () => {
    const renderedComponent = shallow(
      <CreaVerificheView
        {...{
          ...props,
          messaggioErrore: 'Errore',
        }}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should send CreaVerificheList proper count label for steps > 1', () => {
    const renderedComponent = shallow(
      <CreaVerificheView
        {...{
          ...props,
          unitaSteps: mockSteps,
        }}
      />
    );
    expect(renderedComponent.find(CreaVerificheList).props().buttonText).toBe('2 Esercizi');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should send CreaVerificheList proper count label for no steps', () => {
    const renderedComponent = shallow(
      <CreaVerificheView
        {...{
          ...props,
        }}
      />
    );
    expect(renderedComponent.find(CreaVerificheList).props().buttonText).toBe('0 Esercizi');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should send CreaVerificheList proper count label for steps = 1', () => {
    const renderedComponent = shallow(
      <CreaVerificheView
        {...{
          ...props,
          unitaSteps: [mockSteps[0]],
        }}
      />
    );
    expect(renderedComponent.find(CreaVerificheList).props().buttonText).toBe('1 Esercizio');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('test CreaVerificheList should properly render elementi[n].solution when openedSolutions is opened', () => {
    const mockProps = {
      ...props,
      unitaSteps: [{
        ...mockSteps[0],
        opzioni: [
          'opzione',
        ],
      }],
      verifica: {
        ...props.verifica,
        anteprimaStampa: false,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.setState({
      openedSolutions: {
        [mockProps.unitaSteps[0].key]: true,
      },
    });

    renderedComponent.update();
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    expect(
      creaVerificaListProps.itemsList[0].elementi[0].solution
    ).toBe('Soluzione');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('creaVerifiche.itemsList[0].elementi[0].text must contain project name', () => {
    const mockProps = {
      ...props,
      unitaSteps: [{
        ...mockSteps[0],
      }],
      verifica: {
        ...props.verifica,
        anteprimaStampa: false,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    expect(
      creaVerificaListProps.itemsList[0].elementi[0].text
    ).toBe(`<div class="${mockConfiguration.product} ">${ContenutoStep(mockSteps[0])}</div>`);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('creaVerifiche.itemsList[0].elementi[0].text must contain project name and is mytest', () => {
    const mockProps = {
      ...props,
      configuration: {
        ...mockConfiguration,
        product: 'mytestitaliano',
      },
      unitaSteps: [{
        ...mockSteps[0],
      }],
      verifica: {
        ...props.verifica,
        anteprimaStampa: false,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    expect(
      creaVerificaListProps.itemsList[0].elementi[0].text
    ).toBe(`<div class="${mockProps.configuration.product} mytest">${ContenutoStep(mockSteps[0])}</div>`);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('test CreaVerificheList should properly render pulsanti when isStepSelected is false', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    expect(
      creaVerificaListProps.itemsList[0].pulsanti[1].label
    ).toBe('Aggiungi');
    expect(
      creaVerificaListProps.itemsList[0].pulsanti[1].icona
    ).toBe('plus');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('test CreaVerificheList should properly render pulsanti when isStepSelected is true', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    expect(
      creaVerificaListProps.itemsList[0].pulsanti[1].label
    ).toBe('Rimuovi');
    expect(
      creaVerificaListProps.itemsList[0].pulsanti[1].icona
    ).toBe('minus');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('test TopBar should render buttonLabel Aggiungi when verifica key > -1', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        key: 0,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const propsButton = renderedComponent.find(TopBar).props();
    expect(
      propsButton.button.label
    ).toBe('Aggiungi a verifica');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('test TopBar buttonFunction shoud push history', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      history: {
        push: jest.fn(),
      },
      verifica: {
        ...props.verifica,
        key: 0,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const propsButton = renderedComponent.find(TopBar).props();
    propsButton.button.onClick();
    expect(
      mockProps.history.push
    ).toHaveBeenCalledWith('/modificaverifica');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('onClickFunction on default state should correctly trigger when step is selected', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
      removeEsercizio: jest.fn(),
      addEsercizio: jest.fn(),
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.toggleSoluzione = jest.fn();

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    const spy = jest.spyOn(instance, 'toggleSoluzione');

    expect(spy).not.toHaveBeenCalled();
    expect(mockProps.removeEsercizio).not.toHaveBeenCalled();
    expect(mockProps.addEsercizio).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[0].onClickFunction();
    creaVerificaListProps.itemsList[0].pulsanti[1].onClickFunction();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.removeEsercizio).toHaveBeenCalled();
    expect(mockProps.addEsercizio).not.toHaveBeenCalled();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('onClickFunction on default state should trigger correctly triggered when step is not selected', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      removeEsercizio: jest.fn(),
      addEsercizio: jest.fn(),
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.toggleSoluzione = jest.fn();

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    const spy = jest.spyOn(instance, 'toggleSoluzione');

    expect(spy).not.toHaveBeenCalled();
    expect(mockProps.removeEsercizio).not.toHaveBeenCalled();
    expect(mockProps.addEsercizio).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[0].onClickFunction();
    creaVerificaListProps.itemsList[0].pulsanti[1].onClickFunction();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.removeEsercizio).not.toHaveBeenCalled();
    expect(mockProps.addEsercizio).toHaveBeenCalled();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('tests showOnlySelectedSteps function when filtering is not active', () => {
    const mockProps = {
      ...props,
      unitaSteps: mockSteps,
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.showOnlySelectedSteps()).toEqual(mockSteps);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('tests showOnlySelectedSteps function when filtering is active', () => {
    const mockProps = {
      ...props,
      unitaSteps: mockSteps,
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.showOnlySelectedSteps(true)).toEqual([mockSteps[0]]);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('tests toggleSoluzione function', () => {
    const renderedComponent = shallow(
      <CreaVerificheView
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.state.openedSolutions).toEqual({});
    instance.toggleSoluzione('key');
    expect(instance.state.openedSolutions).toEqual({
      key: true,
    });
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CreaVerifiche />', () => {
  it('should check that mapDispatchToProps functions are correctly working', () => {
    const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
    const withReducerCreaVerifiche = injectReducer({ key: 'CreaVerifiche', reducer: creaVerificheReducer });

    const ConfigurationWrapper = compose(
      withReducerConfiguration,
      withReducerCreaVerifiche,
      connect()
    )(CreaVerifiche);

    const store = configureStore({}, {});
    const mockEsercizio = {
      idEsercizio: 100,
      idsElementi: [1001, 1002],
      key: '100_1001.1002',
      data: '123',
    };
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...props}
      />, { context: { store } }
    ).dive();
    const receivedProps = renderedComponent.dive().dive().instance().selector.props;

    const spy1 = jest.spyOn(actions, 'creaverificheVerificaEserciziFetch');
    receivedProps.fetchEserciziUnita(123);
    expect(spy1).toHaveBeenCalledWith(123);

    const spy6 = jest.spyOn(actions, 'creaverificheVerificaEsercizioPreviewFetch');
    receivedProps.fetchEserciziPreview(123);
    expect(spy6).toHaveBeenCalledWith(123);

    const spy2 = jest.spyOn(actions, 'creaverificheVerificaSet');
    receivedProps.setVerificaData({ data: 123 });
    expect(spy2).toHaveBeenCalledWith({ data: 123 });

    const spy3 = jest.spyOn(actions, 'creaverificheVerificaEsercizioAdd');
    receivedProps.addEsercizio(mockEsercizio);
    expect(spy3).toHaveBeenCalledWith(mockEsercizio);

    const spy4 = jest.spyOn(actions, 'creaverificheVerificaEsercizioRemove');
    receivedProps.removeEsercizio(mockEsercizio);
    expect(spy4).toHaveBeenCalledWith(mockEsercizio);

    const spy5 = jest.spyOn(actions, 'creaverificheVerificaPost');
    receivedProps.creaVerificaPost({ data: 123 });
    expect(spy5).toHaveBeenCalledWith({ data: 123 });
  });

  it('should check that componentDidMount makes redirect if titoloLivello param is missing', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      location: {
        params: {
          titoloMissione: 'Titolo Missione',
          titoloUnita: 'Titolo Unità',
        },
      },
    };

    const spy = jest.spyOn(CreaVerificheView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.history.push).toHaveBeenCalledWith('/');
  });

  it('should check that componentDidMount makes redirect if titoloMissione param is missing', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      location: {
        params: {
          titoloLivello: 'Titolo Livello',
          titoloUnita: 'Titolo Unità',
        },
      },
    };

    const spy = jest.spyOn(CreaVerificheView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.history.push).toHaveBeenCalledWith('/');
  });

  it('should check that componentDidMount makes redirect if titoloUnita param is missing', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      location: {
        params: {
          titoloLivello: 'Titolo Livello',
          titoloMissione: 'Titolo Missione',
        },
      },
    };

    const spy = jest.spyOn(CreaVerificheView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.history.push).toHaveBeenCalledWith('/');
  });

  it('should check that componentDidMount makes redirect when no location provided', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      location: undefined,
    };

    const spy = jest.spyOn(CreaVerificheView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.history.push).toHaveBeenCalledWith('/');
  });

  it('should check that componentDidMount makes redirect when no location.params provided', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      location: { params: undefined },
    };

    const spy = jest.spyOn(CreaVerificheView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.history.push).toHaveBeenCalledWith('/');
  });

  it('should check that componentDidMount should call fetchEserciziUnita function if locationParams are set', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          prerequisito: '123',
        },
      },
      fetchEserciziUnita: jest.fn(),
      location: {
        params: {
          titoloLivello: 'Titolo Livello',
          titoloMissione: 'Titolo Missione',
          titoloUnita: 'Titolo Unità',
        },
      },
    };

    const spy = jest.spyOn(CreaVerificheView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.history.push).not.toHaveBeenCalledWith('/');
    expect(mockProps.fetchEserciziUnita).toHaveBeenCalledWith('123');
  });

  it('should check that componentDidMount should call fetchEserciziPreview function if in preview mode', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          esercizioId: '123',
        },
        path: '/previewesercizio/:esercizioId',
      },
      fetchEserciziPreview: jest.fn(),
    };

    const spy = jest.spyOn(CreaVerificheView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(mockProps.history.push).not.toHaveBeenCalledWith('/');
    expect(mockProps.fetchEserciziPreview).toHaveBeenCalledWith('123');
  });

  it('should display titoloUnità if provided instead of quitting if in preview mode', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          esercizioId: '123',
        },
        path: '/previewesercizio/:esercizioId',
      },
      unitaSteps: [{
        ...mockSteps[0],
      }],
      location: {
        params: {
          titoloUnita: 'Titolo Unità',
        },
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    const creaVerificheElemento1 = renderedComponent.find(CreaVerificheList).props().itemsList[0].elementi[0];
    expect(creaVerificheElemento1.nome).toBe(mockProps.location.params.titoloUnita);
  });

  it('should display titoloUnità and titoloLivello if provided instead of quitting if in preview mode', () => {
    const store = configureStore({}, {});
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          esercizioId: '123',
        },
        path: '/previewesercizio/:esercizioId',
      },
      unitaSteps: [{
        ...mockSteps[0],
      }],
      location: {
        params: {
          titoloUnita: 'Titolo Unità',
          titoloLivello: 'Titolo Livello',
        },
      },
    };

    const renderedComponent = shallow(
      <CreaVerificheView
        {...mockProps}
      />, { context: { store }, lifecycleExperimental: true }
    );
    const creaVerificheElemento1 = renderedComponent.find(CreaVerificheList).props().itemsList[0].elementi[0];
    expect(creaVerificheElemento1.nome).toBe(
      `${mockProps.location.params.titoloLivello} - ${mockProps.location.params.titoloUnita}`
    );
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import creaVerificheReducer from 'containers/CreaVerifiche/reducer';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import { H2 } from 'components/Heading';
import Div from 'components/Div';
import FlexBox, { FlexChild } from 'components/FlexBox';
import CreaVerificheList from 'components/CreaVerificheList';
import * as actions from 'containers/CreaVerifiche/actions';
import * as actionsModalBox from 'containers/ModalBox/actions';
import * as commonUtils from 'common/utils';
import CreaVerificaModifica, { CreaVerificaModificaView, FlexChildRow, FlexContainer } from '../index';
import CreaVerificaForm from '../CreaVerificaForm';

const mockConfiguration = {
  product: 'product',
  title: 'configuration title',
  hasPremium: true,
  disciplinaId: 123,
};

const mockSteps = [{
  consegna: 'Testo della consegna',
  consegnaHTML: 'Testo della consegna HTML',
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
  consegnaHTML: 'Testo della consegna 2 HTML',
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
  titoloUnita: 'Titolo Unità',
  titoloMissione: 'Titolo Missione',
  titoloLivello: 'Titolo Livello',
  enableModalitaRiepilogo: () => { },
  history: {
    push: () => { },
  },
  verifica: {
    eserciziSelezionati: [],
    verificheCreate: [],
    key: -1,
    titolo: '',
    note: '',
    visualizzaRiepilogo: false,
    anteprimaStampa: false,
  },
  verificaCreazioneFormData: {},
  setVerificaData: () => { },
  messaggioErrore: '',
  creaVerificaPost: () => { },
  addEsercizio: () => { },
  removeEsercizio: () => { },
  onModalSetData: () => { },
};

describe('<CreaVerificaModificaView />', () => {
  it('should render its content on initial status', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(CreaVerificheList).length).toBe(1);
    expect(renderedComponent.find(CreaVerificaForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
  });

  it('should display CreaVerificaForm when visualizzaRiepilogo is set', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...{
          ...props,
          unitaSteps: mockSteps,
          verifica: {
            ...props.verifica,
            visualizzaRiepilogo: true,
          },
        }}
      />
    );
    expect(renderedComponent.find(CreaVerificaForm).length).toBe(1);
    expect(renderedComponent.find(CreaVerificaForm).props().itemCount).toBe('0');
  });

  it('should not display CreaVerificaForm when anteprimaStampa is set', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...{
          ...props,
          unitaSteps: mockSteps,
          verifica: {
            ...props.verifica,
            anteprimaStampa: true,
          },
        }}
      />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      anteprimaDiStampa: {
        ...props.verifica,
        eserciziSelezionati: mockSteps,
        titolo: 'Titolo verifica',
        note: 'Note verifica',
      },
    });

    renderedComponent.update();

    expect(renderedComponent.find(CreaVerificaForm).length).toBe(0);
    expect(renderedComponent.find(Div).find(Div).find(Div).at(0).find(H2).props().children).toBe('Titolo verifica');
    expect(renderedComponent.find(Div).find(Div).find(Div).find('p').text()).toBe('Note verifica');
  });

  it('should display CreaVerificaForm when anteprimaStampa is false', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...{
          ...props,
          unitaSteps: mockSteps,
          verifica: {
            ...props.verifica,
            anteprimaStampa: false,
          },
        }}
      />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      anteprimaDiStampa: {
        ...props.verifica,
        eserciziSelezionati: mockSteps,
      },
    });

    renderedComponent.update();

    expect(renderedComponent.find(CreaVerificaForm).length).toBe(1);
  });

  it('aggiungiEserciziFunction from CreaVerificaForm should trigger enableModalitaRiepilogo function', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
      },
      unitaSteps: mockSteps,
      enableModalitaRiepilogo: jest.fn(),
      verifica: {
        ...props.verifica,
        visualizzaRiepilogo: true,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const creaVerificaProps = renderedComponent.find(CreaVerificaForm).props();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    creaVerificaProps.aggiungiEserciziFunction();
    expect(mockProps.history.push).toHaveBeenCalled();
  });

  it('handleSubmit from CreaVerificaForm should trigger submitForm function', () => {
    const mockProps = {
      ...props,
      unitaSteps: mockSteps,
      submitForm: jest.fn(),
      verifica: {
        ...props.verifica,
        visualizzaRiepilogo: true,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.submitForm = jest.fn();

    const creaVerificaProps = renderedComponent.find(CreaVerificaForm).props();
    const spy = jest.spyOn(instance, 'submitForm');
    expect(spy).not.toHaveBeenCalled();
    creaVerificaProps.handleSubmit({
      preventDefault: jest.fn(),
    });
    expect(spy).toHaveBeenCalled();
  });

  it('handleSubmit from FlexContainer should trigger toggleAllSolutions function', () => {
    const mockProps = {
      ...props,
      unitaSteps: mockSteps,
      submitForm: jest.fn(),
      verifica: {
        ...props.verifica,
        visualizzaRiepilogo: true,
        anteprimaStampa: true,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.setState({
      anteprimaDiStampa: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    });
    renderedComponent.update();

    const spy = jest.spyOn(instance, 'toggleAllSolutions');

    const flexContainerProps = renderedComponent.find(FlexContainer).props().children;
    expect(spy).not.toHaveBeenCalled();
    flexContainerProps[0].props.onClick();
    expect(spy).toHaveBeenCalledWith(['100_1001.1002'], true);
  });

  it('button[1].onClick from FlexContainer should trigger stampaContenuto function', () => {
    const mockProps = {
      ...props,
      unitaSteps: mockSteps,
      submitForm: jest.fn(),
      verifica: {
        ...props.verifica,
        visualizzaRiepilogo: true,
        anteprimaStampa: true,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.setState({
      anteprimaDiStampa: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    });
    renderedComponent.update();
    instance.stampaContenuto = jest.fn();

    const flexContainerProps = renderedComponent.find(FlexContainer).props().children;
    expect(instance.stampaContenuto).not.toHaveBeenCalled();
    flexContainerProps[1].props.onClick();
    expect(instance.stampaContenuto).toHaveBeenCalled();
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
        eserciziSelezionati: [{
          ...mockSteps[0],
          opzioni: [
            'opzione',
          ],
        }],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
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
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.toggleSoluzione = jest.fn();

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    const spy = jest.spyOn(instance, 'toggleSoluzione');
    expect(spy).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[0].onClickFunction();
    expect(spy).toHaveBeenCalled();

    expect(mockProps.removeEsercizio).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[2].onClickFunction();
    expect(mockProps.removeEsercizio).toHaveBeenCalled();

    const spy2 = jest.spyOn(instance, 'toggleModificaTestoStep');
    expect(spy2).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].pulsanti[1].onClickFunction();
    expect(spy2).toHaveBeenCalled();
  });

  it('no button displayed in CreaVerificheList in anteprimaStampa = true', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        anteprimaStampa: true,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      anteprimaDiStampa: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    });
    renderedComponent.update();

    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    expect(creaVerificaListProps.itemsList[0].pulsanti.length).toBe(0);
  });

  it('no button items.options.onChange should call cambiaNumerazioneStep', () => {
    const mockProps = {
      ...props,
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    };
    const targetMock = {
      target: {
        value: '123',
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      numerazioneStep: {
        [mockSteps[0].key]: 12,
      },
    });
    instance.cambiaNumerazioneStep = jest.fn();
    renderedComponent.update();
    expect(instance.cambiaNumerazioneStep).not.toHaveBeenCalled();
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();
    creaVerificaListProps.itemsList[0].elementi[0].options[0].onChangeFunction(targetMock, 'key');
    expect(instance.cambiaNumerazioneStep).toHaveBeenCalled();
    expect(creaVerificaListProps.itemsList[0].elementi[0].options[0].content).toEqual('12');
  });

  it('tests submitForm function', () => {
    const mockProps = {
      ...props,
      verificaCreazioneFormData: fromJS({
        values: {
          titolo: 'nuovo titolo',
          note: 'nuove note',
        },
      }),
    };
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();

    const spyGAWrapper = jest.spyOn(commonUtils, 'googleAnalyticsWrapper');
    instance.submitForm(mockEvent);
    expect(instance.props.verificaCreazioneFormData).toBe(mockProps.verificaCreazioneFormData);
    expect(spyGAWrapper).toHaveBeenCalledWith('event', {
      category: 'Salvataggio verifica',
      action: 'Salvataggio verifica configuration title',
    });
  });

  it('tests submitForm function when titolo is empty', () => {
    const mockProps = {
      ...props,
      verificaCreazioneFormData: fromJS({
        values: {
          titolo: '',
          note: 'nuove note',
        },
      }),
    };
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.submitForm(mockEvent);
    expect(instance.submitForm(mockEvent)).toBeFalsy();
  });

  it('tests submitForm function when verifica key is provided', () => {
    const mockProps = {
      ...props,
      verificaCreazioneFormData: fromJS({
        values: {
          titolo: 'nuovo titolo',
          note: 'nuove note',
          key: 1,
        },
      }),
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
        verificheCreate: [{
          eserciziSelezionati: mockSteps,
          titolo: '',
          note: '',
          key: 1,
        }],
        key: 0,
      },
    };
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.setState({
      anteprimaDiStampa: {
        ...props.verifica,
        eserciziSelezionati: [{ ...mockSteps[0], key: 1 }],
      },
    });
    renderedComponent.update();

    instance.submitForm(mockEvent);
    expect(instance.props.verificaCreazioneFormData).toBe(mockProps.verificaCreazioneFormData);
  });

  it('tests toggleSoluzione function', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.state.openedSolutions).toEqual({});
    instance.toggleSoluzione('key');
    expect(instance.state.openedSolutions).toEqual({
      key: true,
    });
  });

  it('tests cambiaNumerazioneStep function', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.state.numerazioneStep).toEqual({});
    instance.cambiaNumerazioneStep({
      target: {
        value: '123',
      },
    }, 'chiave');
    expect(instance.state.numerazioneStep).toEqual({
      chiave: 123,
    });
  });

  it('tests sortStepByNumber function', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.sortStepByNumber(mockSteps, {
      [mockSteps[0].key]: 2,
    })).toEqual([
      mockSteps[0], mockSteps[1],
    ]);
  });

  it('tests svuotaEsercizi function', () => {
    const mockProps = {
      ...props,
      setVerificaData: jest.fn(),
      verifica: {
        ...props.verifica,
        anteprimaStampa: true,
        eserciziSelezionati: [mockSteps[0]],
      },
    };
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      verifica: {
        eserciziSelezionati: [1, 2, 3],
      },
    });
    expect(mockProps.setVerificaData).not.toHaveBeenCalled();
    instance.svuotaEsercizi();
    expect(mockProps.setVerificaData).toHaveBeenCalled();
  });

  it('tests toggleAllSolutions function', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.state.openedSolutions).toEqual({});
    instance.toggleAllSolutions(
      ['100_1001.1002', '200_2001.2002'],
      true
    );
    expect(instance.state.openedSolutions).toEqual({
      '100_1001.1002': true,
      '200_2001.2002': true,
    });
  });

  it('tests stampaContenuto should trigger window.print', () => {
    window.print = jest.fn();
    const mockProps = {
      ...props,
    };
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const spyGAWrapper = jest.spyOn(commonUtils, 'googleAnalyticsWrapper');
    const instance = renderedComponent.instance();
    instance.stampaContenuto({ data: 123 });
    expect(window.print).toHaveBeenCalled();
    expect(spyGAWrapper).toHaveBeenCalledWith('event', {
      category: 'Stampa verifica',
      action: 'Stampa verifica configuration title',
    });
  });

  it('tests tornaAlRiepilogo should goBack history if match.params.key and anteprimaStampa are provided', () => {
    const mockProps = {
      ...props,
      match: {
        params: {
          key: '123',
        },
      },
      history: {
        push: jest.fn(),
        goBack: jest.fn(),
      },
      verifica: {
        ...props.verifica,
        anteprimaStampa: true,
      },
    };
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    expect(mockProps.history.goBack).not.toHaveBeenCalled();
    instance.tornaAlRiepilogo();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    expect(mockProps.history.goBack).toHaveBeenCalled();
  });

  it('tests tornaAlRiepilogo should push history if match.params.key is not provided', () => {
    const mockProps = {
      ...props,
      match: undefined,
      history: {
        push: jest.fn(),
        goBack: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    expect(mockProps.history.goBack).not.toHaveBeenCalled();
    instance.tornaAlRiepilogo();
    expect(mockProps.history.push).toHaveBeenCalled();
    expect(mockProps.history.goBack).not.toHaveBeenCalled();
  });

  it('tests tornaAlRiepilogo should push history if match.params is provided but not key', () => {
    const mockProps = {
      ...props,
      match: {
        params: undefined,
      },
      history: {
        push: jest.fn(),
        goBack: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    expect(mockProps.history.goBack).not.toHaveBeenCalled();
    instance.tornaAlRiepilogo();
    expect(mockProps.history.push).toHaveBeenCalled();
    expect(mockProps.history.goBack).not.toHaveBeenCalled();
  });

  it('tests tornaAlRiepilogo should push history if match.params.key undefined', () => {
    const mockProps = {
      ...props,
      history: {
        push: jest.fn(),
        goBack: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(mockProps.history.push).not.toHaveBeenCalled();
    expect(mockProps.history.goBack).not.toHaveBeenCalled();
    instance.tornaAlRiepilogo();
    expect(mockProps.history.push).toHaveBeenCalled();
    expect(mockProps.history.goBack).not.toHaveBeenCalled();
  });

  it('onEditStep function should set a state with given key', () => {
    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.state.field_name).toBe(undefined);
    instance.onEditStep({
      editor: {
        getData: () => ('testo di prova'),
      },
    }, 'field_name');
    expect(instance.state.field_name).toBe('testo di prova');
  });

  it('saveModifiedItem function should call setVerificaData prop', () => {
    const mockProps = {
      ...props,
      setVerificaData: jest.fn(),
      unitaSteps: mockSteps,
      verifica: {
        ...props.verifica,
        anteprimaStampa: true,
        eserciziSelezionati: mockSteps,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      editItemKey: mockSteps[0].key,
    });
    expect(mockProps.setVerificaData).not.toHaveBeenCalled();
    instance.saveModifiedItem();
    expect(mockProps.setVerificaData).toHaveBeenCalled();
  });

  it('toggleModificaTestoStep should toggle key selection', () => {
    const mockProps = {
      ...props,
      unitaSteps: mockSteps,
      verifica: {
        ...props.verifica,
        anteprimaStampa: true,
        eserciziSelezionati: mockSteps,
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      editItemKey: mockSteps[0].key,
    });
    instance.toggleModificaTestoStep(mockSteps[0]);
    expect(instance.state.editItemKey).toBe('');
  });

  it('onChangeConsegna and onChangeSoluzione should trigger onEditStep function', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
      removeEsercizio: jest.fn(),
    };
    const mockArgument = {
      editor: {
        getData: () => ('testo di prova'),
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.onEditStep = jest.fn();
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();

    expect(instance.onEditStep).not.toHaveBeenCalled();
    creaVerificaListProps.itemsList[0].elementi[0].editor.onChangeConsegna(mockArgument);
    expect(instance.onEditStep).toHaveBeenCalledWith(mockArgument, 'editorConsegnaHTML');

    creaVerificaListProps.itemsList[0].elementi[0].editor.onChangeSoluzione(mockArgument);
    expect(instance.onEditStep).toHaveBeenCalledWith(mockArgument, 'editorSoluzioneHTML');
  });

  it('creaVerificaListProps.itemsList[0].elementi[0].text must contain project name', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();

    expect(
      creaVerificaListProps.itemsList[0].elementi[0].text
    ).toBe(`<div class="${mockConfiguration.product} ">Testo della consegna HTML</div>`);
  });

  it('creaVerificaListProps.itemsList[0].elementi[0].text must contain project name AND mytest if mytest project provided', () => {
    const mockProps = {
      ...props,
      configuration: {
        ...mockConfiguration,
        product: 'mytestitaliano',
      },
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [mockSteps[0]],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();

    expect(
      creaVerificaListProps.itemsList[0].elementi[0].text
    ).toBe(`<div class="${mockProps.configuration.product} mytest">Testo della consegna HTML</div>`);
  });

  it('CreaVerificheList\'s items must have nome=TitoloUnita value if titoloLivello is empty', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [{
          ...mockSteps[0],
          titoloLivello: '',
          titoloUnita: 'Titolo unità',
        }],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.onEditStep = jest.fn();
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();

    expect(
      creaVerificaListProps.itemsList[0].elementi[0].nome
    ).toBe(mockProps.verifica.eserciziSelezionati[0].titoloUnita);
  });

  it('CreaVerificheList\'s items must have nome=TitoloLivello value if titoloUnita is empty', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [{
          ...mockSteps[0],
          titoloLivello: 'TitoloLivello',
          titoloUnita: '',
        }],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.onEditStep = jest.fn();
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();

    expect(
      creaVerificaListProps.itemsList[0].elementi[0].nome
    ).toBe(mockProps.verifica.eserciziSelezionati[0].titoloLivello);
  });

  it('CreaVerificheList\'s items must have nome=TitoloLivello value if titoloUnita and TitoloLivello are empty', () => {
    const mockProps = {
      ...props,
      unitaSteps: [mockSteps[0]],
      verifica: {
        ...props.verifica,
        eserciziSelezionati: [{
          ...mockSteps[0],
          titoloLivello: '',
          titoloUnita: '',
        }],
      },
    };

    const renderedComponent = shallow(
      <CreaVerificaModificaView
        {...mockProps}
      />
    );
    const instance = renderedComponent.instance();
    instance.onEditStep = jest.fn();
    const creaVerificaListProps = renderedComponent.find(CreaVerificheList).props();

    expect(
      creaVerificaListProps.itemsList[0].elementi[0].nome
    ).toBe('');
  });
});

describe('<CreaVerificaModifica />', () => {
  it('should check that matchDispatchToPRops function arre correctly working', () => {
    const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
    const withReducerCreaVerifiche = injectReducer({ key: 'CreaVerifiche', reducer: creaVerificheReducer });

    const ConfigurationWrapper = compose(
      withReducerConfiguration,
      withReducerCreaVerifiche,
      connect()
    )(CreaVerificaModifica);

    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        {...props}
      />, { context: { store } }
    ).dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    const spy1 = jest.spyOn(actions, 'creaverificheVerificaSet');
    receivedProps.setVerificaData({ data: 123 });
    expect(spy1).toHaveBeenCalledWith({ data: 123 });

    const spy2 = jest.spyOn(actions, 'creaverificheVerificaEsercizioRemove');
    receivedProps.removeEsercizio({ data: 123 });
    expect(spy2).toHaveBeenCalledWith({ data: 123 });

    const spy3 = jest.spyOn(actionsModalBox, 'modalSetData');
    receivedProps.onModalSetData({ data: 123 });
    expect(spy3).toHaveBeenCalledWith({ data: 123 });
  });
});

describe('<FlexContainer />', () => {
  it('should render FlexBox', () => {
    const renderedComponent = shallow(<FlexContainer />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<FlexChildRow />', () => {
  it('should render a FlexChild', () => {
    const renderedComponent = shallow(<FlexChildRow />);
    expect(renderedComponent.find(FlexChild).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

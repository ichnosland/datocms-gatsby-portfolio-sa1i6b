import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import Container from 'components/Container';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { Button } from 'components/Button';
import { ListLink, ListItemText, ListPanelHeader } from 'components/NewListPanels';
import ListSideBox from 'components/NewListPanels/ListSideBox';
import { modalSetData } from 'containers/ModalBox/actions';
import ZendeskTicket from 'containers/ZendeskTicket';
import LandingForm from 'components/LandingForm';
import { singleFieldRequired } from 'common/forms';
import InputField from 'components/FormElements/Field';
import SelectField from 'components/FormElements/SelectField';

import { classiDataFetch, classiDataReset } from '../actions';
import Classi, { ClassiView } from '../index';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 21,
  homePage: '/homepage',
};
const store = configureStore({}, {});

const mockProps = {
  configuration: mockConfiguration,
  history: {
    push: jest.fn(),
  },
  classi: {
    spinner: false,
    error: {
      hasErrors: false,
      errorMessage: '',
    },
    classiData: [{
      nome: 'nome',
      pk: 1234,
      corsi: [{
        nome: 'nomeCorso',
        applied: 18,
        pk: 4321,
      }],
    }, {
      nome: 'nome',
      pk: 1234,
      corsi: [{
        nome: 'nomeCorso',
        applied: 0,
        pk: 4321,
      }],
    }, {
      nome: 'nome',
      pk: 1234,
      corsi: [{
        nome: 'nomeCorso',
        applied: undefined,
        pk: 4321,
      }],
    }],

  },
  onDataFetch: () => { },
  onModalSetData: () => { },
  onClassiDataReset: () => { },
};

describe('<ClassiView />', () => {
  it('testo il render quando vengono mostrati i contenuti', () => {
    const renderedComponent = shallow(
      <ClassiView
        store={store}
        {...mockProps}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItemText).length).toBe(3);
    expect(renderedComponent.find(ListLink).length).toBe(3);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(3);
    expect(renderedComponent.find(ListSideBox).length).toBe(3);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il render quando il caricamento è in corso', () => {
    const props = {
      ...mockProps,
      classi: {
        ...mockProps.classi,
        spinner: true,
      },
    };
    const renderedComponent = shallow(
      <ClassiView
        store={store}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(ListItemText).length).toBe(0);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(0);
    expect(renderedComponent.find(ListSideBox).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il render quando ho un messaggio di errore', () => {
    const props = {
      ...mockProps,
      classi: {
        ...mockProps.classi,
        error: {
          hasErrors: true,
          errorMessage: 'messaggio di errore',
        },
      },
    };
    const renderedComponent = shallow(
      <ClassiView
        store={store}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItemText).length).toBe(0);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(0);
    expect(renderedComponent.find(ListSideBox).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo che la funzione associata a backNav mi faccia una history.push', () => {
    const renderedComponent = shallow(
      <ClassiView
        store={store}
        {...mockProps}
      />
    );
    const topbarProps = renderedComponent.find(TopBar).props();

    expect(mockProps.history.push).not.toHaveBeenCalled();
    topbarProps.backNav.onClickFunction();
    expect(mockProps.history.push).toHaveBeenCalledWith(mockConfiguration.homePage);
  });

  it('testo che appaia un messaggio di errore se non ho classi', () => {
    const props = {
      ...mockProps,
      classi: {
        ...mockProps.classi,
        classiData: [],
      },
    };

    const renderedComponent = shallow(
      <ClassiView
        store={store}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListItemText).length).toBe(0);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(0);
    expect(renderedComponent.find(ListSideBox).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('componentWillUnmount deve chiamare onClassiDataReset', () => {
    const props = {
      ...mockProps,
      onClassiDataReset: jest.fn(),
    };

    const renderedComponent = shallow(
      <ClassiView {...props} />
    );
    const instance = renderedComponent.instance();

    expect(props.onClassiDataReset).not.toHaveBeenCalled();
    instance.componentWillUnmount();
    expect(props.onClassiDataReset).toHaveBeenCalled();
  });

  it('testo che Container > Button apra popup di richiesta classe', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(
      <ClassiView
        {...props}
      />
    );
    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(Container).find(Button).simulate('click');
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'classi',
            tipologia: 'comunicazione',
            titolo: 'Classi: richiesta creazione nuova classe',
          }}
          formConfiguration={{
            component: LandingForm,
            props: {
              alatin: false,
              privacy: false,
              formtitle: 'Richiesta creazione classe',
              formFields: [{
                id: 'scuola',
                type: 'text',
                name: 'scuola',
                label: 'Scuola*',
                landing: true,
                validate: [singleFieldRequired],
                component: InputField,
              }, {
                id: 'citta',
                type: 'text',
                name: 'citta',
                label: 'Città*',
                landing: true,
                validate: [singleFieldRequired],
                component: InputField,
              }, {
                id: 'indirizzoDiStudio',
                type: 'select',
                name: 'indirizzoDiStudio',
                label: 'Indirizzo di studio*',
                validate: [singleFieldRequired],
                opts: [{
                  label: 'Indirizzo di studio*',
                  id: 'seleziona_corso',
                  value: '',
                }, {
                  label: 'Liceo classico',
                  id: 'classico',
                  value: 'classico',
                }, {
                  label: 'Liceo scientifico',
                  id: 'scientifico',
                  value: 'scientifico',
                }, {
                  label: 'Liceo linguistico',
                  id: 'linguistico',
                  value: 'linguistico',
                }, {
                  label: 'Liceo scienze umane',
                  id: 'scienze_umane',
                  value: 'scienze_umane',
                }, {
                  label: 'Scuola media',
                  id: 'scuola_media',
                  value: 'scuola_media',
                }, {
                  label: 'Altro',
                  id: 'altro',
                  value: 'altro',
                }],
                component: SelectField,
                margin: '0 0 12px',
              }, {
                id: 'classeSezione',
                type: 'text',
                name: 'classeSezione',
                label: 'Classe e sezione*',
                landing: true,
                validate: [singleFieldRequired],
                component: InputField,
              }],
            },
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
      formBox: true,
      maxWidth: '480px',
    });
  });
});


describe('<Classi />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    connect()
  )(Classi);

  it('should check Dashboard initial props are properly set', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={mockProps.history}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.classi).toEqual({
      spinner: true,
      error: {
        hasErrors: false,
        errorMessage: '',
        errorData: {},
      },
      classiData: [],
    });
  });

  it('mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={mockProps.history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      classiDataFetch('filtro')
    );
    receivedProps.onDataFetch('filtro');
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classiDataFetch('filtro')
    );

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      classiDataReset()
    );
    receivedProps.onClassiDataReset();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classiDataReset()
    );

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );
    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );
  });
});

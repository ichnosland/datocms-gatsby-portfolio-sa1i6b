
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';
import { sortDataBySpecs } from 'common/statistiche';
import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import AlertBanner from 'components/AlertBanner';
import ReportGrid from 'components/ReportGrid';
import { ButtonLink } from 'components/ButtonLink';
import { BrandTxt } from 'components/Text';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import userReducer, { defaultAnagraphicsSettings } from 'containers/User/reducer';
import corsiReducer from 'containers/Corsi/reducer';
import { grigliaValutazioneDettaglioFetch, grigliaValutazioniElimina } from 'containers/GrigliaValutazioni/actions';

import {
  classeDettaglioEspelli,
  classeDettaglioDataFetch,
  classeDettaglioCorsoFetch,
  classeDettaglioDisplaySort,
} from '../actions';
import ClasseDettaglio, {
  ClasseDettaglioView,
  InfoStudente,
} from '../index';
import {
  defaultClasseDettaglioFeedback,
  defaultClasseDettaglioContenuto,
  defaultClasseDettaglioDisplay,
} from '../reducer';


const configuration = {
  product: 'product',
  theme: {
    brand: 'rgb(20,203,200)',
    subtle: 'rgb(20, 30, 100)',
    light: 'rgb(20, 30, 10)',
  },
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/home',
  modules: {
    registroClasse: {
      obiettivi: true,
    },
    versioniLivello: {
      enabled: true,
    },
  },
};
const store = configureStore({}, {});
const mockIscritti = [{
  id: 666,
  username: 'giorgio.cappone@acme.com',
  first_name: 'Giorgio',
  last_name: 'Cappone',
  studenteAcademy: 8888,
},
{
  id: 7777,
  username: 'noemi.puma@acme.com',
  first_name: 'Noemi',
  last_name: 'Puma',
  studenteAcademy: 9999,
}];
const history = {};

const contenuto = {
  sortedData: [{
    name: 'elemento 1 name',
    nameSortable: 'elemento 1 nomeSortable',
    campo2: 'elemento 1 campo2',
  }, {
    name: 'elemento 2 name',
    nameSortable: 'elemento 2 nomeSortable',
    campo2: 'elemento 2 campo2',
  }, {
    name: 'elemento 3 name',
    nameSortable: 'elemento 3 nomeSortable',
    campo2: 'elemento 3 campo2',
  }],
  isCorsoLoaded: false,
  corsoNome: 'nome Corso',
  corsoId: 1000,
  corsoIscritti: mockIscritti,
  obiettivi: {
    isLoaded: false,
  },
  verificheLivello: {
    isLoaded: false,
  },
  intestazioniColonna: [{
    blocchi: ['obiettivi'],
    label: 'Studente',
    field: 'nameSortable',
    type: 'string',
    fieldsDisplay: [{
      field: 'name',
      function: 'detailDataFunction',
    }, {
      field: 'espelliStudente',
      function: 'espelliStudentefunction',
    }],
  }, {
    blocchi: ['verificheLivello'],
    label: 'Campo 2',
    field: 'campo2',
    type: 'string',
    fieldsDisplay: [{ field: 'campo2' }],
  }, {
    blocchi: ['obiettivi'],
    label: 'Completate',
    field: 'completate',
    type: 'number',
    fieldsDisplay: [{ field: 'completate' }],
  }],
};

const mockProps = {
  configuration,
  contenuto,
  match: {
    params: {
      id: '333',
    },
  },
  spinner: false,
  feedback: {
    hasFeedback: false,
    tipologia: 'okay',
    messaggio: 'messaggio',
  },
  display: {
    field: 'name',
    sort: 'asc',
    type: 'string',
    block: 'obiettivi',
  },
  userAnagraphics: {
    last_name: 'Cognome',
  },
  history: {
    push: () => { },
  },
  onEspelliStudente: () => { },
  onModalSetData: () => { },
  onClasseDettaglioCorsoFetch: () => { },
  onClasseDettaglioDisplaySort: () => { },
};

describe('<ClasseDettaglioView />', () => {
  it('visualizza il contenuto nel suo stato iniziale', () => {
    const renderedComponent = shallow(<ClasseDettaglioView {...mockProps} />);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il contenuto se corsoID == 0', () => {
    const props = {
      ...mockProps,
      contenuto: {
        ...mockProps.contenuto,
        corsoId: 0,
      },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('topBar deve rimandare alla pagina classi', () => {
    const props = {
      ...mockProps,
      history: { push: jest.fn() },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    expect(renderedComponent.find(TopBar).props().backNav).toEqual({
      enabled: true,
      onClickFunction: expect.any(Function),
    });

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).dive().find('TopBar__IconBtn').simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/classi');
  });

  it('visualizza il contenuto quando spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ClasseDettaglioView
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
      <ClasseDettaglioView
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

  it('visualizza il contenuto quando ordinamento è per media', () => {
    const props = {
      ...mockProps,
      visualizzazione: {
        ...mockProps.visualizzazione,
        field: 'media',
      },
    };
    const renderedComponent = shallow(
      <ClasseDettaglioView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('onClasseDettaglioCorsoFetch deve essere triggerato al componentDidMount', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioCorsoFetch: jest.fn(),
    };
    shallow(<ClasseDettaglioView {...props} />);
    expect(props.onClasseDettaglioCorsoFetch).toHaveBeenCalledWith({
      disciplinaId: 123,
      corsoId: 333,
      block: 'obiettivi',
      enabledBlocks: ['obiettivi', 'versioniLivello'],
      theme: {
        brand: 'rgb(20,203,200)',
        subtle: 'rgb(20, 30, 100)',
        light: 'rgb(20, 30, 10)',
      },
    });
  });

  it('onClasseDettaglioCorsoFetch se non ho blocchi attivi', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioCorsoFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: undefined,
      },
    };
    shallow(<ClasseDettaglioView {...props} />);
    expect(props.onClasseDettaglioCorsoFetch).toHaveBeenCalledWith({
      disciplinaId: 123,
      corsoId: 333,
      block: undefined,
      enabledBlocks: [],
      theme: {
        brand: 'rgb(20,203,200)',
        subtle: 'rgb(20, 30, 100)',
        light: 'rgb(20, 30, 10)',
      },
    });
  });

  it('changeDisplay deve chiamare onClasseDettaglioDataFetch', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioDataFetch: jest.fn(),
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onClasseDettaglioDataFetch).not.toHaveBeenCalled();
    instance.changeDisplay('blocco');
    expect(props.onClasseDettaglioDataFetch).toHaveBeenCalledWith({
      block: 'blocco',
      corsoId: 1000,
      corsoIscritti: mockIscritti,
      data: {
        obiettivi: {
          isLoaded: false,
        },
        versioniLivello: {
          isLoaded: false,
        },
      },
      historyPush: props.history.push,
      theme: {
        brand: 'rgb(20,203,200)',
        subtle: 'rgb(20, 30, 100)',
        light: 'rgb(20, 30, 10)',
      },
    });
  });

  it('changeDisplay deve chiamare onClasseDettaglioDataFetch se non ho contenuto[b.name]', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: undefined,
      },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onClasseDettaglioDataFetch).not.toHaveBeenCalled();
    instance.changeDisplay('blocco');
    expect(props.onClasseDettaglioDataFetch).toHaveBeenCalledWith({
      block: 'blocco',
      corsoId: 1000,
      corsoIscritti: mockIscritti,
      data: {},
      historyPush: props.history.push,
      theme: props.configuration.theme,
    });
  });

  it('calcolaBlockAttivi con tutti i moduli attivi', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: {
          verificheLivello: { enabled: true },
          versioniLivello: { enabled: true },
          versioniMissione: { enabled: true },
          provaCompetenza: { enabled: true },
          grigliaValutazione: { enabled: true },
          registroClasse: { obiettivi: true },
        },
      },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([
      {
        label: 'Obiettivi',
        name: 'obiettivi',
      },
      {
        label: 'Versioni',
        name: 'versioniLivello',
      },
      {
        label: 'Versioni',
        name: 'versioniMissione',
      },
      {
        id: 4,
        label: 'Verifiche',
        name: 'verificheLivello',
      },
      {
        id: 5,
        label: 'Prove competenza',
        name: 'proveCompetenza',
      },
      {
        id: 6,
        label: 'Valutazioni',
        name: 'grigliaValutazione',
      },
    ]);
  });

  it('calcolaBlockAttivi con dati vuoti', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: {
          registroClasse: {},
        },
      },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([]);
  });

  it('calcolaBlockAttivi con modules undefined', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: undefined,
      },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([]);
  });

  it('calcolaBlockAttivi con modules vuoti', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioDataFetch: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: {},
      },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(instance.calcolaBlockAttivi()).toEqual([]);
  });

  it('sortData deve inoltrare i dati a onClasseDettaglioDisplaySort', () => {
    const props = {
      ...mockProps,
      onClasseDettaglioDisplaySort: jest.fn(),
      configuration: {
        ...mockProps.configuration,
        modules: {
          registroClasse: {},
        },
      },
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onClasseDettaglioDisplaySort).not.toHaveBeenCalled();
    instance.sortData([1, 2, 3], { key: 1, key2: 2 });
    expect(props.onClasseDettaglioDisplaySort).toHaveBeenCalledWith(
      [1, 2, 3],
      { key: 1, key2: 2 }
    );
  });

  it('showDetailData deve aprire un popup con sottoTitolo', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const mockData = {
      sortedData: [{
        key1: 'val1a',
        key2: 'val2a',
      }, {
        key1: 'val1b',
        key2: 'val2b',
      }],
      field: 'key1',
      type: 'string',
      sort: 'desc',
      intestazioniColonna: [{
        label: 'Label 1',
        field: 'key1',
        type: 'string',
        fieldsDisplay: [{ field: 'key1' }],
      }, {
        label: 'Label 2',
        field: 'key2',
        type: 'string',
        fieldsDisplay: [{ field: 'key2' }],
      }],
      titolo: 'lel',
      sottoTitolo: 'giga lel',
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onModalSetData).not.toHaveBeenCalled();
    instance.showDetailData(mockData, 123);
    expect(props.onModalSetData).toHaveBeenCalledWith({
      topbar: true,
      titolo: mockData.titolo,
      isPopup: false,
      bgcolor: 'transparent',
      contenuto: (
        <Page full key="detail_data_123">
          <Container>
            <InfoStudente key="blocco_sottotitolo_123">
              <BrandTxt key="sottotitolo">giga lel</BrandTxt>
            </InfoStudente>
            <ReportGrid
              key="dettaglio_utente"
              intestazioniColonna={mockData.intestazioniColonna}
              righe={sortDataBySpecs(mockData.sortedData, {
                field: mockData.field,
                type: mockData.type,
                sort: mockData.sort,
              })}
              filtriAttivi={{
                field: mockData.field,
                sort: mockData.sort,
                type: mockData.type,
              }}
            />
          </Container>
        </Page>
      ),
      show: true,
    });
  });

  it('eliminaValutazione deve chiamare onmodalsetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const mockData = {
      id: 42,
      titolo: 'test',
    };
    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onModalSetData).not.toHaveBeenCalled();
    instance.eliminaValutazione(mockData);
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Elimina valutazione',
      contenuto: 'Sei sicuro di voler eliminare la valutazione<br /><strong>test</strong>',
      show: true,
      acceptButton: {
        onClick: expect.any(Function),
      },
    });
  });

  it('espelliStudente deve aprire un popup', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };

    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    const instance = renderedComponent.instance();

    expect(props.onModalSetData).not.toHaveBeenCalled();
    instance.espelliStudente({
      name: 'nome',
      studenteAcademyId: 444,
    });
    expect(props.onModalSetData).toHaveBeenCalledWith({
      titolo: 'Espulsione studente',
      contenuto: 'Si desidera espellere lo studente <strong>nome</strong> per la classe <strong>nome Corso</strong>?',
      acceptButton: {
        onClick: expect.any(Function),
      },
      show: true,
    });
  });

  it('se grigliaValutazione.enabled ButtonLink', () => {
    const props = {
      ...mockProps,
      configuration: {
        ...mockProps.configuration,
        modules: {
          ...mockProps.configuration.modules,
          grigliaValutazione: {
            enabled: true,
          },
        },
      },
    };

    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    expect(renderedComponent.find(ButtonLink).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('se grigliaValutazione.enabled ButtonLink non è presente', () => {
    const props = {
      ...mockProps,
      configuration: {
        ...mockProps.configuration,
        modules: {
          ...mockProps.configuration.modules,
          grigliaValutazione: {
            enabled: false,
          },
        },
      },
    };

    const renderedComponent = shallow(<ClasseDettaglioView {...props} />);
    expect(renderedComponent.find(ButtonLink).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ClasseDettaglio />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    connect()
  )(ClasseDettaglio);

  it('controllo che le props iniziali del componente siano settate correttamente', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={history}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(receivedProps.spinner).toEqual(false);
    expect(receivedProps.userAnagraphics).toEqual(defaultAnagraphicsSettings.toJS());
    expect(receivedProps.feedback).toEqual(defaultClasseDettaglioFeedback.toJS());
    expect(receivedProps.display).toEqual(defaultClasseDettaglioDisplay.toJS());
    expect(receivedProps.contenuto).toEqual(defaultClasseDettaglioContenuto.toJS());
  });

  it('controllo le funzioni di mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    receivedProps.onGrigliaValutazioniDettaglioFetch({ data: 777 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      grigliaValutazioneDettaglioFetch({ data: 777 })
    );

    receivedProps.onGrigliaValutazioniElimina({ data: 777 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      grigliaValutazioniElimina({ data: 777 })
    );

    receivedProps.onClasseDettaglioCorsoFetch({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classeDettaglioCorsoFetch({ data: 123 })
    );

    receivedProps.onClasseDettaglioDataFetch({ data: 456 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classeDettaglioDataFetch({ data: 456 })
    );

    receivedProps.onClasseDettaglioDisplaySort({ data: 678 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classeDettaglioDisplaySort({ data: 678 })
    );

    receivedProps.onEspelliStudente({ data: 987 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classeDettaglioEspelli({ data: 987 })
    );

    receivedProps.onModalSetData({ data: 765 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 765 })
    );

    receivedProps.onModalSetEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );
  });
});

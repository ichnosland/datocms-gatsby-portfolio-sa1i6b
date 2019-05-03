
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';
import TopBar from 'components/TopBar';
import ReportGrid from 'components/ReportGrid';
import userReducer from 'containers/User/reducer';
import BreadCrumb, { Crumb } from 'components/BreadCrumb';
import { TextButton } from 'components/Button';


import GrigliaValutazioniDettaglioStudente, {
  GrigliaValutazioniDettaglioStudenteView,
} from '../DettaglioValutazioneStudente';
import {
  defaultGrigliaValutazioniDettaglioStudente,
} from '../reducer';

const store = configureStore({}, {});
const history = { push: () => { } };

const mockProps = {
  configuration: {
    homePage: '/home',
    theme: {
      subtle: 'rgb(100, 20, 100)',
    },
  },
  dettaglioStudente: {
    isLoaded: true,
    nome: 'nome cognome',
    valutazioneTitolo: 'titolo valutazione',
    dataCreazioneValutazione: '11/11/2011',
    votoMedia: 5,
    corsoNome: '4 zoo',
    valutazioneId: 555,
    corsoId: 333,
    valutazioneTipologia: 'mista',
    versioni: [{
      titolo: 'versione 1',
      voto: 4.4,
    }, {
      titolo: 'versione 3',
      voto: 5,
    }, {
      titolo: 'versione 2',
      voto: 6,
    }, {
      titolo: 'versione 2',
      voto: 7,
    }],
    verifiche: [{
      titolo: 'verifica 1',
      voto: 6,
    }, {
      titolo: 'verifica 3',
      voto: 5,
    }],
    unita: [{
      titolo: 'unita 1',
      voto: 3,
    }, {
      titolo: 'unita 2',
      voto: 4,
    }, {
      titolo: 'unita 3',
      voto: 5,
    }, {
      titolo: 'unita 4',
      voto: 6,
    }],
    proveCompetenza: [{
      titolo: 'prova 1',
      voto: 10,
    }, {
      titolo: 'prova 3',
      voto: 5.33,
    }, {
      titolo: 'prova 2',
      voto: 7,
    }, {
      titolo: 'prova 4',
      voto: 7,
    }],
  },
  history: {
    push: () => { },
  },
};

describe('<GrigliaValutazioniDettaglioStudenteView />', () => {
  it('visualizza il contenuto nel suo stato iniziale', () => {
    const renderedComponent = shallow(<GrigliaValutazioniDettaglioStudenteView {...mockProps} />);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(4);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('button chiama window.print', () => {
    const renderedComponent = shallow(<GrigliaValutazioniDettaglioStudenteView {...mockProps} />);
    expect(renderedComponent.find(TopBar).dive().find('Button').length).toBe(1);
    const spy = jest.spyOn(window, 'print');
    renderedComponent.find(TopBar).dive().find('Button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('topBar deve rimandare alla pagina classe dettaglio', () => {
    const props = {
      ...mockProps,
      history: { push: jest.fn() },
    };
    const renderedComponent = shallow(<GrigliaValutazioniDettaglioStudenteView {...props} />);
    expect(renderedComponent.find(TopBar).props().backNav).toEqual({
      enabled: true,
      onClickFunction: expect.any(Function),
    });

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).dive().find('TopBar__IconBtn').simulate('click');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/griglia-valutazione-dettaglio/555',
      state: {
        corsoId: 333,
        corsoNome: '4 zoo',
        dataCreazione: '11/11/2011',
        id: 555,
        tipologia: 'mista',
        titolo: 'titolo valutazione',
      },
    });
  });

  it('visualizza il contenuto quando non ho dati', () => {
    const props = {
      ...mockProps,
      dettaglioStudente: {
        ...mockProps.dettaglioStudente,
        versioni: [],
        verifiche: [],
        proveCompetenza: [],
        unita: [],
      },
    };
    const renderedComponent = shallow(
      <GrigliaValutazioniDettaglioStudenteView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(ReportGrid).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('history.push essere triggerato al componentDidMount se !isLoaded', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      dettaglioStudente: {
        ...mockProps.dettaglioStudente,
        isLoaded: false,
      },
    };
    shallow(<GrigliaValutazioniDettaglioStudenteView {...props} />);
    expect(props.history.push).toHaveBeenCalledWith('/home');
  });

  it('click degli elementi delle breadcrumb', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };

    const renderedComponent = shallow(
      <GrigliaValutazioniDettaglioStudenteView {...props} />
    );
    expect(props.history.push).not.toHaveBeenCalled();
    expect(renderedComponent.find(BreadCrumb).length).toBe(1);
    expect(renderedComponent.find(Crumb).length).toBe(3);

    renderedComponent.find(BreadCrumb).find(Crumb).at(0).find(TextButton).simulate('click');
    expect(props.history.push).lastCalledWith('/classe-dettaglio/333/grigliavalutazione');

    renderedComponent.find(BreadCrumb).find(Crumb).at(1).find(TextButton).simulate('click');
    expect(props.history.push).lastCalledWith({
      pathname: '/griglia-valutazione-dettaglio/555',
      state: {
        id: 555,
        corsoId: 333,
        corsoNome: '4 zoo',
        dataCreazione: '11/11/2011',
        tipologia: 'mista',
        titolo: 'titolo valutazione',
      },
    });
  });
});

describe('<GrigliaValutazioniNew />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockProps.configuration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    connect()
  )(GrigliaValutazioniDettaglioStudente);

  it('controllo che le props iniziali del componente siano settate correttamente', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={history}
      />, { context: { store } }
    ).dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(receivedProps.dettaglioStudente).toEqual(defaultGrigliaValutazioniDettaglioStudente.toJS());
  });
});

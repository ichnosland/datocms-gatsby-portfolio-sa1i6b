import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import Spinner from 'components/Spinner';
import { AlertBanner } from 'components/AlertBanner';
import verificaReducer, {
  defaultVerificaFeedback,
  defaultVerificheLivello,
} from 'containers/Verifica/reducer';
import {
  verificaLivelloFetch,
  verificaLivelloSet,
  verificaStepInitialize,
} from 'containers/Verifica/actions';
import userReducer, { defaultAppData } from 'containers/User/reducer';
import corsiReducer, { defaultcorsoSelezionato } from 'containers/Corsi/reducer';
import modalBoxReducer from 'containers/ModalBox/reducer';

import VerificaStudente, { VerificheStudenteView } from '../index';
import VerificheLivelloOverview from '../VerificheLivelloStudenteOverview';


const mockConfiguration = {
  product: 'alatin',
  hasPremium: true,
  disciplinaId: 777,
  switcherMyTest: true,
  homePage: '/homepage',
};

const mockVerificheAssegnate = [
  {
    id: 16,
    unita: [{
      id: 1570,
      nome: 'Ripasso grammatica italiana: il verbo',
      domande: {
        conteggio_totale: 14,
        conteggio_lat_ita: 7,
      },
    }, {
      id: 161,
      nome: 'Ripasso analisi logica',
      domande: {
        conteggio_totale: 14,
        conteggio_lat_ita: 7,
      },
    }],
    titolo: 'Test di ingresso - 04/10/16',
    solo_latino: true,
    ritirata: true,
    consegnata: false,
  }, {
    id: 34,
    unita: [{
      id: 5,
      nome: 'Complementi in italiano',
      domande: {
        conteggio_totale: 15,
        conteggio_lat_ita: 6,
      },
    }],
    titolo: 'Test di ingresso - 12/10/16',
    solo_latino: false,
    ritirata: false,
    consegnata: false,
    in_corso: true,
  }, {
    id: 79,
    unita: [
      {
        id: 6,
        nome: 'Flessione nominale',
        domande: {
          conteggio_totale: 14,
          conteggio_lat_ita: 2,
        },
      },
    ],
    titolo: 'Test di ingresso - 26/10/16',
    solo_latino: false,
    ritirata: false,
    consegnata: true,
  }, {
    id: 709,
    unita: [
      {
        id: 16,
        nome: 'Titolo unità',
        domande: {
          conteggio_totale: 22,
          conteggio_lat_ita: 5,
        },
      },
    ],
    titolo: 'Test di ingresso - 11/10/13',
    solo_latino: false,
    ritirata: false,
    consegnata: false,
  }];

const mockProps = {
  spinner: false,
  dispatch: () => { },
  match: {
    params: {
      id: '123',
    },
  },
  history: {
    push: () => { },
  },
  configuration: mockConfiguration,
  feedback: {
    hasFeedback: false,
    tipologia: 'error',
    messaggio: 'messaggio',
  },
  verificaLivello: {
    verificheAssegnate: mockVerificheAssegnate,
    isLoaded: true,
    titolo: 'titolo verifica',
    unitSelectionEnabled: true,
  },
  onVerificaLivelloFetch: () => { },
  onVerificaStepInitialize: () => { },
  userAnagraphics: {
    id: 666,
  },
  userAppData: {
    enableSuoni: true,
    hints: {
      hint1: false,
      hint2: true,
    },
  },
};


describe('<VerificheStudenteView />', () => {
  it('!spinner !feedback.hasFeedback', () => {
    const renderedComponent = shallow(
      <VerificheStudenteView {...mockProps} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(AlertBanner).length).toBe(0);
    expect((renderedComponent).find(VerificheLivelloOverview).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('spinner !feedback.hasFeedback', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <VerificheStudenteView {...props} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(1);
    expect((renderedComponent).find(AlertBanner).length).toBe(0);
    expect((renderedComponent).find(VerificheLivelloOverview).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('!spinner feedback.hasFeedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <VerificheStudenteView {...props} />
    );

    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(AlertBanner).length).toBe(1);
    expect((renderedComponent).find(VerificheLivelloOverview).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('componentDidMount deve chiamare onVerificaLivelloFetch', () => {
    const props = {
      ...mockProps,
      onVerificaLivelloFetch: jest.fn(),
    };
    const spy = jest.spyOn(VerificheStudenteView.prototype, 'componentDidMount');
    const renderedComponent = shallow(
      <VerificheStudenteView {...props} />
    );

    renderedComponent.instance();
    expect(spy).toHaveBeenCalled();
    expect(props.onVerificaLivelloFetch).toHaveBeenCalledWith('123', false);
  });

  it('eseguiFunction deve chiamare onVerificaStepInitialize', () => {
    const props = {
      ...mockProps,
      onVerificaStepInitialize: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheStudenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.onVerificaStepInitialize).not.toHaveBeenCalled();

    instance.eseguiFunction(777);
    expect(props.onVerificaStepInitialize).toHaveBeenCalledWith({
      backUrl: '/verifiche-livello/123',
      id: 777,
      isDocente: false,
      userHints: {
        hint1: false,
        hint2: true,
      },
      historyPush: props.history.push,
      dispatchFunction: props.dispatch,
      productName: 'alatin',
      userId: 666,
      livelloId: 123,
      enableSuoni: true,
    });
  });

  it('visualizzaStatistiche deve chiamare history.push', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <VerificheStudenteView {...props} />
    );
    const instance = renderedComponent.instance();
    expect(props.history.push).not.toHaveBeenCalled();

    instance.visualizzaStatistiche();
    expect(props.history.push).toHaveBeenCalledWith('/verifiche-livello-statistiche/123');
  });
});


describe('<VerificaStudente />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerCorsi = injectReducer({ key: 'corsi', reducer: corsiReducer });
  const withReducerVerifica = injectReducer({ key: 'verifiche', reducer: verificaReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    withReducerCorsi,
    withReducerVerifica,
    withReducerModalBox,
    connect()
  )(VerificaStudente);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.corsoSelezionato).toEqual(defaultcorsoSelezionato.toJS());
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultVerificaFeedback.toJS());
    expect(receivedProps.verificaLivello).toEqual(defaultVerificheLivello.toJS());
  });

  it('testo il corretto funzionemento delle funzioni del mapDispatchToProps', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store: mockStore },
      }
    ).dive().dive().dive().dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onCreaVerificaSet({ data: 666 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaLivelloSet({
        datiVerifica: { data: 666 },
      })
    );

    receivedProps.onVerificaLivelloFetch(1, false);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaLivelloFetch(1, false)
    );

    receivedProps.onVerificaStepInitialize({ data: 4567 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      verificaStepInitialize({ data: 4567 })
    );
  });
});

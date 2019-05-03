import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import { StickyWrap } from 'components/StickyFooter';
import Spinner from 'components/Spinner';
import ContactForm from 'components/ContactForm';
import zendeskReducer, { defaultZendeskFeedback } from 'containers/ZendeskTicket/reducer';
import { zendeskTicketDataPost, zendeskTicketDataReset } from 'containers/ZendeskTicket/actions';
import userReducer, {
  defaultAppData,
  defaultAuthentication,
} from 'containers/User/reducer';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import ladingPageReducer from 'containers/LandingPage/reducer';
import { modalSetEmptyData } from 'containers/ModalBox/actions';

import ContattiComposed, { ContattiView } from '../index';

const configuration = {
  disciplinaId: 21,
  product: 'landingalatin',
  blocco: false,
  titoloApplicazione: 'Alatin Academy',
  Lyceum: '/',
  hasClassi: false,
};

const mockProps = {
  enableZigZagBorder: true,
  palette: {
    stickyTop: {
      bgColor: 'blue',
      buttonBg: 'pink',
      buttonColor: 'red',
      sectionBgColor: 'yellow',
    },
    section: {
      bgColor: 'green',
    },
  },
  configuration,
  richiestaInformazioniForm: {},
  userAppData: {
    docente: false,
  },
  userAuthentication: {
    logged: false,
  },
  feedback: {
    hasFeedback: false,
    tipologia: 'error',
    messaggio: 'messaggio errore',
  },
  spinner: false,
  onZendeskDataPost: () => { },
  landingPage: {
    isMenuOpened: true,
  },
  onlandingPageToggleMenu: () => {},
  match: {
    path: '/path',
  },
  onZendeskTicketDataReset: () => {},
  onModalEmptyData: () => {},
};

describe('<ContattiView />', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  it('mostro il form nelle condizioni iniziali', () => {
    const renderedComponent = shallow(
      <ContattiView {...mockProps} />
    );

    expect(renderedComponent.find(StickyWrap).length).toEqual(1);
    expect(renderedComponent.find(ContactForm).length).toEqual(1);
    expect(renderedComponent.find(Spinner).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('mostro il form nelle condizioni iniziali con basename', () => {
    process.env.BASENAME = '/basename/';
    const ContattiViewBasename = require('../index').ContattiView; // eslint-disable-line global-require

    const renderedComponent = shallow(
      <ContattiViewBasename {...mockProps} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('senza enableZigZagBorder', () => {
    const props = {
      ...mockProps,
      enableZigZagBorder: true,
    };
    const renderedComponent = shallow(
      <ContattiView {...props} />
    );

    expect(renderedComponent.find(StickyWrap).length).toEqual(1);
    expect(renderedComponent.find(ContactForm).length).toEqual(1);
    expect(renderedComponent.find(Spinner).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('nascondo il form in presenza dello spinner', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ContattiView {...props} />
    );

    expect(renderedComponent.find(StickyWrap).length).toEqual(1);
    expect(renderedComponent.find(ContactForm).length).toEqual(0);
    expect(renderedComponent.find(Spinner).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('nascondo il form in presenza dello spinner', () => {
    const props = {
      ...mockProps,
      onZendeskDataPost: jest.fn(),
      richiestaInformazioniForm: {
        values: {
          nome: 'nome',
          email: 'email',
          descrizione: 'descrizione',
          citta: 'citta',
          ruolo: 'ruolo',
          scuola: 'scuola',
        },
      },
    };
    const renderedComponent = shallow(
      <ContattiView {...props} />
    );
    const instance = renderedComponent.instance();

    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onZendeskDataPost).toHaveBeenCalledWith({
      configuration,
      ticketData: {
        provenienza: 'form_contatti',
        titolo: 'Richiesta informazioni',
        tipologia: 'comunicazione',
        nome: 'nome',
        email: 'email',
        descrizione: 'descrizione',
        citta: 'citta',
        ruolo: 'ruolo',
        scuola: 'scuola',
        isUserLogged: false,
        isDocente: false,
      },
    });
  });

  it('componentWillUnmount', () => {
    const props = {
      ...mockProps,
      onZendeskTicketDataReset: jest.fn(),
      onModalEmptyData: jest.fn(),
    };
    const renderedComponent = shallow(
      <ContattiView {...props} />
    );
    const instance = renderedComponent.instance();

    instance.componentWillUnmount();
    expect(props.onZendeskTicketDataReset).toHaveBeenCalledWith();
    expect(props.onModalEmptyData).toHaveBeenCalledWith();
  });
});

describe('<ContattiComposed />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withZendeskReducer = injectReducer({ key: 'zendeskTicket', reducer: zendeskReducer });
  const withUserReducer = injectReducer({ key: 'user', reducer: userReducer });
  const withLandingConfiguration = injectReducer({ key: 'landingPage', reducer: ladingPageReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withZendeskReducer,
    withUserReducer,
    withLandingConfiguration,
    connect()
  )(ContattiComposed);
  const mockStore = configureStore({}, {});

  const props = {
    enableZigZagBorder: true,
    match: mockProps.match,
    palette: mockProps.palette,
  };

  it('testo le props iniziali', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper {...props} />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive().dive();

    const receivedProps = renderedComponent.props();
    expect(receivedProps.configuration).toEqual(configuration);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.userAuthentication).toEqual(defaultAuthentication.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultZendeskFeedback.toJS());
  });

  it('mapDispatchToProps', () => {
    mockStore.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper {...props} />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive().dive();

    const receivedProps = renderedComponent.props();
    const payload = {
      user: 'nome utente',
      email: 'pippo@example.com',
    };
    expect(mockStore.dispatch).not.toHaveBeenCalled();
    receivedProps.onZendeskDataPost(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(zendeskTicketDataPost(payload));

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );
    receivedProps.onlandingPageToggleMenu(true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );

    receivedProps.onZendeskTicketDataReset();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      zendeskTicketDataReset()
    );

    receivedProps.onModalEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );
  });
});

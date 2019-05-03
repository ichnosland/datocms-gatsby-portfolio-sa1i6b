import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fromJS } from 'immutable';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import userReducer, {
  defaultAppData,
  defaultAuthentication,
  defaultAnagraphicsSettings,
} from 'containers/User/reducer';
import { Button } from 'components/Button';
import Spinner from 'components/Spinner';
import Section from 'components/Section';
import WhatsAppBanner from 'components/Profilo/WhatsAppBanner';
import AlertBanner from 'components/AlertBanner';
import { modalSetEmptyData } from 'containers/ModalBox/actions';
import { defaultZendeskFeedback } from '../reducer';
import ZendeskForm, {
  ZendeskFormView,
  validate,
  validateNome,
  validateEmail,
} from '../FeedbackForm';
import { zendeskTicketDataPost, zendeskTicketDataReset } from '../actions';
import ZendeskTicket, { ZendeskTicketView } from '../index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};
const store = configureStore({}, {});
const history = {};

const mockProps = {
  spinner: true,
  configuration: mockConfiguration,
  userAppData: {
    docente: true,
  },
  userAuthentication: {
    logged: true,
  },
  userAnagraphics: {
    email: 'pippo.pluto@maieuticallabs.it',
    first_name: 'Pippo',
    last_name: 'Pluto',
  },
  feedback: {
    hasFeedback: false,
    tipologia: 'okay',
    messaggio: 'messaggio',
  },
  onModalEmptyData: () => { },
  onZendeskDataPost: () => { },
  onZendeskTicketDataReset: () => { },
  ticketData: {},
  feedbackFormData: {},
};

describe('<ZendeskTicketView />', () => {
  it('Testo lo stato quando lo spinner è attivo', () => {
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...mockProps}
      />
    );
    expect(renderedComponent.find(ZendeskForm).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(Section).length).toBe(0);
    expect(renderedComponent.find(WhatsAppBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Testo lo stato quando lo spinner non è attivo', () => {
    const props = {
      ...mockProps,
      spinner: false,
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    expect(renderedComponent.find(ZendeskForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(WhatsAppBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Testo lo stato quando AlertBanner è attivo', () => {
    const props = {
      ...mockProps,
      spinner: false,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    expect(renderedComponent.find(ZendeskForm).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(WhatsAppBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Testo lo di onclick del pulsante di chiusura quando il feedback è attivo', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskTicketDataReset: jest.fn(),
      onModalEmptyData: jest.fn(),
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(props.onModalEmptyData).not.toHaveBeenCalled();
    expect(props.onZendeskTicketDataReset).not.toHaveBeenCalled();
    renderedComponent.find(Button).props().onClick();
    expect(props.onModalEmptyData).toHaveBeenCalled();
    expect(props.onZendeskTicketDataReset).toHaveBeenCalled();
  });

  it('Non devo esplodere quando feedbackFormData non è settato', () => {
    const props = {
      ...mockProps,
      spinner: false,
      feedbackFormData: undefined,
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    expect(renderedComponent.find(ZendeskForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(WhatsAppBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('ZendeskFormView > handleClose deve chiamare onZendeskTicketDataReset e onModalEmptyData', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskTicketDataReset: jest.fn(),
      onModalEmptyData: jest.fn(),
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );

    expect(props.onZendeskTicketDataReset).not.toHaveBeenCalled();
    expect(props.onModalEmptyData).not.toHaveBeenCalled();

    renderedComponent.find(ZendeskForm).props().handleClose();
    expect(props.onZendeskTicketDataReset).toHaveBeenCalled();
    expect(props.onModalEmptyData).toHaveBeenCalled();
  });

  it('controllo funzionamento di onSubmit se l\'utente è loggato', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskDataPost: jest.fn(),
      feedbackFormData: {
        values: {
          tipologia: 'tipologia',
          descrizione: 'descrizione',
        },
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onZendeskDataPost).not.toHaveBeenCalled();
    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onZendeskDataPost).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      ticketData: {
        descrizione: 'descrizione',
        tipologia: 'tipologia',
        email: 'pippo.pluto@maieuticallabs.it',
        isDocente: true,
        isUserLogged: true,
        nome: 'Pippo Pluto',
      },
    });
  });


  it('controllo funzionamento di onSubmit su tutti i possibili feedbackFormData.values', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskDataPost: jest.fn(),
      feedbackFormData: {
        values: {
          tipologia: 'tipologia',
          descrizione: 'descrizione',
          citta: 'citta',
          ruolo: 'ruolo',
          scuola: 'scuola',
          tipologiaAdozione: 'tipologiaAdozione',
          classeSezione: 'classeSezione',
          indirizzoDiStudio: 'indirizzoDiStudio',
          piattaforma: { alatin: true, lyceum: false, altraProp: true },
        },
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onZendeskDataPost).not.toHaveBeenCalled();
    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onZendeskDataPost).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      ticketData: {
        descrizione: 'descrizione',
        tipologia: 'tipologia',
        email: 'pippo.pluto@maieuticallabs.it',
        isDocente: true,
        isUserLogged: true,
        nome: 'Pippo Pluto',
        citta: 'citta',
        ruolo: 'ruolo',
        scuola: 'scuola',
        tipologiaAdozione: 'tipologiaAdozione',
        classeSezione: 'classeSezione',
        indirizzoDiStudio: 'indirizzoDiStudio',
        piattaforma: 'alatin, altraProp',
      },
    });
  });

  it('onSubmit deve fare un fallback sui parametri di props.ticketData.tipologia se non presente la tipologia', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskDataPost: jest.fn(),
      ticketData: {
        tipologia: 'tipologia_ticketdata',
      },
      feedbackFormData: {
        values: {},
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onZendeskDataPost).not.toHaveBeenCalled();
    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onZendeskDataPost).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      ticketData: {
        tipologia: 'tipologia_ticketdata',
        email: 'pippo.pluto@maieuticallabs.it',
        isDocente: true,
        isUserLogged: true,
        nome: 'Pippo Pluto',
      },
    });
  });

  it('controllo funzionamento di onSubmit se l\'utente non è loggato', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskDataPost: jest.fn(),
      userAuthentication: {
        logged: false,
      },
      feedbackFormData: {
        values: {
          tipologia: 'tipologia',
          descrizione: 'descrizione',
          nome: 'nome inserito',
          email: 'email.inserita@example.com',
          piattaforma: {
            key1: true,
            key2: false,
            key3: true,
          },
        },
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onZendeskDataPost).not.toHaveBeenCalled();
    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onZendeskDataPost).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      ticketData: {
        descrizione: 'descrizione',
        tipologia: 'tipologia',
        email: 'email.inserita@example.com',
        isDocente: true,
        isUserLogged: false,
        nome: 'nome inserito',
        piattaforma: 'key1, key3',
      },
    });
  });

  it('controllo funzionamento di onSubmit quando ticketdata è undefined', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskDataPost: jest.fn(),
      feedbackFormData: {
        values: {
          tipologia: 'tipologia',
          descrizione: 'descrizione',
        },
      },
      ticketData: undefined,
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onZendeskDataPost).not.toHaveBeenCalled();
    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onZendeskDataPost).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      ticketData: {
        descrizione: 'descrizione',
        tipologia: 'tipologia',
        email: 'pippo.pluto@maieuticallabs.it',
        isDocente: true,
        isUserLogged: true,
        nome: 'Pippo Pluto',
      },
    });
  });

  it('controllo funzionamento di onSubmit quando faccio override dati utente (utente offline)', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskDataPost: jest.fn(),
      feedbackFormData: {
        values: {
          tipologia: 'tipologia',
          descrizione: 'descrizione',
        },
      },
      ticketData: {
        nome: 'Paolino Paperino',
        email: 'paolino.paperino@maieuticallabs.it',
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onZendeskDataPost).not.toHaveBeenCalled();
    instance.onSubmit({ preventDefault: () => { } });
    expect(props.onZendeskDataPost).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      ticketData: {
        descrizione: 'descrizione',
        tipologia: 'tipologia',
        email: 'paolino.paperino@maieuticallabs.it',
        isDocente: true,
        isUserLogged: true,
        nome: 'Paolino Paperino',
      },
    });
  });

  it('se passo un finto componente, deve utilizzare quello al posto del form di base', () => {
    const props = {
      ...mockProps,
      spinner: false,
      formConfiguration: {
        component: jest.fn(),
        props: {
          formtitle: 'titolo del form',
          alatin: true,
        },
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );

    const mockedComponentProps = renderedComponent.find('mockConstructor').props();
    expect(mockedComponentProps.alatin).toBe(true);
    expect(mockedComponentProps.feedback).toEqual({
      hasFeedback: false,
      messaggio: 'messaggio',
      tipologia: 'okay',
    });
    expect(mockedComponentProps.formtitle).toBe('titolo del form');
    expect(mockedComponentProps.hasAnagraphics).toBe(false);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('closeFeedbackFunction deve chiamare onZendeskTicketDataReset e onModalEmptyData', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskTicketDataReset: jest.fn(),
      onModalEmptyData: jest.fn(),
      formConfiguration: {
        component: jest.fn(),
        props: {
          formtitle: 'titolo del form',
          alatin: true,
        },
      },
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );

    const mockedComponentProps = renderedComponent.find('mockConstructor').props();
    expect(props.onZendeskTicketDataReset).not.toHaveBeenCalled();
    expect(props.onModalEmptyData).not.toHaveBeenCalled();
    mockedComponentProps.closeFeedbackFunction();
    expect(props.onZendeskTicketDataReset).toHaveBeenCalled();
    expect(props.onModalEmptyData).toHaveBeenCalled();
  });

  it('componentWillUnmount deve chiamare onZendeskTicketDataReset e onModalEmptyData', () => {
    const props = {
      ...mockProps,
      spinner: false,
      onZendeskTicketDataReset: jest.fn(),
      onModalEmptyData: jest.fn(),
    };
    const renderedComponent = shallow(
      <ZendeskTicketView
        {...props}
      />
    );
    const instance = renderedComponent.instance();

    expect(props.onZendeskTicketDataReset).not.toHaveBeenCalled();
    expect(props.onModalEmptyData).not.toHaveBeenCalled();
    instance.componentWillUnmount();
    expect(props.onZendeskTicketDataReset).toHaveBeenCalled();
    expect(props.onModalEmptyData).toHaveBeenCalled();
  });
});

describe('<ZendeskTicket />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withUserReducer = injectReducer({ key: 'user', reducer: userReducer });
  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withUserReducer,
    connect()
  )(ZendeskTicket);

  it('controllo che le props iniziali siano quelle attese', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={mockProps.match}
        history={history}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.spinner).toEqual(false);
    expect(receivedProps.feedback).toEqual(defaultZendeskFeedback.toJS());
    expect(receivedProps.feedbackFormData).toEqual(undefined);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.userAnagraphics).toEqual(defaultAnagraphicsSettings.toJS());
    expect(receivedProps.userAuthentication).toEqual(defaultAuthentication.toJS());
  });

  it('controllo il comportamento di mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={mockProps.match}
        history={history}
      />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    receivedProps.onModalEmptyData();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );

    receivedProps.onZendeskDataPost({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      zendeskTicketDataPost({ data: 123 })
    );

    receivedProps.onZendeskTicketDataReset();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      zendeskTicketDataReset()
    );
  });
});


describe('<validateNome />', () => {
  it('controllo il corretto funzionamento quando è undefined', () => {
    expect(validateNome(undefined)).toEqual('Campo obbligatorio');
  });

  it('controllo il corretto funzionamento quando è vuoto', () => {
    expect(validateNome('')).toEqual('Campo obbligatorio');
  });

  it('controllo il corretto funzionamento quando è .length < 3', () => {
    expect(validateNome('12')).toEqual('Devi inserire almeno 3 caratteri');
  });

  it('controllo il corretto funzionamento quando .length >= 3', () => {
    expect(validateNome('1234')).toEqual(undefined);
  });
});


describe('<validateEmail />', () => {
  it('controllo il corretto funzionamento quando è undefined', () => {
    expect(validateEmail(undefined)).toEqual('Campo obbligatorio');
  });

  it('controllo il corretto funzionamento quando è vuoto', () => {
    expect(validateEmail('')).toEqual('Campo obbligatorio');
  });

  it('controllo il corretto funzionamento quando ho una stringa a caso', () => {
    expect(validateEmail('1234')).toEqual('Indirizzo email non valido');
  });

  it('controllo il corretto funzionamento quando ho una mail valida', () => {
    expect(validateEmail('acme@acme.com')).toEqual(undefined);
  });

  it('controllo il corretto funzionamento quando ho una mail valida con alias', () => {
    expect(validateEmail('acme+alias@acme.com')).toEqual(undefined);
  });
});


describe('<validate />', () => {
  it('dà errore se tipologia e descrizione sono undefined', () => {
    expect(validate(fromJS({
      tipologia: undefined,
      descrizione: undefined,
    }))).toEqual({
      tipologia: 'Campo obbligatorio',
      descrizione: 'Campo obbligatorio',
    });
  });

  it('dà errore se descrizione.length < 3', () => {
    expect(validate(fromJS({
      tipologia: 'tipologia',
      descrizione: '12',
    }))).toEqual({
      tipologia: undefined,
      descrizione: 'Devi inserire almeno 3 caratteri',
    });
  });

  it('dà errore se i campi sono compilati correttamente', () => {
    expect(validate(fromJS({
      tipologia: 'tipologia',
      descrizione: 'descrizione',
    }))).toEqual({
      tipologia: undefined,
      descrizione: undefined,
    });
  });
});

describe('<ZendeskFormView />', () => {
  const mockPropsForm = {
    handleSubmit: () => { },
    handleClose: () => { },
    pristine: false,
    hasAnagraphics: false,
    errors: {},
    fields: {},
  };

  it('controllo il corretto funzionamento del form nello stato iniziale', () => {
    const renderedComponent = shallow(
      <ZendeskFormView {...mockPropsForm} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo il corretto funzionamento del form quando hasAnagraphics == true', () => {
    const props = {
      ...mockPropsForm,
      hasAnagraphics: true,
    };
    const renderedComponent = shallow(
      <ZendeskFormView {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo il corretto funzionamento del form con errori', () => {
    const props = {
      ...mockPropsForm,
      hasAnagraphics: true,
      errors: {
        tipologia: 'Errore tipologia',
        descrizione: 'Errore descrizione',
        nome: 'Errore nome',
        email: 'Errore email',
      },
    };
    const renderedComponent = shallow(
      <ZendeskFormView {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo il corretto funzionamento del form quando errors è undefined', () => {
    const props = {
      ...mockPropsForm,
      hasAnagraphics: true,
      errors: undefined,
    };
    const renderedComponent = shallow(
      <ZendeskFormView {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});

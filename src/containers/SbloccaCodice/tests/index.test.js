import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from 'redux-form/immutable';
import { fromJS } from 'immutable';

import injectReducer from 'utils/injectReducer';

import Spinner from 'components/Spinner';
import TopBar from 'components/TopBar';
import AlertBanner from 'components/AlertBanner';
import reducerCurryer from 'common/applications/reducer';
import { modalSetData } from 'containers/ModalBox/actions';
import userReducer from 'containers/User/reducer';
import SbloccaCodice, {
  SbloccaCodiceView,
} from '../index';
import sbloccaCodiceReducer, { defaultSbloccaCodiceFeedback } from '../reducer';
import {
  sbloccaCodiceSbloccaPost,
  sbloccaCodiceAcquistaSet,
  sbloccaCodiceAcquistaPost,
  sbloccaCodiceAcquistaFetch,
  sbloccaCodiceFeedbackReset,
} from '../actions';
import SbloccaCodiceForm from '../SbloccaCodiceForm';
import AcquistaForm from '../AcquistaForm';
import validate from '../validator';


const configuration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  payPalButtonId: '123456789',
};
const store = configureStore({}, {});
const history = {
  push: () => { },
};

const sbloccaProps = {
  configuration,
  sbloccaCodice: {
    spinner: false,
    feedback: {
      hasFeedback: false,
      tipologia: 'tipologia',
      messaggio: 'messaggio',
    },
    paypal: {
      prodottiDisponibili: [{
        id: 1,
        prezzo: 3.4,
        descrizione: 'descrizione',
        order_data: 'order_data_1',
      }, {
        id: 2,
        prezzo: 5.5,
        descrizione: 'scrizionede',
        order_data: 'order_data_2',
      }],
      display: true,
    },
  },
  formSblocco: {
    values: {
      codice: '123-codice',
    },
  },
  history,
  formAcquista: {},
  onResetFormSbloccaCodice: () => { },
  onResetFormAcquista: () => { },
  onSbloccaCodiceAcquistaFetch: () => { },
  onSbloccaCodiceAcquistaSet: () => { },
  onSbloccaCodiceAcquistaPost: () => { },
  onSbloccaCodiceFeedbackReset: () => { },
  onModalSetData: () => { },
  onModalSetEmptyData: () => { },
  onSendCodice: () => { },
  userAnagraphics: {
    first_name: 'nome',
    last_name: 'cognome',
    email: 'acme@acme.com',
  },
  userAppData: {
    docente: false,
  },
};


describe('<SbloccaCodiceView />', () => {
  it('visualizza un container con uno spinner al suo interno e paypal.display == false', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        spinner: true,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: false,
        },
      },
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(SbloccaCodiceForm).length).toBe(0);
    expect(renderedComponent.find(AcquistaForm).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza un container con uno spinner e paypal.display == true mostra messaggio', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        spinner: true,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: true,
        },
      },
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(SbloccaCodiceForm).length).toBe(0);
    expect(renderedComponent.find(AcquistaForm).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il SbloccaCodiceForm', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: false,
        },
      },
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(SbloccaCodiceForm).length).toBe(1);
    expect(renderedComponent.find(AcquistaForm).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
  });

  it('visualizza AcquistaForm', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: true,
        },
      },
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(SbloccaCodiceForm).length).toBe(0);
    expect(renderedComponent.find(AcquistaForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
  });

  it('SbloccaCodiceForm.handleSubmit deve richiamare la prop onSendCodice', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: false,
        },
      },
      onSendCodice: jest.fn(),
      onResetFormSbloccaCodice: jest.fn(),
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );

    expect(props.onSendCodice).not.toHaveBeenCalled();
    renderedComponent.find(SbloccaCodiceForm).props().handleSubmit({ preventDefault: () => { } });
    expect(props.onSendCodice).toHaveBeenCalledWith(
      props.formSblocco.values.codice,
      configuration,
      props.history
    );
    expect(props.onResetFormSbloccaCodice).toHaveBeenCalled();
  });

  it('SbloccaCodiceForm.togglePaypalBox se i dati non sono stati caricati', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: false,
        },
      },
      onSbloccaCodiceAcquistaFetch: jest.fn(),
      onSbloccaCodiceAcquistaSet: jest.fn(),
      onSbloccaCodiceFeedbackReset: jest.fn(),
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );

    const instance = renderedComponent.instance();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceFeedbackReset).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    instance.togglePaypalBox();
    expect(props.onSbloccaCodiceAcquistaFetch).toHaveBeenCalledWith(123);
    expect(props.onSbloccaCodiceFeedbackReset).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceAcquistaSet).toHaveBeenCalledWith({
      display: true,
    });
  });

  it('SbloccaCodiceForm.togglePaypalBox se i dati sono già caricati', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: false,
          isLoaded: true,
        },
      },
      onSbloccaCodiceAcquistaFetch: jest.fn(),
      onSbloccaCodiceAcquistaSet: jest.fn(),
      onSbloccaCodiceFeedbackReset: jest.fn(),
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );

    const instance = renderedComponent.instance();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceFeedbackReset).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    instance.togglePaypalBox();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceFeedbackReset).toHaveBeenCalled();
    expect(props.onSbloccaCodiceAcquistaSet).toHaveBeenCalledWith({
      display: true,
    });
  });

  it('SbloccaCodiceForm.togglePaypalBox se devo nascondere acquista', () => {
    const props = {
      ...sbloccaProps,
      sbloccaCodice: {
        ...sbloccaProps.sbloccaCodice,
        paypal: {
          ...sbloccaProps.sbloccaCodice.paypal,
          display: true,
          isLoaded: true,
        },
      },
      onSbloccaCodiceAcquistaFetch: jest.fn(),
      onSbloccaCodiceAcquistaSet: jest.fn(),
      onSbloccaCodiceFeedbackReset: jest.fn(),
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );

    const instance = renderedComponent.instance();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceFeedbackReset).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    instance.togglePaypalBox();
    expect(props.onSbloccaCodiceAcquistaFetch).not.toHaveBeenCalled();
    expect(props.onSbloccaCodiceFeedbackReset).toHaveBeenCalled();
    expect(props.onSbloccaCodiceAcquistaSet).toHaveBeenCalledWith({
      display: false,
    });
  });

  it('paymentPaypal deve restituire la crezione delle transaction', () => {
    const renderedComponent = shallow(
      <SbloccaCodiceView {...sbloccaProps} />
    );

    const actions = {
      payment: {
        create: jest.fn(),
      },
    };
    const instance = renderedComponent.instance();
    instance.paymentPaypal(undefined, actions, {
      total: 123,
      currency: 'EUR',
      description: 'description',
    });
    expect(actions.payment.create).toHaveBeenCalledWith({
      transactions: [{
        amount: {
          total: 123,
          currency: 'EUR',
        },
        description: 'description',
      }],
    });
  });

  it('authorizePaypal deve restituire i dati del pagamento', () => {
    const props = {
      ...sbloccaProps,
      onSbloccaCodiceAcquistaPost: jest.fn(),
      onResetFormAcquista: jest.fn(),
    };
    const renderedComponent = shallow(
      <SbloccaCodiceView {...props} />
    );

    const mockThen = (data) => (data({ id: 'PAYPAL_ID' }));
    const actions = {
      payment: {
        execute: () => ({ then: mockThen }),
      },
    };
    const instance = renderedComponent.instance();
    instance.authorizePaypal(undefined, actions, 'order_data');
    expect(props.onSbloccaCodiceAcquistaPost).toHaveBeenCalledWith(
      'PAYPAL_ID', 'order_data', configuration, {
        email: 'acme@acme.com',
        isDocente: false,
        nome: 'nome cognome',
      }
    );
    expect(props.onResetFormAcquista).toHaveBeenCalled();
  });
});

describe('<SbloccaCodice />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerSbloccaCodice = injectReducer({ key: 'sbloccaCodice', reducer: sbloccaCodiceReducer });
  const withUserReducer = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerSbloccaCodice,
    withUserReducer,
    connect()
  )(SbloccaCodice);

  it('controllo che le props iniziali del componente siano settate correttamente', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { store } }
    ).dive().dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(receivedProps.sbloccaCodice.feedback).toEqual(defaultSbloccaCodiceFeedback.toJS());
    expect(receivedProps.sbloccaCodice.spinner).toEqual(false);
  });

  it('controllo che onSendCodice faccia il dispatch di sbloccaCodiceSbloccaPost', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
    receivedProps.onSendCodice(sbloccaProps.formSblocco.values.codice, configuration);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      sbloccaCodiceSbloccaPost(sbloccaProps.formSblocco.values.codice, configuration)
    );
  });

  it('controllo mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper history={history} />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    receivedProps.onSendCodice(1, 2, 3);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      sbloccaCodiceSbloccaPost(1, 2, 3)
    );

    receivedProps.onResetFormSbloccaCodice();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      reset('sbloccaCodice')
    );

    receivedProps.onResetFormAcquista();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      reset('acquista')
    );

    receivedProps.onSbloccaCodiceFeedbackReset();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      sbloccaCodiceFeedbackReset()
    );

    receivedProps.onSbloccaCodiceAcquistaFetch(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      sbloccaCodiceAcquistaFetch(1)
    );

    receivedProps.onSbloccaCodiceAcquistaSet({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      sbloccaCodiceAcquistaSet({ data: 123 })
    );

    receivedProps.onSbloccaCodiceAcquistaPost(1, 'orderData', 4);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      sbloccaCodiceAcquistaPost(1, 'orderData', 4)
    );

    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );
  });
});


describe('<SbloccaCodiceView />', () => {
  it('controllo che il comportamento del validate sia corretto', () => {
    expect(validate(fromJS({ codice: '1234' }))).toEqual({});
    expect(validate(fromJS({ codice: undefined }))).toEqual({
      codice: 'Campo obbligatorio',
    });
  });
});

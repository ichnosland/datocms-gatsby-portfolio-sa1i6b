
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { reset } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import AlertBanner from 'components/AlertBanner';
import { CardForm } from 'components/FormElements';
import reducerCurryer from 'common/applications/reducer';
import userReducer from 'containers/User/reducer';
import { defaultClassiStudenteState } from '../reducer';
import { classiStudenteFetch, classiStudenteIscrivitiPost } from '../actions';
import ClassiStudente, {
  ClassiStudenteView,
  required,
  validate,
} from '../index';


const configuration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  payPalButtonId: '123456789',
  homePage: '/homepage',
};
const store = configureStore({}, {});
const history = {};
const mockProps = {
  configuration,
  spinner: false,
  feedback: {
    hasFeedback: false,
    tipologia: 'okay',
    messaggio: 'messaggio',
  },
  list: [{
    pk: 1,
    nome: 'corso 1',
  }, {
    pk: 2,
    nome: 'corso 2',
  }],
  onClassiStudenteFetch: () => { },
  onClassiStudentePost: () => { },
  onResetForm: () => { },
  formIscrizioneData: {},
  history: {
    push: () => { },
  },
  userAuthentication: {
    codiceDaSbloccare: false,
  },
};

describe('<ClassiStudenteView />', () => {
  it('visualizza il contenuto nel suo stato iniziale', () => {
    const renderedComponent = shallow(
      <ClassiStudenteView
        store={store}
        history={history}
        {...mockProps}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il contenuto quando spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ClassiStudenteView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(CardForm).length).toBe(0);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il contenuto quando ha un feedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <ClassiStudenteView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il contenuto quando non ho corsi', () => {
    const props = {
      ...mockProps,
      list: [],
    };
    const renderedComponent = shallow(
      <ClassiStudenteView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('handleSubmit deve chiamare onClassiStudentePost e onResetForm', () => {
    const props = {
      ...mockProps,
      onClassiStudentePost: jest.fn(),
      onResetForm: jest.fn(),
      formIscrizioneData: {
        values: {
          codice: 'codice123',
        },
      },
    };
    const renderedComponent = shallow(
      <ClassiStudenteView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(props.onClassiStudentePost).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.handleSubmit({ preventDefault: () => { } });
    expect(props.onClassiStudentePost).toHaveBeenCalledWith(
      'codice123', configuration
    );
  });

  it('se codiceDaSbloccare == true devo fare history.push della home', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      userAuthentication: {
        codiceDaSbloccare: true,
      },
    };
    expect(props.history.push).not.toHaveBeenCalled();

    shallow(
      <ClassiStudenteView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(props.history.push).toHaveBeenCalledWith('/homepage');
  });
});

describe('<ClassiStudente />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    connect()
  )(ClassiStudente);

  it('controllo che le props iniziali del componente siano settate correttamente', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store } }
    ).dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    expect(receivedProps.feedback).toEqual(defaultClassiStudenteState.toJS());
    expect(receivedProps.spinner).toEqual(false);
    expect(receivedProps.list).toEqual([]);
  });

  it('controllo le funzioni di mapDispatchToProps', () => {
    const mockStore = store;
    mockStore.dispatch = jest.fn();
    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    receivedProps.onClassiStudenteFetch(123);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classiStudenteFetch(123)
    );

    receivedProps.onClassiStudentePost('codice123', configuration);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      classiStudenteIscrivitiPost('codice123', configuration)
    );

    receivedProps.onResetForm();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      reset('sbloccaCodice')
    );
  });
});

describe('<required />', () => {
  it('se valore non è settato', () => {
    expect(required(undefined)).toBe('Campo obbligatorio');
  });

  it('se valore non è settato', () => {
    expect(required('valore')).toBe(undefined);
  });
});

describe('<validate />', () => {
  it('se valore non è settato', () => {
    expect(validate(fromJS({
      codice: '',
    }))).toEqual({ codice: 'Campo obbligatorio' });
  });

  it('se regex non fa match', () => {
    expect(validate(fromJS({
      codice: 'aaa',
    }))).toEqual({ codice: 'Inserire un codice corretto' });

    expect(validate(fromJS({
      codice: '333aa',
    }))).toEqual({ codice: 'Inserire un codice corretto' });
  });

  it('se valore è corretto', () => {
    expect(validate(fromJS({
      codice: 'aaaa343242',
    }))).toEqual({});
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import Container from 'components/Container';
import Div from 'components/Div';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import testoIntroduttivoReducer from 'containers/TestoIntroduttivo/reducer';
import AlertBanner from 'components/AlertBanner';
import TestoIntroduttivo, { TestoIntroduttivoView, HtmlText } from '../index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};
const store = configureStore({}, {});
const history = {};

const mockProps = {
  configuration: mockConfiguration,
  history: {
    push: jest.fn(),
  },
  match: {
    params: {
      id: '123',
    },
  },
  testoIntroduttivo: {
    spinner: false,
    error: {
      hasErrors: false,
      errorMessage: '',
    },
    testoData: {
      titolo: 'Titolo',
      testo: 'Testo',
    },
  },
  onDataFetch: jest.fn(),
};

describe('<TestoIntroduttivoView />', () => {
  it('testo il render quando vengono mostrati i contenuti', () => {
    const renderedComponent = shallow(
      <TestoIntroduttivoView
        store={store}
        history={history}
        {...mockProps}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(HtmlText).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
  });

  it('testo il render quando il caricamento è in corso', () => {
    const props = {
      ...mockProps,
      testoIntroduttivo: {
        ...mockProps.testoIntroduttivo,
        spinner: true,
      },
    };
    const renderedComponent = shallow(
      <TestoIntroduttivoView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(HtmlText).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
  });

  it('testo il render quando ho un messaggio di errore', () => {
    const props = {
      ...mockProps,
      testoIntroduttivo: {
        ...mockProps.testoIntroduttivo,
        error: {
          hasErrors: true,
          errorMessage: 'messaggio di errore',
        },
      },
    };
    const renderedComponent = shallow(
      <TestoIntroduttivoView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(HtmlText).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
  });

  it('testo che la funzione associata a backNav mi faccia una history.push', () => {
    const renderedComponent = shallow(
      <TestoIntroduttivoView
        store={store}
        history={history}
        {...mockProps}
      />
    );
    const topbarProps = renderedComponent.find(TopBar).props();

    expect(mockProps.history.push).not.toHaveBeenCalled();
    topbarProps.backNav.onClickFunction();
    expect(mockProps.history.push).toHaveBeenCalledWith(mockConfiguration.homePage);
  });
});


describe('<TestoIntroduttivo />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withTestoIntroduttivoReducer = injectReducer({ key: 'testoIntroduttivo', reducer: testoIntroduttivoReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withTestoIntroduttivoReducer,
    connect()
  )(TestoIntroduttivo);

  it('should check Dashboard initial props are properly set', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={mockProps.match}
        history={history}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.testoIntroduttivo).toEqual({
      spinner: true,
      error: {
        errorData: {},
        errorMessage: '',
        hasErrors: false,
      },
      testoData: {
        testo: '',
        titolo: '',
      },
    });
  });
});

describe('<HtmlText />', () => {
  it('should render an Div', () => {
    const renderedComponent = shallow(<HtmlText />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props color', () => {
    const color = 'cyan';
    const renderedComponent = shallow(<HtmlText color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: 'blue',
    };
    const renderedComponent = shallow(<HtmlText theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

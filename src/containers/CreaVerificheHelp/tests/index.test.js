import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import injectReducer from 'utils/injectReducer';

import Container from 'components/Container';
import Image from 'components/Image';

const mockConfiguration = {
  product: 'mytestmatematica',
  hasPremium: true,
  disciplinaId: 123,
};
const store = configureStore({}, {});
const history = {};
const props = {
  configuration: mockConfiguration,
};

describe('<CreaVerificheHelpView />', () => {
  process.env.BASENAME = '/basename/';
  const CreaVerificheHelpView = require('../index').CreaVerificheHelpView; // eslint-disable-line global-require
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  it('should render a Container', () => {
    const renderedComponent = shallow(
      <CreaVerificheHelpView
        store={store}
        history={history}
        {...props}
      />
    );
    expect(renderedComponent.find(Container).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a Container w/ custom firma & productName', () => {
    const renderedComponent = shallow(
      <CreaVerificheHelpView
        store={store}
        history={history}
        {...props}
        productName="nome prodotto"
        firma="firma"
      />
    );
    expect(renderedComponent.find(Container).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a Container w/ custom !firma & productName', () => {
    const renderedComponent = shallow(
      <CreaVerificheHelpView
        store={store}
        history={history}
        {...props}
        productName="nome prodotto"
        firma=""
      />
    );
    expect(renderedComponent.find(Container).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CreaVerificheHelp />', () => {
  process.env.BASENAME = '/basename/';
  const CreaVerificheHelp = require('../index').default; // eslint-disable-line global-require
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  it('should render a Container', () => {
    const mockConfigStateMyTest = fromJS({
      ...mockConfiguration,
    });
    const mockMyTestMatematicaReducer = (state = mockConfigStateMyTest, action) => {
      switch (action.type) {
        default:
          return state;
      }
    };
    const withReducerMyTestMatematica = injectReducer({
      key: 'configuration',
      reducer: mockMyTestMatematicaReducer,
    });
    const ConfigurationWrapperMyTestMate = compose(
      withReducerMyTestMatematica,
      connect()
    )(CreaVerificheHelp);

    const renderedComponent = shallow(
      <ConfigurationWrapperMyTestMate />, { context: { store } }
    ).dive().dive();
    expect(renderedComponent.props().configuration).toEqual(mockConfiguration);
  });
});

describe('<Img />', () => {
  process.env.BASENAME = '/basename/';
  const Img = require('../index').Img; // eslint-disable-line global-require
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  it('should render an Image', () => {
    const renderedComponent = shallow(<Img src="fakeSrc" alt="testo alternativo" />);
    expect(renderedComponent.find(Image).length).toEqual(1);
  });
});

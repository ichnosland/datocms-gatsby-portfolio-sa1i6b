import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';
import ladingPageReducer from 'containers/LandingPage/reducer';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import LyceumComposed, { Lyceum } from '../index';

const configuration = {
  disciplinaId: 21,
  product: 'landingalatin',
  blocco: false,
  titoloApplicazione: 'Alatin Academy',
  Lyceum: '/',
  hasClassi: false,
};

const mockProps = {
  configuration,
  landingPage: {
    isMenuOpened: true,
  },
  onlandingPageToggleMenu: () => {},
  match: {
    path: '/path',
  },
};

describe('<LyceumComposed />', () => {
  it('should render an Lyceum', () => {
    const renderedComponent = shallow(<Lyceum {...mockProps} />);
    expect(renderedComponent.type()).toEqual('div');
    expect(renderedComponent).toMatchSnapshot();
  });
});


describe('<LyceumComposed />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withLandingConfiguration = injectReducer({ key: 'landingPage', reducer: ladingPageReducer });
  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withLandingConfiguration,
    connect()
  )(LyceumComposed);
  const mockStore = configureStore({}, {});
  mockStore.dispatch = jest.fn();

  it('onModalSetData deve chiamare modalSetData', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper match={mockProps.match} />, { context: { store: mockStore } }
    ).dive().dive().dive();

    const receivedProps = renderedComponent.props();
    expect(receivedProps.configuration).toEqual(
      configuration
    );

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );
    receivedProps.onlandingPageToggleMenu(true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );
  });
});

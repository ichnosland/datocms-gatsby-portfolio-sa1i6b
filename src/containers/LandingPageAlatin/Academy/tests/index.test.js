import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';
import ladingPageReducer from 'containers/LandingPage/reducer';

import { StickyWrap } from 'components/StickyFooter';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import AcademyComposed, { Academy } from '../index';

const configuration = {
  disciplinaId: 21,
  product: 'landingalatin',
  blocco: false,
  titoloApplicazione: 'Alatin Academy',
  homePage: '/',
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

describe('<Academy />', () => {
  it('should render a StickyWrap', () => {
    const renderedComponent = shallow(
      <Academy {...mockProps} />
    );
    expect(renderedComponent.type()).toEqual(StickyWrap);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<AcademyComposed />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withLandingConfiguration = injectReducer({ key: 'landingPage', reducer: ladingPageReducer });
  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withLandingConfiguration,
    connect()
  )(AcademyComposed);
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

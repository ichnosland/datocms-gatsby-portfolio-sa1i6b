import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';
import { StickyWrap } from 'components/StickyFooter';
import ladingPageReducer from 'containers/LandingPage/reducer';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import TestimonialsComposed, { Testimonials, Col } from '../index';

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

describe('<TestimonialsComposed />', () => {
  it('should render a StickyWrap', () => {
    const renderedComponent = shallow(<Testimonials {...mockProps} />);
    expect(renderedComponent.find(StickyWrap).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<TestimonialsComposed />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withLandingConfiguration = injectReducer({ key: 'landingPage', reducer: ladingPageReducer });
  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withLandingConfiguration,
    connect()
  )(TestimonialsComposed);
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


describe('<Col />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = shallow(<Col />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ props due', () => {
    const renderedComponent = shallow(<Col due />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props tre', () => {
    const renderedComponent = shallow(<Col tre />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

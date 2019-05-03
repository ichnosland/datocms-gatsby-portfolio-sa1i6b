import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import Section from 'components/Section';
import ThankYouComposed, { ThankYou } from '../index';

const configuration = {
  disciplinaId: 21,
  product: 'landingalatin',
  blocco: false,
  titoloApplicazione: 'Alatin ThankYou',
  homePage: '/',
  hasClassi: false,
};

describe('<ThankYou />', () => {
  it('should render a Section', () => {
    const renderedComponent = shallow(<ThankYou configuration={configuration} />);
    expect(renderedComponent.type()).toEqual(Section);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ThankYouComposed />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    connect()
  )(ThankYouComposed);
  const mockStore = configureStore({}, {});
  it('onModalSetData deve chiamare modalSetData', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store: mockStore } }
    ).dive().dive();

    const receivedProps = renderedComponent.props();
    expect(receivedProps.configuration).toEqual(
      configuration
    );
  });
});

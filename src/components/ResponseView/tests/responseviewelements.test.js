import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import { ResponseWrap, FeedbackSteps } from '../ResponseViewElements';

describe('<ResponseWrap />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(
      <ResponseWrap />
    );
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props votoFinale > 6', () => {
    const votoFinale = 8;
    const renderedComponent = shallow(
      <ResponseWrap votoFinale={votoFinale} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props votoFinale < 6', () => {
    const votoFinale = 4;
    const renderedComponent = shallow(
      <ResponseWrap votoFinale={votoFinale} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<FeedbackSteps />', () => {
  it('default', () => {
    const renderedComponent = shallow(
      <FeedbackSteps />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('stepsDone = 1', () => {
    const renderedComponent = shallow(
      <FeedbackSteps stepsDone={1} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});

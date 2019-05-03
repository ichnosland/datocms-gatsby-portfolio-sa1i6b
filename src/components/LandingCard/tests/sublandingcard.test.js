import React from 'react';
import { shallow } from 'enzyme';

import { Image, CardBox, FlexSwitch } from '../index';
import SubLandingCard, { SubCardContainer } from '../SubLandingCard';

describe('<SubLandingCard />', () => {
  it('should render a SubCardContainer', () => {
    const src = 'IMAGE';
    const renderedComponent = shallow(
      <SubLandingCard src={src} />
    );
    expect(renderedComponent.find(SubCardContainer).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its children', () => {
    const src = 'IMAGE';
    const children = '<p>Children</p>';
    const renderedComponent = shallow(
      <SubLandingCard src={src}>
        {children}
      </SubLandingCard>
    );
    expect(renderedComponent.contains('<p>Children</p>')).toBe(true);
    expect(renderedComponent.find(CardBox).length).toEqual(1);
  });

  it('should render with src', () => {
    const src = 'IMAGE';
    const renderedComponent = shallow(
      <SubLandingCard src={src} />
    );
    expect(renderedComponent.find(Image).length).toEqual(1);
  });

  it('should render its css w/ props padding', () => {
    const padding = '30px';
    const renderedComponent = shallow(
      <SubLandingCard padding={padding} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SubCardContainer />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(
      <SubCardContainer />
    );
    expect(renderedComponent.find(FlexSwitch).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props color', () => {
    const color = 'green';
    const renderedComponent = shallow(
      <SubCardContainer color={color} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props dashed', () => {
    const renderedComponent = shallow(
      <SubCardContainer dashed />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props single', () => {
    const renderedComponent = shallow(
      <SubCardContainer single />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '100px';
    const renderedComponent = shallow(
      <SubCardContainer padding={padding} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

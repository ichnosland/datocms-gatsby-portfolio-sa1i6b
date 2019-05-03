import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import MissionTag, { MissionTagBox, MissionTagNumber } from '../MissionTag';

const number = 3;

describe('<MissionTag />', () => {
  it('should render a MissionTagBox', () => {
    const renderedComponent = shallow(
      <MissionTag number={number} />
    );
    expect(renderedComponent.find(MissionTagBox).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css /w props searchActive', () => {
    const renderedComponent = shallow(
      <MissionTag number={number} searchActive />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<MissionTagBox />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(
      <MissionTagBox />
    );
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css /w props searchActive', () => {
    const renderedComponent = shallow(
      <MissionTagBox searchActive />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<MissionTagNumber />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <MissionTagNumber />
    );
    expect(renderedComponent.find('Div').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css /w props color', () => {
    const color = 'red';
    const renderedComponent = shallow(
      <MissionTagNumber color={color} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css /w props bgColor', () => {
    const bgColor = 'green';
    const renderedComponent = shallow(
      <MissionTagNumber bgColor={bgColor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

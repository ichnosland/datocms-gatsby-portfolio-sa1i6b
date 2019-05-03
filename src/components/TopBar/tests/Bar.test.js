import React from 'react';
import { shallow } from 'enzyme';

import Bar from '../Bar';

const theme = {
  brand: '#00abe5',
  light: 'rgb(109, 210, 240)',
  dark: 'rgb(0, 114, 205)',
};

describe('<Bar />', () => {
  it('should render a <header> tag', () => {
    const renderedComponent = shallow(<Bar />);
    expect(renderedComponent.type()).toEqual('header');
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<Bar theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const bgColor = '#fff';
    const renderedComponent = shallow(<Bar bgColor={bgColor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = '#fff';
    const renderedComponent = shallow(<Bar color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props pinned', () => {
    const renderedComponent = shallow(<Bar pinned />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props searchActive', () => {
    const renderedComponent = shallow(<Bar searchActive />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props box', () => {
    const renderedComponent = shallow(<Bar box />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props noShadow', () => {
    const renderedComponent = shallow(<Bar noShadow />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/o props', () => {
    const renderedComponent = shallow(<Bar />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

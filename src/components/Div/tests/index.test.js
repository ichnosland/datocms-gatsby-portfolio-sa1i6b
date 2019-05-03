import React from 'react';
import { shallow } from 'enzyme';

import Div from '../index';

describe('<Div />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<Div />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Div id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its css w/ props display', () => {
    const renderedComponent = shallow(<Div display="inline-block" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props position', () => {
    const renderedComponent = shallow(<Div position="absolute" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props width', () => {
    const renderedComponent = shallow(<Div width="300px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props maxWidth', () => {
    const renderedComponent = shallow(<Div maxWidth="800px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const renderedComponent = shallow(<Div height="150px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const renderedComponent = shallow(<Div color="ffcc00" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props align', () => {
    const renderedComponent = shallow(<Div align="center" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props float', () => {
    const renderedComponent = shallow(<Div float="left" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const renderedComponent = shallow(<Div margin="0 auto" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const renderedComponent = shallow(<Div padding="20px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const renderedComponent = shallow(<Div border="2px solid red" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props borderstyle', () => {
    const renderedComponent = shallow(<Div borderstyle="dotted" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bordercolor', () => {
    const renderedComponent = shallow(<Div bordercolor="black" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props borderwidth', () => {
    const renderedComponent = shallow(<Div borderwidth="0 0 1em 0" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const renderedComponent = shallow(<Div bgColor="yellow" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const renderedComponent = shallow(<Div radius="60px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props overflow', () => {
    const renderedComponent = shallow(<Div overflow="hidden" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props userSelect', () => {
    const renderedComponent = shallow(<Div userSelect="none" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props pointerEvents', () => {
    const renderedComponent = shallow(<Div pointerEvents="none" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props zindex', () => {
    const renderedComponent = shallow(<Div zindex="30" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props noPrint', () => {
    const renderedComponent = shallow(<Div noPrint />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props nobreak', () => {
    const renderedComponent = shallow(<Div nobreak />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

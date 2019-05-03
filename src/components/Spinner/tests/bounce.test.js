import React from 'react';
import { shallow } from 'enzyme';

import { Bounce, dimension, delay } from '../bounce';

describe('delay ', () => {
  it('should work w/o args', () => {
    const del = delay();
    expect(del).toEqual(' -0s');
  });

  it('should work w/ 0', () => {
    const del = delay(0);
    expect(del).toEqual(' -0s');
  });

  it('should work w/ 1', () => {
    const del = delay(1);
    expect(del).toEqual(' -0.16s');
  });

  it('should work w/ 2', () => {
    const del = delay(2);
    expect(del).toEqual(' -0.32s');
  });
});

describe('dimension ', () => {
  it('should work w/o args', () => {
    const size = dimension();
    expect(size).toEqual('18px');
  });

  it('should work w/ unused args', () => {
    const size = dimension('unused');
    expect(size).toEqual('18px');
  });

  it('should work w/ small args', () => {
    const size = dimension('small');
    expect(size).toEqual('10px');
  });

  it('should work w/ huge args', () => {
    const size = dimension('huge');
    expect(size).toEqual('30px');
  });
});

describe('<Bounce />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<Bounce />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<Bounce />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: 'red',
    };
    const renderedComponent = shallow(<Bounce theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const color = 'blue';
    const renderedComponent = shallow(<Bounce bgColor={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inverse', () => {
    const renderedComponent = shallow(<Bounce inverse />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props ringo', () => {
    const renderedComponent = shallow(<Bounce ringo />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props size small', () => {
    const size = 'small';
    const renderedComponent = shallow(<Bounce size={size} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props size huge', () => {
    const size = 'huge';
    const renderedComponent = shallow(<Bounce size={size} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props number 1', () => {
    const number = 1;
    const renderedComponent = shallow(<Bounce number={number} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props number 2', () => {
    const number = 2;
    const renderedComponent = shallow(<Bounce number={number} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../index';
import { Bounce } from '../bounce';

describe('<Spinner />', () => {
  it('should render 3 <Bounce> component as default', () => {
    const renderedComponent = shallow(<Spinner />);
    expect(renderedComponent.find(Bounce).length).toEqual(3);
  });

  it('should render 0 <Bounce> component if number is 0', () => {
    const number = 0;
    const renderedComponent = shallow(<Spinner number={number} />);
    expect(renderedComponent.find(Bounce).length).toEqual(number);
  });

  it('should render 1 <Bounce> component if number is 1', () => {
    const number = 1;
    const renderedComponent = shallow(<Spinner number={number} />);
    expect(renderedComponent.find(Bounce).length).toEqual(number);
  });

  it('should render 2 <Bounce> component if number is 2', () => {
    const number = 2;
    const renderedComponent = shallow(<Spinner number={number} />);
    expect(renderedComponent.find(Bounce).length).toEqual(number);
  });

  it('should accept a bgColor props', () => {
    const bgColor = 'blue';
    const renderedComponent = shallow(<Spinner bgColor={bgColor} />);
    expect(renderedComponent.instance().props.bgColor).toBe(bgColor);
  });

  it('should accept a size small props', () => {
    const size = 'small';
    const renderedComponent = shallow(<Spinner size={size} />);
    expect(renderedComponent.instance().props.size).toBe(size);
  });

  it('should accept a size huge props', () => {
    const size = 'huge';
    const renderedComponent = shallow(<Spinner size={size} />);
    expect(renderedComponent.instance().props.size).toBe(size);
  });

  it('should render its css w/ props ringo', () => {
    const renderedComponent = shallow(<Spinner ringo />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import ZigZagBorder from '../index';

describe('<ZigZagBorder />', () => {
  it('should render an Div', () => {
    const renderedComponent = shallow(<ZigZagBorder />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ZigZagBorder id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });
});

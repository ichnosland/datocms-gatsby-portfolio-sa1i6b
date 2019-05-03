import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import { StickyWrap, StickyTop, StickyBottom } from '../index';

describe('<StickyWrap />', () => {
  it('should render a Div tag', () => {
    const renderedComponent = shallow(<StickyWrap />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<StickyTop />', () => {
  it('should render a Div tag', () => {
    const renderedComponent = shallow(<StickyTop />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<StickyBottom />', () => {
  it('should render a Div tag', () => {
    const renderedComponent = shallow(<StickyBottom />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

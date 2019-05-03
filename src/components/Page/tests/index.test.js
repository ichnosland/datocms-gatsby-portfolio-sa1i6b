import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import Page from '../index';

describe('<Page />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<Page />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });
  it('should render its css w/ props full', () => {
    const renderedComponent = shallow(<Page full />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { Inseriti } from '../Inseriti';

describe('<Inseriti />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<Inseriti />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(<Inseriti giusto />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato', () => {
    const renderedComponent = shallow(<Inseriti sbagliato />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

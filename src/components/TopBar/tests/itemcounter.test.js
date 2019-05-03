import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import ItemCounter from '../ItemCounter';

const theme = {
  radius: {
    buttons: '12px',
  },
};

const score = '350';

describe('<ItemCounter />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ItemCounter score={score} />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its props padding', () => {
    const padding = '30px';
    const renderedComponent = shallow(<ItemCounter padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<ItemCounter theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props hidden', () => {
    const hidden = true;
    const renderedComponent = shallow(<ItemCounter theme={theme} hidden={hidden} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});


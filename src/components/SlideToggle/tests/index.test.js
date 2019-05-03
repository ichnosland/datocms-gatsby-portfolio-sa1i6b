import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import SlideToggle, { ToggleSlider } from '../index';

const theme = {
  brand: '#111111',
};

describe('<SlideToggle />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<SlideToggle />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });
});

describe('<ToggleSlider />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ToggleSlider />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<ToggleSlider theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props check', () => {
    const renderedComponent = shallow(<ToggleSlider check />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props check & bgcolor', () => {
    const bgcolor = 'yellow';
    const renderedComponent = shallow(<ToggleSlider check bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

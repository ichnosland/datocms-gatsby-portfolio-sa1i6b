import React from 'react';
import { shallow } from 'enzyme';

import {
  BrandTxt,
  ColorTxt,
  Contesto,
  Lessico,
  ClearAnchor,
} from '../index';

describe('<BrandTxt />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<BrandTxt />);
    expect(renderedComponent.type()).toEqual('span');
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ColorTxt />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<ColorTxt />);
    expect(renderedComponent.type()).toEqual('span');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<ColorTxt color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Contesto />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<Contesto />);
    expect(renderedComponent.type()).toEqual('span');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props lessico', () => {
    const renderedComponent = shallow(<Contesto lessico />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Lessico />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<Lessico />);
    expect(renderedComponent.type()).toEqual('span');
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ClearAnchor />', () => {
  it('should render a <a> tag', () => {
    const renderedComponent = shallow(<ClearAnchor />);
    expect(renderedComponent.type()).toEqual('a');
    expect(renderedComponent).toMatchSnapshot();
  });
});

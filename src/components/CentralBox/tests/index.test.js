import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import CentralBox, { FramedBox } from '../index';

const children = <p>some text</p>;

describe('<CentralBox />', () => {
  it('should render a FramedBox tag', () => {
    const renderedComponent = shallow(<CentralBox />);
    expect(renderedComponent.find(FramedBox).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its childrens', () => {
    const renderedComponent = shallow(<CentralBox>{children}</CentralBox>);
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

describe('<FramedBox />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<FramedBox />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props unita', () => {
    const renderedComponent = shallow(<FramedBox unita />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props versione', () => {
    const versione = '0';
    const renderedComponent = shallow(<FramedBox versione={versione} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: '#00abe5',
    };
    const renderedComponent = shallow(<FramedBox theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

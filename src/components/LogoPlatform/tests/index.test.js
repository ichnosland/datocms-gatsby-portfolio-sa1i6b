import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import LogoPlatform, { WrapLogoDiv } from '../index';

const product = 'argonauta';

describe('<LogoPlatform />', () => {
  it('should render a <WrapLogoDiv> tag', () => {
    const renderedComponent = shallow(<LogoPlatform product={product} />);
    expect(renderedComponent.find(WrapLogoDiv).length).toEqual(1);
  });

  it('should render its css w/ prop product', () => {
    const renderedComponent = shallow(<LogoPlatform product={product} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop width', () => {
    const width = '80px';
    const renderedComponent = shallow(<LogoPlatform product={product} width={width} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ maxWidth', () => {
    const maxWidth = '400px';
    const renderedComponent = shallow(<LogoPlatform product={product} maxWidth={maxWidth} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '30px';
    const renderedComponent = shallow(<LogoPlatform product={product} margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const height = '200px';
    const renderedComponent = shallow(<LogoPlatform product={product} height={height} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fill', () => {
    const fill = 'red';
    const renderedComponent = shallow(<LogoPlatform product={product} fill={fill} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop inverse', () => {
    const renderedComponent = shallow(<LogoPlatform product={product} inverse />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop desktopOnly', () => {
    const renderedComponent = shallow(<LogoPlatform product={product} desktopOnly />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop execLogo', () => {
    const renderedComponent = shallow(<LogoPlatform product={product} execLogo />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<WrapLogoDiv />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<WrapLogoDiv />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ prop width', () => {
    const width = '80px';
    const renderedComponent = shallow(<WrapLogoDiv width={width} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop maxWidth', () => {
    const maxWidth = '50px';
    const renderedComponent = shallow(<WrapLogoDiv maxWidth={maxWidth} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop margin', () => {
    const margin = '50px';
    const renderedComponent = shallow(<WrapLogoDiv margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop margin', () => {
    const margin = '50px';
    const renderedComponent = shallow(<WrapLogoDiv margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop inverse', () => {
    const renderedComponent = shallow(<WrapLogoDiv inverse />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop desktopOnly', () => {
    const renderedComponent = shallow(<WrapLogoDiv desktopOnly />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop formLogo', () => {
    const renderedComponent = shallow(<WrapLogoDiv formLogo />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ prop execLogo', () => {
    const renderedComponent = shallow(<WrapLogoDiv execLogo />);
    expect(renderedComponent).toMatchSnapshot();
  });
});


import React from 'react';
import { shallow } from 'enzyme';

import Svg, { SvgWrap } from '../index';

const viewBox = '0 0 8.34 16';
const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" data-name="Livello 1" fill="#ffffff" />;

describe('<Svg />', () => {
  it('should render a SvgWrap', () => {
    const renderedComponent = shallow(
      <Svg
        viewBox={viewBox}
        path={path}
      />
    );
    expect(renderedComponent.find(SvgWrap).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its children w/ props path', () => {
    const renderedComponent = shallow(
      <Svg
        viewBox={viewBox}
        path={path}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props viewBox', () => {
    const renderedComponent = shallow(
      <Svg
        viewBox={viewBox}
        path={path}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props width', () => {
    const width = '100px';
    const renderedComponent = shallow(
      <Svg
        viewBox={viewBox}
        path={path}
        width={width}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props minWidth', () => {
    const width = '200px';
    const minWidth = '100px';
    const renderedComponent = shallow(
      <Svg
        width={width}
        viewBox={viewBox}
        path={path}
        minWidth={minWidth}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const height = '1024px';
    const renderedComponent = shallow(
      <Svg
        viewBox={viewBox}
        path={path}
        height={height}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props minHeight', () => {
    const height = '1024px';
    const minHeight = '750px';
    const renderedComponent = shallow(
      <Svg
        height={height}
        viewBox={viewBox}
        path={path}
        minHeight={minHeight}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fill', () => {
    const fill = '#ff0000';
    const renderedComponent = shallow(
      <Svg
        viewBox={viewBox}
        path={path}
        fill={fill}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props className', () => {
    const className = 'classe';
    const renderedComponent = shallow(
      <Svg
        viewBox={viewBox}
        path={path}
        className={className}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SvgWrap />', () => {
  it('should render a svg tag', () => {
    const renderedComponent = shallow(
      <SvgWrap />
    );
    expect(renderedComponent.type()).toEqual('svg');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fill', () => {
    const fill = 'yellow';
    const renderedComponent = shallow(
      <SvgWrap fill={fill} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props minWidth', () => {
    const minWidth = '750px';
    const renderedComponent = shallow(
      <SvgWrap
        minWidth={minWidth}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props minHeight', () => {
    const minHeight = '750px';
    const renderedComponent = shallow(
      <SvgWrap
        minHeight={minHeight}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

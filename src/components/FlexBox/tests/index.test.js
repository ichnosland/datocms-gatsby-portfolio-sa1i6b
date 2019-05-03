import React from 'react';
import { shallow } from 'enzyme';

import FlexBox, { FlexChild } from '../index';

describe('<FlexBox />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<FlexBox />);
    expect(renderedComponent.find('Div').length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<FlexBox id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <FlexBox>{children}</FlexBox>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<FlexBox />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props direction', () => {
    const direction = 'column';
    const renderedComponent = shallow(<FlexBox direction={direction} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render noPrint flexbox', () => {
    const renderedComponent = shallow(<FlexBox noPrint />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props justifyContent', () => {
    const justifyContent = 'space-between';
    const renderedComponent = shallow(<FlexBox justifyContent={justifyContent} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props alignItems', () => {
    const alignItems = 'flex-start';
    const renderedComponent = shallow(<FlexBox alignItems={alignItems} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props alignContent', () => {
    const alignContent = 'flex-start';
    const renderedComponent = shallow(<FlexBox alignContent={alignContent} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props maxWidth', () => {
    const maxWidth = '300px';
    const renderedComponent = shallow(<FlexBox maxWidth={maxWidth} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props wrap', () => {
    const wrap = 'wrap-reverse';
    const renderedComponent = shallow(<FlexBox wrap={wrap} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<FlexChild />', () => {
  it('should render a Div tag', () => {
    const renderedComponent = shallow(<FlexChild />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props order', () => {
    const order = '3';
    const renderedComponent = shallow(<FlexChild order={order} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props flexGrow', () => {
    const flexGrow = 2;
    const renderedComponent = shallow(<FlexChild flexGrow={flexGrow} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props flexBasis', () => {
    const flexBasis = '100px';
    const renderedComponent = shallow(<FlexChild flexBasis={flexBasis} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props alignContent', () => {
    const alignContent = 'flex-start';
    const renderedComponent = shallow(<FlexChild alignContent={alignContent} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props alignSelf', () => {
    const alignSelf = 'center';
    const renderedComponent = shallow(<FlexChild alignSelf={alignSelf} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

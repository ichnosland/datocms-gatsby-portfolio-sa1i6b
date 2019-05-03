import React from 'react';
import { shallow } from 'enzyme';

import { RespImg, DesktopImage, MobileImage } from '../index';

describe('<RespImg />', () => {
  it('should render a <img> tag', () => {
    const renderedComponent = shallow(<RespImg />);
    expect(renderedComponent.type()).toEqual('img');
  });

  it('should render its css w/ props maxWidth', () => {
    const maxWidth = '30%';
    const renderedComponent = shallow(<RespImg maxWidth={maxWidth} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render css', () => {
    const renderedComponent = shallow(<RespImg maxWidth="60%" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<DesktopImage />', () => {
  it('should render a RespImg', () => {
    const renderedComponent = shallow(<DesktopImage />);
    expect(renderedComponent.find(RespImg).length).toEqual(1);
  });

  it('should render its css w/ props border', () => {
    const border = '1px solid green';
    const renderedComponent = shallow(<RespImg border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = 'auto';
    const renderedComponent = shallow(<RespImg margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render css', () => {
    const renderedComponent = shallow(<DesktopImage margin="20px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render css', () => {
    const renderedComponent = shallow(<DesktopImage border="2px dotted green" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<MobileImage />', () => {
  it('should render a RespImg', () => {
    const renderedComponent = shallow(<MobileImage />);
    expect(renderedComponent.find(RespImg).length).toEqual(1);
  });

  it('should render its css w/ props border', () => {
    const border = '1px solid green';
    const renderedComponent = shallow(<RespImg border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = 'auto';
    const renderedComponent = shallow(<RespImg margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render css', () => {
    const renderedComponent = shallow(<MobileImage margin="20px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render css', () => {
    const renderedComponent = shallow(<MobileImage border="2px dotted green" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

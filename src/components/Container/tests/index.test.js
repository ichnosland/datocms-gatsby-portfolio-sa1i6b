import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import Container, { ActionBox, ContainerFlex } from '../index';
import folder from 'images/empty-folder.png';

describe('<Container />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<Container />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Container id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render width props maxWidth', () => {
    const renderedComponent = shallow(<Container maxWidth="520px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render width props margin', () => {
    const renderedComponent = shallow(<Container margin="10px 34px 80px" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ActionBox />', () => {
  it('should render a Container', () => {
    const renderedComponent = shallow(<ActionBox />);
    expect(renderedComponent.find(Container).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ActionBox id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render a background image w/ props src', () => {
    const src = folder;
    const renderedComponent = shallow(<ActionBox src={src} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the bacground img size w/ props bgSize', () => {
    const src = folder;
    const bgSize = '200px 300px';
    const renderedComponent = shallow(<ActionBox src={src} bgSize={bgSize} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the bacground img position w/ props bgPosition', () => {
    const src = folder;
    const bgPosition = '30% 20%';
    const renderedComponent = shallow(<ActionBox src={src} bgPosition={bgPosition} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the bacground img position w/ props bgPositionMobile ', () => {
    const src = folder;
    const bgPositionMobile = 'center';
    const renderedComponent = shallow(<ActionBox src={src} bgPositionMobile={bgPositionMobile} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the bacground img size w/ props bgSize', () => {
    const src = folder;
    const bgPosition = '30% 20%';
    const renderedComponent = shallow(<ActionBox src={src} bgPosition={bgPosition} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the bacground img repetition w/ props bgRepeat', () => {
    const src = folder;
    const bgRepeat = 'repeat-x';
    const renderedComponent = shallow(<ActionBox src={src} bgRepeat={bgRepeat} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ContainerFlex />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<ContainerFlex />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });
});

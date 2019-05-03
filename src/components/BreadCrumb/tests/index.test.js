import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import BreadCrumb from '../index';

describe('<BreadCrumb />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<BreadCrumb />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<BreadCrumb id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its children content', () => {
    const children = '<span>ciao</span>';
    const renderedComponent = shallow(
      <BreadCrumb>{children}</BreadCrumb>
    );
    expect(renderedComponent.contains(children)).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props noPrint', () => {
    const renderedComponent = shallow(<BreadCrumb noPrint />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props display', () => {
    const display = 'table';
    const renderedComponent = shallow(<BreadCrumb display={display} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<BreadCrumb color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'green';
    const renderedComponent = shallow(<BreadCrumb bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const border = '6px dotted yelow';
    const renderedComponent = shallow(<BreadCrumb border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => { 
    const radius = '100px';
    const renderedComponent = shallow(<BreadCrumb radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

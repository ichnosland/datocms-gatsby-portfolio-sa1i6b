import React from 'react';
import { shallow } from 'enzyme';
import ClearLink from '../index';

const Path = '/';

describe('<ClearLink />', () => {
  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ClearLink id={id} to={Path} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <ClearLink to={Path} >{children}</ClearLink>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its function w/ props to', () => {
    const renderedComponent = shallow(<ClearLink to={Path} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

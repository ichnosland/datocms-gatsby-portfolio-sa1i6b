import React from 'react';
import { shallow } from 'enzyme';

import { Section } from 'components/Section';
import image from 'images/empty-folder.png';
import ContattiMl from '../index';

describe('<ContattiMl />', () => {
  it('should render a Section', () => {
    const renderedComponent = shallow(
      <ContattiMl />
    );
    expect(renderedComponent.find(Section).length).toEqual(1);
  });

  it('should render its css w/ props bgcolor', () => {
    const renderedComponent = shallow(
      <ContattiMl bgcolor="red" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props src', () => {
    const renderedComponent = shallow(
      <ContattiMl src={image} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

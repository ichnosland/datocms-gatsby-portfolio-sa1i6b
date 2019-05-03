import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import folder from 'images/empty-folder.png';
import EmptyBox, { Folder } from '../index';

describe('<EmptyBox />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <EmptyBox />
    );
    expect(renderedComponent.find(Div).length).toBe(1);
  });

  it('should render text w/ props text', () => {
    const text = 'Questo è un testo';
    const renderedComponent = shallow(
      <EmptyBox text={text} />
    );
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Folder />', () => {
  it('should render an <img>', () => {
    const src = folder;
    const renderedComponent = shallow(
      <Folder src={src} />
    );
    expect(renderedComponent.type()).toEqual('img');
    expect(renderedComponent).toMatchSnapshot();
  });
});

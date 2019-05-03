import React from 'react';
import { shallow } from 'enzyme';

import ToolBar, { ToolBarWrap } from '../index';

describe('<ToolBar />', () => {
  it('should render a <ToolBarWrap>', () => {
    const renderedComponent = shallow(<ToolBar />);
    expect(renderedComponent.find(ToolBarWrap).length).toEqual(1);
  });

  it('should render its children', () => {
    const children = 'ciao';
    const renderedComponent = shallow(
      <ToolBar>
        {children}
      </ToolBar>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props hideOnFocus', () => {
    const children = 'ciao';
    const renderedComponent = shallow(
      <ToolBar hideOnFocus>
        {children}
      </ToolBar>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ToolBarWrap />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<ToolBarWrap />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ props hideOnFocus', () => {
    const renderedComponent = shallow(
      <ToolBarWrap hideOnFocus />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

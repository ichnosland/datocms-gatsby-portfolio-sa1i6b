import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'components/Button';
import ToolBarButton, { ToolBarBtn } from '../ToolBarButton';

describe('<ToolBarButton />', () => {
  it('should render a ToolBarBtn', () => {
    const renderedComponent = shallow(<ToolBarButton />);
    expect(renderedComponent.find(ToolBarBtn).length).toEqual(1);
  });

  it('should render its props enabled w/ enabled', () => {
    const renderedComponent = shallow(<ToolBarButton enabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props full', () => {
    const renderedComponent = shallow(<ToolBarButton full />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props help', () => {
    const renderedComponent = shallow(<ToolBarButton help />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props skip', () => {
    const renderedComponent = shallow(<ToolBarButton skip />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props check', () => {
    const renderedComponent = shallow(<ToolBarButton check />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render some text w/ its props title', () => {
    const title = 'Some text';
    const renderedComponent = shallow(<ToolBarButton title={title} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render title & icon w/ props full, title & enabled', () => {
    const title = 'Some other text';
    const renderedComponent = shallow(
      <ToolBarButton full enabled title={title} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props hide', () => {
    const renderedComponent = shallow(<ToolBarButton hide />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ToolBarBtn />', () => {
  it('should render a Button', () => {
    const renderedComponent = shallow(<ToolBarBtn />);
    expect(renderedComponent.find(Button).length).toEqual(1);
  });

  it('should render its props enabled w/ enabled', () => {
    const renderedComponent = shallow(<ToolBarBtn enabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props full', () => {
    const renderedComponent = shallow(<ToolBarBtn full />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full & enabled', () => {
    const renderedComponent = shallow(<ToolBarBtn full enabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props help', () => {
    const renderedComponent = shallow(<ToolBarBtn help />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props skip', () => {
    const renderedComponent = shallow(<ToolBarBtn skip />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props check', () => {
    const renderedComponent = shallow(<ToolBarBtn check />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render some text w/ its props title', () => {
    const title = 'Some text';
    const renderedComponent = shallow(<ToolBarBtn title={title} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props hide', () => {
    const renderedComponent = shallow(<ToolBarBtn hide />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

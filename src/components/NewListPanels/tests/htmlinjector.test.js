import React from 'react';
import { shallow } from 'enzyme';
import MathJax from 'react-mathjax-preview';

import { HtmlBlockWrap } from 'components/HtmlBlock';
import { ListItem } from '../index';
import HtmlInjector, { HtmlBlock } from '../HtmlInjector';

const text = 'del testo';

describe('<HtmlInjector />', () => {
  it('should render a ListItem', () => {
    const renderedComponent = shallow(<HtmlInjector />);
    expect(renderedComponent.find(ListItem).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render MathJax when hasLatex is false', () => {
    const hasLatex = false;
    const renderedComponent = shallow(<HtmlInjector hasLatex={hasLatex} text={text} />);
    expect(renderedComponent.find(MathJax).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render MathJax when hasLatex is true', () => {
    const hasLatex = true;
    const renderedComponent = shallow(<HtmlInjector hasLatex={hasLatex} text={text} />);
    expect(renderedComponent.find(MathJax).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<HtmlBlock />', () => {
  it('should render a HtmlBlockWrap', () => {
    const renderedComponent = shallow(<HtmlBlock />);
    expect(renderedComponent.find(HtmlBlockWrap).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props align', () => {
    const align = 'left';
    const renderedComponent = shallow(<HtmlBlock align={align} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<HtmlBlock color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props note', () => {
    const renderedComponent = shallow(<HtmlBlock note />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props solution', () => {
    const renderedComponent = shallow(<HtmlBlock solution />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

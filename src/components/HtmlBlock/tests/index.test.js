import React from 'react';
import { shallow } from 'enzyme';
import MathJax from 'react-mathjax-preview';


import HtmlBlock, { HtmlBlockWrap } from '../index';

const text = 'del testo';

describe('<HtmlBlock />', () => {
  it('should render a HtmlBlockWrap', () => {
    const renderedComponent = shallow(<HtmlBlock />);
    expect(renderedComponent.find(HtmlBlockWrap).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render MathJax when hasLatex is false', () => {
    const hasLatex = false;
    const renderedComponent = shallow(<HtmlBlock hasLatex={hasLatex} text={text} />);
    expect(renderedComponent.find(MathJax).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render MathJax when hasLatex is true', () => {
    const hasLatex = true;
    const renderedComponent = shallow(<HtmlBlock hasLatex={hasLatex} text={text} />);
    expect(renderedComponent.find(MathJax).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<HtmlBlockWrap />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<HtmlBlockWrap />);
    expect(renderedComponent.find('Div').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props align', () => {
    const align = 'left';
    const renderedComponent = shallow(<HtmlBlockWrap align={align} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<HtmlBlockWrap color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'green';
    const renderedComponent = shallow(<HtmlBlockWrap bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

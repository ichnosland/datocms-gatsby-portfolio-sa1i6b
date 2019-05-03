import React from 'react';
import { shallow } from 'enzyme';
import MathJax from 'react-mathjax-preview';

import Div from 'components/Div';

import HtmlInjector, {
  HtmlBlock,
  Solution,
  HtmlBlockFooter,
} from '../HtmlInjector';

const items = {
  id: '1',
  nome: 'Ciao',
  isHtml: true,
  note: true,
  text: 'html',
  solution: 'soluzione',
  esercizi: 16,
  data: '25/01/2018',
};

describe('<HtmlInjector />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<HtmlInjector {...items} />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlock).length).toEqual(1);
    expect(renderedComponent.find(Solution).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlockFooter).length).toEqual(1);
    expect(renderedComponent.find('span').length).toEqual(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render HtmlBlock', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          text: undefined,
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlock).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render MathJax when hasLatex flag is set', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          hasLatex: true,
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlock).length).toEqual(1);
    expect(renderedComponent.find(Solution).length).toEqual(1);
    expect(renderedComponent.find(MathJax).length).toEqual(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render MathJax when editor.watch flag is set', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          editor: {
            show: true,
          },
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(2);
    expect(renderedComponent.find(HtmlBlock).length).toEqual(0);
    expect(renderedComponent.find(Solution).length).toEqual(1);
    expect(renderedComponent.find(MathJax).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render Solution', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          solution: undefined,
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(Solution).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render HtmlBlockFooter w/ only data', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          esercizi: undefined,
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlockFooter).length).toEqual(1);
    expect(renderedComponent.find('span').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render HtmlBlockFooter w/ data when esercizi is 0', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          esercizi: 0,
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlockFooter).length).toEqual(1);
    expect(renderedComponent.find('span').length).toEqual(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render HtmlBlockFooter w/ data when esercizi is 1', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          esercizi: 1,
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlockFooter).length).toEqual(1);
    expect(renderedComponent.find('span').length).toEqual(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render HtmlBlockFooter w/o data e esercizi', () => {
    const renderedComponent = shallow(
      <HtmlInjector
        {...{
          ...items,
          esercizi: undefined,
          data: undefined,
        }}
      />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent.find(HtmlBlockFooter).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<HtmlBlock />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<HtmlBlock />);
    expect(renderedComponent.find(Div).length).toEqual(1);
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
});

describe('<HtmlBlockFooter />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<HtmlBlockFooter />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Solution />', () => {
  it('should render a HtmlBlock', () => {
    const renderedComponent = shallow(<Solution />);
    expect(renderedComponent.find(HtmlBlock).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<Solution color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'green';
    const renderedComponent = shallow(<Solution bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

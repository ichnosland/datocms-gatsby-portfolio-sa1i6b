import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'components/Button';
import ResponseView from '../index';
import { ResponseWrap } from '../ResponseViewElements';
import goodBg from '../images/good.gif';
import badBg from '../images/bad.gif';

const mockProps = {
  votoApprossimato: 7,
  resetFunction: () => { },
  goodSrc: goodBg,
  badSrc: badBg,
  product: 'alatin',
};

describe('<ResponseView />', () => {
  it('should render a ResponseWrap', () => {
    const renderedComponent = shallow(
      <ResponseView {...mockProps} />
    );
    expect(renderedComponent.find(ResponseWrap).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find('img').length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('restituisce badSrc se votoApprossimato <= 6', () => {
    const myProps = {
      ...mockProps,
      votoApprossimato: 4,
    };
    const renderedComponent = shallow(
      <ResponseView {...myProps} />
    );
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find('img').length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il caso delle unità', () => {
    const myProps = {
      ...mockProps,
      votoApprossimato: 10,
      nascondiVoto: true,
      titolo: 'Titolo responso',
      lezioniCompletate: 2,
      lezioniTotali: 7,
      steps: true,
    };
    const renderedComponent = shallow(
      <ResponseView {...myProps} />
    );
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find('img').length).toBe(1);
    expect(renderedComponent.find('ul').length).toBe(1);
    expect(renderedComponent.find('li').length).toBe(7);
    expect(renderedComponent.find('li.stepsDone').length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il caso in cui !steps e titolo settato', () => {
    const myProps = {
      ...mockProps,
      votoApprossimato: 10,
      nascondiVoto: true,
      titolo: 'Titolo responso',
      lezioniCompletate: 2,
      lezioniTotali: 7,
      steps: false,
    };
    const renderedComponent = shallow(
      <ResponseView {...myProps} />
    );
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find('img').length).toBe(1);
    expect(renderedComponent.find('ul').length).toBe(0);
    expect(renderedComponent.find('li').length).toBe(0);
    expect(renderedComponent.find('li.stepsDone').length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });
});

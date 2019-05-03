import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import Indicator, { IdicatorWrap, Pip } from '../Indicator';

const pip = [
  <div key="pip_0">pip 0</div>,
  <div key="pip_1">pip 1</div>,
  <div key="pip_2">pip 2</div>,
  <div key="pip_3">pip 3</div>,
  <div key="pip_4">pip 4</div>,
];

describe('<Indicator />', () => {
  it('should render a IdicatorWrap', () => {
    const renderedComponent = shallow(
      <Indicator pip={pip} length={3} />
    );
    expect(renderedComponent.find(IdicatorWrap).length).toBe(1);
  });

  it('should calc its css w/ props hidden', () => {
    const renderedComponent = shallow(
      <Indicator hidden length={3} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<IdicatorWrap />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <IdicatorWrap />
    );
    expect(renderedComponent.find(Div).length).toBe(1);
  });

  it('should calc its css w/ props hidden', () => {
    const renderedComponent = shallow(
      <IdicatorWrap hidden />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should calc its css w/ props hidden', () => {
    const distance = '300px';
    const renderedComponent = shallow(
      <IdicatorWrap distance={distance} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Pip />', () => {
  it('should render a span', () => {
    const renderedComponent = shallow(
      <Pip pip={pip} />
    );
    expect(renderedComponent.find('span').length).toBe(1);
  });

  it('should calc its css w/ props isCurrent', () => {
    const renderedComponent = shallow(
      <Pip pip={pip} isCurrent />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

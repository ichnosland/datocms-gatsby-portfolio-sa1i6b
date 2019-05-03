import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import Separator, { SeparatorBg, SeparatorText } from '../Separator';

const theme = {
  brand: '#00BBEF',
  light: '#1588AA',
};

describe('<Separator />', () => {
  it('should render a FlexBox tag', () => {
    const renderedComponent = shallow(<Separator />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<Separator color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props text', () => {
    const text = 'Testo';
    const renderedComponent = shallow(<Separator text={text} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<Separator theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SeparatorText />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<SeparatorText />);
    expect(renderedComponent.type()).toEqual('span');
  });

  it('should render its css w/ props color', () => {
    const color = 'yellow';
    const renderedComponent = shallow(<SeparatorText color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<SeparatorText theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SeparatorBg />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<SeparatorBg />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ props fill', () => {
    const color = 'green';
    const renderedComponent = shallow(<SeparatorBg fill={color} />);
    const SepBg = renderedComponent.find('div');
    const SepBgFill = SepBg.prop('fill');
    expect(SepBgFill).toBe('green');
  });
});

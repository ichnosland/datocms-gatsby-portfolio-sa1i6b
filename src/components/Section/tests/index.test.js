import React from 'react';
import { shallow } from 'enzyme';

import Section, { SkySection, FirstSection } from '../index';

describe('<Section />', () => {
  it('should render a <section> tag', () => {
    const renderedComponent = shallow(<Section />);
    expect(renderedComponent.type()).toEqual('section');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Section id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <Section>{children}</Section>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<Section />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const bgColor = 'blue';
    const renderedComponent = shallow(<Section bgColor={bgColor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const height = '30px';
    const renderedComponent = shallow(<Section height={height} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props justify', () => {
    const justify = 'space-between';
    const renderedComponent = shallow(<Section justify={justify} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props direction', () => {
    const direction = 'column';
    const renderedComponent = shallow(<Section direction={direction} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '30px';
    const renderedComponent = shallow(<Section padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding mobile', () => {
    const padding = '40px';
    const renderedComponent = shallow(<Section paddingMobile={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full', () => {
    const renderedComponent = shallow(<Section full />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full + direction', () => {
    const direction = 'row';
    const renderedComponent = shallow(<Section full direction={direction} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full + flextop', () => {
    const renderedComponent = shallow(<Section full flextop />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full + flexbottom', () => {
    const renderedComponent = shallow(<Section full flexbottom />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props esecuzione', () => {
    const renderedComponent = shallow(<Section esecuzione />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props first', () => {
    const renderedComponent = shallow(<Section first />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SkySection />', () => {
  it('should render a <section> tag', () => {
    const renderedComponent = shallow(<SkySection />);
    expect(renderedComponent.type()).toEqual('section');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<SkySection id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <SkySection>{children}</SkySection>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<SkySection />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<FirstSection />', () => {
  it('should render a <section> tag', () => {
    const renderedComponent = shallow(<FirstSection />);
    expect(renderedComponent.type()).toEqual('section');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<FirstSection id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its css w/ props minHeight', () => {
    const minHeight = '200px';
    const renderedComponent = shallow(<FirstSection minHeight={minHeight} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

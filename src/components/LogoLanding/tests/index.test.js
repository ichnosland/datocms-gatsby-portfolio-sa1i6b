import React from 'react';
import { shallow } from 'enzyme';

import { HiddenH1 } from 'components/Heading';
import LogoLanding, { LogoBox } from '../index';

const configuration = {
  disciplinaId: 21,
  product: 'landingalatin',
  blocco: false,
  titoloApplicazione: 'Alatin Academy',
  homePage: '/',
  hasClassi: false,
};

describe('<LogoLanding />', () => {
  beforeEach(jest.resetModules);
  it('should render a <LogoBox> tag', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const LogoLandingView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LogoLandingView configuration={configuration} />);
    expect(renderedComponent.find('Svg').length).toBe(1);
  });

  it('should render a props maxWidth', () => {
    const maxWidth = '400px';
    const renderedComponent = shallow(<LogoLanding maxWidth={maxWidth} configuration={configuration} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a props width', () => {
    const width = '1000px';
    const renderedComponent = shallow(<LogoLanding width={width} configuration={configuration} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a props height', () => {
    const height = '32px';
    const renderedComponent = shallow(<LogoLanding height={height} configuration={configuration} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a props title', () => {
    const title = 'some text';
    const renderedComponent = shallow(<LogoLanding title={title} configuration={configuration} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a props margin', () => {
    const margin = '30px';
    const renderedComponent = shallow(<LogoLanding margin={margin} configuration={configuration} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a props fill', () => {
    const fill = 'red';
    const renderedComponent = shallow(<LogoLanding fill={fill}configuration={configuration} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its children w/ prop configuration', () => {
    const renderedComponent = shallow(<LogoLanding alatin configuration={configuration} />);
    expect(renderedComponent.find(HiddenH1).length).toBe(1);
    expect(renderedComponent.find(HiddenH1).props().children).toBe('Alatin Academy');
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<LogoBox />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<LogoBox />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render w/ prop width', () => {
    const width = '358px';
    const renderedComponent = shallow(<LogoBox width={width} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render w/ prop maxWidth', () => {
    const maxWidth = '50px';
    const renderedComponent = shallow(<LogoBox maxWidth={maxWidth} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render w/ prop margin', () => {
    const margin = '60px';
    const renderedComponent = shallow(<LogoBox margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

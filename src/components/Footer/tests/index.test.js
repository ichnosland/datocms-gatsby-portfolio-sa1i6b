import React from 'react';
import { shallow } from 'enzyme';

import Footer, { Copy, FooterBlock } from '../index';

describe('<Footer />', () => {
  it('should render a FooterBlock', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.find(FooterBlock).length).toEqual(1);
  });
  it('should render a Copy', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.find(Copy).length).toEqual(1);
  });
});

describe('<Copy />', () => {
  it('should render an <p> tag', () => {
    const renderedComponent = shallow(<Copy />);
    expect(renderedComponent.type()).toEqual('p');
  });
  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Copy id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });
});

describe('<FooterBlock />', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });
  it('should render an <footer> tag', () => {
    const renderedComponent = shallow(<FooterBlock />);
    expect(renderedComponent.type()).toEqual('footer');
  });
  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<FooterBlock id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });
  it('should render a green bg if APPLICATION === LandingAlatin', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const FooterBlockComp = require('../index').FooterBlock; // eslint-disable-line global-require
    const renderedComponent = shallow(<FooterBlockComp />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a red bg if APPLICATION === LandingItaca', () => {
    process.env.APPLICATION = 'LandingItaca';
    const FooterBlockComp = require('../index').FooterBlock; // eslint-disable-line global-require
    const renderedComponent = shallow(<FooterBlockComp />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

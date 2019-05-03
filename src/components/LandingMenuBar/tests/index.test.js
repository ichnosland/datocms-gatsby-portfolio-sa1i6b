import React from 'react';
import { shallow } from 'enzyme';

import { ContainerFlex } from 'components/Container';
import LandingMenuBar, { MenuBar, BarMenuItem, LandingMenu } from '../index';
const Path = '/';

describe('<MenuBar />', () => {
  it('should render a <header> tag', () => {
    const renderedComponent = shallow(<MenuBar />);
    expect(renderedComponent.type()).toEqual('header');
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = '#fff';
    const renderedComponent = shallow(<MenuBar bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props start', () => {
    const start = true;
    const renderedComponent = shallow(<MenuBar start={start} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props openNav', () => {
    const openNav = true;
    const renderedComponent = shallow(<MenuBar openNav={openNav} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<LandingMenuBar />', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });
  const configuration = {
    disciplinaId: 21,
    product: 'landingalatin',
    blocco: false,
    titoloApplicazione: 'Alatin Academy',
    homePage: '/',
    hasClassi: false,
  };
  const mockProps = {
    configuration,
    toggleNavFunction: () => {},
    loadedPath: '/path',
  };

  it('should render a <header> tag', () => {
    const renderedComponent = shallow(<LandingMenuBar {...mockProps} />);
    expect(renderedComponent.find(MenuBar).length).toBe(1);
  });

  it('should render its css w/ props bgcolor', () => {
    const props = {
      ...mockProps,
      bgcolor: '#fff',
    };
    const renderedComponent = shallow(<LandingMenuBar {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props openNav', () => {
    const props = {
      ...mockProps,
      openNav: true,
    };
    const renderedComponent = shallow(<LandingMenuBar {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('MobileNavBtn > click should call toggleNavFunction(true) on LandingAlatin', () => {
    const props = {
      ...mockProps,
      toggleNavFunction: jest.fn(),
    };
    process.env.APPLICATION = 'LandingAlatin';
    const LandingMenuBarView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LandingMenuBarView {...props} />);

    expect(props.toggleNavFunction).not.toHaveBeenCalled();
    renderedComponent.find('LandingMenuBar__MobileNavBtn').simulate('click');
    expect(props.toggleNavFunction).toHaveBeenCalledWith(true);
  });

  it('LandingMenu > ClearLink > click should call toggleNavFunction(false) on LandingAlatin', () => {
    const props = {
      ...mockProps,
      toggleNavFunction: jest.fn(),
    };
    process.env.APPLICATION = 'LandingAlatin';
    const LandingMenuBarView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LandingMenuBarView {...props} />);

    expect(props.toggleNavFunction).not.toHaveBeenCalled();
    renderedComponent.find('ClearLink').simulate('click');
    expect(props.toggleNavFunction).toHaveBeenCalledWith(false);
  });

  it('should render its children w/ navigation[APPLICATION]', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const LandingMenuBarView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LandingMenuBarView {...mockProps} />);
    expect(renderedComponent.find('LandingMenuBar__BarMenuItem').length).toBe(5);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its ccs w/ props active true if loadedPath === post.directionmatches the actual path', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const LandingMenuBarView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LandingMenuBarView {...{ ...mockProps, loadedPath: '/alatin-academy' }} />);
    expect(renderedComponent.find('LandingMenuBar__BarMenuItem').length).toBe(5);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('LandingMenuBar__BarMenuItem:at(0|2|3) should not call window.open', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const LandingMenuBarView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LandingMenuBarView {...mockProps} />);

    const spy = jest.spyOn(window, 'open');
    expect(spy).not.toHaveBeenCalled();
    renderedComponent.find('LandingMenuBar__BarMenuItem').at(0).simulate('click');
    expect(spy).not.toHaveBeenCalled();

    expect(spy).not.toHaveBeenCalled();
    renderedComponent.find('LandingMenuBar__BarMenuItem').at(2).simulate('click');
    expect(spy).not.toHaveBeenCalled();

    expect(spy).not.toHaveBeenCalled();
    renderedComponent.find('LandingMenuBar__BarMenuItem').at(3).simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });

  it('LandingMenuBar__BarMenuItem:at(4) should call window.open in LandingAlatin', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const LandingMenuBarView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LandingMenuBarView {...mockProps} />);

    const spy = jest.spyOn(window, 'open');
    expect(spy).not.toHaveBeenCalledWith(
      'https://maieuticallabs.zendesk.com/hc/it/categories/200541781-ALATIN',
      '_blank'
    );
    renderedComponent.find('LandingMenuBar__BarMenuItem').at(4).simulate('click');
    expect(spy).toHaveBeenCalledWith(
      'https://maieuticallabs.zendesk.com/hc/it/categories/200541781-ALATIN',
      '_blank'
    );
  });

  it('LandingMenuBar__BarMenuItem:at(5) should call window.open in LandingItaca', () => {
    process.env.APPLICATION = 'LandingItaca';
    const LandingMenuBarView = require('../index').default; // eslint-disable-line global-require
    const renderedComponent = shallow(<LandingMenuBarView {...mockProps} />);

    const spy = jest.spyOn(window, 'open');
    expect(spy).not.toHaveBeenCalledWith(
      'https://maieuticallabs.zendesk.com/hc/it/categories/115000849365-ITACA',
      '_blank'
    );
    renderedComponent.find('LandingMenuBar__BarMenuItem').at(3).simulate('click');
    expect(spy).toHaveBeenCalledWith(
      'https://maieuticallabs.zendesk.com/hc/it/categories/115000849365-ITACA',
      '_blank'
    );
  });
});

describe('<BarMenuItem />', () => {
  it('should render its function w/ props to', () => {
    const renderedComponent = shallow(<BarMenuItem to={Path} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = '#fff';
    const renderedComponent = shallow(<BarMenuItem color={color} to={Path} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props active', () => {
    const renderedComponent = shallow(<BarMenuItem active to={Path} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: '#00BBEF',
    };
    const renderedComponent = shallow(<BarMenuItem theme={theme} to={Path} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <BarMenuItem to={Path} >{children}</BarMenuItem>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

describe('<LandingMenu />', () => {
  it('should render a ContainerFlex', () => {
    const renderedComponent = shallow(<LandingMenu />);
    expect(renderedComponent.find(ContainerFlex).length).toEqual(1);
  });

  it('should render its css w/ props color', () => {
    const color = '#fff';
    const renderedComponent = shallow(<LandingMenu color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props maxWidth', () => {
    const maxWidth = '100px';
    const renderedComponent = shallow(<LandingMenu maxWidth={maxWidth} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props openNav', () => {
    const openNav = true;
    const renderedComponent = shallow(<LandingMenu openNav={openNav} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Logo />', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });
  const configuration = {
    disciplinaId: 21,
    product: 'landingalatin',
    blocco: false,
    titoloApplicazione: 'Alatin Academy',
    homePage: '/',
    hasClassi: false,
  };
  it('should render a LogoLanding tag', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const LogoComp = require('../index').Logo; // eslint-disable-line global-require
    const renderedComponent = shallow(<LogoComp configuration={configuration} />);
    expect(renderedComponent.find('LogoLanding').length).toBe(1);
  });

  it('should render its css w/ props start', () => {
    process.env.APPLICATION = 'LandingAlatin';
    const LogoComp = require('../index').Logo; // eslint-disable-line global-require
    const renderedComponent = shallow(<LogoComp start configuration={configuration} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

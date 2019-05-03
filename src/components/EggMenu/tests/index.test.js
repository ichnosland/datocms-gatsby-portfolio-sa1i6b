import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import EggMenuItem from '../EggMenuItem';
import EggMenu, { EggShell, EggUl, EggLi } from '../index';

const product = 'alatin';

describe('<EggMenu />', () => {
  const vociMenu = [{
    url: 'http://acme.com',
    titolo: 'Voce 1',
    icona: 'profile',
    fill: 'fff',
  }];

  it('counts EggMenuItem in EggMenu', () => {
    const renderedComponent = shallow(
      <EggMenu
        vociMenu={vociMenu}
        product={product}
        active
        animate
      />
    );
    expect(renderedComponent.find(EggMenuItem).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('counts EggMenus when empty', () => {
    const renderedComponent = shallow((
      <EggMenu vociMenu={[]} product={product} />
    ));
    expect(renderedComponent.find(EggMenuItem).length).toBe(0);
    expect(renderedComponent.find('li').length).toBe(0);
  });

  it('EggShell > onClick should call toggleEggMenu when animate == false and active == true', () => {
    const mockToggleEggMenu = jest.fn();
    const renderedComponent = shallow((
      <EggMenu
        vociMenu={vociMenu}
        product={product}
        toggleEggMenu={mockToggleEggMenu}
        animate={false}
        active
      />
    ));

    expect(mockToggleEggMenu).not.toHaveBeenCalled();
    renderedComponent.find(EggShell).props().onClick();
    expect(mockToggleEggMenu).toHaveBeenCalledWith('chiudi');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('EggShell > onClick should call toggleEggMenu when animate == false and active == false', () => {
    const mockToggleEggMenu = jest.fn();
    const renderedComponent = shallow((
      <EggMenu
        vociMenu={vociMenu}
        product={product}
        toggleEggMenu={mockToggleEggMenu}
        animate={false}
        active={false}
      />
    ));

    expect(mockToggleEggMenu).not.toHaveBeenCalled();
    renderedComponent.find(EggShell).props().onClick();
    expect(mockToggleEggMenu).toHaveBeenCalledWith('apri');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('EggShell > onClick should call toggleEggMenu when animate == true', () => {
    const mockToggleEggMenu = jest.fn();
    const renderedComponent = shallow((
      <EggMenu
        vociMenu={vociMenu}
        product={product}
        toggleEggMenu={mockToggleEggMenu}
        animate
      />
    ));

    expect(mockToggleEggMenu).not.toHaveBeenCalled();
    renderedComponent.find(EggShell).props().onClick();
    expect(mockToggleEggMenu).toHaveBeenCalledWith('');
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<EggShell />', () => {
  it('should render a Div tag', () => {
    const renderedComponent = shallow(<EggShell />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });
});

describe('<EggUl />', () => {
  it('should render a <ul> tag', () => {
    const renderedComponent = shallow(<EggUl />);
    expect(renderedComponent.type()).toEqual('ul');
  });
});

describe('<EggLi />', () => {
  it('should render a <li> tag', () => {
    const renderedComponent = shallow(<EggLi />);
    expect(renderedComponent.type()).toEqual('li');
  });
  it('should render its css w/ props active', () => {
    const active = true;
    const renderedComponent = shallow(<EggLi active={active} animate />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props active = false', () => {
    const active = false;
    const renderedComponent = shallow(<EggLi active={active} animate />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

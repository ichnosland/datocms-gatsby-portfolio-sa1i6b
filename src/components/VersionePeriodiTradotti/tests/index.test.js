import React from 'react';
import { shallow } from 'enzyme';

import Container from 'components/Container';
import { ListItem, ListLink } from 'components/NewListPanels';
import {
  VersionePeriodiTradotti,
  HeaderRiepilogo,
  BranoTradotto,
  TagTraduzione,
} from '../index';


const mockProps = {
  periodi: [{
    testoDaTradurre: 'testo da tradurre',
    testoTradotto: 'testo tradotto',
    mostraTestoTradotto: true,
    idPeriodo: 1,
    goTo: {
      enable: true,
      onClick: () => { },
    },
  }],
  titolo: 'titolo',
  sottotitolo: 'sottotitolo',
};

describe('<VersionePeriodiTradotti />', () => {
  it('fa il render di un paragrafo quando la funzione di goTo è abilitata', () => {
    const renderedComponent = shallow(
      <VersionePeriodiTradotti {...mockProps} />
    );

    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(HeaderRiepilogo).length).toBe(1);
    expect(renderedComponent.find(ListLink).length).toBe(1);
    expect(renderedComponent.find(ListItem).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('fa il render di un paragrafo quando goto = undefined', () => {
    const props = {
      ...mockProps,
      periodi: [{
        ...mockProps.periodi[0],
        goTo: undefined,
      }],
    };
    const renderedComponent = shallow(
      <VersionePeriodiTradotti {...props} />
    );

    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(HeaderRiepilogo).length).toBe(1);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('fa il render di un paragrafo se non ho specificato un titolo', () => {
    const props = {
      ...mockProps,
      titolo: undefined,
    };
    const renderedComponent = shallow(
      <VersionePeriodiTradotti {...props} />
    );

    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(HeaderRiepilogo).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('fa il render di un paragrafo quando goto.enabled = false', () => {
    const props = {
      ...mockProps,
      periodi: [{
        ...mockProps.periodi[0],
        goTo: {
          enable: false,
          onClick: () => { },
        },
      }],
    };
    const renderedComponent = shallow(
      <VersionePeriodiTradotti {...props} />
    );

    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(HeaderRiepilogo).length).toBe(1);
    expect(renderedComponent.find(ListLink).length).toBe(0);
    expect(renderedComponent.find(ListItem).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<HeaderRiepilogo />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<HeaderRiepilogo />);
    expect(renderedComponent.find('Div').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props modal', () => {
    const renderedComponent = shallow(<HeaderRiepilogo modal />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props modal & bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<HeaderRiepilogo modal bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props w/ theme', () => {
    const theme = {
      radius: {
        general: '80px',
      },
    };
    const renderedComponent = shallow(<HeaderRiepilogo modal theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<BranoTradotto />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<BranoTradotto />);
    expect(renderedComponent.find('Div').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props w/ theme', () => {
    const theme = {
      brand: 'green',
      radius: {
        general: '80px',
      },
    };
    const renderedComponent = shallow(<BranoTradotto theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<TagTraduzione />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<TagTraduzione />);
    expect(renderedComponent.type()).toEqual('span');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props w/ theme', () => {
    const theme = {
      brand: 'red',
    };
    const renderedComponent = shallow(<TagTraduzione theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

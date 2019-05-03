/**
*
* Profilo test
*
*/

import React from 'react';
import { shallow } from 'enzyme';

import { ListItemText } from 'components/NewListPanels';
import { Button } from 'components/Button';
import Profilo, { ListItemTextBrand } from '../index';

const theme = {
  brand: '#00BBEF',
};

const mockProfiloProps = {
  nome: 'Nome Cognome',
  email: 'mail@acme.com',
  logoutFunction: () => { },
  downloadDisponibili: [{
    slug: 'slug',
    titolo: 'titolo',
  }],
  downloadFunction: () => { },
};

describe('<Profilo />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<Profilo
      {...mockProfiloProps}
      premiumActive={false}
    />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ theme', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      premiumActive={false}
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its elements w/ props docente false', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      premiumActive={false}
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render premium button', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      docente={false}
      premiumActive={false}
      gotToPremiumFunction={() => { }}
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render premium button if punti > -1', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      docente={false}
      punti={123}
      premiumActive={false}
      gotToPremiumFunction={() => { }}
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its elements w/ props docente false & premiumActive true', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      docente={false}
      premiumActive
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its elements w/ props docente false & sound true', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      docente={false}
      premiumActive
      sound
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its elements w/ props toggleSuoniFx', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      toggleSuoniFx={() => { }}
      premiumActive
      sound
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its elements w/ props whatsapp', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      toggleSuoniFx={() => { }}
      sound
      premiumActive
      whatsapp="whatsapp://indirizzo"
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its elements w/ props versioneSoftware', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      toggleSuoniFx={() => { }}
      sound
      premiumActive
      versioneSoftware="1.2.3"
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its elements w/ props svuotaTokenFunction', () => {
    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...mockProfiloProps}
      svuotaTokenFunction={() => { }}
      sound
      premiumActive
    />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('ListItem > Button > onclick should call downloadFunction', () => {
    const props = {
      ...mockProfiloProps,
      downloadFunction: jest.fn(),
    };

    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...props}
      toggleSuoniFx={() => { }}
      premiumActive
      sound
    />);

    renderedComponent.find(Button).at(1).simulate('click');
    expect(props.downloadFunction).toHaveBeenCalledWith('slug');
  });

  it('ListItem > Button > onclick should call svuotaTokenFunction', () => {
    const props = {
      ...mockProfiloProps,
      svuotaTokenFunction: jest.fn(),
    };

    const renderedComponent = shallow(<Profilo
      theme={theme}
      {...props}
      toggleSuoniFx={() => { }}
      premiumActive
      sound
    />);

    renderedComponent.find(Button).at(1).simulate('click');
    expect(props.svuotaTokenFunction).toHaveBeenCalledWith();
  });
});

describe('<ListItemTextBrand />', () => {
  it('should render a ListItemText', () => {
    const renderedComponent = shallow(<ListItemTextBrand />);
    expect(renderedComponent.find(ListItemText).length).toEqual(1);
  });

  it('should render its css w/ theme', () => {
    const renderedComponent = shallow(<ListItemTextBrand theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

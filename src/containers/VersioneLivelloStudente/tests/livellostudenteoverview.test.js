import React from 'react';
import { shallow } from 'enzyme';

import Spinner from 'components/Spinner';
import Div from 'components/Div';
import { Button } from 'components/Button';
import { ListItem, ListItemText } from 'components/NewListPanels';

import VersioniLivelloOverview from '../LivelloStudenteOverview';


const mockProps = {
  titolo: 'titolo versione',
  datiVersione: {
    soloLatino: false,
    unitaSelezionate: [],
  },
  versioniAssegnate: [{
    id: 100,
    ritirata: false,
    in_corso: false,
    consegnata: false,
    titolo: 'titolo versione 1',
    assegnata_data: '11/03/2018',
    assegnazione: 1000,
    totale_domande: 12,
  }, {
    id: 200,
    ritirata: false,
    in_corso: true,
    consegnata: false,
    titolo: 'titolo versione 2',
    assegnata_data: '01/04/2018',
    assegnazione: 2000,
    totale_domande: 13,
  }, {
    id: 300,
    ritirata: false,
    in_corso: false,
    consegnata: true,
    titolo: 'titolo versione 3',
    assegnata_data: '11/05/2018',
    assegnazione: 3000,
    totale_domande: 14,
  }, {
    id: 400,
    ritirata: true,
    in_corso: true,
    consegnata: false,
    titolo: 'titolo versione 4',
    assegnata_data: '30/06/2018',
    assegnazione: 4000,
    totale_domande: 15,
  }, {
    id: 500,
    ritirata: true,
    in_corso: true,
    consegnata: true,
    titolo: 'titolo versione 5',
    assegnata_data: '21/07/2018',
    assegnazione: 5000,
    totale_domande: 16,
  }],
  visualizzaStatisticheFunction: () => { },
  eseguiFunction: () => { },
};


describe('<VersioniLivelloOverview />', () => {
  it('!spinner', () => {
    const renderedComponent = shallow(
      <VersioniLivelloOverview {...mockProps} />
    );

    expect((renderedComponent).find(Div).length).toBe(1);
    expect((renderedComponent).find(ListItem).length).toBe(10);
    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(Button).length).toBe(5);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo onClick dei pulsanti', () => {
    const props = {
      ...mockProps,
      visualizzaStatisticheFunction: jest.fn(),
      eseguiFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniLivelloOverview {...props} />
    );

    // esegui
    expect(props.eseguiFunction).not.toHaveBeenCalled();
    expect(
      renderedComponent.find(ListItemText).at(3).find(Button).props().children[1][3]
    ).toBe('Esegui');
    renderedComponent.find(ListItemText).at(3).find(Button).simulate('click');
    expect(props.eseguiFunction).toHaveBeenCalledWith({
      assegnata_data: '11/03/2018',
      consegnata: false,
      id: 100,
      in_corso: false,
      ritirata: false,
      titolo: 'titolo versione 1',
      assegnazione: 1000,
      totale_domande: 12,
    });

    // statistiche
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    expect(
      renderedComponent.find(ListItemText).at(15).find(Button).props().children[1][0]
    ).toBe('Statistiche');
    renderedComponent.find(ListItemText).at(15).find(Button).simulate('click');
    expect(props.visualizzaStatisticheFunction).toHaveBeenCalledWith(4000);
  });

  it('testo onClick non chiama funzioni di esegui / statistiche se consegnata ma non ritirata', () => {
    const props = {
      ...mockProps,
      visualizzaStatisticheFunction: jest.fn(),
      eseguiFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <VersioniLivelloOverview {...props} />
    );

    expect(props.eseguiFunction).not.toHaveBeenCalled();
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    expect(
      renderedComponent.find(ListItemText).at(11).find(Button).props().children[1][2]
    ).toBe('Consegnata');
    renderedComponent.find(ListItemText).at(11).find(Button).simulate('click');
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    expect(props.eseguiFunction).not.toHaveBeenCalled();
  });
});

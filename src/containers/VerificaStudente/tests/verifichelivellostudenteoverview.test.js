import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'components/Button';
import { ListItem, ListPanelHeader } from 'components/NewListPanels';
import VerificheLivelloStudenteOverview from '../VerificheLivelloStudenteOverview';


const mockProps = {
  verificheAssegnate: [{
    id: 16,
    unita: [{
      id: 1570,
      nome: 'Ripasso grammatica italiana: il verbo',
      domande: {
        conteggio_totale: 14,
        conteggio_lat_ita: 7,
      },
    }, {
      id: 161,
      nome: 'Ripasso analisi logica',
      domande: {
        conteggio_totale: 14,
        conteggio_lat_ita: 7,
      },
    }],
    titolo: 'Test di ingresso - 04/10/16',
    solo_latino: true,
    ritirata: true,
    consegnata: false,
  }, {
    id: 34,
    unita: [{
      id: 5,
      nome: 'Complementi in italiano',
      domande: {
        conteggio_totale: 15,
        conteggio_lat_ita: 6,
      },
    }],
    titolo: 'Test di ingresso - 12/10/16',
    solo_latino: false,
    ritirata: false,
    consegnata: false,
    in_corso: true,
  }, {
    id: 79,
    unita: [
      {
        id: 6,
        nome: 'Flessione nominale',
        domande: {
          conteggio_totale: 14,
          conteggio_lat_ita: 2,
        },
      },
    ],
    titolo: 'Test di ingresso - 26/10/16',
    solo_latino: false,
    ritirata: false,
    consegnata: true,
  }, {
    id: 709,
    unita: [
      {
        id: 16,
        nome: 'Titolo unità',
        domande: {
          conteggio_totale: 22,
          conteggio_lat_ita: 5,
        },
      },
    ],
    titolo: 'Test di ingresso - 11/10/13',
    solo_latino: false,
    ritirata: false,
    consegnata: false,
  }],
  visualizzaStatisticheFunction: () => { },
  eseguiFunction: () => { },
};


describe('<VerificheLivelloStudenteOverview />', () => {
  it('mostra elenco verifiche di livello assegnate', () => {
    const renderedComponent = shallow(
      <VerificheLivelloStudenteOverview {...mockProps} />
    );

    expect(renderedComponent.find('div > div').length).toBe(4);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(4);
    expect(renderedComponent.find(ListItem).length).toBe(13);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('il tasto esegui deve chiamare visualizzaStatisticheFunction se non ritirata', () => {
    const props = {
      ...mockProps,
      visualizzaStatisticheFunction: jest.fn(),
      eseguiFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheLivelloStudenteOverview {...props} />
    );

    expect(props.eseguiFunction).not.toHaveBeenCalled();
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    renderedComponent
      .find(Button).at(0)
      .simulate('click');
    expect(props.eseguiFunction).toHaveBeenCalledWith(34);
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
  });

  it('il tasto esegui deve chiamare visualizzaStatisticheFunction se non ritirata', () => {
    const props = {
      ...mockProps,
      visualizzaStatisticheFunction: jest.fn(),
      eseguiFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheLivelloStudenteOverview {...props} />
    );

    expect(props.eseguiFunction).not.toHaveBeenCalled();
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    renderedComponent
      .find(Button).at(3)
      .simulate('click');
    expect(props.eseguiFunction).not.toHaveBeenCalled();
    expect(props.visualizzaStatisticheFunction).toHaveBeenCalledWith(16);
  });

  it('il tasto esegui deve chiamare visualizzaStatisticheFunction se non ritirata e consegnata', () => {
    const props = {
      ...mockProps,
      visualizzaStatisticheFunction: jest.fn(),
      eseguiFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheLivelloStudenteOverview {...props} />
    );

    expect(props.eseguiFunction).not.toHaveBeenCalled();
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    renderedComponent
      .find(Button).at(1)
      .simulate('click');
    expect(props.eseguiFunction).not.toHaveBeenCalled();
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
  });
});

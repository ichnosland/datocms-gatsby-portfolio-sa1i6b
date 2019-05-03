import React from 'react';
import { shallow } from 'enzyme';

import Spinner from 'components/Spinner';
import { FlexBox } from 'components/FlexBox';
import Div from 'components/Div';
import { Button } from 'components/Button';
import { ExpandButtonGroup } from 'components/StyledButtonGroup';
import ListSideBox from 'components/NewListPanels/ListSideBox';
import { ListItem, ListItemText } from 'components/NewListPanels';

import VersioniLivelloOverview from '../LivelloDocenteOverview';


const mockProps = {
  titolo: 'titolo versione',
  datiVersione: {
    soloLatino: false,
    unitaSelezionate: [],
  },
  versioniAssegnate: [{
    id: 100,
    ritirata: false,
    titolo: 'titolo versione 1',
    assegnata_data: '11/03/2010',
  }, {
    id: 300,
    ritirata: true,
    titolo: 'titolo versione 1',
    assegnata_data: '11/03/2010',
  }],
  missioni: [{
    id: 'missione 1',
    ordine: 0,
    titolo: 'missione 1',
  }, {
    id: 'missione 2',
    ordine: 2,
    titolo: 'missione 2',
  }],
  versioniMissione: {
    'missione 1': [{
      assegnata: true,
      id: 100,
      titolo: 'titolo versione 1',
      totaleDomande: 12,
      ritirata: false,
    }],
    'missione 2': [{
      assegnata: false,
      id: 200,
      titolo: 'titolo versione 2',
      totaleDomande: 22,
    }, {
      assegnata: false,
      id: 300,
      titolo: 'titolo versione 3',
      totaleDomande: 32,
    }],
  },
  hasRisultati: true,
  spinner: {},
  unitaAssegnate: 2,
  totaleDomande: 10,
  tempoEsecuzione: 100,
  visualizzaStatisticheFunction: () => { },
  selezionaVersioneFunction: () => { },
  simulaFunction: () => { },
  assegnaFunction: () => { },
  ritiraFunction: () => { },
};


describe('<VersioniLivelloOverview />', () => {
  it('!spinner', () => {
    const renderedComponent = shallow(
      <VersioniLivelloOverview {...mockProps} />
    );

    expect((renderedComponent).find(Div).length).toBe(1);
    expect((renderedComponent).find(ExpandButtonGroup).length).toBe(1);
    expect((renderedComponent).find(FlexBox).length).toBe(1);
    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(Button).length).toBe(4);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('!spinner { assegna: true}', () => {
    const props = {
      ...mockProps,
      spinner: {
        assegna: true,
      },
    };
    const renderedComponent = shallow(
      <VersioniLivelloOverview {...props} />
    );

    expect((renderedComponent).find(Div).length).toBe(1);
    expect((renderedComponent).find(ExpandButtonGroup).length).toBe(1);
    expect((renderedComponent).find(FlexBox).length).toBe(1);
    expect((renderedComponent).find(Spinner).length).toBe(1);
    expect((renderedComponent).find(Button).length).toBe(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('!spinner { ritira_100: true}', () => {
    const props = {
      ...mockProps,
      spinner: {
        ritira_100: true,
      },
    };
    const renderedComponent = shallow(
      <VersioniLivelloOverview {...props} />
    );

    expect((renderedComponent).find(Div).length).toBe(1);
    expect((renderedComponent).find(ExpandButtonGroup).length).toBe(1);
    expect((renderedComponent).find(FlexBox).length).toBe(1);
    expect((renderedComponent).find(Spinner).length).toBe(1);
    expect((renderedComponent).find(Button).length).toBe(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo onClick dei pulsanti', () => {
    const props = {
      ...mockProps,
      simulaFunction: jest.fn(),
      assegnaFunction: jest.fn(),
      selezionaVersioneFunction: jest.fn(),
      visualizzaStatisticheFunction: jest.fn(),
      ritiraFunction: jest.fn(),
      versioneSelezionata: {
        id: 666,
      },
    };
    const renderedComponent = shallow(
      <VersioniLivelloOverview {...props} />
    );
    // simula prova
    expect(props.simulaFunction).not.toHaveBeenCalled();
    expect(
      renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(0).props().children[1]
    ).toBe('Prova');
    renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(0).simulate('click');
    expect(props.simulaFunction).toHaveBeenCalledWith();

    // assegna
    expect(props.assegnaFunction).not.toHaveBeenCalled();
    expect(
      renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(2).props().children[1]
    ).toBe('Assegna');
    renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(2).simulate('click');
    expect(props.assegnaFunction).toHaveBeenCalledWith(666);

    // ritira
    expect(props.ritiraFunction).not.toHaveBeenCalled();
    expect(
      renderedComponent.find('div div').at(2).find(Button).at(0).props().children
    ).toBe('Ritira');
    renderedComponent.find('div > div').at(2).find(Button).at(0).simulate('click');
    expect(props.ritiraFunction).toHaveBeenCalledWith(0);

    // statistiche
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    expect(
      renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(1).props().children[1]
    ).toBe('Risultati');
    renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(1).simulate('click');
    expect(props.visualizzaStatisticheFunction).toHaveBeenCalledWith();

    // seleziona
    expect(props.selezionaVersioneFunction).not.toHaveBeenCalled();
    const listItemSelectable = renderedComponent.find('div > div').at(1).find(ListItem).at(1);

    expect(listItemSelectable.find(ListItemText).props().children).toBe('titolo versione 3');
    listItemSelectable.find(ListSideBox).dive().find('input').simulate('click');
    expect(props.selezionaVersioneFunction).toHaveBeenCalledWith({
      assegnata: false,
      id: 300,
      titolo: 'titolo versione 3',
      totaleDomande: 32,
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import Spinner from 'components/Spinner';
import { FlexBox } from 'components/FlexBox';
import { Button } from 'components/Button';
import { ExpandButtonGroup } from 'components/StyledButtonGroup';
import { ListItem } from 'components/NewListPanels';
import ListSideBox from 'components/NewListPanels/ListSideBox';

import VerificheLivelloOverview from '../VerificheLivelloDocenteOverview';


const mockProps = {
  switcherLingua: true,
  titolo: 'titolo verifica',
  datiVerifica: {
    soloLatino: false,
    unitaSelezionate: [],
  },
  unita: [{
    id: 157,
    inVerifica: false,
    nome: 'Ripasso grammatica italiana: il verbo',
    domande: {
      conteggio_totale: 14,
      conteggio_lat_ita: 14,
    },
    assegnata: true,
  }, {
    id: 161,
    inVerifica: true,
    nome: 'Ripasso analisi logica',
    domande: {
      conteggio_totale: 14,
      conteggio_lat_ita: 14,
    },
    assegnata: true,
  }],
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
    solo_latino: false,
    ritirata: true,
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
  }],
  aggiungiUnitaFunction: () => { },
  verificheCartacee: [{
    id: 'livello_1_studente',
    titolo: 'Versione studente',
    slug: 'verifica-liv-2-studenti_alatin',
  }, {
    id: 'livello_1_docente',
    titolo: 'Versione docente',
    slug: 'verifica-liv-2-docenti_alatin',
  }],
  hasRisultati: true,
  spinner: {},
  unitaAssegnate: 2,
  totaleDomande: 10,
  tempoEsecuzione: 100,
  visualizzaStatisticheFunction: () => { },
  downloadProtettiFunction: () => { },
  assegnaFunction: () => { },
  simulaFunction: () => { },
  toggleSoloLatinoFunction: () => { },
  ritiraFunction: () => { },
};


describe('<VerificheLivelloOverview />', () => {
  it('!spinner', () => {
    const renderedComponent = shallow(
      <VerificheLivelloOverview {...mockProps} />
    );

    expect((renderedComponent).find(ExpandButtonGroup).length).toBe(1);
    expect((renderedComponent).find(FlexBox).length).toBe(2);
    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(Button).length).toBe(9);

    /**
     * PRIMO FLEXBOX:
     * pulsanti prova / assegna risultati
     * */
    // pulsante 1: prova
    const provaButtonProps = renderedComponent
      .find(ExpandButtonGroup).at(0).props()
      .children[0].props;
    expect(provaButtonProps.children[1]).toBe('Prova');
    expect(provaButtonProps.disabled).toBe(true);
    expect(provaButtonProps.onClick).toBe(mockProps.simulaFunction);
    // pulsante 2: assegna
    const assegnaButtonProps = renderedComponent.find(ExpandButtonGroup).at(0).props().children[2].props;
    expect(assegnaButtonProps.children[1]).toBe('Assegna');
    expect(assegnaButtonProps.disabled).toBe(true);
    expect(assegnaButtonProps.onClick).toBe(mockProps.assegnaFunction);

    // pulsante 3: risultati
    const risultatiButtonProps = renderedComponent
      .find(ExpandButtonGroup).at(0).props()
      .children[1].props;
    expect(risultatiButtonProps.children[1]).toBe('Risultati');
    expect(risultatiButtonProps.disabled).toBe(false);
    expect(risultatiButtonProps.onClick).toBe(mockProps.visualizzaStatisticheFunction);


    /**
     * SECONDO FLEXBOX:
     * pulsanti switch lat - ita
     * */
    const latItaButtonProps = renderedComponent
      .find(FlexBox).at(1).props()
      .children.props;
    expect(latItaButtonProps.children[0].props.children).toBe('lat-ita');
    expect(latItaButtonProps.children[0].props.onClick).toEqual(expect.any(Function));

    expect(latItaButtonProps.children[1].props.children).toBe('lat-ita + ita-lat');
    expect(latItaButtonProps.children[0].props.onClick).toEqual(expect.any(Function));

    expect(renderedComponent).toMatchSnapshot();
  });

  it('!spinner con switcherLingua = false', () => {
    const props = {
      ...mockProps,
      switcherLingua: false,
    };
    const renderedComponent = shallow(
      <VerificheLivelloOverview {...props} />
    );

    expect((renderedComponent).find(FlexBox).length).toBe(1);
    expect((renderedComponent).find(Spinner).length).toBe(0);
    expect((renderedComponent).find(Button).length).toBe(7);
  });

  it('!spinner { ritira_34: true}', () => {
    const props = {
      ...mockProps,
      spinner: {
        ritira_34: true,
      },
    };
    const renderedComponent = shallow(
      <VerificheLivelloOverview {...props} />
    );

    expect((renderedComponent).find(ExpandButtonGroup).length).toBe(1);
    expect((renderedComponent).find(FlexBox).length).toBe(2);
    expect((renderedComponent).find(Spinner).length).toBe(1);
    expect((renderedComponent).find(Button).length).toBe(8);
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
      <VerificheLivelloOverview {...props} />
    );

    expect((renderedComponent).find(ExpandButtonGroup).length).toBe(1);
    expect((renderedComponent).find(FlexBox).length).toBe(2);
    expect((renderedComponent).find(Spinner).length).toBe(1);
    expect((renderedComponent).find(Button).length).toBe(8);
    expect(renderedComponent).toMatchSnapshot();
  });


  it('testo onClick dei pulsanti', () => {
    const props = {
      ...mockProps,
      downloadProtettiFunction: jest.fn(),
      simulaFunction: jest.fn(),
      assegnaFunction: jest.fn(),
      visualizzaStatisticheFunction: jest.fn(),
      toggleSoloLatinoFunction: jest.fn(),
      aggiungiUnitaFunction: jest.fn(),
      ritiraFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <VerificheLivelloOverview {...props} />
    );

    // simula prova
    expect(props.simulaFunction).not.toHaveBeenCalled();
    renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(0).simulate('click');
    expect(props.simulaFunction).toHaveBeenCalledWith();

    // assegna
    expect(props.assegnaFunction).not.toHaveBeenCalled();
    renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(2).simulate('click');
    expect(props.assegnaFunction).toHaveBeenCalledWith();

    // statistiche
    expect(props.visualizzaStatisticheFunction).not.toHaveBeenCalled();
    renderedComponent.find(ExpandButtonGroup).at(0).find(Button).at(1).simulate('click');
    expect(props.visualizzaStatisticheFunction).toHaveBeenCalledWith();

    // toggle lingua
    expect(props.toggleSoloLatinoFunction).not.toHaveBeenCalled();
    // latino - ita
    renderedComponent.find(FlexBox).at(1).find(Button).at(0).simulate('click');
    expect(props.toggleSoloLatinoFunction).lastCalledWith(true);
    // latino - ita + ita - lat
    renderedComponent.find(FlexBox).at(1).find(Button).at(1).simulate('click');
    expect(props.toggleSoloLatinoFunction).lastCalledWith(false);
    // aggiungi unita non in verifica: disabilitato
    expect(renderedComponent.find(ListItem).at(0).dive().find('input').length).toBe(0);
    // aggiungi unita non in verifica: abilitato
    renderedComponent.find(ListItem).at(0).find(ListSideBox).at(0).dive().find('input').simulate('click');
    expect(props.aggiungiUnitaFunction).toHaveBeenCalledWith(157);

    // cartaceo
    expect(props.downloadProtettiFunction).not.toHaveBeenCalled();
    renderedComponent.find('div > div').at(1).find(Button).at(0).simulate('click');
    expect(props.downloadProtettiFunction).lastCalledWith('verifica-liv-2-studenti_alatin');

    renderedComponent.find('div > div').at(1).find(Button).at(1).simulate('click');
    expect(props.downloadProtettiFunction).lastCalledWith('verifica-liv-2-docenti_alatin');

    // verifiche assegnate
    expect(props.ritiraFunction).not.toHaveBeenCalled();
    renderedComponent.find('div > div').at(2).find(Button).at(0).simulate('click');
    expect(props.ritiraFunction).toHaveBeenCalledWith(1);
  });
});

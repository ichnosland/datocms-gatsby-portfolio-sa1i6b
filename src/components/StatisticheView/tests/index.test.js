import React from 'react';
import { shallow } from 'enzyme';

import Svg from 'components/Svg';
import { GhostButton } from 'components/Button';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';
import icon from 'icons/globals';
import { colore } from 'style/color';
import GraficoMedieCompito from '../GraficoIstogrammi';
import GraficoMedieVotiClasse from '../GraficoTorta';
import StatisticheView from '../index';
import {
  StatsCurrentUser,
  CloseSideBarBtn,
  CardToolbox,
  CardContent,
  ToggleDomanda,
  ToggleRisposta,
  ReportCardToolbar,
  SideBarReportistica,
} from '../StatsElements';

const mockProps = {
  isDocente: true,
  idAssegnazione: 1,
  apriChiudiSezioniFx: () => { },
  selezionaUtenteFx: () => { },
  traduzione: 'traduzione',
  studentiVersione: [{
    id: 335406,
    key: 0,
    first_name: 'nome',
    last_name: 'cognome',
    voto: 5,
  }, {
    id: 777,
    key: -1,
    first_name: 'non',
    last_name: 'consegnato',
  }, {
    id: 11111,
    key: -1,
    first_name: 'sara',
    last_name: 'abaca',
  }, {
    id: 11111,
    key: -1,
    first_name: 'sara',
    last_name: 'abaca',
  }],
  openedSections: {
    traduzione: {
      blocco: true,
    },
    menu: {
      blocco: false,
    },
    '1.0-1': {
      blocco: true,
      risposte: true,
      studenti: {},
    },
  },
  grafici: [{
    id: 1,
    media: 5.6,
    media_nazionale: 4.4,
    media_nazionale_campioni: 11,
    titolo: 'Titolo versione 1',
    scores: [{
      voto: 8.75,
      id: 335406,
    }, {
      voto: 8.75,
      id: 335380,
    }],
  }, {
    id: 2,
    media: 5.8,
    media_nazionale: 6.4,
    media_nazionale_campioni: 2,
    titolo: 'Titolo versione 2',
    scores: [{
      voto: 8.75,
      id: 335406,
    }, {
      voto: 2.75,
      id: 335380,
    }, {
      voto: 6.0625,
      id: 6666,
    }],
  }],
  utenteSelezionato: undefined,
  esercizi: {
    '1.0-1': {
      titolo: 'titolo esercizio',
      stepData: {
        esercizi: [],
        testi: [{
          testoConsegna: [{
            type: 'lessico',
            parola: 'Hinc',
            inputLessicale: {
              traduzione: 'da qui',
              focus: false,
              forma: 'hinc',
              lemma: 'hinc',
              tipo: null,
              tabelle: null,
            },
            id: 'lessico_0_Hinc',
          }, {
            type: 'text',
            content: ' ',
            id: 'text_1',
          }, {
            type: 'lessico',
            parola: 'ille',
            inputLessicale: {
              traduzione: 'quello',
              focus: false,
              forma: 'ille',
              lemma: 'ille',
              tipo: 'p',
              tabelle: null,
            },
            id: 'lessico_2_ille',
          }],
        }],
      },
    },
  },
  stepPks: ['1.0-1'],
  scores: [
    8.75,
    2.75,
    6.0625,
    2.0625,
  ],
  media: {
    '1.0-1': {
      risposte: [{
        corretta: false,
        studenti: [{
          id: 335340,
          nome: 'Sofia Formica',
        }],
        readable: 'readable risposta 1',
      }, {
        corretta: false,
        studenti: [{
          id: 335406,
          nome: 'Elisa Passerotto',
        }],
        readable: 'readable risposta 2',
      }],
      media: 0.8,
    },
  },
  onDidascaliaSet: () => { },
  onDidascaliaReset: () => { },
  didascalia: {
    display: false,
    tipologia: 'tipologia',
    y: 1,
    x: '#1',
    titolo: 'titolo',
    campioni: 1,
  },
};

describe('<StatisticheView />', () => {
  it('Mostro la condizione iniziale se non ho selezionato uno studente con vista docente', () => {
    const renderedComponent = shallow(
      <StatisticheView
        {...mockProps}
      />
    );

    expect(renderedComponent.find(GraficoMedieCompito).length).toBe(1);
    expect(renderedComponent.find(GraficoMedieVotiClasse).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostro un altro colore del grafico se idAssegnazione è diversa da quella del grafico', () => {
    const props = {
      ...mockProps,
      idAssegnazione: 555,
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent.find(GraficoMedieCompito).length).toBe(1);
    expect(renderedComponent.find(GraficoMedieVotiClasse).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostro la condizione iniziale se non ho selezionato uno studente con vista studente', () => {
    const props = {
      ...mockProps,
      isDocente: false,
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent.find(GraficoMedieCompito).length).toBe(1);
    expect(renderedComponent.find(GraficoMedieVotiClasse).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostro lo stato iniziale con utente selezionato', () => {
    const props = {
      ...mockProps,
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent.find(GraficoMedieCompito).length).toBe(1);
    expect(renderedComponent.find(GraficoMedieVotiClasse).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostro lo stato iniziale quando scores non è definito', () => {
    const props = {
      ...mockProps,
      scores: undefined,
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent.find(GraficoMedieCompito).length).toBe(1);
    expect(renderedComponent.find(GraficoMedieVotiClasse).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostro lo stato iniziale con utente selezionato che non esiste', () => {
    const props = {
      ...mockProps,
      utenteSelezionato: {
        id: 555,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent.find(GraficoMedieCompito).length).toBe(1);
    expect(renderedComponent.find(GraficoMedieVotiClasse).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostro lo stato iniziale con utente selezionato senza valutazione', () => {
    const props = {
      ...mockProps,
      utenteSelezionato: {
        id: 777,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent.find(GraficoMedieCompito).length).toBe(1);
    expect(renderedComponent.find(GraficoMedieVotiClasse).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Il pulsante "tutta la classe" deve chiamare selezionaUtenteFx resettando i dati', () => {
    const props = {
      ...mockProps,
      selezionaUtenteFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.selezionaUtenteFx).not.toHaveBeenCalled();
    renderedComponent.find('button').at(0).simulate('click');
    expect(props.selezionaUtenteFx).toHaveBeenCalledWith(undefined);
  });

  it('Il espandi studente deve chiamare selezionaUtenteFx con i dati dello studente', () => {
    const props = {
      ...mockProps,
      selezionaUtenteFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.selezionaUtenteFx).not.toHaveBeenCalled();
    renderedComponent.find(GhostButton).at(1).simulate('click');
    expect(props.selezionaUtenteFx).toHaveBeenCalledWith(props.studentiVersione[0]);
  });

  it('Espandi traduzione deve chiamare apriChiudiSezioniFx', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(CardToolbox).at(0).simulate('click');
    expect(
      renderedComponent.find(CardToolbox).at(0).find(Svg).props()
    ).toEqual(icon.chevronDown);
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith(
      'traduzione',
      false,
    );
  });

  it('Espandi traduzione, se già chiusa, deve avere icona chevronUp', () => {
    const props = {
      ...mockProps,
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        traduzione: {
          blocco: false,
        },
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(
      renderedComponent.find(CardToolbox).at(0).find(Svg).props()
    ).toEqual(icon.chevronUp);
  });

  it('Espandi traduzione deve chiamare apriChiudiSezioniFx per gli step eseguiti', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(CardToolbox).length).toBe(2);
    expect(
      renderedComponent.find(CardToolbox).at(1).find(Svg).props()
    ).toEqual(icon.chevronUp);
    renderedComponent.find(CardToolbox).at(1).simulate('click');
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith(
      '1.0-1',
      false,
    );
  });

  it('Espandi menu deve chiamare apriChiudiSezioniFx', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(StatsCurrentUser).at(0).find(GhostButton).simulate('click');
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('menu', true);
  });

  it('CloseSideBarBtn (menu) deve chiamare apriChiudiSezioniFx', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(CloseSideBarBtn).simulate('click');
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('menu', true);
  });

  it('Espandi esercizio, se già chiuso, deve avere icona chevronDown', () => {
    const props = {
      ...mockProps,
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        ...mockProps.openedSections,
        '1.0-1': {
          blocco: false,
          risposte: false,
          studenti: {},
        },
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(
      renderedComponent.find(CardToolbox).at(1).find(Svg).props()
    ).toEqual(icon.chevronDown);
    expect(renderedComponent.find(CardToolbox).length).toBe(2);
  });

  it('Controlla gli argomenti passati a apriChiudiSezioniFx in CloseSideBarBtn: se openedSections.menu == undefined', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        ...mockProps.openedSections,
        menu: undefined,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(CloseSideBarBtn).props().onClick();
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('menu', true);
  });

  it('Controlla gli argomenti passati a apriChiudiSezioniFx in StatsCurrentUser: se openedSections.menu == undefined', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        ...mockProps.openedSections,
        menu: undefined,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(StatsCurrentUser).find(GhostButton).props().onClick();
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('menu', true);
  });

  it('Controlla gli argomenti passati a apriChiudiSezioniFx se openedSections.traduzione == undefined', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        ...mockProps.openedSections,
        traduzione: undefined,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(CardToolbox).at(0).props().onClick();
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('traduzione', false);
  });

  it('Controlla gli argomenti passati a ReportCardToolbar se openedSections.1.0-1 == undefined', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        ...mockProps.openedSections,
        '1.0-1': undefined,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(ReportCardToolbar).at(1).find(CardToolbox).props().onClick();
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('1.0-1', false);
  });

  it('Controlla gli argomenti passati a CardContent > ToggleDomanda se openedSections.traduzione == undefined', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        ...mockProps.openedSections,
        '1.0-1': undefined,
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(CardContent).find(ToggleDomanda).props().onClick();
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('1.0-1', true, true);
  });

  it('ToggleDomanda (esercizio) deve chiamare apriChiudiSezioniFx', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        traduzione: {
          blocco: true,
        },
        menu: {
          blocco: false,
        },
        '1.0-1': {
          blocco: true,
          risposte: false,
        },
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(ToggleDomanda).simulate('click');
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith('1.0-1', true, true);
  });

  it('Controllo che non esploda se non ho media[stepId]', () => {
    const props = {
      ...mockProps,
      media: {},
      openedSections: {
        '1.0-1': {
          blocco: true,
          risposte: true,
          studenti: {
            0: true,
          },
        },
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('Controllo che non esploda se ho media[stepId] ma non le altre chiavi', () => {
    const props = {
      ...mockProps,
      media: {
        '1.0-1': {},
      },
      openedSections: {
        '1.0-1': {
          blocco: true,
          risposte: true,
          studenti: {
            0: true,
          },
        },
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('ToggleRisposta deve chiamare apriChiudiSezioniFx per gli studenti', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        '1.0-1': {
          blocco: true,
          risposte: true,
          studenti: {},
        },
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(ToggleRisposta).at(0).simulate('click');
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith(
      '1.0-1', true, true, { 0: true }
    );
  });

  it('ToggleRisposta deve chiudere apriChiudiSezioniFx per gli studenti', () => {
    const props = {
      ...mockProps,
      apriChiudiSezioniFx: jest.fn(),
      utenteSelezionato: {
        id: 335406,
        key: 0,
      },
      openedSections: {
        '1.0-1': {
          blocco: true,
          risposte: true,
          studenti: {
            0: true,
          },
        },
      },
    };
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(props.apriChiudiSezioniFx).not.toHaveBeenCalled();
    renderedComponent.find(ToggleRisposta).at(0).simulate('click');
    expect(props.apriChiudiSezioniFx).toHaveBeenCalledWith(
      '1.0-1', true, true, { 0: false }
    );
  });

  it('testiamo il comportamento di calcolaMedia', () => {
    const renderedComponent = shallow(
      <StatisticheView
        {...mockProps}
      />
    );

    const instance = renderedComponent.instance();
    expect(instance.calcolaMedia(0.499999)).toBe('male');
    expect(instance.calcolaMedia(0.5)).toBe('media');
    expect(instance.calcolaMedia(0.699999)).toBe('media');
    expect(instance.calcolaMedia(0.7)).toBe('bene');
    expect(instance.calcolaMedia(-1)).toBe('male');
  });

  it('SideBarReportistica > CountBadgeItem usa colori in base al voto', () => {
    const props = {
      ...mockProps,
      studentiVersione: [{
        id: 10,
        key: 0,
        first_name: 'nome',
        last_name: 'cognome',
        voto: 4,
      }, {
        id: 11,
        key: 0,
        first_name: 'nome',
        last_name: 'cognome 2',
        voto: 9,
      }, {
        id: 12,
        key: 0,
        first_name: 'nome',
        last_name: 'cognome 3',
        voto: 6,
      }],
    };
    const { stats: { pie: { bad, good, medium } } } = colore;
    const renderedComponent = shallow(
      <StatisticheView
        {...props}
      />
    );

    expect(renderedComponent.find(SideBarReportistica)
      .find(CountBadge).at(0)
      .find(CountBadgeItem).dive().dive()
      .props().bgcolor()).toBe(good);

    expect(renderedComponent.find(SideBarReportistica)
      .find(CountBadge).at(1)
      .find(CountBadgeItem).dive().dive()
      .props().bgcolor()).toBe(medium);

    expect(renderedComponent.find(SideBarReportistica)
      .find(CountBadge).at(2)
      .find(CountBadgeItem).dive().dive()
      .props().bgcolor()).toBe(bad);
  });
});

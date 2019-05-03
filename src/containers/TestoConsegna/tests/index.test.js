import React from 'react';
import { shallow, mount } from 'enzyme';
import TeX from '@matejmazur/react-katex';

import Div from 'components/Div';
import { H2 } from 'components/Heading';
import { Lessico, Contesto } from 'components/Text';
import { mockElementiU } from 'common/testing-mocks';
import Page from 'components/Page';
import Container from 'components/Container';
import TabelleList from 'components/TabelleList';
import AudioPlayer from '../AudioPlayer';

import TestoConsegna, {
  BloccoConsegna,
  LessicoContainer,
  NoSelect,
  ButtonConiugazione,
} from '../index';


const mockTesti = [
  {
    type: 'lessico',
    parola: 'Hi_nc',
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
    content: ' te_xt ',
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
  }, {
    type: 'text',
    content: ' ',
    id: 'text_3',
  }, {
    type: 'lessico',
    parola: 'Gyges',
    inputLessicale: {
      traduzione: 'Gige',
      focus: false,
      forma: 'gyges',
      lemma: 'Gyges',
      tipo: null,
      tabelle: null,
    },
    id: 'lessico_4_Gyges',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_5',
  }, {
    type: 'lessico',
    parola: 'inducitur',
    inputLessicale: {
      traduzione: 'presentare',
      focus: false,
      forma: 'inducitur',
      lemma: 'induco',
      tipo: 'v',
      tabelle: null,
    },
    id: 'lessico_6_inducitur',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_7',
  }, {
    type: 'lessico',
    parola: 'a',
    inputLessicale: {
      traduzione: 'da',
      focus: false,
      forma: 'a',
      lemma: 'a',
      tipo: null,
      tabelle: null,
    },
    id: 'lessico_8_a',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_9',
  }, {
    type: 'lessico',
    parola: 'Platone',
    inputLessicale: {
      traduzione: 'Platone',
      focus: false,
      forma: 'platone',
      lemma: 'Plato',
      tipo: 'n',
      tabelle: null,
    },
    id: 'lessico_10_Platone',
  }, {
    type: 'text',
    content: ', ',
    id: 'text_11',
  }, {
    type: 'lessico',
    parola: 'qui',
    inputLessicale: {
      traduzione: 'il quale',
      focus: false,
      forma: 'qui',
      lemma: 'qui',
      tipo: 'p',
      tabelle: null,
    },
    id: 'lessico_12_qui',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_13',
  }, {
    type: 'lessico',
    parola: 'cum',
    inputLessicale: {
      traduzione: 'poiché',
      focus: false,
      forma: 'cum',
      lemma: 'cum',
      tipo: null,
      tabelle: null,
    },
    id: 'lessico_14_cum',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_15',
  }, {
    type: 'lessico',
    parola: 'terra',
    inputLessicale: {
      traduzione: 'terra',
      focus: false,
      forma: 'terra',
      lemma: 'terra',
      tipo: 'n',
      tabelle: null,
    },
    id: 'lessico_16_terra',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_17',
  }, {
    type: 'lessico',
    parola: 'discessisset',
    inputLessicale: {
      traduzione: 'aprirsi',
      focus: false,
      forma: 'discessisset',
      lemma: 'discedo',
      tipo: 'v',
      tabelle: null,
    },
    id: 'lessico_18_discessisset',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_19',
  }, {
    type: 'lessico',
    parola: 'magnis',
    inputLessicale: {
      traduzione: 'abbondante',
      focus: false,
      forma: 'magnis',
      lemma: 'magnus',
      tipo: 'a',
      tabelle: null,
    },
    id: 'lessico_20_magnis',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_21',
  }, {
    type: 'lessico',
    parola: 'quibusdam',
    inputLessicale: {
      traduzione: 'qualcuno',
      focus: false,
      forma: 'quibusdam',
      lemma: 'quidam',
      tipo: 'p',
      tabelle: null,
    },
    id: 'lessico_22_quibusdam',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_23',
  }, {
    type: 'lessico',
    parola: 'imbribus',
    inputLessicale: {
      traduzione: 'pioggia',
      focus: false,
      forma: 'imbribus',
      lemma: 'imber',
      tipo: 'n',
      tabelle: null,
    },
    id: 'lessico_24_imbribus',
  }, {
    type: 'text',
    content: ', ',
    id: 'text_25',
  }, {
    type: 'lessico',
    parola: 'descendit',
    inputLessicale: {
      traduzione: 'discendere',
      focus: false,
      forma: 'descendit',
      lemma: 'descendo',
      tipo: 'v',
      tabelle: null,
    },
    id: 'lessico_26_descendit',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_27',
  }, {
    type: 'lessico',
    parola: 'in',
    inputLessicale: {
      traduzione: 'in',
      focus: false,
      forma: 'in',
      lemma: 'in',
      tipo: null,
      tabelle: null,
    },
    id: 'lessico_28_in',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_29',
  }, {
    type: 'lessico',
    parola: 'illum',
    inputLessicale: {
      traduzione: 'quello',
      focus: false,
      forma: 'illum',
      lemma: 'ille',
      tipo: 'p',
      tabelle: null,
    },
    id: 'lessico_30_illum',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_31',
  }, {
    type: 'lessico',
    parola: 'hiatum',
    inputLessicale: {
      traduzione: 'voragine',
      focus: false,
      forma: 'hiatum',
      lemma: 'hiatus',
      tipo: 'n',
      tabelle: null,
    },
    id: 'lessico_32_hiatum',
  }, {
    type: 'text',
    content: ' ',
    id: 'text_33',
  }, {
    type: 'context',
    id: 'context_34',
    children: [{
      type: 'lessico',
      parola: 'aeneumque',
      inputLessicale: {
        traduzione: 'di bronzo',
        focus: false,
        forma: 'aeneumque',
        lemma: 'aeneus',
        tipo: 'a',
        tabelle: null,
      },
      id: 'lessico_0_aeneumque',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_1',
    }, {
      type: 'lessico',
      parola: 'equum',
      inputLessicale: {
        traduzione: 'cavallo',
        focus: false,
        forma: 'equum',
        lemma: 'equus',
        tipo: 'n',
        tabelle: null,
      },
      id: 'lessico_2_equum',
    }, {
      type: 'text',
      content: ', ',
      id: 'text_3',
    }, {
      type: 'lessico',
      parola: 'ut',
      inputLessicale: {
        traduzione: 'come',
        focus: false,
        forma: 'ut',
        lemma: 'ut',
        tipo: null,
        tabelle: null,
      },
      id: 'lessico_4_ut',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_5',
    }, {
      type: 'lessico',
      parola: 'ferunt',
      inputLessicale: {
        traduzione: 'raccontare',
        focus: false,
        forma: 'ferunt',
        lemma: 'fero',
        tipo: 'v',
        tabelle: null,
      },
      id: 'lessico_6_ferunt',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_7',
    }, {
      type: 'lessico',
      parola: 'fabulae',
      inputLessicale: {
        traduzione: 'leggenda',
        focus: false,
        forma: 'fabulae',
        lemma: 'fabula',
        tipo: 'n',
        tabelle: null,
      },
      id: 'lessico_8_fabulae',
    }, {
      type: 'text',
      content: ', ',
      id: 'text_9',
    }, {
      type: 'lessico',
      parola: 'animadvertit',
      inputLessicale: {
        traduzione: 'notare',
        focus: false,
        forma: 'animadvertit',
        lemma: 'animadverto',
        tipo: 'v',
        tabelle: null,
      },
      id: 'lessico_10_animadvertit',
    }, {
      type: 'text',
      content: ', ',
      id: 'text_11',
    }, {
      type: 'lessico',
      parola: 'cuius',
      inputLessicale: {
        traduzione: 'il quale',
        focus: false,
        forma: 'cuius',
        lemma: 'cuius',
        tipo: 'a',
        tabelle: null,
      },
      id: 'lessico_12_cuius',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_13',
    }, {
      type: 'lessico',
      parola: 'in',
      inputLessicale: {
        traduzione: 'in',
        focus: false,
        forma: 'in',
        lemma: 'in',
        tipo: null,
        tabelle: null,
      },
      id: 'lessico_14_in',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_15',
    }, {
      type: 'lessico',
      parola: 'lateribus',
      inputLessicale: {
        traduzione: 'fianco',
        focus: false,
        forma: 'lateribus',
        lemma: 'later',
        tipo: 'n',
        tabelle: null,
      },
      id: 'lessico_16_lateribus',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_17',
    }, {
      type: 'lessico',
      parola: 'fores',
      inputLessicale: {
        traduzione: 'porta',
        focus: false,
        forma: 'fores',
        lemma: 'foris',
        tipo: 'n',
        tabelle: null,
      },
      id: 'lessico_18_fores',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_19',
    }, {
      type: 'lessico',
      parola: 'essent',
      inputLessicale: {
        traduzione: 'esserci',
        focus: false,
        forma: 'essent',
        lemma: 'sum',
        tipo: 'v',
        tabelle: null,
      },
      id: 'lessico_20_essent',
    }, {
      type: 'text',
      content: ' ',
      id: 'text_21',
    }],
  }, {
    type: 'text',
    content: '.',
    id: 'text_35',
  }, {
    type: 'html',
    content: '<strong>blocco html</strong>',
    id: 'text_36',
  }, {
    type: 'image',
    content: '<img src="immagine.png" />',
    id: 'image_36',
  }];

const mockProps = {
  hasLessico: true,
  hideTooltip: false,
  margin: '0 auto',
  rispostaSelezionata: [],
  step: {
    id: 1002,
    testi: [{
      id: 2006,
      testoConsegna: mockTesti,
    }],
    esercizi: [{
      titolo: 'titolo esercizio',
      tipo: 'U',
    }],
  },
  apriModalFunction: () => { },
};


describe('<TestoConsegna />', () => {
  it('mostra solo parole quando il lessico è attivato', () => {
    const renderedComponent = shallow(
      <TestoConsegna {...mockProps} />
    );
    expect(renderedComponent.find(AudioPlayer).length).toBe(0);
    expect(renderedComponent.find(NoSelect).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(1);
    expect(renderedComponent.find(H2).props().children).toBe('titolo esercizio');
    expect(renderedComponent.find(BloccoConsegna).length).toBe(1);
    expect(renderedComponent.find(Lessico).length).toBe(28);
    expect(renderedComponent.find(Contesto).length).toBe(1);
    expect(renderedComponent.find(LessicoContainer).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('mostra solo parole quando il lessico è disattivato', () => {
    const props = {
      ...mockProps,
      hasLessico: false,
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    expect(renderedComponent.find(NoSelect).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(1);
    expect(renderedComponent.find(H2).props().children).toBe('titolo esercizio');
    expect(renderedComponent.find(BloccoConsegna).length).toBe(1);
    expect(renderedComponent.find(Lessico).length).toBe(0);
    expect(renderedComponent.find(Contesto).length).toBe(1);
    expect(renderedComponent.find(LessicoContainer).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('mostra latex', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          id: 2006,
          testoConsegna: [{
            type: 'latex',
            content: '\\sqrt(3+4)',
            id: 'latex_0',
          }, {
            type: 'text',
            content: 'testo',
            id: 'text_1',
          }],
        }],
      },
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    expect(renderedComponent.find(NoSelect).length).toBe(1);
    expect(renderedComponent.find(BloccoConsegna).length).toBe(1);
    expect(renderedComponent.find(Lessico).length).toBe(0);
    expect(renderedComponent.find(Contesto).length).toBe(0);
    expect(renderedComponent.find(TeX).length).toBe(1);
    expect(renderedComponent.find(LessicoContainer).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('mostro ButtonConiugazione e attivo popup se tipo declinazione', () => {
    const testiConiugazione = [{
      type: 'lessico',
      parola: 'Hi_nc',
      inputLessicale: {
        traduzione: 'da qui',
        focus: false,
        forma: 'hinc',
        lemma: 'hinc',
        tipo: null,
        tabelle: [{
          titolo: 'tabella uno',
          righe: [{
            label: 't1 l1',
            valore: '1',
          }, {
            label: 't1 l2', valore: '2',
          }],
        }, {
          titolo: 'tabella due',
          righe: [{
            label: 't2 l1',
            valore: '3',
          }, {
            label: 't2 l2',
            valore: '4',
          }],
        }],
      },
      id: 'lessico_0_Hinc',
    }];

    jest.clearAllMocks();
    const props = {
      ...mockProps,
      hideTooltip: false,
      apriModalFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      tooltipContent: {
        ...testiConiugazione[0],
        inputLessicale: {
          ...testiConiugazione[0].inputLessicale,
          tipo: 'n',
        },
      },
      tooltip: { left: 10, right: 20, top: 30, height: 40, width: 50 },
      lessico: { left: 11, right: 22, top: 33, height: 44, width: 55 },
    });

    renderedComponent.update();

    expect(renderedComponent.find(LessicoContainer).length).toBe(1);
    expect(renderedComponent.find(ButtonConiugazione).length).toBe(1);
    expect(renderedComponent.find(ButtonConiugazione).props().children).toBe('Declinazione');
    renderedComponent.find(ButtonConiugazione).simulate('click');
    expect(props.apriModalFunction).toHaveBeenCalledWith({
      topbar: true,
      barcolor: 'rgb(179, 166, 255)',
      titolo: 'hinc',
      isPopup: false,
      bgcolor: 'transparent',
      contenuto: (
        <Page full>
          <Container>
            <TabelleList
              margin="0 0 16px"
              radius="3px"
              userSelect="none"
              key="tabella_risposte"
              tabelle={[{
                intestazione: 'tabella uno',
                righe: [[{
                  titolo: 't1 l1',
                }, {
                  titolo: '1',
                }], [{
                  titolo: 't1 l2',
                }, {
                  titolo: '2',
                }]],
              }, {
                intestazione: 'tabella due',
                righe: [[{
                  titolo: 't2 l1',
                }, {
                  titolo: '3',
                }], [{
                  titolo: 't2 l2',
                }, {
                  titolo: '4',
                }]],
              }]}
            />
          </Container>
        </Page>
      ),
      show: true,
    });
  });

  it('mostro ButtonConiugazione e attivo popup se tipo coniugazione', () => {
    const testiConiugazione = [{
      type: 'lessico',
      parola: 'Hi_nc',
      inputLessicale: {
        traduzione: 'da qui',
        focus: false,
        forma: 'hinc',
        lemma: 'hinc',
        tipo: null,
        tabelle: [{
          titolo: 'tabella uno',
          righe: [{
            label: 't1 l1',
            valore: '1',
          }, {
            label: 't1 l2', valore: '2',
          }],
        }, {
          titolo: 'tabella due',
          righe: [{
            label: 't2 l1',
            valore: '3',
          }, {
            label: 't2 l2',
            valore: '4',
          }],
        }],
      },
      id: 'lessico_0_Hinc',
    }];

    jest.clearAllMocks();
    const props = {
      ...mockProps,
      hideTooltip: false,
      apriModalFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    instance.setState({
      tooltipContent: {
        ...testiConiugazione[0],
        inputLessicale: {
          ...testiConiugazione[0].inputLessicale,
          tipo: 'v',
        },
      },
      tooltip: { left: 10, right: 20, top: 30, height: 40, width: 50 },
      lessico: { left: 11, right: 22, top: 33, height: 44, width: 55 },
    });

    renderedComponent.update();

    expect(renderedComponent.find(ButtonConiugazione).length).toBe(1);
    expect(renderedComponent.find(ButtonConiugazione).props().children).toBe('Coniugazione');
  });

  it('nascondo il titolo', () => {
    const props = {
      ...mockProps,
      nascondiTitolo: true,
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    expect(renderedComponent.find(NoSelect).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(0);
    expect(renderedComponent.find(BloccoConsegna).length).toBe(1);
    expect(renderedComponent.find(Lessico).length).toBe(28);
    expect(renderedComponent.find(Contesto).length).toBe(1);
    expect(renderedComponent.find(LessicoContainer).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('quando è attiva la flag mostraPerStampa mi deve mostrare anche il testo esercizio', () => {
    const props = {
      ...mockProps,
      mostraPerStampa: true,
      step: {
        ...mockProps.step,
        esercizi: [mockElementiU[1], mockElementiU[2]],
      },
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    expect(renderedComponent.find(NoSelect).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(1);
    expect(renderedComponent.find(BloccoConsegna).length).toBe(1);
    expect(renderedComponent.find(Lessico).length).toBe(28);
    expect(renderedComponent.find(Contesto).length).toBe(3);
    expect(renderedComponent.find(LessicoContainer).length).toBe(0);
    expect(
      renderedComponent.find(BloccoConsegna)
        .find('div').at(1).text()
    ).toEqual('Il contadino<Text__Contesto />, poi<Text__Contesto />');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il titolo se !step.esercizi[0].titolo usando step.testi[0].titolo', () => {
    const props = { ...mockProps };
    props.step.esercizi[0].titolo = undefined;
    props.step.testi[0].titolo = 'fallback titolo';

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    expect(renderedComponent.find(NoSelect).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(1);
    expect(renderedComponent.find(H2).props().children).toBe('fallback titolo');
    expect(renderedComponent.find(BloccoConsegna).length).toBe(1);
    expect(renderedComponent.find(Lessico).length).toBe(28);
    expect(renderedComponent.find(Contesto).length).toBe(1);
    expect(renderedComponent.find(LessicoContainer).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('toggleAperti se la chiave non è aperta', () => {
    const renderedComponent = shallow(
      <TestoConsegna {...mockProps} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'aggiornaState');
    expect(spy).not.toHaveBeenCalled();
    instance.toggleAperti({ id: 'key', inputLessicale: {} });
    expect(spy).toHaveBeenCalledWith({
      tooltipContent: { id: 'key', inputLessicale: {} },
    });
  });

  it('toggleAperti se la chiave è già aperta, la chiudo', () => {
    const renderedComponent = shallow(
      <TestoConsegna {...mockProps} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setState');

    expect(spy).not.toHaveBeenCalled();
    instance.toggleAperti({ id: 'key', inputLessicale: {} });
    expect(spy).toHaveBeenLastCalledWith({
      tooltipContent: { id: 'key', inputLessicale: {} },
    });
    instance.toggleAperti({ id: 'key', inputLessicale: {} });
    expect(spy).toHaveBeenLastCalledWith({
      tooltipContent: { id: undefined },
    });
  });

  it('componentDidUpdate se nascondo il tooltip nell\'aggiornamento', () => {
    jest.clearAllMocks();
    const spyUpdate = jest.spyOn(TestoConsegna.prototype, 'componentDidUpdate');
    const props = {
      ...mockProps,
      hideTooltip: true,
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    expect(spyUpdate).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();

    const spy = jest.spyOn(instance, 'toggleAperti');
    expect(spy).not.toHaveBeenCalled();
    instance.componentDidUpdate({ hideTooltip: false }, { tooltipContent: { id: 'key' } });
    expect(spyUpdate).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({ id: undefined });
  });

  it('componentDidUpdate se non nascondo il tooltip nell\'aggiornamento', () => {
    jest.clearAllMocks();
    const spyUpdate = jest.spyOn(TestoConsegna.prototype, 'componentDidUpdate');
    const props = {
      ...mockProps,
      hideTooltip: false,
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );


    const instance = renderedComponent.instance();
    expect(spyUpdate).not.toHaveBeenCalled();
    instance.setState({
      tooltipContent: mockTesti[0],
      tooltip: { left: 10, right: 20, top: 30, height: 40, width: 50 },
      lessico: { left: 11, right: 22, top: 33, height: 44, width: 55 },
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    renderedComponent.update();

    const spy = jest.spyOn(instance, 'aggiornaState');
    expect(spy).not.toHaveBeenCalled();

    instance.setState({
      tooltipContent: mockTesti[2],
    });
    renderedComponent.update();

    expect(renderedComponent.find(LessicoContainer).length).toBe(1);
    expect(renderedComponent.find(LessicoContainer).props().left).toBe(13.5);
    expect(renderedComponent.find(LessicoContainer).props().top).toBe(99);

    expect(spyUpdate).toHaveBeenCalledTimes(2);
  });

  it('Lessico.onClick deve chiamare this.toggleAperti se hasLessico e !hideTooltip', () => {
    const props = {
      ...mockProps,
      hasLessico: true,
      hideTooltip: false,
    };
    const renderedComponent = mount(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'toggleAperti');
    expect(spy).not.toHaveBeenCalled();
    expect('lessicocontainer_block_lessico_0_Hinc' in instance.tooltipRefs).toBeFalsy();

    renderedComponent.find(Lessico).at(0).props().onClick();
    renderedComponent.find(Lessico).at(0).simulate('click');
    expect('lessicocontainer_block_lessico_0_Hinc' in instance.tooltipRefs).toBeTruthy();
    expect(spy).toHaveBeenCalledWith({
      id: 'lessico_0_Hinc',
      inputLessicale: mockTesti[0].inputLessicale,
      parola: 'Hi_nc',
      type: 'lessico',
    });
  });

  it('Lessico.onClick non deve settare elementi Lessico se non ho hasLessico e !hideTooltip', () => {
    const props = {
      ...mockProps,
      hasLessico: true,
      hideTooltip: true,
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    expect(renderedComponent.find(Lessico).length).toBe(0);
    expect(renderedComponent.find(BloccoConsegna).find('div').at(0).props().children).toEqual([
      'Hi nc',
      ' te xt ',
      'ille',
      ' ',
      'Gyges',
      ' ',
      'inducitur',
      ' ',
      'a',
      ' ',
      'Platone',
      ', ',
      'qui',
      ' ',
      'cum',
      ' ',
      'terra',
      ' ',
      'discessisset',
      ' ',
      'magnis',
      ' ',
      'quibusdam',
      ' ',
      'imbribus',
      ', ',
      'descendit',
      ' ',
      'in',
      ' ',
      'illum',
      ' ',
      'hiatum',
      ' ',
      expect.any(Object), // contesto
      '.',
      expect.any(Object), // html
      expect.any(Object), // immagine
    ]);

    // contenuto blocco contesto
    expect(renderedComponent.find(BloccoConsegna).find(Contesto).at(0).props().children).toEqual([
      'aeneumque',
      ' ',
      'equum',
      ', ',
      'ut',
      ' ',
      'ferunt',
      ' ',
      'fabulae',
      ', ',
      'animadvertit',
      ', ',
      'cuius',
      ' ',
      'in',
      ' ',
      'lateribus',
      ' ',
      'fores',
      ' ',
      'essent',
      ' ',
    ]);
  });

  it('mostra player audio', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    expect(renderedComponent.find(AudioPlayer).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(1);
    expect(renderedComponent.find(BloccoConsegna).length).toBe(1);
    expect(renderedComponent.find(Lessico).length).toBe(28);
    expect(renderedComponent.find(Contesto).length).toBe(1);
    expect(renderedComponent.find(LessicoContainer).length).toBe(0);

    // controllo se ho inizializzato howler nello state
    const instance = renderedComponent.instance();
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: false,
        locked: false,
        fileName: 'nome_file.mp3',
        counterRepetitions: 0,
      },
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('audioPlay senza pausa', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    instance.state.audioPlayback[2006].controller.play = jest.fn();
    instance.state.audioPlayback[2006].controller.pause = jest.fn();
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: false,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
    instance.audioPlay(2006);
    expect(instance.state.audioPlayback[2006].controller.play).toHaveBeenCalledWith();
    expect(instance.state.audioPlayback[2006].controller.pause).not.toHaveBeenCalledWith();
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: true,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
  });

  it('audioPlay con pausa', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    instance.state.audioPlayback[2006].controller.play = jest.fn();
    instance.state.audioPlayback[2006].controller.pause = jest.fn();
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: false,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
    instance.audioPlay(2006, true);
    expect(instance.state.audioPlayback[2006].controller.play).not.toHaveBeenCalledWith();
    expect(instance.state.audioPlayback[2006].controller.pause).toHaveBeenCalledWith();
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: true,
        played: false,
        playing: false,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
  });

  it('audioPlay con id a caso non deve far niente', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    expect(instance.audioPlay(10)).toBe(false);
  });

  it('endAudio con maxRepetitions non settato', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: false,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
    instance.endAudio(2006);
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: true,
        playing: false,
        locked: false,
        counterRepetitions: 1,
        fileName: 'nome_file.mp3',
      },
    });
  });

  it('endAudio con maxRepetitions = 1 deve diventare locked', () => {
    const props = {
      ...mockProps,
      audioSettings: {
        ...mockProps.audioSettings,
        maxRepetitions: 1,
      },
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: false,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
    instance.endAudio(2006);
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: true,
        playing: false,
        locked: true,
        counterRepetitions: 1,
        fileName: 'nome_file.mp3',
      },
    });
  });

  it('endAudio ritorna false se la chiave non esiste', () => {
    const props = {
      ...mockProps,
      audioSettings: {
        ...mockProps.audioSettings,
        maxRepetitions: 1,
      },
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();

    expect(instance.endAudio(2004)).toBe(false);
  });

  it('componentDidUpdate se aggiorna step deve NON deve richiamare initializeAudio se NON ho file audio', () => {
    jest.clearAllMocks();
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url: undefined,
        }],
      },
    };
    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'initializeAudio');

    instance.componentDidUpdate({
      ...props,
      step: {
        ...props.step,
        id: 203,
      },
    }, { tooltipContent: { id: 'key', inputLessicale: {} } });
    expect(spy).not.toHaveBeenCalled();
  });

  it('componentDidUpdate se aggiorna step deve richiamare initializeAudio se ho file audio', () => {
    jest.clearAllMocks();
    const props = {
      ...mockProps,
      hideTooltip: false,
    };
    props.step.testi[0].url_audio = 'nome_file.mp3';

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'initializeAudio');

    instance.componentDidUpdate({
      ...mockProps,
      step: {
        ...mockProps.step,
        id: 200,
      },
    }, { tooltipContent: { id: 'key', inputLessicale: {} } });
    expect(spy).toHaveBeenCalledWith(mockProps.step.testi);
  });

  it('initializeAudio > onend deve chiamare endAudio', () => {
    const props = {
      ...mockProps,
    };
    props.step.testi[0].url_audio = 'nome_file.mp3';

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setState');
    const spyEnd = jest.spyOn(instance, 'endAudio');

    instance.initializeAudio(props.step.testi);
    expect(spy).toHaveBeenCalledWith({
      audioPlayback: {
        2006: {
          controller: expect.any(Object),
          paused: false,
          played: false,
          playing: false,
          locked: false,
          counterRepetitions: 0,
          fileName: 'nome_file.mp3',
        },
      },
    });

    expect(spyEnd).not.toHaveBeenCalled();
    instance.state.audioPlayback[2006].controller._onend[0].fn(); // eslint-disable-line no-underscore-dangle
    expect(spyEnd).toHaveBeenCalled();
  });

  it('tasto play deve chiamare audioPlay', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    const instance = renderedComponent.instance();
    instance.state.audioPlayback[2006].controller.play = jest.fn();
    const spy = jest.spyOn(instance, 'audioPlay');

    expect(renderedComponent.find(AudioPlayer).length).toBe(1);
    renderedComponent.find(AudioPlayer).dive().find('Button').simulate('click');
    expect(spy).toHaveBeenLastCalledWith(2006);
  });

  it('tasto pausa deve chiamare audioPlay', () => {
    const props = {
      ...mockProps,
      audioSettings: {
        enablePause: true,
      },
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );
    const instance = renderedComponent.instance();
    instance.state.audioPlayback[2006].controller.pause = jest.fn();
    instance.setState({
      audioPlayback: {
        2006: {
          ...instance.state.audioPlayback[2006],
          playing: true,
        },
      },
    });
    renderedComponent.update();
    const spy = jest.spyOn(instance, 'audioPlay');

    expect(renderedComponent.find(AudioPlayer).length).toBe(1);
    renderedComponent.find(AudioPlayer).dive().find('Button').simulate('click');
    expect(spy).toHaveBeenLastCalledWith(2006, true);
  });

  it('errorAudio con errore riproduzione', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
      apriModalFunction: jest.fn(),
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    instance.errorAudio(2006);
    expect(props.apriModalFunction).toHaveBeenCalledWith({
      show: true,
      closeButton: {
        text: 'Ok',
      },
      contenuto: 'Non ho potuto riprodurre il file nome_file.mp3',
    });
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: false,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
  });

  it('errorAudio con errore caricamento', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
      apriModalFunction: jest.fn(),
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    instance.errorAudio(2006, true);
    expect(props.apriModalFunction).toHaveBeenCalledWith({
      show: true,
      closeButton: {
        text: 'Ok',
      },
      contenuto: 'Non ho potuto caricare il file nome_file.mp3',
    });
    expect(instance.state.audioPlayback).toEqual({
      2006: {
        controller: expect.any(Object),
        paused: false,
        played: false,
        playing: false,
        locked: false,
        counterRepetitions: 0,
        fileName: 'nome_file.mp3',
      },
    });
  });

  it('errorAudio con errore chiave non esistente', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [{
          ...mockProps.step.testi[0],
          url_audio: 'nome_file.mp3',
        }],
      },
      apriModalFunction: jest.fn(),
    };

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    expect(instance.errorAudio(2000)).toBe(false);
    expect(props.apriModalFunction).not.toHaveBeenCalled();
  });

  it('errorAudio > onplayerror deve chiamare errorAudio', () => {
    const props = {
      ...mockProps,
    };
    props.step.testi[0].url_audio = 'nome_file.mp3';

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setState');
    const spyEnd = jest.spyOn(instance, 'errorAudio');

    instance.initializeAudio(props.step.testi);
    expect(spy).toHaveBeenCalledWith({
      audioPlayback: {
        2006: {
          controller: expect.any(Object),
          paused: false,
          played: false,
          playing: false,
          locked: false,
          counterRepetitions: 0,
          fileName: 'nome_file.mp3',
        },
      },
    });

    expect(spyEnd).not.toHaveBeenCalled();
    instance.state.audioPlayback[2006].controller._onplayerror[0].fn(); // eslint-disable-line no-underscore-dangle
    expect(spyEnd).toHaveBeenCalled();
  });

  it('errorAudio > onloaderror deve chiamare errorAudio', () => {
    const props = {
      ...mockProps,
    };
    props.step.testi[0].url_audio = 'nome_file.mp3';

    const renderedComponent = shallow(
      <TestoConsegna {...props} />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setState');
    const spyEnd = jest.spyOn(instance, 'errorAudio');

    instance.initializeAudio(props.step.testi);
    expect(spy).toHaveBeenCalledWith({
      audioPlayback: {
        2006: {
          controller: expect.any(Object),
          paused: false,
          played: false,
          playing: false,
          locked: false,
          counterRepetitions: 0,
          fileName: 'nome_file.mp3',
        },
      },
    });

    expect(spyEnd).not.toHaveBeenCalled();
    instance.state.audioPlayback[2006].controller._onloaderror[0].fn(); // eslint-disable-line no-underscore-dangle
    expect(spyEnd).toHaveBeenCalled();
  });
});


describe('<LessicoContainer />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<LessicoContainer />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      radius: {
        general: '50px',
      },
    };
    const renderedComponent = shallow(<LessicoContainer theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render top and left', () => {
    const props = {
      top: 33,
      left: 21,
      theme: {
        radius: {
          general: '6px',
        },
      },
    };
    const renderedComponent = shallow(<LessicoContainer {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props hideTooltip', () => {
    const props = {
      top: 33,
      left: 21,
      theme: {
        radius: {
          general: '6px',
        },
      },
    };
    const renderedComponent = shallow(<LessicoContainer {...props} hideTooltip />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

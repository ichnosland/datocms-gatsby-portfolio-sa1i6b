import React from 'react';
import { shallow } from 'enzyme';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';
import configureStore from 'configureStore';

import {
  mockElementiO,
  mockElementiG,
  mockElementiN,
  mockElementiM,
  mockElementiU,
  mockElementiI,
} from 'common/testing-mocks';
import Div from 'components/Div';
import { Inseriti } from 'components/Elemento/Inseriti';
import Elemento from 'components/Elemento';
import RadioCheck from 'components/FormElements/RadioCheck';
import { EditableSpanView } from 'components/ContentEditable/EditableSpan';
import modalBoxReducer from 'containers/ModalBox/reducer';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

import Step, { RispostaUtente, WrapperNoSelectStep } from '../Step';

jest.mock('react-dom', () => ({
  findDOMNode: (e) => ({ innerHTML: e }),
}));

const mockProps = {
  step: {
    testi: [mockElementiO[0]],
    esercizi: [mockElementiO[1]],
  },
  hasLessico: true,
  funzioneSelezionaRisposta: () => { },
  rispostaSelezionata: [{ opzione: 'selezionata', key: 1 }],
  apriModalBox: () => { },
  chiudiModalBox: () => { },
  hasHelp: true,
  hasCorreggi: true,
  disableAutofocus: false,
  correzioneRisposta: {
    isCheckable: false,
    isChecked: false,
    isPristine: true,
    isCorrect: false,
    isInterfaceLocked: false,
    isFocusEnabled: false,
    isHelpEnabled: true,
    mostraSoluzione: true,
    mostraCorrezione: true,
    correzioneStep: {
      soluzione: ['soluzione'],
      corrette: [0],
      sbagliate: [0],
    },
  },
  correzioneRispostaFx: () => { },
  helpFunction: () => { },
  enableFocusButtonRisposta: () => { },
  toggleFocusFunction: () => { },
};


describe('<Step />', () => {
  it('mostra il contenuto iniziale dello step di tipo O', () => {
    const renderedComponent = shallow(
      <Step {...mockProps} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto quando mostraSoluzione = false', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto quando isInterfaceLocked = true per (tipo U)', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1]],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isInterfaceLocked: true,
      },
    };

    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto quando isCorrect = false and isChecked = true', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCorrect: false,
        isChecked: true,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto quando isCorrect = true and isChecked = true', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCorrect: true,
        isChecked: true,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo O se non ho risposte iniziali selezionate', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: undefined,
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo O se lessico disattivato', () => {
    const props = {
      ...mockProps,
      hasLessico: false,
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostraOpzioniPopupG deve chiamare apriModalBox', () => {
    const props = {
      ...mockProps,
      hasLessico: false,
      apriModalBox: jest.fn(),
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    const mockOpzioni = [{
      etichetta: 'etichetta',
      indiceEtichetta: 0,
    }];

    const instance = renderedComponent.instance();
    expect(props.apriModalBox).not.toHaveBeenCalled();
    instance.mostraOpzioniPopupG(
      mockOpzioni,
      { 4: 22 },
      { indiceBlocco: 0, parola: 'parola' }
    );
    expect(props.apriModalBox).toHaveBeenCalled();
  });

  it('mostra il contenuto iniziale dello step di tipo N quando mostro mostraCorrezione e mostraSoluzione', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: ['selezionata'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: true,
        mostraSoluzione: true,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['soluzione']],
        },
      },
      step: {
        testi: [mockElementiN[0]],
        esercizi: [mockElementiN[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(RadioCheck).length).toBe(5);
  });

  it('mostra il contenuto iniziale dello step di tipo N quando mostro mostraCorrezione e !mostraSoluzione', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: ['selezionata'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: true,
        mostraSoluzione: false,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['soluzione']],
        },
      },
      step: {
        testi: [mockElementiN[0]],
        esercizi: [mockElementiN[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(RadioCheck).length).toBe(4);
  });

  it('mostra il contenuto iniziale dello step di tipo N quando !mostraCorrezione e !mostraSoluzione', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: ['selezionata'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
        mostraSoluzione: false,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['soluzione']],
        },
      },
      step: {
        testi: [mockElementiN[0]],
        esercizi: [mockElementiN[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(RadioCheck).length).toBe(4);
  });

  it('mostra il contenuto iniziale dello step di tipo N quando mostro la soluzione ma è vuota', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: ['selezionata'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
        mostraSoluzione: true,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [],
        },
      },
      step: {
        testi: [mockElementiN[0]],
        esercizi: [mockElementiN[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(RadioCheck).length).toBe(4);
  });

  it('mostra il contenuto iniziale dello step di tipo N senza risposta selezionata', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['soluzione']],
        },
      },
      rispostaSelezionata: undefined,
      step: {
        testi: [mockElementiN[0]],
        esercizi: [mockElementiN[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo N con latex', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['soluzione']],
        },
      },
      step: {
        ...mockProps.step,
        testi: [mockElementiN[0]],
        esercizi: [{
          ...mockElementiN[1],
          form: [
            'uno',
            'due $latex$',
          ],
        }],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(RadioCheck).at(0).props()).toEqual({
      label: ['uno'],
      giusto: false,
      sbagliato: false,
      onClickFunction: expect.any(Function),
      type: 'checkbox',
      checked: false,
      hasImage: false,
    });

    expect(renderedComponent.find(RadioCheck).at(1).props()).toEqual({
      label: ['due ', expect.any(Object)],
      giusto: false,
      sbagliato: false,
      onClickFunction: expect.any(Function),
      type: 'checkbox',
      checked: false,
      hasImage: false,
    });
  });

  it('mostra il contenuto iniziale dello step di tipo N con immagini', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['soluzione']],
        },
      },
      step: {
        ...mockProps.step,
        testi: [mockElementiN[0]],
        esercizi: [{
          ...mockElementiN[1],
          form: [
            'uno',
            'due <img src="immagine.png" />',
          ],
        }],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(RadioCheck).at(0).props()).toEqual({
      label: ['uno'],
      giusto: false,
      sbagliato: false,
      onClickFunction: expect.any(Function),
      type: 'checkbox',
      checked: false,
      hasImage: false,
    });

    expect(renderedComponent.find(RadioCheck).at(1).props()).toEqual({
      label: ['due ', expect.any(Object)],
      giusto: false,
      sbagliato: false,
      onClickFunction: expect.any(Function),
      type: 'checkbox',
      checked: false,
      hasImage: true,
    });
  });

  it('mostra il contenuto iniziale dello step di tipo O quando non mostro la soluzione', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: [{ opzione: 'selezionata', key: 1 }],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
        mostraSoluzione: false,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['soluzione']],
        },
      },
      step: {
        testi: [mockElementiO[0]],
        esercizi: [mockElementiO[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Div).length).toBe(1);
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });


  it('mostra il contenuto iniziale dello step di tipo O con latex e con soluzione attivata', () => {
    const props = {
      ...mockProps,
      hasLessico: false,
      rispostaSelezionata: [{ opzione: 'due $latex$', key: 1 }],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
        mostraSoluzione: false,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [['due $latex$']],
        },
      },
      step: {
        ...mockProps.step,
        testi: [mockElementiO[0]],
        esercizi: [{
          ...mockElementiO[1],
          traduci: [
            'uno',
            'due $latex$',
          ],
        }],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();

    // elemento inserito
    expect(renderedComponent.find(Elemento).at(0).props()).toEqual({
      inserito: true,
      label: ['due ', expect.any(Object)],
      onClickFx: expect.any(Function),
    });

    // primo elemento selezionabile
    expect(renderedComponent.find(Elemento).at(1).props()).toEqual({
      inattivo: false,
      label: ['uno'],
      onClickFx: expect.any(Function),
    });

    // secondo elemento selezionato
    expect(renderedComponent.find(Elemento).at(2).props()).toEqual({
      inattivo: true,
      label: ['due ', expect.any(Object)],
      onClickFx: expect.any(Function),
    });
  });

  it('mostra il contenuto iniziale dello step di tipo O quando mostro la soluzione e ha un underscore', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: [{ opzione: 'selezionata', key: 0 }],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: true,
        mostraSoluzione: true,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: ['soluzione_con_underscore'],
        },
      },
      step: {
        testi: [mockElementiO[0]],
        esercizi: [mockElementiO[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Inseriti).at(1).props().children[0]).toBe('soluzione con underscore');
  });

  it('mostra il contenuto iniziale dello step di tipo M', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiM[0]],
        esercizi: [mockElementiM[1]],
      },
      rispostaSelezionata: ['genitivo'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo M quando non mostro la soluzione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
        mostraSoluzione: false,
      },
      step: {
        testi: [mockElementiM[0]],
        esercizi: [mockElementiM[1]],
      },
      rispostaSelezionata: ['genitivo'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo M senza risposta selezionata', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: undefined,
      step: {
        testi: [mockElementiM[0]],
        esercizi: [mockElementiM[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo M con latex', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        testi: [mockElementiM[0]],
        esercizi: [{
          ...mockElementiM[1],
          form: [
            'uno',
            'due $latex$',
          ],
        }],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(RadioCheck).at(0).props()).toEqual({
      label: ['uno'],
      giusto: false,
      sbagliato: false,
      onClickFunction: expect.any(Function),
      type: 'radio',
      checked: false,
      hasImage: false,
    });

    expect(renderedComponent.find(RadioCheck).at(1).props()).toEqual({
      label: ['due ', expect.any(Object)],
      giusto: false,
      sbagliato: false,
      onClickFunction: expect.any(Function),
      type: 'radio',
      checked: false,
      hasImage: false,
    });
  });

  it('mostra il contenuto iniziale dello step di tipo G se mostraSoluzione e !mostraCorrezione', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiG[0]],
        esercizi: [mockElementiG[1]],
      },
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraSoluzione: true,
        mostraCorrezione: false,
        correzioneStep: {
          corrette: [1],
          sbagliate: [1],
          soluzione: [[{
            daAnalizzare: true,
            parola: 'parola',
            rispostaCorrettaIndice: 1,
          }]],
        },
      },
      rispostaSelezionata: {
        0: {
          indiceLabel: 1,
          indiceBlocco: 0,
        },
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(Elemento).length).toBe(14);
  });

  it('mostra il contenuto iniziale dello step di tipo G se !mostraSoluzione e !mostraCorrezione', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiG[0]],
        esercizi: [mockElementiG[1]],
      },
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraSoluzione: false,
        mostraCorrezione: false,
        correzioneStep: {
          corrette: [1],
          sbagliate: [1],
          soluzione: [[{
            daAnalizzare: true,
            parola: 'parola',
            rispostaCorrettaIndice: 1,
          }]],
        },
      },
      rispostaSelezionata: {
        0: {
          indiceLabel: 1,
          indiceBlocco: 0,
        },
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(Elemento).length).toBe(13);
  });

  it('mostra il contenuto iniziale dello step di tipo G se mostraSoluzione e la soluzione è vuota', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiG[0]],
        esercizi: [mockElementiG[1]],
      },
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraSoluzione: true,
        mostraCorrezione: false,
        correzioneStep: {
          corrette: [1],
          sbagliate: [1],
          soluzione: [],
        },
      },
      rispostaSelezionata: {
        0: {
          indiceLabel: 1,
          indiceBlocco: 0,
        },
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(Elemento).length).toBe(13);
  });

  it('mostra il contenuto iniziale dello step di tipo G senza risposta selezionata', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: undefined,
      step: {
        testi: [mockElementiG[0]],
        esercizi: [mockElementiG[1]],
      },
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
        correzioneStep: {
          ...mockProps.correzioneRisposta.correzioneStep,
          soluzione: [[{
            daAnalizzare: true,
            parola: 'parola',
            rispostaCorrettaIndice: 1,
          }]],
        },
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo G con latex attivo', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [{
          ...mockElementiG[0],
          testo_principale: '$\sqrt2$', // eslint-disable-line no-useless-escape
        }],
        esercizi: [mockElementiG[1]],
      },
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraSoluzione: false,
        mostraCorrezione: false,
        correzioneStep: {
          corrette: [1],
          sbagliate: [1],
          soluzione: [[{
            daAnalizzare: true,
            parola: '$1+2$',
            rispostaCorrettaIndice: 1,
          }]],
        },
      },
      rispostaSelezionata: {
        0: {
          indiceLabel: 1,
          indiceBlocco: 0,
        },
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
    expect(renderedComponent.find(Elemento).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo P', () => {
    // è identico a U, possiamo riciclarne il contenuto
    const mockStepP = {
      testi: [mockElementiU[0]],
      esercizi: [{
        ...mockElementiU[1],
        tipo: 'P',
      }],
    };

    const props = {
      ...mockProps,
      step: mockStepP,
      rispostaSelezionata: ['conta le agnelle e le galline'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(EditableSpanView).props()).toEqual({
      autocapitalize: 'none',
      autocomplete: 'off',
      autocorrect: 'off',
      giusto: true,
      isEditable: true,
      onblur: expect.any(Function),
      oncontextmenu: expect.any(Function),
      oncopy: expect.any(Function),
      ondrag: expect.any(Function),
      ondragend: expect.any(Function),
      ondragstart: expect.any(Function),
      ondrop: expect.any(Function),
      onfocus: expect.any(Function),
      oninput: expect.any(Function),
      onkeydown: expect.any(Function),
      onpaste: expect.any(Function),
      prefill: 'conta le agnelle e le galline',
      sbagliato: true,
      single: true,
      spellcheck: false,
    });
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo U con pre e post con underscore', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiU[0]],
        esercizi: [{
          ...mockElementiU[1],
          testo_principale_pre: 'testo_pre con_underscore',
          testo_principale_post: 'testo_post con_altri_underscore',
        }],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();

    expect(renderedComponent.find('span').at(0).text()).toEqual('testo pre con underscore');
    expect(renderedComponent.find('span').at(1).text()).toEqual('testo post con altri underscore');
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo U con pre e post con immagini', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiU[0]],
        esercizi: [{
          ...mockElementiU[1],
          testo_principale_pre: 'testo_pre <img src="path_immagine_pre.png" />',
          testo_principale_post: 'testo_post <img src="path_immagine_post.png" />',
        }],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(
      renderedComponent.find('span').at(0).props().children[1].props.dangerouslySetInnerHTML.__html // eslint-disable-line no-underscore-dangle
    ).toEqual('<img src="path_immagine_pre.png">');
    expect(renderedComponent.find('span').at(0).props().children[0]).toBe('testo pre ');
    expect(
      renderedComponent.find('span').at(1).props().children[1].props.dangerouslySetInnerHTML.__html // eslint-disable-line no-underscore-dangle
    ).toEqual('<img src="path_immagine_post.png">');
    expect(renderedComponent.find('span').at(1).props().children[0]).toBe('testo post ');
  });

  it('mostra il contenuto iniziale dello step di tipo U e testo_principale_post settato', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiU[0]],
        esercizi: [{
          ...mockElementiU[1],
          testo_principale_post: '.',
        }],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(EditableSpanView).props()).toEqual({
      autocapitalize: 'none',
      autocomplete: 'off',
      autocorrect: 'off',
      giusto: true,
      isEditable: true,
      onblur: expect.any(Function),
      oncontextmenu: expect.any(Function),
      oncopy: expect.any(Function),
      ondrag: expect.any(Function),
      ondragend: expect.any(Function),
      ondragstart: expect.any(Function),
      ondrop: expect.any(Function),
      onfocus: expect.any(Function),
      oninput: expect.any(Function),
      onkeydown: expect.any(Function),
      onpaste: expect.any(Function),
      prefill: 'conta le agnelle e le galline',
      sbagliato: true,
      single: false,
      spellcheck: false,
    });
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo U e testo_principale_post vuoto e con continua', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiU[0]],
        esercizi: [{
          ...mockElementiU[1],
          continua: true,
          testo_principale_post: '',
        }],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(EditableSpanView).props()).toEqual({
      autocapitalize: 'none',
      autocomplete: 'off',
      autocorrect: 'off',
      giusto: true,
      isEditable: true,
      onblur: expect.any(Function),
      oncontextmenu: expect.any(Function),
      oncopy: expect.any(Function),
      ondrag: expect.any(Function),
      ondragend: expect.any(Function),
      ondragstart: expect.any(Function),
      ondrop: expect.any(Function),
      onfocus: expect.any(Function),
      oninput: expect.any(Function),
      onkeydown: expect.any(Function),
      onpaste: expect.any(Function),
      prefill: 'conta le agnelle e le galline',
      sbagliato: true,
      single: false,
      spellcheck: false,
    });
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo U e testo_principale_post vuoto e con continua = false', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [mockElementiU[0]],
        esercizi: [{
          ...mockElementiU[1],
          continua: false,
          testo_principale_post: '',
        }],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(EditableSpanView).props()).toEqual({
      autocapitalize: 'none',
      autocomplete: 'off',
      autocorrect: 'off',
      giusto: true,
      isEditable: true,
      onblur: expect.any(Function),
      oncontextmenu: expect.any(Function),
      oncopy: expect.any(Function),
      ondrag: expect.any(Function),
      ondragend: expect.any(Function),
      ondragstart: expect.any(Function),
      ondrop: expect.any(Function),
      onfocus: expect.any(Function),
      oninput: expect.any(Function),
      onkeydown: expect.any(Function),
      onpaste: expect.any(Function),
      prefill: 'conta le agnelle e le galline',
      sbagliato: true,
      single: true,
      spellcheck: false,
    });
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo U con 2 esercizi', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: undefined,
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1], mockElementiU[2]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(EditableSpanView).at(0).props()).toEqual({
      autocapitalize: 'none',
      autocomplete: 'off',
      autocorrect: 'off',
      giusto: true,
      isEditable: true,
      onblur: expect.any(Function),
      oncontextmenu: expect.any(Function),
      oncopy: expect.any(Function),
      ondrag: expect.any(Function),
      ondragend: expect.any(Function),
      ondragstart: expect.any(Function),
      ondrop: expect.any(Function),
      onfocus: expect.any(Function),
      oninput: expect.any(Function),
      onkeydown: expect.any(Function),
      onpaste: expect.any(Function),
      prefill: undefined,
      sbagliato: true,
      single: false,
      spellcheck: false,
    });
    expect(renderedComponent.find(EditableSpanView).at(1).props()).toEqual({
      autocapitalize: 'none',
      autocomplete: 'off',
      autocorrect: 'off',
      giusto: false,
      isEditable: true,
      onblur: expect.any(Function),
      oncontextmenu: expect.any(Function),
      oncopy: expect.any(Function),
      ondrag: expect.any(Function),
      ondragend: expect.any(Function),
      ondragstart: expect.any(Function),
      ondrop: expect.any(Function),
      onfocus: expect.any(Function),
      oninput: expect.any(Function),
      onkeydown: expect.any(Function),
      onpaste: expect.any(Function),
      prefill: undefined,
      sbagliato: false,
      single: true,
      spellcheck: false,
    });
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo U se correzioneRisposta.mostraSoluzione == false', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: undefined,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
        mostraSoluzione: false,
      },
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1], mockElementiU[2]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo U e testo eventi', () => {
    const props = {
      ...mockProps,
      toggleFocusFunction: jest.fn(),
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1]],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );
    const mockOnPaste = { preventDefault: jest.fn() };
    const mockOnCopy = { preventDefault: jest.fn() };
    const mockOnDrag = { preventDefault: jest.fn() };
    const mockOnDragStart = { preventDefault: jest.fn() };
    const mockOnDragEnd = { preventDefault: jest.fn() };
    const mockOnDrop = { preventDefault: jest.fn() };
    const mockOnFocus = { preventDefault: jest.fn() };
    const mockOnContextMenu = { preventDefault: jest.fn() };

    expect(mockOnPaste.preventDefault).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('paste', mockOnPaste);
    expect(mockOnPaste.preventDefault).toHaveBeenCalled();

    expect(mockOnCopy.preventDefault).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('copy', mockOnCopy);
    expect(mockOnCopy.preventDefault).toHaveBeenCalled();

    expect(mockOnDrag.preventDefault).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('drag', mockOnDrag);
    expect(mockOnDrag.preventDefault).toHaveBeenCalled();

    expect(mockOnDragStart.preventDefault).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('dragstart', mockOnDragStart);
    expect(mockOnDragStart.preventDefault).toHaveBeenCalled();

    expect(mockOnDragEnd.preventDefault).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('dragend', mockOnDragEnd);
    expect(mockOnDragEnd.preventDefault).toHaveBeenCalled();

    expect(mockOnDrop.preventDefault).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('drop', mockOnDrop);
    expect(mockOnDrop.preventDefault).toHaveBeenCalled();

    expect(props.toggleFocusFunction).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('focus', mockOnFocus);
    expect(props.toggleFocusFunction).toHaveBeenLastCalledWith(true);

    renderedComponent.find(EditableSpanView).dive().simulate('blur', mockOnFocus);
    expect(props.toggleFocusFunction).toHaveBeenLastCalledWith(false);

    expect(mockOnContextMenu.preventDefault).not.toHaveBeenCalled();
    renderedComponent.find(EditableSpanView).dive().simulate('contextmenu', mockOnContextMenu);
    expect(mockOnContextMenu.preventDefault).toHaveBeenCalled();
  });

  it('EditableSpanView > keyDown con !isCheckable && !mostraSoluzione e con key enter (keyCode == 13)', () => {
    const props = {
      ...mockProps,
      enableFocusButtonRisposta: jest.fn(),
      correzioneRispostaFx: jest.fn(),
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1]],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: false,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    const mockOnKeyDown = { keyCode: 13, preventDefault: jest.fn() };
    renderedComponent.find(EditableSpanView).dive().simulate('keydown', mockOnKeyDown);
    expect(mockOnKeyDown.preventDefault).toHaveBeenCalled();
    expect(props.enableFocusButtonRisposta).toHaveBeenCalled();
    expect(props.correzioneRispostaFx).not.toHaveBeenCalled();
  });

  it('EditableSpanView > keyDown con isCheckable e con key enter (keyCode == 13)', () => {
    const props = {
      ...mockProps,
      enableFocusButtonRisposta: jest.fn(),
      correzioneRispostaFx: jest.fn(),
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1]],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: true,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    const mockOnKeyDown = { keyCode: 13, preventDefault: jest.fn() };
    renderedComponent.find(EditableSpanView).dive().simulate('keydown', mockOnKeyDown);
    expect(mockOnKeyDown.preventDefault).toHaveBeenCalled();
    expect(props.enableFocusButtonRisposta).toHaveBeenCalled();
    expect(props.correzioneRispostaFx).toHaveBeenCalled();
  });

  it('EditableSpanView > keyDown con key !enter (keyCode !== 13)', () => {
    const props = {
      ...mockProps,
      enableFocusButtonRisposta: jest.fn(),
      correzioneRispostaFx: jest.fn(),
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1]],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: true,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    const mockOnKeyDown = { keyCode: 11, preventDefault: jest.fn() };
    renderedComponent.find(EditableSpanView).dive().simulate('keydown', mockOnKeyDown);
    expect(mockOnKeyDown.preventDefault).not.toHaveBeenCalled();
    expect(props.enableFocusButtonRisposta).not.toHaveBeenCalled();
    expect(props.correzioneRispostaFx).not.toHaveBeenCalled();
  });

  it('EditableSpanView > onInput con !isInterfaceLocked', () => {
    const props = {
      ...mockProps,
      funzioneSelezionaRisposta: jest.fn(),
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1]],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isInterfaceLocked: false,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    const mockOnInput = { target: 'parola' };
    renderedComponent.find(EditableSpanView).dive().simulate('input', mockOnInput);
    expect(props.funzioneSelezionaRisposta).toHaveBeenCalledWith(['parola']);
  });

  it('EditableSpanView > onInput con isInterfaceLocked', () => {
    const props = {
      ...mockProps,
      funzioneSelezionaRisposta: jest.fn(),
      step: {
        testi: [mockElementiU[0]],
        esercizi: [mockElementiU[1]],
      },
      rispostaSelezionata: ['conta le agnelle e le galline'],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isInterfaceLocked: true,
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    const mockOnInput = { target: 'parola' };
    renderedComponent.find(EditableSpanView).dive().simulate('input', mockOnInput);
    expect(props.funzioneSelezionaRisposta).not.toHaveBeenCalled();
  });

  it('mostra il contenuto iniziale dello step di tipo I', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: [0],
      step: {
        testi: [mockElementiI[0]],
        esercizi: [mockElementiI[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('evidenzia il blocco con trovato = true dello step di tipo I', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: [0],
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraCorrezione: false,
      },
      step: {
        testi: [mockElementiI[0]],
        esercizi: [mockElementiI[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo I', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: undefined,
      step: {
        testi: [mockElementiI[0]],
        esercizi: [mockElementiI[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('mostra il contenuto iniziale dello step di tipo I con latex', () => {
    const props = {
      ...mockProps,
      step: {
        testi: [{
          ...mockElementiI[0],
          testo_principale: 'ciao $formula$',
        }],
        esercizi: [mockElementiI[1]],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(Elemento).at(0).props()).toEqual({
      giusto: true,
      label: ['ciao'],
      onClickFx: expect.any(Function),
      sbagliato: true,
      trovato: false,
    });
    expect(renderedComponent.find(Elemento).at(1).props()).toEqual({
      giusto: false,
      label: [expect.any(Object)],
      onClickFx: expect.any(Function),
      sbagliato: false,
      trovato: false,
    });
  });

  it('mostra il contenuto iniziale dello step di tipo non gestito', () => {
    const props = {
      ...mockProps,
      rispostaSelezionata: undefined,
      step: {
        testi: [mockElementiI[0]],
        esercizi: [{ ...mockElementiI[1], tipo: 'Z' }],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(1);
  });

  it('se lo step è vuoto non devo restituire niente', () => {
    const props = {
      ...mockProps,
      step: undefined,
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(0);
    expect(renderedComponent.props()).toEqual({});
  });

  it('Non mostro contenuto se step.esercizi.length === 0', () => {
    const props = {
      ...mockProps,
      step: {
        ...mockProps.step,
        esercizi: [],
      },
    };
    const renderedComponent = shallow(
      <Step {...props} />
    );

    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(WrapperNoSelectStep).length).toBe(0);
    expect(renderedComponent.props()).toEqual({});
  });
});


describe('<Step con simulazione dello store />', () => {
  const withModalBoxReducer = injectReducer({
    key: 'modalBox', reducer: modalBoxReducer,
  });
  const mockStore = configureStore({}, {});
  const mapDispatchToProps = (dispatch) => ({
    apriModalBox: (payload) => {
      dispatch(modalSetData(payload));
    },
    chiudiModalBox: () => {
      dispatch(modalSetEmptyData());
    },
  });

  it('mostraOpzioniPopupG deve popolare lo state di modalBox e aprire al click funzioneSelezionaRisposta', () => {
    const props = {
      ...mockProps,
      ...mapDispatchToProps((mockStore.dispatch)),
      funzioneSelezionaRisposta: jest.fn(),
      rispostaSelezionata: [{ opzione: 'selezionata', key: 2 }],
    };

    const mockOpzioni = [{
      etichetta: 'etichetta',
      indiceEtichetta: 0,
    }];

    const ConfigurationWrapper = compose(
      withModalBoxReducer,
      connect(mapDispatchToProps)
    )(() => <Step {...props} />);

    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store: mockStore } }
    );

    const instance = renderedComponent.dive().dive().dive().instance();
    instance.mostraOpzioniPopupG(
      mockOpzioni,
      { 4: 22, 5: 11 },
      { indiceBlocco: 0, parola: 'parola' }
    );

    // controllo che cosa contiene il popup una volta aperto
    const contenutoPopup = mockStore.getState().get('modalBox').toJS();
    expect(contenutoPopup).toEqual({
      acceptButton: undefined,
      closeButton: undefined,
      contenuto: expect.any(Object),
      disableClose: true,
      isPopup: false,
      show: true,
      titolo: '',
    });
    const mountPopupData = shallow(contenutoPopup.contenuto);
    expect(mountPopupData).toMatchSnapshot();

    // clicco sul un'opzione e mi aspetto che venga chiamata la funzione di selezione
    expect(props.funzioneSelezionaRisposta).not.toHaveBeenCalled();
    mountPopupData.find('OpzioniBlocchi__OpzioneBlocchi').at(0).simulate('click');
    expect(props.funzioneSelezionaRisposta).toHaveBeenCalledWith({
      0: { indiceLabel: 0, labelOpzione: 'etichetta' },
      4: 22,
      5: 11,
    });

    // devo anche aver chiuso il popup e sia popolato con i default
    const contenutoPopupAfterClose = mockStore.getState().get('modalBox').toJS();
    expect(contenutoPopupAfterClose).toEqual({
      acceptButton: undefined,
      closeButton: undefined,
      contenuto: '',
      disableClose: false,
      isPopup: true,
      show: false,
      titolo: '',
    });
  });

  it('mostraOpzioniPopupG deve popolare lo state di modalBox e aprire al click funzioneSelezionaRisposta quando rispostaSelezionata == undefined', () => {
    const props = {
      ...mockProps,
      ...mapDispatchToProps((mockStore.dispatch)),
      funzioneSelezionaRisposta: jest.fn(),
      rispostaSelezionata: undefined,
    };

    const mockOpzioni = [{
      etichetta: 'etichetta',
      indiceEtichetta: 0,
    }];

    const ConfigurationWrapper = compose(
      withModalBoxReducer,
      connect(mapDispatchToProps)
    )(() => <Step {...props} />);

    const renderedComponent = shallow(
      <ConfigurationWrapper />, { context: { store: mockStore } }
    );

    const instance = renderedComponent.dive().dive().dive().instance();
    instance.mostraOpzioniPopupG(
      mockOpzioni,
      { 4: 22 },
      { indiceBlocco: 0, parola: 'parola' }
    );

    // controllo che cosa contiene il popup una volta aperto
    const contenutoPopup = mockStore.getState().get('modalBox').toJS();
    expect(contenutoPopup).toEqual({
      acceptButton: undefined,
      closeButton: undefined,
      contenuto: expect.any(Object),
      disableClose: true,
      isPopup: false,
      show: true,
      titolo: '',
    });
    const mountPopupData = shallow(contenutoPopup.contenuto);
    expect(mountPopupData).toMatchSnapshot();

    // clicco sul un'opzione e mi aspetto che venga chiamata la funzione di selezione
    expect(props.funzioneSelezionaRisposta).not.toHaveBeenCalled();
    mountPopupData.find('OpzioniBlocchi__OpzioneBlocchi').at(0).simulate('click');
    expect(props.funzioneSelezionaRisposta).toHaveBeenCalledWith({
      0: { indiceLabel: 0, labelOpzione: 'etichetta' },
      4: 22,
    });

    // devo anche aver chiuso il popup e sia popolato con i default
    const contenutoPopupAfterClose = mockStore.getState().get('modalBox').toJS();
    expect(contenutoPopupAfterClose).toEqual({
      acceptButton: undefined,
      closeButton: undefined,
      contenuto: '',
      disableClose: false,
      isPopup: true,
      show: false,
      titolo: '',
    });
  });
});


describe('<RispostaUtente />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<RispostaUtente />);
    expect(renderedComponent.find('Div').length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: '#00abe5',
      light: 'rgb(109, 210, 240)',
      dark: 'rgb(0, 114, 205)',
      pale: 'rgb(199, 231, 245)',
      subtle: 'rgb(178, 208, 223)',
      radius: {
        buttons: '50px',
      },
    };
    const renderedComponent = shallow(
      <RispostaUtente theme={theme}>
        <div>first child</div>
        <div>second child</div>
      </RispostaUtente>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

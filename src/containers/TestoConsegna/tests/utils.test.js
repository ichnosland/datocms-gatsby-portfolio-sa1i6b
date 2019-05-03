import React from 'react';
import { shallow, mount } from 'enzyme';

import Div from 'components/Div';

import { generaElementiTesto, HtmlWrap } from '../utils';

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
      content: 'testo',
      id: 'text_1',
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
  }, {
    type: 'latex',
    content: '4+6',
    id: 'latex_45',
  }];



describe('generaElementiTesto', () => {
  it('contenuti misti senza lessico', () => {
    const elementiGenerati = generaElementiTesto({
      elementiTesto: mockTesti,
    });

    expect(elementiGenerati).toEqual([
      'Hi nc',
      ' te xt ',
      'ille',
      expect.any(Object),
      '.',
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
    ]);

    // contesto
    expect(elementiGenerati[3].props).toEqual({
      children: ['aeneumque', 'testo'],
    });
    expect(elementiGenerati[3].key).toBe('contesto_context_34');
    expect(elementiGenerati[3].type.displayName).toBe('Text__Contesto');

    // HtmlWrap html
    expect(elementiGenerati[5].props).toEqual({
      dangerouslySetInnerHTML: {
        __html: '<strong>blocco html</strong>',
      },
      inline: true,
    });
    expect(elementiGenerati[5].key).toBe('html_text_36');
    expect(elementiGenerati[5].type.displayName).toBe('utils__HtmlWrap');

    // HtmlWrap image
    expect(elementiGenerati[6].props).toEqual({
      dangerouslySetInnerHTML: {
        __html: '<img src="immagine.png" />',
      },
    });
    expect(elementiGenerati[6].key).toBe('image_image_36');
    expect(elementiGenerati[6].type.displayName).toBe('utils__HtmlWrap');

    // TeX
    expect(elementiGenerati[7].props).toEqual({
      math: '4+6',
    });
    expect(elementiGenerati[7].key).toBe('latex_latex_45');
  });

  it('elementiTesto undefined', () => {
    const elementiGenerati = generaElementiTesto({
      elementiTesto: undefined,
    });

    expect(elementiGenerati).toEqual([]);
  });

  it('contenuti misti con lessico', () => {
    const elementiGenerati = generaElementiTesto({
      elementiTesto: mockTesti,
      lessicoRefs: {},
      hasLessico: true,
      toggleAperti: () => { },
    });

    expect(elementiGenerati).toEqual([
      expect.any(Object),
      ' te xt ',
      expect.any(Object),
      expect.any(Object),
      '.',
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
    ]);

    // lessico 1
    expect(elementiGenerati[0].props).toEqual({
      children: 'Hi nc',
      onClick: expect.any(Function),
    });
    expect(elementiGenerati[0].key).toBe('lessico_block_lessico_0_Hinc');
    expect(elementiGenerati[0].type.displayName).toBe('Text__Lessico');

    // lessico 2
    expect(elementiGenerati[2].props).toEqual({
      children: 'ille',
      onClick: expect.any(Function),
    });
    expect(elementiGenerati[2].key).toBe('lessico_block_lessico_2_ille');
    expect(elementiGenerati[2].type.displayName).toBe('Text__Lessico');

    // contesto
    expect(elementiGenerati[3].props).toEqual({
      children: [expect.any(Object), 'testo'],
    });
    expect(elementiGenerati[3].key).toBe('contesto_context_34');
    expect(elementiGenerati[3].type.displayName).toBe('Text__Contesto');

    // lessico nel contesto
    const lessico = elementiGenerati[3].props.children[0];
    expect(lessico.props).toEqual({
      children: 'aeneumque',
      onClick: expect.any(Function),
    });
    expect(lessico.key).toBe('lessico_block_lessico_0_aeneumque');
    expect(lessico.type.displayName).toBe('Text__Lessico');

    // HtmlWrap html
    expect(elementiGenerati[5].props).toEqual({
      dangerouslySetInnerHTML: {
        __html: '<strong>blocco html</strong>',
      },
      inline: true,
    });
    expect(elementiGenerati[5].key).toBe('html_text_36');
    expect(elementiGenerati[5].type.displayName).toBe('utils__HtmlWrap');

    // HtmlWrap image
    expect(elementiGenerati[6].props).toEqual({
      dangerouslySetInnerHTML: {
        __html: '<img src="immagine.png" />',
      },
    });
    expect(elementiGenerati[6].key).toBe('image_image_36');
    expect(elementiGenerati[6].type.displayName).toBe('utils__HtmlWrap');

    // TeX
    expect(elementiGenerati[7].props).toEqual({
      math: '4+6',
    });
    expect(elementiGenerati[7].key).toBe('latex_latex_45');
  });

  it('testo ref Lessico', () => {
    const toggleAperti = jest.fn();
    const lessicoRefs = {};
    const elementiGenerati = generaElementiTesto({
      elementiTesto: [{
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
      }],
      lessicoRefs,
      hasLessico: true,
      toggleAperti,
    });

    expect(elementiGenerati).toEqual([expect.any(Object)]);

    // lessico 1
    expect(elementiGenerati[0].props).toEqual({
      children: 'Hi nc',
      onClick: expect.any(Function),
    });
    expect(elementiGenerati[0].key).toBe('lessico_block_lessico_0_Hinc');
    expect(elementiGenerati[0].type.displayName).toBe('Text__Lessico');
    expect(toggleAperti).not.toHaveBeenCalled();

    const LessicoStuff = () => elementiGenerati[0];
    expect(lessicoRefs.lessico_block_lessico_0_Hinc).toBeFalsy();
    const renderedComponent = mount(<LessicoStuff />);
    renderedComponent.simulate('click');
    expect(toggleAperti).toHaveBeenCalledWith({
      id: 'lessico_0_Hinc',
      inputLessicale: mockTesti[0].inputLessicale,
      parola: 'Hi_nc',
      type: 'lessico',
    });
    expect(lessicoRefs.lessico_block_lessico_0_Hinc).toBeTruthy();
  });
});


describe('<HtmlWrap />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<HtmlWrap />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props inline', () => {
    const renderedComponent = shallow(<HtmlWrap inline />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

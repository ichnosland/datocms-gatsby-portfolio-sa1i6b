import React from 'react';
import { shallow } from 'enzyme';

import TopBar from 'components/TopBar';
import ToolBar from 'components/ToolBar';
import { createStepFromEsercizi } from 'common/esercizi';
import { mockElementiN } from 'common/testing-mocks';
import ToolBarButton from 'components/ToolBar/ToolBarButton';

import EsecuzioneSteps from '../index';
import Step from '../Step';


const mockStep = createStepFromEsercizi(mockElementiN);
const mockProps = {
  stepCaricato: mockStep[0],
  funzioneSelezionaRisposta: jest.fn(),
  stepTotali: 10,
  stepEseguiti: 9,
  hasHelp: false,
  hasSkip: false,
  hasCorreggi: false,
  apriModalBox: jest.fn(),
  chiudiModalBox: jest.fn(),
  disableAutofocus: false,
  correzioneRisposta: {
    isCheckable: false,
    isChecked: false,
    isCorrect: false,
    isPristine: true,
    isHelpEnabled: false,
    mostraSoluzione: false,
    mostraCorrezione: false,
    isFocusEnabled: false,
  },
  correzioneRispostaFx: jest.fn(),
  topBarParams: {},
  helpButtonFunction: () => { },
  toggleFocusFunction: () => { },
  audioSettings: {
    maxRepetitions: 2,
    enablePause: true,
  },
};


describe('<EsecuzioneSteps />', () => {
  it('Renderizza lo step in esecuzione e una topbar', () => {
    const renderedComponent = shallow(
      <EsecuzioneSteps {...mockProps} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Step).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Renderizza lo step in esecuzione e una topbar quando la percentuale non è calcolata', () => {
    const props = {
      ...mockProps,
      stepTotali: 0,
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Step).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Cosa succede quando isCorrect == true', () => {
    const props = {
      ...mockProps,
      hasHelp: true,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isChecked: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Step).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Cosa succede quando hasCorreggi == true', () => {
    const props = {
      ...mockProps,
      hasHelp: true,
      hasCorreggi: true,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isChecked: true,
        isCorrect: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Step).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Cosa succede quando isCheckable == true', () => {
    const props = {
      ...mockProps,
      hasHelp: true,
      hasCorreggi: true,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isChecked: true,
        isCheckable: true,
        isCorrect: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Step).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Cosa succede quando hasHelp == true & isChecked == false', () => {
    const props = {
      ...mockProps,
      hasHelp: true,
      hasCorreggi: true,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isChecked: false,
        isCheckable: true,
        isCorrect: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Step).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Cosa succede quando il pulsante di skip è abilitato hasSkip == true', () => {
    const props = {
      ...mockProps,
      hasSkip: true,
      skipFunction: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Step).length).toBe(1);
    expect(renderedComponent.find(ToolBar).find(ToolBarButton).at(0).props()).toEqual({
      skip: true,
      onClickFx: props.skipFunction,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('checkFocusButtonRisposta deve chiamare enableFocusButtonRisposta se isCheckable && !iscrivi', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: true,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.checkFocusButtonRisposta();
    expect(spy).toHaveBeenCalled();
  });

  it('checkFocusButtonRisposta deve chiamare enableFocusButtonRisposta se mostraSoluzione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        mostraSoluzione: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.checkFocusButtonRisposta();
    expect(spy).toHaveBeenCalled();
  });

  it('checkFocusButtonRisposta deve chiamare enableFocusButtonRisposta se !isCheckable || isScrivi || mostraSoluzione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: false,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.checkFocusButtonRisposta();
    expect(spy).not.toHaveBeenCalled();
  });

  it('checkFocusButtonRisposta deve poter essere triggerato se mostraCorrezione', () => {
    const props = {
      ...mockProps,
      stepCaricato: { esercizi: [], testi: [] },
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: false,
        mostraCorrezione: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.checkFocusButtonRisposta();
    expect(spy).toHaveBeenCalled();
  });

  it('checkFocusButtonRisposta non deve esplodere se stepCaricato è undefined', () => {
    const props = {
      ...mockProps,
      stepCaricato: undefined,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: false,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.checkFocusButtonRisposta();
    expect(spy).not.toHaveBeenCalled();
  });

  it('checkFocusButtonRisposta non deve esplodere se stepCaricato.esercizi è vuoto', () => {
    const props = {
      ...mockProps,
      stepCaricato: { esercizi: [], testi: [] },
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: false,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.checkFocusButtonRisposta();
    expect(spy).not.toHaveBeenCalled();
  });

  it('componentDidUpdate deve chiamare enableFocusButtonRisposta se isCheckable', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: true,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.componentDidUpdate();
    expect(spy).toHaveBeenCalled();
  });

  it('componentDidUpdate deve chiamare enableFocusButtonRisposta se mostraSoluzione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: false,
        mostraSoluzione: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'enableFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.componentDidUpdate();
    expect(spy).toHaveBeenCalled();
  });

  it('componentDidUpdate deve chiamare checkFocusButtonRisposta se !mostraSoluzione e !isCheckable', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isCheckable: false,
        mostraSoluzione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'checkFocusButtonRisposta');

    expect(spy).not.toHaveBeenCalled();
    instance.componentDidUpdate();
    expect(spy).toHaveBeenCalled();
  });

  it('ToolBar > hideOnFocus === false se isFocusEnabled; mostraSoluzione; mostraCorrezione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isFocusEnabled: true,
        mostraSoluzione: true,
        mostraCorrezione: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(ToolBar).props().hideOnFocus).toBe(false);
  });

  it('ToolBar > hideOnFocus === false se isFocusEnabled; mostraSoluzione; mostraCorrezione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isFocusEnabled: true,
        mostraSoluzione: true,
        mostraCorrezione: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(ToolBar).props().hideOnFocus).toBe(false);
  });

  it('ToolBar > hideOnFocus === false se isFocusEnabled; !mostraSoluzione; mostraCorrezione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isFocusEnabled: true,
        mostraSoluzione: false,
        mostraCorrezione: true,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(ToolBar).props().hideOnFocus).toBe(false);
  });

  it('ToolBar > hideOnFocus === false se isFocusEnabled; mostraSoluzione; !mostraCorrezione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isFocusEnabled: true,
        mostraSoluzione: true,
        mostraCorrezione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(ToolBar).props().hideOnFocus).toBe(false);
  });

  it('ToolBar > hideOnFocus === true se isFocusEnabled; !mostraSoluzione; !mostraCorrezione', () => {
    const props = {
      ...mockProps,
      correzioneRisposta: {
        ...mockProps.correzioneRisposta,
        isFocusEnabled: true,
        mostraSoluzione: false,
        mostraCorrezione: false,
      },
    };
    const renderedComponent = shallow(
      <EsecuzioneSteps {...props} />
    );

    expect(renderedComponent.find(ToolBar).props().hideOnFocus).toBe(true);
  });
});

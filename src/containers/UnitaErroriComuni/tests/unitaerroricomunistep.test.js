import React from 'react';
import { shallow } from 'enzyme';

import { mockElementiN } from 'common/testing-mocks';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import { FlexWrap } from 'components/FlexBox';

import UnitaErroriComuniStep from '../UnitaErroriComuniStep';


const mockConfiguration = {
  product: 'product',
  blocco: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const mockProps = {
  totaleDomande: 3,
  stepEseguiti: 2,
  backUrl: '/back-url',
  risposta: {
    rispostaSelezionata: {},
    isCheckable: true,
    isChecked: false,
    isPristine: true,
    isCorrect: true,
    isInterfaceLocked: false,
    isHelpEnabled: true,
    correzioneStep: {
      corrette: [],
      sbagliate: [],
    },
    mostraSoluzione: false,
    mostraCorrezione: true,
    isFocusEnabled: false,
    risposteInizializza: false,
  },
  step: {
    esercizi: [mockElementiN[1]],
    testi: [mockElementiN[0]],
    numeroProgressivoStep: 0,
    isStepLoaded: true,
  },
  correzioneRispostaFx: () => { },
  apriModalBoxFx: () => { },
  chiudiModalBoxFx: () => { },
  helpFunction: () => { },
  selezioneRispostaFx: () => { },
  toggleFocusFunction: () => { },
  configuration: mockConfiguration,
  apriChiudiSezioniFx: () => { },
  helpButtonFunction: () => { },
};

describe('<UnitaErroriComuniStep />', () => {
  it('visualizza dati', () => {
    const renderedComponent = shallow(
      <UnitaErroriComuniStep {...mockProps} />
    );
    expect(renderedComponent.find(FlexWrap).length).toBe(1);
    expect(renderedComponent.find(EsecuzioneSteps).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

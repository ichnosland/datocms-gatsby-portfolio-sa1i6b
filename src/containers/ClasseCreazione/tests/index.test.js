import React from 'react';
import { shallow } from 'enzyme';

import { ClasseCreazioneView } from '../index';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
};

const mockProps = {
  configuration: mockConfiguration,
  onResetForm: () => { },
  onClasseCreazioneReset: () => { },
  onClasseCreazioneScuoleAttiveFetch: () => { },
  onClasseCreazioneDataSet: () => { },
  onClasseCreazioneDataPost: () => { },
  onClasseCreazioneGeoFetch: () => { },
  onClasseCreazioneGeoComuneFetch: () => { },
  onClasseCreazioneScuoleAttiveSet: () => { },
  spinner: false,
  feedback: {
    hasFeedback: false,
    tipologia: '',
    errorMessage: '',
  },
  history: {
    push: () => { },
  },
  scuoleAttive: {
    list: [],
    isLoaded: true,
  },
  geo: {
    province: [],
    isProvinceLoaded: false,
    comuni: {},
    scuole: {},
    indirizziDiStudio: [],
  },
  data: {
    display: '',
    creaNuovaClasse: false,
    scuolaSelezionata: {
      pk: 2,
      nome: 'nome',
      classi: [],
    },
    nuova: false,
  },
};

describe('<RegistrationView />', () => {
  it('should match snapshot', () => {
    const renderedComponent = shallow(
      <ClasseCreazioneView {...mockProps} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import ClasseCreazioneForm from '../ClasseCreationForm';

const mockProps = {
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
  display: '',
  product: 'product',
};

describe('<ClasseCreazioneForm />', () => {
  it('should match snapshot', () => {
    const renderedComponent = shallow(
      <ClasseCreazioneForm {...mockProps} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});
